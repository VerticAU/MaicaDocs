#!/usr/bin/env node
// Stage ONE GitBook space (e.g. knowledgebase/adminguide) into an mkdocs
// layout under a destination build dir:
//   - README.md -> index.md at every depth
//   - merge <space>/.gitbook/assets/ -> <dest>/assets/
//   - rewrite (../)*.gitbook/assets/<file> in Markdown AND raw HTML src/href
//   - drop SUMMARY.md and the .gitbook/ dir
// Branding (theme logo/favicon) is copied to build/assets/ by build.sh, not here.
// Usage: node stage-articles.mjs <srcSpaceDir> <destSpaceDir>
//
// ESM, Node stdlib only. No npm deps.

import { readFile, writeFile, readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

// Markdown image/link refs: ![alt](.../ .gitbook/assets/file) or [text](...).
// The final group tolerates balanced parens inside a filename (rare, but PDFs
// and screenshots occasionally carry them).
const ASSET_MD_RE = /(!?)\[([^\]]*)\]\(((?:\.\.\/)*)\.gitbook\/assets\/((?:[^()]|\([^()]*\))+)\)/g;
// Raw HTML attribute refs: src="(../)*.gitbook/assets/file" or href="...".
// Handles single OR double quotes; the quote char is captured and reused so we
// never mismatch `src="...'`.
const ASSET_HTML_RE = /(src|href)=(["'])((?:\.\.\/)*)\.gitbook\/assets\/([^"']+)\2/g;

/**
 * Rewrite GitBook asset references to the per-space mkdocs assets root.
 *
 * `(../)*.gitbook/assets/<file>` becomes `${upPrefix}assets/<file>` in both
 * Markdown `![]()`/`[]()` syntax and raw HTML `src`/`href` attributes. External
 * `http(s)://` URLs and any ref that is not a `.gitbook/assets/` path are left
 * untouched (the anchored `.gitbook/assets/` literal guarantees this).
 *
 * @param {string} content - Markdown/HTML source.
 * @param {string} upPrefix - Relative prefix ('' , '../', '../../', ...) that
 *   points from the output file's directory up to `<dest>/assets/`.
 * @returns {string} Rewritten content.
 */
function rewriteAssetPaths(content, upPrefix) {
  let out = content.replace(ASSET_MD_RE, (_, bang, text, _ups, file) => `${bang}[${text}](${upPrefix}assets/${file})`);
  out = out.replace(ASSET_HTML_RE, (_, attr, quote, _ups, file) => `${attr}=${quote}${upPrefix}assets/${file}${quote}`);
  return out;
}

/** Recursively collect every file path under `dir`. */
async function walk(dir) {
  const out = [];
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...await walk(p));
    else if (ent.isFile()) out.push(p);
  }
  return out;
}

/**
 * Stage one GitBook space into an mkdocs docs subtree.
 *
 * Wipes and recreates `destSpace` for deterministic, idempotent rebuilds.
 *
 * @param {string} srcSpace - Source space dir (e.g. knowledgebase/adminguide).
 * @param {string} destSpace - Destination build dir (e.g. site/build/adminguide).
 * @returns {Promise<{mdCopied:number, assetsMerged:number, refsRewritten:number, readmesRenamed:number}>}
 */
async function stageSpace(srcSpace, destSpace) {
  await rm(destSpace, { recursive: true, force: true });
  await mkdir(destSpace, { recursive: true });
  const assetsDest = path.join(destSpace, 'assets');
  await mkdir(assetsDest, { recursive: true });

  let mdCopied = 0, assetsMerged = 0, refsRewritten = 0, readmesRenamed = 0;

  // Merge the space's .gitbook/assets -> <dest>/assets (per-space assets root).
  const gitbookAssets = path.join(srcSpace, '.gitbook', 'assets');
  if (existsSync(gitbookAssets)) {
    for (const a of await readdir(gitbookAssets, { withFileTypes: true })) {
      if (!a.isFile()) continue;
      await copyFile(path.join(gitbookAssets, a.name), path.join(assetsDest, a.name));
      assetsMerged++;
    }
  }

  for (const file of await walk(srcSpace)) {
    const rel = path.relative(srcSpace, file);
    // Skip the .gitbook/ control dir (assets already merged above).
    if (rel === '.gitbook' || rel.startsWith('.gitbook' + path.sep)) continue;
    // Nav is generated separately; SUMMARY.md is not a content page.
    if (path.basename(file) === 'SUMMARY.md') continue;
    if (!file.endsWith('.md')) continue;

    let outRel = rel;
    if (path.basename(rel) === 'README.md') {
      const dir = path.dirname(rel);
      outRel = dir === '.' ? 'index.md' : path.join(dir, 'index.md');
      readmesRenamed++;
    }

    const out = path.join(destSpace, outRel);
    await mkdir(path.dirname(out), { recursive: true });

    const content = await readFile(file, 'utf8');
    // upPrefix depth is a function of where the OUTPUT file sits below the
    // space root, because assets live at a single per-space root. A page at
    // <dest>/data/data-objects/index.md is 2 dirs deep -> '../../'.
    const articleDir = path.dirname(outRel);
    const nested = articleDir === '.' ? 0 : articleDir.split(path.sep).length;
    const upPrefix = '../'.repeat(nested);

    refsRewritten += (content.match(ASSET_MD_RE) || []).length + (content.match(ASSET_HTML_RE) || []).length;
    await writeFile(out, rewriteAssetPaths(content, upPrefix));
    mdCopied++;
  }

  const counts = { mdCopied, assetsMerged, refsRewritten, readmesRenamed };
  console.error(`stage ${path.basename(destSpace)}: md=${mdCopied} assets=${assetsMerged} refs=${refsRewritten} readmes=${readmesRenamed}`);
  return counts;
}

export { rewriteAssetPaths, stageSpace };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('stage-articles.mjs');
if (runningAsScript) {
  const [srcSpace, destSpace] = process.argv.slice(2);
  if (!srcSpace || !destSpace) {
    console.error('Usage: node stage-articles.mjs <srcSpaceDir> <destSpaceDir>');
    process.exit(1);
  }
  stageSpace(srcSpace, destSpace).catch(e => { console.error(e); process.exit(1); });
}
