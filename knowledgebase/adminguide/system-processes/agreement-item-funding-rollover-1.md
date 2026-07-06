# Agreement Item Funding Rollover

## Overview

Many providers structure their Service Agreements as sequential, period-based Agreement Items (for example, quarterly) to match how funding is released. When a period ends with unspent funds, those funds need to carry forward to the next period so they are not lost.

**Agreement Item Funding Rollover** automates this process. When an Agreement Item's period ends with a positive remaining balance, Maica transfers that balance to the next matching Agreement Item on the same Service Agreement. You can also trigger rollover manually via a Quick Action on the Agreement Item, and individual items can be excluded from the process entirely.

The feature is opt-in at the organisation level, opt-in at the Service Agreement level, and opt-out at the Agreement Item level. This three-layer control ensures rollover only applies where it is intentional, while allowing individual items to be excluded when needed.

{% hint style="info" %}
Rollover operates within a single Service Agreement. Cross-Service Agreement rollover is not supported.
{% endhint %}

## Where do I find it?

Rollover runs automatically in the background and does not require manual interaction in most cases. When you do need to trigger it manually, open the relevant Agreement Item record and use the **Process Rollover** Quick Action.

## How it works

### Automatic rollover

Maica runs a scheduled batch job daily, **Agreement Item Rollover - Daily**, at the configured Processing Time (defaults to 1:00 AM). The batch processes Agreement Items whose period ended the previous day. For each eligible item, the system:

1. Calculates the **remaining balance** on the source Agreement Item (Approved Amount minus Utilised Amount and Total Committed). Because Approved Amount already includes any prior rollover adjustments, this gives the correct remaining funds.
2. Finds the next sequential Agreement Item on the same Service Agreement that matches by **Support Item** (for stated items) or **Support Category** (for category-funded items).
3. If a match is found and the remaining amount is positive, transfers the funds to the target item.
4. Marks the source item as processed and records the audit trail on both items.

{% hint style="success" %}
If the rollover amount is zero or negative (the period was fully spent or overspent), the source item is simply marked as processed with no funds transferred.
{% endhint %}

### Manual rollover

You can also trigger rollover manually using the **Process Rollover** Quick Action on any Agreement Item record. This is useful when:

* You need to roll over funds before the scheduled job runs
* The automatic process did not find a matching target and you want to select one manually
* You want to override the auto-detected target with a different Agreement Item

The Quick Action presents a preview screen showing:

* The source item's financial summary (Approved Amount, Utilised Amount, Total Committed, Remaining)
* The auto-detected target item (if one was found)
* An option to select a different target from eligible items on the same Service Agreement

{% hint style="warning" %}
Rollover can only be processed once per Agreement Item. Once processed, the source item cannot be rolled over again, and the target item cannot receive a second rollover.
{% endhint %}

{% hint style="info" %}
If the parent Service Agreement does not have **Enable Funding Rollover** checked, the Process Rollover modal displays an informative message and the action is not processed. The action does not bypass the Service Agreement-level opt-in.
{% endhint %}

### Target matching logic

When looking for the next sequential Agreement Item, the system applies the following rules:

1. **Same Service Agreement.** The target must belong to the same Service Agreement as the source.
2. **Support Item or Support Category match.** For stated items, the target must share the same Support Item. For category-funded items, the target must share the same Support Category.
3. **Date window.** The target's Start Date must fall on or after the day after the source's End Date, within the configured **Rollover Gap Tolerance**.
4. **Within Service Agreement bounds.** The target's End Date must not extend past the Service Agreement End Date. Rollover never crosses Service Agreement boundaries.
5. **Not excluded.** The target must not have the **Exclude from Rollover** checkbox checked.
6. **Not already received rollover.** The target must not already have a **Rollover Amount In** value.
7. **Earliest wins.** If multiple candidates match, the one with the earliest Start Date is selected.

If no eligible target is found, the source item is marked as **Rollover Processed** (so the batch does not retry it) and no rollover values are recorded.

## Configuring rollover

### Organisation-wide settings

Navigate to **Maica Settings → Agreement Management → Agreement Item Rollover** to configure the following org-wide defaults:

| Setting                                   | Description                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enable Agreement Item Rollover**        | Master switch for the rollover feature. When unchecked, the daily batch job runs but does not process any items, and manual rollover via the Quick Action is also blocked.                                                                                                                                                                                                         |
| **Default Rollover Gap Tolerance (Days)** | The default maximum number of days allowed between a source item's End Date and a target item's Start Date for automatic matching. Set to `1` for the standard NDIS pattern where the next period starts the day after the previous one ends (for example, Q1 ends 31 March, Q2 starts 1 April). Set to `0` only if target periods start on the same day the previous period ends. |
| **Rollover Processing Time**              | The time of day (in 24-hour format, for example `01:00`) when the daily rollover batch job runs. Defaults to 1:00 AM if not specified.                                                                                                                                                                                                                                             |

{% hint style="info" %}
You do not need to schedule the rollover batch job manually. Saving the **Rollover Processing Time** automatically registers the **Agreement Item Rollover - Daily** job in Setup > Scheduled Jobs.
{% endhint %}

### Service Agreement-level settings

Each Service Agreement has settings that control rollover behaviour for its Agreement Items:

| Field                       | Description                                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Enable Funding Rollover** | Enables rollover processing for this Service Agreement's items. Must be checked for both automatic and manual rollover to work. |
| **Rollover Gap Tolerance**  | Overrides the org-wide default gap tolerance for this specific Service Agreement. Leave blank to use the org default.           |

{% hint style="info" %}
The Service Agreement must also have a **Status** of **Active** for the automatic batch job to pick up its items.
{% endhint %}

### Agreement Item-level settings

| Field                     | Description                                                                                                                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Exclude from Rollover** | When checked, this item will not participate in the rollover process. It will not send funds to a future period and will not be selected as a target for incoming funds. Use this for one-off purchases, trial periods, or items that should remain budget-isolated. |

{% hint style="warning" %}
The **Exclude from Rollover** checkbox must be set before the period ends for it to take effect on the automatic batch job.
{% endhint %}

## Rollover fields on Agreement Item

After rollover has been processed, the following fields are populated on the source and target Agreement Items.

### Source item (funds sent)

| Field                         | Description                                                                                                                                    |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rollover Amount Out**       | The amount of unspent funds transferred to the next period.                                                                                    |
| **Rollover Date Out**         | The date when the rollover was processed.                                                                                                      |
| **Rollover Target Item Name** | The name of the Agreement Item that received the funds. Retained as a static audit value (does not break if the target is renamed or deleted). |
| **Rollover Processed**        | Checked when rollover processing is complete. Prevents the batch from re-evaluating items it has already actioned.                             |
| **Rollover Processed Date**   | The date when processing occurred.                                                                                                             |

### Target item (funds received)

| Field                         | Description                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rollover Amount In**        | The amount of unspent funds received from the previous period. This amount is automatically incorporated into **Approved Amount**, increasing the net budget. |
| **Rollover Date In**          | The date when the rollover funds were received.                                                                                                               |
| **Rollover Source Item Name** | The name of the Agreement Item that sent the funds. Retained as a static audit value.                                                                         |

### How Approved Amount reflects rollover

**Approved Amount** is the net budget field. It is calculated automatically as:

```
Category items: (Quantity × Rate) + Rollover Amount In − Rollover Amount Out
Stated items:   Utilised Amount + (Quantity Remaining × Rate) + Rollover Amount In − Rollover Amount Out
```

After rollover, the source item's Approved Amount decreases (funds moved out) and the target item's Approved Amount increases (funds received). This means **Remaining Amount** (Approved Amount minus Utilised Amount minus Total Committed) is automatically correct on both items without any additional formula fields.

The Service Agreement-level Approved Amount (a rollup of all child Agreement Items) remains unchanged after rollover, because the decrease on the source item exactly offsets the increase on the target item.

{% hint style="info" %}
The inline help text on the **Approved Amount** field currently describes only the base calculation (Quantity × Rate, or Utilised Amount plus Quantity Remaining × Rate) and does not yet mention the rollover adjustments. A separate update is in progress to align the field's inline help text with the rollover behaviour.
{% endhint %}

## Example walkthrough

Consider a participant with quarterly Agreement Items for Support Coordination:

| Period       | Approved Amount (before rollover) | Utilised Amount | Remaining |
| ------------ | --------------------------------: | --------------: | --------: |
| Q1 (Jan-Mar) |                            $5,000 |          $3,200 |    $1,800 |
| Q2 (Apr-Jun) |                            $5,000 |              -- |        -- |

{% stepper %}
{% step %}
The batch job runs at 1:00 AM on 1 April.
{% endstep %}

{% step %}
It finds the Q1 item ended yesterday with $1,800 remaining (Approved Amount minus Utilised Amount and Total Committed).
{% endstep %}

{% step %}
It matches Q2 as the next sequential item (same Support Item, Start Date within tolerance).
{% endstep %}

{% step %}
$1,800 is transferred: Q1 gets **Rollover Amount Out** = $1,800, Q2 gets **Rollover Amount In** = $1,800.
{% endstep %}

{% step %}
Approved Amount automatically recalculates on both items:

* Q1's **Approved Amount** decreases to $5,000 − $1,800 = **$3,200** (funds moved out).
* Q2's **Approved Amount** increases to $5,000 + $1,800 = **$6,800** (funds received).
{% endstep %}

{% step %}
Q1's **Remaining Amount** = $3,200 − ($3,200 + $0) = **$0** (fully spent or rolled).
{% endstep %}

{% step %}
Q2's **Remaining Amount** = $6,800 − ($0 + $0) = **$6,800** (full net budget available).
{% endstep %}
{% endstepper %}

{% hint style="success" %}
The Service Agreement's rollup Approved Amount remains $10,000 throughout. Rollover moves funds between periods, it does not create or destroy them.
{% endhint %}

## The Rollover Audit History component

The **Rollover Audit History** component on the Agreement Item record provides a complete log of rollover events involving that item, both as a source and as a target. It is the recommended starting point for any compliance review or audit query about rollover.

Each entry in the audit history shows:

* The date the rollover was applied
* The direction (In or Out)
* The amount
* The other side of the rollover (source or target item name)
* Whether the rollover was applied automatically by the nightly batch or manually via Quick Action

## Interaction with Bulk Update Price List

The **Bulk Update Price List** feature (Maica Settings → Agreement Management) re-prices Agreement Items to the rates in a selected price list, for example when bringing agreements in line with the latest NDIS Price Guide. This feature and Funding Rollover are designed to work together.

When a bulk price update runs, it re-prices all eligible Agreement Items but **intentionally leaves any item that has already been processed for funding rollover unchanged**. Rolled-over items belong to closed, settled periods where the funding figures have already been finalised, so their rates are protected and are not overwritten by the new price list.

{% hint style="info" %}
This is expected behaviour. A bulk price update on a Service Agreement that contains rolled-over items completes cleanly: rolled-over items keep their settled rate, and every other item on the agreement is re-priced to the selected price list as normal.
{% endhint %}

If you need a rolled-over item to reflect a new rate, remember that it represents a period whose funding is already settled. Any adjustment should be made on the current or future period item rather than the closed one.

## Permission Set

The **Maica - Manage Agreement Item Rollover** permission set grants the access required to:

* View the rollover fields on Agreement Items and Service Agreements
* Configure Rollover Settings in Maica Settings
* Use the **Process Rollover** Quick Action

Assign this permission set to any administrators or finance staff who need to configure or action rollover. Users without this permission set can still view Agreement Items normally; rollover-specific fields and actions are simply not visible.

## Troubleshooting

### Rollover did not run automatically

* Verify **Enable Agreement Item Rollover** is checked in Maica Settings → Agreement Management → Agreement Item Rollover.
* Verify the Service Agreement has **Enable Funding Rollover** checked and **Status** is Active.
* Verify the Agreement Item is not marked as **Exclude from Rollover**.
* Check the **Default Rollover Gap Tolerance**. If set to `0`, the target's Start Date must exactly equal the day after the source's End Date. For the standard NDIS pattern (next period starts the day after), set this to at least `1`.

### "Already been processed" error on the Quick Action

The source Agreement Item has already had rollover processed. Each item can only be rolled over once. Check the **Rollover Processed** checkbox and **Rollover Amount Out** field to see what happened. If you need to re-run rollover for a specific item, clear the **Rollover Processed** flag manually and the batch will pick it up on the next run.

### "Already has a rollover amount" error on the Quick Action

The selected target Agreement Item has already received rollover funds from another source. Each target can only receive one rollover. Select a different target item, or clear the existing **Rollover Amount In** value manually before retrying.

### No auto-detected target found

The system could not find a matching Agreement Item. This can happen when:

* No future Agreement Item exists with the same Support Item or Support Category
* The gap between periods exceeds the configured tolerance
* All matching candidates are excluded from rollover or already have rollover amounts
* The matching candidate's End Date extends past the Service Agreement End Date

Use the manual target selection in the Quick Action to choose an eligible item.

### A rolled-over item was not re-priced by a bulk price update

This is expected. The Bulk Update Price List feature deliberately skips Agreement Items that have already been processed for funding rollover, because they belong to closed, settled periods. All other items on the agreement are re-priced as normal. See [Interaction with Bulk Update Price List](agreement-item-funding-rollover-1.md#interaction-with-bulk-update-price-list) above.

## Things to look out for

### Rollover applies only to active Service Agreements

The nightly batch only processes items whose parent Service Agreement has **Enable Funding Rollover** checked **and** Status set to **Active**. Service Agreements that have been deactivated, expired, or closed are not considered.

### Rollover does not cross Service Agreement boundaries

Rollover only applies between Agreement Items on the same Service Agreement. If a Care Recipient has a new Service Agreement starting after the old one ends, unspent funds from the old Service Agreement do not roll over into the new one automatically. This boundary is intentional, since new Service Agreements often involve a renegotiation of funding terms.

### Items already containing a Rollover Amount In are skipped

The matching logic skips any candidate target that already has a Rollover Amount In value. This prevents the same target from receiving rollover from multiple sources in error. If a target needs to receive rollover from a different source, the existing Rollover Amount In value must first be cleared manually.

### Once processed, items are not retried

Source items with **Rollover Processed** set are not re-evaluated by the nightly batch, even if their state subsequently changes. This avoids the batch reprocessing the same item every night. If you need to re-run rollover for a specific item, clear the **Rollover Processed** flag manually and the batch will pick it up on the next run.

### Bulk price updates do not re-price rolled-over items

When you run a Bulk Update Price List, Agreement Items that have already been processed for funding rollover keep their existing rate and are not updated to the new price list. This protects the settled funding figures on closed periods. All other Agreement Items on the agreement are re-priced as normal. This is by design, not an error.
