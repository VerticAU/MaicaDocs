# Docs Site Infra & CI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a standalone Terraform stack (private S3 + CloudFront with OAC + URL-rewrite function + optional ACM cert for external DNS) plus a GitHub Actions workflow that builds and publishes the already-transformed static docs site, verifiable on the CloudFront default URL with no DNS.

**Architecture:** A new, independent Terraform root under `site/terraform/` provisions a private versioned S3 bucket readable only by one CloudFront distribution (via Origin Access Control), a CloudFront viewer-request Function that rewrites pretty directory URLs to `index.html`, and an OPTIONAL us-east-1 ACM certificate whose DNS validation records are emitted as outputs for manual entry into an externally-managed DNS zone. A new additive GitHub Actions workflow builds `site/_site/` (Plan 1's output), then runs `site/bin/publish-site.sh`, which reads the bucket name and distribution id from Terraform outputs, syncs to S3, and invalidates CloudFront. The custom domain is toggled off by default so the first apply comes up on the CloudFront default `*.cloudfront.net` URL with no cert or alias blocking.

**Tech Stack:** Terraform `>= 1.5` with `hashicorp/aws ~> 6.0`; AWS S3 + CloudFront + ACM (us-east-1); a CloudFront JS 2.0 function; a Bash publish script driving the AWS CLI v2; GitHub Actions (`actions/checkout`, `actions/setup-node`, `actions/setup-python`, `aws-actions/configure-aws-credentials`, `hashicorp/setup-terraform`).

## Global Constraints

Every task's requirements implicitly include this section. Values are copied verbatim from the design spec and from the existing MaicaDocs `terraform/` + `.github/workflows/` stack (which this plan must coexist with and reuse).

- **This is Plan 2 of 2.** It ASSUMES Plan 1 ("Docs site build") exists and produces `site/_site/` via `cd site && ./build.sh && mkdocs build --strict`. Plan 1 owns `site/build.sh`, `site/mkdocs.yml`, `site/package.json`, `site/package-lock.json`, `site/requirements.txt`, and the `site/bin/*.mjs`/`*.js` transform scripts. Do NOT create those here; only the files this plan lists.
- **Additive only.** Do NOT modify the three existing workflows (`.github/workflows/terraform.yml`, `sync-docs-to-s3.yml`, `bedrock-ingestion.yml`) or the existing `terraform/` stack. The only pre-existing file this plan edits is the repo-root `.gitignore` (one negation line, Task 1).
- **AWS region:** `ap-southeast-2` (confirmed from the existing stack — do not use `us-east-1` except for the ACM provider alias).
- **AWS auth mechanism (reuse exactly what the existing workflows use):** static IAM access keys via GitHub repo secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, wired through `aws-actions/configure-aws-credentials@v4` with `aws-region: ap-southeast-2`. This is NOT OIDC. There is NO AWS named profile — the default credential chain is used.
- **Terraform backend (reuse the existing state bucket, NEW distinct key):** S3 backend `bucket = "maicadocs-production-tfstate"`, `region = "ap-southeast-2"`, `key = "maicadocs/docs-site.tfstate"`. The existing stack uses `key = "maicadocs/terraform.tfstate"`; the new distinct key keeps the two stacks independent and separately destroyable.
- **Provider pin (match the existing stack):** `hashicorp/aws` at `~> 6.0`, lock file pinned to `6.45.0` — matching the pack's proven CloudFront-era provider and the existing stack's `~> 6.0` line. `required_version = ">= 1.5"`.
- **Resource name prefix:** `maicadocs-docs-site` (distinct from the existing `maicadocs-production` prefix).
- **S3 bucket:** private, all public access blocked, versioned, `BucketOwnerEnforced`; bucket policy grants `s3:GetObject` to `cloudfront.amazonaws.com` scoped to THIS distribution's ARN via `AWS:SourceArn`.
- **CloudFront:** OAC sigv4; `viewer-protocol-policy = redirect-to-https`; `compress = true`; `default_root_object = index.html`; custom error responses for BOTH 403 AND 404 → `/404/index.html` (a private S3 bucket returns 403 for missing keys); viewer-request Function running `site/cloudfront-rewrite.js`.
- **Custom domain is OPTIONAL and default-off.** Variable `enable_custom_domain` defaults `false`. The ACM cert + alias only exist when it is `true`. DNS is EXTERNAL to AWS — no Route53 resources, no `aws_acm_certificate_validation` resource (it would block apply on DNS we do not control). Validation records are emitted as an output for manual entry.
- **Indexing is default-off** while serving on the CloudFront default URL: `allow_indexing` defaults `false`, giving an `X-Robots-Tag: noindex` response-headers policy AND a `Disallow: /` robots.txt.
- **Terraform outputs (exact names):** `cloudfront_domain_name`, `cloudfront_distribution_id`, `bucket_name`, `acm_validation_records`.
- **No hardcoded bucket/distribution/profile/region in the publish script.** Bucket name and distribution id come from `terraform output`; credentials and region come from the environment.
- **Prose style:** never use em dashes (organization instruction).

---

### Task 1: Terraform providers, backend, variables, locals, lock

**Files:**
- Create: `site/terraform/providers.tf`
- Create: `site/terraform/variables.tf`
- Create: `site/terraform/locals.tf`
- Create: `site/terraform/.terraform.lock.hcl`
- Modify: `.gitignore` (append one negation line so the new stack's lock file is committable)

**Interfaces:**
- Consumes: nothing (foundational task).
- Produces:
  - Provider `aws` (default, region `var.aws_region`) and provider alias `aws.us_east_1` (region `us-east-1`), both with `default_tags` from `local.common_tags`. Later tasks attach the ACM cert to `provider = aws.us_east_1`.
  - `var.aws_region` (string, default `"ap-southeast-2"`), `var.enable_custom_domain` (bool, default `false`), `var.domain_name` (string, default `""`), `var.allow_indexing` (bool, default `false`).
  - `local.prefix = "maicadocs-docs-site"`, `local.common_tags = { Project = "maicadocs", Component = "docs-site", ManagedBy = "terraform" }`.
  - S3 backend on `maicadocs-production-tfstate`, key `maicadocs/docs-site.tfstate`.

- [ ] **Step 1: Create the provider + backend config**

Create `site/terraform/providers.tf`:

```hcl
terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Reuses the existing MaicaDocs state bucket with a DISTINCT key so this
  # docs-site stack is independent of, and separately destroyable from, the
  # existing raw-md -> S3 -> Bedrock stack (key maicadocs/terraform.tfstate).
  backend "s3" {
    bucket = "maicadocs-production-tfstate"
    key    = "maicadocs/docs-site.tfstate"
    region = "ap-southeast-2"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

# CloudFront viewer certificates must live in us-east-1, regardless of where the
# bucket and distribution config live. Used only when enable_custom_domain=true.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.common_tags
  }
}
```

- [ ] **Step 2: Create the variables**

Create `site/terraform/variables.tf`:

```hcl
variable "aws_region" {
  description = "Primary AWS region for the docs-site bucket and CloudFront origin."
  type        = string
  default     = "ap-southeast-2"
}

variable "enable_custom_domain" {
  description = "When true, request an ACM certificate and attach the custom domain as a CloudFront alias. Leave false for the first apply so the site comes up on the CloudFront default *.cloudfront.net URL with no DNS."
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Custom docs domain (for example docs.maica.io). Only used when enable_custom_domain = true. DNS is managed externally to AWS."
  type        = string
  default     = ""
}

variable "allow_indexing" {
  description = "When true, allow search engines to index the site (no X-Robots-Tag noindex header). Keep false while serving on the CloudFront default URL."
  type        = bool
  default     = false
}
```

- [ ] **Step 3: Create the locals**

Create `site/terraform/locals.tf`:

```hcl
locals {
  prefix = "maicadocs-docs-site"

  common_tags = {
    Project   = "maicadocs"
    Component = "docs-site"
    ManagedBy = "terraform"
  }
}
```

- [ ] **Step 4: Create the provider lock file**

Create `site/terraform/.terraform.lock.hcl` (ported from the handover pack's proven CloudFront-era lock; `~> 6.0` matches the existing MaicaDocs stack):

```hcl
# This file is maintained automatically by "terraform init".
# Manual edits may be lost in future updates.

provider "registry.terraform.io/hashicorp/aws" {
  version     = "6.45.0"
  constraints = "~> 6.0"
  hashes = [
    "h1:9122qJaCqbyEPHtx1Tfpf5v6deU6YPDaknHN26Cq+9g=",
    "h1:FP7YjNtp2FM1UEHfwkgdrcyqtNGCeMI2P6HFPGYmDfY=",
    "zh:27e4dfb1122ca2a603a8427b5bb2bd8001f6c8c972bccd6f64dc319806779d4f",
    "zh:395cbba6b316e119102a52e523b7640274be3964569ed33a4a21141e68beb82d",
    "zh:4f0cafa2e609f373e8ba7fdc4172c93e57b1b149165095d23447894973da8c94",
    "zh:676e6f152ea9234090ad4ad60815957d9a0ed558b0395be98d168ee5bfbdcbd3",
    "zh:76451d10c7857a321df8b08d5c160141c3d4bb5f31a5aa5d1a7e597f2286e96b",
    "zh:9b12af85486a96aedd8d7984b0ff811a4b42e3d88dad1a3fb4c0b580d04fa425",
    "zh:aeaeb47dda318debabf51079e3c5c850edd81dfe48da27a68c30f0e999b53889",
    "zh:c5682491a3da8988643b25c2118bb50aba6419e0918f3e69276e52cacb2db9eb",
    "zh:c646eeef45ca8c1a9e2a8768358f5a8235454c629864e481f6afc6421d6781cc",
    "zh:cbaac79b0d6af1a6c685176711fe9326bd72f2c58dfb1dc6c10854b1f132f26e",
    "zh:d54d6dd6f59daae3a9a6f9d857d75f9f55605da061708a268fa436b57b008179",
    "zh:e55137f4f8d89e46a8e457233a85edf499d387ff29a06fda8044c7a56630bfe0",
    "zh:edfa6e69eae9d0cacb17d1791676604a90139bfe21f0b7347f8f71250e15438a",
    "zh:f691e7766607bc83432c403ba4a959e1bfc213655282e7856b95d004ccfabae8",
    "zh:ff97d311aad061f925eb5f90a12979b2fe6a44d9a949490336e3999642cde133",
  ]
}
```

- [ ] **Step 5: Un-ignore the new stack's lock file**

The repo-root `.gitignore` ignores `.terraform.lock.hcl` at every level. Append a negation so the docs-site stack's lock is committed for reproducible CI. Add this exact block to the end of `/Users/streetsteve/Documents/GitHub/MaicaDocs/.gitignore`:

```gitignore

# Keep the docs-site stack's provider lock committed for reproducible CI
!/site/terraform/.terraform.lock.hcl
```

- [ ] **Step 6: Verify formatting**

Run: `cd site/terraform && terraform fmt -check -recursive`
Expected: no output, exit code 0.

- [ ] **Step 7: Verify providers install and config validates (no backend, no creds needed)**

Run: `cd site/terraform && terraform init -backend=false && terraform validate`
Expected: `init` prints `Terraform has been successfully initialized!`; `validate` prints `Success! The configuration is valid.`

- [ ] **Step 8: Confirm the lock file is not ignored**

Run: `cd /Users/streetsteve/Documents/GitHub/MaicaDocs && git check-ignore site/terraform/.terraform.lock.hcl; echo "exit=$?"`
Expected: no path printed and `exit=1` (meaning the file is NOT ignored).

- [ ] **Step 9: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/terraform/providers.tf site/terraform/variables.tf site/terraform/locals.tf site/terraform/.terraform.lock.hcl .gitignore
git commit -m "feat(site): scaffold docs-site terraform providers, backend, variables"
```

---

### Task 2: Private versioned S3 bucket

**Files:**
- Create: `site/terraform/s3.tf`

**Interfaces:**
- Consumes: `local.prefix` (Task 1).
- Produces: `aws_s3_bucket.docs` (with attributes `.id`, `.arn`, `.bucket`, `.bucket_regional_domain_name`) consumed by the CloudFront origin, bucket policy, and outputs in later tasks. Bucket name is `maicadocs-docs-site`.

- [ ] **Step 1: Create the bucket and its hardening resources**

Create `site/terraform/s3.tf`:

```hcl
resource "aws_s3_bucket" "docs" {
  bucket = local.prefix
}

resource "aws_s3_bucket_public_access_block" "docs" {
  bucket = aws_s3_bucket.docs.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "docs" {
  bucket = aws_s3_bucket.docs.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "docs" {
  bucket = aws_s3_bucket.docs.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}
```

Note: the CloudFront-only read policy lives with the distribution (Task 4), because it references the distribution ARN.

- [ ] **Step 2: Verify formatting**

Run: `cd site/terraform && terraform fmt -check`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify config validates**

Run: `cd site/terraform && terraform validate`
Expected: `Success! The configuration is valid.` (Task 1 already ran `terraform init -backend=false`, so the providers are installed. If validate reports the providers are not installed, re-run `terraform init -backend=false` first.)

- [ ] **Step 4: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/terraform/s3.tf
git commit -m "feat(site): add private versioned S3 bucket for docs site"
```

---

### Task 3: ACM certificate (us-east-1, external DNS)

**Files:**
- Create: `site/terraform/acm.tf`

**Interfaces:**
- Consumes: `var.enable_custom_domain`, `var.domain_name` (Task 1); provider alias `aws.us_east_1` (Task 1).
- Produces: `aws_acm_certificate.docs` (count 0 when `enable_custom_domain=false`). When present, `aws_acm_certificate.docs[0].arn` is consumed by the CloudFront `viewer_certificate` (Task 4) and `aws_acm_certificate.docs[0].domain_validation_options` by the `acm_validation_records` output (Task 5). Deliberately NO `aws_acm_certificate_validation` resource, so apply never blocks on external DNS.

- [ ] **Step 1: Create the certificate**

Create `site/terraform/acm.tf`:

```hcl
# CloudFront certificates must be issued in us-east-1. DNS validation records are
# emitted as an output (see acm_validation_records in outputs.tf) for manual
# entry into the externally-managed DNS zone. We deliberately do NOT create an
# aws_acm_certificate_validation resource, because that would block
# `terraform apply` waiting on DNS records we do not control.
resource "aws_acm_certificate" "docs" {
  count    = var.enable_custom_domain ? 1 : 0
  provider = aws.us_east_1

  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
```

- [ ] **Step 2: Verify formatting**

Run: `cd site/terraform && terraform fmt -check`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify config validates**

Run: `cd site/terraform && terraform validate`
Expected: `Success! The configuration is valid.`

- [ ] **Step 4: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/terraform/acm.tf
git commit -m "feat(site): add optional us-east-1 ACM cert for docs site (external DNS)"
```

---

### Task 4: CloudFront distribution, OAC, rewrite function, bucket policy

**Files:**
- Create: `site/cloudfront-rewrite.js`
- Create: `site/terraform/cloudfront.tf`

**Interfaces:**
- Consumes: `aws_s3_bucket.docs` (Task 2), `aws_acm_certificate.docs` (Task 3), `var.enable_custom_domain`, `var.domain_name`, `var.allow_indexing`, `local.prefix` (Task 1). Reads the rewrite function source from `${path.module}/../cloudfront-rewrite.js` (the `.js` lives in `site/`, one level up from `site/terraform/`).
- Produces: `aws_cloudfront_distribution.docs` (with `.id`, `.arn`, `.domain_name`) consumed by outputs (Task 5) and the bucket policy in this task; `aws_cloudfront_origin_access_control.docs`; `aws_cloudfront_function.rewrite`; `aws_cloudfront_response_headers_policy.noindex` (count 0 when `allow_indexing=true`); `aws_s3_bucket_policy.docs`.

- [ ] **Step 1: Create the viewer-request rewrite function**

Create `site/cloudfront-rewrite.js` (ported verbatim from the handover pack):

```javascript
// CloudFront viewer-request Function.
// S3 + OAC serves objects via the REST API, which (unlike the S3 website
// endpoint) does NOT auto-resolve directory paths to index.html. mkdocs uses
// pretty URLs like /reference/ -> /reference/index.html, so we rewrite at the
// edge.
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // /foo/  -> /foo/index.html
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
        return request;
    }

    // /foo   -> /foo/index.html  (only when there's no file extension)
    var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
    if (lastSegment.indexOf('.') === -1) {
        request.uri = uri + '/index.html';
    }

    return request;
}
```

- [ ] **Step 2: Create the CloudFront config and the CloudFront-only bucket policy**

Create `site/terraform/cloudfront.tf`:

```hcl
resource "aws_cloudfront_origin_access_control" "docs" {
  name                              = "${local.prefix}-oac"
  description                       = "OAC for the Maica docs site bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# X-Robots-Tag: noindex on every response while the site is pre-launch on the
# CloudFront default URL. Paired with the Disallow robots.txt written by
# bin/publish-site.sh. Belt and braces so nothing gets indexed before go-live.
resource "aws_cloudfront_response_headers_policy" "noindex" {
  count = var.allow_indexing ? 0 : 1

  name    = "${local.prefix}-noindex"
  comment = "X-Robots-Tag: noindex while the docs site is pre-launch"

  custom_headers_config {
    items {
      header   = "X-Robots-Tag"
      value    = "noindex, nofollow, noarchive"
      override = true
    }
  }
}

# Rewrites /foo/ and extension-less /foo -> /foo/index.html so mkdocs's pretty
# directory URLs resolve under OAC (the S3 REST API does not serve index.html).
resource "aws_cloudfront_function" "rewrite" {
  name    = "${local.prefix}-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite directory paths to index.html"
  publish = true
  code    = file("${path.module}/../cloudfront-rewrite.js")
}

resource "aws_cloudfront_distribution" "docs" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = "Maica docs site"
  aliases             = var.enable_custom_domain ? [var.domain_name] : []
  price_class         = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.docs.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.docs.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.docs.id
  }

  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = "s3-${aws_s3_bucket.docs.id}"
    viewer_protocol_policy     = "redirect-to-https"
    compress                   = true
    response_headers_policy_id = var.allow_indexing ? null : aws_cloudfront_response_headers_policy.noindex[0].id

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite.arn
    }

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  # A private S3 bucket returns 403 (not 404) for a missing key; mkdocs emits a
  # 404/index.html page. Map BOTH error codes to it.
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404/index.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404/index.html"
    error_caching_min_ttl = 60
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Default-off: the distribution comes up on its *.cloudfront.net cert so it can
  # be smoke-tested with no DNS. Setting enable_custom_domain=true swaps to the
  # ACM cert. CloudFront rejects a custom cert without a matching alias, so both
  # the alias (above) and the cert here track enable_custom_domain.
  viewer_certificate {
    cloudfront_default_certificate = var.enable_custom_domain ? null : true
    acm_certificate_arn            = var.enable_custom_domain ? aws_acm_certificate.docs[0].arn : null
    ssl_support_method             = var.enable_custom_domain ? "sni-only" : null
    minimum_protocol_version       = var.enable_custom_domain ? "TLSv1.2_2021" : null
  }
}

# Bucket policy: only this CloudFront distribution may read the bucket (OAC).
data "aws_iam_policy_document" "docs_bucket" {
  statement {
    sid       = "AllowCloudFrontRead"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.docs.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.docs.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "docs" {
  bucket     = aws_s3_bucket.docs.id
  policy     = data.aws_iam_policy_document.docs_bucket.json
  depends_on = [aws_s3_bucket_public_access_block.docs]
}
```

- [ ] **Step 3: Verify formatting**

Run: `cd site/terraform && terraform fmt -check`
Expected: no output, exit code 0.

- [ ] **Step 4: Verify config validates**

Run: `cd site/terraform && terraform validate`
Expected: `Success! The configuration is valid.`

- [ ] **Step 5: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/cloudfront-rewrite.js site/terraform/cloudfront.tf
git commit -m "feat(site): add CloudFront distribution, OAC, rewrite function, bucket policy"
```

---

### Task 5: Terraform outputs and full-plan verification gate

**Files:**
- Create: `site/terraform/outputs.tf`

**Interfaces:**
- Consumes: `aws_s3_bucket.docs` (Task 2), `aws_cloudfront_distribution.docs` (Task 4), `aws_acm_certificate.docs` (Task 3), `var.enable_custom_domain` (Task 1).
- Produces (the contract the publish script and humans depend on): outputs `bucket_name`, `cloudfront_domain_name`, `cloudfront_distribution_id`, `acm_validation_records`.

- [ ] **Step 1: Create the outputs**

Create `site/terraform/outputs.tf`:

```hcl
output "bucket_name" {
  description = "S3 bucket holding the rendered docs site. Consumed by bin/publish-site.sh."
  value       = aws_s3_bucket.docs.bucket
}

output "cloudfront_domain_name" {
  description = "The distribution's *.cloudfront.net hostname. Browse https://<this> to verify the site before any DNS is configured."
  value       = aws_cloudfront_distribution.docs.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID. Used by bin/publish-site.sh to issue cache invalidations."
  value       = aws_cloudfront_distribution.docs.id
}

output "acm_validation_records" {
  description = "DNS CNAME records to add to the external DNS zone to validate the ACM certificate. Empty until enable_custom_domain = true."
  value = var.enable_custom_domain ? [
    for o in aws_acm_certificate.docs[0].domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ] : []
}
```

- [ ] **Step 2: Verify formatting**

Run: `cd site/terraform && terraform fmt -check`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify config validates**

Run: `cd site/terraform && terraform validate`
Expected: `Success! The configuration is valid.`

- [ ] **Step 4: Full plan against the real backend (requires AWS creds + the existing state bucket)**

This is the end-to-end infra gate. It needs the same credentials the existing `terraform.yml` uses (an IAM principal with access to the `maicadocs-production-tfstate` bucket and permission to create S3/CloudFront resources). Export `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION=ap-southeast-2` (or use whatever local credential source has that access), then:

Run:
```bash
cd site/terraform
terraform init -input=false
terraform plan -input=false -no-color
```
Expected: `init` prints `Successfully configured the backend "s3"!` and `Terraform has been successfully initialized!`. `plan` ends with exactly:
`Plan: 9 to add, 0 to change, 0 to destroy.`
The 9 resources are: `aws_s3_bucket.docs`, `aws_s3_bucket_public_access_block.docs`, `aws_s3_bucket_versioning.docs`, `aws_s3_bucket_ownership_controls.docs`, `aws_s3_bucket_policy.docs`, `aws_cloudfront_origin_access_control.docs`, `aws_cloudfront_function.rewrite`, `aws_cloudfront_distribution.docs`, `aws_cloudfront_response_headers_policy.noindex[0]`. The ACM cert is 0 (domain disabled). Confirm no `aws_route53_*` and no `aws_acm_certificate_validation` appear in the plan.

If AWS credentials are not available in the execution environment, skip Step 4 and record that it must be run manually by an operator with access before the first `apply` (Task 8's GO-LIVE doc covers the apply). Do not block the commit on it.

- [ ] **Step 5: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/terraform/outputs.tf
git commit -m "feat(site): add docs-site terraform outputs (bucket, cloudfront, acm)"
```

---

### Task 6: publish-site.sh

**Files:**
- Create: `site/bin/publish-site.sh`

**Interfaces:**
- Consumes: the built site at `site/_site/` (Plan 1's output); Terraform outputs `bucket_name` and `cloudfront_distribution_id` (Task 5) read via `terraform -chdir=site/terraform output -raw ...`; AWS credentials and region from the environment; optional env `ALLOW_INDEXING`.
- Produces: an S3 sync of `site/_site/` to the docs bucket plus a CloudFront `/*` invalidation. Called by the workflow (Task 7) and runnable locally.

- [ ] **Step 1: Create the publish script**

Create `site/bin/publish-site.sh`:

```bash
#!/usr/bin/env bash
# Sync the built docs site to its private S3 bucket and invalidate CloudFront.
#
# The target bucket and distribution id are read from the site/terraform outputs
# so nothing is hard-coded. Credentials and region come from the environment
# (AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_REGION), as set by
# aws-actions/configure-aws-credentials in CI or by your shell locally.
#
# Prerequisites:
#   - './build.sh && mkdocs build --strict' has produced site/_site/
#   - 'terraform -chdir=site/terraform init' has been run (so outputs are readable)
#
# Env:
#   ALLOW_INDEXING=true   write an Allow-all robots.txt (default: Disallow all)

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # site/bin
SITE_DIR="$(cd "$HERE/.." && pwd)"                      # site
TF_DIR="$SITE_DIR/terraform"                            # site/terraform
SITE_OUT="$SITE_DIR/_site"                              # rendered HTML

if [ ! -d "$SITE_OUT" ]; then
  echo "ERROR: $SITE_OUT does not exist. Run './build.sh && mkdocs build --strict' in site/ first." >&2
  exit 1
fi

# Stage-appropriate robots.txt. Default noindex while we serve on the CloudFront
# default URL; set ALLOW_INDEXING=true once the site is live on its real domain.
# Written into _site before the sync so it ships as part of the site.
if [ "${ALLOW_INDEXING:-false}" = "true" ]; then
  printf 'User-agent: *\nAllow: /\n' > "$SITE_OUT/robots.txt"
else
  printf 'User-agent: *\nDisallow: /\n' > "$SITE_OUT/robots.txt"
fi

# Bucket name from terraform output. Without initialised state this returns
# empty; we cannot publish without a bucket, so bail with guidance.
BUCKET="$(terraform -chdir="$TF_DIR" output -raw bucket_name 2>/dev/null || true)"
if [ -z "$BUCKET" ] || [ "$BUCKET" = "null" ]; then
  echo "ERROR: could not read bucket_name from terraform output in $TF_DIR." >&2
  echo "       Run 'terraform -chdir=$TF_DIR init' and ensure the stack has been applied." >&2
  exit 1
fi

echo "-> syncing $SITE_OUT/ to s3://${BUCKET}/"
aws s3 sync "$SITE_OUT/" "s3://${BUCKET}/" \
  --delete \
  --cache-control "public, max-age=300" \
  --no-progress

# Distribution id from terraform output. Skip invalidation gracefully if there
# is no distribution wired up yet (for example the very first pre-apply publish).
DISTRIBUTION_ID="$(terraform -chdir="$TF_DIR" output -raw cloudfront_distribution_id 2>/dev/null || true)"
if [ -n "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "null" ]; then
  echo "-> invalidating CloudFront ${DISTRIBUTION_ID}"
  aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query "Invalidation.Id" \
    --output text
else
  echo "-> no CloudFront distribution in terraform output; skipping invalidation"
fi

echo "-> published to ${BUCKET}"
```

- [ ] **Step 2: Make the script executable**

Run: `chmod +x site/bin/publish-site.sh`
Expected: no output, exit code 0.

- [ ] **Step 3: Verify Bash syntax**

Run: `bash -n site/bin/publish-site.sh`
Expected: no output, exit code 0.

- [ ] **Step 4: Verify graceful behaviour when there is no site build**

Run: `cd /tmp && SITE_OUT_TEST=1 bash /Users/streetsteve/Documents/GitHub/MaicaDocs/site/bin/publish-site.sh; echo "exit=$?"`
Expected: prints `ERROR: ...\_site does not exist. Run './build.sh && mkdocs build --strict' in site/ first.` and `exit=1`. (This confirms the guard fires; no AWS calls are made.)

- [ ] **Step 5: Optionally verify shellcheck if available**

Run: `command -v shellcheck >/dev/null && shellcheck site/bin/publish-site.sh || echo "shellcheck not installed, skipping"`
Expected: either no shellcheck findings, or `shellcheck not installed, skipping`.

- [ ] **Step 6: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/bin/publish-site.sh
git commit -m "feat(site): add publish-site.sh (S3 sync + CloudFront invalidation)"
```

---

### Task 7: GitHub Actions publish workflow

**Files:**
- Create: `.github/workflows/publish-docs-site.yml`

**Interfaces:**
- Consumes: Plan 1's `site/build.sh`, `site/mkdocs.yml`, `site/package.json`, `site/package-lock.json`, `site/requirements.txt`; Task 6's `site/bin/publish-site.sh`; the Terraform stack in `site/terraform/` (for `terraform init` to make outputs readable); GitHub secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (the same secrets the existing workflows use).
- Produces: an additive workflow that builds and publishes the site on push to `master` touching `knowledgebase/**` or `site/**`, and on manual dispatch.

- [ ] **Step 1: Create the workflow**

Create `.github/workflows/publish-docs-site.yml`:

```yaml
name: Publish Docs Site

on:
  push:
    branches: [master]
    paths:
      - 'knowledgebase/**'
      - 'site/**'
  workflow_dispatch:

concurrency:
  group: publish-docs-site-${{ github.ref_name }}
  cancel-in-progress: false

jobs:
  publish:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: site

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: site/package-lock.json

      - name: Install Node dependencies
        run: npm ci

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'
          cache-dependency-path: site/requirements.txt

      - name: Install Python dependencies
        run: pip install -r requirements.txt

      - name: Transform GitBook markdown
        run: ./build.sh

      - name: Build static site
        run: mkdocs build --strict

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-2

      - name: Set up Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "~> 1.5"
          terraform_wrapper: false

      - name: Terraform init (read stack outputs)
        working-directory: site/terraform
        run: terraform init -input=false

      - name: Publish to S3 and invalidate CloudFront
        run: ./bin/publish-site.sh
```

Notes for the implementer (do not add these to the YAML):
- `terraform_wrapper: false` is required so `terraform output -raw` in the publish script returns a clean value with no wrapper markers.
- The step-level `working-directory: site/terraform` is relative to the repository root, overriding the job default of `site`.
- `./build.sh` and `./bin/publish-site.sh` run under the job default `site`, resolving to `site/build.sh` and `site/bin/publish-site.sh`.

- [ ] **Step 2: Verify the YAML parses**

Run: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/publish-docs-site.yml')); print('ok')"`
Expected: `ok`.

- [ ] **Step 3: Optionally lint with actionlint if available**

Run: `command -v actionlint >/dev/null && actionlint .github/workflows/publish-docs-site.yml || echo "actionlint not installed, skipping"`
Expected: either no findings, or `actionlint not installed, skipping`.

- [ ] **Step 4: Confirm the three existing workflows are unchanged**

Run: `cd /Users/streetsteve/Documents/GitHub/MaicaDocs && git status --porcelain .github/workflows/`
Expected: only `?? .github/workflows/publish-docs-site.yml` (the three existing workflows must NOT appear as modified).

- [ ] **Step 5: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add .github/workflows/publish-docs-site.yml
git commit -m "ci(site): add publish-docs-site workflow (build + S3 publish)"
```

- [ ] **Step 6: Workflow_dispatch dry-run verification (post-merge, manual)**

After this branch is merged to `master` and the Terraform stack has been applied once (Task 8), trigger the workflow manually from the Actions tab (`Run workflow` on `Publish Docs Site`). Confirm: the build steps pass, `terraform init` configures the backend, `publish-site.sh` prints `-> syncing ... to s3://maicadocs-docs-site/` and `-> invalidating CloudFront <id>`, and the run ends green. Then browse `https://<cloudfront_domain_name>` and confirm HTTP 200 with expected HTML (see Task 8).

---

### Task 8: GO-LIVE runbook

**Files:**
- Create: `site/GO-LIVE.md`

**Interfaces:**
- Consumes: the whole `site/terraform/` stack, `site/bin/publish-site.sh`, and Plan 1's build (`site/build.sh` + `mkdocs build`).
- Produces: a human runbook for first apply, verification on the CloudFront default URL, and the later custom-domain cutover via external DNS.

- [ ] **Step 1: Create the runbook**

Create `site/GO-LIVE.md`:

````markdown
# Docs site: go-live runbook

The docs-site infrastructure lives in `site/terraform/` (a standalone Terraform
stack, separate state key `maicadocs/docs-site.tfstate` in the shared
`maicadocs-production-tfstate` bucket). This runbook covers the manual steps to
stand it up, verify it on the CloudFront default URL with no DNS, and later cut
over to a custom domain whose DNS is managed outside AWS.

All commands assume AWS credentials with access to the state bucket and to
create S3/CloudFront/ACM resources are present in the environment (for example
`export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_REGION=ap-southeast-2`).

## 1. First apply (no domain, no DNS)

```bash
cd site/terraform
terraform init
terraform plan -out=tfplan          # expect: Plan: 9 to add, 0 to change, 0 to destroy
terraform apply tfplan
```

Record the outputs:

```bash
terraform output -raw bucket_name                 # maicadocs-docs-site
terraform output -raw cloudfront_domain_name      # dxxxxxxxxxxxxx.cloudfront.net
terraform output -raw cloudfront_distribution_id  # EXXXXXXXXXXXXX
```

## 2. Build and publish, then verify on the CloudFront default URL

```bash
cd site
./build.sh
mkdocs build --strict
./bin/publish-site.sh               # syncs site/_site/ and invalidates CloudFront
```

CloudFront can take several minutes to finish deploying the first time. Then:

```bash
CF="$(terraform -chdir=terraform output -raw cloudfront_domain_name)"
curl -sSI "https://${CF}/" | head -n 1              # expect: HTTP/2 200
curl -sS  "https://${CF}/" | grep -i "<title>"      # expect the site title HTML
curl -sSI "https://${CF}/does-not-exist/" | head -n 1  # expect: HTTP/2 404 (custom 404 page)
```

While pre-launch, `robots.txt` is `Disallow: /` and every response carries
`X-Robots-Tag: noindex` (the `allow_indexing` variable is `false`). Confirm:

```bash
curl -sS  "https://${CF}/robots.txt"                # expect: User-agent: * / Disallow: /
curl -sSI "https://${CF}/" | grep -i x-robots-tag   # expect: noindex, nofollow, noarchive
```

## 3. Custom-domain cutover (later, when the domain is decided)

DNS is external to AWS. Pick the domain (for example `docs.maica.io`) and set
`site_url` in `site/mkdocs.yml` to `https://docs.maica.io/` in the same change.

1. Enable the cert and read the validation record:

   ```bash
   cd site/terraform
   terraform apply \
     -var 'enable_custom_domain=true' \
     -var 'domain_name=docs.maica.io'
   terraform output -json acm_validation_records
   ```

   This creates the ACM cert but does NOT block on validation. The output is a
   list of `{ name, type, value }` CNAME records.

2. In the external DNS provider, create each `acm_validation_records` CNAME
   (`name` -> `value`). Wait for ACM to report the certificate `ISSUED`:

   ```bash
   aws acm list-certificates --region us-east-1 \
     --query "CertificateSummaryList[?DomainName=='docs.maica.io'].CertificateArn" --output text
   aws acm describe-certificate --region us-east-1 \
     --certificate-arn <arn> --query "Certificate.Status" --output text   # expect: ISSUED
   ```

3. Re-apply so CloudFront attaches the alias and switches to the ACM cert. With
   `enable_custom_domain=true` still set the alias is already in the plan, so a
   plain re-apply after issuance is enough:

   ```bash
   terraform apply -var 'enable_custom_domain=true' -var 'domain_name=docs.maica.io'
   ```

4. In the external DNS provider, point `docs.maica.io` (CNAME, or ALIAS/ANAME at
   an apex) at `cloudfront_domain_name`. Verify:

   ```bash
   curl -sSI "https://docs.maica.io/" | head -n 1     # expect: HTTP/2 200
   ```

5. When ready to be indexed, publish with indexing allowed and re-apply to drop
   the noindex header:

   ```bash
   cd site/terraform && terraform apply \
     -var 'enable_custom_domain=true' -var 'domain_name=docs.maica.io' \
     -var 'allow_indexing=true'
   cd .. && ALLOW_INDEXING=true ./bin/publish-site.sh
   ```

## Tearing down

The stack is independent of the existing `terraform/` stack and can be destroyed
on its own:

```bash
cd site/terraform && terraform destroy
```

Empty the versioned bucket first if `destroy` reports it is not empty.
````

- [ ] **Step 2: Verify the runbook renders as valid Markdown (no stray fence issues)**

Run: `python3 -c "open('site/GO-LIVE.md').read(); print('ok')"`
Expected: `ok`.

- [ ] **Step 3: Commit**

```bash
cd /Users/streetsteve/Documents/GitHub/MaicaDocs
git add site/GO-LIVE.md
git commit -m "docs(site): add go-live runbook for docs-site infra"
```

---

## Self-Review

**Spec coverage (design spec + task requirements):**
- Standalone Terraform under `site/terraform/`, default region + `aws.us_east_1` alias, S3 backend reusing the existing state bucket with a new key: Task 1.
- Private versioned S3 bucket, all public access blocked, `BucketOwnerEnforced`, CloudFront-only OAC read policy: Task 2 (bucket) + Task 4 (policy).
- CloudFront OAC sigv4, redirect-to-https, compress, `default_root_object=index.html`, 403 AND 404 → `/404/index.html`, viewer-request function from `site/cloudfront-rewrite.js`: Task 4.
- Ported `cloudfront-rewrite.js` (`/foo/` and extension-less `/foo` → `/foo/index.html`): Task 4.
- ACM cert in us-east-1, DNS-validated, DNS external, no `aws_acm_certificate_validation`, no Route53; validation records + CloudFront domain + distribution id + bucket name output for humans/scripts: Task 3 + Task 5.
- Custom domain optional/toggleable (default off) so first apply works on the CloudFront default URL: Task 1 (`enable_custom_domain`), Task 3, Task 4.
- Outputs `cloudfront_domain_name`, `cloudfront_distribution_id`, `bucket_name`, `acm_validation_records`: Task 5.
- Provider `hashicorp/aws ~> 6.0`, lock ported, matching the existing stack; ACM/CloudFront only: Task 1.
- `site/bin/publish-site.sh` with `set -euo pipefail`, no hardcoded profile/region, stage robots.txt (default noindex, env toggle), `aws s3 sync ... --delete --cache-control "public, max-age=300"`, distribution id from terraform output, `/*` invalidation, graceful skip, bucket from terraform output: Task 6.
- `.github/workflows/publish-docs-site.yml` new + additive, triggers/concurrency/steps as specified, reusing the existing static-keys auth, terraform init to read outputs: Task 7.
- `site/GO-LIVE.md` runbook with exact commands: Task 8.
- Verification gates (`fmt -check`, `validate`, `plan` with expected counts, `bash -n`, curl 200 + HTML, workflow_dispatch dry-run): distributed across Tasks 1-8.

**Excluded as required:** `kb.tf`, `iam.kb.tf`, `route53.tf`, `route53.redirect.tf`, `publish-ai.sh`, all Algolia/moon wiring, all Bedrock/S3-Vectors outputs. None appear in any task.

**Placeholder scan:** every code/config step contains complete real content; no TBD/TODO/"handle edge cases"/"similar to Task N".

**Type/name consistency:** resource addresses (`aws_s3_bucket.docs`, `aws_cloudfront_distribution.docs`, `aws_acm_certificate.docs`, `aws_cloudfront_function.rewrite`, `aws_cloudfront_response_headers_policy.noindex`), variable names (`enable_custom_domain`, `domain_name`, `allow_indexing`, `aws_region`), output names, `local.prefix`, and the `terraform output -raw bucket_name`/`cloudfront_distribution_id` reads used by `publish-site.sh` are consistent across Tasks 1-8.
````
