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
