# Monthly Claim Batch and Claims Sync

For residential aged care, you do not build a subsidy claim line by line. Services Australia calculates the monthly subsidy from the events and classifications you submit during the month. Your job each month is to bring that calculated position back into Maica, check it, and act on what it tells you. The **Claim Batch** record is where that happens, and the **Claims Sync** action is how you pull the current position from Services Australia.

This article explains what a Claim Batch is, how the monthly cycle fits together, and how to use the Claims Sync action to retrieve and review your claim.

{% hint style="info" %}
This article covers the resident-facing monthly claim. For how daily invoices are generated in the first place, see [How Resident Billing Works](how-resident-billing-works.md). For matching Services Australia payments back to your invoices once the claim is paid, see [Reconciling Payments](reconciling-payments.md).
{% endhint %}

## What a Claim Batch is

A **Claim Batch** represents one service's residential care claim for one claim month. It groups the month's claim data for a single **Location** (your service) and holds the confirmed position once Services Australia has calculated it.

Each Claim Batch carries three pieces of identifying information that must be in place before you can sync:

| On the Claim Batch                 | What it is                                | Why it matters                                                                                                           |
| ---------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Location**                       | The service the claim is for              | The claim is scoped to one service; the Location carries the Service ID and Service NAPS ID used in the sync             |
| **Claim Period Start Date**        | The first day of the claim month          | Maica derives the claim month from this date, so it must be set before syncing                                           |
| **Services Australia Provider ID** | The provider the claim is submitted under | Identifies which provider the claim belongs to, important where an organisation operates under more than one provider ID |

{% hint style="warning" %}
The **Claim Period Start Date** drives everything. Maica normalises it to the first day of its month and derives the claim month from it. If it is not set, the Claims Sync action stops and asks you to set it before continuing.
{% endhint %}

### The Claim status

The **Claim Status** on the Claim Batch tells you where the claim sits. It moves forward through the month as Services Australia processes it, and the sync updates it to match. It never moves backward.

| Claim Status         | What it means                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| **New**              | The Claim Batch has been created in Maica but not yet matched to a claim at Services Australia             |
| **Submitted**        | Services Australia has the claim open for the month                                                        |
| **Being Calculated** | Services Australia is calculating the monthly subsidy                                                      |
| **Pending Approval** | The claim is with Services Australia awaiting approval                                                     |
| **Approved**         | Services Australia has confirmed the claim for payment, and the confirmed data has been written into Maica |
| **Completed**        | The claim month is closed                                                                                  |
| **Cancelled**        | The claim has been cancelled                                                                               |

{% hint style="info" %}
You do not set the Claim Status by hand as part of normal claiming. It reflects the position Services Australia reports back, and the Claims Sync action keeps it current.
{% endhint %}

## Where the monthly Claim sits in the cycle

The claim is one stage in a repeating monthly rhythm. Understanding the order helps you know when to run the sync and what to expect from it.

1. **Billing runs through the month.** The daily billing engine generates each resident's invoices as it does every day. See [How Resident Billing Works](how-resident-billing-works.md).
2. **Accommodation balances are submitted.** Toward month-end you report each resident's RAD/RAC balance to Services Australia. See [Reporting RAD/RAC Balances](/broken/pages/1294c0625af2a6ee076f09cb24ba94b6fd1fec43).
3. **You sync the claim.** You open the Claim Batch and run **Claims Sync** to pull the current calculated position from Services Australia into Maica.
4. **The claim is approved and paid.** Once Services Australia approves the claim, the confirmed subsidy data lands in Maica, and payment follows.
5. **You reconcile the payment.** When the payment arrives, you match it against the invoices you raised. See [Reconciling Payments](reconciling-payments.md).

{% hint style="info" %}
Because Services Australia calculates the claim rather than receiving one you build, most of the claim work is reviewing what the sync brings back, not data entry.
{% endhint %}

## Running Claims Sync

**Claims Sync** is the action that pulls the current claim position from Services Australia and writes it onto the Claim Batch and its related records. You run it from the Claim Batch record.

### Before you start

{% hint style="warning" %}
**Prerequisites:** The Claim Batch must have a **Location**, a **Services Australia Provider ID**, and a **Claim Period Start Date**. A working PRODA connection for Aged Care must also be in place. If the Provider ID is not set, the sync prompts you to confirm it before it will run.
{% endhint %}

### What the sync does

When you run Claims Sync, Maica works through a set of steps in order, each retrieving one part of the monthly picture from Services Australia and writing it into Maica. The steps run one after another, and if one fails the sync stops there so you can resolve the problem and run it again.

| Step                       | What it brings back                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Payment summary**        | The payments Services Australia has recorded for the service this month, including advance and claim payment amounts and dates |
| **Claim details**          | The claim status, the Services Australia operational bed count, and the claim submission position for the month                |
| **Respite summary**        | Respite allocation and usage figures, and residential respite incentive (RRI) figures where they apply                         |
| **Care recipient details** | The per-resident detail behind the claim, refreshed for the residents in the claim month                                       |
| **RN supplement summary**  | The 24/7 registered nurse supplement figures for the service, stored against the Location                                      |
| **Reconciliation**         | Matches the confirmed position against your invoices and prepares any adjustments                                              |

{% hint style="info" %}
Some steps may show **warnings** rather than a clean result. A warning does not mean the sync failed; it flags something in that step's data that is worth reviewing, such as a resident the claim could not match. The step still completes and the sync moves on.
{% endhint %}

### After the sync

Once the sync completes, the Claim Batch shows the current position:

* The **Claim Status** reflects where Services Australia has the claim.
* The payment summary shows the advance and claim amounts and their dates.
* The claim details show the operational bed count and submission date.
* The **Claim Last Sync** time records when the claim data was last refreshed, so you can see how current it is.

{% hint style="success" %}
You can run Claims Sync as often as you need through the month. Each run refreshes the Claim Batch with the latest position from Services Australia, so it is safe to re-run whenever you want to check where the claim stands.
{% endhint %}

## What happens when the Claim is approved

When Services Australia approves the claim, the sync writes the confirmed data across several records so the approved subsidy position is reflected throughout Maica:

| Record                           | What the approved claim populates                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Claim Batch**                  | The confirmed claim status, operational bed count, registered nurse eligibility, and the last sync time |
| **Funding Item**                 | One record per resident for the claim month, including the supported resident status                    |
| **Claim Service Classification** | The service-level classifications confirmed for the month                                               |
| **AN-ACC Classification**        | The resident-level AN-ACC classifications confirmed for payment                                         |

{% hint style="warning" %}
The registered nurse eligibility written to the Claim Batch here comes from the claim itself. It is not the same as the separate 24/7 registered nurse coverage check you run for your own GPMS reporting. The two are independent.
{% endhint %}
