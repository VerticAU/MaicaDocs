# Scheduling and Manual Rate Changes

The residential billing processes are designed to run automatically on a schedule, but administrators also need to intervene directly from time to time, for example to correct a single resident's rate. This article covers how the scheduled RACS jobs are configured and how a manual rate change is applied to one Agreement Item.

## Scheduled runs

Two RACS processes are intended to run on a schedule, each gated by an automation toggle on the [RACS Configuration tab](../the-racs-configuration-tab/):

| Process                                            | What it does                                                        | Cadence                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Billing engine** (`RAC_BillingEngine`)           | Bills every due Agreement Item and rolls up invoices and statements | Daily, typically overnight                                                 |
| **Fee rate check** (`RAC_ResidentFeeCalloutBatch`) | Polls Services Australia for per-resident fee rate changes          | On its configured cadence, only while the fee rate automation toggle is on |

RACS scheduled jobs are managed from the **Schedules** tab in the Billing Settings area, using the same controls as other packaged Maica batch jobs (run time, frequency, start date). Each RACS job appears there when its matching automation toggle is turned on, so the toggle is the control point: turn it on to schedule the job, turn it off to stop it.

The billing engine has a daily schedule and works through its backlog using the catch-up chain (see [Next Billing Date and Catch-Up Chains](next-billing-date-and-catch-up-chains.md)). The fee rate check does no work at all while its toggle is off, even if a schedule exists, so administrators can leave a schedule in place and use the toggle to switch detection on and off.

{% hint style="info" %}
Both engines can also be triggered ad-hoc from the settings area when you need a run immediately rather than waiting for the next scheduled time.
{% endhint %}

{% hint style="warning" %}
The Schedules-tab entries for the RACS billing engine and fee rate check are part of the RACS rollout. Confirm which RACS jobs appear on the Schedules tab in your installed package version, and validate an end-to-end run against a test resident before relying on an automated schedule.
{% endhint %}

## Manual rate changes

When a single resident's rate needs to change, use the **Change Rate** action on the relevant row of the Fees tab rather than editing the fee item directly. Editing a fee item changes the existing record in place, which does not preserve a clean rate history, does not honour a separate effective date, and does not trigger the retrospective correction of any periods already billed. The Change Rate action does all three.

### How a change rate is applied

A manual rate change follows the same add-only pattern the system uses for a rate change detected from Services Australia:

1. The current Agreement Item is end-dated at the day before the effective date.
2. A successor Agreement Item is created at the new rate, starting on the effective date.
3. The retrospective adjustment chain corrects any periods already billed at the old rate within the affected window.

The outcome is identical to the Services Australia Apply Changes path; only the trigger is different.

### Validation

The action enforces a few rules before it will apply the change:

* The new rate must be greater than zero.
* The new rate must be different from the current rate.
* The effective date must be after the item's current start date.
* The effective date must be no more than one month from today.

{% hint style="info" %}
Reducing a Means Tested Care Fee rate shows an advisory before you submit, because the retrospective adjustment will generate a credit for periods already billed at the higher rate. The Change Rate action is not available on deactivated rows.
{% endhint %}
