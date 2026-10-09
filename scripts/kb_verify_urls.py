#!/usr/bin/env python3
"""Read-only check that every knowledge base page carries its url in Bedrock.

For each page under knowledgebase/{userguide,adminguide} this makes one
bedrock-agent-runtime retrieve call against the knowledge base, using the
page title as the query, numberOfResults 10, and a filter that requires the
page's own title and guide metadata keys (andAll of two equals conditions).
Titles can repeat, so it then picks the result whose location S3 URI equals
the page's object, s3://<bucket>/knowledgebase/<space>/<rel>.md, and checks
that result's metadata for the url key. Title and guide are derived exactly
as kb_metadata.py derives them.

A filter on x-amz-bedrock-kb-source-uri does not work on this knowledge
base (it returns no results), which is why the filter uses our own keys.

Requires boto3 and AWS credentials with bedrock:Retrieve:

    pip install boto3
    python scripts/kb_verify_urls.py --bucket <raw bucket name>

Exits 1 if any page returns no matching result or a result without url. A
url that differs from the path-derived URL is reported for information only
(it is expected where GitBook redirects the page).

See docs/superpowers/specs/2026-10-09-kb-page-url-metadata-design.md.
"""

from __future__ import annotations

import argparse
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from kb_metadata import derive_url, guide_for, iter_pages, read_title  # noqa: E402

import boto3  # noqa: E402
from botocore.exceptions import ClientError  # noqa: E402

PAUSE = 0.1
MAX_ATTEMPTS = 5


def retrieve(client, kb_id: str, title: str, guide: str) -> list[dict]:
    for attempt in range(MAX_ATTEMPTS):
        try:
            resp = client.retrieve(
                knowledgeBaseId=kb_id,
                retrievalQuery={"text": title},
                retrievalConfiguration={
                    "vectorSearchConfiguration": {
                        "numberOfResults": 10,
                        "filter": {
                            "andAll": [
                                {"equals": {"key": "title", "value": title}},
                                {"equals": {"key": "guide", "value": guide}},
                            ]
                        },
                    }
                },
            )
            return resp.get("retrievalResults", [])
        except ClientError as err:
            if err.response.get("Error", {}).get("Code") != "ThrottlingException" or attempt == MAX_ATTEMPTS - 1:
                raise
            time.sleep(2 ** attempt)
    return []


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Check Bedrock retrieve results carry each page's url.")
    parser.add_argument("--kb-id", default="A55D5QJ1R6", help="Bedrock knowledge base ID")
    parser.add_argument("--bucket", required=True, help="raw S3 bucket name (no s3:// prefix)")
    parser.add_argument("--region", default="ap-southeast-2", help="AWS region")
    parser.add_argument("--root", default="knowledgebase", help="knowledge base root folder")
    args = parser.parse_args(argv)

    root = Path(args.root)
    pages = list(iter_pages(root))
    if not pages:
        print(f"error: no pages found under {root}", file=sys.stderr)
        return 1

    client = boto3.client("bedrock-agent-runtime", region_name=args.region)
    passed = 0
    no_result: list[str] = []
    missing_url: list[str] = []
    differs: list[str] = []

    for space, rel, path in pages:
        expected = derive_url(space, rel)
        title = read_title(path) or path.stem
        source_uri = f"s3://{args.bucket}/knowledgebase/{space}/{rel}"
        results = retrieve(client, args.kb_id, title, guide_for(space))
        time.sleep(PAUSE)
        label = f"{space}/{rel}"
        match = next(
            (r for r in results if ((r.get("location") or {}).get("s3Location") or {}).get("uri") == source_uri),
            None,
        )
        if match is None:
            no_result.append(label)
            continue
        url = (match.get("metadata") or {}).get("url")
        if not url:
            missing_url.append(label)
            continue
        passed += 1
        if url != expected:
            differs.append(f"{label}: {url} (derived {expected})")

    print(f"pass: {passed}/{len(pages)}")
    for heading, items in (
        ("No matching retrieve result", no_result),
        ("Result without url", missing_url),
        ("Info: url differs from derived URL (expected for redirects)", differs),
    ):
        if items:
            print(f"\n{heading} ({len(items)}):")
            for item in items:
                print(f"  {item}")

    return 1 if no_result or missing_url else 0


if __name__ == "__main__":
    sys.exit(main())
