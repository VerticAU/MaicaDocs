import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertMetadata } from '../convert-metadata.js';

test('metadata note block -> YAML frontmatter', () => {
  const src = '!!! note\n    Metadata\n\n    * tags=alpha, beta\n    * draft=false\n\nBody paragraph.';
  const out = convertMetadata(src);
  assert.match(out, /^---\ntags:\n {2}- alpha\n {2}- beta\ndraft: false\n---/);
  assert.match(out, /Body paragraph\./);
});

test('comma values become arrays', () => {
  const src = '!!! note\n    Metadata\n\n    * keywords=one, two, three\n\nBody.';
  const out = convertMetadata(src);
  assert.match(out, /^---\nkeywords:\n {2}- one\n {2}- two\n {2}- three\n---/);
});

test('numbers and booleans are coerced (unquoted in output)', () => {
  const src = '!!! note\n    Metadata\n\n    * order=3\n    * published=true\n\nBody.';
  const out = convertMetadata(src);
  // Coerced primitives render bare, not quoted.
  assert.match(out, /order: 3\n/);
  assert.match(out, /published: true\n/);
});

test('existing frontmatter is preserved (not overwritten) and merged', () => {
  const src =
    '---\ndraft: true\ntitle: Existing Page\n---\n' +
    '!!! note\n    Metadata\n\n    * tags=alpha, beta\n    * draft=false\n\nBody.';
  const out = convertMetadata(src);
  // Existing draft: true must win over the note's draft=false.
  assert.match(out, /draft: true/);
  assert.doesNotMatch(out, /draft: false/);
  // Existing key preserved.
  assert.match(out, /title: Existing Page/);
  // New key merged in.
  assert.match(out, /tags:\n {2}- alpha\n {2}- beta/);
  assert.match(out, /Body\./);
});

test('normal prose admonition is left UNCHANGED (negative case)', () => {
  const src = '!!! note\n    This is a prose note, not metadata bullets.\n\nMore body.';
  assert.equal(convertMetadata(src), src);
});

test('content with no metadata note block is unchanged (idempotent)', () => {
  const src = 'Just a normal page.\n';
  assert.equal(convertMetadata(src), src);
});
