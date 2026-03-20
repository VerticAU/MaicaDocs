variable "name_prefix" {
  description = "Name prefix for all resources"
  type        = string
}

variable "common_tags" {
  description = "Common tags for all resources"
  type        = map(string)
}

variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "account_id" {
  description = "AWS account ID"
  type        = string
}

variable "bedrock_kb_id" {
  description = "Bedrock Knowledge Base ID (for IAM policy)"
  type        = string
}
