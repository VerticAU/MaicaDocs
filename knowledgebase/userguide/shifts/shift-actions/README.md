---
description: Discover the Shift Actions possible in Maica.
---

# Shift Actions

## What are Shift Actions?

Shift actions refer to actions and tasks related to managing and handling your Shift. There are several actions you can take within a Shift in **Maica**, including the following:

| Shift Actions                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Check-In](check-in.md)                     | <p>Checking into Shifts sets the baseline for generating Timesheets. Whilst this is not a mandated process, it is recommended to track your care team's movements as well as actual time spent at a Shift.<br><br>If allowed by the User, Checking-In also captures the geolocation of the Shift Check-In.</p>                                                                                                                                                                                                                                                                      |
| [Check-Out](check-out.md)                   | <p>Similar to Checking-In, Checking-Out of Shifts establishes the correct end point when creating Timesheets. Again, whilst this is not a mandated process, it is recommended to track your care team's movements as well as time spent.<br><br>In addition to mirroring much of the Check-In experience, when Checking-Out, you are also able to stipulate which Resource is Checking-Out and how much time has been spent on each Shift Service delivered during the Shift.<br><br>If allowed by the User, Checking-Out also captures the geolocation of the Shift Check-Out.</p> |
| [Quick Completion](quick-complete.md)       | Quick completing a Shift bypasses the Checking In/Out processes and sets a Shift to the `Completed` status. It is possible to still capture Shift Service information and Notes whilst doing this.                                                                                                                                                                                                                                                                                                                                                                                  |
| [Cancellation](cancellation.md)             | <p>The cancellation of a Shift records the reason and sets the status to <code>Cancelled</code>. The Shift is not deleted but instead is simply placed into a <code>Cancelled</code> status.<br><br>If you are cancelling a Shift within a Recurring Schedule, you can either cancel the singular Shift, or all remaining Shifts in the schedule.</p>                                                                                                                                                                                                                               |
| [Attach Files](attach-files.md)             | This provides for the ability to Attach Files to any given Shift, including photos taken on a mobile device. These files are stored against the Salesforce Shift record.                                                                                                                                                                                                                                                                                                                                                                                                            |
| [Shift Breaks](shift-breaks.md)             | The management of breaks that might occur during Shifts can become important and this action allows you to record any breaks taken, whether billable or not during any given Shift.                                                                                                                                                                                                                                                                                                                                                                                                 |
| [Shift Expenses](shift-expenses.md)         | Shift Expenses allows you to add Expense records against a Resource that may occur during a Shift, such as having to pay for a Parking Spot.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [Checklists](checklists.md)                 | Checklists allow you to complete a set of pre-defined tasks that have been set (via Maica Checklists) for each Shift Service delivered during a Shift.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [Shift Notes](shift-notes.md)               | This action allows you to take Shift related notes. It is possible to take notes during the management of a Shift at any time, including for already completed Shifts.                                                                                                                                                                                                                                                                                                                                                                                                              |
| Shift Incidents                             | Shift Incidents allows you to record and manage incidents that occur during a Shift. On desktop, this action is available in the Standard experience.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Open Shift Profile](open-shift-profile.md) | This opens the Salesforce Shift profile which allows you to see all relevant Shift information using the native Salesforce platform.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [Google Maps](google-maps.md)               | The Google Maps action opens the directions to the Shift from a number of selectable starting points in Google Maps, directly from the Shift.                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## How do I access the Shift Actions?

{% hint style="info" %}
Maica offers two experiences for creating and managing Shifts, **Standard** and **Legacy**. The experience you see depends on your organisation's settings. If your screen does not look like one of those shown below, contact your administrator.
{% endhint %}

The Shift Actions work the same way in both experiences, and each opens the same dialog. The difference is where you find them.

To begin actioning a Shift, click on the Shift in your [Planner](../../the-planner/planner-overview.md).

### Standard experience

In the Standard experience, the Shift opens ready to edit. The available actions are listed in the **Actions** menu, beside the **Shift Details** heading at the top of the Shift's details. The menu is available at any time while the Shift is open, including while you are making changes.

### Legacy experience

In the Legacy experience, click the `View` button once the Shift is selected. The available actions (depending on your Shift Status) are shown along the bottom of the window, other than the `Open Shift Profile` and `Google Maps` actions, which are in the top right corner.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2F3xns6yvJEw3nS9XtLeOD%2Fshift%20actions.png?alt=media&#x26;token=cda367da-1b32-4ab2-9163-127898a2958a" alt="" width="380"><figcaption><p>Legacy</p></figcaption></figure>

### Quick Information dialog

Some actions are also available from the Shift Quick Information dialog, as shown below. The Quick Information actions are accessible by clicking the Shift, without having to open the entire module.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FelhlqQSN9TzdeKoONAQ0%2Fquikc%20dialog.png?alt=media&#x26;token=ca773b6f-9fe2-48de-a864-e020acfc2d12" alt="" width="161"><figcaption></figcaption></figure>

{% hint style="info" %}
These Actions are configurable in the [Planner Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/planner-management) Settings.
{% endhint %}

## Shift Actions Visibility based on Shift Status

The visibility of the Shift Actions are dependant on the **Status** of the **Shift**. Please refer to the table below to learn which action is available for each Shift Status.

| Shift Status                  | Available Actions                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Scheduled` (Pre Check-In)    | <p>Check-In<br>Quick Completion<br>Cancellation<br>Attach Files<br>Participant Notes<br>Open Shift Profile<br>Google Maps</p> |
| `In Progress` (Post Check-In) | <p>Check-Out<br>Cancellation<br>Attach Files<br>Participant Notes<br>Open Shift Profile<br>Google Maps</p>                    |
| `Completed` (Post Check-Out)  | <p>Participant Notes<br>Open Shift Profile<br>Google Maps</p>                                                                 |

{% hint style="info" %}
Shift Actions visibility for a Resource also depends on the Resource Status. It works the same way for Shifts as it does for Appointments. To learn more, see [Appointment Resource Status & Actions Visibility based on Resource Status](../../appointments/appointment-actions/#appointment-resource-status-and-actions-visibility-based-on-resource-status).
{% endhint %}
