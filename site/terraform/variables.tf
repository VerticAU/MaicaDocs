variable "aws_region" {
  description = "Primary AWS region for the docs-site bucket and CloudFront origin."
  type        = string
  default     = "ap-southeast-2"
}

variable "enable_custom_domain" {
  description = "When true, request an ACM certificate and attach the custom domain as a CloudFront alias. Leave false for the first apply so the site comes up on the CloudFront default *.cloudfront.net URL with no DNS."
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
