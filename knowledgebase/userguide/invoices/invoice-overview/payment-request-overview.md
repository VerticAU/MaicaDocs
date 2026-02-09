---
description: Learn about Payment Requests in Maica
---

# Payment Request Overview

## What is a Payment Request Item?&#x20;

A Payment Request is a Related Object to an Invoice Line Item that is dynamically created after a Claim has been made for that particular Line Item. It represents an attempt to make a Claim from PRODA. These records will be dynamically created, regardless of your nominated `Claim Method` (API or BPR File), however, the Claim Method will influence how these Payment Request records are updated with the subsequent claim information, such as Status and Paid Amount. Please refer below for more information.&#x20;

## Payment Request Key Terms and Components

Whilst working with Payment Request(s), you will come across a number of key terms and related components. The table below describes each of those in further detail:&#x20;

<table><thead><tr><th width="187">Key Term </th><th width="146">Type </th><th>Description</th></tr></thead><tbody><tr><td>Payment Request History</td><td>Related Object </td><td>Payment Request History is a record of all actions and changes related to any specific Payment Request, including Change Date &#x26; Times, etc. </td></tr><tr><td>Claimed Amount  </td><td>Field </td><td>This represents the total amount of money submitted to PRODA. </td></tr><tr><td>Claim Date </td><td>Field</td><td>This represents the date the claim was submitted to PRODA. </td></tr><tr><td>Reject Reason</td><td>Field</td><td>If the <code>Payment Request</code> was rejected by PRODA, this field represents the reason (<code>reason code</code>) they provide.</td></tr><tr><td>Paid Amount</td><td>Field </td><td>This represents the total amount of money paid by the PRODA. This could be the full or a partial amount of the Claimed Amount and is populated based on the <code>Claim Method</code>:<br><br><strong>API</strong>: Populated via the Remittance Notification.<br><strong>BPR File</strong>: Populate via the BPR Remittance File import.</td></tr><tr><td>Paid Date</td><td>Field</td><td>This represents the date the <code>Paid Amount</code> was paid by PRODA, and is populated based on the <code>Claim Method</code>: <br><br><strong>API</strong>: Set to the date the Remittance Notification is received.<br><strong>BPR File</strong>: Set to the date the BPR Remittance File import is processed.</td></tr><tr><td>Not Paid Amount </td><td>Field</td><td>This represents the amount not paid by PRODA. Or, the difference in the <code>Claimed Amount</code> and <code>Paid Amount</code>. </td></tr><tr><td>NDIS Reference </td><td>Field</td><td>This represents the reference assigned to the <code>Payment Request</code> once it has been submitted for claiming via the API. This is provided in the response from the API and populated in <strong>Maica</strong>.<br><br>To ensure consistency in the <code>Payment Request</code> records, the <code>NDIS Reference</code> will be populated with the <code>Claim Reference</code> when <code>Claim Method</code> is set to BPR File.</td></tr><tr><td>Claim Reference </td><td>Field</td><td>This represents a formula field that generates a unique reference value that is used to identify the <code>Payment Request</code> when the <code>Claim Method</code> is set to <code>BPR File</code>. </td></tr><tr><td>Claim Reference Index</td><td>Field</td><td>This is a replica of the <code>Claim Reference</code> field but instead is created as a Text (External ID) field to leverage Salesforce indexing and support working with large data volumes.</td></tr><tr><td>Last NDIS Sync </td><td>Field</td><td>This represents the the Date &#x26; Time of the last sync with PRODA. It is only populated when the <code>Claim Method</code> is set to API.</td></tr><tr><td>Error Details</td><td>Field</td><td>This stores the details of any unexpected errors returned in the API submission to PRODA. It is only populated when the <code>Claim Method</code> is set to API.</td></tr></tbody></table>

## Payment Request Statuses?

Whilst working with Payment Request(s), you will notice a `Status Bar` at the top of the page, as shown below. In **Maica**, the `Status` is adjusted dynamically depending on a range of factors and logic that are described below.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-15 at 11.01.58 am.png" alt=""><figcaption></figcaption></figure>

Similar to [Invoice(s)](./), these `Statuses` outline the stage of the lifecycle any particular Payment Request will be in at any particular time. More detail on each `Status` is outlined in the table below:&#x20;

<table><thead><tr><th width="222">Status</th><th width="263">Description </th><th>Logic </th></tr></thead><tbody><tr><td><code>Failed</code> </td><td>The <code>Payment Request</code> has not been successfully submitted for processing to PRODA.</td><td>Set via the API response from PRODA. Not applicable when Claim Method is set to BPR File.</td></tr><tr><td><code>Cancelled</code> </td><td>The Payment Request has been cancelled by a Maica user via the Credit Management QA (at the <code>Invoice</code> level) or the Cancel QA at the (<code>Payment Request</code> level).</td><td>Applies only when the Credit Management Quick Action is used at the <code>Invoice</code> level for API OR the <code>Payment Request</code> has been updated directly using the Cancel Quick Action described below for BPR File Claim Method. </td></tr><tr><td><code>Incomplete</code> </td><td>The <code>Payment Request</code> has been returned from PRODA and it considers details missing. Please review/amend and resubmit using the <strong>Claim</strong> button at the <a href="../invoice-actions/reclaim-an-invoice.md"><code>Invoice</code></a> level.</td><td>Set via the API response from PRODA. Not applicable when <code>Claim Method</code> is set to BPR File.</td></tr><tr><td><code>Awaiting Approval</code> </td><td>The <code>Payment Request</code> has been submitted to PRODA and <strong>Maica</strong> is awaiting a response.</td><td>The <code>Payment Request</code> will be set to this <code>Status</code> following the BPR File export. Not generally applicable when the Claim Method is set to API as the response is in real time. </td></tr><tr><td><code>Open</code></td><td>PACE </td><td></td></tr><tr><td><code>Pending Payment</code> </td><td>The <code>Payment Request</code> has been accepted/approved by PRODA and <strong>Maica</strong> is awaiting payment confirmation.</td><td>When Claim Method is set to BPR File, the <strong>Results</strong> file import will set this Status for all <code>SUCCESSFUL</code> rows in the file. <mark style="background-color:red;">Not generally applicable when the Claim Method is set to API as the response is in real time.</mark> </td></tr><tr><td><code>Rejected</code> </td><td>The <code>Payment Request</code> has been rejected by PRODA.</td><td>When Claim Method is set to BPR File, the <strong>Results</strong> file import will set this Status for all <code>ERROR</code> rows in the file. <mark style="background-color:red;">When Claim Method is set to API, it will set this Status if the Claim is Rejected when the Remittance Notification is received.</mark> </td></tr><tr><td><code>Paid</code></td><td>The Amount (from the <code>Paid Amount</code> field) has been processed by PRODA.</td><td></td></tr></tbody></table>

## Cancel Payment Request Quick Action

{% hint style="info" %}
The Cancel Payment Request Quick Action is only relevant if your Claim Method is set to BPR File. If you Claim Method is set to API, you will need to use the Credit Quick Action. To learn more, click here.&#x20;
{% endhint %}

Not all `Payment Request` records submitted to PRODA through the BPR File Claiming process are successful. You will occasionally receive an error in your BPR Response file that requires you to resolve the issue immediately within PRODA.

In this case, once you've made the appropriate changes in PRODA, you must cancel the existing `Payment Request` in **Maica** to support [Reclaiming](../invoice-actions/reclaim-an-invoice.md). To do so, simply click the `Cancel` Quick Action Button in the `Payment Request` record header located in the top right of your interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/cancel qa.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The `Cancel` Quick Action Button will only be available when the Status is `Awaiting Approval`.&#x20;
{% endhint %}

When you click `Cancel`, you will be shown the modal below. Select the proper `Reject Reason` and enter any `Error Details` in the text box to retain a record in **Maica** of the Error and what was done to rectify it.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-15 at 2.16.24 pm.png" alt=""><figcaption></figcaption></figure>

Once you click **Save**, the `Payment Request` `Status` will be set to `Cancelled` and a new line in the `Payment Request History` will be created to record the change.&#x20;

{% hint style="warning" %}
You should not **Cancel** any `Payment Request` in the `Status` of `Awaiting Approval` if you have **not uploaded** the BPR Results file.
{% endhint %}
