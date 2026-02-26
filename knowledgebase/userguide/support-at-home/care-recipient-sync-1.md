---
description: Learn about the Care Recipient Sync under Support at Home within Maica
---

# Care Recipient Sync

## Overview

The Care Recipient Sync process retrieves data from the Services Australia "Support at Home" API suite. This process uses the Care Recipient ID to pull funding and support-related data for a single Care Recipient and stores the data across various related objects, all associated with a parent Plan record. The sync ensures that Plans, Budgets, Services, Contributions, and Budget Usage in Maica always reflect the most up-to-date information from Services Australia.

{% hint style="info" %}
Prior to beginning the Sync, Maica first needs to run some validation to determine whether an active **Support at Home Plan** already exists for the Care Recipient. To learn about the details of this process, [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/care-recipient-sync-1).
{% endhint %}

{% hint style="success" %}
Each Care Recipient can only have one active Support at Home Plan at a time. All synced records are linked to this Plan.
{% endhint %}

***

## When Does the Sync Run?

The Care Recipient Sync can be triggered in three ways:

1. **On-demand** - Using the "Synchronise Budget Information" quick action on a Care Recipient record
2. **Bulk synchronisation** - Via the Admin Console bulk participant sync functionality
3. **Event-driven** - Automatically after successful claim approval during the "Check Status" quick action's Related Data Updates process

***

## Sync Process

{% stepper %}
{% step %}
### Launch the Sync

The sync is initiated directly from the Care Recipient/Contact record.

* Open the **Contact record** you wish to update.
* Select the **Synchronise Budget Information** quick action.
* A confirmation modal will appear explaining that Maica will retrieve:
  * Budget records
  * Budget Usage data
  * Approved Services
  * Classifications
  * Individual Contributions
  * Supplement Allocations

{% hint style="info" %}
To retrieve detailed Budget data and Budget Usage information, the Care Recipient must have provided appropriate consent.
{% endhint %}

Click **Sync** to begin the process
{% endstep %}

{% step %}
### Running the Sync

Once the process has begun, a progress message displays while Maica retrieves the Care Recipient's Support at Home data.

During this stage, Maica:

* Validates whether an active Support at Home Plan already exists for the Care Recipient
* Creates a new Plan if one does not exist
* Associates all retrieved records with the Plan
* Retrieves budget usage data for all open budgets
{% endstep %}

{% step %}
### Review the Results

Once complete, Maica displays a success message confirming that the sync is finished. The message includes:

* Care Recipient ID
* A count of records updated across Budgets, Budget Usage, Approved Services, Classifications, Individual Contributions, and Supplement Allocations
* A **Budget** link, taking you directly to the related Plan record

Once done, you can close the modal and refer to the updated records.
{% endstep %}
{% endstepper %}

***

## What Data is Retrieved?

The sync process retrieves information across four main areas:

### 1. Summary Data

Classifications, Approved Services, and Supplements that define what services the Care Recipient is approved to receive.

### 2. Individual Contributions

Participant payment responsibilities, including means-tested fees and other contributions.

{% hint style="warning" %}
Please refer to the important information below regarding [Individual Contributions](care-recipient-sync-1.md#things-to-note-individual-contributions)
{% endhint %}

### 3. Budgets & Entitlements

Overall funding allocations and detailed budget breakdowns by period and category.

### 4. Budget Usage

Records of how budgets have been consumed through claimed Invoice Line Items, providing visibility into expenditure against available funding.

{% hint style="info" %}
Budget Usage data is only retrieved for budgets considered "open" - specifically, budgets within 90 days after their End Date, or budgets without an End Date. This filtering ensures the sync remains performant as Care Recipient history grows over time.
{% endhint %}

For more information on the technical details of this process, please refer to the [Admin Guide](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/care-recipient-sync-1).

***

## How Plan Dates Are Determined

### Overview

When Maica syncs Care Recipient data from Services Australia, the Plan Start Date and Plan End Date are automatically calculated based on the related **Classification** records retrieved during the sync. This ensures Plan dates accurately reflect the full classification coverage period for the Care Recipient.

### Plan Start Date Logic

The Plan Start Date is set to the **earliest Start Date** across all related Classification records.

For example, if a Care Recipient has three classifications that started on:

* 01 January 2025
* 01 July 2025
* 15 March 2025

The Plan Start Date will be **01 January 2025** (the earliest date).

### Plan End Date Logic

The Plan End Date follows more complex logic to properly handle open-ended classifications:

**If all Classification records have an End Date:**

* The Plan End Date is set to the **latest End Date** (the date furthest in the future)

**If any Classification record has a null End Date:**

* The Plan End Date is left **null** (open-ended)

This ensures that open-ended classifications correctly result in an open-ended Plan, giving you flexibility to continue delivering services without a fixed end date.

### Examples

| Scenario                                  | Classification Start Dates | Classification End Dates | Plan Start Date | Plan End Date |
| ----------------------------------------- | -------------------------- | ------------------------ | --------------- | ------------- |
| Single classification                     | 01 Jan 2025                | 31 Dec 2025              | 01 Jan 2025     | 31 Dec 2025   |
| Multiple classifications (all end dated)  | 01 Jan 2025, 01 Jul 2025   | 30 Jun 2025, 31 Dec 2025 | 01 Jan 2025     | 31 Dec 2025   |
| Multiple classifications (one open-ended) | 01 Jan 2025, 01 Jul 2025   | 30 Jun 2025, _null_      | 01 Jan 2025     | _null_        |
| All classifications open-ended            | 01 Jan 2025, 01 Jul 2025   | _null_, _null_           | 01 Jan 2025     | _null_        |

### Plan Record Behaviour

Important points about how Plan records are managed:

* Each Care Recipient has **one Plan record** in Maica for Support at Home
* During every Care Recipient Sync, the existing Plan record is **created or updated**
* Plan Start Date and End Date are **recalculated** based on the current set of related Classification records
* No duplicate Plan records are created

This approach ensures that Plan dates remain current and aligned with Services Australia's classification data, even as classifications are added, updated, or end-dated over time.

***

## Understanding Budget Usage

### What is Budget Usage?

Budget Usage records track how a Care Recipient's budgets are being consumed at the invoice line item level. Each Budget Usage record links:

* A **Plan Budget** (the funding allocation)
* An **Invoice Line Item** (the specific claimed service)
* The **Amount** drawn down from the budget

This creates a complete audit trail showing exactly which services have been claimed against which budgets, and helps you understand:

* How much of each budget has been spent
* Which services are consuming budget allocations
* Remaining budget balances for future planning

### When is Budget Usage Synced?

Budget Usage data is automatically retrieved whenever the Care Recipient Sync runs, including:

* On-demand sync via the "Synchronise Budget Information" quick action
* Bulk participant syncs from the Admin Console
* Automatic syncs following successful claim approval

{% hint style="success" %}
Budget Usage is updated automatically after claims are approved, ensuring your budget consumption data stays current without manual intervention.
{% endhint %}

### Budget Usage from Other Providers

It's important to understand that Budget Usage records may include expenditure from services provided by other organisations. When a Care Recipient transfers to your organisation, their budget history comes with them.

In these cases:

* Budget Usage records are still created in Maica
* The **Invoice Line Item** field will be empty (null) because the invoice wasn't created by your organisation
* The Amount and Plan Budget fields still show what was consumed

This gives you visibility into the complete budget picture, including historical expenditure, even if it occurred before the Care Recipient was in your care.

### Viewing Budget Usage

Budget Usage can be viewed in two locations:

1. **On the Plan Budget record** - View the "Plan Budget Useage" related list to see all consumption for that specific budget
2. **On the Plan Budget record fields** - The "Usage Amount" field shows the total amount consumed from that budget

***

## Things to Note: Individual Contributions

### How Individual Contributions Are Managed During Syncs

Individual Contribution records in Maica are derived from the data received through the Care Recipient Sync. Because the upstream data does not include a unique identifier that can be used to match existing records, Maica cannot update Individual Contribution records in place.

To ensure accuracy and consistency with the latest government data, **all existing Individual Contribution records are deleted and then fully recreated during each sync**.

{% hint style="warning" %}
**Important Notes for Users**

* **Do not create custom relationships** (e.g., lookups, references, or dependencies) between Individual Contribution records and any other records in the system. These links will be removed each time the sync runs because the previous records are replaced with newly created ones.
* If you need to maintain additional information that must persist across syncs, store it **outside** the Individual Contribution record or reference the **Service Agreement** or **Care Recipient** instead.
{% endhint %}

***

## Key Takeaways

* The Care Recipient Sync ensures all Support at Home data in Maica matches Services Australia's records
* Plan dates are automatically calculated from Classification records to ensure accurate coverage periods
* Budget Usage provides detailed visibility into how budgets are being consumed
* The sync runs automatically after claim approval, keeping budget data current
* Only "open" budgets (within 90 days of End Date) are synced to maintain system performance
* Budget Usage may include historical expenditure from other providers
