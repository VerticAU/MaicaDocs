---
description: Discover the Appointments Actions possible in Maica.
---

# Appointment Actions

## What are Appointment Actions?

Appointment actions refer to actions and tasks related to managing and handling your [Appointment](../../getting-started/maica-key-concepts/appointment.md). There are several actions you can take within an Appointment in Maica, including the following:

| Appointment Actions                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Check-In](check-in.md)                                 | <p>Checking into Appointments sets the baseline for generating Timesheets as well as Invoices. Whilst this is not a mandated process, it is recommended to track your care team's movements as well as time spent.<br><br>If allowed by the User, the Checking-In process also captures the geolocation of the Appointment Check-In.</p>                                                                                                                                                                                                                                                   |
| [Check-Out](check-out.md)                               | <p>Similar to Checking-In, Checking-Out of Appointments sets the endpoint for Timesheets as well as Invoices. Again, whilst this is not a mandated process, it is recommended to track your care team's movements as well as time spent.<br><br>In addition to mirroring much of the Check-In experience, when Checking-Out, you are also able to stipulate who is Checking-Out and how much time has been spent on each Appointment Service delivered during the Appointment.<br><br>If allowed by the User, Checking-Out also captures the geolocation of the Appointment Check-Out.</p> |
| [Quick Completion](quick-completion.md)                 | Quick completing an Appointment bypasses the checking in/out processes and sets an Appointment to the completed status with a single click. It is possible to still capture Appointment Service information whilst doing this.                                                                                                                                                                                                                                                                                                                                                             |
| [Cancellation](cancellation.md)                         | The cancellation of an Appointment records the reason and sets the status to cancelled as well as any associated Delivery Activities. The Appointments is not deleted but placed into a cancelled status allowing you to charge for cancellations.                                                                                                                                                                                                                                                                                                                                         |
| [Attach Files](attach-files.md)                         | This provides for the ability to attach files to any given Appointment, including photos taken on a mobile device. These files are stored against the Salesforce Appointment record.                                                                                                                                                                                                                                                                                                                                                                                                       |
| [Participant Signatures](participant-signatures.md)     | This allows you to record signatures for each Participant who is associated with an Appointment. Signature files are captured as timestamped images against the Salesforce Appointment record.                                                                                                                                                                                                                                                                                                                                                                                             |
| [Appointment Breaks](appointment-breaks.md)             | The management of breaks that might occur during Appointments can become important and this action allows you to record any breaks taken, whether billable or not during any given Appointment.                                                                                                                                                                                                                                                                                                                                                                                            |
| [Appointment Expenses](appointment-expenses.md)         | Appointment Expenses allows you to add Expense records against a Resource that may occur during a Shift, such as having to pay a for a Parking Spot.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [Participant Notes](participant-notes.md)               | It is possible to take Participant Notes during the management of an Appointment at any time, including for already completed Appointments.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [Checklists](checklists.md)                             | Checklists allow you to complete a set of pre-defined tasks that have been set (via Maica Checklists) for each Appointment Service delivered during the Appointment.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Appointment Incidents                                   | Appointment Incidents allows you to record and manage incidents that occur during an Appointment. On desktop, this action is available in the Standard experience.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [Open Appointment Profile](open-appointment-profile.md) | This opens the Salesforce Appointment profile which allows you to see all relevant Appointment information using the native Salesforce platform.                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [Google Maps](google-maps.md)                           | The Google Maps action opens the directions to the Appointment from a number of selectable starting points in Google Maps, directly from the Appointment.                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## How do I access the Appointment Actions?

{% hint style="info" %}
Maica offers two experiences for creating and managing Appointments, **Standard** and **Legacy**. The experience you see depends on your organisation's settings. If your screen does not look like one of those shown below, contact your administrator.
{% endhint %}

The Appointment Actions work the same way in both experiences, and each opens the same dialog. The difference is where you find them.

To begin actioning an Appointment, click on the Appointment in your [Planner](../../the-planner/planner-overview.md).

### Standard experience

In the Standard experience, the Appointment opens ready to edit. The available actions are listed in the **Actions** menu, beside the heading at the top of the Appointment's details. The menu is available at any time while the Appointment is open, including while you are making changes.

### Legacy experience

In the Legacy experience, click the `View` button once the Appointment is selected. The available actions are shown along the bottom of the window while the Appointment is read-only, other than the `Open Appointment Profile` action, which is in the top right corner.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2Fg139YikiqGe5uR8ng9VG%2Fappointment%20actions%20new.png?alt=media&#x26;token=65a40bca-e4bf-4c0a-8069-69b3ef6a9c7f" alt="" width="375"><figcaption><p>Legacy</p></figcaption></figure>

### Quick Information dialog

Some actions are also available from the Appointment Quick Information dialog, as shown below. The Quick Information actions are accessible by clicking the Appointment, without having to open the entire module.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FZbkBs64qa2gkekfSRbWt%2Fquicj%20info%20appointment.png?alt=media&#x26;token=ae4e8876-e749-4660-a637-ae963f98d8a3" alt="" width="273"><figcaption></figcaption></figure>

{% hint style="info" %}
These Actions are configurable in the [Planner Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/planner-management) Settings.
{% endhint %}

## Appointment Actions Visibility based on Appointment Status

The visibility of the Appointment actions are dependant on the **status** of the [**Appointment**](../../getting-started/maica-key-concepts/appointment.md). Please refer to the table below to learn which action is available for each Appointment status.

| Appointment Status            | Available Actions                                                                                                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Scheduled` (Pre Check-In)    | <p>Check-In<br>Quick Completion<br>Cancellation<br>Attach Files<br>Participant Signatures<br>Appointment Breaks<br>Participant Notes<br>Checklist<br>Open Appointment Profile</p> |
| `In Progress` (Post Check-In) | <p>Check-Out<br>Cancellation<br>Attach Files<br>Participant Signatures<br>Appointment Breaks<br>Participant Notes<br>Checklist<br>Open Appointment Profile</p>                    |
| `Completed` (Post Check-Out)  | <p>Appointment Breaks<br>Participant Notes<br>Open Appointment Profile</p>                                                                                                        |

## Appointment Resource Status & Actions Visibility based on Resource Status

Maica provides control over how Appointment Resources are managed, ensuring your team always has visibility, data integrity, and the right level of access when managing Appointments. Appointment Resources in Maica operate under a status-based acceptance workflow. This allows teams to clearly define whether a Resource is available and approved to attend an Appointment.

Each Appointment Resource record includes a status, `Pending` or `Accepted`, which determines whether the **Resource** is authorised to carry out Appointment actions.

{% hint style="info" %}
Statuses can be set automatically based on your organisation's configuration in the [Service Management Settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/service-management), or manually by users with the correct permissions.\
\
By default, Maica sets the status to **Accepted**
{% endhint %}

For a Resource, the visibility of the Appointment Actions are dependant on the **Status** of that particular Resource for that specific Appointment.

Resources who have not been marked as **Accepted** for an Appointment cannot:

1. Check In/Out
2. Quick Complete
3. Cancel Appointments

{% hint style="info" %}
Note, Appointments with Pending or unaccepted Resources are also displayed as **Unfilled** in the Planner.
{% endhint %}

### Appointment Resource Status for Recurring Appointments

When Recurring Appointments are generated from a Master:

* The **Appointment Resource Status** is automatically inherited from the Master record.
* Updates made to the Master (e.g., a status change) can cascade to all related Appointments if triggered manually.

{% hint style="info" %}
Unaccepted Resources will not be copied into recurring Appointments if validation rules are enabled.
{% endhint %}

### Appointment Resource Status Examples

The table below outlines a few common scenarios around Resource Status and Scheduler Permissions and how Maica handles them in each case.

| Example                                                   | Outcome                                |
| --------------------------------------------------------- | -------------------------------------- |
| A Resource is assigned but still Pending                  | ❌ Cannot check in, complete, or cancel |
| Scheduler with Accept All Permission                      | ✅ Can approve any Resource directly    |
| Care Worker without Permission tries to accept themselves | ❌ Action is blocked                    |
| Recurring Appointment from Accepted Master                | ✅ All inherit Accepted status          |
| Scheduler adds and approves on the spot                   | ✅ Can approve via warning icon         |
| Resource tries to check in for another Resource           | ❌ Not allowed without permission       |
