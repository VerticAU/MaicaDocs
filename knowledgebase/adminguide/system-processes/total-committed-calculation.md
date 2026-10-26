---
description: Learn about the Total Committed Calculation in Maica
---

# Total Committed Calculation

In Maica, the **Total Committed** field helps monitor committed funding within a [Service Agreement](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements). It combines [Delivery Activity](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/getting-started/maica-key-concepts/delivery-activity) records and forecasted usage from Recurring Schedules to reflect committed values. The calculation is governed by a global setting and can be adjusted with manual overrides when needed.

{% hint style="info" %}
To learn more about the Global Setting, see [General Settings](../settings/general-settings.md).
{% endhint %}

## Overview & Fields

As mentioned, the Total Committed calculation provides visibility into the total expected expenditure under a Service Agreement, combining:

* **Actuals**: Delivery Activities that have been completed and/or invoiced
* **Forecasts**: Recurring schedules and upcoming appointments

The following fields underpin the calculation logic:

| Field                | Description                                                                                                                                                                                                                 | Where does it sit?              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `Total Committed`    | Shows the committed funding value for individual service lines.                                                                                                                                                             | **Agreement Item**              |
| `Total Committed`    | Summarises the committed values from all related Agreement Items within a Service Agreement.                                                                                                                                | **Service Agreement** (roll-up) |
| `Committed Override` | Allows manual control over whether a Delivery Activity is included in the Total Committed calculation. Use `Include` to force inclusion, or `Exclude` to prevent it. _Leave blank to apply system logic_.                   | **Delivery Activity**           |
| `Is Committed`       | <p>Indicates whether the Delivery Activity meets the criteria for the Total Committed calculation based on override settings, status, billing status, and invoice linkage.<br><br><em>Full formula included below</em>.</p> | **Delivery Activity** (formula) |

`Is Committed` Formula:

```apex
IF(
  TEXT(maica__Committed_Override__c) = "Include",
  TRUE,
  IF(
    TEXT(maica__Committed_Override__c) = "Exclude",
    FALSE,
    (
      ISBLANK(TEXT(maica__Committed_Override__c)) &&
      NOT(ISPICKVAL(maica__Status__c, "Cancelled")) &&
      NOT(
        ISPICKVAL(maica__Billing_Status__c, "Do Not Bill") ||
        ISPICKVAL(maica__Billing_Status__c, "Generated")
      ) &&
      ISBLANK(maica__Invoice_Line_Item__c)
    ) ||
    (
      ISBLANK(TEXT(maica__Committed_Override__c)) &&
      ISBLANK(maica__Invoice_Line_Item__c) &&
      ISPICKVAL(maica__Status__c, "Completed")
    )
  )
)
```

## Calculation Logic

Once the [Global Setting](../settings/general-settings.md) is enabled, three background batch jobs are triggered:

* Clear existing values
* Process existing `Delivery Activity` records
* Forecast from uncreated Appointment records based on recurring schedules

{% hint style="info" %}
The forecasting logic includes upcoming Appointments that haven't yet been created in Maica but are implied based on Recurring Appointment Schedules. These expected future services are included in the committed amount to improve budget accuracy.
{% endhint %}

## How Recurring Schedules Are Forecast

The forecast projects each recurring schedule from its last generated Appointment up to the schedule's `End Date`, to a limit of 730 occurrences, and prices every projected date against the Participant's funding.

### Where the projection starts

The frequency of the schedule decides which dates are projected.

| Frequency                 | Dates that are projected                                                                                                                                                                                                                                                     |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Daily`                   | Every date on the schedule's cadence after the last generated Appointment.                                                                                                                                                                                                   |
| `Weekly`                  | Every selected `Schedule Days` day, starting the day after the last generated Appointment so the rest of that week is counted. Where `Repeat Every` is more than 1, only every second, third or later week is projected, counted from the week of the `Schedule Start Date`. |
| `Monthly` and `Quarterly` | Counted from the `Schedule Start Date`, so a series that starts on the 31st keeps the last day of shorter months, for example 28 February and 31 March.                                                                                                                      |
| `Annually`                | Year on year from the last generated Appointment.                                                                                                                                                                                                                            |

Where you preview a Date Range with the quick action, the projection follows the same cadence and counts only the dates inside the range.

### How each date is funded

* Each projected date is matched to an Agreement Item through the Support Item of the Appointment Service.
* The date must fall inside the dates of the Agreement Item and the dates of its Service Agreement. The expiry tolerance is included, so dates inside the tolerance are still counted.
* A Service Agreement that starts part way through the schedule, such as a renewal, funds its own dates. Where an old agreement and its renewal both cover a date inside the old agreement's tolerance, the date goes to the renewal.
* A date with no matching Agreement Item or Support Item is left out on its own, and every other projected date is still counted. For example, a date after the funding end, or a public holiday with no Public Holiday Support Item, is left out.

{% hint style="info" %}
Only a date with no matching Agreement Item or Support Item is left out. A date with a missing Price List Entry is not.
{% endhint %}

### Logs written by the forecast

Where dates are left out, Maica writes one **Warning** to the Logs for the Delivery Activity, with the Source `AgreementItemCalcScheduledCommittedBatch`. It names the Delivery Activity, the Schedule, the number of dates left out and the first date left out, and states whether the figure was for Total Committed or for a Total Committed Date Range. A fully funded schedule writes no Warning.

A committed Delivery Activity that has no matching funding is handled separately. It is not counted, and Maica writes an **Error** to the Logs for it.

## Additional Functionality

* **Quick Action**: Allows you to recalculate Total Committed on a Service Agreement manually as well as preview Total Committed Values for a specified Date Range.

{% hint style="info" %}
Please note, previewing a Committed Value for a specified Date Range via the Quick Action will not populate the field on the Service Agreement, it is strictly a preview.
{% endhint %}

{% hint style="info" %}
To learn more about the Total Committed Quick Action, see [Calculate Total Committed](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements/calculate-total-committed).
{% endhint %}

* **Scheduled Jobs**: Background jobs clear and process all Delivery Activities when enabled. Job automation is handled via the **Scheduled Jobs** tab.

{% hint style="info" %}
To learn more about the Total Committed Scheduled Job, see [Scheduled Jobs](../settings/scheduled-jobs.md#total-committed-calculation).
{% endhint %}

* **Forecasting Logic**: Includes future Appointment records derived from recurring schedules.

## Example Scenarios

| Action                                                            | Result                                                                       |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| A Delivery Activity is marked `Exclude`                           | ✅ Omitted from all calculations                                              |
| A Delivery Activity is `Completed` but not invoiced               | ✅ Included, unless override = `Exclude`                                      |
| A Service Agreement contains 5 Agreement Items with forecasts     | ✅ Total Committed shows the combined committed value                         |
| The global setting is disabled                                    | ✅ Calculation is skipped, values remain unchanged                            |
| A recurring schedule runs past the end of its Service Agreement   | ✅ Only the dates up to the funding end, tolerance included, are counted      |
| One projected date has no matching Agreement Item or Support Item | ✅ That date is left out and a Warning is logged. Every other date is counted |
| A Weekly schedule has dates beyond the Schedule Horizon           | ✅ Every selected day is projected up to the schedule's `End Date`            |
