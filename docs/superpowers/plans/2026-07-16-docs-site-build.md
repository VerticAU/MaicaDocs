# Docs Site Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, buildable static docs site that transforms the two GitBook spaces under `knowledgebase/` (adminguide + userguide) into mkdocs-material Markdown and renders one browsable HTML site, so that `cd site && ./build.sh && mkdocs build --strict` produces `site/_site/`.

**Architecture:** Port the MoveData handover pack's Node transform scripts into `site/bin/`, reworked for Maica's TWO-space layout. `build.sh` is a plain linear driver: stage each space into `site/build/<space>/`, run the converters over each build dir, then generate one merged mkdocs `nav:` spanning both spaces. mkdocs-material (stock theme, built-in search) renders `site/build/` → `site/_site/`. This plan STOPS before any AWS / Terraform / CI (Plan 2).

**Tech Stack:** Node.js (ESM, stdlib only) for transforms; `node:test` + `node:assert` for unit tests; Python + mkdocs 1.6.1 + mkdocs-material 9.7.4 + pymdown-extensions 10.21 for the build; bash for the driver.

## Global Constraints

- **Python deps (exact pins):** `mkdocs==1.6.1`, `mkdocs-material==9.7.4`, `pymdown-extensions==10.21`. Do NOT include `mkdocs-shadcn` or `algoliasearch`.
- **Node:** ESM modules (`"type": "module"` in `site/package.json`). Transform scripts use Node stdlib only (`node:fs/promises`, `node:fs`, `node:path`, `node:url`). No runtime npm dependencies.
- **Tests:** Node's built-in test runner only — `node --test`, `node:test`, `node:assert/strict`. No new test deps.
- **Two spaces:** `knowledgebase/adminguide/` and `knowledgebase/userguide/`, each with its own `README.md` + `SUMMARY.md` and its own `.gitbook/assets/`. Every transform runs PER SPACE and outputs to `site/build/adminguide/` and `site/build/userguide/`.
- **`README.md` → `index.md`** at every depth. Merge each space's `.gitbook/assets/` into `site/build/<space>/assets/` (per-space assets root, NOT shared).
- **Asset path rewriting:** rewrite `(../)*.gitbook/assets/<file>` in BOTH Markdown image/link syntax AND raw-HTML `src="..."` / `href="..."` attributes (all 341 Maica images are HTML `<figure><img>` form). Leave external `http(s)://` URLs untouched.
- **Nav:** parse BOTH `SUMMARY.md` files into ONE mkdocs `nav:` with two top-level sections, `Admin Guide` then `User Guide`. Honour GitBook `##` sub-section headings as nav groups. Strip encoded `&#x20;` and `&amp;#x20;` from titles/headings. Pass external-URL SUMMARY entries straight through as `- Title: https://...`.
- **mkdocs.yml:** stock `theme: name: material` (NOT shadcn). `plugins: [search]` (built-in). `docs_dir: build`, `site_dir: _site`. Maica logo/favicon/palette via a minimal `overrides/` custom_dir. NO Algolia (`extra_javascript`/algolia-config bake), NO `auth.js`.
- **`site_url`** is the ONE acceptable placeholder: leave it as a commented-out TODO (domain decided later, Plan 2). Call it out explicitly in the config.
- **Do NOT port:** `generate-metadata-aws.js`, `sync-to-algolia.js`, the Algolia config-bake step, `publish-ai.sh`, `resolve-stage.sh`/`load-env.sh`, any `moon.yml` wiring.
- **`build.sh`** starts with `set -euo pipefail` and is a plain linear driver (no moon, no env-var gates).
- **Gitignore:** `site/build/`, `site/_site/`, and the generated `site/mkdocs.yml` must be gitignored (the committed config is `site/mkdocs.yml.template`).
- **Commit scope:** every commit in this plan touches only `site/` (plus the plan's own gitignore lives at `site/.gitignore`). Do NOT commit `site/build/`, `site/_site/`, or `site/mkdocs.yml`.

---

## Coverage findings (from the real `knowledgebase/`, both spaces, 349 files)

Recorded here so every task implementer shares the same ground truth:

| GitBook construct | Count | Handled by | Notes |
|---|---|---|---|
| `{% hint style="X" %}…{% endhint %}` | 1146 | `convert-hints.js` (Task 2) | styles present: `info` (802), `success` (178), `warning` (142), `danger` (24) — all mapped |
| `<details><summary>…</details>` | 106 | `convert-collapse.js` (Task 3) | — |
| legacy `!!! note` Metadata blocks | 3 files | `convert-metadata.js` (Task 4) | rare; ported verbatim |
| `{% embed url="X" %}` (self-closing) | 11 | `convert-embeds.js` (Task 5) | YouTube/Vimeo/Arcade/generic |
| `{% embed url="X" %}caption{% endembed %}` (block) | 38 | `convert-embeds.js` (Task 5, REWORK) | pack left a stray `{% endembed %}` + caption — reworked here |
| `{% code title="X" %}```…```{% endcode %}` | 33 | `convert-code.js` (Task 6, **NEW**) | not covered by the pack |
| `{% stepper %}{% step %}…{% endstep %}{% endstepper %}` | 14 steppers / 55 steps | `convert-steppers.js` (Task 7, **NEW**) | not covered by the pack |
| HTML `<figure><img src="(../)*.gitbook/assets/…">` | 341 (ALL images) | `stage-articles.mjs` (Task 8, REWORK) | pack only rewrote Markdown `![]()` — Maica has **zero** Markdown image refs |
| `<table data-view="cards">` | 5 | passthrough (known gap) | see below |
| `&#x20;` / `&amp;#x20;` in SUMMARY headings/titles | many | `generate-nav.mjs` (Task 9) | stripped |
| external-URL SUMMARY entries (e.g. Licence Agreement Google Doc) | several | `generate-nav.mjs` (Task 9) | passed through |

**Known gaps / passthroughs (deliberate, no converter):**

- **`<table data-view="cards">` (5 instances, all in space `README.md`s):** rendered as plain HTML tables via `md_in_html`. The GitBook-only attributes (`data-view`, `data-card-target`, `data-type`) are inert in the browser. Their internal `<a href="...">` links are raw HTML, so mkdocs `--strict` does NOT validate them; with mkdocs directory-URLs they resolve at runtime. Rationale: these are decorative "discover" grids on 3 index pages; converting them to Material grid cards is cosmetic polish out of scope for the build deliverable. Documented as a Plan-2/future follow-up.
- **`<figure><figcaption></figcaption></figure>` wrappers:** rendered natively by `md_in_html` + `attr_list`. No conversion needed; only the `img src` inside needs rewriting (Task 8).

---

## File structure (created by this plan, all under `site/`)

```
site/
├── .gitignore                 # build/, _site/, mkdocs.yml, node_modules/
├── package.json               # ESM, no deps, "test" script
├── requirements.txt           # mkdocs 1.6.1 + material 9.7.4 + pymdown 10.21
├── mkdocs.yml.template         # committed config WITHOUT nav (generate-nav appends → mkdocs.yml)
├── build.sh                   # linear driver (set -euo pipefail)
├── overrides/
│   └── (custom_dir; empty is fine — logo/favicon live in assets, palette in yml)
├── assets/                    # branding assets copied to build/assets/ by build.sh (docs_dir root)
│   ├── maica-logo.svg
│   └── maica-favicon.svg
└── bin/
    ├── stage-articles.mjs     # REWORK: per-space, README→index, HTML+MD asset rewrite
    ├── convert-hints.js       # port verbatim
    ├── convert-collapse.js    # port verbatim
    ├── convert-metadata.js    # port verbatim
    ├── convert-embeds.js      # REWORK: block-form {% endembed %}
    ├── convert-code.js        # NEW
    ├── convert-steppers.js    # NEW
    ├── generate-nav.mjs       # REWRITE: two SUMMARYs, ## groups, &#x20;, external URLs
    └── __tests__/
        ├── convert-hints.test.mjs
        ├── convert-collapse.test.mjs
        ├── convert-metadata.test.mjs
        ├── convert-embeds.test.mjs
        ├── convert-code.test.mjs
        ├── convert-steppers.test.mjs
        ├── stage-articles.test.mjs
        └── generate-nav.test.mjs
```

Generated at build time (gitignored): `site/build/`, `site/_site/`, `site/mkdocs.yml`.

Note on branding assets: the logo/favicon SVGs in Task 10 are concrete, complete Maica wordmarks in the working brand teal `#12B5A5`. The hex is a sensible working default; refining it to the exact brand token is cosmetic and can happen any time — it is NOT a blocking placeholder.

---

### Task 1: Scaffold `site/` (package, requirements, gitignore, test wiring)

**Files:**
- Create: `site/package.json`
- Create: `site/requirements.txt`
- Create: `site/.gitignore`
- Create: `site/bin/__tests__/.gitkeep`

**Interfaces:**
- Consumes: nothing.
- Produces: `npm test` in `site/` runs `node --test bin/__tests__/`; `site/requirements.txt` installs the pinned mkdocs stack. All later tasks put converters in `site/bin/` and tests in `site/bin/__tests__/`.

- [ ] **Step 1: Write the failing test — assert scaffold files exist and are well-formed**

Create `site/bin/__tests__/scaffold.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

test('package.json is ESM with a node --test script and no deps', () => {
  const pkg = JSON.parse(readFileSync(path.join(SITE, 'package.json'), 'utf8'));
  assert.equal(pkg.type, 'module');
  assert.match(pkg.scripts.test, /node --test/);
  assert.equal(pkg.dependencies, undefined);
});

test('requirements.txt pins mkdocs, material, pymdown and excludes shadcn/algolia', () => {
  const req = readFileSync(path.join(SITE, 'requirements.txt'), 'utf8');
  assert.match(req, /^mkdocs==1\.6\.1$/m);
  assert.match(req, /^mkdocs-material==9\.7\.4$/m);
  assert.match(req, /^pymdown-extensions==10\.21$/m);
  assert.doesNotMatch(req, /shadcn/i);
  assert.doesNotMatch(req, /algolia/i);
});

test('.gitignore ignores build, _site and generated mkdocs.yml', () => {
  const gi = readFileSync(path.join(SITE, '.gitignore'), 'utf8');
  for (const entry of ['build/', '_site/', 'mkdocs.yml']) {
    assert.ok(gi.split('\n').includes(entry), `missing gitignore entry: ${entry}`);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/scaffold.test.mjs`
Expected: FAIL — `Cannot find module '.../site/package.json'` (files not created yet).

- [ ] **Step 3: Create `site/package.json`**

```json
{
  "name": "maica-docs-site",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "description": "Maica docs-site build pipeline (GitBook -> mkdocs-material transform).",
  "scripts": {
    "test": "node --test bin/__tests__/"
  }
}
```

- [ ] **Step 4: Create `site/requirements.txt`**

```
# Maica docs site - Python build dependencies
# Install: pip install -r requirements.txt
# Build:   ./build.sh && mkdocs build --strict
mkdocs==1.6.1
mkdocs-material==9.7.4
pymdown-extensions==10.21
```

- [ ] **Step 5: Create `site/.gitignore`**

```
# Transform + render output (regenerated by build.sh + mkdocs)
build/
_site/

# Generated at build time from mkdocs.yml.template by bin/generate-nav.mjs
mkdocs.yml

# Node
node_modules/
```

- [ ] **Step 6: Create `site/bin/__tests__/.gitkeep`** (empty file, so the test dir exists in git before any test lands).

```
```

- [ ] **Step 7: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/scaffold.test.mjs`
Expected: PASS — `# pass 3`, `# fail 0`.

- [ ] **Step 8: Verify the Python stack installs (integration sanity)**

Run: `cd site && python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt && ./.venv/bin/mkdocs --version`
Expected: prints `mkdocs, version 1.6.1 from ...`. (Add `.venv/` to `site/.gitignore` if you keep it; or `rm -rf site/.venv` after — do not commit it.)

- [ ] **Step 9: Commit**

```bash
git add site/package.json site/requirements.txt site/.gitignore site/bin/__tests__/.gitkeep site/bin/__tests__/scaffold.test.mjs
git commit -m "build: scaffold site/ docs-build pipeline (package, requirements, gitignore)"
```

---

### Task 2: `convert-hints.js` (port verbatim)

Converts `{% hint style="X" %}…{% endhint %}` → Material `!!! <type>` admonitions.

**Files:**
- Create: `site/bin/convert-hints.js`
- Test: `site/bin/__tests__/convert-hints.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `convertHints(content) -> { content, updated }`; also exports `processDirectory`, `processMarkdownFile`, `getAllMarkdownFiles`. CLI: `node bin/convert-hints.js <dir> [--dry-run]`.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/convert-hints.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertHints } from '../convert-hints.js';

test('info hint -> !!! note', () => {
  const src = '{% hint style="info" %}\nBe careful here.\n{% endhint %}';
  const { content, updated } = convertHints(src);
  assert.equal(updated, 1);
  assert.match(content, /^!!! note\n {4}Be careful here\.$/);
});

test('warning hint with bold title -> titled admonition', () => {
  const src = '{% hint style="warning" %}\n**Watch out**: do not do this.\n{% endhint %}';
  const { content } = convertHints(src);
  assert.match(content, /^!!! warning "Watch out"\n {4}do not do this\./);
});

test('style map covers success and danger', () => {
  assert.match(convertHints('{% hint style="success" %}\nok\n{% endhint %}').content, /^!!! success/);
  assert.match(convertHints('{% hint style="danger" %}\nno\n{% endhint %}').content, /^!!! danger/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/convert-hints.test.mjs`
Expected: FAIL — `Cannot find module '../convert-hints.js'`.

- [ ] **Step 3: Create `site/bin/convert-hints.js` (verbatim port)**

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Map GitBook hint styles to MkDocs admonition types
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

function convertHints(content) {
  const hintPattern = /\{%\s*hint\s+style="([^"]+)"\s*%\}\s*([\s\S]*?)\s*\{%\s*endhint\s*%\}/g;
  let updated = 0;
  const updatedContent = content.replace(hintPattern, (match, style, hintContent) => {
    updated++;
    return convertHint(match, style, hintContent);
  });
  return { content: updatedContent, updated };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertHints(content);
    if (updated > 0) {
      if (!dryRun) fs.writeFileSync(filePath, converted, 'utf8');
      return { success: true, changed: true, updated, path: filePath };
    }
    return { success: true, changed: false, updated: 0, path: filePath };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false) {
  const markdownFiles = getAllMarkdownFiles(contentPath);
  const results = { total: 0, changed: 0, unchanged: 0, totalHints: 0, errors: 0, files: [] };
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    if (result.success) {
      if (result.changed) { results.changed++; results.totalHints += result.updated; }
      else results.unchanged++;
    } else results.errors++;
  }
  console.error(`hints: files=${results.total} changed=${results.changed} converted=${results.totalHints} errors=${results.errors}`);
  return results;
}

export { convertHints, processMarkdownFile, processDirectory, getAllMarkdownFiles };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-hints.js');
if (runningAsScript) {
  const args = process.argv.slice(2);
  if (args.length < 1) { console.error('Usage: node convert-hints.js <contentPath> [--dry-run]'); process.exit(1); }
  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  if (!fs.existsSync(contentPath) || !fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: not a directory: ${contentPath}`); process.exit(1);
  }
  const results = processDirectory(contentPath, dryRun);
  process.exit(results.errors > 0 ? 1 : 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/convert-hints.test.mjs`
Expected: PASS — `# pass 3`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/convert-hints.js site/bin/__tests__/convert-hints.test.mjs
git commit -m "build: port convert-hints (GitBook hints -> Material admonitions)"
```

---

### Task 3: `convert-collapse.js` (port verbatim)

Converts `<details><summary>…</summary>…</details>` → `??? note "…"` collapsibles.

**Files:**
- Create: `site/bin/convert-collapse.js`
- Test: `site/bin/__tests__/convert-collapse.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `convertCollapse(content) -> { content, updated }`; plus `processDirectory`, `processMarkdownFile`, `getAllMarkdownFiles`. CLI: `node bin/convert-collapse.js <dir> [--dry-run]`.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/convert-collapse.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertCollapse } from '../convert-collapse.js';

test('<details><summary> -> ??? note', () => {
  const src = '<details>\n<summary>More info</summary>\nHidden body line.\n</details>';
  const { content, updated } = convertCollapse(src);
  assert.equal(updated, 1);
  assert.match(content, /^\?\?\? note "More info"\n {4}Hidden body line\.$/);
});

test('no details -> unchanged', () => {
  const { content, updated } = convertCollapse('plain text');
  assert.equal(updated, 0);
  assert.equal(content, 'plain text');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/convert-collapse.test.mjs`
Expected: FAIL — `Cannot find module '../convert-collapse.js'`.

- [ ] **Step 3: Create `site/bin/convert-collapse.js` (verbatim port)**

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function convertCollapse(content) {
  let updated = 0;
  const detailsPattern = /<details>\s*<summary>([^<]+)<\/summary>([\s\S]*?)<\/details>/g;
  const updatedContent = content.replace(detailsPattern, (match, summary, body) => {
    updated++;
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
  return { content: updatedContent, updated };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertCollapse(content);
    if (updated > 0) {
      if (!dryRun) fs.writeFileSync(filePath, converted, 'utf8');
      return { success: true, changed: true, updated, path: filePath };
    }
    return { success: true, changed: false, updated: 0, path: filePath };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false) {
  const markdownFiles = getAllMarkdownFiles(contentPath);
  const results = { total: 0, changed: 0, unchanged: 0, totalCollapses: 0, errors: 0, files: [] };
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    if (result.success) {
      if (result.changed) { results.changed++; results.totalCollapses += result.updated; }
      else results.unchanged++;
    } else results.errors++;
  }
  console.error(`collapse: files=${results.total} changed=${results.changed} converted=${results.totalCollapses} errors=${results.errors}`);
  return results;
}

export { convertCollapse, processMarkdownFile, processDirectory, getAllMarkdownFiles };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-collapse.js');
if (runningAsScript) {
  const args = process.argv.slice(2);
  if (args.length < 1) { console.error('Usage: node convert-collapse.js <contentPath> [--dry-run]'); process.exit(1); }
  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  if (!fs.existsSync(contentPath) || !fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: not a directory: ${contentPath}`); process.exit(1);
  }
  const results = processDirectory(contentPath, dryRun);
  process.exit(results.errors > 0 ? 1 : 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/convert-collapse.test.mjs`
Expected: PASS — `# pass 2`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/convert-collapse.js site/bin/__tests__/convert-collapse.test.mjs
git commit -m "build: port convert-collapse (details/summary -> collapsible admonition)"
```

---

### Task 4: `convert-metadata.js` (port verbatim)

Converts legacy `!!! note` Metadata blocks (`* key=value` bullets) → YAML frontmatter. Only 3 Maica files match, but the transform is idempotent and safe.

**Files:**
- Create: `site/bin/convert-metadata.js`
- Test: `site/bin/__tests__/convert-metadata.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `convertNoteToFrontmatter(content, debug=false) -> { content, changed }`; plus `parseMetadataFromNote`, `metadataToYamlFrontmatter`, `parseExistingFrontmatter`, `mergeFrontmatter`, `frontmatterToYaml`, `processMarkdownFile`, `processDirectory`, `getAllMarkdownFiles`. CLI: `node bin/convert-metadata.js <dir> [--dry-run] [--debug]`.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/convert-metadata.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertNoteToFrontmatter } from '../convert-metadata.js';

test('metadata note block -> frontmatter', () => {
  const src = '!!! note\n    Metadata\n\n    * tags=alpha, beta\n    * draft=false\n\nBody paragraph.';
  const { content, changed } = convertNoteToFrontmatter(src);
  assert.equal(changed, true);
  assert.match(content, /^---\ntags:\n {2}- alpha\n {2}- beta\ndraft: false\n---/);
  assert.match(content, /Body paragraph\./);
});

test('no metadata note -> unchanged', () => {
  const src = 'Just a normal page.\n';
  const { content, changed } = convertNoteToFrontmatter(src);
  assert.equal(changed, false);
  assert.equal(content, src);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/convert-metadata.test.mjs`
Expected: FAIL — `Cannot find module '../convert-metadata.js'`.

- [ ] **Step 3: Create `site/bin/convert-metadata.js` (verbatim port)**

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function parseMetadataFromNote(noteContent) {
  const metadata = {};
  const lines = noteContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(/^\*\s*([^=]+?)\s*=\s*(.+)$/);
    if (match) {
      const key = match[1].trim();
      const rawValue = match[2].trim();
      if (rawValue.includes(',')) {
        metadata[key] = rawValue.split(',').map(i => i.trim()).filter(i => i.length > 0);
      } else {
        let value = rawValue;
        if (value.toLowerCase() === 'true') value = true;
        else if (value.toLowerCase() === 'false') value = false;
        else if (/^\d+$/.test(value)) value = parseInt(value, 10);
        else if (/^\d*\.\d+$/.test(value)) value = parseFloat(value);
        metadata[key] = value;
      }
    }
  }
  return metadata;
}

function metadataToYamlFrontmatter(metadata) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => lines.push(`  - ${item}`));
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function parseExistingFrontmatter(content) {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterPattern);
  if (!match) return { frontmatter: null, contentWithoutFrontmatter: content };
  const frontmatterText = match[1];
  const contentWithoutFrontmatter = content.slice(match[0].length);
  const parsed = {};
  let currentArray = null;
  for (const line of frontmatterText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        let item = trimmed.substring(2).trim();
        if (item.toLowerCase() === 'true') item = true;
        else if (item.toLowerCase() === 'false') item = false;
        else if (/^\d+$/.test(item)) item = parseInt(item, 10);
        else if (/^\d*\.\d+$/.test(item)) item = parseFloat(item);
        currentArray.push(item);
      }
      continue;
    }
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      if (value) {
        let parsedValue = value;
        if (value.toLowerCase() === 'true') parsedValue = true;
        else if (value.toLowerCase() === 'false') parsedValue = false;
        else if (/^\d+$/.test(value)) parsedValue = parseInt(value, 10);
        else if (/^\d*\.\d+$/.test(value)) parsedValue = parseFloat(value);
        parsed[key] = parsedValue;
        currentArray = null;
      } else {
        currentArray = [];
        parsed[key] = currentArray;
      }
    }
  }
  return { frontmatter: parsed, contentWithoutFrontmatter };
}

function mergeFrontmatter(existing, newMetadata) {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(newMetadata)) {
    if (!merged.hasOwnProperty(key)) {
      merged[key] = value;
    } else if (Array.isArray(value) && Array.isArray(merged[key])) {
      merged[key] = [...new Set([...merged[key], ...value])];
    }
  }
  return merged;
}

function frontmatterToYaml(frontmatter) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => lines.push(`  - ${item}`));
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function convertNoteToFrontmatter(content, debug = false) {
  const notePattern = /^!!! note\s*\n(?:\s{4}Metadata\s*\n)?(?:\s{4}\n)?((?:\s{4}\*[^\n]+\n?)+)/m;
  const match = content.match(notePattern);
  if (!match) return { content, changed: false };
  const metadata = parseMetadataFromNote(match[1]);
  if (Object.keys(metadata).length === 0) return { content, changed: false };
  const { frontmatter: existingFrontmatter, contentWithoutFrontmatter } = parseExistingFrontmatter(content);
  const contentWithoutNote = contentWithoutFrontmatter.replace(notePattern, '').trim();
  let finalFrontmatter;
  if (existingFrontmatter) {
    finalFrontmatter = frontmatterToYaml(mergeFrontmatter(existingFrontmatter, metadata));
  } else {
    finalFrontmatter = metadataToYamlFrontmatter(metadata);
  }
  return { content: `${finalFrontmatter}\n\n${contentWithoutNote}`, changed: true };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false, debug = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, changed } = convertNoteToFrontmatter(content, debug);
    if (changed) {
      if (!dryRun) fs.writeFileSync(filePath, converted, 'utf8');
      return { success: true, changed: true, path: filePath };
    }
    return { success: true, changed: false, path: filePath };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false, debug = false) {
  const markdownFiles = getAllMarkdownFiles(contentPath);
  const results = { total: 0, changed: 0, unchanged: 0, errors: 0, files: [] };
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun, debug);
    results.files.push(result);
    if (result.success) { result.changed ? results.changed++ : results.unchanged++; }
    else results.errors++;
  }
  console.error(`metadata: files=${results.total} changed=${results.changed} errors=${results.errors}`);
  return results;
}

export {
  convertNoteToFrontmatter, parseMetadataFromNote, metadataToYamlFrontmatter,
  parseExistingFrontmatter, mergeFrontmatter, frontmatterToYaml,
  processMarkdownFile, processDirectory, getAllMarkdownFiles
};

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-metadata.js');
if (runningAsScript) {
  const args = process.argv.slice(2);
  if (args.length < 1) { console.error('Usage: node convert-metadata.js <contentPath> [--dry-run] [--debug]'); process.exit(1); }
  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  const debug = args.includes('--debug');
  if (!fs.existsSync(contentPath) || !fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: not a directory: ${contentPath}`); process.exit(1);
  }
  const results = processDirectory(contentPath, dryRun, debug);
  process.exit(results.errors > 0 ? 1 : 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/convert-metadata.test.mjs`
Expected: PASS — `# pass 2`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/convert-metadata.js site/bin/__tests__/convert-metadata.test.mjs
git commit -m "build: port convert-metadata (legacy note metadata -> YAML frontmatter)"
```

---

### Task 5: `convert-embeds.js` (rework: block-form `{% endembed %}`)

Converts `{% embed url="X" %}` → responsive iframe. Maica has 38 BLOCK-form embeds (`{% embed url="X" %}\ncaption\n{% endembed %}`) plus 11 self-closing. The pack's regex only matched self-closing, leaving stray `{% endembed %}` + caption text behind. Rework: match the optional block body and drop it.

**Files:**
- Create: `site/bin/convert-embeds.js`
- Test: `site/bin/__tests__/convert-embeds.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `convertEmbeds(content) -> { content, updated }`; plus `extractYouTubeId`, `extractVimeoId`, `extractArcadeId`, `processDirectory`, `processMarkdownFile`, `getAllMarkdownFiles`. CLI: `node bin/convert-embeds.js <dir> [--dry-run]`.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/convert-embeds.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertEmbeds } from '../convert-embeds.js';

test('self-closing YouTube embed -> iframe', () => {
  const src = '{% embed url="https://youtu.be/abc123" %}';
  const { content, updated } = convertEmbeds(src);
  assert.equal(updated, 1);
  assert.match(content, /<iframe[^>]+youtube\.com\/embed\/abc123/);
});

test('block-form embed with caption drops endembed and caption', () => {
  const src = '{% embed url="https://app.arcade.software/share/XYZ" %}\nHow to do it.\n{% endembed %}';
  const { content, updated } = convertEmbeds(src);
  assert.equal(updated, 1);
  assert.match(content, /demo\.arcade\.software\/XYZ/);
  assert.doesNotMatch(content, /endembed/);
  assert.doesNotMatch(content, /How to do it\./);
});

test('generic url -> generic iframe', () => {
  const { content } = convertEmbeds('{% embed url="https://www.maica.com.au/" %}');
  assert.match(content, /<iframe[^>]+src="https:\/\/www\.maica\.com\.au\/"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/convert-embeds.test.mjs`
Expected: FAIL — `Cannot find module '../convert-embeds.js'`.

- [ ] **Step 3: Create `site/bin/convert-embeds.js` (reworked port — note the `embedPattern` change)**

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /youtube\.com\/watch\?.*v=([^&\s]+)/
  ];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}

function extractVimeoId(url) {
  const patterns = [/vimeo\.com\/(\d+)/, /player\.vimeo\.com\/video\/(\d+)/];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}

function extractArcadeId(url) {
  const patterns = [/app\.arcade\.software\/share\/([^/?]+)/, /demo\.arcade\.software\/([^/?]+)/];
  for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
  return null;
}

function createYouTubeEmbed(videoId) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function createVimeoEmbed(videoId) {
  return `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Vimeo Video"></iframe></div>`;
}

function createArcadeEmbed(arcadeId) {
  return `<!--ARCADE EMBED START--><div style="position: relative; max-height: 540px; width: 100%; aspect-ratio: 1; margin: 30px 10px;"><iframe src="https://demo.arcade.software/${arcadeId}?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true" title="Arcade Demo" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; color-scheme: light;" ></iframe></div><!--ARCADE EMBED END-->`;
}

function convertEmbed(url) {
  const youtubeId = extractYouTubeId(url);
  if (youtubeId) return createYouTubeEmbed(youtubeId);
  const vimeoId = extractVimeoId(url);
  if (vimeoId) return createVimeoEmbed(vimeoId);
  const arcadeId = extractArcadeId(url);
  if (arcadeId) return createArcadeEmbed(arcadeId);
  return `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
}

function convertEmbeds(content) {
  // REWORK: match BOTH self-closing `{% embed url="X" %}` and block-form
  // `{% embed url="X" %}<optional caption>{% endembed %}`. The optional
  // (?:...) group non-greedily swallows any caption body plus the closing tag.
  const embedPattern = /\{%\s*embed\s+url="([^"]+)"\s*%\}(?:[\s\S]*?\{%\s*endembed\s*%\})?/g;
  let updated = 0;
  const updatedContent = content.replace(embedPattern, (match, url) => {
    updated++;
    return convertEmbed(url);
  });
  return { content: updatedContent, updated };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertEmbeds(content);
    if (updated > 0) {
      if (!dryRun) fs.writeFileSync(filePath, converted, 'utf8');
      return { success: true, changed: true, updated, path: filePath };
    }
    return { success: true, changed: false, updated: 0, path: filePath };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false) {
  const markdownFiles = getAllMarkdownFiles(contentPath);
  const results = { total: 0, changed: 0, unchanged: 0, totalEmbeds: 0, errors: 0, files: [] };
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    if (result.success) {
      if (result.changed) { results.changed++; results.totalEmbeds += result.updated; }
      else results.unchanged++;
    } else results.errors++;
  }
  console.error(`embeds: files=${results.total} changed=${results.changed} converted=${results.totalEmbeds} errors=${results.errors}`);
  return results;
}

export { convertEmbeds, processMarkdownFile, processDirectory, getAllMarkdownFiles, extractYouTubeId, extractVimeoId, extractArcadeId };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-embeds.js');
if (runningAsScript) {
  const args = process.argv.slice(2);
  if (args.length < 1) { console.error('Usage: node convert-embeds.js <contentPath> [--dry-run]'); process.exit(1); }
  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  if (!fs.existsSync(contentPath) || !fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: not a directory: ${contentPath}`); process.exit(1);
  }
  const results = processDirectory(contentPath, dryRun);
  process.exit(results.errors > 0 ? 1 : 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/convert-embeds.test.mjs`
Expected: PASS — `# pass 3`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/convert-embeds.js site/bin/__tests__/convert-embeds.test.mjs
git commit -m "build: port+rework convert-embeds (handle block-form endembed)"
```

---

### Task 6: `convert-code.js` (NEW — GitBook `{% code %}` blocks)

Converts `{% code title="X" %}\n```lang\n…\n```\n{% endcode %}` → a Material fenced code block with the title folded into the fence info string: ```` ```lang title="X" ````. Strips the wrapper tags. 33 occurrences (all `adminguide` data-object formula blocks).

**Files:**
- Create: `site/bin/convert-code.js`
- Test: `site/bin/__tests__/convert-code.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `convertCode(content) -> { content, updated }`; plus `processDirectory`, `processMarkdownFile`, `getAllMarkdownFiles`. CLI: `node bin/convert-code.js <dir> [--dry-run]`.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/convert-code.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertCode } from '../convert-code.js';

test('code block with title -> fence title, wrappers stripped', () => {
  const src = '{% code title="Error Condition Formula" %}\n```apex\nAND(1,2)\n```\n{% endcode %}';
  const { content, updated } = convertCode(src);
  assert.equal(updated, 1);
  assert.match(content, /```apex title="Error Condition Formula"\nAND\(1,2\)\n```/);
  assert.doesNotMatch(content, /\{%/);
});

test('trailing space in title is trimmed', () => {
  const src = '{% code title="Error Condition Formula " %}\n```apex\nx\n```\n{% endcode %}';
  assert.match(convertCode(src).content, /title="Error Condition Formula"/);
});

test('code block without title -> wrappers stripped, fence untouched', () => {
  const src = '{% code %}\n```\nplain\n```\n{% endcode %}';
  const { content } = convertCode(src);
  assert.match(content, /```\nplain\n```/);
  assert.doesNotMatch(content, /code/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/convert-code.test.mjs`
Expected: FAIL — `Cannot find module '../convert-code.js'`.

- [ ] **Step 3: Create `site/bin/convert-code.js`**

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function convertCode(content) {
  let updated = 0;
  // Opening tag immediately followed by the opening fence line. Capture the
  // optional title and the fence's info string (e.g. ```apex). Fold the title
  // into the fence: ```apex  ->  ```apex title="X".
  const openPattern = /\{%\s*code(?:\s+title="([^"]*)")?\s*%\}\n(```[^\n]*)/g;
  let out = content.replace(openPattern, (match, title, fence) => {
    updated++;
    if (title && title.trim()) {
      return `${fence} title="${title.trim()}"`;
    }
    return fence;
  });
  // Remove the closing tag lines left behind.
  out = out.replace(/^[ \t]*\{%\s*endcode\s*%\}[ \t]*\n?/gm, '');
  return { content: out, updated };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertCode(content);
    if (updated > 0) {
      if (!dryRun) fs.writeFileSync(filePath, converted, 'utf8');
      return { success: true, changed: true, updated, path: filePath };
    }
    return { success: true, changed: false, updated: 0, path: filePath };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false) {
  const markdownFiles = getAllMarkdownFiles(contentPath);
  const results = { total: 0, changed: 0, unchanged: 0, totalBlocks: 0, errors: 0, files: [] };
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    if (result.success) {
      if (result.changed) { results.changed++; results.totalBlocks += result.updated; }
      else results.unchanged++;
    } else results.errors++;
  }
  console.error(`code: files=${results.total} changed=${results.changed} converted=${results.totalBlocks} errors=${results.errors}`);
  return results;
}

export { convertCode, processMarkdownFile, processDirectory, getAllMarkdownFiles };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-code.js');
if (runningAsScript) {
  const args = process.argv.slice(2);
  if (args.length < 1) { console.error('Usage: node convert-code.js <contentPath> [--dry-run]'); process.exit(1); }
  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  if (!fs.existsSync(contentPath) || !fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: not a directory: ${contentPath}`); process.exit(1);
  }
  const results = processDirectory(contentPath, dryRun);
  process.exit(results.errors > 0 ? 1 : 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/convert-code.test.mjs`
Expected: PASS — `# pass 3`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/convert-code.js site/bin/__tests__/convert-code.test.mjs
git commit -m "build: add convert-code (GitBook code blocks -> Material fenced titles)"
```

---

### Task 7: `convert-steppers.js` (NEW — GitBook steppers)

Converts `{% stepper %}{% step %}…{% endstep %}…{% endstepper %}` → an ordered (numbered) Markdown list. Each `{% step %}` becomes `N. <body>`; multi-line step bodies get 3-space continuation indent so they stay inside the list item. 14 steppers / 55 steps.

**Files:**
- Create: `site/bin/convert-steppers.js`
- Test: `site/bin/__tests__/convert-steppers.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `convertSteppers(content) -> { content, updated }`; plus `processDirectory`, `processMarkdownFile`, `getAllMarkdownFiles`. CLI: `node bin/convert-steppers.js <dir> [--dry-run]`. `updated` counts the number of stepper blocks converted.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/convert-steppers.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertSteppers } from '../convert-steppers.js';

test('stepper -> numbered list, tags stripped', () => {
  const src = [
    '{% stepper %}',
    '{% step %}',
    'First thing.',
    '{% endstep %}',
    '',
    '{% step %}',
    'Second thing.',
    '{% endstep %}',
    '{% endstepper %}',
  ].join('\n');
  const { content, updated } = convertSteppers(src);
  assert.equal(updated, 1);
  assert.match(content, /1\. First thing\./);
  assert.match(content, /2\. Second thing\./);
  assert.doesNotMatch(content, /\{%/);
});

test('multi-line step body gets continuation indent', () => {
  const src = '{% stepper %}\n{% step %}\nLine one.\nLine two.\n{% endstep %}\n{% endstepper %}';
  const { content } = convertSteppers(src);
  assert.match(content, /1\. Line one\.\n {3}Line two\./);
});

test('no stepper -> unchanged', () => {
  const { content, updated } = convertSteppers('nothing here');
  assert.equal(updated, 0);
  assert.equal(content, 'nothing here');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/convert-steppers.test.mjs`
Expected: FAIL — `Cannot find module '../convert-steppers.js'`.

- [ ] **Step 3: Create `site/bin/convert-steppers.js`**

```javascript
#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

function convertSteppers(content) {
  let updated = 0;
  const stepperPattern = /\{%\s*stepper\s*%\}([\s\S]*?)\{%\s*endstepper\s*%\}/g;
  const stepPattern = /\{%\s*step\s*%\}([\s\S]*?)\{%\s*endstep\s*%\}/g;

  const out = content.replace(stepperPattern, (match, inner) => {
    updated++;
    let n = 0;
    const items = [];
    let m;
    stepPattern.lastIndex = 0;
    while ((m = stepPattern.exec(inner)) !== null) {
      n++;
      const bodyLines = m[1].trim().split('\n');
      const first = (bodyLines.shift() || '').trim();
      const rest = bodyLines
        .map(line => (line.trim() ? `   ${line.trim()}` : ''))
        .join('\n');
      items.push(rest ? `${n}. ${first}\n${rest}` : `${n}. ${first}`);
    }
    return items.join('\n') + '\n';
  });

  return { content: out, updated };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) traverse(fullPath);
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
    }
  }
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertSteppers(content);
    if (updated > 0) {
      if (!dryRun) fs.writeFileSync(filePath, converted, 'utf8');
      return { success: true, changed: true, updated, path: filePath };
    }
    return { success: true, changed: false, updated: 0, path: filePath };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false) {
  const markdownFiles = getAllMarkdownFiles(contentPath);
  const results = { total: 0, changed: 0, unchanged: 0, totalSteppers: 0, errors: 0, files: [] };
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    if (result.success) {
      if (result.changed) { results.changed++; results.totalSteppers += result.updated; }
      else results.unchanged++;
    } else results.errors++;
  }
  console.error(`steppers: files=${results.total} changed=${results.changed} converted=${results.totalSteppers} errors=${results.errors}`);
  return results;
}

export { convertSteppers, processMarkdownFile, processDirectory, getAllMarkdownFiles };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-steppers.js');
if (runningAsScript) {
  const args = process.argv.slice(2);
  if (args.length < 1) { console.error('Usage: node convert-steppers.js <contentPath> [--dry-run]'); process.exit(1); }
  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  if (!fs.existsSync(contentPath) || !fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: not a directory: ${contentPath}`); process.exit(1);
  }
  const results = processDirectory(contentPath, dryRun);
  process.exit(results.errors > 0 ? 1 : 0);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/convert-steppers.test.mjs`
Expected: PASS — `# pass 3`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/convert-steppers.js site/bin/__tests__/convert-steppers.test.mjs
git commit -m "build: add convert-steppers (GitBook steppers -> numbered lists)"
```

---

### Task 8: `stage-articles.mjs` (rework: per-space, README→index, HTML+MD asset rewrite)

Stages ONE GitBook space into an mkdocs layout: copies Markdown, renames every `README.md`→`index.md`, merges the space's `.gitbook/assets/` into `<dest>/assets/`, and rewrites asset paths in BOTH Markdown and raw-HTML `src`/`href` forms. Invoked once per space by `build.sh`. (Branding logo/favicon are copied separately to `build/assets/` by `build.sh`, NOT here — the mkdocs `theme.logo` path resolves relative to `docs_dir`, i.e. `build/assets/`.)

**Files:**
- Create: `site/bin/stage-articles.mjs`
- Test: `site/bin/__tests__/stage-articles.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - named export `rewriteAssetPaths(content, upPrefix) -> string` — rewrites `(../)*.gitbook/assets/<file>` to `${upPrefix}assets/<file>` in Markdown `![]()`/`[]()` and HTML `src="…"`/`href="…"`.
  - named export `stageSpace(srcSpaceDir, destSpaceDir) -> Promise<counts>`.
  - CLI: `node bin/stage-articles.mjs <srcSpaceDir> <destSpaceDir>`.
- Output layout produced for `build.sh` and Task 9: `destSpaceDir/index.md` (from `README.md`), `destSpaceDir/<path>/index.md` (from nested `README.md`), all other `.md` copied at the same relative path, `destSpaceDir/assets/<file>` (merged GitBook assets for that space's page images). `SUMMARY.md` and `.gitbook/` are dropped.

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/stage-articles.test.mjs`:

```javascript
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

test('rewriteAssetPaths rewrites markdown image refs', () => {
  const src = '![alt](../../.gitbook/assets/x.png)';
  assert.equal(rewriteAssetPaths(src, '../../'), '![alt](../../assets/x.png)');
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
  await writeFile(path.join(srcSpace, 'README.md'), '# Home\n<figure><img src=".gitbook/assets/logo.png" alt=""></figure>');
  await writeFile(path.join(srcSpace, 'SUMMARY.md'), '* [Home](README.md)');
  await writeFile(path.join(srcSpace, 'data', 'README.md'), '# Data\n<img src="../.gitbook/assets/logo.png">');
  await writeFile(path.join(srcSpace, '.gitbook', 'assets', 'logo.png'), 'PNG');

  await stageSpace(srcSpace, destSpace);

  const indexTop = await readFile(path.join(destSpace, 'index.md'), 'utf8');
  assert.match(indexTop, /src="assets\/logo\.png"/);              // depth 0 -> no ../
  const indexData = await readFile(path.join(destSpace, 'data', 'index.md'), 'utf8');
  assert.match(indexData, /src="\.\.\/assets\/logo\.png"/);        // depth 1 -> one ../
  const assets = await readdir(path.join(destSpace, 'assets'));
  assert.ok(assets.includes('logo.png'));                          // gitbook asset merged
  const entries = await readdir(destSpace);
  assert.ok(!entries.includes('SUMMARY.md'));                      // SUMMARY dropped
  assert.ok(!entries.includes('.gitbook'));                        // .gitbook dropped
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/stage-articles.test.mjs`
Expected: FAIL — `Cannot find module '../stage-articles.mjs'`.

- [ ] **Step 3: Create `site/bin/stage-articles.mjs`**

```javascript
#!/usr/bin/env node
// Stage ONE GitBook space (e.g. knowledgebase/adminguide) into an mkdocs
// layout under a destination build dir:
//   - README.md -> index.md at every depth
//   - merge <space>/.gitbook/assets/ -> <dest>/assets/
//   - rewrite (../)*.gitbook/assets/<file> in Markdown AND raw HTML src/href
//   - drop SUMMARY.md and the .gitbook/ dir
// Branding (theme logo/favicon) is copied to build/assets/ by build.sh, not here.
// Usage: node stage-articles.mjs <srcSpaceDir> <destSpaceDir>

import { readFile, writeFile, readdir, mkdir, copyFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

// Markdown image/link refs: ![alt](.../ .gitbook/assets/file) or [text](...)
const ASSET_MD_RE = /(!?)\[([^\]]*)\]\(((?:\.\.\/)*)\.gitbook\/assets\/((?:[^()]|\([^()]*\))+)\)/g;
// Raw HTML attribute refs: src="(../)*.gitbook/assets/file" or href="..."
const ASSET_HTML_RE = /(src|href)="((?:\.\.\/)*)\.gitbook\/assets\/([^"]+)"/g;

function rewriteAssetPaths(content, upPrefix) {
  let out = content.replace(ASSET_MD_RE, (_, bang, text, _ups, file) => `${bang}[${text}](${upPrefix}assets/${file})`);
  out = out.replace(ASSET_HTML_RE, (_, attr, _ups, file) => `${attr}="${upPrefix}assets/${file}"`);
  return out;
}

async function walk(dir) {
  const out = [];
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...await walk(p));
    else if (ent.isFile()) out.push(p);
  }
  return out;
}

async function stageSpace(srcSpace, destSpace) {
  await rm(destSpace, { recursive: true, force: true });
  await mkdir(destSpace, { recursive: true });
  const assetsDest = path.join(destSpace, 'assets');
  await mkdir(assetsDest, { recursive: true });

  let mdCopied = 0, assetsMerged = 0, refsRewritten = 0, readmesRenamed = 0;

  // Merge the space's .gitbook/assets -> <dest>/assets
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
    if (rel.startsWith('.gitbook' + path.sep) || rel === '.gitbook') continue;
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
    // upPrefix: number of dirs the output file sits below the space root.
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/stage-articles.test.mjs`
Expected: PASS — `# pass 4`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/stage-articles.mjs site/bin/__tests__/stage-articles.test.mjs
git commit -m "build: rework stage-articles (per-space, README->index, HTML asset rewrite)"
```

---

### Task 9: `generate-nav.mjs` (rewrite: two SUMMARYs → one merged nav)

Parses BOTH `knowledgebase/adminguide/SUMMARY.md` and `knowledgebase/userguide/SUMMARY.md` into ONE mkdocs `nav:` with two top-level sections (`Admin Guide`, `User Guide`). Honours GitBook `##` sub-section headings as nav groups, `***` dividers reset to the space root, strips `&#x20;`/`&amp;#x20;`, rewrites `README.md`→`index.md` and prefixes each internal path with the space dir, and passes external `http(s)` links straight through. Reads the committed `site/mkdocs.yml.template` and writes `site/mkdocs.yml` (template + generated nav).

**Files:**
- Create: `site/bin/generate-nav.mjs`
- Test: `site/bin/__tests__/generate-nav.test.mjs`

**Interfaces:**
- Consumes: `site/mkdocs.yml.template` (Task 10 creates it; the unit test supplies its own inline template so Task 9 can be built/tested first).
- Produces:
  - named export `parseSummary(text) -> Node[]` where `Node = { title, link, children, isSection? }`.
  - named export `renderSpace(spaceTitle, spaceDir, summaryText) -> string` (the YAML fragment for one space).
  - named export `buildNav(spaces) -> string` where `spaces = [{ dir, title, summaryText }]`, returns the full `nav:\n…` block.
  - CLI: `node bin/generate-nav.mjs` (reads the two real SUMMARYs + template, writes `site/mkdocs.yml`).

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/generate-nav.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildNav } from '../generate-nav.mjs';

const adminSummary = [
  '# Table of contents',
  '',
  '* [Welcome to Maica Administration](README.md)',
  '',
  '## Getting Started',
  '',
  '* [Check Hosting](getting-started/check.md)',
  '* [Licence Agreement](https://docs.google.com/document/d/ABC/edit)',
  '',
  '## Data',
  '',
  '* [Data Objects](data/data-objects/README.md)',
  '  * [Appointment](data/data-objects/appointment.md)',
  '',
  '## Mobile Worker App&#x20;',
  '',
  '* [Mobile](mobile-worker-app/getting-started.md)',
  '',
  '***',
  '',
  '* [Enable Actions](enable-maica-actions.md)',
].join('\n');

const userSummary = [
  '# Table of contents',
  '',
  '* [Welcome to the Maica User Guide](README.md)',
].join('\n');

test('two spaces produce two top-level sections in order', () => {
  const nav = buildNav([
    { dir: 'adminguide', title: 'Admin Guide', summaryText: adminSummary },
    { dir: 'userguide', title: 'User Guide', summaryText: userSummary },
  ]);
  assert.match(nav, /^nav:\n/);
  const adminIdx = nav.indexOf('- Admin Guide:');
  const userIdx = nav.indexOf('- User Guide:');
  assert.ok(adminIdx > -1 && userIdx > -1 && adminIdx < userIdx);
});

test('space README -> prefixed index.md', () => {
  const nav = buildNav([{ dir: 'adminguide', title: 'Admin Guide', summaryText: adminSummary }]);
  assert.match(nav, /Welcome to Maica Administration: adminguide\/index\.md/);
});

test('## headings become nav groups; &#x20; stripped', () => {
  const nav = buildNav([{ dir: 'adminguide', title: 'Admin Guide', summaryText: adminSummary }]);
  assert.match(nav, /- Getting Started:/);
  assert.match(nav, /- Data:/);
  assert.match(nav, /- Mobile Worker App:/);          // trailing &#x20; removed
  assert.doesNotMatch(nav, /&#x20;/);
});

test('nested README -> dir/index.md, prefixed', () => {
  const nav = buildNav([{ dir: 'adminguide', title: 'Admin Guide', summaryText: adminSummary }]);
  assert.match(nav, /Data Objects: adminguide\/data\/data-objects\/index\.md/);
  assert.match(nav, /Appointment: adminguide\/data\/data-objects\/appointment\.md/);
});

test('external URL entry passed through unprefixed', () => {
  const nav = buildNav([{ dir: 'adminguide', title: 'Admin Guide', summaryText: adminSummary }]);
  assert.match(nav, /Licence Agreement: https:\/\/docs\.google\.com\/document\/d\/ABC\/edit/);
});

test('items after *** divider attach at space root, not under a group', () => {
  const nav = buildNav([{ dir: 'adminguide', title: 'Admin Guide', summaryText: adminSummary }]);
  // "Enable Actions" should be indented 4 spaces (direct child of Admin Guide),
  // the same level as the "- Getting Started:" group header.
  assert.match(nav, /\n {4}- Enable Actions: adminguide\/enable-maica-actions\.md\n/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/generate-nav.test.mjs`
Expected: FAIL — `Cannot find module '../generate-nav.mjs'`.

- [ ] **Step 3: Create `site/bin/generate-nav.mjs`**

```javascript
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/generate-nav.test.mjs`
Expected: PASS — `# pass 6`, `# fail 0`.

- [ ] **Step 5: Commit**

```bash
git add site/bin/generate-nav.mjs site/bin/__tests__/generate-nav.test.mjs
git commit -m "build: rewrite generate-nav (merge two SUMMARYs into one mkdocs nav)"
```

---

### Task 10: `mkdocs.yml.template` + `overrides/` + Maica branding assets

Creates the committed nav-less mkdocs config template, the `overrides/` custom_dir, and concrete Maica logo/favicon SVGs. `generate-nav.mjs` (Task 9) turns the template into `site/mkdocs.yml` at build time.

**Files:**
- Create: `site/mkdocs.yml.template`
- Create: `site/overrides/.gitkeep`
- Create: `site/assets/maica-logo.svg`
- Create: `site/assets/maica-favicon.svg`
- Test: `site/bin/__tests__/mkdocs-config.test.mjs`

**Interfaces:**
- Consumes: `buildNav` output (Task 9) is appended after the template's last line.
- Produces: a valid mkdocs-material config once nav is appended. `theme.custom_dir: overrides`, `theme.logo: assets/maica-logo.svg`, `theme.favicon: assets/maica-favicon.svg` (both resolved by mkdocs relative to `docs_dir`, i.e. `build/assets/…` — `build.sh` (Task 11) copies the branding SVGs from `site/assets/` into `build/assets/`).

- [ ] **Step 1: Write the failing test**

Create `site/bin/__tests__/mkdocs-config.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const tpl = () => readFileSync(path.join(SITE, 'mkdocs.yml.template'), 'utf8');

test('template selects stock material theme, not shadcn', () => {
  assert.match(tpl(), /^\s*name:\s*material\s*$/m);
  assert.doesNotMatch(tpl(), /shadcn/i);
});

test('template pins docs_dir=build, site_dir=_site', () => {
  assert.match(tpl(), /^docs_dir:\s*build\s*$/m);
  assert.match(tpl(), /^site_dir:\s*_site\s*$/m);
});

test('template uses built-in search plugin and no algolia/auth', () => {
  assert.match(tpl(), /plugins:\n\s*-\s*search/);
  assert.doesNotMatch(tpl(), /algolia/i);
  assert.doesNotMatch(tpl(), /auth\.js/i);
});

test('template declares required markdown_extensions', () => {
  const t = tpl();
  for (const ext of ['admonition', 'pymdownx.details', 'pymdownx.superfences', 'pymdownx.tabbed', 'attr_list', 'md_in_html', 'tables', 'toc', 'def_list', 'pymdownx.tasklist']) {
    assert.ok(t.includes(ext), `missing markdown extension: ${ext}`);
  }
});

test('site_url is present only as an intentional TODO comment', () => {
  const t = tpl();
  assert.match(t, /#\s*site_url:.*TODO/i);
  assert.doesNotMatch(t, /^site_url:/m);   // must NOT be an active key
});

test('template ends without a nav key (nav is generated)', () => {
  assert.doesNotMatch(tpl(), /^nav:/m);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/mkdocs-config.test.mjs`
Expected: FAIL — `ENOENT ... mkdocs.yml.template`.

- [ ] **Step 3: Create `site/mkdocs.yml.template`**

```yaml
site_name: Maica Documentation
site_description: Maica knowledge base — Admin Guide and User Guide

# site_url: TODO — set once the docs domain is decided (Plan 2 / go-live).
# Left commented intentionally; this is the one accepted placeholder per the design spec.

theme:
  name: material
  custom_dir: overrides
  logo: assets/maica-logo.svg
  favicon: assets/maica-favicon.svg
  palette:
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: teal
      accent: teal
      toggle:
        icon: material/weather-night
        name: Switch to dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: teal
      accent: teal
      toggle:
        icon: material/weather-sunny
        name: Switch to light mode
  features:
    - navigation.sections
    - navigation.top
    - search.suggest
    - content.code.copy

markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.tabbed:
      alternate_style: true
  - attr_list
  - md_in_html
  - tables
  - toc:
      permalink: "#"
  - def_list
  - pymdownx.tasklist:
      custom_checkbox: true

plugins:
  - search

docs_dir: build
site_dir: _site
```

- [ ] **Step 4: Create `site/overrides/.gitkeep`** (empty — `custom_dir` must exist; branding is done via palette + logo assets, no template overrides needed yet).

```
```

- [ ] **Step 5: Create `site/assets/maica-logo.svg`** (concrete Maica wordmark in working brand teal `#12B5A5`).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" role="img" aria-label="Maica">
  <rect x="2" y="8" width="24" height="24" rx="6" fill="#12B5A5"/>
  <path d="M8 26V14l5 7 5-7v12" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
  <text x="34" y="27" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" fill="currentColor">Maica</text>
</svg>
```

- [ ] **Step 6: Create `site/assets/maica-favicon.svg`** (concrete favicon glyph in the same teal).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Maica">
  <rect width="32" height="32" rx="7" fill="#12B5A5"/>
  <path d="M8 22V10l8 10 8-10v12" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 7: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/mkdocs-config.test.mjs`
Expected: PASS — `# pass 6`, `# fail 0`.

- [ ] **Step 8: Commit**

```bash
git add site/mkdocs.yml.template site/overrides/.gitkeep site/assets/maica-logo.svg site/assets/maica-favicon.svg site/bin/__tests__/mkdocs-config.test.mjs
git commit -m "build: add mkdocs material config template, overrides dir, Maica branding"
```

---

### Task 11: `build.sh` linear driver

The plain linear transform driver: stage both spaces, run the six converters over each build dir, generate the merged nav. `set -euo pipefail`, no moon, no env gates.

**Files:**
- Create: `site/build.sh` (executable)
- Test: `site/bin/__tests__/build-sh.test.mjs`

**Interfaces:**
- Consumes: all Task 2–10 scripts + `mkdocs.yml.template`.
- Produces: after running from `site/`, the directories `site/build/adminguide/` and `site/build/userguide/` (transformed Markdown + `assets/`) and the file `site/mkdocs.yml` (template + generated nav). This is exactly the input `mkdocs build` consumes in Task 12.

- [ ] **Step 1: Write the failing test** (an integration test that runs `build.sh` against a tiny two-space fixture rooted in a temp dir, by pointing the scripts at fixture paths)

Create `site/bin/__tests__/build-sh.test.mjs`:

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, cp, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

test('build.sh stages both spaces, converts, and generates nav', async () => {
  // Build an isolated fake repo: <root>/knowledgebase/{adminguide,userguide} + <root>/site (copy of real site/).
  const root = await mkdtemp(path.join(tmpdir(), 'buildsh-'));
  const kb = path.join(root, 'knowledgebase');
  for (const space of ['adminguide', 'userguide']) {
    await mkdir(path.join(kb, space, '.gitbook', 'assets'), { recursive: true });
    await writeFile(path.join(kb, space, 'README.md'),
      `# ${space}\n{% hint style="info" %}\nHello\n{% endhint %}\n<figure><img src=".gitbook/assets/x.png" alt=""></figure>`);
    await writeFile(path.join(kb, space, 'SUMMARY.md'), '* [Home](README.md)');
    await writeFile(path.join(kb, space, '.gitbook', 'assets', 'x.png'), 'PNG');
  }
  // Copy the real site/ tree (bin, build.sh, template, assets) into the fake
  // repo, skipping generated/vendor dirs by basename (so build.sh is kept).
  const SKIP = new Set(['build', '_site', 'node_modules', '.venv']);
  await cp(SITE, path.join(root, 'site'), { recursive: true, filter: (s) => !SKIP.has(path.basename(s)) });

  execFileSync('bash', ['build.sh'], { cwd: path.join(root, 'site'), stdio: 'pipe' });

  // Converters ran: hint became an admonition, img src rewritten.
  const adminIndex = await readFile(path.join(root, 'site', 'build', 'adminguide', 'index.md'), 'utf8');
  assert.match(adminIndex, /!!! note/);
  assert.match(adminIndex, /src="assets\/x\.png"/);
  // Assets merged per space.
  await access(path.join(root, 'site', 'build', 'userguide', 'assets', 'x.png'));
  // Nav generated with both spaces.
  const cfg = await readFile(path.join(root, 'site', 'mkdocs.yml'), 'utf8');
  assert.match(cfg, /- Admin Guide:/);
  assert.match(cfg, /- User Guide:/);
  assert.match(cfg, /docs_dir:\s*build/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && node --test bin/__tests__/build-sh.test.mjs`
Expected: FAIL — build.sh does not exist yet (`bash: build.sh: No such file or directory` surfaced via the thrown `execFileSync`).

- [ ] **Step 3: Create `site/build.sh` (executable)**

```bash
#!/usr/bin/env bash
# Linear GitBook -> mkdocs transform driver for the Maica docs site.
# Stages both spaces, runs the converters over each build dir, then generates
# the merged nav into mkdocs.yml. Run from site/:  ./build.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

REPO_ROOT="$(cd "$HERE/.." && pwd)"
KB="$REPO_ROOT/knowledgebase"
SPACES=(adminguide userguide)

echo "[1/3] stage spaces + branding"
rm -rf build
for space in "${SPACES[@]}"; do
  node bin/stage-articles.mjs "$KB/$space" "build/$space"
done
# Branding logo/favicon live at docs_dir root (build/assets) so theme.logo
# (assets/maica-logo.svg) resolves for every page.
mkdir -p build/assets
cp assets/* build/assets/

echo "[2/3] run converters over each build dir"
for space in "${SPACES[@]}"; do
  target="build/$space"
  node bin/convert-hints.js     "$target" 2>&1 | tail -1
  node bin/convert-collapse.js  "$target" 2>&1 | tail -1
  node bin/convert-embeds.js    "$target" 2>&1 | tail -1
  node bin/convert-code.js      "$target" 2>&1 | tail -1
  node bin/convert-steppers.js  "$target" 2>&1 | tail -1
  node bin/convert-metadata.js  "$target" 2>&1 | tail -1
done

echo "[3/3] generate merged nav -> mkdocs.yml"
node bin/generate-nav.mjs

echo "done. staged at: $HERE/build  (config: $HERE/mkdocs.yml)"
```

- [ ] **Step 4: Make it executable**

Run: `chmod +x site/build.sh`
Expected: no output; `test -x site/build.sh && echo ok` prints `ok`.

- [ ] **Step 5: Run test to verify it passes**

Run: `cd site && node --test bin/__tests__/build-sh.test.mjs`
Expected: PASS — `# pass 1`, `# fail 0`.

- [ ] **Step 6: Run the FULL node test suite to confirm nothing regressed**

Run: `cd site && npm test`
Expected: PASS — all suites green, `# fail 0`.

- [ ] **Step 7: Commit**

```bash
git add site/build.sh site/bin/__tests__/build-sh.test.mjs
git commit -m "build: add linear build.sh driver (stage + convert + generate nav)"
```

---

### Task 12: End-to-end real build + `mkdocs build --strict`

Runs the whole pipeline against the REAL `knowledgebase/` content and renders with `--strict`. `--strict` fails on broken internal links and pages missing from nav — this task drives those to zero.

**Files:**
- Modify (only if strict surfaces real issues): `site/bin/generate-nav.mjs`, `site/bin/stage-articles.mjs`, or `site/mkdocs.yml.template`.
- No new test file — the integration test IS `mkdocs build --strict`.

**Interfaces:**
- Consumes: everything from Tasks 1–11.
- Produces: `site/_site/` (rendered HTML) and a clean `--strict` build.

- [ ] **Step 1: Ensure the Python env is available**

Run: `cd site && python3 -m venv .venv && ./.venv/bin/pip install -r requirements.txt`
Expected: installs mkdocs 1.6.1 + material 9.7.4 + pymdown 10.21. (Add `.venv/` to `site/.gitignore` if not already covered by `node_modules/`; do NOT commit `.venv/`.)

- [ ] **Step 2: Run the transform driver against real content**

Run: `cd site && ./build.sh`
Expected: prints `[1/3] stage spaces`, `[2/3] run converters …`, `[3/3] generate merged nav …`, `done.`. `site/build/adminguide/` (149 pages) and `site/build/userguide/` (200 pages) exist, each with an `assets/` dir; `site/mkdocs.yml` exists.

- [ ] **Step 3: Sanity-grep the staged output for leftover GitBook syntax**

Run: `cd site && grep -rlE '\{%\s*(hint|endhint|embed|endembed|code|endcode|step|endstep|stepper|endstepper)' build/ || echo "CLEAN: no GitBook tags remain"`
Expected: `CLEAN: no GitBook tags remain`. (If any file is listed, the corresponding converter missed a variant — inspect the file, extend that converter's regex + add a unit test in its Task, re-run `./build.sh`.)

- [ ] **Step 4: Run the strict build**

Run: `cd site && ./.venv/bin/mkdocs build --strict`
Expected: `INFO - Cleaning site directory`, `INFO - Building documentation to directory: .../site/_site`, exit 0.

- [ ] **Step 5: Triage any strict failures (repeat until clean)**

Known failure shapes and remedies:
- `The following pages exist in the docs directory, but are not included in the "nav" …` → the page is a staged `.md` absent from that space's `SUMMARY.md`. Confirm against the source `SUMMARY.md`; if genuinely orphaned, either add it to the source `knowledgebase/<space>/SUMMARY.md` (preferred, so nav stays authoritative) or accept it by adding `validation: nav: omitted_files: info` to `mkdocs.yml.template` (documented as intentional). Re-run `./build.sh` after SUMMARY edits.
- `A relative path to '<x>' … was not found among documentation files` (a Markdown link to another page) → the target moved under README→index renaming or the link points to a `.md` that was renamed. Fix the link in the source page under `knowledgebase/`, OR if it is a raw-HTML `<a href>` (not Markdown), it will NOT trigger strict — ignore.
- `Doc file '…' contains an absolute link '/…'` → convert to a relative link in the source page.

After each fix: `cd site && ./build.sh && ./.venv/bin/mkdocs build --strict`. Loop until exit 0.

- [ ] **Step 6: Confirm the exact deliverable command works as a single line**

Run: `cd site && ./build.sh && ./.venv/bin/mkdocs build --strict && test -f _site/index.html && echo "DELIVERABLE OK"`
Expected: ends with `DELIVERABLE OK`. (Note: when mkdocs is installed globally rather than in `.venv`, the command is the literal spec form `cd site && ./build.sh && mkdocs build --strict`.)

- [ ] **Step 7: Commit** (only the source fixes made in Step 5, if any; `build/`, `_site/`, `mkdocs.yml`, `.venv/` stay untracked)

```bash
git add -A site/
git status   # verify NO build/, _site/, mkdocs.yml, .venv/, node_modules/ are staged
git commit -m "build: make real knowledgebase content pass mkdocs --strict"
```

If Step 5 required no source changes, skip the commit and note "no fixes needed — strict passed clean".

---

### Task 13: Serve and spot-check the rendered site

Renders the site locally and walks the spot-check list from the design spec (admonitions, collapsibles, embeds, code titles, steppers, images, both nav trees). Manual verification — no code change expected.

**Files:** none (verification task).

**Interfaces:**
- Consumes: a clean `--strict` build from Task 12.

- [ ] **Step 1: Serve the site**

Run: `cd site && ./.venv/bin/mkdocs serve` (Ctrl-C when done)
Expected: `INFO - Serving on http://127.0.0.1:8000/`.

- [ ] **Step 2: Verify the two-section nav**

Open `http://127.0.0.1:8000/`. Confirm the left nav shows two top-level sections — `Admin Guide` and `User Guide` (in that order) — each expanding into its `##` sub-sections (Getting Started, Data, System Processes, …). Confirm the Maica logo shows in the header and the teal palette + light/dark toggle work.

- [ ] **Step 3: Spot-check converted constructs on representative pages**

- Admonition: `Admin Guide → Data → Data Objects` (`/adminguide/data/data-objects/`) renders the warning callout as a coloured admonition (not literal `{% hint %}`).
- Code block title: `Admin Guide → Data → Data Objects → Shift` (`/adminguide/data/data-objects/shift/`) shows the Apex formula in a titled code block (`Error Condition Formula`) with a copy button.
- Collapsible: find a page with `<details>` (e.g. search the built HTML) and confirm it renders as an expandable `??? note`.
- Embed: `/adminguide/` home page renders the `https://www.maica.com.au/` embed as an iframe (no literal `{% embed %}`), and `/adminguide/getting-started/check-your-salesforce-hosting/` renders the Arcade demo iframe with no stray `{% endembed %}` / caption text.
- Stepper: `/adminguide/agreement-item-funding-rollover/` renders the steps as a numbered list.
- Images: any data-object page shows its screenshots (HTML `<figure><img>`), i.e. the `assets/` rewrite resolved. Spot-check no broken-image icons.

- [ ] **Step 4: Optionally verify the static output serves standalone**

Run: `cd site && python3 -m http.server -d _site 8001` then open `http://127.0.0.1:8001/` (Ctrl-C when done)
Expected: same site renders from the built `_site/` (confirms the `mkdocs build` artifact, not just the dev server).

- [ ] **Step 5: Record the outcome**

No commit. Note any rendering gaps found (e.g. a `<table data-view="cards">` that looks plain — expected/known gap) for the Plan-2 / polish backlog. If a spot-check reveals a real converter miss, return to that converter's Task (add a failing unit test + fix), then re-run Task 12.

---

## Self-review

**Spec coverage check (design doc §Transform pipeline + rework requirements):**
- Two-space staging, README→index, per-space asset merge, external-URL untouched → Task 8. ✓
- Merged nav, two top sections, `&#x20;` strip, external passthrough, `##` groups → Task 9. ✓
- mkdocs.yml stock material, palette/logo/favicon via overrides, `plugins:[search]`, extensions list, `docs_dir/site_dir`, `site_url` TODO, no Algolia/auth → Task 10. ✓
- Dropped scripts (metadata-aws, algolia, publish-ai, resolve-stage, moon) → never created; Task 5/11 explicitly exclude. ✓
- build.sh linear + `set -euo pipefail` → Task 11. ✓
- gitignore build/ + _site/ (+ generated mkdocs.yml) → Task 1. ✓
- requirements pins + no shadcn; package.json minimal, no algoliasearch → Task 1. ✓
- Coverage grep + add converters for uncovered constructs (`{% code %}`, steppers) or document gaps (card tables) → coverage table + Tasks 6, 7 + documented passthroughs. ✓
- Node `node --test` unit tests per converter + `mkdocs build --strict` integration + serve/spot-check → Tasks 2–9 unit, Task 11 build.sh integration, Task 12 strict, Task 13 serve. ✓

**Type/name consistency:** converter exports (`convertHints`/`convertCollapse`/`convertEmbeds`/`convertNoteToFrontmatter`/`convertCode`/`convertSteppers`) each `-> {content, updated|changed}`; `rewriteAssetPaths(content, upPrefix)` and `stageSpace(src,dest,brand)` used consistently in Task 8 test + build.sh; `buildNav(spaces)`/`renderSpace`/`parseSummary` consistent in Task 9 test + CLI. build.sh calls match each script's documented CLI signature. ✓

**Placeholder scan:** the only placeholder is `site_url` (commented TODO), explicitly sanctioned by the spec and asserted by a test in Task 10. Branding SVGs and teal hex are concrete. No "TBD"/"add error handling"/"similar to" left. ✓
