---
description: >-
  Learn about Maica's Bulk Synchronisations for Support at Home and their
  function and logic.
---

# Bulk Synchronisations for Support at Home

## Overview&#x20;

The Bulk Synchronisations for Support at Home feature allows administrators to update multiple record types in Maica by retrieving the latest data from the Services Australia APIs. Instead of running synchronisations individually at the Care Recipient level, these bulk options refresh entire groups of data in a single operation.

From this screen, administrators can:

* **Sync Care Recipients** – update all Care Recipient records for a Service Provider, including optional retrieval of Contributions and Budgets.
* **Sync Individual Contributions** – refresh the latest contribution data for all existing Care Recipients without running a full sync.
* **Sync Budgets** – update budget and entitlement data for all Care Recipients, with the option to refresh only related budget details.

Each bulk synchronisation uses the same API connections and mapping logic as the individual Care Recipient sync, ensuring data is consistent across both single-record and bulk operations.

This article explains each type of synchronisation, the logic behind the operations, and how the data is processed in Maica.

## Bulk Synchronisations

### Bulk Care Recipient Sync&#x20;

The main bulk sync action is the **Bulk Care Recipient Sync**, as shown below.

<figure><img src="../.gitbook/assets/bulk sync care recipients.png" alt=""><figcaption></figcaption></figure>

* **Action:** _Sync Care Recipient data in bulk from Services Australia_
* **Purpose:** Retrieves the latest Care Recipient records for all Contacts under the configured Service Provider ID.
* **Process:**
  * Calls the **Care Recipient Summary API** using the Service Provider ID.
  * Iterates through the returned array of Care Recipients like to the specified `serviceProviderId`.
  * Updates existing Contact and Plan records in Maica with the latest classifications, services, and supplements.

**Additional Sync Items (optional checkboxes):**

* **Include Individual Contributions** – runs an additional callout to retrieve and update all contribution data for the same set of Care Recipients.
* **Include Budgets** – runs an additional callout to retrieve and update all budget data, including entitlements, for the same set of Care Recipients.

{% hint style="info" %}
If you choose to include one of the above listed Sync Items, the associated Sync below will be temporarily blocked immediately after as it will be included in the initial Sync.&#x20;
{% endhint %}

When complete, a summary message displays showing the number of records updated and any errors.

{% hint style="success" %}
Maica iterates through each care recipient summary returned. They will be parsed and handled according to the mappings and logic in the [Care Recipient Sync Process](care-recipient-sync.md).
{% endhint %}

{% hint style="info" %}
It is important to note that new Contacts are not created by the bulk sync; only existing Contacts with valid Care Recipient IDs are updated.
{% endhint %}

### Individual Contributions&#x20;

This panel allows you to run a contribution-only sync, separate from the full Care Recipient sync.

* **Action:** _Sync Individual Contributions Only_
* **Purpose:** Retrieves the latest individual contribution data for all Care Recipients currently stored in Salesforce.
* **Process:**
  * Calls the **Care Recipient Individual Contribution API**.
  * Updates `Individual_Contribution__c` records linked to existing Support at Home Plans.
* **Note:** No new Care Recipient records are created in this process; only contributions for existing Contacts are updated.

### Budgets

This panel is used to update funding allocations independently of other data.

* **Action:** _Sync Budgets Only_
* **Purpose:** Retrieves the latest budget and entitlement data for all Care Recipients currently stored in Salesforce.
* **Process:**
  * Calls the **Care Recipient Budgets API**.
  * Updates `Plan_Budget__c` and related `Entitlement__c` records.
* **Note:** Budgets and Entitlements are always linked, and both are retrieved during this process.

An additional option is available:

* **Sync Budgets Related Data Only** – refreshes related budget and entitlement details for existing budget records without re-querying the full budget list.

{% hint style="warning" %}
When you select **Sync Budgets**, you cannot then select **Sync Budgets Related Data Only** right away as the initial selection will trigger both. But, you can **Sync Budgets Related Data** without **Syncing Budgets**.&#x20;
{% endhint %}

## Error Handling&#x20;

Progress indicators are shown while sync jobs are running. On completion, Maica outputs a summary of successful updates and any failures. Failures are written to log records in Maica for further review, and can be expanded directly from the Sync Settings, as shown below.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2025-09-29 at 11.42.23 am.png" alt=""><figcaption></figcaption></figure>
