# The Indexation Engine

Several residential aged care rates are reindexed by the government twice a year, on 20 March and 20 September. The indexation engine applies those new rates to every resident's active Agreement Items in one pass, so administrators do not have to re-rate items by hand. It is implemented as the `RAC_IndexationEngine` Apex class.

Unlike the daily billing engine, the indexation engine is run on demand rather than on a schedule. The administrator first updates the published indexation values on the RACS Configuration tab, then runs the engine to push those values onto the Agreement Items.

## How it is triggered

The indexation engine is run from the **Run Indexation action** button in the **Indexed Rates and Supplements** section of the [RACS Configuration tab](../the-racs-configuration-tab/). It sits alongside the Basic Daily Fee standard rate and DAP index number fields, because those are the values it applies. Selecting it runs a single indexation pass over the in-scope Agreement Items.

The button is disabled only when **both** the Basic Daily Fee standard rate and the DAP index number are blank, since with neither value present there is nothing to apply. Its tooltip reads: _"Enter the new BDF rate and DAP index number before running the Indexation Engine."_

Because the engine reads the values stored on the Setting record at the moment it runs, the order of operations matters.

{% hint style="warning" %}
Update the indexation values on the [RACS Configuration tab](../the-racs-configuration-tab/) **before** you run the engine. Enter the new Basic Daily Fee standard rate and the new DAP index number first, then run indexation. Running it against stale values produces stale rates.
{% endhint %}

When you select the button, Maica shows a warning confirmation dialog before it does anything, warning that the run will apply the new rates to all in-scope active Agreement Items and that the action cannot be undone in a single step. You confirm to proceed.

## Indexation scope and timing

When run with no specific scope, the engine processes every active residential Agreement Item. It can also be run against a chosen subset of items, which is useful for re-running a single item or previewing on a small sample.

For each item it updates, the engine stamps the **Last Indexed Date**. It will not index an item that has already been indexed on the same day, so an accidental double-click is harmless: the second run records the item as skipped rather than indexing it twice.

{% hint style="success" %}
Re-running indexation on the same day is safe and does not raise an error. The engine returns a **SUCCESS** toast summarising the run, including a count of items skipped because they were already indexed that day. A same-day re-run simply reports everything as skipped.
{% endhint %}

The engine returns a per-item outcome of **Updated**, **Skipped**, or **Failed**, each with a reason, plus a run-level summary. Per-item errors are isolated so one bad item does not stop the rest. If a Basic Daily Fee item is in scope but the standard rate is missing from the configuration, the whole run stops up front with a clear message, so the administrator can correct the setting before any items are touched.

## What gets indexed

Two fee types are re-rated by the engine:

| Fee type                        | How it is reindexed                                                                                                                                                                     |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Basic Daily Fee**             | The rate is set to the current Basic Daily Fee standard rate held on the RACS configuration.                                                                                            |
| **Daily Accommodation Payment** | The rate is scaled by the ratio of the current DAP index number to the index number captured for that item at entry. This moves the original agreed rate to its present-day equivalent. |

## Fees excluded from indexation

Not every fee is indexed by this engine. The following are deliberately left alone:

* **Daily Accommodation Contribution (DAC)** is excluded. DAC tracks the Maximum Permissible Interest Rate, not the pension or DAP index, so it is not the indexation engine's responsibility.
* **Hotelling Contribution** and **Non-Clinical Care Contribution** are currently out of scope for indexation. They are recorded with a skipped status so the outcome is visible rather than a silent no-op.
* **Any other fee type** is out of scope and skipped.

{% hint style="info" %}
A skipped item is not an error. The engine records why each item was skipped (for example, DAC excluded, already indexed today, or fee type out of scope) so you can confirm the run did what you expected.
{% endhint %}

## Residents excluded from indexation

An individual Service Agreement can be marked as excluded from automated rate changes using the **Exclude from Automated Rate Changes** checkbox on the Service Agreement. When set, that resident's items are removed from the indexation engine's scope, as well as from the scheduled fee rate check. This is intended for residents whose fees are managed manually, such as short-stay respite residents billed in advance for the whole stay. The manual **Check Fee Rates** action on the agreement is unaffected by the flag.
