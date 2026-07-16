#!/usr/bin/env bash
# Linear GitBook -> mkdocs transform driver for the Maica docs site.
# Stages both spaces, runs the converters over each build dir, then generates
# the merged nav into mkdocs.yml. Run from anywhere:  bash build.sh
#
# Deterministic and idempotent: build/ is wiped up front so rebuilds are
# reproducible and safe to re-run. bash + the existing node scripts only.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

REPO_ROOT="$(cd "$HERE/.." && pwd)"
KB="$REPO_ROOT/knowledgebase"
SPACES=(adminguide userguide)

echo "[1/3] stage spaces + branding"
# stage-articles wipes only the per-space dest dir, so remove the whole build/
# first to guarantee no stale files (e.g. branding assets) survive a rebuild.
rm -rf build
for space in "${SPACES[@]}"; do
  node bin/stage-articles.mjs "$KB/$space" "build/$space"
done
# Branding logo/favicon live at the docs_dir root (build/assets) so theme.logo
# (assets/maica-logo.svg) and theme.favicon resolve for every page. This is a
# separate dir from the per-space page images at build/<space>/assets, so the
# two never clobber each other.
mkdir -p build/assets
cp assets/* build/assets/

echo "[2/3] run converters over each build dir"
# Order matters: convert-metadata runs AFTER convert-hints because metadata
# detection keys off the note-block shape that hints produces.
for space in "${SPACES[@]}"; do
  target="build/$space"
  node bin/convert-hints.js     "$target" 2>&1 | tail -1
  node bin/convert-collapse.js  "$target" 2>&1 | tail -1
  node bin/convert-embeds.js    "$target" 2>&1 | tail -1
  node bin/convert-code.js      "$target" 2>&1 | tail -1
  node bin/convert-steppers.js  "$target" 2>&1 | tail -1
  node bin/convert-metadata.js  "$target" 2>&1 | tail -1
done

echo "[3/3] generate merged nav -> mkdocs.yml"
node bin/generate-nav.mjs

echo "done. staged at: $HERE/build  (config: $HERE/mkdocs.yml)"
