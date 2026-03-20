variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name used as prefix for resources"
  type        = string
  default     = "maicadocs"
}

# Bedrock Knowledge Base
variable "bedrock_embedding_model_arn" {
  description = "ARN of the Bedrock embedding model for the knowledge base"
  type        = string
  default     = "arn:aws:bedrock:ap-southeast-2::foundation-model/amazon.titan-embed-text-v2:0"
}

variable "bedrock_kb_description" {
  description = "Description for the Bedrock Knowledge Base"
  type        = string
  default     = "Maica documentation knowledge base for AI-powered retrieval"
}
