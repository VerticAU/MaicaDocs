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
