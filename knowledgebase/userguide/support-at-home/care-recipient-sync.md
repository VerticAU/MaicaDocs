---
description: Learn about the Care Recipient Sync under Support at Home within Maica
---

# Care Recipient Sync

## Overview&#x20;

The Care Recipient Sync process is a process that retrieves data from the Services Australia "Support at Home" API suite. This process uses the Care Recipient ID to pull funding and support-related data for a single Care Recipient and stores the data across various related objects, all associated with a parent Plan record. In doing so, it ensures that Plans, Budgets, Services, and Contributions in Maica always reflect the most up-to-date information available.

{% hint style="info" %}
Prior to beginning the Sync, Maica first needs to run some validation to determine whether an active **Support at Home Plan** already exists for the Care Recipient. To learn about the details of this process, [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/care-recipient-sync).
{% endhint %}

{% hint style="success" %}
Each Care Recipient can only have one active Support at Home Plan at a time. All synced records are linked to this Plan.
{% endhint %}

Please refer to the step-by-step walkthrough of running the sync in Maica for more detail.

## Sync Process&#x20;

### 1. Launch the Sync

The sync is initiated directly from the Care Recipient/Contact record.

1. Open the **Contact record** you wish to update.
2. Select the **Synchronise Budget Information** quick action.
3. A confirmation modal will appear explaining that Maica will retrieve:
   * `Budget records`
   * `Approved Services`
   * `Classifications`
   * `Individual Contributions`
   * `Supplement Allocations`

{% hint style="info" %}
To retrieve detailed Budget data, the Care Recipient must have provided appropriate consent.
{% endhint %}

<figure><img src="../.gitbook/assets/Screenshot 2025-09-29 at 9.53.04 am.png" alt=""><figcaption></figcaption></figure>

Click **Sync** to begin the process

***

### 2. Running the Sync

* Once the process has begun, a progress message displays while Maica retrieves the Care Recipient’s Support at Home data.

During this stage, Maica:

* Validates whether an active Support at Home Plan already exists for the Care Recipient.
* Creates a new Plan if one does not exist as per the described validation above.
* Associates all retrieved records with the Plan.

***

### 3. Review the Results

Once complete, Maica displays a success message confirming that the sync is finished. The message includes:

* Care Recipient ID
* A count of records updated across Budgets, Approved Services, Classifications, Individual Contributions, and Supplement Allocations
* A **Budget** link, taking you directly to the related Plan record

Once done, you can close the modal and refer to the updated records.&#x20;

## What is happening in the background?&#x20;

Behind the scenes, the sync process retrieves information via three stages:

1. **Summary Data** – Classifications, Approved Services, and Supplements
2. **Individual Contributions** – participant payment responsibilities

{% hint style="warning" %}
Please refer to the important information below regarding [Individual Contributions ](care-recipient-sync.md#things-to-note-individual-contributions)
{% endhint %}

3. **Budgets & Entitlements** – overall funding and detailed allocations

For more information on this process, please refer to the [Admin Guide](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/care-recipient-sync).&#x20;

For a visual representation of this process, please refer to the diagram below:&#x20;

<figure><img src="../.gitbook/assets/Care Recipient Sync .png" alt="" width="443"><figcaption></figcaption></figure>

## Things to Note: Individual Contributions&#x20;

#### **How Individual Contributions Are Managed During Syncs**

`Individual Contribution` records in Maica are derived from the data received through the **Care Recipient Sync**. Because the upstream data does **not** include a unique identifier that can be used to match existing records, Maica cannot update `Individual Contribution` records in place.

To ensure accuracy and consistency with the latest government data, **all existing Individual Contribution records are deleted and then fully recreated during each sync**.

{% hint style="warning" %}
**Important Notes for Users**

* **Do not create custom relationships** (e.g., lookups, references, or dependencies) between `Individual Contribution` records and any other records in the system.\
  These links will be removed each time the sync runs because the previous records are replaced with newly created ones.
* If you need to maintain additional information that must persist across syncs, store it **outside** the `Individual Contribution` record or reference the **Service Agreement** or **Care Recipient** instead.
{% endhint %}
