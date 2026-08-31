import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, cp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SCRIPT = path.join(SITE, 'bin', 'publish-site.sh');

test('publish-site.sh has no hardcoded bucket/distribution/profile/region', async () => {
  const src = await readFile(SCRIPT, 'utf8');

  // Safety rails present.
  assert.match(src, /set -euo pipefail/, 'must fail fast');

  // Bucket and distribution id come only from terraform output, never literals.
  assert.match(src, /terraform -chdir="\$TF_DIR" output -raw bucket_name/);
  assert.match(src, /terraform -chdir="\$TF_DIR" output -raw cloudfront_distribution_id/);

  // No AWS profile flag; credentials/region come from the environment.
  assert.doesNotMatch(src, /--profile/, 'no --profile');
  assert.doesNotMatch(src, /AWS_PROFILE=/, 'no hardcoded AWS_PROFILE');
  assert.doesNotMatch(src, /--region/, 'region must come from the environment');
  assert.doesNotMatch(src, /movedata/i, 'no MoveData leftovers');

  // No hardcoded bucket ARN/name or region literal.
  assert.doesNotMatch(src, /s3:\/\/[a-z0-9.-]+\//, 'no literal s3://bucket/ target');
  assert.doesNotMatch(src, /ap-southeast-\d/, 'no hardcoded region literal');

  // Sync uses --delete and the 5-minute cache-control.
  assert.match(src, /aws s3 sync[\s\S]*--delete/);
  assert.match(src, /--cache-control "public, max-age=300"/);
});

test('publish-site.sh robots.txt defaults to Disallow and gates on ALLOW_INDEXING', async () => {
  const src = await readFile(SCRIPT, 'utf8');
  assert.match(src, /\$\{ALLOW_INDEXING:-false\}/, 'default is not-indexing');
  assert.match(src, /Disallow: \//);
  assert.match(src, /Allow: \//);
});

test('publish-site.sh errors and makes no AWS call when _site is missing', async () => {
  // Isolated site/bin with the script but no ../_site: the guard must fire first.
  const root = await mkdtemp(path.join(tmpdir(), 'publishsh-'));
  await mkdir(path.join(root, 'site', 'bin'), { recursive: true });
  await cp(SCRIPT, path.join(root, 'site', 'bin', 'publish-site.sh'));

  let stderr = '';
  let code = 0;
  try {
    execFileSync('bash', [path.join(root, 'site', 'bin', 'publish-site.sh')], {
      cwd: tmpdir(),
      stdio: 'pipe',
    });
  } catch (e) {
    code = e.status;
    stderr = String(e.stderr);
  }
  assert.equal(code, 1, 'must exit 1 when _site is absent');
  assert.match(stderr, /_site does not exist/);
});
