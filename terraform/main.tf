# =============================================================================
# Root Module — S3 Buckets, IAM, Bedrock Knowledge Base for MaicaDocs
# =============================================================================

module "docs" {
  source      = "./modules/docs"
  name_prefix = local.name_prefix
  common_tags = local.common_tags
  aws_region  = var.aws_region
  account_id  = data.aws_caller_identity.current.account_id

  bedrock_embedding_model_arn = var.bedrock_embedding_model_arn
  bedrock_kb_description      = var.bedrock_kb_description
}
