import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { getAllMarkdownFiles, processDirectory } from '../_lib.mjs';

let root;

before(async () => {
  // Build a nested fixture tree:
  //   root/a.md
  //   root/z.md
  //   root/notes.txt        (ignored, not .md)
  //   root/sub/b.md
  //   root/sub/deep/c.md
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'maica-lib-test-'));
  await fs.mkdir(path.join(root, 'sub', 'deep'), { recursive: true });
  await fs.writeFile(path.join(root, 'a.md'), 'alpha', 'utf8');
  await fs.writeFile(path.join(root, 'z.md'), 'zeta', 'utf8');
  await fs.writeFile(path.join(root, 'notes.txt'), 'not markdown', 'utf8');
  await fs.writeFile(path.join(root, 'sub', 'b.md'), 'bravo', 'utf8');
  await fs.writeFile(path.join(root, 'sub', 'deep', 'c.md'), 'charlie', 'utf8');
});

after(async () => {
  await fs.rm(root, { recursive: true, force: true });
});

test('getAllMarkdownFiles finds every .md recursively', async () => {
  const files = await getAllMarkdownFiles(root);
  const rels = files.map((f) => path.relative(root, f));
  assert.deepEqual(rels, [
    'a.md',
    path.join('sub', 'b.md'),
    path.join('sub', 'deep', 'c.md'),
    'z.md',
  ]);
});

test('getAllMarkdownFiles returns absolute, sorted paths and ignores non-md', async () => {
  const files = await getAllMarkdownFiles(root);
  for (const f of files) {
    assert.ok(path.isAbsolute(f), `expected absolute path, got ${f}`);
    assert.ok(f.endsWith('.md'), `expected .md, got ${f}`);
  }
  const sorted = [...files].sort();
  assert.deepEqual(files, sorted, 'files should be returned already sorted');
});

test('processDirectory applies transform and reports counts', async () => {
  // Uppercase transform: every fixture file has lowercase content, so all change.
  const summary = await processDirectory(root, (content) => content.toUpperCase());
  assert.equal(summary.processed, 4);
  assert.equal(summary.changed, 4);

  const a = await fs.readFile(path.join(root, 'a.md'), 'utf8');
  assert.equal(a, 'ALPHA');
  const c = await fs.readFile(path.join(root, 'sub', 'deep', 'c.md'), 'utf8');
  assert.equal(c, 'CHARLIE');
});

test('processDirectory does not rewrite unchanged files', async () => {
  const target = path.join(root, 'a.md');
  // Pin mtime to a fixed point in the past.
  const past = new Date('2000-01-01T00:00:00Z');
  await fs.utimes(target, past, past);
  const before = (await fs.stat(target)).mtimeMs;

  // Identity transform: nothing should be written.
  const summary = await processDirectory(root, (content) => content);
  assert.equal(summary.processed, 4);
  assert.equal(summary.changed, 0);

  const after = (await fs.stat(target)).mtimeMs;
  assert.equal(after, before, 'unchanged file must not be rewritten (mtime moved)');
});

test('processDirectory writes only the files the transform actually changes', async () => {
  const only = path.join(root, 'sub', 'b.md');
  const summary = await processDirectory(root, (content) =>
    content.includes('BRAVO') ? `${content}-EDITED` : content,
  );
  assert.equal(summary.processed, 4);
  assert.equal(summary.changed, 1);
  const b = await fs.readFile(only, 'utf8');
  assert.equal(b, 'BRAVO-EDITED');
});

test('getAllMarkdownFiles returns empty array for an empty dir', async () => {
  const empty = await fs.mkdtemp(path.join(os.tmpdir(), 'maica-lib-empty-'));
  try {
    assert.deepEqual(await getAllMarkdownFiles(empty), []);
  } finally {
    await fs.rm(empty, { recursive: true, force: true });
  }
});
