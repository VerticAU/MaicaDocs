variable "aws_region" {
  description = "Primary AWS region for the docs-site bucket and CloudFront origin."
  type        = string
  default     = "ap-southeast-2"
}

variable "enable_custom_domain" {
  description = "When true, REQUEST an ACM certificate for the custom domain (created in us-east-1) and populate the acm_validation_records output. This does NOT attach anything to the distribution, so the first apply succeeds even though the cert is still PENDING_VALIDATION. Leave false for the first apply so the site comes up on the CloudFront default *.cloudfront.net URL with no DNS. Set attach_custom_domain=true only after the cert is ISSUED."
  type        = bool
  default     = false
}

variable "attach_custom_domain" {
  description = "When true, ATTACH the ACM certificate and the domain alias to the CloudFront distribution. Requires enable_custom_domain=true (the cert must have been requested) AND that cert to be ISSUED, because CloudFront rejects a non-ISSUED certificate. Keep false until you have added the validation CNAME to external DNS and ACM reports ISSUED. When false, the distribution serves on the CloudFront default *.cloudfront.net certificate with no alias, regardless of whether the cert exists."
  type        = bool
  default     = false
}

variable "domain_name" {
  description = "Custom docs domain (for example docs.maica.io). Only used when enable_custom_domain = true. DNS is managed externally to AWS."
  type        = string
  default     = ""
}

variable "allow_indexing" {
  description = "When true, allow search engines to index the site (no X-Robots-Tag noindex header). Keep false while serving on the CloudFront default URL."
  type        = bool
  default     = false
}
