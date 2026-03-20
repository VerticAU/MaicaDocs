# =============================================================================
# Bedrock Module (us-east-1)
# Knowledge Base with S3 Vectors storage
# =============================================================================

# --- S3 Vectors: Vector Bucket (must be same region as KB) ---

resource "aws_s3vectors_vector_bucket" "docs" {
  vector_bucket_name = "${var.name_prefix}-vectors"

  tags = var.common_tags
}

resource "aws_s3vectors_index" "docs" {
  index_name         = "${var.name_prefix}-kb-index"
  vector_bucket_name = aws_s3vectors_vector_bucket.docs.vector_bucket_name
  dimension          = 1024
  data_type          = "float32"
  distance_metric    = "cosine"

  tags = var.common_tags
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
          var.vector_bucket_arn,
          "${var.vector_bucket_arn}/*",
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3vectors:CreateIndex",
          "s3vectors:DeleteIndex",
          "s3vectors:GetIndex",
          "s3vectors:ListIndexes",
          "s3vectors:PutVectors",
          "s3vectors:GetVectors",
          "s3vectors:DeleteVectors",
          "s3vectors:QueryVectors",
        ]
        Resource = [
          aws_s3vectors_vector_bucket.docs.vector_bucket_arn,
          "${aws_s3vectors_vector_bucket.docs.vector_bucket_arn}/*",
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

# --- Bedrock Knowledge Base (S3 Vector Store) ---

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
    type = "S3_VECTORS"
    s3_vectors_configuration {
      index_arn = aws_s3vectors_index.docs.index_arn
    }
  }

  tags = var.common_tags

  depends_on = [aws_s3vectors_index.docs]
}

resource "aws_bedrockagent_data_source" "s3" {
  name                 = "${var.name_prefix}-s3-source"
  knowledge_base_id    = aws_bedrockagent_knowledge_base.docs.id
  data_deletion_policy = "RETAIN"

  data_source_configuration {
    type = "S3"
    s3_configuration {
      bucket_arn         = var.vector_bucket_arn
      inclusion_prefixes = ["knowledgebase/"]
    }
  }
}
