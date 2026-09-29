#!/usr/bin/env node

// Convert GitBook `{% hint style="X" %}...{% endhint %}` blocks into
// mkdocs-material admonitions (`!!! <type>`). The recursive file walker and CLI
// plumbing live in _lib.mjs; this file holds only the pure transform.
//
// ESM, Node stdlib only. No npm deps.

import { runCli } from './_lib.mjs';

// Map GitBook hint styles to MkDocs admonition types.
const HINT_TYPE_MAP = {
  'info': 'note',
  'warning': 'warning',
  'danger': 'danger',
  'success': 'success',
  'tip': 'tip'
};

function extractTitle(content) {
  const titleMatch = content.trim().match(/^\*\*([^*]+)\*\*:?\s*/);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    const remainingContent = content.substring(titleMatch[0].length).trim();
    return { title, content: remainingContent };
  }
  return { title: null, content: content.trim() };
}

function indentContent(content, spaces = 4) {
  const indent = ' '.repeat(spaces);
  return content
    .split('\n')
    .map(line => line.trim() ? `${indent}${line}` : '')
    .join('\n');
}

function convertHint(match, style, content) {
  const admonitionType = HINT_TYPE_MAP[style] || 'note';
  const { title, content: bodyContent } = extractTitle(content);
  let admonition = '';
  if (title) {
    admonition = `!!! ${admonitionType} "${title}"\n`;
  } else {
    admonition = `!!! ${admonitionType}\n`;
  }
  const indentedContent = indentContent(bodyContent, 4);
  admonition += indentedContent;
  return admonition;
}

/**
 * Convert every GitBook hint block in `content` to a Material admonition.
 *
 * @param {string} content - Markdown source.
 * @returns {string} Transformed Markdown (unchanged when there are no hints).
 */
export function convertHints(content) {
  const hintPattern = /\{%\s*hint\s+style="([^"]+)"\s*%\}\s*([\s\S]*?)\s*\{%\s*endhint\s*%\}/g;
  return content.replace(hintPattern, (match, style, hintContent) =>
    convertHint(match, style, hintContent)
  );
}

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-hints.js');
if (runningAsScript) {
  runCli(convertHints, { label: 'hints' });
}
