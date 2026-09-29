# CloudFront certificates must be issued in us-east-1. DNS validation records are
# emitted as an output (see acm_validation_records in outputs.tf) for manual
# entry into the externally-managed DNS zone. We deliberately do NOT create an
# aws_acm_certificate_validation resource, because that would block
# `terraform apply` waiting on DNS records we do not control.
resource "aws_acm_certificate" "docs" {
  count    = var.enable_custom_domain ? 1 : 0
  provider = aws.us_east_1

  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}
