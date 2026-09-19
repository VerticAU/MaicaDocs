import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertSteppers } from '../convert-steppers.js';

test('stepper with 3 steps -> numbered list, all tags stripped', () => {
  const src = [
    '{% stepper %}',
    '{% step %}',
    'First thing.',
    '{% endstep %}',
    '',
    '{% step %}',
    'Second thing.',
    '{% endstep %}',
    '',
    '{% step %}',
    'Third thing.',
    '{% endstep %}',
    '{% endstepper %}',
  ].join('\n');
  const out = convertSteppers(src);
  assert.match(out, /^1\. First thing\.$/m);
  assert.match(out, /^2\. Second thing\.$/m);
  assert.match(out, /^3\. Third thing\.$/m);
  // No stray GitBook tokens survive.
  assert.doesNotMatch(out, /stepper/);
  assert.doesNotMatch(out, /endstep/);
  assert.doesNotMatch(out, /\{%/);
});

test('multi-line step body gets 4-space continuation indent', () => {
  const src = '{% stepper %}\n{% step %}\nLine one.\nLine two.\n{% endstep %}\n{% endstepper %}';
  const out = convertSteppers(src);
  assert.match(out, /1\. Line one\.\n {4}Line two\./);
});

test('nested admonition inside a step keeps its relative indentation', () => {
  const src = [
    '{% stepper %}',
    '{% step %}',
    'Configure it.',
    '!!! note',
    '    Keep this indented.',
    '{% endstep %}',
    '{% endstepper %}',
  ].join('\n');
  const out = convertSteppers(src);
  assert.match(out, /^1\. Configure it\.$/m);
  // The nested admonition marker must be indented by AT LEAST 4 spaces so it
  // stays inside the <li> under python-markdown's flat 4-space threshold. With
  // a flat 4-space continuation prefix it lands at exactly 4.
  const noteLine = out.split('\n').find((l) => l.includes('!!! note'));
  assert.ok(noteLine, 'expected a nested "!!! note" line in the output');
  assert.match(noteLine, /^ {4,}!!! note$/);
  const noteIndent = noteLine.match(/^( *)/)[1].length;
  assert.ok(noteIndent >= 4, `admonition marker indent ${noteIndent} < 4`);
  // ...and its child line stays 4 deeper than the marker so the admonition
  // survives: 4 (continuation) + 4 (original nesting) = 8.
  const childLine = out
    .split('\n')
    .find((l) => l.includes('Keep this indented.'));
  assert.ok(childLine, 'expected the admonition child line in the output');
  const childIndent = childLine.match(/^( *)/)[1].length;
  assert.ok(childIndent >= 4, `admonition child indent ${childIndent} < 4`);
  assert.ok(
    childIndent >= noteIndent + 4,
    `child indent ${childIndent} not >= marker ${noteIndent} + 4`,
  );
  assert.doesNotMatch(out, /\{%/);
});

test('nested fenced code block inside a step is preserved and indented', () => {
  const src = [
    '{% stepper %}',
    '{% step %}',
    'Run this:',
    '```bash',
    'sf org list',
    '```',
    '{% endstep %}',
    '{% endstepper %}',
  ].join('\n');
  const out = convertSteppers(src);
  assert.match(out, /^1\. Run this:$/m);
  // Fence and its contents must be indented by AT LEAST 4 spaces so the fenced
  // code block stays inside the <li> under python-markdown's flat 4-space
  // list-continuation threshold. A flat 4-space prefix lands each at exactly 4.
  for (const needle of ['```bash', 'sf org list', '```']) {
    const line = out.split('\n').find((l) => l.trimEnd().endsWith(needle));
    assert.ok(line, `expected a line ending with ${JSON.stringify(needle)}`);
    const indent = line.match(/^( *)/)[1].length;
    assert.ok(indent >= 4, `fenced-code line ${JSON.stringify(needle)} indent ${indent} < 4`);
  }
  assert.doesNotMatch(out, /\{%/);
});

test('multiple steppers in one doc each restart numbering', () => {
  const src = [
    'Intro.',
    '',
    '{% stepper %}',
    '{% step %}',
    'Alpha.',
    '{% endstep %}',
    '{% step %}',
    'Beta.',
    '{% endstep %}',
    '{% endstepper %}',
    '',
    'Middle.',
    '',
    '{% stepper %}',
    '{% step %}',
    'Gamma.',
    '{% endstep %}',
    '{% endstepper %}',
    '',
    'Outro.',
  ].join('\n');
  const out = convertSteppers(src);
  assert.match(out, /^1\. Alpha\.$/m);
  assert.match(out, /^2\. Beta\.$/m);
  // Second stepper restarts at 1.
  assert.match(out, /^1\. Gamma\.$/m);
  // Surrounding prose is untouched.
  assert.match(out, /^Intro\.$/m);
  assert.match(out, /^Middle\.$/m);
  assert.match(out, /^Outro\.$/m);
  assert.doesNotMatch(out, /\{%/);
});

test('content without steppers is returned unchanged (no-op)', () => {
  const src = 'Just some prose.\n\nA list:\n1. one\n2. two\n';
  assert.equal(convertSteppers(src), src);
});
