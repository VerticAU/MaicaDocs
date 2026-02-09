---
description: Learn about the Invoice Actions within Maica
---

# Invoice Actions

## What are the Invoice Actions?&#x20;

Invoice actions refer to actions and tasks related to managing and handling your [Invoice](../../getting-started/maica-key-concepts/invoice.md). There are several actions you can take within an [Invoice](../../getting-started/maica-key-concepts/invoice.md) in Maica, including the following:&#x20;

<table><thead><tr><th width="196">Action</th><th>Description </th></tr></thead><tbody><tr><td><a href="process-an-invoice.md">Process</a> </td><td>This allows you to process payment for a given Invoice, provided Maica's integration with Stripe has been enabled.</td></tr><tr><td><a href="claim-an-invoice.md">Claim</a> </td><td>This claims the Invoice amount via your configured NDIS claim method.</td></tr><tr><td><a href="reclaim-an-invoice.md">Reclaim</a></td><td>Reclaiming a <code>Failed</code> or <code>Rejected</code> Invoice manually via the Claim Quick Action</td></tr><tr><td><a href="cancel-an-invoice.md">Cancel</a> </td><td>This cancels the Invoice which will exclude it from being claimed.</td></tr><tr><td><a href="credit-an-invoice.md">Credit</a></td><td>This allows you to process a credit back to the NDIS via your configured claim method in cases where Invoices have been incorrectly overpaid.</td></tr><tr><td><a href="sync-with-xero.md">Sync with Xero </a></td><td>This synchronises the Invoice with the Xero financial system as well as receives any payments that are recorded in Xero against any given Invoice.</td></tr></tbody></table>

## Which Action applies to which Funding Type?&#x20;

The table below provides a summary of Invoice Actions and the applicable Funding Type(s).

<table data-full-width="false"><thead><tr><th width="115">Function</th><th data-type="checkbox">Agency Managed</th><th data-type="checkbox">Plan Managed</th><th data-type="checkbox">Self Managed</th><th data-type="checkbox">Self Funded</th><th data-type="checkbox">HCP</th></tr></thead><tbody><tr><td>Claim</td><td>true</td><td>false</td><td>false</td><td>false</td><td>false</td></tr><tr><td>Process Invoice</td><td>false</td><td>false</td><td>true</td><td>true</td><td>false</td></tr><tr><td>Email Invoice</td><td>false</td><td>true</td><td>true</td><td>true</td><td>false</td></tr><tr><td>Credit</td><td>true</td><td>false</td><td>false</td><td>false</td><td>false</td></tr><tr><td>Cancel</td><td>false</td><td>true</td><td>true</td><td>true</td><td>false</td></tr><tr><td>Sync with Xero</td><td>true</td><td>true</td><td>true</td><td>true</td><td>false</td></tr></tbody></table>

To dive deeper into each Action, please visit the specific pages for detailed information on every Action.&#x20;
