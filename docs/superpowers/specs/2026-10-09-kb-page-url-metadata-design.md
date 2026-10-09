# Knowledge base page URLs as Bedrock metadata: decision record

- **Date:** 2026-10-09
- **Decided by:** Stephen Kent (grilling session)
- **Status:** Decided, not yet implemented
- **Scope:** the MaicaDocs pipeline only. The consumer (Maica MCP `search_knowledge_base`, VerticAU/MaicaPlane `src/mcp`) is covered by MaicaPlane PR #268, `docs/superpowers/specs/2026-10-09-kb-source-links-design.md`.

## Problem

Chris Chugg answers Plane questions from Bedrock knowledge base `A55D5QJ1R6` (data source `8HJWHBUVRX`, S3 prefix `knowledgebase/`). A Bedrock retrieve currently returns only Bedrock's own metadata keys (such as `x-amz-bedrock-kb-source-uri`). Answers can name a page but cannot link to it.

## Decision summary

Each page's published GitBook URL is attached as Bedrock document metadata at indexing time. To do that, CI generates a metadata file next to each page in S3. The MCP reads the `url` key from each retrieve result and prints it.

| # | Question | Decision |
|---|----------|----------|
| 1 | Published addresses | Both guides are public on one custom domain. User Guide: `https://knowledge.maica.com.au/maica-knowledge-base/<path>`. Admin Guide: `https://knowledge.maica.com.au/maica-knowledge-base/maica-administration-guide/<path>`. The older `/v/maica-administration-guide/` form is not used. |
| 2 | Source of the URL | Built from the file path, then checked live with one HEAD request per page. On a 3xx, the redirect target is recorded. No GitBook API token is needed. |
| 3 | Generation | A script in this repo runs in `sync-docs-to-s3.yml` before the upload. Metadata files exist only in the CI workspace and S3 and are never committed. |
| 3b | Page that fails the live check | Write the metadata without `url`, warn in the job summary, and upload everything else. |
| 4 | Switch-over and proof | Incremental ingestion first, proved by a read-only per-page retrieve check. A full re-upload is the fallback if any page is missing `url`. |
| 5 | MkDocs test site | Retire it as a separate follow-up, not part of this change. |

## Evidence (gathered 2026-10-09)

- `https://knowledge.maica.com.au/` redirects (307) to `/maica-knowledge-base/`. `/sitemap.xml` indexes two page sitemaps, one per guide (201 User Guide entries, 114 Admin Guide entries). Both guides return 200 without signing in.
- `origin/master` has 358 pages (204 User Guide, 154 Admin Guide, excluding `SUMMARY.md`). Built from the path, 357 URLs return 200. One file, `knowledgebase/userguide/rosters/create-a-rroster.md`, returns 307 to `/maica-knowledge-base/rosters/create-a-roster` because its GitBook slug differs from its filename.
- 44 pages are missing from the sitemaps (hidden or no-index pages, such as Admin Guide `data/data-objects/*`). All 44 are listed in `SUMMARY.md` and return 200, so they still get a URL.
- All 358 pages have a level-one heading.
- GitBook's API (`GET /spaces/{spaceId}/content/pages`) returns each page's slug `path` but not its Git Sync filename. Matching pages to files would therefore depend on titles. That is why we rejected it in favour of path plus live check.
- AWS Bedrock S3 connector docs: the metadata file is named `<source file name>.metadata.json`, lives in the same S3 folder as the source, is at most 10 KB, and may use the simplified form `{"metadataAttributes": {"key": "value"}}`. In that form, values are stored and returned, and can be used for filtering, but are not embedded. The connector supports incremental sync of added, changed and deleted content.
- The data source uses default parsing and chunking with no transformation Lambda (`terraform/modules/bedrock/main.tf`), so nothing in the pipeline strips metadata.

## Design

### URL rule

For a page at `knowledgebase/<space>/<rel>.md`:

| Space folder | Base |
|--------------|------|
| `userguide` | `https://knowledge.maica.com.au/maica-knowledge-base` |
| `adminguide` | `https://knowledge.maica.com.au/maica-knowledge-base/maica-administration-guide` |

- `<rel>/README.md` maps to `<base>/<rel>` (a folder page). The root `README.md` maps to `<base>`.
- Any other file maps to `<base>/<rel without .md>`.
- `SUMMARY.md` is not a page and gets no metadata file.
- No trailing slash.

### Live check

- One `HEAD` per URL, no redirect following, short timeout, small concurrency (about 8), one retry on a network error.
- 200: use the built URL.
- 3xx: resolve `Location` against the host and use that. Follow at most one more hop.
- 404 or anything else after the retry: leave `url` out of that page's metadata and add a warning (`::warning file=<path>::`). Also list the page in the job summary. The job still succeeds.

### Metadata file

Path: `knowledgebase/<space>/<rel>.md.metadata.json`, written next to the page in the CI checkout.

```json
{
  "metadataAttributes": {
    "url": "https://knowledge.maica.com.au/maica-knowledge-base/getting-started/get-started-with-maica",
    "guide": "User Guide",
    "title": "Get Started with Maica"
  }
}
```

| Key | Value | Always present |
|-----|-------|----------------|
| `url` | Published GitBook URL after the live check | No: left out when the check fails |
| `guide` | `User Guide` or `Admin Guide` | Yes |
| `title` | Text of the page's first `# ` heading, with GitBook escapes such as `&#x20;` decoded and trimmed | Yes |

The simplified form is used deliberately: it keeps search ranking unchanged. Embedding `title` or `guide` would be a separate decision.

### Script and workflow

- `scripts/kb_metadata.py` (Python 3, standard library only) walks `knowledgebase/`, applies the URL rule, runs the live check and writes the metadata files. It prints a count of pages with and without `url`.
- `.github/workflows/sync-docs-to-s3.yml`:
  - adds a step before the S3 sync that runs the script;
  - widens the sync filter to `--exclude "*" --include "*.md" --include "*.md.metadata.json"`. `--delete` then keeps the metadata files and removes them when a page is deleted;
  - adds `scripts/kb_metadata.py` and the workflow file itself to the `push.paths` trigger, so a script change re-syncs.
- Metadata files are never committed. `knowledgebase/` belongs to GitBook Git Sync, and JSON files there could be imported into GitBook or conflict with it. Optionally, add `knowledgebase/**/*.metadata.json` to `.gitignore` as a guard.
- `bedrock-ingestion.yml` is unchanged. The hourly ingestion picks the metadata files up.

### Switch-over and proof

1. Merge. The sync workflow runs and uploads the metadata files.
2. Start an ingestion job manually (`workflow_dispatch` on `bedrock-ingestion.yml`) and wait for it to complete.
3. Run `scripts/kb_verify_urls.py` (read-only). For every page, it makes one `bedrock-agent-runtime retrieve` call against KB `A55D5QJ1R6`. Each call uses the page title as the query, `numberOfResults` 1, and a filter of `equals` on `x-amz-bedrock-kb-source-uri` set to `s3://<raw bucket>/knowledgebase/<space>/<rel>.md`. It checks that the returned metadata has `url` equal to the expected value, and reports `pass/total` plus a list of misses.
4. If any page is missing `url` because Bedrock did not re-index an unchanged page when only its metadata file was added, force a re-index. Re-upload every `.md` (`aws s3 cp knowledgebase/ s3://<raw bucket>/knowledgebase/ --recursive --exclude "*" --include "*.md"`, which updates LastModified), ingest again and re-run step 3.
5. Done when the check reports 358/358, less any pages warned in step 1 for a failed live check.

## Out of scope / follow-ups

- **Retire the MkDocs test site.** `site/`, `publish-docs-site.yml` and the `site/terraform/` root (CloudFront `E257GRU33BR109` and its bucket) exist only on `feature/MK-docs-site-pipeline` and never reached master. Run `terraform destroy` on that root, then delete the branch. GitBook is the published source of truth.
- **Filename typo** `userguide/rosters/create-a-rroster.md`. It is handled by the redirect. Renaming it is a GitBook content task.
- **Consumer side** (MaicaPlane): read `url`, `title` and `guide` from `result.metadata` and print `Link:` when `url` is present.

## For the MaicaPlane side

- Metadata keys on each retrieve result: `url` (string, may be missing), `guide` (`User Guide` or `Admin Guide`), `title` (string). They are plain strings, not wrapped in Bedrock typed values.
- Treat a missing `url` as normal: print the title with no link.
- They go live once this change is implemented and merged and the switch-over check passes. Until then, retrieve results carry only Bedrock's own keys.
