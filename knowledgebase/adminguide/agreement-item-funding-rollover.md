---
hidden: true
noIndex: true
---

# Agreement Item Funding Rollover

## Overview

Many NDIS providers structure their Service Agreements as sequential, period-based Agreement Items (for example, quarterly) to match how the NDIS releases funds. When a period ends with unspent funds, those funds need to carry forward to the next period so they are not lost.

**Agreement Item Funding Rollover** automates this process. When an Agreement Item's period ends with a positive remaining balance, Maica transfers that balance to the next matching Agreement Item on the same Service Agreement. You can also trigger rollover manually via a Quick Action on the Agreement Item, and individual items can be excluded from the process entirely.

{% hint style="info" %}
Rollover operates within a single Service Agreement. Cross-Service Agreement rollover is not supported.
{% endhint %}

## Where do I find it?

Rollover runs automatically in the background and does not require manual interaction in most cases. When you do need to trigger it manually, open the relevant Agreement Item record and use the **Process Rollover** Quick Action.

## How it works

### Automatic rollover

Maica runs a scheduled batch job daily (by default at 1:00 AM) that processes Agreement Items whose period ended the previous day. For each eligible item, the system:

1. Calculates the **remaining balance** on the source Agreement Item (Total Allocated minus Expenditure and Committed). Because Total Allocated already includes any prior rollover amounts, this gives the correct remaining funds.
2. Finds the next sequential Agreement Item on the same Service Agreement that matches by **Product** (for stated items) or **Support Category** (for category items).
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

* The source item's financial summary (allocated, expenditure, committed, remaining)
* The auto-detected target item (if one was found)
* An option to select a different target from eligible items on the same Service Agreement

{% hint style="warning" %}
Rollover can only be processed once per Agreement Item. Once processed, the source item cannot be rolled over again, and the target item cannot receive a second rollover.
{% endhint %}

### Target matching logic

When looking for the next sequential Agreement Item, the system applies the following rules:

1. **Same Service Agreement.** The target must belong to the same Service Agreement as the source.
2. **Product or Category match.** The target must share the same Product (for stated items) or the same Support Category (for category items).
3. **Date window.** The target's Start Date must fall on or after the source's End Date, within the configured gap tolerance.
4. **Not excluded.** The target must not have the **Exclude from Rollover** checkbox checked.
5. **Not already received rollover.** The target must not already have a **Rollover Amount In** value.
6. **Earliest wins.** If multiple candidates match, the one with the earliest Start Date is selected.

## Configuring rollover

### Service Agreement settings (Custom Setting)

Navigate to **Service Agreement Settings** (Custom Settings) to configure the following org-wide defaults:

<table><thead><tr><th width="209.5908203125">Setting</th><th>Description</th></tr></thead><tbody><tr><td><strong>Enable Agreement Item Rollover</strong></td><td>Master switch for the automatic rollover batch job. When unchecked, the scheduled job runs but does not process any items.</td></tr><tr><td><strong>Default Rollover Gap Tolerance</strong></td><td>The default maximum number of days allowed between a source item's End Date and a target item's Start Date for automatic matching. Set to <code>1</code> for the standard NDIS pattern where the next period starts the day after the previous one ends (for example, Q1 ends 31 March, Q2 starts 1 April). Set to <code>0</code> only if target periods start on the same day the previous period ends.</td></tr><tr><td><strong>Rollover Processing Time</strong></td><td>The time of day (in 24-hour format, for example <code>01:00</code>) when the daily rollover batch job runs. Defaults to 1:00 AM if not specified.</td></tr></tbody></table>

### Service Agreement-level settings

Each Service Agreement has settings that control rollover behaviour for its Agreement Items:

<table><thead><tr><th width="214.390625">Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>Enable Funding Rollover</strong></td><td>Enables rollover processing for this Service Agreement's items. Must be checked for both automatic and manual rollover to work.</td></tr><tr><td><strong>Rollover Gap Tolerance</strong></td><td>Overrides the org-wide default gap tolerance for this specific Service Agreement. Leave blank to use the org default.</td></tr></tbody></table>

{% hint style="info" %}
The Service Agreement must also have a **Status** of **Active** for the automatic batch job to pick up its items. Manual rollover via the Quick Action does not require Active status.
{% endhint %}

### Agreement Item-level settings

<table><thead><tr><th width="222.4033203125">Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>Exclude from Rollover</strong></td><td>When checked, this item will not participate in the rollover process. It will not send funds to a future period and will not be selected as a target for incoming funds. Use this for one-off purchases, trial periods, or items that should remain budget-isolated.</td></tr></tbody></table>

{% hint style="warning" %}
The **Exclude from Rollover** checkbox must be set before the period ends for it to take effect on the automatic batch job.
{% endhint %}

## Rollover fields on Agreement Item

After rollover has been processed, the following fields are populated on the source and target Agreement Items.

### Source item (funds sent)

<table><thead><tr><th width="240.2109375">Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>Rollover Amount Out</strong></td><td>The amount of unspent funds transferred to the next period.</td></tr><tr><td><strong>Rollover Date Out</strong></td><td>The date when the rollover was processed.</td></tr><tr><td><strong>Rollover Target Item Name</strong></td><td>The name of the Agreement Item that received the funds.</td></tr><tr><td><strong>Rollover Processed</strong></td><td>Checked when rollover processing is complete.</td></tr><tr><td><strong>Rollover Processed Date</strong></td><td>The date when processing occurred.</td></tr></tbody></table>

### Target item (funds received)

<table><thead><tr><th width="244.68359375">Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>Rollover Amount In</strong></td><td>The amount of unspent funds received from the previous period. This amount is automatically incorporated into <strong>Total Allocated</strong>, increasing the net budget.</td></tr><tr><td><strong>Rollover Date In</strong></td><td>The date when the rollover funds were received.</td></tr><tr><td><strong>Rollover Source Item Name</strong></td><td>The name of the Agreement Item that sent the funds.</td></tr></tbody></table>

### How Total Allocated reflects rollover

**Total Allocated** is the net budget field. It is calculated automatically as:

```
Bucket items:  (Quantity × Rate) + Rollover Amount In − Rollover Amount Out
Stated items:  (Total Expenditure + Quantity Remaining × Rate) + Rollover Amount In − Rollover Amount Out
```

After rollover, the source item's Total Allocated decreases (funds moved out) and the target item's Total Allocated increases (funds received). This means **Total Remaining** (Total Allocated minus Expenditure minus Committed) is automatically correct on both items without any additional formula fields.

The Service Agreement-level Total Allocated (a rollup summary of all child Agreement Items) remains unchanged after rollover, because the decrease on the source item exactly offsets the increase on the target item.

## Example walkthrough

Consider a participant with quarterly Agreement Items for Support Coordination:

| Period       | Total Allocated (before rollover) | Expenditure | Remaining |
| ------------ | --------------------------------- | ----------- | --------- |
| Q1 (Jan-Mar) | $5,000                            | $3,200      | $1,800    |
| Q2 (Apr-Jun) | $5,000                            | --          | --        |

{% stepper %}
{% step %}
The batch job runs at 1:00 AM on 1 April.
{% endstep %}

{% step %}
It finds the Q1 item ended yesterday with $1,800 remaining (Total Allocated minus Expenditure and Committed).
{% endstep %}

{% step %}
It matches Q2 as the next sequential item (same product, start date within tolerance).
{% endstep %}

{% step %}
$1,800 is transferred: Q1 gets **Rollover Amount Out** = $1,800, Q2 gets **Rollover Amount In** = $1,800.
{% endstep %}

{% step %}
Total Allocated automatically recalculates on both items:

* Q1's **Total Allocated** decreases to $5,000 − $1,800 = **$3,200** (funds moved out).
* Q2's **Total Allocated** increases to $5,000 + $1,800 = **$6,800** (funds received).
{% endstep %}

{% step %}
Q1's **Total Remaining** = $3,200 − ($3,200 + $0) = **$0** (fully spent or rolled).
{% endstep %}

{% step %}
Q2's **Total Remaining** = $6,800 − ($0 + $0) = **$6,800** (full net budget available).
{% endstep %}
{% endstepper %}

{% hint style="success" %}
The Service Agreement's rollup Total Allocated remains $10,000 throughout. Rollover moves funds between periods, it does not create or destroy them.
{% endhint %}

## Troubleshooting

### Rollover did not run automatically

* Verify **Enable Agreement Item Rollover** is checked in Service Agreement Settings.
* Verify the Service Agreement has **Enable Funding Rollover** checked and **Status** is Active.
* Verify the Agreement Item is not marked as **Exclude from Rollover**.
* Check the **Default Rollover Gap Tolerance**. If set to `0`, the target's Start Date must exactly equal the source's End Date. For the standard NDIS pattern (next period starts the day after), set this to at least `1`.

### "Already been processed" error on the Quick Action

The source Agreement Item has already had rollover processed. Each item can only be rolled over once. Check the **Rollover Processed** checkbox and **Rollover Amount Out** field to see what happened.

### "Already has a rollover amount" error on the Quick Action

The selected target Agreement Item has already received rollover funds from another source. Each target can only receive one rollover. Select a different target item.

### No auto-detected target found

The system could not find a matching Agreement Item. This can happen when:

* No future Agreement Item exists with the same Product or Support Category
* The gap between periods exceeds the configured tolerance
* All matching candidates are excluded from rollover or already have rollover amounts

Use the manual target selection in the Quick Action to choose an eligible item.
