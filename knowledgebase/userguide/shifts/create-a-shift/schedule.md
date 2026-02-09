---
description: Learn about creating Recurring Schedules for Shifts
---

# Schedule

## What is Scheduling in Maica?&#x20;

**Maica** scheduling allows you to create a recurring schedule for your new [Shift](../../getting-started/maica-key-concepts/shift.md). Recurring Shifts happen on a regular schedule and **Maica** will create these based on the populated information from completing the following fields:&#x20;

<table><thead><tr><th>Field Name</th><th width="115">Field Type </th><th>Description </th></tr></thead><tbody><tr><td><code>Schedule Start</code> </td><td>Data</td><td>The Start Date of the Recurring Shift.</td></tr><tr><td><code>Schedule End</code> </td><td>Data </td><td>The End Date of the Recurring Shift.</td></tr><tr><td><code>Frequency</code> </td><td>Picklist </td><td>This enables the selection of the following values: <code>Daily</code>, <code>Weekly</code>, <code>Monthly</code>, <code>Quarterly</code>, <code>Annually</code></td></tr><tr><td><code>Repeat Every</code> </td><td>Number </td><td>This captures the interval based on the Frequency, for example if <code>Weekly</code> is selected, then the number <code>2</code> means <code>Every 2 weeks</code>.</td></tr></tbody></table>

{% hint style="info" %}
If you do not want to make a **Recurring Shift Schedule**, simply toggle the `This is a Recurring Shift` button to off and move on to the next stage.
{% endhint %}

### Inheriting Attributes from Master Shifts

When setting up a new recurring Shifts Schedule, you can control which attributes are copied from the **Master Shift** to each generated Shift. This provides greater flexibility when planning recurring services, especially if Resources aren’t confirmed at the time of setup.

#### Inheritance Options

In the **Schedule** section, you’ll see the following checkboxes:

* `Inherit Resources`
* `Inherit Checklists`

{% hint style="success" %}
Ticking a box means the selected attribute will be copied from the Master Shift to each Shift in the series.
{% endhint %}

{% hint style="info" %}
Note:&#x20;

* You can choose to **exclude** certain attributes from being inherited. For example, you might leave Checklists unticked to assign them manually later.
{% endhint %}

### Additional Details:&#x20;

When making Recurring Shifts, you have two more configurable options.&#x20;

<figure><img src="../../.gitbook/assets/shift recurring schedule.png" alt=""><figcaption></figcaption></figure>

#### 1. Exclude Public Holidays:

When this is toggled on, Maica will exclude any [Shift](../../getting-started/maica-key-concepts/shift.md) that falls on a Public Holiday from your Recurring Schedule.&#x20;

* If you create a Recurring Schedule by `End Date` and Public Holidays fall within the specified dates, the Public Holidays will be skipped and the number of Shifts in your schedule will be reduced by the number of Public Holidays within the specified dates.&#x20;
* If you create a Recurring Schedule by `Number of Shifts` and Public Holidays fall within your schedule, the Public Holidays will be skipped, but the `Number of Shifts` will remain constant, and the `End Date` will be extended accordingly.&#x20;

{% hint style="info" %}
Maica will alert you if a Public Holiday falls within your schedule. For more information on how to configure Public Holidays within your organisation, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/public-holiday-configuration).&#x20;
{% endhint %}

#### 2. Schedule by Number of Appointments:&#x20;

The scope of your schedule can also be determined by inputing the `Number of Shifts` desired within your recurring schedule (This is a configurable alternative to determining the scope by `End Date`). If the `Number of Shifts` is selected, **Maica** will automatically provide an `End Date` based on the `Start Date`, `Frequency` and `Repeat Every` fields. To toggle between `End Date` and `Number of Shifts`, click the hyperlinked text under the field box.&#x20;
