#!/usr/bin/env node

// Convert legacy GitBook "metadata note" blocks (a `!!! note` block whose body
// is `* key=value` bullet lines) into YAML frontmatter, merging with any
// existing frontmatter WITHOUT overwriting. Runs AFTER convert-hints in the
// pipeline. Only a handful of legacy files match; the transform is idempotent
// and a no-op for ordinary prose admonitions.
//
// The recursive file walker and CLI plumbing live in _lib.mjs; this file holds
// only the pure transform.
//
// ESM, Node stdlib only. No npm deps (no YAML library).

import { runCli } from './_lib.mjs';

function parseMetadataFromNote(noteContent) {
  const metadata = {};
  const lines = noteContent.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    const match = trimmed.match(/^\*\s*([^=]+?)\s*=\s*(.+)$/);
    if (match) {
      const key = match[1].trim();
      const rawValue = match[2].trim();
      if (rawValue.includes(',')) {
        metadata[key] = rawValue.split(',').map(i => i.trim()).filter(i => i.length > 0);
      } else {
        let value = rawValue;
        if (value.toLowerCase() === 'true') value = true;
        else if (value.toLowerCase() === 'false') value = false;
        else if (/^\d+$/.test(value)) value = parseInt(value, 10);
        else if (/^\d*\.\d+$/.test(value)) value = parseFloat(value);
        metadata[key] = value;
      }
    }
  }
  return metadata;
}

function metadataToYamlFrontmatter(metadata) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => lines.push(`  - ${item}`));
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

function parseExistingFrontmatter(content) {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterPattern);
  if (!match) return { frontmatter: null, contentWithoutFrontmatter: content };
  const frontmatterText = match[1];
  const contentWithoutFrontmatter = content.slice(match[0].length);
  const parsed = {};
  let currentArray = null;
  for (const line of frontmatterText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        let item = trimmed.substring(2).trim();
        if (item.toLowerCase() === 'true') item = true;
        else if (item.toLowerCase() === 'false') item = false;
        else if (/^\d+$/.test(item)) item = parseInt(item, 10);
        else if (/^\d*\.\d+$/.test(item)) item = parseFloat(item);
        currentArray.push(item);
      }
      continue;
    }
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      if (value) {
        let parsedValue = value;
        if (value.toLowerCase() === 'true') parsedValue = true;
        else if (value.toLowerCase() === 'false') parsedValue = false;
        else if (/^\d+$/.test(value)) parsedValue = parseInt(value, 10);
        else if (/^\d*\.\d+$/.test(value)) parsedValue = parseFloat(value);
        parsed[key] = parsedValue;
        currentArray = null;
      } else {
        currentArray = [];
        parsed[key] = currentArray;
      }
    }
  }
  return { frontmatter: parsed, contentWithoutFrontmatter };
}

function mergeFrontmatter(existing, newMetadata) {
  const merged = { ...existing };
  for (const [key, value] of Object.entries(newMetadata)) {
    if (!merged.hasOwnProperty(key)) {
      merged[key] = value;
    } else if (Array.isArray(value) && Array.isArray(merged[key])) {
      merged[key] = [...new Set([...merged[key], ...value])];
    }
  }
  return merged;
}

function frontmatterToYaml(frontmatter) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => lines.push(`  - ${item}`));
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

/**
 * Convert a legacy metadata note block in `content` to YAML frontmatter,
 * merging with any existing frontmatter without overwriting existing keys.
 * Returns the content unchanged when there is no matching metadata block (so
 * ordinary prose admonitions are left untouched).
 *
 * @param {string} content - Markdown source.
 * @returns {string} Transformed Markdown (unchanged when there is no metadata note).
 */
export function convertMetadata(content) {
  const notePattern = /^!!! note\s*\n(?:\s{4}Metadata\s*\n)?(?:\s{4}\n)?((?:\s{4}\*[^\n]+\n?)+)/m;
  const match = content.match(notePattern);
  if (!match) return content;
  const metadata = parseMetadataFromNote(match[1]);
  if (Object.keys(metadata).length === 0) return content;
  const { frontmatter: existingFrontmatter, contentWithoutFrontmatter } = parseExistingFrontmatter(content);
  const contentWithoutNote = contentWithoutFrontmatter.replace(notePattern, '').trim();
  let finalFrontmatter;
  if (existingFrontmatter) {
    finalFrontmatter = frontmatterToYaml(mergeFrontmatter(existingFrontmatter, metadata));
  } else {
    finalFrontmatter = metadataToYamlFrontmatter(metadata);
  }
  return `${finalFrontmatter}\n\n${contentWithoutNote}`;
}

const runningAsScript = process.argv[1] && process.argv[1].endsWith('convert-metadata.js');
if (runningAsScript) {
  runCli(convertMetadata, { label: 'metadata' });
}
