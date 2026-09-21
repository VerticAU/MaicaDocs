---
description: Learn how to Quick Complete an Appointment and how Maica records the times
---

# Quick Completion

## What is Quick Completing an Appointment?

Quick Completing an Appointment essentially bypasses the checking in/out processes and sets an Appointment to the `Completed` status. It is possible to still capture Appointment Service information whilst Quick Completing an Appointment.

Because the check-in and check-out steps are skipped, **Maica assumes the delivery times from the Appointment's scheduled window** rather than recording them as they happen. Maica marks every Appointment completed this way so that assumed times can be told apart from times your care team actually captured.

## Quick Complete or Confirm Completion?

Maica offers two actions for completing an Appointment without a check-out. They behave differently, and the choice matters when times have already been recorded.

<table><thead><tr><th width="220">Action</th><th>What it does with the times</th></tr></thead><tbody><tr><td><strong>Quick Complete</strong></td><td>Always uses the scheduled window. Any actual times already recorded on the Appointment are replaced.</td></tr><tr><td><strong>Confirm Completion</strong></td><td>Keeps any actual times already recorded, and fills only a missing start or end from the scheduled window.</td></tr></tbody></table>

{% hint style="warning" %}
Where an Appointment already holds recorded actual times, Quick Complete replaces them and they cannot be changed afterwards. Maica displays a warning in the dialog when this is about to happen. Use **Confirm Completion** instead to keep the recorded times.
{% endhint %}

## What does the Quick Complete Action include?

When Quick Completing an Appointment, you are presented with a dialog showing distinct areas of input including **Appointment Date & Time Information**, **Appointment Service Information**, **Manage Travel** as well as **Check-In/Out Location**; these areas are further described in this article.

{% hint style="warning" %}
If you wish to Quick Complete your Appointment without adjusting any of these areas, you can. **Maica** will automatically populate the required ones with information from the Appointment, hence, they only need to be manually adjusted if desired.
{% endhint %}

### Check In/Out Location

This part of the Quick Complete process captures accurate Location information. **Maica** offers the ability for Locations to be tracked to ensure that Appointments can be accurately recorded.

{% hint style="info" %}
In order for a Location to be obtained, the User must have Location Permissions set to Allowed on their Device or Browser.
{% endhint %}

### Appointment Date & Time Information

This part of the Quick Complete process captures the relevant Date & Time information. **Maica** offers configurable capability when Quickly Completing an Appointment to ensure that Appointments can be accurately recorded.

When Quickly Completing your Appointment, **Maica** will automatically populate the Date and Time information to the scheduled Date and Time of the Appointment. This can be configured by manually entering any desired Date and Time.

### Manage Travel

When Quick Completing an Appointment, you can also Manage Travel. To learn more about the Manage Travel Action, please click here:

1. Manage Travel Tool for Users
2. [Manage Travel Logic for Administrators](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/travel-claiming-and-expenses)

### Appointment Services

This part of the process offers an overview of the Appointment Service(s) delivered as well as the ability to adjust the quantity of each service as required. Adjusting the quantity offers you flexibility within an Appointment to control how long each Participant may spend for each Appointment Service within an Appointment, or how long each Service may have been delivered. This means, if the actual service duration has changed for one or more Participants, this can easily be captured.

{% hint style="info" %}
To learn more about the quantity function, click here.
{% endhint %}

## How Maica records the times

Completing an Appointment without a check-out affects three sets of records: the Appointment itself, the Appointment Resources for each assigned care worker, and the Timesheet Entries that follow from them.

### On the Appointment

**Quick Complete** sets the Appointment's Actual Start and Actual End to the scheduled window, stamps the Check-in and Check-out times as the moment you confirmed, and sets the Status to **Completed**.

**Confirm Completion** sets the Status to **Completed** and keeps any recorded actual times, filling only a missing start or end from the scheduled window.

### The Quick Completed field

The **Quick Completed** checkbox on the Appointment records whether the actual times were assumed from the scheduled window rather than recorded by the care team. It is set automatically and is read-only.

<table><thead><tr><th width="260">Action taken</th><th>Actual times on the Appointment</th><th width="150">Quick Completed</th></tr></thead><tbody><tr><td><strong>Quick Complete</strong></td><td>Always taken from the scheduled window</td><td>Ticked</td></tr><tr><td><strong>Confirm Completion</strong>, with both times already recorded</td><td>Both kept as recorded</td><td>Not ticked</td></tr><tr><td><strong>Confirm Completion</strong>, with a start or end missing</td><td>The missing one filled from the schedule</td><td>Ticked</td></tr></tbody></table>

{% hint style="info" %}
**Quick Completed** is set at the point an Appointment is completed and is not applied retrospectively, so Appointments completed before your organisation upgraded to V2.25 carry no value.
{% endhint %}

### On each assigned care worker

Completing an Appointment now also records the delivery times against each assigned care worker's **Appointment Resource** record, so time is captured per worker rather than only against the Appointment.

For each assigned Resource, Maica:

* Fills **Actual Start**, **Actual End**, **Check In Time** and **Check Out Time** from the Appointment's actual times, but only where they are blank
* Sets both **Checked In** and **Checked Out**

{% hint style="success" %}
Times a care worker recorded themselves are never overwritten. Where a worker checked in on the Maica Mobile app before the Appointment was completed from the Planner, their own times are kept.
{% endhint %}

Two exclusions apply:

* Only Resources in **Accepted** or **Confirmed** status are recorded. A Resource still **Pending** is left untouched.
* Assets are excluded, since an Asset does not record delivery time.

Check-in and check-out **coordinates** are deliberately not recorded on the worker's Appointment Resource. The location available at this point belongs to the person completing the Appointment, not to the care worker who delivered it.

### On Timesheets

Where a care worker has neither a check-in nor a check-out recorded, their **Timesheet Entry** now takes its start and end from the Appointment's actual times. A quick-completed Appointment therefore produces a Timesheet Entry with a real duration rather than a zero-length one.

## Quick Complete and Care Minutes reporting

For residential aged care providers, the **Care Minutes Check** distinguishes between minutes recorded worker by worker and minutes taken from the Shift as a whole.

A Shift closed with Quick Complete is counted under **Shift Level Sourced Shifts** on the Care Minutes Check, because its times were assumed rather than recorded by each worker. Those minutes are still included in delivered minutes; they are counted separately so that an external auditor can distinguish shift-level time records from worker-level ones.

{% hint style="warning" %}
**Shift Level Sourced Shifts** also counts Shifts where no individual worker times existed at all. Both cases mean the same thing for an auditor: the minutes came from the Shift rather than from each worker.
{% endhint %}
