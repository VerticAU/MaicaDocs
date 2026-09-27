# Public Holiday Configuration

## How does Maica identify Public Holidays?

Maica uses Salesforce **Business Hours** and **Holidays** to decide whether a date is a Public Holiday. This affects three things in Maica:

* **Pricing and funding:** a service that falls on a Public Holiday uses Support Items with a **Service Day** of `Public Holiday`.
* **Recurring schedules:** when **Exclude Public Holidays** is switched on, Maica skips any occurrence that falls on a Public Holiday.
* **Alerts:** Maica alerts you when a Public Holiday falls within a recurring schedule.

Maica looks at two kinds of Business Hours calendar:

| Calendar     | Business Hours Name                                       | Applies to                                  |
| ------------ | --------------------------------------------------------- | ------------------------------------------- |
| **National** | `Maica Holidays`                                          | Every Appointment and Shift, in every state |
| **State**    | `Maica Holidays (VIC)`, `Maica Holidays (NSW)`, and so on | Only Appointments and Shifts in that state  |

A date is treated as a Public Holiday when it is a Holiday on the national calendar **or** on the calendar for the Appointment's state.

{% hint style="warning" %}
Maica does not read the name of a **Holiday** record. A Holiday becomes national or state based **only** through the Business Hours calendar it is linked to. Adding a state suffix such as `(VIC)` to a Holiday's name has no effect.
{% endhint %}

### How Maica determines the Appointment's state

Maica takes the state from the first of the following fields that has a value:

1. The **State** (`Address_State__c`) of the Appointment's **Location**
2. The **Participant State** on the Appointment
3. The **State** on the Appointment

If none of these fields has a value, only the national `Maica Holidays` calendar applies.

{% hint style="danger" %}
These are free text fields. For state based holidays to apply, they must contain the short state code exactly as shown in the table below (for example `VIC`, not `Victoria` or `Vic.`). A full state name will not match any state calendar, and that state's holidays will be silently ignored.
{% endhint %}

| State                        | State code | State calendar name    |
| ---------------------------- | ---------- | ---------------------- |
| Victoria                     | `VIC`      | `Maica Holidays (VIC)` |
| New South Wales              | `NSW`      | `Maica Holidays (NSW)` |
| Queensland                   | `QLD`      | `Maica Holidays (QLD)` |
| Western Australia            | `WA`       | `Maica Holidays (WA)`  |
| South Australia              | `SA`       | `Maica Holidays (SA)`  |
| Tasmania                     | `TAS`      | `Maica Holidays (TAS)` |
| Australian Capital Territory | `ACT`      | `Maica Holidays (ACT)` |
| Northern Territory           | `NT`       | `Maica Holidays (NT)`  |

## Setting up your Business Hours calendars

You need one national calendar, plus one calendar for each state in which you deliver services and observe state based holidays. You only need state calendars for the states you operate in.

{% stepper %}
{% step %}
#### Head to `Setup` and search for `Business Hours`

In Salesforce `Setup`, search for `Business Hours` and open it.

<figure><img src="../.gitbook/assets/image (26).png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Create the national calendar

Click `New Business Hours` and complete the fields below.

| Field                   | Value                                                                                                                                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Business Hours Name** | `Maica Holidays` (exactly as shown)                                                                                                                                                                                                                                                           |
| **Active**              | Ticked                                                                                                                                                                                                                                                                                        |
| **Time Zone**           | The easternmost time zone your Appointments use. For most organisations this is `(GMT+10:00/+11:00) Australian Eastern Standard Time (Australia/Sydney)` or the Melbourne equivalent. See [Choosing the right time zone](public-holiday-configuration.md#choosing-the-right-time-zone) below. |
| **Business Hours**      | Leave the default of **24 Hours** ticked for **every day**, Sunday to Saturday                                                                                                                                                                                                                |

Click `Save`.
{% endstep %}

{% step %}
#### Create a calendar for each state

Repeat the previous step for each state you need, using the state calendar name from the table above.

| Field                   | Value                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Business Hours Name** | `Maica Holidays (` + state code + `)`, for example `Maica Holidays (WA)`             |
| **Active**              | Ticked                                                                               |
| **Time Zone**           | The time zone of that state, for example `Australia/Perth` for `Maica Holidays (WA)` |
| **Business Hours**      | Leave the default of **24 Hours** ticked for **every day**, Sunday to Saturday       |

{% hint style="danger" %}
Use the short state code in brackets only. Do not use full state names such as `Maica Holidays New South Wales`. Maica matches the state code anywhere in the calendar name, so a `WA` Appointment would also match "New South **Wa**les" and pick up NSW holidays.
{% endhint %}

{% hint style="warning" %}
Do not create any other active Business Hours whose name begins with `Maica Holidays`, and create only one calendar per state. Deactivate or rename any old calendars, such as those created under earlier instructions.
{% endhint %}
{% endstep %}
{% endstepper %}

### Why every calendar must be 24 hours, every day

Maica checks each date at the very start of the day (00:00). If a `Maica Holidays` calendar is not open at 00:00 on a given day, Maica treats that day as a Public Holiday.

This means a calendar with standard office hours (for example 9:00 AM to 5:00 PM, Monday to Friday) makes **every date** a Public Holiday. The most common symptom is that Appointments cannot be saved because no Agreement or Support Item exists for a Public Holiday service.

### Choosing the right time zone

Maica checks each date at 00:00 in the **Appointment's** time zone. This is the **Time Zone** on the Appointment, or your organisation's default time zone if the Appointment has none. To learn how an Appointment's time zone is set, see [Maica Timezone Management](/broken/pages/f19aff7ac15d4585702ad511d2b1a4e039bac3f0).

A calendar's time zone must be the **same as, or east of,** the Appointments it applies to. If the calendar is west of the Appointment, 00:00 in the Appointment's time zone is still the previous day on the calendar, and Maica checks the wrong date.

| Calendar                    | Recommended time zone                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `Maica Holidays` (national) | Australia/Sydney or Australia/Melbourne, because it applies to Appointments in every state |
| State calendars             | The time zone of that state                                                                |

{% hint style="warning" %}
Do not set the national calendar to Brisbane or Perth time if you deliver services in states that observe daylight saving. During daylight saving, Maica would check the day before the holiday for Appointments in those states.
{% endhint %}

## Adding Holidays

{% stepper %}
{% step %}
#### Head to `Setup` and search for `Holidays`

In Salesforce `Setup`, search for `Holidays` and open it.

<figure><img src="../.gitbook/assets/image (24).png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Create a new Holiday

Click `New` and enter the Holiday details.

| Field            | Value                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| **Holiday Name** | Any descriptive name, for example `Melbourne Cup` or `Christmas Day`. The name is for your reference only. |
| **Date**         | The date of the holiday                                                                                    |
| **Time**         | Select **All Day**                                                                                         |

Click `Save`.

<figure><img src="../.gitbook/assets/image (25).png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Link the Holiday to the right calendar

Open the Holiday, click `Add/Remove` under **Business Hours**, and move the correct calendar into **Selected Business Hours**.

<figure><img src="../.gitbook/assets/image (27).png" alt=""><figcaption></figcaption></figure>

| Holiday type                                     | Link it to                                                                     | Example                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------- |
| **National** (observed in every state)           | `Maica Holidays` only                                                          | Christmas Day                                       |
| **State based** (observed in one or more states) | The calendar for **each** state that observes it, and **not** `Maica Holidays` | Melbourne Cup linked to `Maica Holidays (VIC)` only |

Click `Save`.

<figure><img src="../.gitbook/assets/image (28).png" alt=""><figcaption></figcaption></figure>

{% hint style="danger" %}
Never link a state based holiday to the national `Maica Holidays` calendar. Every Holiday on that calendar applies to all Appointments in every state.
{% endhint %}

{% hint style="success" %}
A holiday observed in several states, but not nationally, can be linked to several state calendars. For example, link a holiday to both `Maica Holidays (NSW)` and `Maica Holidays (ACT)` if it applies in both.
{% endhint %}
{% endstep %}
{% endstepper %}

## Updating an existing Public Holiday setup

Earlier versions of this article told you to add a state suffix to the Holiday name, such as `Melbourne Cup (VIC) (Victoria)`, and to link every Holiday to `Maica Holidays`. With that setup, every state based holiday applies nationally.

If your organisation followed those instructions, update it as follows:

{% stepper %}
{% step %}
#### Create the state calendars you need

Create the state calendars you need, as described in [Create a calendar for each state](public-holiday-configuration.md#3.-create-a-calendar-for-each-state).
{% endstep %}

{% step %}
#### Update state based Holidays

For each state based Holiday, click `Add/Remove`, remove `Maica Holidays`, and add the matching state calendar.
{% endstep %}

{% step %}
#### Confirm national Holidays

Leave national Holidays linked to `Maica Holidays` only.
{% endstep %}

{% step %}
#### Remove old or incorrectly named calendars

Deactivate any other active Business Hours whose name begins with `Maica Holidays`, and rename any state calendars that use full state names.
{% endstep %}

{% step %}
#### Check calendar hours and time zones

Check that every `Maica Holidays` calendar is set to 24 hours on every day and uses a suitable time zone.
{% endstep %}

{% step %}
#### Check state field values

Check that the **State** on your Locations, and the state fields on your Appointments, use the short state codes.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
You do not need to rename existing Holidays. The state suffix in a Holiday's name is ignored, so it does no harm, but you may remove it for clarity.
{% endhint %}

## Troubleshooting

| Symptom                                                                                  | Likely cause                                                                                      | Fix                                                                                |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| A state holiday is treated as a Public Holiday in every state                            | The Holiday is linked to `Maica Holidays`                                                         | Remove `Maica Holidays` from the Holiday and link it to the state calendar instead |
| Appointments in one state pick up another state's holidays                               | A state calendar uses a full state name, or more than one calendar matches the state              | Rename state calendars to the bracketed short codes and remove duplicates          |
| A state holiday is never treated as a Public Holiday                                     | The Location or Appointment state is blank or uses a full name, or the state calendar is inactive | Use the short state code, and make sure the state calendar is active               |
| Every date is treated as a Public Holiday                                                | A `Maica Holidays` calendar is not set to 24 hours on every day                                   | Tick **24 Hours** for all seven days on every `Maica Holidays` calendar            |
| The day before a holiday is treated as a Public Holiday, or the holiday itself is missed | The calendar's time zone is west of the Appointment's time zone                                   | Move the calendar to the Appointment's time zone or further east                   |
| Only part of a holiday is recognised                                                     | The Holiday was not created as **All Day**                                                        | Edit the Holiday and select **All Day**                                            |
