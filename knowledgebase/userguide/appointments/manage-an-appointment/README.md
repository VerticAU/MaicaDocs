---
description: Learn about managing Appointments in Maica.
---

# Manage an Appointment

## How do I manage an Appointment?

Once an [Appointment](../../getting-started/maica-key-concepts/appointment.md) has been [created](../create-an-appointment/), you may want to change some of its details, such as the Resource(s) or Checklist applicable to it. To begin managing an Appointment, click on the Appointment in your [Planner](../../the-planner/planner-overview.md).

## Standard and Legacy experiences

Maica offers two experiences for creating and managing Appointments. The experience you see depends on your organisation's settings. If your screen does not look like the one described in these pages, contact your administrator.

| Experience                                    | How an Appointment is managed                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Standard Experience](standard-experience.md) | The Appointment opens ready to edit, in a single screen with two steps. Actions are in an **Actions** menu at the top of the details, and a Summary shows what will be delivered and what it will cost before you save |
| [Legacy Experience](legacy-experience.md)     | The Appointment opens read-only, with actions along the bottom of the window. Click **edit** to change its details section by section                                                                                  |

## Editing a recurring Appointment

{% hint style="info" %}
To learn about creating a Recurring Schedule for an Appointment, see [Schedule](../create-an-appointment/general/schedule.md).
{% endhint %}

When editing an Appointment that is part of a Recurring Schedule, you have the following options:

{% hint style="info" %}
When an Appointment is part of a Recurring Schedule, drag and drop on the Planner is prevented.
{% endhint %}

### 1. Edit the `First` Appointment

The first Appointment in a series of Recurring Appointments is the blueprint of what will be created in future Appointments. This includes all details for the Appointment, such as Participant(s), Resource(s), Location, Date & Time Information, etc. This means that any modifications made to the first Appointment will affect all subsequent Recurring Appointments generated, so adjustments should be carefully examined.

Maica will prompt you to confirm that you would like to apply changes to all future Appointments, as shown below.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FGtptQmeed1JG2aBSa2Vx%2Ffirst%20recurring%20appointment.png?alt=media&#x26;token=4f354576-c5d4-4b06-87a9-165e4e3b9671" alt="" width="563"><figcaption></figcaption></figure>

### 2. Edit a `Subsequent` Appointment

Editing any subsequent Appointment within a series of Recurring Appointments gives you the option to either apply changes to just the Appointment being edited or to all future Appointments. Again, Maica will prompt you to confirm which option you would like to apply the changes to, as shown below.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FAMDZMtMq3m0wuxmITtel%2Frandom%20recurring%20appointment.png?alt=media&#x26;token=2f0d9654-d080-47b3-a052-40962fff0800" alt="" width="563"><figcaption></figcaption></figure>

If you select to apply changes only to the **Appointment** being edited, then the updated Appointment retains its link to the _parent_ Appointment Schedule. However, Maica identifies it as a modified Appointment and hence as a "gap" in the schedule, which prevents the creation of any replacement or duplicate Appointment records. This logic is further detailed below:

<details>

<summary>Apply changes only to this Appointment Logic</summary>

When editing a singular Appointment from a Schedule, **Maica** uses the following logic:

* The updated Appointment retains its link to the _parent_ Appointment Schedule.
* Maica identifies the modified Appointment as a "gap" in the schedule and hence prevents the creation of any replacement or duplicate Appointment records.
* This logic aligns with how Maica handles [Cancelled](../appointment-actions/cancellation.md) Appointment records, where the Appointment remains linked to the Appointment Schedule without triggering replacements.

An example of this logic is shown below:

#### Example Inputs:

* `Week Starting`: Monday, 2nd December
* `Frequency`: Daily
* `Scheduled Time`: 9:00 AM - 10:00 AM

**Modification: Appointment for Wednesday, 4th December**

* Moved to 1:00 PM - 2:00 PM
* `Apply Changes Only to This Appointment = TRUE`

When the Appointment for Wednesday, 4th December, is modified, **Maica**:

* Retains the link between the modified Appointment and the parent Appointment Schedule
* Populates the `Original Scheduled Start Date` field with 4th December, 9:00 AM and the `Original Scheduled End Date` field with 4th December, 10:00 AM

During the daily batch process or reevaluation of the Appointment Schedule:

* The system references the `Original Scheduled Start Date` and identifies that this Appointment is still linked to the Appointment Schedule
* No replacement Appointment is created for the original time (9:00 AM - 10:00 AM)

***

#### Outcome:

* The Appointment for Wednesday, 4th December, reflects the updated time (1:00 PM - 2:00 PM) while remaining part of the parent Appointment Schedule
* The system does not generate a duplicate Appointment for the original time (9:00 AM - 10:00 AM), maintaining consistency and avoiding unintended records.

</details>

If you select to apply changes to all future **Appointments**, then the edited Appointment becomes the **Master Appointment** of a new Appointment Schedule and a **new Schedule** is created, beginning from the selected Appointment onwards.

The new Schedule is automatically linked back to the original using the _Previous Schedule_ field (described below), ensuring a clear audit trail and visibility of historical changes.

{% hint style="success" %}
**Previous Schedule Field:** This field shows the original Schedule that this one was created from (e.g. when changes were applied to all future Appointments mid-series).\
\
It helps track the full history of recurring schedule changes and ensures clean separation between old and new appointment series.
{% endhint %}

{% hint style="info" %}
The same logic applies to Manage Unavailability, where the split schedule pattern is also used.
{% endhint %}

{% hint style="info" %}
The **original Schedule is preserved** with all its original values (e.g. `Frequency`, `Interval`) intact. Only the **End Date** of the original Schedule is updated to one day before the new Schedule starts.
{% endhint %}

This prevents unintended changes from being applied to both Schedules and ensures historical accuracy is maintained. The logic is further detailed below:

<details>

<summary>Apply changes to all future Appointments Logic</summary>

An example of this logic is shown below:

***

#### Example Inputs:

* `Week Starting`: Monday, 2nd December
* `Frequency`: Weekly
* `Scheduled Time`: 10:00 AM - 11:00 AM

#### Modification: Appointment for Wednesday, 11th December

* Changed to **Fortnightly**, 2:00 PM - 3:00 PM
* `Apply Changes to Future Appointments = TRUE`

***

#### When this Appointment is modified, _Maica_:

* Creates a **new Schedule** starting from 11th December, with the updated values.
* Sets the 11th December Appointment as the **new Master**.
* Updates the original Schedule to **end on 10th December**, retaining its original settings (Weekly, 10:00 AM - 11:00 AM).
* Ensures no unintended extra Appointments are created on the original Schedule.

***

#### Outcome:

* A clean schedule split occurs:\
  The original Schedule ends as expected, and a new one begins with the updated settings.
* Changes are **only applied to future Appointments**, avoiding duplication and misalignment between schedules.

</details>
