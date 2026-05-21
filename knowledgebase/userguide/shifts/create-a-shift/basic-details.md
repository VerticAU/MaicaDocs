---
description: Learn about capturing basic details for a new Shift
---

# Basic Details

## What does the Basic Details stage include?

The Basic Details tab captures the basic details of the [Shift](../../getting-started/maica-key-concepts/shift.md), as described in the below table:

<table><thead><tr><th width="222">Captured Information	</th><th>Description</th></tr></thead><tbody><tr><td><a href="../../getting-started/maica-key-concepts/resource.md">Resource(s) </a></td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/resource.md">Resource(s)</a> by simply typing a name of a Resource (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="../../appointments/create-an-appointment/smart-selection-filter.md">Smart Selection</a> of <a href="../../getting-started/maica-key-concepts/resource.md">Resource(s)</a>.</td></tr><tr><td><a href="../../getting-started/maica-key-concepts/asset.md">Asset(s) </a></td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/asset.md">Asset(s)</a> by simply typing a name of a Asset (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="../../appointments/create-an-appointment/smart-selection-filter.md">Smart Selection</a> of <a href="../../getting-started/maica-key-concepts/asset.md">Asset(s)</a>.</td></tr><tr><td>Date &#x26; Time Details </td><td>The date and time details are pre-populated from the <a href="../../the-planner/planner-overview.md">Planner</a> so there is nothing to do for the user. </td></tr><tr><td>Shift Service </td><td>This allows for the selection of Shift Service(s). You can add an Shift Service by typing the name of the service, or by using any key words configured within the service. For example: If you were adding <strong>Support Coordination</strong>, you could type <strong>Support Coordination</strong>, or, <strong>advice</strong>. </td></tr><tr><td>Claim Type</td><td>This allows for the selection of a Claim Type by selecting one from the provided dropdown list. </td></tr><tr><td>Time Zone</td><td>When creating a new Shift, the <strong>timezone is automatically set</strong> <strong>&#x26; displayed</strong> based on the <strong>Salesforce user’s current browser timezone.</strong> This occurs before a Location is selected.</td></tr></tbody></table>

### Autocomplete Appointments for Linked Appointments

In addition to the details captured above, when creating a Shift Maica allows you to determine how the Appointments linked to that Shift are processed alongside it. This is especially useful when working with Shifts that contain multiple Appointments. When the option is enabled, linked Appointments are automatically checked in, checked out, and completed in step with the parent Shift, rather than requiring each Appointment to be actioned individually.

This behaviour is controlled by the **Autocomplete Appointments** toggle on the Shift record. It is designed to simplify both mobile check-in and check-out workflows for long or continuous Shifts, and Quick Complete workflows in the Planner, while still allowing Appointment-level control where required. To learn more, see below.

### Configuring Autocomplete Appointments on a Shift

When creating or editing a Shift, you can determine how the linked Appointments are processed via the **Autocomplete Appointments** toggle within the Basic Details stage.

* When the toggle is **enabled**:
  * Linked Appointments are automatically checked in, checked out, and completed in step with the Shift.
  * The **Check In** and **Check Out** buttons on the linked Appointment records are disabled, because the cascade handles those actions on behalf of the user.
* When the toggle is **disabled**:
  * Linked Appointments must be checked in, checked out, and completed individually, even if the Shift itself is actioned.

{% hint style="info" %}
This setting is applied **per Shift**, allowing flexibility based on how services are delivered. By default, **Autocomplete Appointments** is set to enabled when a new Shift is created.
{% endhint %}

### How Autocomplete Works for Linked Appointments

Autocomplete Appointments triggers on three actions on the parent Shift: check-in on the Mobile Care Worker App, check-out on the Mobile Care Worker App, and Quick Complete from the Planner.

#### Autocomplete Enabled

When a Shift has the **Autocomplete Appointments** toggle enabled:

* **On Shift check-in (Mobile Care Worker App):** each linked Appointment is automatically checked in. Appointment check-in times use the scheduled Appointment check-in and check-out times.
* **On Shift check-out (Mobile Care Worker App):** each linked Appointment is automatically checked out, completing the Appointment with the scheduled times.
* **On Shift Quick Complete (Planner):** the cascade processes any pending check-in and check-out actions on each linked Appointment in a background batch, moving the Appointments to **Completed** status. Appointments already in **Completed**, **Cancelled**, or **Under Review** status are excluded from the cascade.

In all three cases, the **Check In** and **Check Out** buttons on the linked Appointment records remain disabled, since the cascade handles those actions on behalf of the user.

#### Autocomplete Disabled

When the **Autocomplete Appointments** toggle is disabled:

* Checking in or out of the Shift does not check in or out the linked Appointments. Care workers must check in and out of each Appointment individually.
* Quick Completing the Shift does not cascade to linked Appointments. Each Appointment must be completed separately.
* This behaviour matches standard Appointment-level workflows.

{% hint style="info" %}
The autocomplete approach reduces repeated actions for care workers when:

* A Shift contains multiple Appointments.
* Appointments are delivered continuously across a single Shift period.

At the same time, it maintains full control for scenarios where Appointment-level actions are still required for compliance or operational reasons.
{% endhint %}

### Example Scenarios

* A Shift is scheduled from **9:00am to 3:00pm** with three linked Appointments and Autocomplete Appointments enabled.\
  The care worker checks in once to the Shift on the Mobile Care Worker App, and all three Appointments are checked in automatically. The same applies when the care worker checks out.
* A Shift has Autocomplete Appointments enabled, and a Coordinator clicks **Quick Complete** on the Shift in the Planner.\
  The Shift moves to **Completed** immediately. The three linked Appointments are queued for completion via a background batch, with check-in and check-out actions applied automatically.
* A Shift has Autocomplete Appointments enabled, but one of the linked Appointments is already in **Cancelled** status.\
  The cascade processes the other linked Appointments and leaves the cancelled one untouched.
* A Shift contains multiple Appointments but Autocomplete Appointments is not enabled.\
  The care worker must check in, check out, and complete each Appointment individually, even after actioning the Shift itself.

## Things to look out for: Basic Details&#x20;

<figure><img src="../../.gitbook/assets/things to look out for basic details shifts.png" alt="" width="500"><figcaption></figcaption></figure>

### 1. Resource(s) have a Roster Mode conflict

This alert will show in the instance where the selected Resource(s) have a Roster Mode conflict and hence cannot be allocated to the proposed Shift. This is the only restriction that **Maica** enforces where the user cannot continue to create the Shift.

{% hint style="info" %}
`Roster Mode` in **Maica** is used to define the behaviour and validation applied when scheduling `Shifts` for a `Resource`. When selecting a `Roster Mode` for a `Resource`, there are two selectable options. These are:

* `Appointment`: This means Appointments can be scheduled at any time for a Resource provided it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments can be created at any time.
* `Shift`: This means Appointments can only be scheduled within a Shift that a Resource is part of and it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments still must fall within a Shift that the Resource is assigned to.
{% endhint %}

In order to resolve this alert, you **must** select Resource(s) that are set to a Roster Mode of `Shift` during the time of the proposed Shift.

You can set a Resource(s) Roster Mode on their [Resource Profile](../../resources/resource-profile.md), [Availability Records](../../resources/resource-profile.md), or by using a [Global Setting](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/rostering-management) in your Maica organisation for all Resource(s). To learn more, click the links.&#x20;

{% hint style="info" %}
It is important to note that if a `Resource` has a `Roster Mode` set on their Resource Record that is different to the `Roster Mode` set for a specific `Availability` Record, the `Availability` Record Mode will take precedent during the `Availability` period. \
\
If No `Availability` Records are found and the `Roster Mode` is not set on the `Resource` Record: the `Roster Mode` for the `Resource` will be defined by the `Global Roster Mode` setting. This is configurable in the **Maica** [Rostering Management](https://knowledge.maica.com.au/maica-knowledge-base/v/maica-administration-guide/settings/rostering-management) settings.
{% endhint %}

### 2. Shift Allocation Incomplete

This alert will show in the instance where you have a different number of Resource(s) allocated compared to the specified Required number for the Shift. This will result in an incomplete Shift.&#x20;

For example, if you have an incorrect required number of [Resource(s)](../../getting-started/maica-key-concepts/resource.md), **Maica** will alert you with the following warning:&#x20;

`The Shift does not have the required number of Resources allocated.`

In this instance, **Maica** will still allow you to continue to the next stage of creating your Shift. However, as mentioned, it will result in an unfulfilled Shift. &#x20;

In order to resolve the Incomplete allocation alert, ensure that the number of selected [Resource(s)](../../getting-started/maica-key-concepts/resource.md) match the specified required number. [For example](https://ourguidelines.ndis.gov.au/would-we-fund-it/home-and-living-supports/21-ratio-support): If you only require 1 Resource for your Shift, ensure 1 is allocated, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-09-25 at 4.40.22 pm.png" alt="" width="563"><figcaption></figcaption></figure>
