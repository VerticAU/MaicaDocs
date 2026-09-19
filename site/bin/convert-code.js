#!/usr/bin/env node

// Convert GitBook `{% code %}` blocks into mkdocs-material fenced code. GitBook
// wraps a fenced code block in `{% code ... %}` / `{% endcode %}` tags that may
// carry attributes (`title=`, `lineNumbers=`, `fullWidth=`). Material has no
// wrapper tags: a title is expressed inline in the fence info string
// (```` ```apex title="X" ````), so we fold `title=` into the fence and drop the
// wrapper tags. `lineNumbers` and `fullWidth` are GitBook-only presentation
// hints with no Material fence equivalent, so they are dropped. The inner code
// body is never touched: only the fence's info string is rewritten.
//
// The recursive file walker and CLI plumbing live in _lib.mjs; this file holds
// only the pure transform.
//
// ESM, Node stdlib only. No npm deps.

import { runCli } from './_lib.mjs';

/**
 * Convert every GitBook `{% code %}` block in `content` to a Material fenced
 * code block.
 *
 * Two passes:
 *  1. Match an opening `{% code <attrs> %}` tag immediately followed by the
 *     inner block's opening fence line. `<attrs>` is a run of `key="value"`
 *     pairs in any order; the `title` value (if present) is folded into the
 *     fence info string and every other attribute is dropped. The fence line
 *     and everything after it (the code body) are left untouched.
 *  2. Remove the orphaned `{% endcode %}` closing lines.
 *
 * The inner code body is preserved byte-for-byte: the opening pass captures only
 * up to and including the fence line, so nothing inside the fence is rewritten.
 * A file with no `{% code %}` blocks is returned unchanged (idempotent), and an
 * already-plain fenced code block is left alone because it carries no wrapper
 * tags to match.
 *
 * @param {string} content - Markdown source.
 * @returns {string} Transformed Markdown (unchanged when there are no code blocks).
 */
export function convertCode(content) {
  // `((?:\s+[\w-]+="[^"]*")*)` captures zero or more `key="value"` attribute
  // pairs so the tag matches regardless of attribute order or count.
  const openPattern = /\{%\s*code((?:\s+[\w-]+="[^"]*")*)\s*%\}\n(```[^\n]*)/g;
  let out = content.replace(openPattern, (match, attrs, fence) => {
    const titleMatch = attrs.match(/\btitle="([^"]*)"/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    return title ? `${fence} title="${title}"` : fence;
  });
  // Drop the closing tag lines the opening pass leaves behind.
  out = out.replace(/^[ \t]*\{%\s*endcode\s*%\}[ \t]*\n?/gm, '');
  return out;
}

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-code.js');
if (runningAsScript) {
  runCli(convertCode, { label: 'code' });
}
