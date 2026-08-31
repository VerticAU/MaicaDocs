terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # Reuses the existing MaicaDocs state bucket with a DISTINCT key so this
  # docs-site stack is independent of, and separately destroyable from, the
  # existing raw-md -> S3 -> Bedrock stack (key maicadocs/terraform.tfstate).
  backend "s3" {
    bucket = "maicadocs-production-tfstate"
    key    = "maicadocs/docs-site.tfstate"
    region = "ap-southeast-2"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = local.common_tags
  }
}

# CloudFront viewer certificates must live in us-east-1, regardless of where the
# bucket and distribution config live. Used only when enable_custom_domain=true.
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"

  default_tags {
    tags = local.common_tags
  }
}
