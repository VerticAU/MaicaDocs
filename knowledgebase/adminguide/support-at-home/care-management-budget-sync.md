---
description: Learn about Maica's Care Management Budget Sync function and logic.
---

# Care Management Budget Sync

Maica supports synchronisation of Care Management Budget Data for Aged Care providers under the Support at Home initiative. This feature gives accurate visibility of pooled Care Management funds as reported by Services Australia. To learn how Maica supports the Sync, please refer to the detailed sections below.

## What Is the Care Management Budget Sync?

Care Management budgets are pooled at the provider level rather than allocated per Participant. The Budget Sync retrieves current budget data directly from Services Australia via API and stores it against a **provider plan**, so that all budget information used for planning and reporting reflects the latest available data.

A provider plan is a **Funding** record that has a **Service Provider** (the provider Account) and no Participant. The Funding record shows **Service Provider** in place of Participant, and **Provider Plan** is ticked. Each Care Management budget is held on the provider plan as a Funding Item.

{% hint style="success" %}
Under Support at Home, Care Management budgets are associated with a **Service Provider ID**. Where an organisation operates multiple Service Provider IDs, each connection is linked to its provider Account, and the Care Management budgets are shown on that Account.
{% endhint %}

## How do I set up the Sync?

#### 1. Populate the Service Provider ID

Each Care Management Budget is associated with a Service Provider ID. This ID is required to authenticate with Services Australia and trigger the sync process. In [Settings > Support at Home](../settings/support-at-home.md), use the **Sync Service Providers** action to populate your Service Provider ID(s).

When using the **Sync Service Providers** action, Maica retrieves Care Recipient budget data, identifies the Service Provider IDs returned by Services Australia, and stores each distinct Provider ID so it appears as its own tab.

{% hint style="info" %}
Note, &#x79;_&#x6F;u will only be able to proceed once a valid Service Provider ID has been detected._
{% endhint %}

<details>

<summary>Sync Services Provider Logic</summary>

1. Perform a **callout** to retrieve **all Care Recipient budgets**.
2. Parse the returned payload to identify **Service Provider IDs** per Care Recipient.
3. **Update the Care Recipient (Contact)** with the relevant **Service Provider ID** value.
4. **Store** the distinct Service Provider IDs so they can be displayed as **tabs** within the existing tabbed card UI (using the Provider ID as the tab name).
5. Optionally (as part of the same run), **populate the existing “Service Provider ID” input** on the selected tab (so the tab reflects the stored provider ID).

</details>

If your organisation operates **multiple Service Provider IDs**, each Provider ID is displayed as a **separate tab**.

#### 2. Link each connection to its provider Account

On each connection tab, choose the **Service Provider** Account and click **Save**. The Care Management budgets are shown on that Account. Where several connections belong to the same provider, they are linked to the same Account.

{% hint style="warning" %}
Once a connection's budgets have been synced, its provider Account cannot be switched or cleared. Budgets cannot be moved between provider plans, so a new provider would receive an empty plan while the synced budgets stopped receiving updates. To move a provider to another Account, contact Maica support.
{% endhint %}

## How do I run the Sync?

The Sync runs from either of two places. Both start the same job chain, and the progress panel follows it.

* **The provider Account.** Open the provider Account and click **Refresh** on the **Provider Care Management Budget** component. This component needs to be placed on the Account record page, and the **Funding (Service Provider)** related list on the Account page layout.
* **Claim Batch Check Status.** Running **Update Budgets** on a Claim Batch refreshes the Participant budgets and then the provider budgets in one chain. For a user who cannot read connection settings, the Participant budgets still refresh and the provider sync is skipped.

## Interpreting the Display

The **Provider Care Management Budget** component on the Account shows:

* A list of the provider's most recent budgets, newest first, up to 200. Where more exist, the component says that only the latest 200 are shown.
* For each budget, its **Budget ID** and type, its period (or **no end date** where it is open ended), and the **Total**, **Used** and **Available** amounts.
* The **last sync** time across the provider's connections.

After a sync that returned no budgets, the component says that no Care Management Budgets were found. Until the provider plan has been synced, the component does not say this.

{% hint style="info" %}
This data is provided directly by Services Australia. If budget data does not appear as expected, verify that your Service Provider ID is correct and try syncing again. The progress panel stays visible after a run, so any errors logged during the sync can be read there.
{% endhint %}

## What Happens During Sync?

Each refresh is one job chain:

1. **Participant budgets** are refreshed first, when the refresh starts from Claim Batch Check Status.
2. **Discover.** For each connection linked to the provider Account, Maica makes one list call to Services Australia. It then finds or creates the provider plan, which has no start or end date of its own, and maps the budgets returned onto it as Funding Items. Duplicate budget IDs are collapsed into one, and a budget of an unrecognised type is skipped and logged with the job reference. The last sync time is stamped.
3. **Detail.** Maica retrieves the detail of each provider budget, using the newest connection setting of the provider Account to authenticate, and maps its usage and entitlements.

The discover step runs as a single unit. If mapping fails, the provider plan changes are rolled back and the last sync time is not updated.

{% hint style="success" %}
Additionally, when a Support at Home budget is retrieved, Maica captures the **serviceProviderId** from the budget payload and saves it to a field on the **Contact** record. This ensures the Services Australia provider associated with the Care Recipient is persistently recorded in Maica.
{% endhint %}

## Participant Roles and Permissions

The sync process and budget view are intended for **Service Provider Administrators** or users with **configuration-level access** only. General end users, such as Care Workers, do not interact with this section.

Users who set a provider Account, refresh budgets or run Claim Batch Check Status need the Funding, Funding Item and AGC Connection Setting permission sets (Read, Edit or Create as applicable). The Funding Item Create and Edit permission sets grant edit access to **Aged Care Status**, which every budget sync writes. Where access is granted through cloned permission sets or profiles, field access to **Service Provider** and **Provider Plan** on Funding, and **Service Provider** on the AGC Connection Setting, needs to be added.

## FAQs

<details>

<summary><strong>What is the purpose of this sync?</strong></summary>

It provides up-to-date visibility of pooled Care Management funds to improve operational and financial management.

</details>

<details>

<summary><strong>Is this data stored permanently?</strong></summary>

Yes. The budgets are stored as Funding Items on the provider plan, and each refresh updates them in place.

</details>

<details>

<summary><strong>Can the sync return multiple records?</strong></summary>

Yes. Maica can handle and display multiple Care Management budget entries, newest first.

</details>
