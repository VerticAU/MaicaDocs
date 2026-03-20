# =============================================================================
# Docs Module
# S3 Buckets (raw + vector), IAM User for GitHub Actions
# =============================================================================

# --- S3: Raw Document Bucket ---

resource "aws_s3_bucket" "raw" {
  bucket = "${var.name_prefix}-raw-${var.account_id}"

  tags = merge(var.common_tags, { Name = "${var.name_prefix}-raw" })
}

resource "aws_s3_bucket_versioning" "raw" {
  bucket = aws_s3_bucket.raw.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "raw" {
  bucket = aws_s3_bucket.raw.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "raw" {
  bucket                  = aws_s3_bucket.raw.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- S3: Vector Bucket (Bedrock Data Source) ---

resource "aws_s3_bucket" "vector" {
  bucket = "${var.name_prefix}-vector-${var.account_id}"

  tags = merge(var.common_tags, { Name = "${var.name_prefix}-vector" })
}

resource "aws_s3_bucket_versioning" "vector" {
  bucket = aws_s3_bucket.vector.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "vector" {
  bucket = aws_s3_bucket.vector.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "vector" {
  bucket                  = aws_s3_bucket.vector.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# --- IAM: GitHub Actions User ---

resource "aws_iam_user" "github_actions" {
  name = "${var.name_prefix}-github-actions"
  tags = var.common_tags
}

resource "aws_iam_access_key" "github_actions" {
  user = aws_iam_user.github_actions.name
}

resource "aws_iam_user_policy" "s3_access" {
  name = "${var.name_prefix}-s3-access"
  user = aws_iam_user.github_actions.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket",
        ]
        Resource = [
          aws_s3_bucket.raw.arn,
          "${aws_s3_bucket.raw.arn}/*",
          aws_s3_bucket.vector.arn,
          "${aws_s3_bucket.vector.arn}/*",
          "arn:aws:s3:::${var.name_prefix}-tfstate",
          "arn:aws:s3:::${var.name_prefix}-tfstate/*",
        ]
      }
    ]
  })
}

resource "aws_iam_user_policy" "bedrock_access" {
  name = "${var.name_prefix}-bedrock-access"
  user = aws_iam_user.github_actions.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock:StartIngestionJob",
          "bedrock:GetIngestionJob",
          "bedrock:ListIngestionJobs",
        ]
        Resource = [
          "arn:aws:bedrock:ap-southeast-2:${var.account_id}:knowledge-base/${var.bedrock_kb_id}",
        ]
      }
    ]
  })
}

# --- IAM: Terraform Management Policy ---
# Uses a managed policy (6144 byte limit) instead of inline (2048 byte limit)

resource "aws_iam_policy" "terraform_management" {
  name = "${var.name_prefix}-terraform-management"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "S3Mgmt"
        Effect   = "Allow"
        Action   = ["s3:Get*", "s3:Put*", "s3:List*", "s3:CreateBucket", "s3:DeleteBucket"]
        Resource = ["arn:aws:s3:::${var.name_prefix}-*"]
      },
      {
        Sid    = "IAMMgmt"
        Effect = "Allow"
        Action = [
          "iam:GetUser", "iam:CreateUser", "iam:DeleteUser", "iam:TagUser",
          "iam:GetUserPolicy", "iam:PutUserPolicy", "iam:DeleteUserPolicy", "iam:ListUserPolicies",
          "iam:ListAccessKeys", "iam:CreateAccessKey", "iam:DeleteAccessKey",
          "iam:GetRole", "iam:CreateRole", "iam:DeleteRole", "iam:TagRole", "iam:PassRole",
          "iam:GetRolePolicy", "iam:PutRolePolicy", "iam:DeleteRolePolicy", "iam:ListRolePolicies",
          "iam:ListAttachedRolePolicies", "iam:ListAttachedUserPolicies", "iam:ListInstanceProfilesForRole",
          "iam:GetPolicy", "iam:CreatePolicy", "iam:DeletePolicy",
          "iam:GetPolicyVersion", "iam:CreatePolicyVersion", "iam:DeletePolicyVersion",
          "iam:ListPolicyVersions", "iam:AttachUserPolicy", "iam:DetachUserPolicy",
        ]
        Resource = [
          "arn:aws:iam::${var.account_id}:user/${var.name_prefix}-*",
          "arn:aws:iam::${var.account_id}:role/${var.name_prefix}-*",
          "arn:aws:iam::${var.account_id}:policy/${var.name_prefix}-*",
        ]
      },
      {
        Sid      = "S3Vectors"
        Effect   = "Allow"
        Action   = ["s3vectors:*"]
        Resource = "*"
      },
      {
        Sid      = "Bedrock"
        Effect   = "Allow"
        Action   = ["bedrock:*KnowledgeBase*", "bedrock:*DataSource*", "bedrock:TagResource", "bedrock:UntagResource", "bedrock:ListTagsForResource"]
        Resource = ["arn:aws:bedrock:ap-southeast-2:${var.account_id}:knowledge-base/*"]
      },
    ]
  })

  tags = var.common_tags
}

resource "aws_iam_user_policy_attachment" "terraform_management" {
  user       = aws_iam_user.github_actions.name
  policy_arn = aws_iam_policy.terraform_management.arn
}
