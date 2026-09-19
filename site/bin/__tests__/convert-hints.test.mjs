import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertHints } from '../convert-hints.js';

test('info hint -> !!! note with 4-space indented body', () => {
  const src = '{% hint style="info" %}\nBe careful here.\n{% endhint %}';
  const out = convertHints(src);
  assert.equal(out, '!!! note\n    Be careful here.');
});

test('warning hint with bold first line -> titled admonition', () => {
  const src = '{% hint style="warning" %}\n**Watch out**: do not do this.\n{% endhint %}';
  const out = convertHints(src);
  assert.equal(out, '!!! warning "Watch out"\n    do not do this.');
});

test('style map covers success, danger and tip', () => {
  assert.match(convertHints('{% hint style="success" %}\nok\n{% endhint %}'), /^!!! success\n {4}ok$/);
  assert.match(convertHints('{% hint style="danger" %}\nno\n{% endhint %}'), /^!!! danger\n {4}no$/);
  assert.match(convertHints('{% hint style="tip" %}\ntry this\n{% endhint %}'), /^!!! tip\n {4}try this$/);
});

test('unknown style falls back to note', () => {
  assert.match(convertHints('{% hint style="mystery" %}\nhmm\n{% endhint %}'), /^!!! note\n {4}hmm$/);
});

test('multi-line body: every non-empty line indented 4 spaces', () => {
  const src = '{% hint style="info" %}\nLine one.\n\nLine two.\n{% endhint %}';
  const out = convertHints(src);
  assert.equal(out, '!!! note\n    Line one.\n\n    Line two.');
});

test('content with no hints is returned unchanged (idempotent)', () => {
  const src = '# Heading\n\nJust some prose with no hints at all.\n';
  assert.equal(convertHints(src), src);
});

test('running convertHints twice is stable on already-converted output', () => {
  const src = '{% hint style="info" %}\nBe careful here.\n{% endhint %}';
  const once = convertHints(src);
  assert.equal(convertHints(once), once);
});
