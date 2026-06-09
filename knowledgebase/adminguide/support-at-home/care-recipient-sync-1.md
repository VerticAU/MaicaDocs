---
description: Learn about Maica's Care Recipient Sync logic.
---

# Care Recipient Sync

## Overview

The Care Recipient Sync process retrieves data from the Services Australia "Support at Home" API suite. This process uses the Care Recipient ID to pull funding and support-related data for a single Care Recipient and stores the data across various related objects, all associated with a parent Plan record. The sync ensures that Plans, Budgets, Services, Contributions, and Budget Usage in Maica always reflect the most up-to-date information from Services Australia.

## Sync Triggers

The Care Recipient Sync can be triggered in three ways:

1. **On-demand** — Via the "Synchronise Budget Information" quick action on a Care Recipient record
2. **Bulk synchronisation** — Via the Admin Console bulk participant sync functionality
3. **Event-driven** — Automatically after successful claim approval during the "Check Status" quick action's Related Data Updates process

## Plan Record Validation

Prior to beginning the integration, Maica first needs to run some Validation to determine whether an active **Support at Home Plan** already exists for the Care Recipient. Maica will:

{% hint style="success" %}
GET `maica__Plan__c` record WHERE

`maica__Type__c` = 'Support At Home'

`maica__Participant__r.maica__Care_Recipient_ID__c` = {Request Care Recipient ID}

(`maica__End_Date__c` > CurrentDate OR `maica__End_Date__c` = null)

* If found, this existing Plan will be used to relate all downstream data.
* If not found, a **new Plan record** of this type will be created.
{% endhint %}

{% hint style="success" %}
CREATE `maica__Plan__c` record WHERE

`maica__Type__c` = 'Support At Home'

`maica__Participant__r.maica__Care_Recipient_ID__c` = {Request Care Recipient ID}

`maica__Claim_Period__c` > 'Quarterly'
{% endhint %}

Plan Start Date and End Date are calculated (or recalculated) after the Classifications have been retrieved during **every sync** — not only when a new Plan is created. This ensures Plan dates remain current and aligned with Services Australia's classification data, even as classifications are added, updated, or end-dated over time.

{% hint style="success" %}
UPDATE `maica__Plan__c` SET

`maica__Start_Date__c` = {Retrieved Classifications Earliest Start Date}

`maica__End_Date__c` = {Retrieved Classifications Latest End Date (or null if any Classification End Date is null)}

WHERE `Id` = {Plan Record Id}
{% endhint %}

{% hint style="info" %}
**Plan Start Date Logic**

* Maica will identify the **earliest Classification Start Date** across all related Classification records.
* **Plan Start Date** will be set to:
  * The **Start Date of the earliest Classification record**

**Plan End Date Logic**

Maica will evaluate the **End Date** of all related Classification records and apply the following rules:

* **If all Classification records have an End Date**:
  * **Plan End Date** will be set to:
    * The **latest End Date** (i.e. the date furthest in the future)
* **If any Classification record has a null End Date**:
  * **Plan End Date** will be left **null**

This ensures that open-ended classifications result in an open-ended Plan.
{% endhint %}

This approach ensures that:

* Plan dates accurately reflect the **full classification coverage period**
* Open-ended classifications are handled correctly
* Plan data remains current, consistent, and aligned with Services Australia data structures
* Each Care Recipient maintains **only one active Support at Home Plan** at any time

Once done, Maica can then proceed with the first callout as per the steps below:

## Integration Process

{% stepper %}
{% step %}
### Step 1: Care Recipient Summary API Callout

**Purpose:** Retrieve the core summary data for a care recipient, using their Care Recipient ID as the key input.

**API Endpoint:** Care Recipient Summary API

**Input:**

* `CareRecipientID`

**Data Returned:**

* **Classifications** → Stored in `Classification__c`
* **Approved Services** → Stored in `Approved_Service__c`
* **Supplements** → Stored in `Supplement__c`

**Logic:**

* Records are stored and linked to the identified (or newly created) Plan.
{% endstep %}

{% step %}
### Step 2: Care Recipient Individual Contribution API Callout

**Purpose:** Retrieve the care recipient's contribution data, indicating the portion of costs they are responsible for under their care plan.

**API Endpoint:** Care Recipient Individual Contribution API

**Input:**

* `CareRecipientID`

**Data Returned:**

* Array of contribution records → Stored in `Individual_Contribution__c`

**Logic:**

* Each record is linked to the Plan and represents a required participant contribution.

{% hint style="warning" %}
**Important Notes for Users**

`Individual Contribution` records in Maica are derived from the data received through the **Care Recipient Sync**. Because the upstream data does **not** include a unique identifier that can be used to match existing records, Maica cannot update `Individual Contribution` records in place.

To ensure accuracy and consistency with the latest government data, **all existing Individual Contribution records are deleted and then fully recreated during each sync**. So,

* **Do not create custom relationships** (e.g., lookups, references, or dependencies) between `Individual Contribution` records and any other records in the system. These links will be removed each time the sync runs because the previous records are replaced with newly created ones.
* If you need to maintain additional information that must persist across syncs, store it **outside** the `Individual Contribution` record or reference the **Service Agreement** or **Care Recipient** instead.
{% endhint %}
{% endstep %}

{% step %}
### Step 3: Care Recipient Budgets API Callout

**Purpose:** Retrieve funding allocation data for the care recipient's plan, including budget breakdowns and specific entitlements.

**API Endpoint:** Care Recipient Budgets API

**Input:**

* `CareRecipientID`

**Data Returned:**

* **Plan Budgets** → Stored in `Plan_Budget__c`
* **Entitlements** → Child records of budgets → Stored in `Entitlement__c`

**Logic:**

* Budgets are linked to the Plan; entitlements are linked to their respective budgets.
* This structure reflects the total available funding for the care recipient.
{% endstep %}

{% step %}
### Step 4: Budget Usage Retrieval

**Purpose:** Retrieve records of how budgets have been consumed through claimed Invoice Line Items, providing visibility into expenditure against available funding.

**API Endpoint:** Budget Usage API (per Plan Budget)

**Input:**

* `CareRecipientID`
* Plan Budget records (from Step 3)

**Data Returned:**

* **Budget Usage** records → Stored in `Plan_Budget_Usage__c`

**Logic:**

* Budget Usage records are retrieved for all **open** budgets only.
* A budget is considered "open" if:
  * Its End Date is within 90 days of the current date, OR
  * Its End Date is null
* Each Budget Usage record links:
  * A `Plan_Budget__c` (the funding allocation)
  * An `Invoice_Line_Item__c` (the specific claimed service) — **may be null** for expenditure from other providers
  * The `Amount` drawn down from the budget
* This filtering ensures the sync remains performant as Care Recipient history grows over time.

{% hint style="info" %}
Budget Usage records may include expenditure from services provided by other organisations. When a Care Recipient transfers to your organisation, their budget history comes with them. In these cases, the `Invoice_Line_Item__c` field will be null because the invoice was not created by your organisation.
{% endhint %}
{% endstep %}
{% endstepper %}

By progressing through these four stages — summary data, individual contributions, budgets, and budget usage — the Care Recipient Sync process creates a single, consistent record of all Support at Home information. All retrieved records are stored in their respective objects and related back to the Support at Home Plan. Only one active Plan per Care Recipient is maintained.
