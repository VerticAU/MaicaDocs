---
description: >-
  Understand how the Indexation Engine applies indexed rates as at an Effective
  Date
---

# The Indexation Engine

Several residential aged care rates are reindexed by the government twice a year, on 20 March and 20 September. The Indexation Engine applies those new rates to every resident's active Agreement Items in one run, as at an Effective Date, so administrators do not have to re-rate items by hand.

Unlike the daily billing engine, the Indexation Engine is run on demand rather than on a schedule. The administrator first updates the published indexation values on the RACS Configuration tab, then runs the engine to push those values onto the Agreement Items.

## How it is triggered

The Indexation Engine is run from the **Run Indexation** action in the **Indexed Rates and Supplements** section of the [RACS Configuration tab](/broken/pages/0ae4e45ff9f83e2a3a240a31c2b87a029130a33f). It sits alongside the Basic Daily Fee standard rate and DAP index number fields, because those are the values it applies.

The action is available only to users with the **Modify All Data** permission, because a run re-rates every resident at once.

The button is disabled only when **both** the Basic Daily Fee standard rate and the DAP index number are blank, since with neither value present there is nothing to apply. Its tooltip reads: _"Enter the new BDF rate and DAP index number before running the Indexation Engine."_

Because the engine reads the values stored on the Billing Setting at the moment it runs, the order of operations matters.

{% hint style="warning" %}
Update the indexation values on the [RACS Configuration tab](/broken/pages/0ae4e45ff9f83e2a3a240a31c2b87a029130a33f) **before** you run the engine. Enter the new Basic Daily Fee standard rate and the new DAP index number first, then run indexation. Running it against stale values produces stale rates.
{% endhint %}

### The Effective Date

Every run needs an **Effective Date**, the date from which the new rates apply.

* It defaults to the latest 20 March or 20 September on or before today.
* It cannot be in the future.
* It cannot be earlier than the **Last Indexation Effective Date**, which is shown read-only beside it and records the Effective Date of the most recent run. The same date is accepted.

### Confirming and running

When you select the button, Maica checks every guard and shows a confirmation dialog before it changes anything. The dialog shows the Effective Date, the date the previous rates end, which is the day before the Effective Date, and the number of fees that will be checked. The count includes fees the run will skip with a named reason. You confirm to proceed.

A run is refused while the billing engine is running, and while another indexation run is queued or running. Billing runs that start while indexation is running are skipped, so a fee cannot be billed while indexation is ending it.

The engine then runs as a background job, one Agreement Item at a time, and a progress panel follows it. The panel finishes with **Indexation completed**, or **Completed with errors** where any fee failed.

## What the engine does for each fee

For each in-scope Agreement Item, the engine does not change the existing item. It:

1. Ends the existing Agreement Item on the day before the Effective Date, leaving its rate and invoice lines as they were.
2. Creates a successor Agreement Item with the new rate, starting on the Effective Date and carrying the same details.
3. Stamps the **Last Indexed Date** with the Effective Date.
4. Raises a **Rate Adjustment** for any days already billed at the old rate from the Effective Date onwards.

If any step fails for an item, that item's changes are rolled back and it is recorded as failed, and the rest of the run continues.

The billing cursor of the successor follows the billing already carried out, so days billed on the existing item are not billed again.

{% hint style="info" %}
Because the existing item is kept and ended, running indexation with an earlier Effective Date than the last run is refused, and running it again with the same Effective Date indexes nothing a second time.
{% endhint %}

## Indexation scope

The run processes the active residential Agreement Items that are in scope as at the Effective Date. Each item is then checked in order, and the first matching rule decides its outcome:

| Check                                                                    | Outcome                                                                        |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Already indexed on or after the Effective Date                           | Skipped                                                                        |
| Ended before the Effective Date                                          | Skipped                                                                        |
| The resident is discharged                                               | Skipped, with a note to adjust the final statement manually                    |
| The Service Agreement is excluded from automated rate changes            | Skipped                                                                        |
| The Support Item has no fee type                                         | Skipped                                                                        |
| Daily Accommodation Contribution                                         | Skipped                                                                        |
| Daily Accommodation Payment outside the Post 1 November 2025 arrangement | Skipped                                                                        |
| No Basic Daily Fee standard rate, or no DAP index number, is set         | Skipped                                                                        |
| The item starts on or after the Effective Date                           | Skipped, naming whether it is already at the new rate or still at the old rate |
| The new rate equals the current rate                                     | Skipped                                                                        |
| Any other fee type                                                       | Skipped as out of scope                                                        |

An item that starts on or after the Effective Date at the old rate is not re-rated by the engine. Apply **Change Rate**, or **Edit Fee Item** for a Daily Accommodation Payment, manually.

## What gets indexed

Two fee types are re-rated by the engine:

| Fee type                        | How it is reindexed                                                                                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Basic Daily Fee**             | The rate is set to the current Basic Daily Fee standard rate held on the RACS configuration.                                                                                                                                         |
| **Daily Accommodation Payment** | The rate is scaled by the ratio of the current DAP index number to the index number recorded on the item. The successor records the index its rate was set at, so the next run scales from that index rather than from the original. |

## Fees excluded from indexation

Not every fee is indexed by this engine. The following are deliberately left alone:

* **Daily Accommodation Contribution (DAC)** is excluded. DAC tracks the Maximum Permissible Interest Rate, not the pension or DAP index, so it is not the Indexation Engine's responsibility.
* **Daily Accommodation Payment** is indexed only under the Post 1 November 2025 fee arrangement. Under any other arrangement, including where the arrangement is blank, it is skipped.
* **Hotelling Contribution** and **Non-Clinical Care Contribution** are out of scope for indexation, and are recorded as skipped so the outcome is visible rather than a silent no-op.
* **Any other fee type** is out of scope and skipped.

{% hint style="info" %}
A skipped item is not an error. The engine records why each item was skipped so you can confirm the run did what you expected.
{% endhint %}

## The run summary

Each run writes one summary entry to the **Logs**. It gives the number of fees updated, skipped and failed, and names the skipped and failed fees with the reason for each, up to 250 names, followed by a count of any further fees. Skips that apply to the whole run, such as no Basic Daily Fee standard rate being set, are counted once rather than named for every fee. Each failed fee also has its own error entry.

If the Billing Setting cannot be found, is inactive, or is duplicated, the run stops before any item is touched, and the RACS Configuration tab shows the reason.

## Residents excluded from indexation

An individual Service Agreement can be marked as excluded from automated rate changes using the **Exclude from Automated Rate Changes** checkbox on the Service Agreement. When set, that resident's items are skipped by the Indexation Engine, with the reason named in the run summary, and are removed from the scheduled fee rate check. This is intended for residents whose fees are managed manually, such as short-stay respite residents billed in advance for the whole stay. The manual **Check Fee Rates** action on the agreement is unaffected by the flag.
