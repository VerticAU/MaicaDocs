output "raw_bucket_id" {
  description = "Raw S3 bucket name"
  value       = aws_s3_bucket.raw.id
}

output "vector_bucket_id" {
  description = "Vector S3 bucket name"
  value       = aws_s3_bucket.vector.id
}

output "vector_bucket_arn" {
  description = "Vector S3 bucket ARN"
  value       = aws_s3_bucket.vector.arn
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
