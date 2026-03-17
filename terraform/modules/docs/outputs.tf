output "raw_bucket_id" {
  description = "Raw S3 bucket name"
  value       = aws_s3_bucket.raw.id
}

output "vector_bucket_id" {
  description = "Vector S3 bucket name"
  value       = aws_s3_bucket.vector.id
}

output "iam_access_key_id" {
  description = "IAM access key ID for GitHub Actions"
  value       = aws_iam_access_key.github_actions.id
  sensitive   = true
}

output "iam_secret_access_key" {
  description = "IAM secret access key for GitHub Actions"
  value       = aws_iam_access_key.github_actions.secret
  sensitive   = true
}

output "bedrock_kb_id" {
  description = "Bedrock Knowledge Base ID"
  value       = aws_bedrockagent_knowledge_base.docs.id
}

output "bedrock_ds_id" {
  description = "Bedrock Data Source ID"
  value       = aws_bedrockagent_data_source.s3.data_source_id
}

output "opensearch_collection_arn" {
  description = "OpenSearch Serverless collection ARN"
  value       = aws_opensearchserverless_collection.docs.arn
}
