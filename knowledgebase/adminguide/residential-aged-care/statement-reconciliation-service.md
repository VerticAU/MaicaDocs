# Statement Reconciliation Service

Services Australia's payment statement reports what it actually paid or recovered for each resident in a claim month. That figure can differ from what Maica has already charged or credited the resident, because of timing, rounding, or part-period calculations. The statement reconciliation service closes that gap by generating a reconciliation adjustment for any difference, using the Services Australia authorised amount as the reference.

This article explains what the service does, when it runs, and how it avoids double-adjusting a period already corrected elsewhere. It is written for administrators and power users who support billing and reconciliation.

{% hint style="info" %}
This service is the counterpart to the [Fee adjustment service](fee-adjustment-service.md). The fee adjustment service corrects charges from Maica's own rate change data; this service corrects them against the figures Services Australia reports. Each is aware of the other so the same period is never adjusted twice.
{% endhint %}

## What the service does

After the payment statement data for a claim month has been brought into Maica as entitlement records, the service compares the amount Services Australia authorised for each resident-facing entitlement against what Maica has already adjusted for the same fee type and month. Where there is a difference, it generates a **Statement Reconciliation** invoice line item to close it:

* A **credit** where Services Australia's figure means the resident was overcharged (for example a means tested fee refund).
* An **additional charge** where the resident was undercharged (for example a reduction that Maica had not yet applied).

The Services Australia authorised amount is treated as the reference figure throughout.

{% hint style="success" %}
Before generating an adjustment, the service nets off any existing **Rate Adjustment** line items for the same agreement item and month. If a rate change correction has already been applied, only the residual difference is reconciled, so the resident is never double-charged or double-credited.
{% endhint %}

## When the service runs

There are two ways the service runs.

### Automatically as part of the monthly claim

When the claim for a month is approved and the payment statement breakdown has been synced, the service runs as the final reconciliation step, provided the **Automate statement reconciliation** setting is switched on. It runs within the same claim sync process and does not make its own calls to Services Australia.

{% hint style="info" %}
The automatic behaviour is controlled by an automation toggle in the RACS configuration. See [Automation toggles](the-racs-configuration-tab/automation-toggles.md). When the toggle is off, reconciliation does not run automatically and can be run manually instead.
{% endhint %}

### Manually for a single resident

You can run the **Run Reconciliation** quick action on a resident's Funding Item record to reconcile that one resident on demand. This is useful when the automatic step is switched off, or when you want to reconcile a specific resident after resolving an issue. The manual path uses the same logic as the automatic path, scoped to the single Funding Item.

## How the reconciliation is worked out

For each resident-facing entitlement reported by Services Australia, the service:

1. **Confirms the payment type is in scope.** Only resident-facing credit and charge types are reconciled. Each in-scope type is mapped to the relevant fee, such as the means tested care fee, income tested fee, daily accommodation contribution, non-clinical care contribution, or hotelling contribution.
2. **Resolves the matching agreement item** for that fee and month on the resident's service agreement.
3. **Nets off existing rate adjustments** already applied for that agreement item and month.
4. **Generates the reconciliation line item** for the remaining difference, as a credit or a charge as appropriate. If there is no remaining difference, nothing is created.

{% hint style="warning" %}
Some payment types cannot be mapped to a single fee with certainty. Where a payment type is ambiguous, the service records the case against the claim batch's sync error details and skips it, then continues processing the remaining entitlements. These skipped cases should be reviewed and resolved manually.
{% endhint %}

## Re-running is safe

If the claim sync is retried on a month that has already been reconciled, the service does not create duplicate adjustments. The check against existing adjustments naturally prevents a second reconciliation of the same period, so providers can safely re-run the claim sync without distorting resident balances.
