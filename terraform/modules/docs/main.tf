# =============================================================================
# Docs Module
# S3 Buckets (raw + vector), IAM User, Bedrock Knowledge Base
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
          "arn:aws:bedrock:${var.aws_region}:${var.account_id}:knowledge-base/${aws_bedrockagent_knowledge_base.docs.id}",
        ]
      }
    ]
  })
}

# --- IAM: Bedrock Knowledge Base Role ---

resource "aws_iam_role" "bedrock_kb" {
  name = "${var.name_prefix}-bedrock-kb"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "bedrock.amazonaws.com" }
      Action    = "sts:AssumeRole"
      Condition = {
        StringEquals = {
          "aws:SourceAccount" = var.account_id
        }
      }
    }]
  })

  tags = var.common_tags
}

resource "aws_iam_role_policy" "bedrock_kb_s3" {
  name = "${var.name_prefix}-bedrock-kb-s3"
  role = aws_iam_role.bedrock_kb.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket",
        ]
        Resource = [
          aws_s3_bucket.vector.arn,
          "${aws_s3_bucket.vector.arn}/*",
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "bedrock_kb_model" {
  name = "${var.name_prefix}-bedrock-kb-model"
  role = aws_iam_role.bedrock_kb.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock:InvokeModel",
        ]
        Resource = [
          var.bedrock_embedding_model_arn,
        ]
      }
    ]
  })
}

# --- Bedrock Knowledge Base ---

resource "aws_bedrockagent_knowledge_base" "docs" {
  name        = "${var.name_prefix}-kb"
  description = var.bedrock_kb_description
  role_arn    = aws_iam_role.bedrock_kb.arn

  knowledge_base_configuration {
    type = "VECTOR"
    vector_knowledge_base_configuration {
      embedding_model_arn = var.bedrock_embedding_model_arn
    }
  }

  storage_configuration {
    type = "OPENSEARCH_SERVERLESS"
    opensearch_serverless_configuration {
      collection_arn    = aws_opensearchserverless_collection.docs.arn
      vector_index_name = "bedrock-knowledge-base-default-index"
      field_mapping {
        vector_field   = "bedrock-knowledge-base-default-vector"
        text_field     = "AMAZON_BEDROCK_TEXT_CHUNK"
        metadata_field = "AMAZON_BEDROCK_METADATA"
      }
    }
  }

  tags = var.common_tags
}

resource "aws_bedrockagent_data_source" "s3" {
  name                 = "${var.name_prefix}-s3-source"
  knowledge_base_id    = aws_bedrockagent_knowledge_base.docs.id
  data_deletion_policy = "RETAIN"

  data_source_configuration {
    type = "S3"
    s3_configuration {
      bucket_arn              = aws_s3_bucket.vector.arn
      inclusion_prefixes      = ["knowledgebase/"]
    }
  }
}

# --- OpenSearch Serverless (Vector Store for Bedrock KB) ---

resource "aws_opensearchserverless_security_policy" "encryption" {
  name = "${var.name_prefix}-enc"
  type = "encryption"

  policy = jsonencode({
    Rules = [{
      ResourceType = "collection"
      Resource     = ["collection/${var.name_prefix}-vectors"]
    }]
    AWSOwnedKey = true
  })
}

resource "aws_opensearchserverless_security_policy" "network" {
  name = "${var.name_prefix}-net"
  type = "network"

  policy = jsonencode([{
    Rules = [{
      ResourceType = "collection"
      Resource     = ["collection/${var.name_prefix}-vectors"]
    }, {
      ResourceType = "dashboard"
      Resource     = ["collection/${var.name_prefix}-vectors"]
    }]
    AllowFromPublic = true
  }])
}

resource "aws_opensearchserverless_access_policy" "data" {
  name = "${var.name_prefix}-data"
  type = "data"

  policy = jsonencode([{
    Rules = [{
      ResourceType = "index"
      Resource     = ["index/${var.name_prefix}-vectors/*"]
      Permission = [
        "aoss:CreateIndex",
        "aoss:DeleteIndex",
        "aoss:UpdateIndex",
        "aoss:DescribeIndex",
        "aoss:ReadDocument",
        "aoss:WriteDocument",
      ]
    }, {
      ResourceType = "collection"
      Resource     = ["collection/${var.name_prefix}-vectors"]
      Permission = [
        "aoss:CreateCollectionItems",
        "aoss:DeleteCollectionItems",
        "aoss:UpdateCollectionItems",
        "aoss:DescribeCollectionItems",
      ]
    }]
    Principal = [
      aws_iam_role.bedrock_kb.arn,
      "arn:aws:iam::${var.account_id}:root",
    ]
  }])
}

resource "aws_opensearchserverless_collection" "docs" {
  name = "${var.name_prefix}-vectors"
  type = "VECTORSEARCH"

  tags = var.common_tags

  depends_on = [
    aws_opensearchserverless_security_policy.encryption,
    aws_opensearchserverless_security_policy.network,
    aws_opensearchserverless_access_policy.data,
  ]
}

# --- IAM: Bedrock KB OpenSearch access ---

resource "aws_iam_role_policy" "bedrock_kb_aoss" {
  name = "${var.name_prefix}-bedrock-kb-aoss"
  role = aws_iam_role.bedrock_kb.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "aoss:APIAccessAll",
        ]
        Resource = [
          aws_opensearchserverless_collection.docs.arn,
        ]
      }
    ]
  })
}
