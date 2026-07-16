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

# The CloudFront-only read policy (s3:GetObject to the CloudFront service
# principal, scoped to this distribution's ARN via an AWS:SourceArn condition)
# lives with the distribution in Task 4, because it references the distribution
# ARN which does not exist until that resource is created.
