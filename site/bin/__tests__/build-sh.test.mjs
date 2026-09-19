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
  // Branding copied to docs-root shared assets, coexisting with per-space assets.
  await access(path.join(root, 'site', 'build', 'assets', 'maica-logo.svg'));
  // Nav generated with both spaces.
  const cfg = await readFile(path.join(root, 'site', 'mkdocs.yml'), 'utf8');
  assert.match(cfg, /- Admin Guide:/);
  assert.match(cfg, /- User Guide:/);
  assert.match(cfg, /docs_dir:\s*build/);
  // Exactly one nav: key in the generated config.
  assert.equal((cfg.match(/^nav:/gm) || []).length, 1);
});
