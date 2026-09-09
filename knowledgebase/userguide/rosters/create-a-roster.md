# Create a Roster

## Overview

A `Roster` groups the `Shifts` for one Location and one period into a single record you can review, approve, and hand over. Creating a Roster sets up that first period and, where the Roster recurs, defines the cadence that future Rosters in the series follow.

Creating a Roster is done from the [Planner](/broken/pages/51d2466397b824771629f8618ddb7b9798b18a93) using the **Manage Roster** modal.

{% hint style="warning" %}
**Prerequisites:** you need access to the Planner, and permission to create Rosters. If you also intend to approve the Roster, you need the Roster approve permission. See [Permission Groups & Sets](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/permission-groups-and-sets) in the Administration Guide.
{% endhint %}

## Steps

{% stepper %}
{% step %}
#### Open the Manage Roster modal

From the Planner, switch to [Roster View](/broken/pages/51d2466397b824771629f8618ddb7b9798b18a93) and choose to create a new Roster. The **Manage Roster** modal opens with the fields pre-filled from your current Planner period.

The modal is made up of detail rows. Click a row to open its editor, and click away from it to collapse it again.
{% endstep %}

{% step %}
#### Set the Schedule window

`Schedule Start` and `Schedule End` define the recurrence horizon: the period across which the series of Rosters will run.

{% hint style="info" %}
`Schedule End` cannot be earlier than `Schedule Start`. If it is, the row is highlighted and the error is listed at the top of the modal.
{% endhint %}

The Roster's own start date follows the Schedule Start. Its end date is derived automatically as one cadence unit from the start, so a Weekly Roster covers one week regardless of how long the Schedule window is.
{% endstep %}

{% step %}
#### Choose the Location

Select the `Location` the Roster covers. Once selected, the Location's address is shown beneath the field so you can confirm you have picked the right one.
{% endstep %}

{% step %}
#### Set the Frequency and Repeat Every

`Frequency` sets the cadence of the series. `Repeat Every` sets how many of those periods pass between one Roster and the next, and defaults to `1`.

| To roster...      | Set Frequency to | Set Repeat Every to |
| ----------------- | ---------------- | ------------------- |
| Every week        | `Weekly`         | `1`                 |
| Every second week | `Weekly`         | `2`                 |
| Every month       | `Monthly`        | `1`                 |

{% hint style="info" %}
**Maica** does not offer a `Fortnightly` frequency. For a fortnightly Roster, set `Frequency` to `Weekly` and `Repeat Every` to `2`. This matches how recurring Appointments and Shifts are configured.
{% endhint %}

{% hint style="warning" %}
`Frequency` and `Repeat Every` can only be set when the Roster is created. Both are locked once the Roster exists, because changing the cadence afterwards would put the series out of step with the Shifts already generated against it.
{% endhint %}

As you set these fields, a recurrence preview shows how many Rosters the series will contain, for example `12 Rosters in this series`. Select **Show details** to see the individual iteration dates.

{% hint style="info" %}
The preview describes the size of the **series**, not what is created when you save. Saving creates the first Roster only. See [What happens when you save](create-a-roster.md#what-happens-when-you-save) below.
{% endhint %}
{% endstep %}

{% step %}
#### Set Inherit Confirmed Resources

`Inherit Confirmed Resources` controls whether the confirmed Resources on a Shift are carried forward onto the Shifts generated for future Rosters in the series. It is switched **off** by default on a new Roster.

{% hint style="success" %}
Leave this off when you expect to allocate Resources fresh each period. Turn it on where the same Resources cover the same Shifts week after week, so you are not re-allocating the whole Roster each time.
{% endhint %}
{% endstep %}

{% step %}
#### Set the Status and Notes

A new Roster is created as `Draft`.

{% hint style="warning" %}
`Approved` is not offered when creating a Roster. A Roster cannot be approved until it has at least one Shift, and a brand new Roster has none. Approve it later, once its Shifts are in place, as described in [Manage a Roster](/broken/pages/fcb5b8294f7ec8d89c9f1c1903acfe972171b528).
{% endhint %}

{% hint style="info" %}
If `Approved` is not offered to you at any point, you may not hold the Roster approve permission. The status list itself is filtered by permission, so the option is hidden rather than shown and refused.
{% endhint %}

Add any `Notes` that the people working from this Roster should see.
{% endstep %}

{% step %}
#### Create

Select **Create**. The Roster is saved and the Planner refreshes with the new Roster selected.

{% hint style="success" %}
You will see a `Roster created successfully` confirmation once the save completes.
{% endhint %}
{% endstep %}
{% endstepper %}

## What happens when you save

Saving creates **one** Roster, the first in the series. The remaining Rosters are not created at this point, even though the preview counted them.

The rest of the series is generated only after the master Roster is approved. Approving it materialises the series forward to the Schedule Horizon, and a scheduled job then keeps rolling it forward over time.

{% hint style="info" %}
To learn more about approving a Roster and how the series rolls forward, see [Manage a Roster](/broken/pages/fcb5b8294f7ec8d89c9f1c1903acfe972171b528). To learn about the Schedule Horizon, see [Recurring Schedules](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/recurring-schedules) in the Administration Guide.
{% endhint %}

## Common Scenarios

| Scenario                                | Outcome                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| You save without adding Shifts          | The Roster is created as `Draft`. Add Shifts to it before approving.                 |
| You set `Repeat Every` to a blank value | It defaults back to `1` rather than saving empty.                                    |
| You double-click **Create**             | Only one Roster is created. The second click is ignored while the save is in flight. |
