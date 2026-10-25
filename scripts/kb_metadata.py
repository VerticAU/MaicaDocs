#!/usr/bin/env python3
"""Generate Bedrock metadata sidecars for knowledge base pages.

For every page under knowledgebase/{userguide,adminguide,releasenotes} (excluding
SUMMARY.md) this script derives the published GitBook URL from the file
path, checks it live, and writes <page>.md.metadata.json next to the page:

    {"metadataAttributes": {"url": "...", "guide": "...", "title": "..."}}

The url key is left out when the live check fails. Standard library only.

Pages GitBook has retired (frontmatter `hidden: true` or `noIndex: true`) are
skipped: they get no sidecar, and with --stage they are left out of the staged
copy, so the S3 sync deletes them and Bedrock drops them from the index. Such a
page is usually an old copy kept beside its live replacement (for example
care-recipient-sync.md beside care-recipient-sync-1.md), and indexing both made
search return two versions of one page.

Usage:
    python scripts/kb_metadata.py                # check URLs and write sidecars
    python scripts/kb_metadata.py --dry-run      # check URLs, write nothing
    python scripts/kb_metadata.py --no-check     # skip network, use derived URLs
    python scripts/kb_metadata.py --stage DIR    # copy live pages + sidecars to DIR (what CI syncs)

See docs/superpowers/specs/2026-10-09-kb-page-url-metadata-design.md.
"""

from __future__ import annotations

import argparse
import html
import json
import os
import re
import shutil
import socket
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

SITE = "https://knowledge.maica.com.au/maica-knowledge-base"
# The Release Notes space is its own GitBook site section, NOT under SITE.
RELEASE_NOTES_SITE = "https://knowledge.maica.com.au/maica-release-notes"
# A space whose folder is absent (for example releasenotes before Git Sync
# creates it) is skipped by iter_pages, so it is a clean no-op.
SPACES = {
    "userguide": (SITE, "User Guide"),
    "adminguide": (SITE + "/maica-administration-guide", "Admin Guide"),
    "releasenotes": (RELEASE_NOTES_SITE, "Release Notes"),
}
TIMEOUT = 10
WORKERS = 8
MAX_METADATA_BYTES = 10 * 1024
USER_AGENT = "MaicaDocs-kb-metadata/1.0"


def iter_pages(root: Path):
    """Yield (space, rel_path, abs_path) for every page, sorted."""
    for space in SPACES:
        space_dir = root / space
        if not space_dir.is_dir():
            continue
        for path in sorted(space_dir.rglob("*.md")):
            if path.name == "SUMMARY.md":
                continue
            yield space, path.relative_to(space_dir).as_posix(), path


_FRONTMATTER = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.S)
RETIRE_FLAGS = ("hidden", "noIndex")


def retired_reason(path: Path) -> str | None:
    """'hidden: true' and/or 'noIndex: true' if the page's frontmatter sets them, else None."""
    match = _FRONTMATTER.match(path.read_text(encoding="utf-8"))
    if not match:
        return None
    values: dict[str, str] = {}
    for line in match.group(1).splitlines():
        key, sep, value = line.partition(":")
        if sep:
            values[key.strip().lower()] = value.strip().strip("'\"").lower()
    hits = [f"{flag}: true" for flag in RETIRE_FLAGS if values.get(flag.lower()) == "true"]
    return ", ".join(hits) or None


def derive_url(space: str, rel: str) -> str:
    """Apply the URL rule from the spec. No trailing slash."""
    base = SPACES[space][0]
    if rel == "README.md":
        return base
    if rel.endswith("/README.md"):
        return f"{base}/{rel[: -len('/README.md')]}"
    return f"{base}/{rel[: -len('.md')]}"


def guide_for(space: str) -> str:
    return SPACES[space][1]


def read_title(path: Path) -> str | None:
    """Text of the first '# ' heading, unescaped, trimmed, whitespace collapsed."""
    with path.open(encoding="utf-8") as fh:
        for line in fh:
            if line.startswith("# "):
                title = html.unescape(line[2:])
                return re.sub(r"\s+", " ", title).strip()
    return None


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None  # urllib then raises HTTPError carrying the 3xx


_OPENER = urllib.request.build_opener(_NoRedirect)


def _request(url: str, method: str) -> tuple[int, str | None]:
    """One request without following redirects, one retry on network error."""
    req = urllib.request.Request(url, method=method, headers={"User-Agent": USER_AGENT})
    last_err: Exception | None = None
    for _ in range(2):
        try:
            with _OPENER.open(req, timeout=TIMEOUT) as resp:
                return resp.status, resp.headers.get("Location")
        except urllib.error.HTTPError as err:
            return err.code, err.headers.get("Location") if err.headers else None
        except (urllib.error.URLError, socket.timeout, ConnectionError, OSError) as err:
            last_err = err
    raise last_err  # type: ignore[misc]


def _status(url: str) -> tuple[int, str | None]:
    status, location = _request(url, "HEAD")
    if status == 405:
        status, location = _request(url, "GET")
    return status, location


def check_url(url: str) -> tuple[str | None, bool, str]:
    """Return (final_url or None, via_redirect, reason)."""
    current = url
    hops = 0
    try:
        while True:
            status, location = _status(current)
            if status == 200:
                return current, hops > 0, ""
            if 300 <= status < 400 and location and hops < 2:
                current = urllib.parse.urljoin(current, location)
                hops += 1
                continue
            return None, False, f"HTTP {status} for {current}"
    except Exception as err:  # network failure after retry
        return None, False, f"{type(err).__name__}: {err} for {current}"


def build_metadata(url: str | None, guide: str, title: str) -> dict:
    attrs: dict[str, str] = {}
    if url:
        attrs["url"] = url
    attrs["guide"] = guide
    attrs["title"] = title
    return {"metadataAttributes": attrs}


_summary_started = False


def warn(path: Path, message: str) -> None:
    global _summary_started
    print(f"::warning file={path.as_posix()}::{message}")
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as fh:
            if not _summary_started:
                fh.write("### Knowledge base metadata warnings\n\n")
                _summary_started = True
            fh.write(f"- `{path.as_posix()}`: {message}\n")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--root", default="knowledgebase", help="knowledge base root folder")
    parser.add_argument("--no-check", action="store_true", help="skip the live check, use derived URLs")
    parser.add_argument("--dry-run", action="store_true", help="do not write metadata files")
    parser.add_argument(
        "--stage",
        metavar="DIR",
        help="copy live pages, their sidecars and each SUMMARY.md to DIR (must be empty) instead of writing in place",
    )
    args = parser.parse_args(argv)

    root = Path(args.root)
    stage = Path(args.stage) if args.stage else None
    if stage and stage.exists() and any(stage.iterdir()):
        print(f"error: stage folder {stage} is not empty", file=sys.stderr)
        return 1

    pages = []
    skipped = 0
    for space, rel, path in iter_pages(root):
        reason = retired_reason(path)
        if reason:
            skipped += 1
            print(f"skipped: {space}/{rel} ({reason})")
            stale = path.with_name(path.name + ".metadata.json")
            if not stage and not args.dry_run and stale.exists():
                stale.unlink()
            continue
        pages.append((space, rel, path))
    if not pages:
        print(f"error: no pages found under {root}", file=sys.stderr)
        return 1

    derived = [derive_url(space, rel) for space, rel, _ in pages]
    if args.no_check:
        results = [(u, False, "") for u in derived]
    else:
        with ThreadPoolExecutor(max_workers=WORKERS) as pool:
            results = list(pool.map(check_url, derived))

    with_url = via_redirect = without_url = 0

    for (space, rel, path), url_in, (final, redirected, reason) in zip(pages, derived, results):
        title = read_title(path)
        if title is None:
            warn(path, "no '# ' heading found; using file name as title")
            title = path.stem
        if final:
            with_url += 1
            if redirected:
                via_redirect += 1
                print(f"redirect: {path.as_posix()}: {url_in} -> {final}")
        else:
            without_url += 1
            warn(path, f"published URL check failed ({reason}); url left out")

        payload = json.dumps(build_metadata(final, guide_for(space), title), ensure_ascii=False, indent=2) + "\n"
        size = len(payload.encode("utf-8"))
        if size >= MAX_METADATA_BYTES:
            print(f"error: metadata for {path} is {size} bytes (limit 10 KB)", file=sys.stderr)
            return 1
        if args.dry_run:
            continue
        if stage:
            target = stage / space / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(path, target)
            target.with_name(target.name + ".metadata.json").write_text(payload, encoding="utf-8")
        else:
            path.with_name(path.name + ".metadata.json").write_text(payload, encoding="utf-8")

    if stage and not args.dry_run:
        for space in SPACES:
            summary = root / space / "SUMMARY.md"
            if summary.is_file():
                (stage / space).mkdir(parents=True, exist_ok=True)
                shutil.copyfile(summary, stage / space / "SUMMARY.md")

    print(
        f"pages: {len(pages)}, with url: {with_url} "
        f"(direct: {with_url - via_redirect}, via redirect: {via_redirect}), "
        f"without url: {without_url}, skipped (hidden or noIndex): {skipped}"
        + (" [dry run, nothing written]" if args.dry_run else "")
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
