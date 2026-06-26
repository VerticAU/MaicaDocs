# Care Recipient Details Sync

The care recipient details sync is the foundational inbound integration for every residential aged care resident. It retrieves a resident's full funding profile from Services Australia and writes it into Maica, keeping classifications, approvals, supplements and place allocations current.

This article explains what the sync brings in, the ways it can be run, how you can tell when it last ran, and the conditions it must satisfy before a resident can be admitted. It is written for administrators and power users.

{% hint style="info" %}
The care recipient details sync is one of the inbound reads described in [Inbound data APIs](inbound-data-apis.md). That article covers the full set of reads; this article covers the care recipient sync workflow specifically.
{% endhint %}

## What the sync retrieves

The sync calls Services Australia for a single care recipient and receives that resident's confirmed funding picture. Maica reads the response and updates the resident's records, including:

* **AN-ACC classifications** - the funding classification and care type history that determine the government subsidy.
* **Assessments** - the ACAT assessment records covering approved care types and sub-types.
* **Supplements** - current supplement eligibility, such as dementia, oxygen and veterans' supplements.
* **Place allocations** - whether the resident holds a committed and current residential place.
* **Care type approvals** - the care types Services Australia has approved the resident to receive.
* **Care extensions** - any extension events recorded against an approved care type.
* **Medicare details** - the resident's Medicare card information, retrieved as a subordinate step within the same sync.

The sync is read-only. It never writes data back to Services Australia.

{% hint style="info" %}
Services Australia identity and demographic data is written to the resident's funding profile rather than to the **Contact** record, which holds the provider's own view of the person. The resident's name and date of birth entered at intake are not overwritten by the sync. To understand this separation, see [The RACS data model](../racs-solution-overview/the-racs-data-model.md).
{% endhint %}

## How the sync runs

There are three ways the sync runs. There is no background scheduled job; every sync is triggered by a user action or by the monthly claim process, which keeps all sync activity visible and traceable.

### On demand for a single resident

Run the **Sync Care Recipient** quick action from the resident's record to refresh that one resident immediately. This is the action you use after a reassessment, a new supplement, or any time you need the latest Services Australia data for a specific resident.

When a resident's Services Australia identifier has not yet been used for any retrieval, the sync first performs a care recipient search to obtain a short-lived access key, then retrieves the full details. This search-first step is what establishes the secure link to that resident's record.

### Bulk sync for all residents

Run **Sync All Care Recipients** from the Maica Settings admin page to refresh every active residential aged care resident in one action. Use this for a periodic refresh across the whole resident population, for example after the annual classification change.

{% hint style="warning" %}
A bulk sync issues a Services Australia call for the residents it covers. Run it when a broad refresh is genuinely needed rather than as a routine habit, and review the outcome afterwards.
{% endhint %}

### As a step before the monthly claim

Before a monthly claim is processed, the claim workflow refreshes the residents in that Claim Batch so the classification and approval data used for the claim is current at the point it matters most. This happens automatically as part of the claim process; you do not run it separately.

{% hint style="info" %}
For the monthly claim itself, see the Claims section of [Inbound data APIs](inbound-data-apis.md).
{% endhint %}

## Checking the sync result

Each sync records its outcome on the resident's **Contact** record, separate from the funding profile that holds the synced data itself. These are operational status fields, so you can see how current the data is and whether anything needs attention. The following fields are populated by the sync and are read-only.

| Field                          | API name                        | Description                                                                                                                                      | Help text                                                          |
| ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **Care Recipient Sync Status** | `Care_Recipient_Sync_Status__c` | Shows the result of the most recent sync for this resident, so you can see at a glance whether the Services Australia data came through cleanly. | The outcome of the last Services Australia sync for this resident. |
| **Care Recipient Last Sync**   | `Care_Recipient_Last_Sync__c`   | The date and time the resident's details were last refreshed from Services Australia, so you know how current the funding data is.               | When this resident was last synced with Services Australia.        |
| **Sync Error Details**         | `Sync_Error_Details__c`         | The messages returned by the most recent sync when it did not complete cleanly, so you can understand and resolve what went wrong.               | Details of any messages from the last sync.                        |

The sync status reflects the messages Services Australia returns:

| Status                   | Meaning                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| **Synced**               | The sync completed successfully with no issues.                                                   |
| **Synced with Warnings** | The sync completed, but Services Australia returned one or more warning messages worth reviewing. |
| **Error**                | The sync did not complete. The reason is recorded in **Sync Error Details**.                      |

## Before you can admit a resident

The sync is a prerequisite for admission. Before an entry event can be submitted, the resident must hold current, valid Services Australia data. Maica checks that:

* The **Care Recipient Sync Status** is **Synced** or **Synced with Warnings** (not **Error**).
* A care type approval exists for residential care (`RESI`) with an active date range that covers the proposed entry date.
* A place allocation exists that is current and either committed or allocated.

{% hint style="danger" %}
If these conditions are not met, the entry event is blocked and you are prompted to run the care recipient sync first. Always run the sync before attempting to admit a resident, so that Maica holds Services Australia's current approval and place allocation data.
{% endhint %}

{% hint style="info" %}
For the admission workflow itself, see [Admitting a resident](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/admitting-a-resident) in the User Guide, and [Outbound event APIs](outbound-event-apis.md) for how the entry event is submitted.
{% endhint %}

## Open item

{% hint style="warning" %}
**Approved services for residential approvals (OI-001):** It has not been confirmed whether Services Australia populates the approved services array for residential (`RESI`) approvals in the care recipient details response. If it does, the way approved services are stored may need to be revisited. Confirm the behaviour with Services Australia and the engineering team before relying on approved service data for residential residents.
{% endhint %}
