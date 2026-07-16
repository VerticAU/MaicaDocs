import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { rewriteAssetPaths, stageSpace } from '../stage-articles.mjs';

test('rewriteAssetPaths rewrites HTML img src at depth', () => {
  const src = '<figure><img src="../.gitbook/assets/a b.png" alt=""><figcaption></figcaption></figure>';
  assert.match(rewriteAssetPaths(src, '../'), /src="\.\.\/assets\/a b\.png"/);
});

test('rewriteAssetPaths rewrites HTML href (single quotes) at depth', () => {
  const src = "<a href='../../.gitbook/assets/guide.pdf'>doc</a>";
  assert.equal(rewriteAssetPaths(src, '../../'), "<a href='../../assets/guide.pdf'>doc</a>");
});

test('rewriteAssetPaths rewrites markdown image refs', () => {
  const src = '![alt](../../.gitbook/assets/x.png)';
  assert.equal(rewriteAssetPaths(src, '../../'), '![alt](../../assets/x.png)');
});

test('rewriteAssetPaths rewrites markdown link refs', () => {
  const src = '[the pdf](../.gitbook/assets/y.pdf)';
  assert.equal(rewriteAssetPaths(src, '../'), '[the pdf](../assets/y.pdf)');
});

test('rewriteAssetPaths at depth 0 uses no ../ prefix', () => {
  const src = '<img src=".gitbook/assets/logo.png">';
  assert.equal(rewriteAssetPaths(src, ''), '<img src="assets/logo.png">');
});

test('rewriteAssetPaths leaves external URLs untouched', () => {
  const src = '<img src="https://example.com/pic.png">';
  assert.equal(rewriteAssetPaths(src, '../'), src);
});

test('stageSpace: README->index, nested README->index, assets merged, img rewritten', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'stage-'));
  const srcSpace = path.join(root, 'adminguide');
  const destSpace = path.join(root, 'build', 'adminguide');
  await mkdir(path.join(srcSpace, '.gitbook', 'assets'), { recursive: true });
  await mkdir(path.join(srcSpace, 'data'), { recursive: true });
  await writeFile(
    path.join(srcSpace, 'README.md'),
    '# Home\n<figure><img src=".gitbook/assets/logo.png" alt=""></figure>\n![ext](https://example.com/e.png)'
  );
  await writeFile(path.join(srcSpace, 'SUMMARY.md'), '* [Home](README.md)');
  await writeFile(path.join(srcSpace, 'data', 'README.md'), '# Data\n<img src="../.gitbook/assets/logo.png">');
  await writeFile(path.join(srcSpace, 'data', 'objects.md'), '# Objects\n![pic](../.gitbook/assets/logo.png)');
  await writeFile(path.join(srcSpace, '.gitbook', 'assets', 'logo.png'), 'PNG');

  await stageSpace(srcSpace, destSpace);

  const indexTop = await readFile(path.join(destSpace, 'index.md'), 'utf8');
  assert.match(indexTop, /src="assets\/logo\.png"/);              // depth 0 -> no ../
  assert.match(indexTop, /https:\/\/example\.com\/e\.png/);        // external untouched

  const indexData = await readFile(path.join(destSpace, 'data', 'index.md'), 'utf8');
  assert.match(indexData, /src="\.\.\/assets\/logo\.png"/);        // depth 1 -> one ../

  const objects = await readFile(path.join(destSpace, 'data', 'objects.md'), 'utf8');
  // objects.md is a NON-index leaf served at data/objects/ (use_directory_urls),
  // one dir deeper than its file path, so dir-depth 1 -> served depth 2.
  assert.match(objects, /!\[pic\]\(\.\.\/\.\.\/assets\/logo\.png\)/); // markdown image, leaf at dir-depth 1 -> ../../

  const assets = await readdir(path.join(destSpace, 'assets'));
  assert.ok(assets.includes('logo.png'));                          // gitbook asset merged

  const entries = await readdir(destSpace);
  assert.ok(!entries.includes('SUMMARY.md'));                      // SUMMARY dropped
  assert.ok(!entries.includes('.gitbook'));                        // .gitbook dropped
  assert.ok(!entries.includes('README.md'));                       // README renamed away
});

test('stageSpace: use_directory_urls depth — leaf page gets N+1 ../, index page gets N ../', async () => {
  // mkdocs-material default use_directory_urls: true serves a non-index leaf
  // page foo/bar.md at foo/bar/ (one dir deeper than its file path), while an
  // index page foo/README.md -> foo/index.md is served at foo/. Asset ../
  // depth must follow the SERVED URL, not the file path. The load-bearing case
  // is raw-HTML <img src>, which mkdocs never rewrites; the markdown form must
  // match. This test FAILS against the pre-fix code (which used file-path depth
  // for both) and PASSES after the isIndex +1 fix.
  const root = await mkdtemp(path.join(tmpdir(), 'stage-diru-'));
  const srcSpace = path.join(root, 'space');
  const destSpace = path.join(root, 'build', 'space');
  await mkdir(path.join(srcSpace, '.gitbook', 'assets'), { recursive: true });
  await mkdir(path.join(srcSpace, 'sec'), { recursive: true });
  await writeFile(path.join(srcSpace, '.gitbook', 'assets', 'pic.png'), 'PNG');
  // Depth-1 index page (from README.md), served at sec/.
  await writeFile(path.join(srcSpace, 'sec', 'README.md'), '# Sec\n<img src="../.gitbook/assets/pic.png">');
  // Depth-1 non-index leaf page, served at sec/leaf/ (one dir deeper).
  await writeFile(
    path.join(srcSpace, 'sec', 'leaf.md'),
    '# Leaf\n<img src="../.gitbook/assets/pic.png">\n![md](../.gitbook/assets/pic.png)'
  );

  await stageSpace(srcSpace, destSpace);

  const idx = await readFile(path.join(destSpace, 'sec', 'index.md'), 'utf8');
  // Index at dir-depth 1 -> served depth 1 -> one ../ (unchanged by fix).
  assert.match(idx, /<img src="\.\.\/assets\/pic\.png">/);

  const leaf = await readFile(path.join(destSpace, 'sec', 'leaf.md'), 'utf8');
  // Leaf at dir-depth 1 -> served depth 2 -> two ../ (raw HTML, load-bearing).
  assert.match(leaf, /<img src="\.\.\/\.\.\/assets\/pic\.png">/);
  // And the markdown form must match too.
  assert.match(leaf, /!\[md\]\(\.\.\/\.\.\/assets\/pic\.png\)/);
});
