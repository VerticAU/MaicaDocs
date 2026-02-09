---
description: Learn about the Claiming Process under Support at Home within Maica
---

# Claiming Process



The **Claiming Process** in Maica enables you to submit Support at Home claims directly to **Services Australia**, retrieve real-time updates on their status, and automatically reconcile your invoice records.

This article provides a step-by-step walkthrough of each stage in the claiming workflow — continue reading below to learn more.

{% hint style="success" %}
Note: This process is **linear** and should be followed in order. Each step builds on the one before.
{% endhint %}

## Claiming Process

### 1. Generate Claim Batch and Payment Requests

The first step in the claiming process is to generate a **Support at Home Claim Batch**. This batch is created based on a set of filter criteria you define — such as a service date range, service provider, and funding type — and is used to group the **Invoice Line Items** you intend to claim. As part of this process, **Payment Request** records are also created automatically.

Start by selecting the **Generate Claim Batch** quick action. This will open a modal window where you can configure the parameters for your batch, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/claim batch qa.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
In order to launch the Generate Claim Batch Action, first head to the App Launch and search for Claim Batches. Click New and create one with the desired dates.&#x20;
{% endhint %}

You’ll be prompted to complete the following fields:

* **Start Date** and **End Date**\
  Use these fields to define the service period for which you want to generate claims.
* **Service Provider**\
  Select one or more service providers. This field supports multiple selections and behaves like a lookup. _This is an optional field._&#x20;
* **Funding Type**\
  Choose the appropriate funding type from the picklist, which in this case is **Support at Home**.&#x20;
*   **Include Failed Items**&#x20;

    This is an optional checkbox that allows you to include previously failed Invoices in the current Claim Batch. When enabled, Maica automatically retrieves any Invoices within the defined date range where the Claim Status equals **Submission Failed**. These Invoices are added alongside new eligible records, allowing previously failed items to be resubmitted once their issues have been resolved.
* **Service Provider ID**\
  This selection determines **which invoices are eligible** for inclusion in the batch. When generating a Claim Batch for **Support at Home**, claims are created under a specific **Service Provider ID**. This ensures invoices are grouped and submitted in the correct provider context. Only invoices where the related Participant (Contact) is associated with the same **Service Provider ID** are retrieved.

{% hint style="info" %}
These filters allow you to limit the batch to specific invoice line items based on provider, funding structure, and service date.
{% endhint %}

Once you confirm your selections, hit Generate Claim, and Maica will retrieve all **Invoice Line Item** records that match the criteria.

For each record:

* A **Payment Request** is generated and linked to the line item.
* Both the line item and payment request are linked to the newly created **Claim Batch** via a lookup. The selected Service Provider ID is also stored on the Claim Batch record and is used for audit, reporting, and downstream processing.
* This completes the initial population of the batch.

{% hint style="success" %}
At this step, you can also see all generated Payment Request records as part of the Claim Batch in an auto generated Report linked in the modal.&#x20;
{% endhint %}

{% hint style="info" %}
You can re-run the **Generate Claim Batch** action at any point before submission to refresh the records or include additional items.
{% endhint %}

{% hint style="info" %}
Only **Invoice Line Items** where the related **Invoice Claim Status** is set to `Open` or `Submission Failed` (if selected) will be considered for inclusion in the batch. For more information on the Invoice Line Item Filtering Logic or Payment Request Field mapping, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#invoice-line-item-filtering-logic).
{% endhint %}

***

### 2. Upload Invoices and Invoice Line Items to Services Australia

Once the **Claim Batch** is populated, the next step is to upload all associated **Invoice** and **Invoice Line Item** records to Services Australia for processing. This step officially submits the claim.

To begin, click the **Submit Claim** button via the Quick Action on the Claim Batch.

A confirmation message will appear to notify you that this action is final.

{% hint style="info" %}
Note, Submitting a claim initiates the official claiming process and updates the **Claim Status** field on all associated Invoices to **Submitted**.
{% endhint %}

Once an Invoice is marked as **Submitted**:

* It can no longer be modified
* It cannot be included in future claiming cycles
* Maica will stop adding any new Invoice Line Items to the Invoice

<details>

<summary>What Maica does behind the scenes? </summary>

Behind the scenes, Maica uses the **Invoices API** to post the claim data to Services Australia in the correct format.

Using the grouped Invoice Line Items from the batch:

1. **Invoices are submitted first**:
   * A new **Invoice** is posted via the API.
   * Services Australia returns a unique **Invoice ID**.
   * This ID is saved to the `Aged Care Invoice ID` field.
   * Maica then updates the Invoice with:
     * `Invoice Claim Status` = `SUBMITTED`
     * `Invoice Closure Date` = _Yesterday_
2. **Invoice Line Items are submitted next**:
   * Each line item is posted using the newly returned Services Australia Invoice ID as its parent.
   * On success, each line item receives a **Services Australia Invoice Item ID**, which is stored on the record.

{% hint style="info" %}
The Services Australia data model aligns directly with Maica’s:

* The **Invoice** object in Services Australia maps to Maica’s **Invoice**.
* The **Invoice Item** (child) object maps to **Invoice Line Item** in Maica
{% endhint %}

Once done,&#x20;

* Invoice records are successfully submitted to Services Australia and marked as submitted in Maica.
* Related Invoice Line Items are also posted and linked to their parent Invoices using the returned IDs.

{% hint style="info" %}
To learn more, and see the Record Updates, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#record-updates-in-maica).&#x20;
{% endhint %}

</details>

When submitting a Claim Batch, Maica applies strict validation rules to ensure only **eligible Invoice Line Items** are included in the submission.

**Excluded / Cancelled / Voided Line Items**

* Invoice Line Items marked as **Excluded** are **automatically ignored** during the Claim Batch submission process.&#x20;
* Excluded Line Items:
  * Are not uploaded to Services Australia
  * Are not included in the Claim Batch totals
  * Do not contribute to the submitted claim amount

{% hint style="info" %}
If an Invoice Line Item is marked as _Excluded after_ it has already been added to a Claim Batch, it will not be retroactively removed from that batch. Exclusions are applied at the time the Claim Batch is generated.
{% endhint %}

Once validation is complete:

* All eligible Invoices and Invoice Line Items are submitted to Services Australia
* The Claim Status on successfully submitted Invoices is updated to **Submitted**
* The confirmation modal updates to indicate the Claim has been submitted

If **any Invoices fail to submit**, the confirmation modal will display:

* The number of Invoices successfully submitted
* The number of Invoices excluded due to errors

Selecting **Confirm** proceeds with submitting valid Invoices while excluding those that failed.

{% hint style="success" %}
Validation exists to control when Invoices and Invoice Line Items can be modified based on `Claim Status`. Invoices are now editable **only** when the `Claim Status` is **Open** or **Submission Failed**.

**Key behaviours:**

* Invoice Line Items can only be added or re-related when the `Invoice` `Claim Status` is **Open** or **Submission Failed**.
* Once an Invoice moves to **Submitted, Held, Deleted, Claimed, or Completed**, its financial structure is locked.
* Invoice totals (line item count and total amount) cannot be changed in locked statuses.
* Non-financial updates to existing Invoice Line Items (such as Descriptions) remain permitted.

**Why this matters:**

This ensures financial accuracy and claim integrity by preventing submitted or processed Invoices from being altered, while still allowing correction and rework when a submission fails. It reduces the risk of accidental claim discrepancies and supports a controlled, auditable claiming lifecycle.
{% endhint %}

{% hint style="warning" %}
If an Invoice fails to submit successfully:

* Maica captures the detailed response returned by Services Australia
* The affected **Invoice Line Items** and corresponding error messages are recorded
* These details are stored in the **Claim Submission Error Details** field on the parent Invoice

This allows users to:

* Understand exactly why an Invoice failed
* Correct the issue (for example, data or eligibility problems)
* Include the Invoice in a future Claim Batch once resolved
{% endhint %}

<figure><img src="../../.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

{% hint style="success" %}
It is important to note that Maica processes all eligible Invoices in the Claim Batch individually during submission. If any Invoices encounter an error, the batch continues to process the remaining records successfully.

\
This ensures partial submissions still complete, allowing successful claims to proceed while any failed items can be reviewed and corrected later.
{% endhint %}

{% hint style="info" %}
Maica also records the **Original Claim Date** the first time an Invoice is included in a Support at Home Claim Batch. This field preserves the original submission timestamp for traceability and does not update on subsequent claim attempts.
{% endhint %}

***

### 3. Submit Claim Record to Services Australia

Once invoices and line items have been submitted, the final part of the submission process is to post the **Claim Record** to Services Australia. This Claim acts as the container for the batch and links together all associated invoice data.

{% hint style="info" %}
No additional user interaction is required. This step is triggered automatically as part of the **Submit Claim** quick action completed in [Step 2](claiming-process.md#id-2.-upload-invoices-and-invoice-line-items-to-services-australia).
{% endhint %}

Using the Claim API, Maica performs the following actions automatically:

**Creates a Claim Record**

* A Claim Record is created in Services Australia.
* The system maps required values from the **Claim Batch** and **Maica Settings**.
* The payload is submitted to Services Australia.

**Receives the Claim ID**

* Once submitted, Services Australia returns a **Claim ID**.
* This Claim ID is stored on the **Claim Batch** record for visibility and future tracking.

**Links Invoices**

* An array of **Invoice IDs** is uploaded and associated with the Claim.
* These IDs must match the invoices that were successfully submitted in Step 2.

To see the Claim API Mapping, click here.

Once complete, the Claim Record is created in Services Australia, linked to the submitted invoices, and the returned Claim ID is stored in Maica for ongoing status updates.

{% hint style="info" %}
To see the Claim API Mapping, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#claim-api-mapping-post).&#x20;
{% endhint %}

As part of the Claim submission process, Maica updates all related **Payment Requests** to reflect the outcome of the submission.

**Claim Date**

* When a Claim Batch is submitted:
  * All related **Payment Requests** have their **Claim Date** populated with the date the submission occurred.
  * This provides clear visibility of when each request was sent to Services Australia.

**Payment Request Status**

Each Payment Request is updated based on the result of the submission:

* **Successfully submitted**
  * Status is set to **Awaiting Approval**
  * Indicates the request has been accepted by Services Australia and is pending assessment.
* **Submission failed or rejected**
  * Status is set to **Failed**
  * Indicates an issue occurred during submission (for example, validation or Services Australia response errors).

This ensures users can clearly distinguish between successful and failed requests directly from the **Claim Batch** and take action where required.

Once complete, the Claim Record is created in Services Australia, linked to the submitted invoices, and the returned Claim ID is stored in Maica for ongoing status updates. Additionally, a **Claim Batch Summary** is shown, this further detailed in the expandable section below.&#x20;

<details>

<summary>Claim Batch Summary</summary>

Once a **Claim Batch has been submitted**, Maica provides a clear summary of both the **submitted claim details** and the **claim results** directly on the Claim Batch record.

This final step allows you to confirm what was submitted, track processing progress, and review the outcome of the claim without needing to navigate away from the Claim Batch.

### When the Claim Batch Summary Is Available

The Claim Batch Summary is available once the Claim Batch moves beyond the initial setup stage and is no longer in a _New_ or _Cancelled_ status.

It is displayed when the Claim Batch is in one of the following states:

* `Submitted`
* `Being Calculated`
* `Pending Approval`
* `Approved`
* `Completed`

### Batch Summary

The **Batch Summary** section provides a high-level view of what was included in the Claim Batch at the point of submission.

This section shows:

* **Start Date** and **End Date** of the Claim Batch
* **Total Claim Amount** submitted
* **Number of Invoice Line Items** included in the batch

These values reflect the data used when the Claim Batch was generated and submitted.

### Claim Results Summary

After submission, Maica progressively updates the **Claim Results Summary** as the claim is processed.

This section shows:

* **Total Claimed Amount**
* **Total Unclaimed Amount**
* **Number of Invoice Line Items successfully claimed**
* **Number of Invoice Line Items unsuccessfully claimed**

#### While Processing Is Underway

If the Claim Batch is still being processed (for example, in _Submitted_ or _Being Calculated_ status):

* Result values are displayed as **0.00**
* A message indicates that results will be available once processing is complete

Once processing finishes, the summary updates automatically to reflect the final outcome.

### Reviewing Payment Requests

From the Claim Batch Summary, users can access all **Payment Request records** generated as part of the Claim Batch.

This provides a direct transition from the batch-level overview into record-level detail, allowing users to:

* Review individual Payment Requests
* Confirm submission and payment status
* Investigate any unclaimed items if required

{% hint style="info" %}
If a user does not have access to a specific field, the value is displayed as **—**
{% endhint %}

</details>

***

### 4. Check Claim Status

After submitting a Claim Batch to Services Australia, you can check on its progress to see whether it’s been approved or completed.

Here, you can selects the **Check Claim Status** quick action available on the Claim Batch record, as shown below. On click, Maica will make a callout to Services Australia and retrieve the most up-to-date `Status` — whether it’s still being processed or has reached a final outcome like **Completed** or **Cancelled**. You’ll see the current status update right on the Claim Batch screen.

<details>

<summary>What Maica does behind the scenes? </summary>

When you click **Check Claim Status**, Maica connects with Services Australia using the **Claim API** and automatically:

* Retrieves the current status of the submitted claim.
* Updates the Claim Batch with the new status if it has changed.
* Pulls in extra details if available — like the **Claim Paid Date**.

This helps Maica know when to trigger any follow-up steps or processes tied to that batch’s outcome.

{% hint style="info" %}
To learn more about the full Claim API and Claim Response Field Mapping, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#claim-api-claim-response-field-mapping).&#x20;
{% endhint %}

</details>

Depending on the result, Maica will mark the Claim Batch as one of the following:

* **Being Calculated** – Still in progress.
* **Pending Approval** – Awaiting review.
* **Approved** – Approved for payment (but not yet paid).
* **Completed** – Payment completed (Maica will also store the Paid Date).
* **Cancelled** – Claim was rejected or withdrawn.

Once done, the latest Claim Status and Claim Paid Date are updated on the Claim Batch record and Maica uses this new status to trigger any relevant downstream steps.

{% hint style="info" %}
There is validation within the `Claim Status` field on the `Claim Batch` object to enforce a forward-only workflow.

**Key behaviours:**

* `Claim Status` can only progress forward through its lifecycle.
* Backward status changes are no longer permitted.
* **Cancelled** and **Completed** are now treated as final states and cannot be changed once set.

**Why this matters:** This protects submitted and processed claims from accidental modification or re-claiming, improving data integrity and compliance with the Aged Care claiming process.\
\
To see the Validation Rule detail and logic, please [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#claim-status-validtion-rule).&#x20;
{% endhint %}

***

### 5. Retrieve Payment Statement and Update Claim Batch

Once your claim has been marked as **Completed**, Maica retrieves the final financial details from Services Australia.

{% hint style="success" %}
You don’t need to click anything — this step runs automatically once the Claim Status updates to **Completed**.
{% endhint %}

As soon as the status is updated, Maica contacts Services Australia using the **Payment Statement API** and fetches all the payment breakdowns linked to your claim.

These include:

* **Claim Totals** – The total value of the claim.
* **Paid Amounts** – What Services Australia actually paid.
* **Held Over Amounts** – If any portion was carried over or not yet paid.
* **Contributions or Reductions** – Adjustments due to compensation, contributions, or prior period payments.

Maica then writes this data into the **Claim Batch** record.

{% hint style="info" %}
You can see all the mappings and payload fields used in more detail [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#field-mapping).&#x20;
{% endhint %}

Now, your Claim Batch is enriched with final payment figures. This ensures your financial records are accurate and fully aligned with Services Australia’s reporting, without needing any manual reconciliation.&#x20;

***

### 6. Retrieve Updated Invoice Statuses

After the claim is finalised and payment information has been retrieved, Maica takes one last step to make sure every related **Invoice** record is brought up to date.

{% hint style="success" %}
No manual intervention is required here — it runs automatically behind the scenes.
{% endhint %}

Using the **Invoices API**, Maica reaches out to Services Australia with the original **Claim ID** and requests the latest status for all Invoices included in the batch.

Each **Invoice** is matched using its Aged Care Invoice ID (`maica_cc__Aged_Care_Invoice_ID__c`), and if Services Australia has updated the claim status, Maica syncs those changes directly into each related Invoice record.

{% hint style="info" %}
To see the full Invoice API Mapping, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#invoice-api-invoice-mapping).&#x20;
{% endhint %}

Now `Invoice` records associated with the `Claim Batch` reflect their final processed status from Services Australia.

***

### 7. Retrieve Payment Item Details for Invoice Line Items

Next, Maica retrieves detailed payment data for each **Invoice Line Item** linked to the **Claim Batch**. This happens via the **Payment Request** records.

{% hint style="success" %}
Again, no manual intervention is required here — it runs automatically behind the scenes.
{% endhint %}

<details>

<summary>What Maica does behind the scenes? </summary>

For every **Invoice Line Item** associated with the batch, Maica performs a callout to the **Payment Item Reporting API**. This API retrieves specific payment data for the corresponding **Payment Item** in Services Australia’s system.

* The process starts by identifying the correct **Invoice Line Item** through the existing relationship with the parent **Invoice**, using the field `maica__Invoice_Line_Item__c.maica__Aged_Care_Invoice_Item_ID__c`.
* All **Invoice** records linked to the batch are retrieved.
* Maica then iterates through the related **Invoice Line Items**, matching each one against the returned `ItemId` from the API response.
* When a match is found, Maica updates the associated **Payment Request** record with payment data returned by the API.

{% hint style="info" %}
Relevant claim and contribution fields are mapped and stored as shown [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/claiming-process#payment-item-reporting-api-payment-request-mapping).
{% endhint %}

</details>

After this step, each **Invoice Line Item** in Maica has been updated with precise payment data based on actual figures from Services Australia, and associated **Payment Request** records are also updated.&#x20;

{% hint style="info" %}
Each Payment Request record contains an **Aged Care Reference** field. This field stores the reference identifier returned by Services Australia for reconciliation purposes and can be used to trace payments between Maica and Services Australia’s financial data.
{% endhint %}

***

### 8. Refresh Care Recipient Budgets

As the final stage in the claiming workflow, this step ensures that your care recipients' budget records are up to date and reflect the processed and paid claims.&#x20;

{% hint style="info" %}
Note, this step is triggered automatically once **Step 7** completes successfully.
{% endhint %}

To do so, Maica performs the following actions:

* Identifies all **unique Care Recipient IDs** from the Invoice Line Items associated with the Claim Batch.
* For each unique ID:
  * Sends a request to the **Budgets API** endpoint.
  * Retrieves current budget information and either creates or updates related:
    * **Plan Budget** records
    * **Entitlement** records

{% hint style="info" %}
Only budgets where the `End Date` falls within **60 days of today** are considered relevant and included in the refresh.
{% endhint %}

Once budget data has been refreshed, you will be well positioned to move forward with issuing any **follow-up invoices** for client contribution amounts not captured in the original claim, and the process is complete.
