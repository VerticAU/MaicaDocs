---
description: Learn about managing Appointments in Maica.
---

# Manage an Appointment

## How do I manage an Appointment?

Once an [Appointment](../getting-started/maica-key-concepts/appointment.md) has been [created](create-an-appointment/), you may want to change some of the details, such as the Resource(s) or Checklist applicable to the [Appointment](../getting-started/maica-key-concepts/appointment.md). All this can be done via the Manage Appointment processes outlined in this article.

In order to begin Managing an Appointment, simply click on the Appointment in your Planner. To manage the fields after selecting an [Appointment](../getting-started/maica-key-concepts/appointment.md), click the `edit` button in the bottom right corner of the Manage Appointment screen. Until you click this button, all fields will be `read-only`.

<figure><img src="../.gitbook/assets/edit appointments.png" alt="" width="375"><figcaption><p>Manage an Appointment</p></figcaption></figure>

## Which Appointment sections can I manage?

Once editing, you are able to manage the following sections:&#x20;

### [Basic Details](create-an-appointment/basic-details.md)

In this section you can manage the [Participant(s)](../getting-started/maica-key-concepts/participant.md), [Resource(s)](../getting-started/maica-key-concepts/resource.md) and [Asset(s)](../getting-started/maica-key-concepts/asset.md) allocated to your selected Appointment. Similarly to [Creating an Appointment](create-an-appointment/), you can do this by simply typing the name of a Participant, Resource or Asset (or multiple), or by clicking on the `Filter` icon which allows for [Smart Selection](create-an-appointment/smart-selection-filter.md) of any of the above mentioned.&#x20;

You can also adjust Date & Time Information as well as the Type of [Appointment](../getting-started/maica-key-concepts/appointment.md). This is aimed at showing you quickly who is attending and who is delivering services on what date and and what time.

### [Appointment Services](../getting-started/maica-key-concepts/appointment-service.md)

This section allows you to manage your existing Appointment Service(s) as well as add new Appointment Service(s) if needed.

The following fields are manageable:&#x20;

<figure><img src="../.gitbook/assets/manage appointment services test.png" alt="" width="505"><figcaption></figcaption></figure>

| Number | Detail                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | Click this button to add an additional Appointment Service(s).                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2      | Change the quantity of an [Appointment Service](../getting-started/maica-key-concepts/appointment-service.md) to control how long each [Participant](../getting-started/maica-key-concepts/participant.md) may spend at an [Appointment](../getting-started/maica-key-concepts/appointment.md). The quantity of an [Appointment Service](../getting-started/maica-key-concepts/appointment-service.md) is further explained [here](create-an-appointment/summary.md#id-1.-adjusted-quantity). |
| 3      | Click this button to refresh any changes to your [Appointment Service](../getting-started/maica-key-concepts/appointment-service.md) including an adjustment of quantity. This will update any relevant information including the Service cost.                                                                                                                                                                                                                                               |
| 4      | This number outlines the number of Appointment Service(s) that are connected to your appointment.                                                                                                                                                                                                                                                                                                                                                                                             |
| 5      | Click this button to mark this [Appointment Service](../getting-started/maica-key-concepts/appointment-service.md) as cancelled, this will exclude this Service from your [Appointment](../getting-started/maica-key-concepts/appointment.md).                                                                                                                                                                                                                                                |

{% hint style="warning" %}
If the selected [Participant(s)](../getting-started/maica-key-concepts/participant.md) do not have an Agreement for the added [Appointment Service](../getting-started/maica-key-concepts/appointment-service.md), an error will occur. This error is further detailed [here](create-an-appointment/basic-details.md#id-2.-participant-s-have-no-agreement-for-selected-appointment-service).
{% endhint %}

### [Location](create-an-appointment/location.md)

This section enables the editing of the Location at which the [Appointment](../getting-started/maica-key-concepts/appointment.md) is being held including a lookup to an existing Location, a Participant Mailing Address, a manually-entered Address, or a Digital Location for this [Appointment](../getting-started/maica-key-concepts/appointment.md) only.

{% hint style="success" %}
When managing Location, there is a Recalculate Travel button located in the top right hand corner of the modal. This enhancement allows you to refresh travel times and distances directly within the modal, without needing to update the Origin/Destination values or reload the modal if changes have been made prior.&#x20;
{% endhint %}

### [Additional Details](create-an-appointment/additional-details.md)&#x20;

The focus of this section is to edit the [Shift(s)](../getting-started/maica-key-concepts/shift.md) and [Checklist(s)](../getting-started/maica-key-concepts/checklist.md) applicable to this [Appointment](../getting-started/maica-key-concepts/appointment.md). The [Shift](../getting-started/maica-key-concepts/shift.md) lookup is filtered by active [Shift(s)](../getting-started/maica-key-concepts/shift.md) at the same [Location](../getting-started/maica-key-concepts/location.md) that the [Appointment](../getting-started/maica-key-concepts/appointment.md) is being held.

### [Custom Fields](create-an-appointment/custom-fields.md)&#x20;

The Custom Fields tab captures any information from Custom Fields that have been added to your Organisations Appointment profile beyond what **Maica** offers. This section allows for the management of already added fields, **not** the addition of new fields.&#x20;

### [Recurring Schedule](create-an-appointment/schedule.md)

{% hint style="info" %}
To learn about creating a Recurring Schedule for an Appointment, please click [here](create-an-appointment/schedule.md).
{% endhint %}

When editing a Recurring Schedule, you have the following options:&#x20;

{% hint style="info" %}
Please note, when an Appointment is part of a Recurring Schedule, the drag and drop functionality will be prevented.&#x20;
{% endhint %}

#### 1. Edit the `First` Appointment

The first Appointment in a series of Recurring Appointments is seen to be the blueprint of what will be created in future Appointments. This includes all details for the Appointment, such as Participant(s), Resource(s), Location, Date & Time Information, etc. This means that any modifications made to the first Appointment will affect all subsequent Recurring Appointments generated, thus adjustments should be carefully examined.

Maica will prompt you to confirm that you would like to apply changes to all future Appointments, as shown below.

<figure><img src="../.gitbook/assets/first recurring appointment.png" alt="" width="563"><figcaption></figcaption></figure>

#### 2. E**dit a `Subsequent` Appointment**

Editing any subsequent Appointment within a series of Recurring Appointments gives you the option to either apply changes to just the Appointment being edited or to all future Appointments. Again, Maica will prompt you to confirm which option you would like to apply the changes to, as shown below.



<figure><img src="../.gitbook/assets/random recurring appointment.png" alt="" width="563"><figcaption></figcaption></figure>

If you select to apply changes only to the **Appointment** being edited only, then the updated Appointment retains its link to the _parent_ Appointment Schedule, however Maica identifies it as a modified Appointment and hence as a "gap" in the schedule, which prevents the creation of any replacement or duplicate Appointment records. This logic is further detailed below:&#x20;

<details>

<summary>Apply changes only to this Appointment Logic </summary>

When editing a singular Appointment from a Schedule, **Maica** uses the following logic:&#x20;

* The updated Appointment retains its link to the _parent_ Appointment Schedule.&#x20;
* Maica identifies the modified Appointment as a "gap" in the schedule and hence prevents the creation of any replacement or duplicate Appointment records.&#x20;
* This logic aligns with how the Maica handles [Canceled](appointment-actions/cancellation.md) Appointment records, where the Appointment remains linked to the Appointment Schedule without triggering replacements.&#x20;

An example of this logic is shown below:&#x20;

#### Example Inputs:

* `Week Starting`: Monday, 2nd December
* `Frequency`: Daily
* `Scheduled Time`: 9:00 AM - 10:00 AM

**Modification: Appointment for Wednesday, 4th December**&#x20;

* Moved to 1:00 PM - 2:00 PM
* `Apply Changes Only to This Appointment = TRUE`

When the Appointment for Wednesday, 4th December, is modified, **Maica**:

* Retains the link between the modified Appointment and the parent Appointment Schedule
* Populates the `Original Scheduled Start Date` field with 4th December, 9:00 AM and the `Original Scheduled End Date field` with 4th December, 10:00 AM

During the daily batch process or reevaluation of the Appointment Schedule:

* The system references the `Original Scheduled Start Date` and identifies that this Appointment is still linked to the Appointment Schedule
* No replacement Appointment is created for the original time (9:00 AM - 10:00 AM)

***

#### Outcome:

* The Appointment for Wednesday, 4th December, reflects the updated time (1:00 PM - 2:00 PM) while remaining part of the parent Appointment Schedule
* The system doesn't generates a duplicate Appointment for the original time (9:00 AM - 10:00 AM), maintaining consistency and avoiding unintended records.

</details>

If you select to apply changes to all future **Appointments**, then essentially the edited Appointment becomes the **Master Appointment** of a new Appointment Schedule and a **new Schedule** is created, beginning from the selected Appointment onwards.&#x20;

The new Schedule is automatically linked back to the original using the _Previous Schedule_ field (described below), ensuring a clear audit trail and visibility of historical changes.

{% hint style="success" %}
**Previous Schedule Field:** This field shows the original Schedule that this one was created from (e.g. when changes were applied to all future Appointments mid-series).\
\
It helps track the full history of recurring schedule changes and ensures clean separation between old and new appointment series.
{% endhint %}

{% hint style="info" %}
Note, the same logic will be extended to Manage Unavailability, where the split schedule pattern is also used.
{% endhint %}

{% hint style="info" %}
The **original Schedule is preserved** with all its original values (e.g. `Frequency`, `Interval`) intact. Only the **End Date** of the original Schedule is updated to one day before the new Schedule starts.
{% endhint %}

This prevents unintended changes from being applied to both Schedules and ensures historical accuracy is maintained. The logic is further detailed below:&#x20;

<details>

<summary>Apply changes to all future Appointments Logic </summary>

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

## Saving your Appointment

Once you have made the changes, either click the `Tick` icon to confirm your changes and update your Appointment, or the `Undo` icon on the bottom left of the screen to cancel your changes.

<figure><img src="../.gitbook/assets/save apppointment.png" alt="" width="563"><figcaption></figcaption></figure>
