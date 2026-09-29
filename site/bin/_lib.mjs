// Shared plumbing for the Maica docs-site GitBook -> mkdocs-material transform
// pipeline. Conversion-agnostic: this module walks Markdown files and applies a
// caller-supplied string -> string transform, writing back only what changed.
// Each converter (convert-hints, convert-embeds, ...) imports from here instead
// of duplicating the recursive walker and the CLI boilerplate.
//
// ESM, Node stdlib only. No conversion logic lives here.

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Recursively collect every `*.md` file under `dirPath`.
 *
 * @param {string} dirPath - Directory to walk (relative paths are resolved
 *   against the current working directory).
 * @returns {Promise<string[]>} Sorted array of absolute file paths.
 */
async function getAllMarkdownFiles(dirPath) {
  const root = path.resolve(dirPath);
  const files = [];

  async function traverse(currentPath) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  await traverse(root);
  files.sort();
  return files;
}

/**
 * Apply a pure transform to every Markdown file under `dirPath`, writing a file
 * back only when its content actually changed.
 *
 * @param {string} dirPath - Directory to process.
 * @param {(content: string) => string} transformFn - Pure per-converter
 *   transform. Receives a file's current text, returns the desired text.
 * @param {{ label?: string }} [options] - `label` prints a one-line summary to
 *   stderr (e.g. "hints: files=42 changed=7"); omit it to stay silent.
 * @returns {Promise<{ processed: number, changed: number }>} Run summary.
 */
async function processDirectory(dirPath, transformFn, options = {}) {
  const { label } = options;
  const files = await getAllMarkdownFiles(dirPath);
  const summary = { processed: 0, changed: 0 };

  for (const file of files) {
    summary.processed++;
    const original = await fs.readFile(file, 'utf8');
    const transformed = transformFn(original);
    if (transformed !== original) {
      await fs.writeFile(file, transformed, 'utf8');
      summary.changed++;
    }
  }

  if (label) {
    console.error(`${label}: files=${summary.processed} changed=${summary.changed}`);
  }
  return summary;
}

/**
 * One-line entry point for a converter's CLI. Reads the target directory from
 * `process.argv[2]`, runs `processDirectory`, and exits non-zero on bad usage.
 *
 * A converter's `main()` collapses to:
 *   runCli(convertX, { label: 'x' });
 *
 * @param {(content: string) => string} transformFn - Pure per-converter transform.
 * @param {{ label?: string }} [options] - Forwarded to `processDirectory`.
 * @returns {Promise<{ processed: number, changed: number }>} Run summary.
 */
async function runCli(transformFn, options = {}) {
  const dirPath = process.argv[2];
  if (!dirPath) {
    console.error(`Usage: node ${path.basename(process.argv[1] ?? 'convert-x.mjs')} <contentDir>`);
    process.exit(1);
  }
  return processDirectory(dirPath, transformFn, options);
}

export { getAllMarkdownFiles, processDirectory, runCli };
