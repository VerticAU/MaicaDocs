import { test } from 'node:test';
import assert from 'node:assert/strict';
import { convertEmbeds } from '../convert-embeds.js';

test('self-closing YouTube embed -> youtube.com/embed iframe', () => {
  const out = convertEmbeds('{% embed url="https://youtu.be/abc123" %}');
  assert.match(out, /<iframe[^>]+youtube\.com\/embed\/abc123/);
  assert.doesNotMatch(out, /embed url=/);
});

test('YouTube watch?v= form is normalised to /embed/<id>', () => {
  const out = convertEmbeds('{% embed url="https://www.youtube.com/watch?v=xyz789&t=10s" %}');
  assert.match(out, /youtube\.com\/embed\/xyz789/);
});

test('block-form embed with caption drops endembed and caption', () => {
  const src = '{% embed url="https://app.arcade.software/share/XYZ" %}\nHow to do it.\n{% endembed %}';
  const out = convertEmbeds(src);
  assert.match(out, /demo\.arcade\.software\/XYZ/);
  assert.doesNotMatch(out, /endembed/);
  assert.doesNotMatch(out, /How to do it\./);
});

test('block-form embed without caption still drops the closing tag', () => {
  const src = '{% embed url="https://youtu.be/blk1" %}\n{% endembed %}';
  const out = convertEmbeds(src);
  assert.match(out, /youtube\.com\/embed\/blk1/);
  assert.doesNotMatch(out, /endembed/);
});

test('Vimeo url -> padded responsive wrapper with player.vimeo iframe', () => {
  const out = convertEmbeds('{% embed url="https://vimeo.com/123456789" %}');
  assert.match(out, /player\.vimeo\.com\/video\/123456789/);
  assert.match(out, /padding:56\.25% 0 0 0/);
});

test('Arcade url -> demo.arcade.software iframe wrapped in markers', () => {
  const out = convertEmbeds('{% embed url="https://app.arcade.software/share/DEMO42" %}');
  assert.match(out, /demo\.arcade\.software\/DEMO42/);
  assert.match(out, /ARCADE EMBED START/);
});

test('generic url -> plain iframe with the original src', () => {
  const out = convertEmbeds('{% embed url="https://www.maica.com.au/" %}');
  assert.match(out, /<iframe[^>]+src="https:\/\/www\.maica\.com\.au\/"/);
});

test('multiple embeds in one document are all converted', () => {
  const src = [
    '{% embed url="https://youtu.be/one" %}',
    '',
    '{% embed url="https://vimeo.com/222" %}\ncaption here\n{% endembed %}',
    '',
    '{% embed url="https://example.org/thing" %}'
  ].join('\n');
  const out = convertEmbeds(src);
  assert.match(out, /youtube\.com\/embed\/one/);
  assert.match(out, /player\.vimeo\.com\/video\/222/);
  assert.match(out, /src="https:\/\/example\.org\/thing"/);
  assert.doesNotMatch(out, /endembed/);
  assert.doesNotMatch(out, /caption here/);
});

test('content with no embeds is returned unchanged (idempotent)', () => {
  const src = '# Heading\n\nJust some prose with no embeds at all.\n';
  assert.equal(convertEmbeds(src), src);
});
