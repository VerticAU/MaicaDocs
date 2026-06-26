# Automation Toggles

The **Automation** section of the [RACS Configuration tab](./) holds two toggles that control whether scheduled background processes are allowed to run. Both are checkboxes, both default to **off**, and both should be left off until the process they control has been validated against test data.

{% hint style="danger" %}
Turn these toggles on only after you have validated the automated process against test residents or test claims. Enabling automation before the process has been checked can apply rate changes or generate adjustment invoices across live residents without review.
{% endhint %}

## Automate Resident Fee Rate Updates

This toggle controls how resident fee rate changes published by Services Australia are applied.

| Field                                  | Type     | Default | On-screen help text                                                                                                                                |
| -------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automate Resident Fee Rate Updates** | Checkbox | Off     | Turn on to allow the Resident Fee Rate Update batch job to be scheduled. Leave off to restrict rate checking to the manual Check Fee Rates action. |

**When on:** the scheduled fee rate batch job becomes available to schedule from the **Schedules** tab of the Billing Settings component. Once scheduled, it checks for fee rate changes from Services Australia and applies them to active Agreement Items on a recurring basis.

**When off:** the scheduling controls are hidden, and fee rate changes must be applied manually using the **Check Fee Rates** button on each agreement.

{% hint style="info" %}
Turning the toggle on makes the batch job schedulable; it does not start the job. You still configure the schedule on the Billing Settings Schedules tab. For how the rate check works, see [Fee Detection and Rate Updates](../billing-engine-architecture/fee-detection-and-rate-updates.md).
{% endhint %}

## Automate Statement Reconciliation

This toggle controls whether reconciliation adjustments are generated automatically after a Services Australia payment statement is synced.

| Field                                 | Type     | Default | On-screen help text                                                                                                         |
| ------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Automate Statement Reconciliation** | Checkbox | Off     | Turn on to automatically reconcile payment statements after sync. Turn off to run reconciliation manually per Funding Item. |

**When on:** after the monthly Services Australia payment statement is synced, Maica automatically compares actual payments against billed amounts and generates the reconciliation adjustment invoices needed to close any gap.

**When off:** reconciliation must be run manually for each affected Funding Item using the **Run Reconciliation** quick action.

{% hint style="info" %}
For the reconciliation logic itself, see [Statement Reconciliation Service](../statement-reconciliation-service.md).
{% endhint %}
