---
description: Learn about NDIS Claim Management Settings in Maica
---

# NDIS

These settings determine how Maica manages Claiming and its function throughout the application. You can use the Claim Management settings to manage how `Payment Requests` will be provided to the NDIS for claim processing. For reference:&#x20;

* **API** means Payment Requests will be automatically created and submitted to the NDIS for processing based on the Claim Frequency settings defined below and on the Invoice Entry component.
* **BPR File** means Payment Requests will be automatically created but not submitted to the NDIS for processing. In order to submit the Payment Request, you need to generate the Bulk Payment Request (BPR) File via the [Generate Bulk Payment Request](./#generate-bulk-payment-request-bpr-file) section below. You can then upload this file via the myplace provider portal.
  * These Payment Request records will be created with `Status = BLANK`

{% hint style="success" %}
In addition, and before we dive into configuring your Claim Settings in Maica, please refer to the quick overview of Claim Behaviour between **Claim Management Settings** vs **Invoice Entry Claim**, as this can vary depending on where you are in **Maica** and hence is important to understand. \
\
To learn more, see the expandable dropdown [below](./#claim-management-settings-vs-invoice-entry-claim).&#x20;
{% endhint %}

<details>

<summary><strong>Claim Management Settings</strong> vs <strong>Invoice Entry Claim</strong></summary>

Below describes a quick overview of Claim Behaviour between **Claim Management Settings** vs **Invoice Entry Claim** within **Maica**, as this can vary depending on where you are in **Maica.**

## Claim Management - Maica Settings&#x20;

The **Claim Management** settings in the **Maica Settings** tab define your organisation-wide default Claim Settings. These settings act as the default behaviour applied if no changes are made during Invoice Entry (explained below).&#x20;

## Claim Management - Invoice Entry&#x20;

The **Claim Behaviour** dropdown in the [`Invoice`](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/invoices/invoice-overview) component allows users to define how a specific Invoice should be claimed (as shown below). These settings are applied on an individual basis and affect only the Invoice being entered. Once the Invoice is submitted, the Claim Behaviour selection resets, ready for the next Invoice. If no Claim Behaviour is selected at the Invoice level, the Global Setting behaviour will apply.&#x20;

## Available Claiming Options

If your `Claim Method` is set to `API`, only the following values are available in the Invoice Entry component:

* `Use Claim Settings`
* `Claim Immediately`
* `Do Not Claim`

If your `Claim Method` is set to `BPR File`, only the following `Claim Behaviour` values are available in the Invoice Entry component:

* `Claim via BPR File` (default)
* `Do Not Claim`

</details>

Please refer to the below headings for more information on each setting:&#x20;

## Claim Method

The Claim Method Setting not only allows you to select the Method of Claiming, but also, the Claim Behaviour.&#x20;

Firstly, for your Claim Method, you can select between **API** or **BPR File** (as explained above).&#x20;

{% hint style="warning" %}
It is important that you **do not toggle** from `BPR File` to `API` with an open, or unfinished, claiming cycle. If you have generated `Payment Request` records with the `Claim Method` = `BPR`, these cannot be claimed via the API.
{% endhint %}

Then, you can select your Claim Behaviour from the following options:&#x20;

{% hint style="info" %}
A **Claim Behaviour** in Maica determines how Payment Requests are managed, created, and submitted to the NDIS for processing. It allows you to control the way claims are handled based on your organisation's workflow requirements.
{% endhint %}

<table data-full-width="false"><thead><tr><th>Claim Behaviour </th><th width="395">Description </th><th>Claim Method </th></tr></thead><tbody><tr><td><code>Use Claim Settings</code></td><td>The default option that uses the Claim Frequency settings configured in <strong>Maica</strong>. Claims will be created and submitted based on these predefined rules.<br><br>To learn more Claim Frequency, see below. </td><td>API</td></tr><tr><td><code>Claim Immediately</code></td><td><code>Payment Requests</code> are created and submitted to the NDIS as soon as they are generated</td><td>API</td></tr><tr><td><code>Do Not Claim</code></td><td>Prevents a <code>Payment Request</code> from being submitted for claiming.</td><td>API, BPR</td></tr><tr><td><code>Claim via BPR File</code></td><td><code>Payment Requests</code> are generated and included in a <a href="./#generating-a-bulk-payment-request-bpr-file"><strong>Bulk Payment Request (BPR) File</strong></a>, which can be manually uploaded to the myplace provider portal for processing.</td><td>BPR</td></tr><tr><td><code>Claim via HCP File</code></td><td><code>Payment Requests</code> are generated and included in an <strong>HCP (Home Care Package) File</strong>, suitable for claims processed under the HCP framework.</td><td></td></tr></tbody></table>

## Generate Bulk Payment Request (BPR) File&#x20;

With Maica, you can generate a **Bulk Payment Request (BPR) File** and upload it directly to the **myplace Provider Portal**.

The BPR file allows you to submit multiple payment requests in a single upload, saving time compared to submitting individual requests for each Service Booking or Participant.

Once the Bulk Payment Request file is generated in Maica:

1. Log in to the **myplace Provider Portal**.
2. Navigate to the **Bulk Payment Request Upload** section.
3. Upload the file generated by Maica.

Maica ensures the file is fully compliant with the NDIS template, so you can confidently upload it without any manual adjustments.

Before you generate and use a Bulk Payment Request (BPR) File, it's important to understand the BPR process and its steps. The process consists of **three sequential steps** that must be completed in the order shown. These steps are outlined in the expandable box below.&#x20;

<details>

<summary>Overview of the Bulk Payment Request (BPR) Process</summary>

#### **Step 1:** [**Bulk Payment Request (BPR) File**](./#ggenerating-a-bulk-payment-request-bpr-file)

The **Request File** is the initial file generated in Maica (from Salesforce) that contains the Payment Request data you intend to submit to PRODA for processing. The [below text](./#generating-a-bulk-payment-request-bpr-file) details how to generate the Request File within Maica.&#x20;

***

#### **Step 2: Bulk Payment Request Results (BPR) File**

The **Results File** is downloaded from PRODA after uploading your Request File (Step 1). It contains the outcome (Success/Fail) for each Payment Request included in your submission.

**Note**: While the BPR Results File includes payment information, Maica does not use this file to update payment request statuses. Instead, the **Remittance File** (Step 3) is used for that purpose.

***

#### **Step 3: Bulk Payment Request Remittance (BPR) File**

The **Remittance File** is downloaded from PRODA and contains the final payment results for each Payment Request included in your original upload (Step 1).

</details>

Now that you have an overview of the BPR process, continue to the section below to learn how to generate the **Bulk Payment Request (BPR) File** from Maica and Salesforce.

### **Generating a Bulk Payment Request (BPR) File**

So, once you're in the **Claim Management** section of Maica Settings, generating the Bulk Payment Request (BPR) File is just a few clicks away.

<figure><img src="../../../.gitbook/assets/image (20).png" alt=""><figcaption><p>Generate Bulk Payment Request in Maica Settings</p></figcaption></figure>

{% hint style="info" %}
Before you click **Generate CSV** button shown above, you’ll need to complete a one-time setup to enter your `Registration Number`. This is the number listed as your `Organisation ID` in your Provider Portal Profile. Input your `Registration Number` in the `Registration Number` field shown above.&#x20;
{% endhint %}

Once done, apply the relevant filters:

1. **Date Range**
   * Note, the Date Range filter uses the **Invoice Created Date**. Maica will search for all Invoice records added to Salesforce within the **Start Date** and **End Date** specified.
2. **Payment Request Status**
   * You can filter by the following Payment Request Status values:
     * `Blank`
     * `Failed`
     * `Incomplete`
     * `Cancelled`
     * `Rejected`

{% hint style="info" %}
We recommend always including the `Blank` value. This ensures all records within the selected Date Range that have not been included in a previous BPR file are captured.\
The other values (`Failed`, `Incomplete`, `Cancelled`, `Rejected`) allow you to retry or reclaim previously unsuccessful Payment Requests.
{% endhint %}

Then, use the **Exclude** option to specify Providers or Invoices you do not want included in the BPR File. Any items listed here will be excluded from the CSV file generated. The **Exclude** Section is shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-12-17 at 12.02.02 pm.png" alt=""><figcaption></figcaption></figure>

Once your filters are applied:

1. Maica will display a count of all **Payment Request** records that match your criteria.
2. Review the total displayed to confirm it meets your expectations.
3. Click **Generate CSV**, and Maica will handle the rest!

#### **What Happens Next?**

During the file generation process, Maica performs a series of important updates. For more information, refer to the [**Post BPR File Generation**](./#post-bpr-file-generation) section below.

{% hint style="warning" %}
Please note, the myplace Provider Portal only supports up to **5000** rows in an uploaded BPR File, meaning, if your filter criteria returns a result set containing more than 5000 rows, **Maica** will present the error below and not allow you to complete the process.\
\
The following error will be displayed:&#x20;

`The results of the date range and status criteria selected exceeds 5000 records. Please adjust your criteria to refine the results.`
{% endhint %}

### BPR File Query Summary&#x20;

How Does Maica Determine What to Include in the BPR File? **Maica** determines which Payment Request records to include in the BPR file based on the following criteria:

1. **Payment Request Status**
   * Only records matching the value(s) selected in the **Status Filter** will be included.
2. **Invoice Created Date**
   * Records with an **Invoice Created Date** that falls within the **Start Date** and **End Date** specified in the filters will be included.

For a more technical user:&#x20;

```apex
SELECT Id FROM maica_cc__Payment_Request__c
WHERE DAY_ONLY(maica_cc__Invoice_Line_Item__r.maica_cc__Invoice__r.CreatedDate) >= :startDate
AND DAY_ONLY(maica_cc__Invoice_Line_Item__r.maica_cc__Invoice__r.CreatedDate) <= :endDate
AND maica_cc__Status__c IN :selectedStatuses
```

For more details on applying these filters, see the section [above](./#generating-a-bulk-payment-request-bpr-file).

### Post BPR File Generation

Once the Bulk Payment Request (BPR) File has been generated, Maica performs specific actions to complete this first step in the BPR Claiming process. These actions are outlined below:

#### New Payment Request Created (Reclaimed Payment Requests)&#x20;

When generating the BPR File, if the `Status` Filter included a value other than `Blank`, this indicates that a previous claim attempt has already been made—either through a BPR File or the API. In this case, a new `Payment Request` record is required to facilitate the new claim.

This is because PRODA requires each `Payment Request` to have a **unique Claim Reference**. A `Payment Request` can only be used once, so to attempt the claim again (a “reclaim”), Maica creates a new `Payment Request` record.

**Here’s what happens:**

* The previously attempted `Payment Request` record is **cloned**, and a new `Payment Request` record is created.
* The `Status` of the new record will be updated to `Awaiting Approval`, regardless of the previous status.
* The `Status` of the original (cloned) `Payment Request` record is updated to `Resubmitted` to reflect that it has been included in a new BPR File.

{% hint style="info" %}
The `Resubmitted` Status value is **only used** when the **Claim Method = BPR File**.
{% endhint %}

#### Payment Request Updates - Field Updates&#x20;

After the Bulk Payment Request (BPR) File is exported, **Maica** updates specific fields on the `Payment Request` records included in the file.

| Payment Request Field  | Value                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `Status`               | `Awaiting Approval` ([detail below](./#payment-request-updates-status))                  |
| `Claimed Amount`       | `Invoice Line Item`.`Claim Balance`                                                      |
| `Claim Date`           | `TODAY`                                                                                  |
| `NDIS Reference`       | `Claim Reference Index` ([detail below](./#payment-request-update-claim-reference-inde)) |

#### Payment Request Updates - Status

To ensure that the `Payment Request` reflects its inclusion in the BPR File, **Maica** updates the Status of the `Payment Request` record(s) to `Awaiting Approval`.

{% hint style="info" %}
The next update to the `Payment Request` Status will occur when the **BPR Results File** is imported.
{% endhint %}

#### Payment Request Update Claim Reference Index

As part of the BPR File export, **Maica** ensures consistency across fields by setting the `NDIS Reference` field to match the `Claim Reference Index` field.

This ensures that the `NDIS Reference` field is populated consistently, whether you are claiming via the API or the BPR File.

{% hint style="info" %}
When claiming via the API, the `Claim Reference` is not used, as the NDIS does not require this value. Instead, PRODA returns an `API Reference`, which **Maica** populates in the `NDIS Reference` field.
{% endhint %}

### **BPR File Template Definition**

| Template Field Name     | Information                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RegistrationNumber`    | The Provider's registration number as entered in Maica Settings                                                                                                                                                                                                                                                                                                           |
| `NDISNumber`            | Participant's `NDIS Number` on the `Contact`                                                                                                                                                                                                                                                                                                                              |
| `SupportsDeliveredFrom` | `Service Date` on the `Invoice Line Item`                                                                                                                                                                                                                                                                                                                                 |
| `SupportsDeliveredTo`   | `Service Date` on the `Invoice Line Item`                                                                                                                                                                                                                                                                                                                                 |
| `SupportNumber`         | `Support Item Number` of the `Product` provided on the `Invoice Line Item`                                                                                                                                                                                                                                                                                                |
| `ClaimReference`        | `Claim Reference` on the `Invoice Line Item`                                                                                                                                                                                                                                                                                                                              |
| `Quantity`              | <p><code>Quantity</code> on the <code>Invoice Line Item</code><br><br>See note below for additional details.</p>                                                                                                                                                                                                                                                          |
| `Hours`                 | Since `Quantity` is entered, this field is not required.                                                                                                                                                                                                                                                                                                                  |
| `UnitPrice`             | `Unit Price` on the `Invoice Line Item`                                                                                                                                                                                                                                                                                                                                   |
| `GSTCode`               | <p><code>GST Code</code> on the <code>Invoice Line Item</code><br><br>GST as applicable to the item or service. <br><code>P1</code> = Tax Claimable (10%) <br><code>P2</code> = GST Free <br><code>P5</code> = GST out of Scope</p>                                                                                                                                       |
| `AuthorisedBy`          | Legacy field, can be left blank                                                                                                                                                                                                                                                                                                                                           |
| `ParticipantApproved`   | Legacy field, can be left blank                                                                                                                                                                                                                                                                                                                                           |
| `InKindFundingProgram`  | Not Applicable                                                                                                                                                                                                                                                                                                                                                            |
| `ClaimType`             | <p><code>Claim Type</code> on the <code>Invoice Line Item</code><br><br>Claim type of the service provided <br>- “(<code>Blank</code>)” – Direct Service. You must leave field blank. <br>- <code>CANC</code>: Cancellation <br>- <code>REPW</code>: NDIA Required Report <br>- <code>TRAN</code>: Provider Travel <br>- <code>NF2F</code>: Non-Face-to Face Services</p> |
| `CancellationReason`    | <p><code>Cancellation Reason</code> on the <code>Invoice Line Item</code><br><br>Reason of the cancellation type <br>- <code>NSDH</code>: No show due to health reasons <br>- <code>NSDF</code>: No show due to family issues <br>- <code>NSDT</code>: No show due to unavailability of transport <br>- <code>NSDO</code>: Other</p>                                      |

#### Quantity Logic&#x20;

In a reclaim scenario (e.g., an additional claiming attempt), the `Quantity` value populated in the BPR File may differ from the initial claiming attempt. The logic is summarised below:

***

**When the following condition is met:**

* `Payment Request`**.**`Claimed Amount` > `Invoice Line Item`**.**`Unit Price`

Maica sets:

* `BPR Quantity` = `Claimed Amount` ÷ `Unit Price`
* `BPR UnitPrice` = `Unit Price`

***

**Otherwise, Maica sets:**

* `BPR Quantity` = 1
* `BPR UnitPrice` = `Claimed Amount`

{% hint style="info" %}
This ensures that the **UnitPrice** does not exceed the Price Book price, as this would result in rejection by PRODA.
{% endhint %}

#### Sample BPR File&#x20;

Below shows a sample BPR File that has been generated.&#x20;

<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
For further assistance with processing bulk requests in the myplace Provider Portal once you have the BPR File, refer to [this page](https://www.ndis.gov.au/providers/working-provider/getting-paid/bulk-payments) or watch this [video tutorial](https://www.youtube.com/watch?v=c7Bu_c10VLY) by the NDIS.
{% endhint %}

