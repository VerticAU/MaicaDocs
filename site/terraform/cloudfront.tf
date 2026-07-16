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
