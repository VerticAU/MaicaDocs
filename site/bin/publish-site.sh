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
