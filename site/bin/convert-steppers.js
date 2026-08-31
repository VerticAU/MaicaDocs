#!/usr/bin/env node

// Convert GitBook stepper blocks into an ordered (numbered) Markdown list that
// mkdocs-material renders natively.
//
//   {% stepper %}
//   {% step %}
//   First thing.
//   {% endstep %}
//   {% step %}
//   Second thing.
//   {% endstep %}
//   {% endstepper %}
//
// becomes:
//
//   1. First thing.
//   2. Second thing.
//
// Each {% step %} becomes one list item `N. <first line>`. Every continuation
// line of a step body is prefixed with a flat 4-space indent so it stays inside
// the list item. python-markdown / mkdocs-material use a FLAT 4-space
// list-continuation threshold (tab_length = 4), independent of the ordered-list
// marker width, so 4 spaces is what keeps nested admonitions and fenced code
// blocks inside the <li> for both single-digit (1.) and double-digit (10.)
// markers. The continuation lines keep their OWN leading whitespace, so nested
// content that earlier passes already produced (admonitions, fenced code
// blocks, images) survives with its relative indent intact: an admonition child
// line at 4 spaces lands at 4 + 4 = 8 spaces, still 4 deeper than its "!!!"
// marker. Blank lines inside a body stay blank.
//
// This converter runs LATE in the pipeline (after hints/collapse/embeds/code/
// metadata), so step bodies may already hold converted admonitions and iframes;
// they are preserved verbatim, only re-indented.
//
// The recursive file walker and CLI plumbing live in _lib.mjs; this file holds
// only the pure transform.
//
// ESM, Node stdlib only. No npm deps.

import { runCli } from './_lib.mjs';

const STEPPER_PATTERN = /\{%\s*stepper\s*%\}([\s\S]*?)\{%\s*endstepper\s*%\}/g;
const STEP_PATTERN = /\{%\s*step\s*%\}([\s\S]*?)\{%\s*endstep\s*%\}/g;

/**
 * Convert every GitBook stepper block in `content` to a numbered Markdown list.
 *
 * @param {string} content - Markdown source.
 * @returns {string} Transformed Markdown (unchanged when there are no steppers).
 */
export function convertSteppers(content) {
  return content.replace(STEPPER_PATTERN, (_match, inner) => {
    const items = [];
    let n = 0;
    let step;
    STEP_PATTERN.lastIndex = 0;
    while ((step = STEP_PATTERN.exec(inner)) !== null) {
      n++;
      const bodyLines = step[1].trim().split('\n');
      const first = (bodyLines.shift() ?? '').trim();
      // Continuation lines keep their own indentation and gain a flat 4-space
      // prefix so they remain within the list item. Blank lines stay blank (no
      // trailing whitespace).
      const rest = bodyLines
        .map((line) => (line.trim() ? `    ${line}` : ''))
        .join('\n');
      items.push(rest ? `${n}. ${first}\n${rest}` : `${n}. ${first}`);
    }
    return items.join('\n') + '\n';
  });
}

const runningAsScript =
  process.argv[1] && process.argv[1].endsWith('convert-steppers.js');
if (runningAsScript) {
  runCli(convertSteppers, { label: 'steppers' });
}
