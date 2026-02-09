---
description: >-
  Learn how to Claim via the NDIS when your Funding Type is Agency Managed in
  Maica
---

# Claim an Invoice

{% hint style="info" %}
Please note that this page is a work in progress. The current information about Claiming an Invoice is accurate, but additional content will be added as it is documented. Please check back regularly for updates. If you have any questions or need assistance, feel free to contact our support team [here](https://www.maica.com.au/contact-us).
{% endhint %}

## How does Claiming an Invoice via the NDIS work on Maica?

&#x20;There are two ways to claim an Invoice in **Maica**. These are:

1. [API](claim-an-invoice.md#claiming-an-invoice-via-the-api): Submitting claims directly to the NDIS through an automated, real-time system integrated with the myplace portal using secure authentication.
2. [BPR File](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management#generate-bulk-payment-request-bpr-file): Uploading a bulk file of claims to the myplace portal for batch processing, with results manually reviewed from a response file.

In **Maica**, you can select your Claim Method in the Claim Management Settings. Your Claim Method is usually set by your Organisations Administrator.&#x20;

{% hint style="info" %}
To learn more about selecting your Claim Method, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management).&#x20;
{% endhint %}

{% hint style="info" %}
Note, claiming **only** applies when the `Funding Type` is `Agency Managed`.&#x20;
{% endhint %}

This article details the process of claiming via the API.&#x20;

{% hint style="info" %}
To learn how claiming works within Maica if your Claim Method is BPR File, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management#generate-bulk-payment-request-bpr-file).&#x20;
{% endhint %}

## Claiming an Invoice via the API

**Maica** has `Automation` for NDIS Claiming, meaning as a User, minimal manual input is required. However, the below information details what happens within **Maica's** Automation if your Claim Method is set to API.&#x20;

**Maica's** claiming behaviour is dependant on not only your Claim Method Setting, but also your Claim Behaviour Setting.&#x20;

{% hint style="info" %}
To learn more about the different Claim Behaviour Settings, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management).&#x20;
{% endhint %}

In this article, we will use a Claim Behaviour of `Claim Immediately` in order to detail the API process. Regardless of your Claim Behaviour, the actual claiming process will be identical to the process detailed below. This is because **Maica** dynamically updates the Claim Behaviour to `Claim Immediately` in order to trigger the the callout. For example, if your Claim Behaviour was set to `Do Not Claim`, meaning you need to use the manual [Claim Quick Action](reclaim-an-invoice.md), then when used, the Claim Behaviour will be set to Claim Immediately in that moment to run the process outlined below.&#x20;

Please also note, this section only talks to the Claim process, the Remittance process is further detailed below. The diagram and information below details the process.&#x20;

{% hint style="info" %}
For clarity, any _Italic_ text in the description or diagrams refers to an NDIS record, and any standard text refers to a record in **Maica**.&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/API_Update PR Fixed.png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="207">Stage</th><th>Description </th></tr></thead><tbody><tr><td><ol><li>Claim Executed </li></ol></td><td>First, the Invoice Claim Behaviour (<code>maica_cc__Claim_Behaviour__c</code>) is set to <strong>Claim Immediately</strong> and a callout is made to the NDIS <code>Payments</code> API.</td></tr><tr><td><ol start="2"><li>Retrieve Payment Requests</li></ol></td><td>Then, Maica retrieves the relevant <code>Payment Request</code> records (field definition <a href="claim-an-invoice.md#payment-request-callout-api-mapping-table">below</a>) associated with the <code>Invoice Line Items</code> and sends this to the NDIS to create corresponding records.<br><br>Note, when the claiming process is fully automated (via API), all valid <code>Payment Request</code> records are claimed.</td></tr><tr><td><ol start="3"><li>Create <em>Payment Request</em></li></ol></td><td>The <code>Payment Request</code> is created via the API</td></tr><tr><td><ol start="4"><li>Was the <em>Request</em> Successful?  </li></ol></td><td><p>The logic splits based on whether the <code>Payment Request</code> was successfully created in the NDIS system.  </p><p></p><p>Please note, this step does not determine whether your Claim has been successfully assessed for payment, but rather indicates the <code>Payment Request</code> record has been successfully created in the NDIS system</p></td></tr><tr><td><ol start="5"><li>Update Payment Request (if No)</li></ol></td><td><p>When No, there are two potential outcomes:</p><ol><li><strong>Technical Issue</strong>: If the <code>Payment Request</code> record was not successfully saved in the NDIS system, Maica will update the status of the unsuccessful <code>Payment Request</code> to Failed</li><li><strong>Claim Issue</strong>: The <code>Payment Request</code> was assessed and the claim rejected by the NDIS. An example of this is insufficient budget. In this case, the <code>Rejection Reason</code>  provided by the NDIS is returned to the <code>Reject Reason</code> pick list on the <code>Payment Request</code> for your review</li></ol></td></tr><tr><td><ol start="6"><li>Update Payment Request (if Yes) </li></ol></td><td>The claim is assessed and approved for processing and key <code>Payment Request</code> fields are updated as per the table <a href="claim-an-invoice.md#payment-request-response-api-mapping-table">below</a></td></tr><tr><td><ol start="7"><li>Process Ends</li></ol></td><td>The claiming process is now complete, and you can wait for the <strong>Remittance update</strong> to be applied. <br><br>Note, the Remittance update occurs when the corresponding <strong>Notification (Webhook)</strong> is triggered by PRODA. The timing of this notification is determined by PRODA, and Maica does not control when it is received. To learn more about the Remittance Notificaiton, see below. </td></tr></tbody></table>

### Payment Request Callout API Mapping Table

The table below outlines how fields in the **NDIS Payments API** are mapped to the corresponding fields in **Maica's** `Payment Request` object. It shows how data flows between **Maica** and the **NDIS API** during `Payment Request` submissions.

Please note, some fields involve **direct mappings** (e.g., `claimed_amount` → `Claimed_Amount__c`), while others involve **calculated values** (e.g., `quantity` → `Claimed_Amount__c / Invoice_Line_Item__r.Unit_Price__c`).

| NDIS Payments API       | Payment Request object                                                            |
| ----------------------- | --------------------------------------------------------------------------------- |
| `ref_doc_no`            | `Name`                                                                            |
| `service_agreement`     | `Invoice_Line_Item__r`.`Booking_Item__r`.`Service_Booking__r`.`NDIS_Reference__c` |
| `product_category_item` | `Invoice_Line_Item__r`.`Support_Item__r`.`Support_Item_Number__c`                 |
| `participant`           | `Invoice_Line_Item__r`.`Invoice__r`.`Participant__r`.`NDIS_Number__c`             |
| `claimed_amount`        | `Claimed_Amount__c`                                                               |
| `quantity`              | Calculated: `Claimed_Amount__c` / `Invoice_Line_Item__r`.`Unit_Price__c`          |
| `tax_code`              | `Invoice_Line_Item__r`.`GST_Code__c`                                              |
| `claim_type`            | `Invoice_Line_Item__r`.`Claim_Type__c`                                            |
| `claim_reason`          | `Invoice_Line_Item__r`.`Cancellation_Reason__c`                                   |
| `start_date`            | `Invoice_Line_Item__r`.`Service_Date__c`                                          |
| `end_date`              | `Invoice_Line_Item__r`.`Service_Date__c`                                          |
| `unit_of_measure`       | Fixed value: 'EA'                                                                 |
| `abn_provider`          | `Invoice_Line_Item__r`.`Invoice__r`.`Provider__r`.`ABN__c`                        |
| `abn_not_available`     | **true** if `Invoice_Line_Item__r`.`Invoice__r`.`Provider__r`.`ABN__c` = NULL     |

### Payment Request Response API Mapping Table

This table outlines the **response mapping** between the **NDIS Payments API** and **Maica's** `Payment Request` object. It shows how key fields returned by the NDIS API are mapped to the corresponding fields in Maica.

| NDIS Payments API | Payment Request object                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `claim_number`    | `NDIS_Reference__c`                                                                                                                                                                                                                                                                                                                                                               |
| `claimed_amount`  | `Claimed_Amount__c`                                                                                                                                                                                                                                                                                                                                                               |
| `claim_status`    | <p>The Status value is mapped directly from the NDIS, and could be any of the following: </p><ul><li><code>Failed</code></li><li><code>Resubmitted</code> (BPR Only)</li><li><code>Incomplete</code></li><li><code>Awaiting Approval</code></li><li><code>Pending Payment</code></li><li><code>Cancelled</code></li><li><code>Rejected</code></li><li><code>Paid</code></li></ul> |

