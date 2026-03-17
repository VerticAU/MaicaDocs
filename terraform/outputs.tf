output "s3_raw_bucket" {
  description = "S3 bucket name for raw document storage"
  value       = module.docs.raw_bucket_id
}

output "s3_vector_bucket" {
  description = "S3 bucket name for vector/Bedrock data source"
  value       = module.docs.vector_bucket_id
}

output "iam_access_key_id" {
  description = "IAM access key ID for GitHub Actions"
  value       = module.docs.iam_access_key_id
  sensitive   = true
}

output "iam_secret_access_key" {
  description = "IAM secret access key for GitHub Actions"
  value       = module.docs.iam_secret_access_key
  sensitive   = true
}

output "bedrock_kb_id" {
  description = "Bedrock Knowledge Base ID"
  value       = module.docs.bedrock_kb_id
}

output "bedrock_ds_id" {
  description = "Bedrock Data Source ID"
  value       = module.docs.bedrock_ds_id
}

output "github_secrets_setup" {
  description = "GitHub secrets to configure"
  value       = <<-EOT
    Add these secrets to GitHub repo Settings > Secrets and variables > Actions:
    1. AWS_ACCESS_KEY_ID     = (run: terraform output -raw iam_access_key_id)
    2. AWS_SECRET_ACCESS_KEY = (run: terraform output -raw iam_secret_access_key)
    3. AWS_REGION            = ${var.aws_region}
    4. S3_RAW_BUCKET         = ${module.docs.raw_bucket_id}
    5. S3_VECTOR_BUCKET      = ${module.docs.vector_bucket_id}
    6. BEDROCK_KB_ID         = ${module.docs.bedrock_kb_id}
    7. BEDROCK_DS_ID         = ${module.docs.bedrock_ds_id}
  EOT
}
