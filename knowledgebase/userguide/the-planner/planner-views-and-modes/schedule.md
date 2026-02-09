---
description: Learn about the Schedule View in Maica
---

# Schedule

## What information does the Schedule View display?&#x20;

The Schedule View is the default view in Maica. It is an overview of all Planner information and hence displays `Appointments` & `Shifts` .&#x20;

{% hint style="info" %}
Please note, in Calendar View, **Shifts** will be hidden by default. They can be toggled on with a `Show Shifts` filter.&#x20;
{% endhint %}

### Calendar Mode

On Calendar Mode, Schedule View will display your Planner with the above information within a grid based on the days and hours of the [selected period](./#how-do-i-select-my-display-options-in-the-planner).&#x20;

{% hint style="info" %}
Please note that both the cascade effect shown below and the information presented within the cells are configurable. To learn more, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/planner-management).&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2024-09-13 at 10.48.53 am.png" alt=""><figcaption><p>Schedule View on Calendar Mode</p></figcaption></figure>

{% hint style="info" %}
If an Appointment is part of an [Appointment Schedule](../../appointments/create-an-appointment/schedule.md), it will be locked on the Planner and the drag and drop prevented. This same application applies to Completed or Cancelled Appointments.
{% endhint %}

### Timeline Mode

On Timeline Mode, Schedule View will organise your Planner by `Resource(s)`. This will display all of the `Resources` that in use on the left with all of their associated `Appointments` & `Shifts` on the right.

Appointments can be repositioned within the timeline by clicking and dragging them:

* Moving an Appointment **up or down** into another Resource’s row will reallocate the Appointment to that Resource.&#x20;
* If an Appointment does not yet have a Resource, it will appear in the **Unfilled** row on the Planner. From there, it can be dragged into a Resource row to complete the allocation.

The time and date of the Appointment remain fixed when you drag it; only the **Resource assignment** changes.

{% hint style="success" %}
When Drag & Drop functionality is used to reassign an Appointment, Maica will still run all validation.&#x20;
{% endhint %}

{% hint style="info" %}
You can also display all Resource(s), not just those with allocated Appointments, Shifts or Unavailability. To learn more, click [here](../planner-filter/).&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/schedule timeline mode.png" alt=""><figcaption><p>Schedule View on Timeline Mode</p></figcaption></figure>

When you make an Appointment from Timeline Mode in Schedule View, the Appointment will be pre-populated with the Resource of the row on which you created it.

{% hint style="info" %}
Please note that both the Resource Name and their Title presented beneath their name within the Resource cells are configurable. To learn more, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/planner-management).&#x20;
{% endhint %}

A few useful interaction features are available on the Resource cell in Timeline Mode on Schedule View. These are:

<table><thead><tr><th width="110">Number </th><th width="298">Element </th><th>Description</th></tr></thead><tbody><tr><td>1</td><td><code>Resource</code> Location </td><td>This Quick Action opens your <code>Resource(s)</code> location and travel information on Google Maps. It will show a directions to all Appointments and a route between them for the specified Period. </td></tr><tr><td>2</td><td><code>Resource</code> Scheduling Information </td><td>This Tooltip shows your Resource(s) scheduling information taken directly from their <a href="../../resources/resource-profile.md">Resource Profile</a>. </td></tr></tbody></table>
