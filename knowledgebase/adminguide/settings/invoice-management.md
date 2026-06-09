---
description: Learn about Invoice Management Settings in Maica
---

# Invoice Management

{% hint style="info" %}
Please note, The **Subsidy Invoices** and **Out-of-Pocket Invoices** sections share the same Invoice Management Settings. To avoid repetition, the settings are explained once below. Each setting functions the same way in both sections but can be configured independently depending on your invoicing needs.
{% endhint %}

These Settings determine how Maica manages Invoices and their function throughout the application. Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Invoice Period</code></td><td>Defines how often Invoices are grouped and generated in Maica (e.g. weekly, fortnightly, monthly). This determines the Invoice cycle used when calculating Invoice batches.</td></tr><tr><td><code>Invoice Period Anchor Date</code></td><td><p>Specifies the starting reference point for calculating Invoice periods. This date works in combination with the selected <strong>Invoice Period</strong> to determine how invoice batches are grouped.</p><p><br><em>For example, if the Invoice Period is set to “Weekly” and the Anchor Date is 1st January, Maica will generate invoice batches from 1st–7th January, 8th–14th January, and so on.</em></p></td></tr><tr><td><code>Payment Terms (days)</code></td><td>Sets the expected number of days in which payment is due after an invoice is issued. It is used to set the <code>Due Date</code> on the created <code>Invoice</code> records. </td></tr><tr><td><code>Paid Tolerance</code></td><td>Specifies an allowed variance between the claimed amount and the paid amount before the invoice is flagged. For example, a tolerance of 0.1 allows for small rounding or pricing discrepancies without requiring manual intervention.<br><br><em>Note: This only applies to NDIS Claimed Agency Managed Invoices</em></td></tr></tbody></table>
