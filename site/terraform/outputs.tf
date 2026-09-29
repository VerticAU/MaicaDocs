output "bucket_name" {
  description = "S3 bucket holding the rendered docs site. Consumed by bin/publish-site.sh."
  value       = aws_s3_bucket.docs.bucket
}

output "cloudfront_domain_name" {
  description = "The distribution's *.cloudfront.net hostname. Browse https://<this> to verify the site before any DNS is configured."
  value       = aws_cloudfront_distribution.docs.domain_name
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID. Used by bin/publish-site.sh to issue cache invalidations."
  value       = aws_cloudfront_distribution.docs.id
}

output "acm_validation_records" {
  description = "DNS CNAME records to add to the external DNS zone to validate the ACM certificate. Empty until enable_custom_domain = true."
  value = var.enable_custom_domain ? [
    for o in aws_acm_certificate.docs[0].domain_validation_options : {
      name  = o.resource_record_name
      type  = o.resource_record_type
      value = o.resource_record_value
    }
  ] : []
}
