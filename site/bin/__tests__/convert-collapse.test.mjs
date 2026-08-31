import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertCollapse } from '../convert-collapse.js';

test('<details><summary> -> ??? note with 4-space-indented body', () => {
  const src = '<details>\n<summary>More info</summary>\nHidden body line.\n</details>';
  const out = convertCollapse(src);
  assert.equal(out, '??? note "More info"\n    Hidden body line.');
});

test('content without <details> is unchanged (idempotent)', () => {
  const src = 'plain text\n\nno collapse here';
  assert.equal(convertCollapse(src), src);
});

test('multi-line body is indented, blank lines between content preserved', () => {
  const src = '<details>\n<summary>Summary</summary>\nLine one.\n\nLine two.\n</details>';
  const out = convertCollapse(src);
  assert.equal(out, '??? note "Summary"\n    Line one.\n\n    Line two.');
});

test('documented limitation: summary with nested tags does not match (left unchanged)', () => {
  // The <summary> capture group is `[^<]+`, so a summary containing a nested
  // HTML tag (e.g. <b>) breaks the match and the block is left untouched.
  const src = '<details>\n<summary>Has <b>bold</b></summary>\nBody.\n</details>';
  assert.equal(convertCollapse(src), src);
});
