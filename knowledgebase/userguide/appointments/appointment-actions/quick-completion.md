---
description: Learn how to Quick Complete an Appointment and how Maica records the times
---

# Quick Completion

## What is Quick Completing an Appointment?

Quick Completing an [Appointment](../../getting-started/maica-key-concepts/appointment.md) essentially bypasses the checking in/out processes and sets an [Appointment](../../getting-started/maica-key-concepts/appointment.md) to the `Completed` status. It is possible to still capture [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) information whilst Quick Completing an Appointment.

Because the check-in and check-out steps are skipped, **Maica assumes the delivery times from the Appointment's scheduled window** rather than recording them as they happen. Maica marks every Appointment completed this way so that assumed times can be told apart from times your care team actually captured.

## Quick Complete or Confirm Completion?

Maica offers two actions for completing an Appointment without a check-out. They behave differently, and the choice matters when times have already been recorded.

<table><thead><tr><th width="220">Action</th><th>What it does with the times</th></tr></thead><tbody><tr><td><strong>Quick Complete</strong></td><td>Always uses the scheduled window. Any actual times already recorded on the Appointment are replaced, except on an Under Review Appointment, where the recorded times are kept.</td></tr><tr><td><strong>Confirm Completion</strong></td><td>Keeps any actual times already recorded, and fills only a missing start or end from the scheduled window.</td></tr></tbody></table>

{% hint style="warning" %}
Where an Appointment already holds recorded actual times, Quick Complete replaces them and they cannot be changed afterwards. Maica displays a warning in the dialog when this is about to happen. Use **Confirm Completion** instead to keep the recorded times.
{% endhint %}

{% hint style="info" %}
Quick Complete and Confirm Completion refuse an Appointment or Shift that is already **Completed** or **Cancelled**, so a record cannot be completed twice.
{% endhint %}

## What does the Quick Complete Action include?

When Quick Completing an [Appointment](../../getting-started/maica-key-concepts/appointment.md), you are presented with a dialog showing distinct areas of input including **Appointment Date & Time Information**, **Appointment Service Information**, **Manage Travel** as well as **Check-In/Out Location**; these areas are further described in this article.

{% hint style="warning" %}
If you wish to Quick Complete your Appointment without adjusting any of these areas, you can. **Maica** will automatically populate the required ones with information from the Appointment, hence, they only need to be manually adjusted if desired.
{% endhint %}

### Check In/Out Location

This part of the Quick Complete process captures accurate Location information. **Maica** offers the ability for Locations to be tracked to ensure that [Appointments](../../getting-started/maica-key-concepts/appointment.md) can be accurately recorded.

{% hint style="info" %}
In order for a Location to be obtained, the User must have Location Permissions set to Allowed on their Device or Browser.
{% endhint %}

### Appointment Date & Time Information

This part of the Quick Complete process captures the relevant Date & Time information. **Maica** offers configurable capability when Quickly Completing an Appointment to ensure that [Appointments](../../getting-started/maica-key-concepts/appointment.md) can be accurately recorded.

When Quickly Completing your [Appointment](../../getting-started/maica-key-concepts/appointment.md), **Maica** will automatically populate the Date and Time information to the scheduled Date and Time of the Appointment. This can be configured by manually entering any desired Date and Time.

### Manage Travel

When Quick Completing an Appointment, you can also Manage Travel. To learn more about the Manage Travel Action, see the [Manage Travel Tool for Users](check-out.md#manage-travel) and the [Manage Travel Logic for Administrators](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/travel-claiming-and-expenses).

### Appointment Services

This part of the process offers an overview of the [Appointment Service(s)](../../getting-started/maica-key-concepts/appointment-service.md) delivered as well as the ability to adjust the quantity of each service as required. Adjusting the quantity offers you flexibility within an [Appointment](../../getting-started/maica-key-concepts/appointment.md) to control how long each [Participant](../../getting-started/maica-key-concepts/participant.md) may spend for each [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) within an [Appointment](../../getting-started/maica-key-concepts/appointment.md), or how long each Service may have been delivered. This means, if the actual service duration has changed for one or more Participants, this can easily be captured.

{% hint style="info" %}
To learn more about the quantity function, see [Things to look out for in the Summary](../create-an-appointment/general/summary.md#things-to-look-out-for-summary).
{% endhint %}

## Completing an Under Review Appointment

An Appointment is **Under Review** when a check-out raised a review reason, such as a duration, overtime or travel review. Quick Complete is offered on an Under Review Appointment only when **travel is the only review reason** and the user holds the Check-In/Out permission for Appointments, or for Shifts where the record is a Shift. A user who cannot read the Review Reason on the Appointment is not offered Quick Complete there and uses **Confirm Completion** instead. A review with any other reason, such as duration or overtime, is always completed with **Confirm Completion**.

On an Under Review Appointment, Quick Complete behaves like Confirm Completion:

* The recorded times are kept, and the dialog shows them rather than warning that they will be replaced.
* The Check-In/Out Location step is skipped, because kept times do not stamp coordinates.
* The overtime check measures each assigned Resource by the times completion keeps for them: their own recorded time, otherwise the Appointment's recorded time, otherwise the schedule.

### Travel review

Where an Appointment is Under Review for travel, the **Travel review** is shown on both **Quick Complete** and **Confirm Completion**. For each Resource it shows the predicted and the proposed minutes and kilometres, together with the care worker's comment, and lets you choose:

* **Keep predicted**: billing, pay and timesheets use the values Maica calculated.
* **Approve proposed**: billing, pay and timesheets use the values the care worker proposed.

Only users with the Manage Travel permission can choose. Other users see the saved choice read-only. A choice made on screen is also applied to the overtime check, so approving longer travel can raise an overtime warning before the Appointment is completed. See **Reviewing Proposed Travel** for how proposals reach a Coordinator.

## Bulk Quick Complete

Schedule Manager can Quick Complete several Appointments or Shifts at once. A bulk Quick Complete creates the same travel Expenses and travel Timesheet Entries as a single Quick Complete does. A selected record that is already **Completed**, or that is Under Review for a reason other than travel, is refused with a message on its row, and the other selected records are still completed.

## How Maica records the times

Completing an Appointment without a check-out affects three sets of records: the Appointment itself, the Appointment Resources for each assigned care worker, and the Timesheet Entries that follow from them.

### On the Appointment

**Quick Complete** sets the Appointment's Actual Start and Actual End to the scheduled window, stamps the Check-in and Check-out times as the moment you confirmed, and sets the Status to **Completed**.

**Confirm Completion** sets the Status to **Completed** and keeps any recorded actual times, filling only a missing start or end from the scheduled window.

### The Quick Completed field

The **Quick Completed** checkbox on the Appointment records whether the actual times were assumed from the scheduled window rather than recorded by the care team. It is set automatically and is read-only.

<table><thead><tr><th width="260">Action taken</th><th>Actual times on the Appointment</th><th width="150">Quick Completed</th></tr></thead><tbody><tr><td><strong>Quick Complete</strong></td><td>Always taken from the scheduled window</td><td>Ticked</td></tr><tr><td><strong>Confirm Completion</strong>, with both times already recorded</td><td>Both kept as recorded</td><td>Not ticked</td></tr><tr><td><strong>Confirm Completion</strong>, with a start or end missing</td><td>The missing one filled from the schedule</td><td>Ticked</td></tr></tbody></table>

{% hint style="info" %}
**Quick Completed** is set at the point an Appointment is completed and is not applied retrospectively, so Appointments completed before the field existed carry no value.
{% endhint %}

### On each assigned care worker

Completing an Appointment also records the delivery times against each assigned care worker's **Appointment Resource** record, so time is captured per worker rather than only against the Appointment.

For each assigned [Resource](../../getting-started/maica-key-concepts/resource.md), Maica:

* Fills **Actual Start**, **Actual End**, **Check In Time** and **Check Out Time** from the Appointment's actual times, but only where they are blank
* Sets both **Checked In** and **Checked Out**

{% hint style="success" %}
Times a care worker recorded themselves are never overwritten. Where a worker checked in on the Maica Mobile app before the Appointment was completed from the Planner, their own times are kept.
{% endhint %}

Two exclusions apply:

* Only Resources in **Accepted** or **Confirmed** status are recorded. A Resource still **Pending** is left untouched.
* [Assets](../../getting-started/maica-key-concepts/asset.md) are excluded, since an Asset does not record delivery time.

Check-in and check-out **coordinates** are deliberately not recorded on the worker's Appointment Resource. The location available at this point belongs to the person completing the Appointment, not to the care worker who delivered it.

### On Timesheets

Where a care worker has neither a check-in nor a check-out recorded, their **Timesheet Entry** takes its start and end from the Appointment's actual times. A quick-completed Appointment therefore produces a Timesheet Entry with a real duration rather than a zero-length one.

## Quick Complete and Care Minutes reporting

For residential aged care providers, the **Care Minutes Check** distinguishes between minutes recorded worker by worker and minutes taken from the Shift as a whole.

A Shift closed with Quick Complete is counted under **Shift Level Sourced Shifts** on the Care Minutes Check, because its times were assumed rather than recorded by each worker. Those minutes are still included in delivered minutes; they are counted separately so that an external auditor can distinguish shift-level time records from worker-level ones.

{% hint style="warning" %}
**Shift Level Sourced Shifts** also counts Shifts where no individual worker times existed at all. Both cases mean the same thing for an auditor: the minutes came from the Shift rather than from each worker.
{% endhint %}
