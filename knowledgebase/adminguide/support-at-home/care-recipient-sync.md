---
description: Learn about Maica's Care Recipient Sync logic.
hidden: true
noIndex: true
---

# Care Recipient Sync

## Overview

The Care Recipient Sync process is a process that retrieves data from the Services Australia "Support at Home" API suite. This process uses the Care Recipient ID to pull funding and support-related data for a single Care Recipient and stores the data across various related objects, all associated with a parent Plan record.

## Plan Record Validation

Prior to beginning the integration, Maica first needs to run some Validation to determine whether an active **Support at Home Plan** already exists for the Care Recipient. Maica will:

{% hint style="success" %}
GET `maica__Plan__c` record WHERE

`maica__Type__c` = ‘Support At Home’

`maica__Participant__r.maica__Care_Recipient_ID__c` = {Request Care Recipient ID}

`maica__End_Date__c` > CurrentDate
{% endhint %}

* If found, this existing Plan will be used to relate all downstream data.
* If not found, a **new Plan record** of this type will be created.

{% hint style="success" %}
CREATE `maica__Plan__c` record WHERE

`maica__Type__c` = ‘Support At Home’

`maica__Participant__r.maica__Care_Recipient_ID__c` = {Request Care Recipient ID}

`maica__Claim_Period__c` > ‘Quarterly’

The date range values can only be populated for a NEW Plan record after the Classifications have been retrieved. The Plan duration should be taken from the earliest Start Date of the child Classifications and the latest End Date of the child Classifications:

GET `maica__Classification__c` WHERE `maica__Plan__c` = {Created `maica__Plan__c.Id`} AND

`maica__Plan__r.maica__Start_Date__c` = {Retrieved Classifications Earliest Start Date}

`maica__Plan__r.maica__End_Date__c` = {Retrieved Classifications Latest End Date}
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

Once done, Maica can then process with the first callout as per the steps below:&#x20;

## Integration Process&#x20;

### **Step 1: Care Recipient Summary API Callout**

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

***

### **Step 2: Care Recipient Individual Contribution API Callout**

**Purpose:** Retrieve the care recipient’s contribution data, indicating the portion of costs they are responsible for under their care plan.

**API Endpoint:** Care Recipient Individual Contribution API

**Input:**

* `CareRecipientID`

**Data Returned:**

* Array of contribution records → Stored in `Individual_Contribution__c`

**Logic:**

* Each record is linked to the Plan and represents a required participant contribution.

{% hint style="warning" %}
**Important Notes for Users**

\
\
`Individual Contribution` records in Maica are derived from the data received through the **Care Recipient Sync**. Because the upstream data does **not** include a unique identifier that can be used to match existing records, Maica cannot update `Individual Contribution` records in place.

To ensure accuracy and consistency with the latest government data, **all existing Individual Contribution records are deleted and then fully recreated during each sync**.\
\
So, <br>

* **Do not create custom relationships** (e.g., lookups, references, or dependencies) between `Individual Contribution` records and any other records in the system.\
  These links will be removed each time the sync runs because the previous records are replaced with newly created ones.
* If you need to maintain additional information that must persist across syncs, store it **outside** the `Individual Contribution` record or reference the **Service Agreement** or **Care Recipient** instead.
{% endhint %}

***

### **Step 3: Care Recipient Budgets API Callout**

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

By progressing through these three stages — summary data, individual contributions, and budgets — the Care Recipient Sync process creates a single, consistent record of all Support at Home information. All retrieved records are stored in their respective objects and related back to the Support at Home Plan & only one active Plan per Care Recipient is maintained.

For a visual representation of this process, please refer to the diagram below:

<figure><img src="../.gitbook/assets/Care Recipient Sync .png" alt="" width="443"><figcaption></figcaption></figure>
