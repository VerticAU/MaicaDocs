terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "maicadocs-production-tfstate"
    key    = "maicadocs/terraform.tfstate"
    region = "ap-southeast-2"
  }
}

provider "aws" {
  region = var.aws_region
}

