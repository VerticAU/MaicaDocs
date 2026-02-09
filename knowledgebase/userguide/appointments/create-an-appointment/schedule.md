---
description: Learn about creating Recurring Schedules for Appointments
---

# Schedule

## What is Scheduling in Maica?&#x20;

**Maica** scheduling allows you to create a recurring schedule for your new [Appointment](../../getting-started/maica-key-concepts/appointment.md). Recurring Appointments happen on a regular schedule and **Maica** will create these based on the populated information from completing the following fields:&#x20;

<table><thead><tr><th>Field Name</th><th width="115">Field Type </th><th>Description </th></tr></thead><tbody><tr><td><code>Schedule Start</code> </td><td>Data</td><td>The Start Date of the Recurring Appointment.</td></tr><tr><td><code>Schedule End</code> </td><td>Data </td><td>The End Date of the Recurring Appointment.</td></tr><tr><td><code>Frequency</code> </td><td>Picklist </td><td>This enables the selection of the following values: <code>Daily</code>, <code>Weekly</code>, <code>Monthly</code>, <code>Quarterly</code>, <code>Annually</code></td></tr><tr><td><code>Repeat Every</code> </td><td>Number </td><td>This captures the interval based on the Frequency, for example if <code>Weekly</code> is selected, then the number <code>2</code> means <code>Every 2 weeks</code>.</td></tr></tbody></table>

{% hint style="info" %}
If you do not want to make a **Recurring Appointment Schedule**, simply toggle the `This is a Recurring Appointment` button to off and move on to the next stage.
{% endhint %}

### Inheriting Attributes from Master Appointments

When setting up a new recurring Appointment Schedule, you can control which attributes are copied from the **Master Appointment** to each generated Appointment. This provides greater flexibility when planning recurring services, especially if Participants or Resources aren’t confirmed at the time of setup.

#### Inheritance Options

In the **Schedule** section, you’ll see the following checkboxes:

* `Inherit Participants`
* `Inherit Resources`
* `Inherit Checklists`

{% hint style="success" %}
Ticking a box means the selected attribute will be copied from the Master Appointment to each Appointment in the series.
{% endhint %}

{% hint style="info" %}
Note:&#x20;

* You can choose to **exclude** certain attributes from being inherited. For example, you might leave Participants unticked to assign them manually later.
* These settings only apply when generating **Appointments**. For Shifts, inheritance behaves differently (see [here](../../shifts/create-a-shift/schedule.md)).
{% endhint %}

### Additional Details:&#x20;

When making Recurring Appointments, you have two more configurable options.&#x20;

<figure><img src="../../.gitbook/assets/recurring appointment things to know.png" alt="" width="563"><figcaption></figcaption></figure>

#### 1. Exclude Public Holidays:

When this is toggled on, Maica will exclude any [Appointment](../../getting-started/maica-key-concepts/appointment.md) that falls on a Public Holiday from your Recurring Schedule.&#x20;

* If you create a Recurring Schedule by `End Date` and Public Holidays fall within the specified dates, the Public Holidays will be skipped and the number of appointments in your schedule will be reduced by the number of Public Holidays within the specified dates.&#x20;
* If you create a Recurring Schedule by [`Number of Appointments`](schedule.md#id-2.-schedule-by-number-of-appointments) and Public Holidays fall within your schedule, the Public Holidays will be skipped, but the [`Number of Appointments`](schedule.md#id-2.-schedule-by-number-of-appointments) will remain constant, and the `End Date` will be extended accordingly.&#x20;

{% hint style="info" %}
Maica will alert you if a Public Holiday falls within your schedule. For more information on how to configure Public Holidays within your organisation, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/public-holiday-configuration).&#x20;
{% endhint %}

#### 2. Schedule by Number of Appointments:&#x20;

The scope of your schedule can also be determined by inputing the `Number of Appointments` desired within your recurring schedule (This is a configurable alternative to determining the scope by `End Date`). If the `Number of Appointments` is selected, **Maica** will automatically provide an `End Date` based on the `Start Date`, `Frequency` and `Repeat Every` fields. To toggle between `End Date` and `Number of Appointments`, click the hyperlinked text under the field box.&#x20;

{% hint style="success" %}
**What if I don’t see all future appointments straight away?**

When a Recurring Schedule is created, future Appointments are usually generated automatically up to the [Schedule Horizon](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/general-settings).

In some cases, this can be affected by organisation-level configuration, meaning only the first Appointment appears initially. Editing and saving the schedule again will trigger the remaining Appointments to be created.

This is not an error with your schedule. If you’d like to understand why this can happen, or how to prevent it, please [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/recurring-schedules#recurring-appointments-not-created-to-the-schedule-horizon).&#x20;
{% endhint %}

## Recurring Appointment Cost Breakdown

When creating a Recurring Appointment Schedule, **Maica** calculates the projected cost of the schedule and generates a breakdown like the following:&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-23 at 3.19.27 pm.png" alt="" width="563"><figcaption></figcaption></figure>

The cost calculation is triggered by clicking the `Calculate Cost Breakdown` hyperlink. The breakdown will contain all appointments that fall inside the schedule, including their day of the week, and will provide the following budgeting data:

| Data Location   | Description                                                                                                                                                                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Top Left`      | Time of day [Appointment](../../getting-started/maica-key-concepts/appointment.md) is being held.                                                                                                                                                                                           |
| `Top Right`     | Total cost of the individual [Appointment](../../getting-started/maica-key-concepts/appointment.md).                                                                                                                                                                                        |
| `Bottom Left`   | Total amount of the [Participants](../../getting-started/maica-key-concepts/participant.md) [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) that has been utilised for the specified service to date as a result of the Recurring Appointment Schedule.  |
| `Bottom Right`  | Total budget remaining within the [Participants](../../getting-started/maica-key-concepts/participant.md) [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) at the time the appointment has taken place.                                                   |

{% hint style="info" %}
These costs are calculated based on the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) selected [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) Price List or inputted cost.
{% endhint %}

## Things to look out for: Cost Breakdown

<figure><img src="../../.gitbook/assets/things to look out for recurring appointments.png" alt="" width="563"><figcaption></figcaption></figure>

### 1. Insufficient Budget

When the `Total Remaining` or the `Appointment Cost` amounts are shown in **red**, it means that there are insufficient funds in the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md) [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) to cover the scheduled Appointments. Hence, it is unlikely that payment/claiming/invoicing will be successful.

### 2. No Service Agreement

When the budget data does not show, it means that there is no [Service Agreement](/broken/pages/wxJ2vLb9g5F8oURBcdI3) for the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md).&#x20;

