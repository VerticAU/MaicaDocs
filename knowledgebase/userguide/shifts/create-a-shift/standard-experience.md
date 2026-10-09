---
description: Learn how to create a Shift using the Standard experience in Maica
---

# Standard Experience

{% hint style="info" %}
Maica offers two experiences for creating and managing Shifts, **Standard** and **Legacy**. The experience you see depends on your organisation's settings. If your screen does not look like the one described below, contact your administrator.
{% endhint %}

In the Standard experience, a Shift is created in a single screen with two steps. In the first step you enter the details, editing each one in place. In the second, the **Summary** shows the Shift Services that will be delivered before you save.

{% @arcade/embed url="https://app.arcade.software/share/sqYwiIiwZ0f7pPQbUix5" flowId="sqYwiIiwZ0f7pPQbUix5" %}

## Starting a new Shift

To create a Shift, drag across the [Planner](../../the-planner/planner-overview.md) in the `Roster` or `Shift` view to select a time, or use the [Planner Quick Action](../../the-planner/planner-actions/create-new-appointment.md). Maica pre-populates some details from the Planner view you are in:

| Planner view    | Pre-populated details                         |
| --------------- | --------------------------------------------- |
| **Roster View** | Start and end date and time, and the Resource |
| **Shift View**  | Start and end date and time                   |

The footer shows where you are in the process, as **Step 1 of 2** or **Step 2 of 2**.

## Step 1: entering the details

Under the **Shift Details** heading, each detail of the Shift is a row. Click a row to open it, make your change, and move on to the next. A row you have not filled in yet shows a prompt, such as **Add Date and Time**, **Add Resources** or **Add Services**.

When the details are complete, click **Next** to move to the Summary.

{% hint style="info" %}
The rows shown depend on the sections configured in Maica Settings, so you only see the details your organisation uses. The **Location** row is always shown for a Shift.
{% endhint %}

### Date and time

The **Date and Time** row is required. Enter a start and an end, or a start and a duration, and Maica works out the other.

The times are read in the time zone shown on the row, which you can change. Beneath the row, a subtitle shows the time zone and whether the Shift repeats, for example **Repeats Weekly** or **Does not repeat**.

### Resources

Search for active Resources by name, or click the filter icon to open **Find Resources** for a more detailed search. To learn more, see [Smart Selection Filter](../../appointments/create-an-appointment/general/smart-selection-filter.md).

Beneath the list, **Required** shows how many Resources the Shift needs. Click the number to change it, then tick to confirm. The icon beside it tells you whether the Resources selected match the number required, and hovering it explains why.

Where a Resource carries a warning, such as a possible conflict with their availability, the warning is shown in amber on that Resource. Click it to confirm that the Resource should still be allocated.

### Shift Services

Search for a Shift Service by its name or its tags. Each Service you add becomes its own row. Hover over any icon beside a Service to see what it means. To remove a Service, click its remove icon.

### Location

Every Shift needs a Location. Choose one of your organisation's existing Locations. Where Accommodation is in use, you can also choose an Accommodation at that Location.

### Schedule

To make the Shift repeat, open the **Schedule** row and click **Add Schedule**.

Set the start and end dates, how often the Shift repeats and at what interval. For a weekly schedule, choose the days of the week. You can set the length of the series either by an end date or by a number of Shifts. A schedule can create up to 730 Shifts.

When creating the schedule, you can also choose the following:

| Option                      | What it does                                                            |
| --------------------------- | ----------------------------------------------------------------------- |
| **Inherit Resources**       | Copies the Resources from the Master Shift to each Shift in the series  |
| **Inherit Checklists**      | Copies the Checklists from the Master Shift to each Shift in the series |
| **Exclude Public Holidays** | Leaves out any Shift that falls on a public holiday                     |

Once added, the row shows a one-line summary of the recurrence. To remove the schedule, click **Remove Schedule** (the X on the row).

### Additional details

| Row                           | What it holds                                                                        |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| **Assets**                    | The Assets used during the Shift                                                     |
| **Shift Type**                | The Type of the Shift                                                                |
| **Status**                    | The status the Shift is created with                                                 |
| **Autocomplete Appointments** | Whether the Appointments linked to this Shift are completed automatically. See below |
| **Checklists**                | The Checklists that apply to the Shift                                               |
| **Shift Instructions**        | Instructions for the Resources working the Shift                                     |
| **Custom Fields**             | Any fields your organisation has added to Shifts                                     |

#### Autocomplete Appointments

The **Autocomplete Appointments** toggle completes the Appointments linked to this Shift automatically when the Shift is completed. When it is enabled, the Check-In and Check-Out actions are disabled on those Appointments. The row reads **Enabled** or **Disabled**.

## Step 2: the Summary

The Summary shows what will be delivered before you save. At the top are the **Date and Time**, the **Location** and, where the Shift repeats, the **Schedule**.

Beneath them, the Shift Services are listed with their status. Cost, Quantity and Ratio are not shown for a Shift, and the Funding Source selector is not available.

## Saving the Shift

Click **Submit** to create the Shift. While Maica is checking the Resources and Services, **Next** and **Submit** are greyed out. Anything that stops the Shift being saved is listed above the details.
