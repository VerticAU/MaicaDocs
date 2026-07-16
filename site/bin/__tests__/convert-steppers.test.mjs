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

test('multi-line step body gets 3-space continuation indent', () => {
  const src = '{% stepper %}\n{% step %}\nLine one.\nLine two.\n{% endstep %}\n{% endstepper %}';
  const out = convertSteppers(src);
  assert.match(out, /1\. Line one\.\n {3}Line two\./);
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
  // Admonition marker sits at the list continuation indent (3 spaces)...
  assert.match(out, /^ {3}!!! note$/m);
  // ...and its child line stays 4 deeper (3 + 4 = 7) so the admonition survives.
  assert.match(out, /^ {7}Keep this indented\.$/m);
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
  assert.match(out, /^ {3}```bash$/m);
  assert.match(out, /^ {3}sf org list$/m);
  assert.match(out, /^ {3}```$/m);
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
