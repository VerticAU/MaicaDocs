---
description: Learn about Invoices within Maica
---

# Invoice Overview

## What is an Invoice?&#x20;

An Invoice in **Maica** represents the financial component following an instance of Service Delivery. It is comprised of [Invoice Line Items](invoice-line-item-overview.md), one for each delivered Service across a billing period which dictates how long an Invoice is `open` for before being finalised. It also houses [Payment Request](payment-request-overview.md) records.&#x20;

## Invoice Key Terms and Components

Whilst working with Invoice(s) and any associated [Invoice Actions](../invoice-actions/), you will come across a number of key terms and related components. The table below describes each of those in further detail:&#x20;

<table><thead><tr><th width="187">Key Term </th><th width="146">Type </th><th>Description</th></tr></thead><tbody><tr><td><a href="invoice-line-item-overview.md">Invoice Line Item </a></td><td>Related Object </td><td>An Invoice Line Item is a specific entry on an Invoice that details a particular service provided, including its Quantity, Amount, Support Category, etc. </td></tr><tr><td>Payment</td><td>Related Object </td><td>A Payment represents the financial transaction used to process the Invoice Amount.</td></tr><tr><td>Invoice History </td><td>Related Object </td><td>Invoice History is a record of all actions and changes related to any specific invoice, including Change Date &#x26; Times, etc. </td></tr><tr><td>Claim Behaviour </td><td>Field </td><td>A <strong>Claim Behaviour</strong> in Maica determines how Payment Requests are managed, created, and submitted to the NDIS for processing based on your selected <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management">Settings</a>. It allows you to control the way claims are handled based on your organisation's workflow requirements.</td></tr><tr><td>Funding Type </td><td>Field </td><td>Funding Type refers to the specific method by which Care and Support Services are financed, determining how funds are managed and payments are processed for the services received. </td></tr></tbody></table>

{% hint style="info" %}
Please note, setting the Claim Behaviour on an individual Invoice will override the Global Setting for Claim Behaviour within your Maica instance. If no Claim Behaviour is set on the Invoice level, the Global Setting will be applied. To learn more, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management).&#x20;
{% endhint %}

## Invoice Statuses

Whilst working with Invoice(s), you will notice a `Status Bar` at the top of the page, as shown below. The default stage for an Invoice is `Entered`.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-15 at 10.11.52 am.png" alt=""><figcaption></figcaption></figure>

These `Statuses` outline the stage of the lifecycle any particular Invoice will be in at any particular time. Using **Maica**, the `Status` is adjusted dynamically depending on a range of factors and logic that are described below, and explained in further detail [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/invoice#invoice-status-management).&#x20;

{% hint style="info" %}
The `Partially Paid` and `Fully Paid` status logic can differ based on whether the `Funding Structure` = `Agency Managed` or **not**. The logic that sets the described statues from both scenarios is explained below.&#x20;
{% endhint %}

<table><thead><tr><th width="188">Status</th><th width="209">Description </th><th>Logic</th></tr></thead><tbody><tr><td><code>Entered</code> </td><td>The invoice has been created and recorded in the system but no payment actions have been taken yet.</td><td></td></tr><tr><td><code>Cancelled</code> </td><td>The invoice has been manually cancelled and will not be processed for payment.</td><td><code>Cancelled</code> = <code>TRUE</code></td></tr></tbody></table>

When the `Funding Structure` **equals** `Agency Managed`, the  `Partially Paid` status is set by the following logic:

<table><thead><tr><th width="191">Status</th><th width="207">Description </th><th>Logic</th></tr></thead><tbody><tr><td><code>Partially Paid</code> </td><td>The <code>Amount</code> from the associated <code>Invoice Line Item</code> record(s) has been partially claimed. There is a <code>Claim Balance</code> remaining.</td><td><code>Total Line Items</code> > 0 AND <br><code>Total Claimed Amount</code> &#x3C; <code>Total Amount</code> AND<br><code>Total Claimed Amount</code> > 0 AND<br><code>Claim Balance Formula</code> > <code>Paid Tolerance</code></td></tr></tbody></table>

When the `Funding Structure` **does not** **equal** `Agency Managed`, the  `Partially Paid` status is set by the following logic:

<table><thead><tr><th width="191">Status</th><th width="207">Description </th><th>Logic</th></tr></thead><tbody><tr><td><code>Partially Paid</code> </td><td>A portion of the invoice amount has been paid, but there is still an outstanding balance. The Payment Amount less than Total Amount. </td><td><code>Total Payment Amount</code> > 0 AND <br><code>Total Payment Amount</code> &#x3C; <code>Total Amount</code></td></tr></tbody></table>

When the `Funding Structure` **equals** `Agency Managed`, the  `Fully Paid` status is set by the following logic:

For the `Fully Paid` status, please refer to the following Condition Logic:

{% code title="Condition Logic" %}
```apex
(1 AND 2 AND (3 OR 4))
```
{% endcode %}

{% hint style="info" %}
This logic checks if conditions 1 and 2 are both true, and then it evaluates whether either condition 3 or condition 4 is true. For the overall condition to be true, both 1 and 2 must be true, and in addition, either 3 or 4 must also be true.
{% endhint %}

<table><thead><tr><th width="191">Status</th><th width="207">Description </th><th>Logic</th></tr></thead><tbody><tr><td><code>Fully Paid</code> </td><td>The <code>Amount</code> from the associated <code>Invoice Line Item</code> record(s) has been fully claimed. There is zero <code>Claim Balance</code> remaining.</td><td><ol><li><code>Funding Structure</code> = <code>Agency Managed</code> </li><li><code>Total Line Items</code> > 0 </li><li><code>Total Claimed Amount</code> >= <code>Total Amount</code></li><li><code>Claim Balance Formula</code> &#x3C;= <code>Paid Tolerance</code></li></ol></td></tr></tbody></table>

When the `Funding Structure` **does not** **equal** `Agency Managed`, the  `Fully Paid` status is set by the following logic:

<table><thead><tr><th width="191">Status</th><th width="207">Description </th><th>Logic</th></tr></thead><tbody><tr><td><code>Fully Paid</code> </td><td>The <code>Amount</code> from the associated <code>Invoice Line Item</code> record(s) has been fully claimed. There is zero <code>Claim Balance</code> remaining.</td><td><p></p><p><code>Total Line Items</code> > 0 AND</p><p><code>Total Payment Amount</code> >= <code>Total Amount</code></p></td></tr></tbody></table>

## Claim Behaviour Options&#x20;

A **Claim Behaviour** in Maica determines how Payment Requests are managed, created, and submitted to the NDIS for processing. It allows you to control the way claims are handled based on your organisation's workflow requirements.

{% hint style="success" %}
The options in this section apply **only to NDIS (Agency Managed)** invoices, where the **Funding Structure = Agency Managed**. For Support at Home claims, see the **Claim Status (Support at Home)** section below.
{% endhint %}

{% hint style="info" %}
Please note, the below descriptions talk to the available Claim Behaviour options at an Invoice Entry Level, to learn about setting a Claim Behaviour on a Global level, please refer to the [Claim Management Settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management).&#x20;
{% endhint %}

Below is a explanation of the available Claim Behaviour options and how they impact the claiming process.

<table><thead><tr><th>Claim Behaviour </th><th width="253">Description </th><th>Payment Request Created?</th></tr></thead><tbody><tr><td><code>Use Claim Settings</code></td><td>Applies the default <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management">Claim Settings</a> configured by your organisation. These settings define how and when claims are processed for all Invoices unless overridden at the point of entry.</td><td><strong>Yes</strong> ✅</td></tr><tr><td><code>Claim Immediately</code></td><td>Automatically processes the claim with PRODA as soon as the Invoice is saved. A <code>Payment Request</code> is generated for each Invoice Line Item, submitted to PRODA, and updated with the result (e.g., Success/Fail) in near real-time.</td><td><strong>Yes</strong> ✅</td></tr><tr><td><code>Claim via BPR File</code></td><td>Prepares <code>Payment Requests</code> for inclusion in a <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management/ndis/handle-bpr-results-and-remittance-files"><strong>Bulk Payment Request (BPR) File</strong></a>. These records are saved with a <strong>Blank</strong> status and can be manually uploaded to the myplace provider portal for processing.</td><td><strong>Yes</strong> ✅</td></tr><tr><td><code>Do Not Claim</code></td><td>Creates the Invoice in Maica but does not generate a <code>Payment Request</code>. Useful for historical records or for Invoices meant to be sent to Plan Managers or Participants outside of the NDIS claiming process.</td><td><strong>No</strong> ❌</td></tr></tbody></table>

{% hint style="info" %}
When the **Do Not Claim** option is selected, the Invoice will not be included in the BPR File or submitted via the API, even if related `Payment Request` records exist. The **Claim Behaviour** can be updated to **Claim Immediately** for API-based processing, or manually uploaded for BPR File processing
{% endhint %}

## Claim Status (Support at Home)

When the **Funding Structure = Support at Home**, the claiming process and invoice statuses differ from the NDIS (Agency Managed) workflow. Instead of Claim Behaviours, Support at Home relies on **Claim Statuses** returned from **Services Australia** to indicate where each Invoice stands in the claiming lifecycle.

The table below outlines all possible statuses for Support at Home invoices.

| Status                | Description                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **OPEN**              | Invoice items can only be edited while the Invoice is in _OPEN_ status. The Invoice must be submitted before it can be claimed.                                                |
| **SUBMITTED**         | Invoice has been successfully submitted to Services Australia and is ready for claim processing.                                                                               |
| **HELD**              | Invoice is held internally by Services Australia pending approval. No action is required by the provider.                                                                      |
| **CLAIMED**           | Invoice has been claimed and the claim is currently being processed.                                                                                                           |
| **COMPLETED**         | Invoice has been finalised and payment has been confirmed as completed.                                                                                                        |
| **DELETED**           | Invoice has been deleted and excluded from all claiming workflows.                                                                                                             |
| **SUBMISSION FAILED** | The Invoice submission was unsuccessful due to a validation or transmission error. These invoices can be included in a future Claim Batch by selecting _Include Failed Items_. |

The **Claim Status** field is located in the _Additional Claim Information_ section of the Invoice record.

{% hint style="info" %}
This field is automatically updated by Maica based on claim responses received from Services Australia.
{% endhint %}

You can view failed or partially processed claims via the [**Claim Batch**](../../support-at-home/claiming-overview/claiming-process.md#id-1.-generate-claim-batch-and-payment-requests) record, which links all related Invoices and their current statuses.
