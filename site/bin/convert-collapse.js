#!/usr/bin/env node

// Convert GitBook `<details><summary>X</summary>...</details>` blocks into
// mkdocs-material collapsible admonitions (`??? note "X"`). The recursive file
// walker and CLI plumbing live in _lib.mjs; this file holds only the pure
// transform.
//
// ESM, Node stdlib only. No npm deps.

import { runCli } from './_lib.mjs';

/**
 * Convert every GitBook `<details><summary>...</summary>...</details>` block in
 * `content` to a Material collapsible admonition (`??? note "..."`), with the
 * body indented by 4 spaces.
 *
 * Known limitation: the `<summary>` capture group is `[^<]+`, so a summary that
 * contains a nested HTML tag will not match and its block is left unchanged.
 *
 * @param {string} content - Markdown source.
 * @returns {string} Transformed Markdown (unchanged when there are no details blocks).
 */
export function convertCollapse(content) {
  const detailsPattern = /<details>\s*<summary>([^<]+)<\/summary>([\s\S]*?)<\/details>/g;
  return content.replace(detailsPattern, (match, summary, body) => {
    const summaryText = summary.trim();
    const bodyLines = body
      .trim()
      .split('\n')
      .map(line => {
        const trimmedLine = line.trim();
        if (trimmedLine === '') return '';
        return `    ${trimmedLine}`;
      })
      .filter((line, index, arr) => {
        if (line === '') {
          const nonEmptyBefore = arr.slice(0, index).some(l => l !== '');
          const nonEmptyAfter = arr.slice(index + 1).some(l => l !== '');
          return nonEmptyBefore && nonEmptyAfter;
        }
        return true;
      })
      .join('\n');
    return `??? note "${summaryText}"\n${bodyLines}`;
  });
}

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-collapse.js');
if (runningAsScript) {
  runCli(convertCollapse, { label: 'collapse' });
}
