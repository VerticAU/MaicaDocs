# Docs site: go-live runbook

The docs-site infrastructure lives in `site/terraform/`, a standalone Terraform
stack with its own state key `maicadocs/docs-site.tfstate` in the shared
`maicadocs-production-tfstate` bucket (region `ap-southeast-2`). Because the key
is distinct from the existing raw-md to S3 to Bedrock stack
(`maicadocs/terraform.tfstate`), this stack is applied, destroyed, and reasoned
about independently.

This runbook covers the manual operator steps to:

1. stand up the infrastructure and publish for the first time on the CloudFront
   default `*.cloudfront.net` URL, with no DNS,
2. verify it,
3. later cut over to a custom domain whose DNS is managed outside AWS, and
4. hand day-to-day publishing over to CI.

Follow the phases in order. Phase 1 is required before any content can be
served. Phase 2 is done later, once the domain is decided.

## Prerequisites

- **AWS credentials** in the environment for the account that owns the docs
  infrastructure, with permission to:
  - read and write the Terraform state bucket `maicadocs-production-tfstate`,
  - create and manage the docs S3 bucket `maicadocs-docs-site` (create bucket,
    put bucket policy, versioning, ownership, public-access-block, and
    `s3:PutObject` / `s3:DeleteObject` / `s3:ListBucket` for publishing),
  - create and update CloudFront (distribution, origin access control,
    function, response-headers policy) and issue invalidations,
  - request and describe ACM certificates in `us-east-1` (only needed for
    Phase 2).

  There is no IAM role or user created by this stack, so no `iam:*` permissions
  are required. Export the credentials before running anything, for example:

  ```bash
  export AWS_ACCESS_KEY_ID=...
  export AWS_SECRET_ACCESS_KEY=...
  export AWS_REGION=ap-southeast-2
  ```

- **Terraform** >= 1.5 (the stack pins `required_version = ">= 1.5"` and the AWS
  provider `~> 6.0`).
- **Python** 3.12 for the mkdocs build.
- **Node** 20 for the GitBook transform scripts invoked by `build.sh`.
- **GitHub repo secrets** `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
  already configured for this repository. They are reused from the existing
  pipeline by the `Publish Docs Site` workflow; no new secret is introduced.

## Phase 1: stand up infra and first publish on the CloudFront default URL

No DNS is involved in this phase. The distribution comes up on its
`*.cloudfront.net` hostname using the default CloudFront certificate, and the
site is served with search-engine indexing suppressed.

### 1a. Apply the infrastructure

The S3 backend is already configured in `providers.tf`, so `init` needs no
backend flags.

```bash
cd site/terraform
terraform init
terraform plan     # expect: Plan: 9 to add, 0 to change, 0 to destroy
terraform apply
```

The 9 resources are the S3 bucket, its public-access-block, versioning,
ownership controls and bucket policy, the CloudFront origin access control, the
rewrite CloudFront function, the noindex response-headers policy, and the
CloudFront distribution. With `enable_custom_domain = false` (the default) no
ACM certificate is created, which is why the count is 9 and not more.

### 1b. Record the outputs

```bash
terraform output -raw bucket_name                 # maicadocs-docs-site
terraform output -raw cloudfront_domain_name      # dxxxxxxxxxxxxx.cloudfront.net
terraform output -raw cloudfront_distribution_id  # EXXXXXXXXXXXXX
```

`publish-site.sh` reads `bucket_name` and `cloudfront_distribution_id` from
these same outputs, so you do not need to copy them anywhere. Keep the
`cloudfront_domain_name` value handy for the verification step.

### 1c. Build and publish the content

The build runs in a Python virtualenv. The first time, create it and install
the pinned mkdocs toolchain (mkdocs 1.6.1, mkdocs-material 9.7.4,
pymdown-extensions 10.21):

```bash
cd ..                       # back to site/
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Then build and publish:

```bash
./build.sh                  # GitBook transform, writes site/build + mkdocs.yml
mkdocs build --strict       # renders site/_site/
./bin/publish-site.sh       # syncs _site/ to S3 and invalidates CloudFront
```

Leave `ALLOW_INDEXING` unset. `publish-site.sh` then writes a
`Disallow: /` robots.txt, which matches the `X-Robots-Tag: noindex` header the
distribution serves while `allow_indexing = false`. Both keep the site out of
search results while it is on the default URL.

### 1d. Verify on the CloudFront default URL

CloudFront can take several minutes to finish deploying the first time. Once it
has, check a real page. The site ROOT (`/`) does not have a page yet (see the
note below), so verify a guide landing page instead:

```bash
CF="$(terraform -chdir=terraform output -raw cloudfront_domain_name)"
curl -sSI "https://${CF}/adminguide/" | head -n 1   # expect: HTTP/2 200
```

Then open `https://${CF}/adminguide/` and `https://${CF}/userguide/` in a
browser and confirm:

- both spaces render (Admin Guide and User Guide),
- search works,
- the Maica logo shows in the header.

Confirm indexing is suppressed while on the default URL:

```bash
curl -sS  "https://${CF}/robots.txt"                # expect: User-agent: * / Disallow: /
curl -sSI "https://${CF}/adminguide/" | grep -i x-robots-tag   # expect: X-Robots-Tag: noindex, nofollow, noarchive
```

### Known gap: the site root `/` 404s

Neither space's SUMMARY defines a top-level `index.md`, so the build produces no
`_site/index.html`. The distribution has `default_root_object = index.html`, so
a request to `/` asks S3 for a key that does not exist; S3 returns 403, which
the distribution maps to the mkdocs `404.html` page at the site root. In other
words, `/` (and any missing path) serves the styled mkdocs 404 page.
`/adminguide/` and `/userguide/` work correctly.

This is fine for the default-URL smoke test but must be decided before the
custom-domain launch. The options are:

- add a docs-root homepage: author a top-level `index.md` (a landing page that
  links to both guides) so `/` renders it, or
- redirect `/` at the edge: add a small CloudFront rewrite/redirect (or a
  redirecting `index.html`) that sends `/` to `/userguide/` or `/adminguide/`.

Pick one before running Phase 2.

## Phase 2: custom-domain cutover (external DNS)

Do this once the domain is decided. DNS for the docs domain is managed outside
AWS (there is no Route53 zone and no `aws_acm_certificate_validation` resource in
this stack), so certificate validation and the final domain-to-CloudFront record
are added by hand in the external DNS provider.

The cutover is deliberately split across two variables so nothing ever attaches
a not-yet-issued certificate to the distribution:

- `enable_custom_domain` only REQUESTS the ACM certificate (and populates the
  `acm_validation_records` output). The distribution stays on the CloudFront
  default certificate.
- `attach_custom_domain` ATTACHES the issued certificate and the domain alias to
  the distribution. It requires `enable_custom_domain = true` and the cert to be
  `ISSUED`; a precondition on the distribution enforces the first half, and
  CloudFront itself rejects a non-ISSUED cert.

This gives a clean three-step sequence: request the cert, validate it in
external DNS, then attach. Throughout this phase, substitute your chosen domain
(for example `docs.maica.io`) wherever `docs.example` appears.

### 2a. First apply: request the certificate (attach still off)

Set `enable_custom_domain = true` and `domain_name`, leaving
`attach_custom_domain` at its default `false`. You can pass them with `-var` as
shown, or put them in a `terraform.tfvars` file. Optionally set
`allow_indexing = true` at this point only if you are ready for search engines
(see step 2f for why indexing has two independent switches).

```bash
cd site/terraform
terraform apply \
  -var 'enable_custom_domain=true' \
  -var 'domain_name=docs.example'
```

This requests the ACM certificate in `us-east-1`. Because `attach_custom_domain`
is still false, the distribution keeps the CloudFront default certificate and
empty aliases, so this apply SUCCEEDS cleanly even though the new certificate is
still `PENDING_VALIDATION`. It also does NOT block on DNS, because there is
deliberately no `aws_acm_certificate_validation` resource. Read the validation
record it needs:

```bash
terraform output -json acm_validation_records
```

The output is a list of `{ name, type, value }` CNAME records (empty until
`enable_custom_domain = true`).

### 2b. Add the validation CNAME to external DNS

In the external DNS provider, create each `acm_validation_records` entry as a
CNAME using its `name` (host), `type`, and `value`. Then wait for ACM to report
the certificate `ISSUED`:

```bash
aws acm list-certificates --region us-east-1 \
  --query "CertificateSummaryList[?DomainName=='docs.example'].CertificateArn" \
  --output text
aws acm describe-certificate --region us-east-1 \
  --certificate-arn <arn> \
  --query "Certificate.Status" --output text   # expect: ISSUED
```

Do NOT run the second apply until this reports `ISSUED`. Attaching a
`PENDING_VALIDATION` certificate is exactly what the split avoids: CloudFront
would reject it.

### 2c. Second apply: attach the cert and alias to CloudFront

Once ACM shows `ISSUED`, run a SECOND apply that adds `attach_custom_domain=true`
on top of the same variables. This attaches the now-issued ACM certificate and
the domain alias to the distribution:

```bash
terraform apply \
  -var 'enable_custom_domain=true' \
  -var 'attach_custom_domain=true' \
  -var 'domain_name=docs.example'
```

This three-step sequence (request cert, validate in external DNS, apply again
with `attach_custom_domain=true`) is expected and by design.

### 2d. Point the domain at CloudFront

In the external DNS provider, add the record that sends the docs domain to the
distribution. Use the `cloudfront_domain_name` output as the target:

- for a subdomain such as `docs.example`, a CNAME to `<cloudfront_domain_name>`,
- for an apex domain, an ALIAS / ANAME to `<cloudfront_domain_name>` (a plain
  CNAME is not valid at an apex).

### 2e. Set the site URL and re-publish

Set the canonical site URL to the final domain. In `site/mkdocs.yml.template`,
uncomment the placeholder and set `site_url`:

```yaml
site_url: https://docs.example/
```

Then rebuild and publish so the rendered site carries the correct canonical URL
and sitemap:

```bash
cd ..
source .venv/bin/activate
./build.sh
mkdocs build --strict
./bin/publish-site.sh
```

### 2f. Turn indexing on (when ready)

Indexing is controlled by two independent switches that must be flipped
together, or search engines get contradictory signals:

1. the `allow_indexing` Terraform variable removes the `X-Robots-Tag: noindex`
   response header from the distribution, and
2. the `ALLOW_INDEXING` publish env var writes an `Allow: /` robots.txt.

When ready to be indexed, apply with `allow_indexing = true` AND publish with
`ALLOW_INDEXING=true`:

```bash
cd site/terraform
terraform apply \
  -var 'enable_custom_domain=true' \
  -var 'attach_custom_domain=true' \
  -var 'domain_name=docs.example' \
  -var 'allow_indexing=true'
cd ..
ALLOW_INDEXING=true ./bin/publish-site.sh
```

### 2g. Verify on the real domain

```bash
curl -sSI "https://docs.example/adminguide/" | head -n 1   # expect: HTTP/2 200
```

Confirm HTTPS terminates on the ACM certificate (no browser warning) and, if you
turned indexing on, that `https://docs.example/robots.txt` now serves
`Allow: /` and the `X-Robots-Tag` header is gone.

## Ongoing publishing (CI)

After the first manual apply and publish, content updates are automatic. The
`.github/workflows/publish-docs-site.yml` workflow (`Publish Docs Site`) runs on
every push to `master` that touches `knowledgebase/**` or `site/**`, and can
also be run manually via `workflow_dispatch`. It:

1. sets up Node 20 and Python 3.12,
2. `pip install -r requirements.txt`,
3. runs `./build.sh` and `mkdocs build --strict`,
4. configures AWS with the `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`
   secrets,
5. runs `terraform init` in `site/terraform` only to READ the stack outputs, and
6. runs `./bin/publish-site.sh` to sync and invalidate.

The workflow does NOT run `terraform apply` or `terraform plan`. It only
publishes content. All infrastructure changes (first apply, the custom-domain
cutover, the indexing flip) are applied MANUALLY with the `terraform apply`
commands in this runbook. CI never changes infrastructure.

## Rollback and teardown

- **Content rollback**: the S3 bucket has versioning enabled, so previous object
  versions are retained. A bad publish can be recovered by restoring prior
  versions in S3 and issuing a CloudFront invalidation.
- **Full teardown**: this stack is independent of the existing `terraform/`
  stack (distinct state key `maicadocs/docs-site.tfstate`), so it can be
  destroyed on its own without affecting the raw-md to S3 to Bedrock stack:

  ```bash
  cd site/terraform
  terraform destroy
  ```

  If `destroy` reports the bucket is not empty (versioning keeps old versions),
  empty the versioned bucket first, then re-run `terraform destroy`.

## Troubleshooting

- **403 on every page**: the OAC or bucket policy is not letting CloudFront read
  the bucket. Confirm the distribution deployed fully, that
  `aws_s3_bucket_policy.docs` applied, and that the objects exist in the bucket
  (`aws s3 ls s3://maicadocs-docs-site/`). A missing key also surfaces as 403
  from S3 and is mapped to the 404 page, so check the exact path first.
- **Missing images or stale pages**: rebuild from clean. `build.sh` wipes
  `build/` each run; re-run `./build.sh && mkdocs build --strict` and re-publish.
- **Old content after publishing**: CloudFront invalidation is not instant.
  `publish-site.sh` issues a `/*` invalidation, but propagation takes a short
  while. Wait, then hard-refresh. Objects are served with
  `Cache-Control: public, max-age=300`, so uninvalidated edge/browser copies can
  linger up to 5 minutes.
- **Certificate stuck `PENDING_VALIDATION`**: the ACM validation CNAME in the
  external DNS provider is missing or wrong. Re-read
  `terraform output -json acm_validation_records` and confirm the `name`, `type`,
  and `value` match exactly (watch for a trailing dot or a duplicated zone
  suffix added by the DNS provider). ACM validates only after the CNAME
  resolves.
- **`could not read bucket_name from terraform output`**: run
  `terraform -chdir=site/terraform init` and make sure Phase 1a has been applied;
  `publish-site.sh` reads the bucket and distribution id from the stack outputs.
