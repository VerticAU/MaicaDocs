---
description: Learn about Rostering Management Settings in Maica
---

# Rostering Management

Rostering is an important part of the scheduling and resource management process which focuses on allocating the most appropriate resources (care workers) to Appointments. **Maica** offers a number of Settings on how this allocation is managed, as shown in the table below.

These settings determine how Maica matches and allocates Resources, and the default statuses applied to Unavailability and Appointment Break records.

{% hint style="warning" %}
These settings control **Roster Mode** and Resource matching. They are not the settings for the **Roster** record introduced in Client Care V2.24. Roster defaults, such as the Default Roster Status and the Roster display fields, are configured separately.
{% endhint %}

{% hint style="info" %}
The below settings can be configured independently for both _Appointments_ and _Shifts_. Values defined under each tab will apply only to that respective type.
{% endhint %}

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Matching Score Importance Level</code></td><td>As <strong>Maica</strong> calculates the overall matching score for Resources, it is possible for you to assign an importance level to each criteria used in this calculation.<br><br>This means, you are able to set what is more important when finding and allocating resources; for example, if assigning a higher percentage to <code>Skills</code>, then the algorithm will attribute a higher percentage to the matching of <code>Skills</code> in preference of another dimension</td></tr><tr><td><code>Default Unavailability Status</code></td><td>When resources create Unavailability records (pending permissions), this Settings determines what <code>Status</code> will be used when this record is created.<br><br><em>This essentially allows you to build any relevant approval process around unavailability as per your organisational requirements.</em></td></tr><tr><td><code>Default Unavailability Schedule Status</code></td><td>Sets the <code>Status</code> applied to the Schedule linked to an Unavailability record. This status is used when a Schedule is created or updated (e.g. when marking an Unavailability as recurring).</td></tr><tr><td><code>Default Appointment Break Status</code></td><td>When resources create Appointment Breaks (pending permissions), this Settings determines what <code>Status</code> will be used when this record is created.</td></tr><tr><td><code>Daily Recurring Unavailability Creation Time</code></td><td>Specifies the time each day that Maica runs a batch process to create Recurring Unavailability records, based on active Unavailability Schedules. This operates similarly to Recurring Appointments.</td></tr></tbody></table>

{% hint style="info" %}
To learn how Roster Mode affects scheduling from an end user's perspective, see [Resource Roster Mode](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/resources/resource-roster-mode) in the User Guide.
{% endhint %}
