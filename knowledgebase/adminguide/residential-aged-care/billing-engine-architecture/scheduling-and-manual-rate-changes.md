# Scheduling and Manual Rate Changes

The residential billing processes are designed to run automatically on a schedule, but administrators also need to intervene directly from time to time, for example to correct a single resident's rate. This article covers how a manual rate change is applied to one Agreement Item.

{% hint style="info" %}
For how the scheduled RACS background jobs (the billing engine, the resident fee rate check, and the held event status check) are configured and enabled, see [Scheduling RACS Background Jobs](scheduling-racs-background-jobs.md).
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
Reducing a Means Tested Care Fee rate shows an advisory before you submit, because the retrospective adjustment will generate a credit for periods already billed at the higher rate.
{% endhint %}

{% hint style="info" %}
The Change Rate action is not available on deactivated rows, nor on the Daily Accommodation Payment and RAD/RAC Retention fee types, which are maintained by the indexation engine and the retention service respectively. See [Configuring Resident Fees](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/the-manage-racs-agreement-component/configuring-resident-fees-tab) in the User Guide.
{% endhint %}
