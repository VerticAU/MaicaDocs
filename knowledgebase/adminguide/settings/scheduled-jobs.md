---
description: This article provides an overview of the scheduled jobs in Maica
---

# Scheduled Jobs

{% hint style="info" %}
**Before Deactivating a User**



In Maica, certain Background Processes, Scheduled Jobs, and Flows run under a specific User context. If that User is deactivated, these automations may stop running until ownership or permissions are reassigned.<br>

Before deactivating a user, always check whether they’re running any **Maica** automation. This will display next to the Scheduled Job.&#x20;



If you cannot see it, you can also check by: <br>

* Go to Setup → Flows → Scheduled Jobs and confirm the Run As user.
* Check Setup → Apex Jobs for any jobs submitted by that user.
* Review Record-Triggered Flows for scheduled paths using that user.
* Ensure they’re not used as an Integration or API user.
* If they are, reassign the automation to an active system or integration user first.
{% endhint %}

{% hint style="success" %}
Tip: Use a dedicated “System User” for all Maica background jobs to prevent service interruptions when staff accounts are deactivated
{% endhint %}

## What are Scheduled Jobs?&#x20;

Scheduled jobs in **Salesforce** are automated processes that run to execute background tasks such as data updates, record processing, and system maintenance. These jobs help reduce manual workload by handling repetitive operations, ensuring that key business processes continue to function without user intervention.&#x20;

## What are the Scheduled Jobs in Maica?&#x20;

In **Maica**, scheduled jobs automate system processes. These jobs ensure data integrity, improve operational efficiency, and help keep the system running smoothly.

Below are all the Scheduled Jobs within **Maica** and their descriptions:&#x20;

### `Create Invoice Line Items`&#x20;

<details>

<summary>Job Details</summary>

#### Purpose:&#x20;

This job executes the Billing Flow and automates the creation of **Invoice Line Items** for **Delivery Activities** marked for billing.&#x20;

#### Description:&#x20;

Retrieves `Delivery Activity` record WHERE:&#x20;

* `Billing_Status__c` = 'Requested'
* `Invoice_Line_Item__c` = NULL

and then disables the `InvoiceLineRollupExpenditure_MDTM` Trigger Handler on the Agreement Item object that calculates rollup fields related to `Invoice Line Items`.&#x20;

It does so to avoid UNABLE\_TO\_LOCK\_ROW system errors. &#x20;

Then, the job will execute the Billing Flow selected in the [Billing Management Settings](billing-management.md) that creates `Invoice Line Items` related to the `Delivery Activity`. \
\
At the end of the Scheduled Job, it updates relevant `Agreement Items` to trigger the rollup calculation logic.&#x20;

</details>

### `Manage Recurring Shifts`

<details>

<summary>Job Details</summary>

#### Purpose:&#x20;

This job automates the scheduling of recurring **Shifts**. It ensures that **Master Shifts** are replicated according to set rules while avoiding conflicts with completed or cancelled shifts. The job also applies availability checks if validation settings are enabled, ensuring that only available **Resources** are assigned.

#### Description:&#x20;

Retrieves `Schedule` records WHERE:

* `Under_Evaluation__c` = TRUE
* `Status__c` = 'Approved'
* `Master_Appointment__r`.`Status__c` != 'Cancelled'
* `Master_Appointment__r`.`RecordType` != 'Shift'

For each `Schedule` Record, the Job will determine the anchor date, which can either be the last `Original Schedule Start`, or, `Schedule Start`. The anchor date cannot be prior to today. Once specified, the Job creates Scheduled Shifts which are clones of Master Shifts with related Delivery Activities and Appointment Resources up until the Horizon determined in the [General Settings](general-settings.md). \
\
It is important to note that the Job does not fill up the dates where there is a Shift with a `Completed` or `Cancelled` status on a date within the Schedule. Additionally, the Status for each Record is being determined via the [Service Management ](service-management.md)Settings. **Maica** will default the Status to `Scheduled`, but you can change this to suit your preference.\
\
If the `Enforce Availability for Appointment` Setting under [Validation Management](validation-management.md) is enabled, the Job will perform the same Validation as a user would creating the Appointment manually, hence, if `Resources` are `Unavailable` they will not be copied across to the newly created `Shifts`. \
\
Note: The `Original Schedule Start` field stores the value of the `Schedule Start` field when it is changed for the first time after it has been created.&#x20;

</details>

### `Manage Recurring Appointments`

<details>

<summary>Job Details</summary>

#### Purpose:&#x20;

This job automates the scheduling of recurring **Appointments**. It ensures that **Master Appointments** are replicated according to set rules while avoiding conflicts with completed or cancelled shifts. The job also applies availability checks if validation settings are enabled, ensuring that only available **Resources** are assigned.

#### Description:&#x20;

Retrieves `Schedule` records WHERE:

* `Under_Evaluation__c` = TRUE
* `Status__c` = 'Approved'
* `Master_Appointment__r`.`Status__c` != 'Cancelled'
* `Master_Appointment__r`.`RecordType` != 'Appointment'

For each `Schedule` Record, the Job will determine the anchor date, which can either be the last `Original Schedule Start`, or, `Schedule Start`. The anchor date cannot be prior to today. Once specified, the Job creates Scheduled Appointments which are clones of Master Appointments with related Delivery Activities and Appointment Resources up until the Horizon determined in the [General Settings](general-settings.md). \
\
It is important to note that the Job does not fill up the dates where there is an Appointment with a `Completed` or `Cancelled` status on a date within the Schedule. Additionally, the Status for each Record is being determined via the [Service Management ](service-management.md)Settings. **Maica** will default the Status to `Scheduled`, but you can change this to suit your preference.\
\
If the `Enforce Availability for Appointment` Setting under [Validation Management](validation-management.md) is enabled, the Job will perform the same Validation as a user would creating the Appointment manually, hence, if `Resources` are `Unavailable` they will not be copied across to the newly created `Appointments`. \
\
Note: The `Original Schedule Start` field stores the value of the `Schedule Start` field when it is changed for the first time after it has been created.&#x20;

</details>

### `Manage Recurring Unavailabilities`

<details>

<summary>Job Details</summary>

#### Purpose:&#x20;

This job automates the scheduling of recurring **Unavailabilities** by cloning **Master Unavailability**. It ensures that new unavailability records are created based on the **anchor date** while adhering to validation settings. The job also prevents creation of back-dated Unavailability records and maintains scheduling accuracy by setting default statuses according to setting configuration.

#### Description:&#x20;

Retrieves `Unavailability` records to clone for `Schedule` record WHERE:

* `Under_Evaluation__c` = TRUE
* `Status__c` = 'Approved'
* `Master_Unavailability__c` != NULL

For each `Schedule` Record, the Job will determine the anchor date (either the last `Original Unavailable From`, or, `Unavailable From`). The anchor date cannot be prior to today. Once the anchor date is specified, the Job creates Unavailabilities which are clones of Master Unavailability up until the Horizon determined in the [General Settings](general-settings.md). \
\
The Status for each Record is being determined via the [Validation Management](validation-management.md) Settings. **Maica** will default the Status to `Submitted`, but you can change this to suit your preference.\
\
Note: The `Original Unavailable From` field stores the value of the `Unavailable From` field when it is changed for the first time after it has been created.&#x20;

</details>

### `Creates Renewals`

<details>

<summary>Job Details</summary>

#### Purpose:&#x20;

When the criteria below is met, the job will close Service Agreement and related Agreement Item records to create a new Service Agreement for Participants. That Start and End Date will be populated based on the values saved in the Renewal Management Settings.&#x20;

#### Description:&#x20;

Retrieves `Service Agreement` records to clone where:

* `Auto_Renewal__c` = TRUE
* `End_Date__c` >= :(TODAY - `Days_Prior_Agreement_End_Date__c`)
* Clones `Service Agreements` and `Agreement Items`

</details>

### `PRODA Device Keys Expiration Management`

<details>

<summary>Job Details</summary>

#### Description:&#x20;

Refreshes PRODA device keys if they are less than two days away from their expiry date.

</details>

### `PRODA Device Keys Activation Reminder`

<details>

<summary>Job Details</summary>

#### Description:&#x20;

Sends reminder email when 30 days before expire and every day 7 days before expire

</details>

### `Manage Funding Item Include Attribute`

<details>

<summary>Job Details</summary>

**Description:**

This job ensures that the **Include** checkbox on `Funding Item` records is correctly maintained, determining whether each item should be included in rollup calculations to the parent `Funding` record.

</details>

### `Sync Price List Entries`

<details>

<summary>Job Details</summary>

#### **Purpose:**

This job keeps Maica’s pricing data in sync by making sure every `PricebookEntry` is linked up with a `Price_List_Entry__c` record. It helps maintain clean data by updating or creating these custom records based on your latest **Pricebook** and **Product** setups.

It also removes any outdated entries and gives your `Service Agreement` and `Agreement Item` records a refresh if they’re missing a key link.

#### **Description:**

When this job runs, it looks at every `PricebookEntry` where:

* `Pricebook2.maica__Price_List__c` is **not blank**
* `Product2.maica__Support_Item__c` is **not blank**

Then, for each one, the job checks if there's already a `Price_List_Entry__c` linked to it:

* If there is, it updates it.
* If there isn’t, it creates one from scratch.

It uses a built-in field mapping to copy across the relevant fields, like unit price, support item, and price book.

Once the batch is finished, it also does a cleanup:

* It deletes any `Price_List_Entry__c` records that are no longer linked to any `PricebookEntry`.
* Then it runs two smaller jobs to make sure:
  * Every `Service Agreement` has its `Price List` field filled in
  * Every `Agreement Item` has its `Support Item` filled in

</details>

### `Total Committed Calculation`

<details>

<summary>Job Details</summary>

**Purpose:**&#x20;

This job calculates and updates the **Total Committed** values on `Agreement_Item__c` records based on associated `Delivery_Activity__c` records, giving you an accurate view of how much has been used across participant agreements. It doesn’t just look at logged delivery — it also includes **predicted commitments** based on **active schedules**.\
\
It's designed to help you keep your totals clean and up to date based on Delivery Activity usage.

**Description:**

When you click **Run Now**, Maica looks for all `Delivery_Activity__c` records where:

* `Is_Committed__c = TRUE`
* **Predicted commitments** based on created and active `Schedule` records (even if a Delivery Activity hasn’t been logged yet)

For each Delivery Activity that qualifies, Maica runs its Appointment Cost Calculation Processor to determine:

* Which `Agreement_Item__c` records were affected
* How much committed usage should be added to each

After the batch runs:

* The `Total_Committed__c` field is updated with the final figure

</details>
