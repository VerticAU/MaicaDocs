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

test('&amp;#x20; encoded space in heading is also stripped', () => {
  const summary = [
    '# Table of contents',
    '',
    '## Mobile Worker App&amp;#x20;',
    '',
    '* [Mobile](mobile-worker-app/getting-started.md)',
  ].join('\n');
  const nav = buildNav([{ dir: 'adminguide', title: 'Admin Guide', summaryText: summary }]);
  assert.match(nav, /- Mobile Worker App:/);
  assert.doesNotMatch(nav, /&amp;#x20;/);
  assert.doesNotMatch(nav, /&#x20;/);
});
