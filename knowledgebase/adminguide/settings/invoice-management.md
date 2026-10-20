---
description: Learn about Invoice Management Settings in Maica
---

# Invoice Management

{% hint style="info" %}
Please note, The **Subsidy Invoices** and **Out-of-Pocket Invoices** sections share the same Invoice Management Settings. To avoid repetition, the settings are explained once below. Each setting functions the same way in both sections but can be configured independently depending on your invoicing needs.
{% endhint %}

These Settings determine how Maica manages Invoices and their function throughout the application. Please refer to the below table for more information on each setting:

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Invoice Period</code></td><td>Defines how often Invoices are grouped and generated in Maica (e.g. weekly, fortnightly, monthly). This determines the Invoice cycle used when calculating Invoice batches.</td></tr><tr><td><code>Invoice Period Anchor Date</code></td><td><p>Specifies the starting reference point for calculating Invoice periods. This date works in combination with the selected <strong>Invoice Period</strong> to determine how invoice batches are grouped.</p><p><br><em>For example, if the Invoice Period is set to “Weekly” and the Anchor Date is 1st January, Maica will generate invoice batches from 1st–7th January, 8th–14th January, and so on.</em></p></td></tr><tr><td><code>Due Date Period (days)</code></td><td><p>Sets the number of days after an Invoice is created that it falls due. Maica uses it to set the <code>Due Date</code> on each newly created <code>Invoice</code>. It takes whole days of zero or more.</p><p><br>Where this setting is blank, a new Invoice falls due on the day it is created. An existing Invoice that Maica reuses keeps its <code>Due Date</code>.</p></td></tr><tr><td><code>Payment Terms</code></td><td>A free-text field of up to 255 characters for recording your organisation's payment terms statement, for example <em>Net 30 days from invoice date</em>. This is a record only. Maica does not read it to set the <code>Due Date</code>; use <code>Due Date Period (days)</code> for that.</td></tr><tr><td><code>Paid Tolerance</code></td><td>Specifies an allowed variance between the claimed amount and the paid amount before the invoice is flagged. For example, a tolerance of 0.1 allows for small rounding or pricing discrepancies without requiring manual intervention.<br><br><em>Note: This only applies to NDIS Claimed Agency Managed Invoices</em></td></tr></tbody></table>

{% hint style="info" %}
`Due Date Period (days)` is stored separately on each tab. The value on the **Subsidy Invoices** tab applies to subsidy Invoices, and the value on the **Out-of-Pocket Invoices** tab applies to out-of-pocket Invoices.
{% endhint %}

{% hint style="warning" %}
A new installation starts with a `Due Date Period (days)` of 30. An organisation whose Invoice Settings were created before this setting existed may hold a blank value, which makes new Invoices fall due on the day they are created. Check both tabs after upgrading to V2.29.
{% endhint %}
