#!/usr/bin/env node
// Merge both GitBook SUMMARY.md files into ONE mkdocs nav with two top-level
// sections (Admin Guide, User Guide). Honours `## Section` headings as nav
// groups, `***` dividers reset to the space root, strips encoded &#x20;,
// rewrites README.md -> index.md at any depth, prefixes internal links with
// the space dir, and passes external http(s) links straight through.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');
const KB = path.join(REPO, 'knowledgebase');
const TEMPLATE = path.join(REPO, 'site', 'mkdocs.yml.template');
const OUT = path.join(REPO, 'site', 'mkdocs.yml');

const SPACES = [
  { dir: 'adminguide', title: 'Admin Guide' },
  { dir: 'userguide', title: 'User Guide' },
];

const LIST_ITEM_RE = /^(\s*)\*\s+(.*)$/;
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;
const H2_RE = /^##\s+(.*)$/;
const HR_RE = /^\*\*\*\s*$/;

function stripEncoded(s) {
  return s.replace(/&amp;#x20;/g, ' ').replace(/&#x20;/g, ' ').trim();
}

function isExternal(link) {
  return /^https?:\/\//i.test(link);
}

function transformLink(link) {
  if (isExternal(link)) return link;
  if (path.posix.basename(link) === 'README.md') {
    const dir = path.posix.dirname(link);
    return dir === '.' ? 'index.md' : `${dir}/index.md`;
  }
  return link;
}

// Conservative double-quote for YAML scalars that would otherwise misparse.
function yamlString(s) {
  if (/^[\s\-?*&!|>%@`#]|[:'"#&()?|[\]{}]| $/.test(s)) {
    return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  return s;
}

// Parse a single space's SUMMARY.md into a forest. `## X` opens a section
// group; `***` closes it back to the space root; list items nest by 2-space
// indentation within the current container.
function parseSummary(text) {
  const root = { title: null, link: null, children: [] };
  let sectionRoot = root;
  let opens = [root];

  for (const raw of text.split('\n')) {
    const h2 = H2_RE.exec(raw);
    if (h2) {
      const node = { title: stripEncoded(h2[1]), link: null, children: [], isSection: true };
      root.children.push(node);
      sectionRoot = node;
      opens = [node];
      continue;
    }
    if (HR_RE.test(raw)) {
      sectionRoot = root;
      opens = [root];
      continue;
    }
    const m = LIST_ITEM_RE.exec(raw);
    if (!m) continue;
    const depth = Math.floor(m[1].length / 2);
    const bodyClean = stripEncoded(m[2].trim());

    let title = bodyClean, link = null;
    const lm = LINK_RE.exec(bodyClean);
    if (lm) { title = stripEncoded(lm[1]); link = lm[2].trim(); }

    const node = { title, link, children: [] };
    const parent = opens[depth] ?? opens[opens.length - 1];
    parent.children.push(node);
    opens.length = depth + 1;
    opens.push(node);
    // keep sectionRoot referenced (opens[0] is always sectionRoot)
    void sectionRoot;
  }
  return root.children;
}

function renderNode(node, sectionDir, indent) {
  const pad = ' '.repeat(indent);
  const title = yamlString(node.title);
  const link = node.link ? transformLink(node.link) : null;
  const linkPath = link ? (isExternal(link) ? link : `${sectionDir}/${link}`) : null;

  if (node.children.length === 0) {
    return linkPath ? `${pad}- ${title}: ${linkPath}\n` : `${pad}- ${title}\n`;
  }
  let out = `${pad}- ${title}:\n`;
  if (linkPath) out += `${pad}  - ${title}: ${linkPath}\n`;
  for (const child of node.children) out += renderNode(child, sectionDir, indent + 2);
  return out;
}

function renderSpace(spaceTitle, spaceDir, summaryText) {
  const tree = parseSummary(summaryText);
  let out = `  - ${yamlString(spaceTitle)}:\n`;
  for (const node of tree) out += renderNode(node, spaceDir, 4);
  return out;
}

function buildNav(spaces) {
  let nav = 'nav:\n';
  for (const s of spaces) nav += renderSpace(s.title, s.dir, s.summaryText);
  return nav;
}

async function main() {
  const template = await readFile(TEMPLATE, 'utf8');
  const spaces = [];
  for (const s of SPACES) {
    const summaryText = await readFile(path.join(KB, s.dir, 'SUMMARY.md'), 'utf8');
    spaces.push({ ...s, summaryText });
  }
  const nav = buildNav(spaces);
  const out = template.replace(/\s*$/, '\n') + '\n' + nav;
  await writeFile(OUT, out);
  console.error(`nav: wrote ${path.relative(REPO, OUT)} (${SPACES.length} spaces)`);
}

export { parseSummary, renderSpace, buildNav };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('generate-nav.mjs');
if (runningAsScript) {
  main().catch(e => { console.error(e); process.exit(1); });
}
