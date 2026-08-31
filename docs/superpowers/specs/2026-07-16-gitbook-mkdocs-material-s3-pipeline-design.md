---

# Design: GitBook → mkdocs-material → S3 docs-site pipeline

**Date:** 2026-07-16
**Repo:** MaicaDocs
**Status:** Approved design, ready for implementation planning

## Context

MaicaDocs is a GitBook-authored Markdown repository. Content is written in GitBook and synced to GitHub under `knowledgebase/`, split into two GitBook spaces: `knowledgebase/adminguide/` (149 files) and `knowledgebase/userguide/` (200 files). Each space has its own `README.md` + `SUMMARY.md`; there are 44 nested `README.md` folder-index pages and ~480 assets under two `.gitbook/assets/` roots. There is no `.gitbook.yaml`.

The repo already has a pipeline that syncs raw GitBook Markdown to S3 and ingests it into an AWS Bedrock knowledge base (`.github/workflows/sync-docs-to-s3.yml`, `bedrock-ingestion.yml`, `terraform.yml`, `terraform/`). That pipeline stays untouched.

A handover pack (`~/Downloads/movedata-docs-pipeline-handoff`) from a sibling project (MoveData) implements a full docs platform: GitBook→mkdocs-material transform, custom shadcn theme, Algolia search, Bedrock AI knowledge base, Salesforce auth bridge, role-gated nav, and S3+CloudFront+Route53 infra orchestrated with moon and GitHub Actions. We are adopting a focused subset of it.

## Goal

Build a NEW, independent pipeline that transforms the GitBook Markdown into mkdocs-material Markdown, builds a single browsable static HTML site, and publishes it to S3 behind CloudFront, via GitHub Actions. Add alongside the existing pipeline; do not modify existing workflows or `terraform/`.

## Decisions (locked)

- **Scope:** transform + mkdocs build + publish to S3/CloudFront. Built-in mkdocs-material search now; Algolia deferred as a future extension.
- **Coexistence:** additive. New workflow, new Terraform stack with separate state. Existing raw-md→S3→Bedrock pipeline unchanged.
- **Theme/search:** stock mkdocs-material theme + its built-in client-side search. No custom shadcn theme, no Algolia, no AI widget, no Salesforce auth bridge, no role-gating.
- **Site structure:** ONE combined site with two top-level nav sections (Admin Guide, User Guide), from a single `mkdocs build`.
- **Domain:** decide later. Serve on the CloudFront default URL first; add custom domain + ACM cert before go-live. DNS is external to AWS.
- **Approach:** port the pack's Node transform scripts (the proven, hard part), drop moon; drive with a plain `build.sh` + `mkdocs build` orchestrated by GitHub Actions.

## Architecture

Flow (new pipeline; existing raw-md→S3→Bedrock untouched):

1. GitHub Actions triggers on push to `master` touching `knowledgebase/**` or `site/**` (plus `workflow_dispatch`).
2. Transform: Node scripts convert GitBook Markdown → mkdocs-material Markdown into `site/build/` (per space, then merged).
3. Build: `mkdocs build` renders `site/build/` → `site/_site/` static HTML using mkdocs-material.
4. Publish: `aws s3 sync site/_site/ s3://<bucket>/ --delete`, then CloudFront invalidation `/*`.
5. Serve: private S3 read only by CloudFront via Origin Access Control (OAC); CloudFront viewer-request function rewrites directory URLs to `index.html`; ACM cert (us-east-1); external DNS CNAME points at CloudFront.

### Repo layout (additive)

```
MaicaDocs/
├── knowledgebase/            # unchanged — GitBook source (adminguide, userguide)
├── terraform/                # unchanged — existing raw-md→S3→Bedrock infra
├── .github/workflows/
│   ├── sync-docs-to-s3.yml       # unchanged
│   ├── bedrock-ingestion.yml     # unchanged
│   ├── terraform.yml             # unchanged
│   └── publish-docs-site.yml     # NEW — the static-site pipeline
└── site/                     # NEW — everything for the HTML docs site
    ├── bin/                  # transform scripts (ported, reworked per-space)
    ├── build.sh             # linear transform driver
    ├── mkdocs.yml            # material theme config
    ├── requirements.txt      # mkdocs + mkdocs-material + pymdown-extensions
    ├── package.json          # node transform deps
    ├── overrides/            # minimal material overrides (Maica logo/colours)
    ├── terraform/            # NEW standalone stack: S3 + CloudFront + ACM
    ├── cloudfront-rewrite.js # dir → index.html viewer function
    ├── build/                # transformed MD output (gitignored)
    └── _site/                # rendered HTML output (gitignored)
```

Note: mkdocs' default output dir is also `site/`. Because our pipeline dir is `site/`, mkdocs `docs_dir` and `site_dir` are pinned to explicit paths inside it (`site/build`, `site/_site`), both gitignored, to avoid collision and prevent generated output being committed.

## Transform pipeline

Ported from the pack into `site/bin/`, reworked for the two-space layout. `build.sh` runs a linear sequence: stage both spaces, run the four converters over each, generate merged nav.

| Script | Purpose | Rework for Maica |
|---|---|---|
| `stage-articles.mjs` | GitBook→mkdocs layout: copy source to `build/`, `README.md`→`index.md` at every depth, merge `.gitbook/assets/`, rewrite `../.gitbook/assets/x` image/link paths | Run per space; output `build/adminguide/`, `build/userguide/`; handle two asset roots; leave external URLs untouched |
| `convert-hints.js` | `{% hint style=%}…{% endhint %}` → material admonitions | Path arg per space build dir |
| `convert-collapse.js` | `<details><summary>` → `??? note` collapsible | same |
| `convert-embeds.js` | `{% embed url= %}` → responsive iframes (YouTube/Vimeo/Arcade/generic) | same |
| `convert-metadata.js` | legacy GitBook metadata note-blocks → YAML frontmatter | same |
| `generate-nav.mjs` | parse `SUMMARY.md` → mkdocs `nav:` tree | parse BOTH SUMMARYs into one nav with two top sections; strip encoded `&#x20;` in headings; pass external-URL entries straight through |

Dropped from the pack entirely: `generate-metadata-aws.js` (AI sidecars), `sync-to-algolia.js`, Algolia config bake, `publish-ai.sh`, `resolve-stage.sh`, all moon `moon.yml` wiring.

### mkdocs.yml (shape)

- `theme: name: material` with Maica `logo`, `favicon`, palette (light/dark), features `navigation.sections`, `navigation.top`, `search.suggest`, `content.code.copy`.
- `plugins: [search]` (built-in, client-side).
- `markdown_extensions`: admonition, pymdownx.details, pymdownx.superfences, pymdownx.tabbed, attr_list, md_in_html, tables, toc, def_list, pymdownx.tasklist.
- `docs_dir: build`, `site_dir: _site`, `nav:` generated.

Branding: minimal `overrides/` with Maica logo + favicon + colour palette. No auth, no role-gating, no AI widget.

### Coverage verification (during implementation, not assumed)

- Enumerate every GitBook construct across the 349 files (grep `{% ... %}`, `<details>`, raw HTML, GitBook tabs/code-groups). Confirm each is handled; add a converter for anything not covered.
- Verify image-path rewriting against real nesting depths in both spaces.

## Infrastructure (Terraform, `site/terraform/`, standalone state)

| Resource | Notes |
|---|---|
| Private S3 bucket | Public access fully blocked; versioned; BucketOwnerEnforced; policy grants read only to this CloudFront distribution via OAC |
| CloudFront distribution | OAC (sigv4); redirect-to-https; compression; `default_root_object=index.html`; 403/404 → `/404/index.html` (private S3 returns 403 for missing keys) |
| CloudFront Function (viewer-request) | `cloudfront-rewrite.js`: `/foo/` and extension-less `/foo` → `/foo/index.html` |
| ACM certificate (us-east-1) | DNS-validated. DNS is external, so Terraform creates the cert and OUTPUTS the validation CNAME(s) to add to external DNS manually. No Route53 resources. |

Dropped from the pack: all `route53.tf` / `route53.redirect.tf`, `kb.tf`, `iam.kb.tf`, legacy 301-redirect distribution.

Terraform backend uses a separate state key from the existing stack so the two are independent and separately destroyable.

### Go-live sequence

1. `terraform apply` → obtain CloudFront default URL + ACM validation CNAME(s).
2. Publish and verify the site on the CloudFront default URL. No DNS needed yet.
3. When ready: add ACM validation CNAME to external DNS → cert issues → add custom domain as CloudFront alias → point external CNAME at CloudFront → set `site_url` in `mkdocs.yml`.

## GitHub Actions (`.github/workflows/publish-docs-site.yml`)

- Trigger: push to `master` touching `knowledgebase/**` or `site/**`; plus `workflow_dispatch`.
- Steps: checkout `fetch-depth: 0` → setup-node → `npm ci` in `site/` → setup-python 3.12 (pip cache) → `pip install -r site/requirements.txt` → run `build.sh` → `mkdocs build` → configure AWS creds → `aws s3 sync _site/ s3://<bucket>/ --delete` → CloudFront invalidation `/*`.
- AWS auth: reuse whatever the existing `terraform.yml` / `sync-docs-to-s3.yml` workflows use (OIDC role or repo secrets) — confirm during implementation — rather than the pack's long-lived access-key pattern.
- Concurrency: one publish at a time per branch.

## Validation strategy

1. Local dry run: `build.sh` + `mkdocs build --strict` against real `knowledgebase/` content (strict fails on broken internal links / missing nav refs).
2. Converter coverage grep (above).
3. Spot-check rendered `_site/` locally: admonitions, collapsibles, embeds, images, both nav trees.
4. Deploy to CloudFront default URL and verify end-to-end before any DNS.

## Out of scope / future

- Algolia search (deferred; nothing built now blocks adding it later).
- AI / Bedrock knowledge base tie-in (existing pipeline already covers RAG).
- Custom domain cutover (go-live step 3, when ready).
- Per-role gating, Salesforce auth bridge, Ask-AI widget (MoveData-specific; excluded).

## Risks & open items

- Converter coverage: Maica content may use GitBook constructs the pack's four converters don't handle (e.g. tabs, code groups, page-level frontmatter variants). Mitigated by the coverage grep before wiring CI.
- Nav fidelity: two SUMMARYs merged into one nav; encoded `&#x20;` and external-URL entries must be handled. Mitigated by `mkdocs build --strict`.
- AWS auth mechanism in existing workflows is unconfirmed until those files are read during implementation.
- ACM cert requires a manual external-DNS step; go-live cannot be fully automated end to end.
