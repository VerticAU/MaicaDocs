import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertCode } from '../convert-code.js';

test('code block with title -> fence title, wrappers stripped', () => {
  const src = '{% code title="Error Condition Formula" %}\n```apex\nAND(1,2)\n```\n{% endcode %}';
  const out = convertCode(src);
  assert.match(out, /```apex title="Error Condition Formula"\nAND\(1,2\)\n```/);
  assert.doesNotMatch(out, /\{%\s*code/);
  assert.doesNotMatch(out, /endcode/);
});

test('trailing space in title is trimmed', () => {
  const src = '{% code title="Error Condition Formula " %}\n```apex\nx\n```\n{% endcode %}';
  assert.match(convertCode(src), /```apex title="Error Condition Formula"\n/);
});

test('code block without title -> wrappers stripped, fence untouched', () => {
  const src = '{% code %}\n```\nplain\n```\n{% endcode %}';
  const out = convertCode(src);
  assert.match(out, /```\nplain\n```/);
  assert.doesNotMatch(out, /\{%/);
  assert.doesNotMatch(out, /endcode/);
});

test('multiple code blocks in one document are all converted', () => {
  const src = [
    '{% code title="First" %}',
    '```apex',
    'A',
    '```',
    '{% endcode %}',
    '',
    'prose in between',
    '',
    '{% code title="Second" %}',
    '```apex',
    'B',
    '```',
    '{% endcode %}'
  ].join('\n');
  const out = convertCode(src);
  assert.match(out, /```apex title="First"\nA\n```/);
  assert.match(out, /```apex title="Second"\nB\n```/);
  assert.doesNotMatch(out, /\{%\s*code/);
  assert.doesNotMatch(out, /endcode/);
});

test('multi-line body with special chars is preserved byte-for-byte', () => {
  const body = 'AND(\n  ISPICKVAL(maica_cc__Status__c, \'Approved\'),\n  100% > {value}\n)';
  const src = `{% code title="Formula" %}\n\`\`\`apex\n${body}\n\`\`\`\n{% endcode %}`;
  const out = convertCode(src);
  assert.equal(out, `\`\`\`apex title="Formula"\n${body}\n\`\`\`\n`);
});

test('unsupported attributes (lineNumbers/fullWidth) are dropped, title folded', () => {
  const src = '{% code title="Formula" lineNumbers="true" fullWidth="false" %}\n```apex\nx\n```\n{% endcode %}';
  const out = convertCode(src);
  assert.match(out, /```apex title="Formula"\nx\n```/);
  assert.doesNotMatch(out, /lineNumbers/);
  assert.doesNotMatch(out, /fullWidth/);
});

test('unsupported attributes without a title are dropped, fence untouched', () => {
  const src = '{% code lineNumbers="true" %}\n```apex\nx\n```\n{% endcode %}';
  const out = convertCode(src);
  assert.match(out, /```apex\nx\n```/);
  assert.doesNotMatch(out, /lineNumbers/);
  assert.doesNotMatch(out, /\{%/);
});

test('content with no code blocks is returned unchanged (idempotent)', () => {
  const src = '# Heading\n\nJust prose, no GitBook tags at all.\n';
  assert.equal(convertCode(src), src);
});

test('already-plain fenced code is left unchanged', () => {
  const src = '```apex title="Formula"\nAND(1,2)\n```\n';
  assert.equal(convertCode(src), src);
});
