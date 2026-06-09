---
description: >-
  Learn how to manually handle Payment Requests via the BPR Results and
  Remittance files
---

# Handle BPR Results & Remittance Files

In the previous [article](../#generate-bulk-payment-request-bpr-file), we covered how to generate and download the **Bulk Payment Request (BPR) File**.

This article outlines the next two steps in the process:

* **Importing the Bulk Payment Request Results File**
* **Importing the Bulk Payment Request Remittance File**

## Bulk Payment Request Result File&#x20;

Once the BPR File has been downloaded from **Maica** and uploaded to the **myplace Provider Portal** for processing, PRODA generates a corresponding **Results File**. This file contains key status details for all `Payment Request` records (rows) included in your BPR File.

{% hint style="info" %}
From our experience, the Bulk Payment Results File is generally available for download within **20 to 30 minutes** after upload.
{% endhint %}

The Results File contains the `Status` returned by PRODA for each `Payment Request` (row) uploaded in the initial BPR File. The two possible Status values are:

* `SUCCESSFUL`
* `ERROR`

{% hint style="info" %}
For records with an `ERROR`, a **Rejection Reason** is provided to explain the issue.
{% endhint %}

In addition, the Results File includes:

* The **Paid Total Amount**.
* Whether a **Capped Price** has been applied by the Agency.

### Importing the Results file via Maica

Once you’ve downloaded the **Bulk Payment Request Results File**, the next step is to import it back into **Maica**. This process updates the `Status` of each `Payment Request` record included in the initial BPR File, aligning it with the **PRODA Status** contained in the Results File.

To do so, you will need to:

1. Click on the **App Launcher** in **Maica**.
2. Search for **Data Import**.

As shown below.&#x20;

<figure><img src="../../../.gitbook/assets/image (5).png" alt="" width="375"><figcaption></figcaption></figure>

Next, using the Upload Files feature, select the **Results File** you wish to import into Maica. Next, click on the **Flow Setting** dropdown and select **NDIS Bulk Payment Request Results File**. You can see an example of this below.

<figure><img src="../../../.gitbook/assets/Screenshot 2024-12-17 at 3.19.58 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
To learn more about the Data Import Utility in **Maica**, click [here](../../../data/data-import-utility/).&#x20;
{% endhint %}

**Lastly**, click the **Import** button to process each row in the **Results File**. This will update the corresponding `Payment Request` records by matching them to the unique **Claim Reference Index** (`maica__Claim_Reference_Index__c`) generated.

{% hint style="info" %}
The `Claim Reference Index` is a copy of the **Claim Reference** (Formula) field, optimised for high data volume processing as it is indexed by Maica.
{% endhint %}

### BPR Results File - Field Mapping&#x20;

For each `Payment Request` record in Salesforce, the **Results** import will update the `Status` as per the following:

<table><thead><tr><th width="221">Results File Column</th><th>SF Payment Request Field</th><th>Mapping Notes</th></tr></thead><tbody><tr><td><code>Claim Reference</code></td><td><code>Claim Reference Index</code></td><td>Used to retrieve the Payment Request record.  No update</td></tr><tr><td><code>Payment Request Status</code></td><td><code>Status</code></td><td>IF <code>SUCCESSFUL</code> = <code>Pending Payment</code><br><br>IF <code>ERROR</code> = <code>Rejected</code></td></tr><tr><td><code>Error Message</code></td><td><code>Error Details</code></td><td>Mapped to this field as the <code>Reject Reason</code> picklist is used for API error.</td></tr></tbody></table>

{% hint style="info" %}
All other columns in the BPR Results file are **skipped** as part of the Salesforce import
{% endhint %}

## Bulk Payment Remittance Result File

The final step in the **Bulk Payment Request Claiming process** is to upload the **Remittance File** when it is received from the NDIA.

This process follows the same steps as described for the [Results File](handle-bpr-results-and-remittance-files.md#importing-the-results-file-via-maica) (see above). However, in this case, you’ll need to:

1. Upload the received **Remittance File**.
2. Select the **NDIS Remittance Advice Import** Flow Setting, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-12-17 at 3.36.56 pm.png" alt=""><figcaption></figcaption></figure>

The **Total Amount** paid by the NDIA for the `Payment Request`, along with the date the funds were deposited into your organisation's nominated account, will be updated in the **Paid Amount** and **Paid Date** fields, respectively.

### BPR Remittance File - Field Mapping

The **Remittance File** updates `Payment Request` records in Salesforce slightly differently compared to the **Results File**. Only records with a `Status` of `Pending Payment` will be updated.&#x20;

Essentially, the Remittance File contains details of **successful Payment Request** records only.

{% hint style="info" %}
Any **Payment Request** records with a `Rejected` status (as set by the Results File import) **will not** be updated by the Remittance import.
{% endhint %}

For each `Payment Request` record in Salesforce, the **Remittance** import will update the following:

| Remittance File Column | Payment Request Field   | Payment Request Field                                   |
| ---------------------- | ----------------------- | ------------------------------------------------------- |
| `ProvClaimRef`         | `Claim Reference Index` | Used to retrieve the Payment Request record.  No update |
| `AmountPaid`           | `Paid Amount`           |                                                         |
| No column mapping      | `Status`                | `Paid`                                                  |
| No column mapping      | `Paid Date`             | Set to `TODAY`                                          |
