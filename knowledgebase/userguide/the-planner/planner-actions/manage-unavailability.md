---
description: Learn about how Resources can manage their Unavailability within Maica
---

# Manage Unavailability

## What does the Manage Unavailability Tool do?

Maica supports the management of Unavailability records which essentially mark any given [Resource](/broken/pages/4q3WtyUGzX83jJhpjEHo) as not available for inclusion into an [Appointment](/broken/pages/qWrsJvyquHTBgREf1QDj) or [Shift](/broken/pages/zNYLCCfkOlI0IqQ3sOvl).&#x20;

The Manage Unavailability Tool essentially allows you to manage and create these records directly from the [Planner](../planner-overview.md), as demonstrated below.&#x20;

{% embed url="https://app.arcade.software/share/FBBSMb5hXJCUK8KrXlQ0" %}
Managing Unavailability
{% endembed %}

Maica offers the ability to either create a single Unavailability for any given Resource or multiple at the same time by simply adding multiple Resources into the `Resources(s)` input.&#x20;

{% hint style="info" %}
It is important to note that if multiple Resources are selected, Maica will create an individual Unavailability record for each Resource to ensure that each Resource can manage their own Unavailability.
{% endhint %}

## Creating a new Unavailability Record

To create a new Unavailability record, simply click on the `Unavailability` icon in Maica's [Planner](./), select the `+ New` button and complete the fields as per the below screenshot.

{% hint style="info" %}
Where multiple Resources are selected, any future Recurring Unavailability records will be created via Maica's batch feature so you might not see these in the Planner straight away.&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/manage unavailability.png" alt="" width="563"><figcaption></figcaption></figure>

<table><thead><tr><th width="267">Field</th><th>Description</th></tr></thead><tbody><tr><td><ol><li>Start and End Date/Time</li></ol></td><td>The Start and End date and time of the Unavailability. This will default to the current time with a duration of 60 minutes.<br><br>Note, when you adjust the Start Time, the End Time auto-updates to remain 60 minutes later (unless the end time has already been manually changed).</td></tr><tr><td><ol start="2"><li><code>All Day</code> Toggle </li></ol></td><td>When enabled, Unavailability spans from 12:00 AM on the Start Date to 12:00 AM the following day. Duration is automatically set to 24 hours, with times hidden from the modal.</td></tr><tr><td><ol start="3"><li>Resource(s)</li></ol></td><td>The Resource(s) for whom the Unavailability record will be created.</td></tr><tr><td><ol start="4"><li>Type</li></ol></td><td>The type of Unavailability being created. This list is configurable via Maica <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings">Settings</a>.</td></tr><tr><td><ol start="5"><li>Status</li></ol></td><td>The status of Unavailability being created. This list is configurable via Maica <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings">Settings</a>.</td></tr><tr><td><ol start="6"><li>Unavailability Enforcement </li></ol></td><td><p>Unavailability Enforcement determines the severity of the Unavailability:<br></p><ul><li><strong>Hard Unavailability</strong> prevents adding a Resource to an Appointment/Shift</li><li><strong>Soft Unavailability</strong> prompts a user confirmation but allows addition to an Appointment/Shift.</li></ul><p><em>Please note, drag and drop is prevented on Hard Unavailability, but allowed onto Soft Unavailability with a confirmation required.</em> </p></td></tr><tr><td><ol start="7"><li>Notes</li></ol></td><td>Additional notes that can be taken during the creation of the Unavailability.</td></tr><tr><td><ol start="8"><li>Create a corresponding Timesheet</li></ol></td><td>This indicates that a corresponding timesheet activity will be generated for each Unavailability.</td></tr><tr><td><ol start="9"><li>This is a Recurring Unavailability</li></ol></td><td>If a Recurring Unavailability is required, this enables the capturing of the required details as documented further <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/recurring-schedules">here</a>.</td></tr></tbody></table>

{% hint style="info" %}
The Recurring Unavailability follows the same execution logic as Appointments and Shifts which is further described [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/recurring-schedules).
{% endhint %}

{% hint style="info" %}
Please note, when an Unavailability Record is created, Maica will automatically remove the associated Resource from any assigned Appointments or Shifts during the Unavailability period.&#x20;
{% endhint %}

## Example Scenarios&#x20;

| Example                                                    | Outcome                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| You create a new unavailability record at 2:15 PM          | ✅ Defaults to 2:15 PM – 3:15 PM                                                                        |
| You select `All Day` for 11 July                           | ✅ Maica blocks anyone from scheduling the selected Resource from 12:00 AM 11 July to 12:00 AM 12 July. |
| A multi-day All Day unavailability (11–13 July)            | ✅ Maica treats the End Date as exclusive, covering 11–12 July only.                                    |
| Editing an existing unavailability that was marked All Day | ✅ Checkbox automatically selected if both Start and End times are 12:00 AM.                            |
