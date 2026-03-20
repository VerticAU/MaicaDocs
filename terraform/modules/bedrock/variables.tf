variable "name_prefix" {
  description = "Name prefix for all resources"
  type        = string
}

variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
}

variable "account_id" {
  description = "AWS account ID"
  type        = string
}

variable "vector_bucket_arn" {
  description = "ARN of the S3 vector bucket"
  type        = string
}

variable "bedrock_embedding_model_arn" {
  description = "ARN of the Bedrock embedding model"
  type        = string
}

variable "bedrock_kb_description" {
  description = "Description for the Bedrock Knowledge Base"
  type        = string
}
