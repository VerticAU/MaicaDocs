#!/usr/bin/env node

// Convert GitBook `{% embed url="X" %}` directives into responsive iframes.
// GitBook writes embeds in two shapes:
//   - self-closing:  {% embed url="X" %}
//   - block-form:    {% embed url="X" %}\n<optional caption>\n{% endembed %}
// The block-form caption is presentational GitBook chrome, so it is dropped
// along with the closing tag. Providers YouTube / Vimeo / Arcade are special
// cased; anything else falls back to a plain iframe over the original url.
//
// The recursive file walker and CLI plumbing live in _lib.mjs; this file holds
// only the pure transform.
//
// ESM, Node stdlib only. No npm deps.

import { runCli } from './_lib.mjs';

function extractYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /youtube\.com\/watch\?.*v=([^&\s]+)/
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractVimeoId(url) {
  const patterns = [/vimeo\.com\/(\d+)/, /player\.vimeo\.com\/video\/(\d+)/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function extractArcadeId(url) {
  const patterns = [/app\.arcade\.software\/share\/([^/?]+)/, /demo\.arcade\.software\/([^/?]+)/];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function createYouTubeEmbed(videoId) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function createVimeoEmbed(videoId) {
  return `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Vimeo Video"></iframe></div>`;
}

function createArcadeEmbed(arcadeId) {
  return `<!--ARCADE EMBED START--><div style="position: relative; max-height: 540px; width: 100%; aspect-ratio: 1; margin: 30px 10px;"><iframe src="https://demo.arcade.software/${arcadeId}?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true" title="Arcade Demo" frameborder="0" loading="lazy" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="clipboard-write" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; color-scheme: light;" ></iframe></div><!--ARCADE EMBED END-->`;
}

function convertEmbed(url) {
  const youtubeId = extractYouTubeId(url);
  if (youtubeId) return createYouTubeEmbed(youtubeId);
  const vimeoId = extractVimeoId(url);
  if (vimeoId) return createVimeoEmbed(vimeoId);
  const arcadeId = extractArcadeId(url);
  if (arcadeId) return createArcadeEmbed(arcadeId);
  return `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
}

/**
 * Convert every GitBook embed directive in `content` to a responsive iframe.
 *
 * Matches BOTH self-closing `{% embed url="X" %}` and block-form
 * `{% embed url="X" %}<optional caption>{% endembed %}`. The trailing optional
 * group non-greedily swallows any caption body plus the closing tag, so no
 * stray `{% endembed %}` or orphaned caption line is left behind. The
 * `(?!\{%\s*embed)` lookahead stops a caption body from spanning across a
 * following embed directive, so a self-closing embed sitting before a later
 * block-form embed is not merged into it.
 *
 * @param {string} content - Markdown source.
 * @returns {string} Transformed Markdown (unchanged when there are no embeds).
 */
export function convertEmbeds(content) {
  const embedPattern = /\{%\s*embed\s+url="([^"]+)"\s*%\}(?:(?:(?!\{%\s*embed\b)[\s\S])*?\{%\s*endembed\s*%\})?/g;
  return content.replace(embedPattern, (match, url) => convertEmbed(url));
}

export { extractYouTubeId, extractVimeoId, extractArcadeId };

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-embeds.js');
if (runningAsScript) {
  runCli(convertEmbeds, { label: 'embeds' });
}
