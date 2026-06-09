---
description: Learn about the Total Committed Calculation in Maica
---

# Total Committed Calculation

In Maica, the **Total Committed** field helps monitor committed funding within a [Service Agreement](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements). It combines [Delivery Activity](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/getting-started/maica-key-concepts/delivery-activity) records and forecasted usage from Recurring Schedules to reflect committed values. The calculation is governed by a global setting and can be adjusted with manual overrides when needed.

{% hint style="info" %}
To learn more about the Global Setting, [click here](../settings/general-settings.md).&#x20;
{% endhint %}

## Overview & Fields

As mentioned, the Total Committed calculation provides visibility into the total expected expenditure under a Service Agreement, combining:

* **Actuals**: Delivery Activities that have been completed and/or invoiced
* **Forecasts**: Recurring schedules and upcoming appointments

The following fields underpin the calculation logic:

| Field                 | Description                                                                                                                                                                                                                 | Where does it sit?              |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `Total Committed`     | Shows the committed funding value for individual service lines.                                                                                                                                                             | **Agreement Item**              |
| `Total Committed`     | Summarises the committed values from all related Agreement Items within a Service Agreement.                                                                                                                                | **Service Agreement** (roll-up) |
| `Committed Override`  | Allows manual control over whether a Delivery Activity is included in the Total Committed calculation. Use `Include` to force inclusion, or `Exclude` to prevent it. _Leave blank to apply system logic_.                   | **Delivery Activity**           |
| `Is Committed`        | <p>Indicates whether the Delivery Activity meets the criteria for the Total Committed calculation based on override settings, status, billing status, and invoice linkage.<br><br><em>Full formula included below</em>.</p> | **Agreement Item** (formula)    |

`Is Committed` Formula:&#x20;

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

## Additional Functionality

* **Quick Action**: Allows you to recalculate Total Committed on a Service Agreement manually as well as preview Total Committed Values for a specified Date Range.

{% hint style="info" %}
Please note, previewing a Committed Value for a specified Date Range via the Quick Action will not populate the field on the Service Agreement, it is strictly a preview.&#x20;
{% endhint %}

{% hint style="info" %}
To learn more about the Total Committed Quick Action, click here.&#x20;
{% endhint %}

* **Scheduled Jobs**: Background jobs clear and process all Delivery Activities when enabled. Job automation is handled via the **Scheduled Jobs** tab.

{% hint style="info" %}
To learn more about the Total Committed Scheduled Job, [click here](../settings/scheduled-jobs.md#total-committed-calculation).&#x20;
{% endhint %}

* **Forecasting Logic**: Includes future Appointment records derived from recurring schedules.

## Example Scenarios

| Action                                                        | Result                                                |
| ------------------------------------------------------------- | ----------------------------------------------------- |
| A Delivery Activity is marked `Exclude`                       | ✅ Omitted from all calculations                       |
| A Delivery Activity is `Completed` but not invoiced           | ✅ Included, unless override = `Exclude`               |
| A Service Agreement contains 5 Agreement Items with forecasts |  ✅ Total Committed shows the combined committed value |
| The global setting is disabled                                | ✅ Calculation is skipped, values remain unchanged     |
