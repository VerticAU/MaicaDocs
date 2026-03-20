# =============================================================================
# Root Module — S3 Buckets, IAM, Bedrock Knowledge Base for MaicaDocs
# =============================================================================

module "bedrock" {
  source = "./modules/bedrock"

  name_prefix = local.name_prefix
  common_tags = local.common_tags
  account_id  = data.aws_caller_identity.current.account_id

  raw_bucket_arn              = module.docs.raw_bucket_arn
  bedrock_embedding_model_arn = var.bedrock_embedding_model_arn
  bedrock_kb_description      = var.bedrock_kb_description
}

module "docs" {
  source      = "./modules/docs"
  name_prefix = local.name_prefix
  common_tags = local.common_tags
  account_id  = data.aws_caller_identity.current.account_id

  bedrock_kb_id = module.bedrock.bedrock_kb_id
}
