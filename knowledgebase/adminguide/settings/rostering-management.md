---
description: >-
  Configure the settings that control Resource matching, overtime and rostering
  defaults in Maica
---

# Rostering Management

Rostering is an important part of the scheduling and resource management process which focuses on allocating the most appropriate resources (care workers) to Appointments. **Maica** offers a number of Settings on how this allocation is managed, as shown in the table below.

These settings determine how Maica matches and allocates Resources, how the fortnightly overtime limit is measured, and the default statuses applied to Unavailability and Appointment Break records.

{% hint style="warning" %}
These settings control **Roster Mode** and Resource matching. They are not the settings for the **Roster** record introduced in Client Care V2.24. Roster defaults, such as the Default Roster Status and the Roster display fields, are configured separately.
{% endhint %}

{% hint style="info" %}
The below settings can be configured independently for both _Appointments_ and _Shifts_. Values defined under each tab will apply only to that respective type.
{% endhint %}

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Matching Score Importance Level</code></td><td>As <strong>Maica</strong> calculates the overall matching score for Resources, it is possible for you to assign an importance level to each criteria used in this calculation.<br><br>This means, you are able to set what is more important when finding and allocating resources; for example, if assigning a higher percentage to <code>Skills</code>, then the algorithm will attribute a higher percentage to the matching of <code>Skills</code> in preference of another dimension</td></tr><tr><td><code>Default Unavailability Status</code></td><td>When resources create Unavailability records (pending permissions), this Settings determines what <code>Status</code> will be used when this record is created.<br><br><em>This essentially allows you to build any relevant approval process around unavailability as per your organisational requirements.</em></td></tr><tr><td><code>Default Unavailability Schedule Status</code></td><td>Sets the <code>Status</code> applied to the Schedule linked to an Unavailability record. This status is used when a Schedule is created or updated (e.g. when marking an Unavailability as recurring).</td></tr><tr><td><code>Default Appointment Break Status</code></td><td>When resources create Appointment Breaks (pending permissions), this Settings determines what <code>Status</code> will be used when this record is created.</td></tr><tr><td><code>Overtime Fortnight Anchor Date</code></td><td>The start date of any one of your organisation's pay fortnights. Maica uses it to decide which fortnight an Appointment or Shift falls in when checking a Resource's <code>Fortnightly Hours Limit</code>.<br><br>Choose a fortnight start date <strong>in the past</strong>. See <a href="rostering-management.md#measuring-the-fortnightly-overtime-limit">Measuring the fortnightly overtime limit</a> below.</td></tr><tr><td><code>Daily Recurring Unavailability Creation Time</code></td><td>Specifies the time each day that Maica runs a batch process to create Recurring Unavailability records, based on active Unavailability Schedules. This operates similarly to Recurring Appointments.</td></tr></tbody></table>

{% hint style="info" %}
To learn how Roster Mode affects scheduling from an end user's perspective, see [Resource Roster Mode](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/resources/resource-roster-mode) in the User Guide.
{% endhint %}

## Measuring the fortnightly overtime limit

When a Resource has a **Fortnightly Hours Limit**, Maica checks the hours they are assigned within a 14-day window each time they are scheduled. The **Overtime Fortnight Anchor Date** decides which 14 days that window covers.

| Overtime Fortnight Anchor Date | Fortnight Maica checks                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Set**                        | The fixed 14-day pay fortnight that contains the start of the Appointment or Shift. Fortnights repeat every 14 days, forwards and backwards, from the Anchor Date. |
| **Blank**                      | The week in which the Appointment or Shift starts, plus the following week. This window moves with each Appointment, so it does not follow a fixed pay cycle.      |

{% hint style="success" %}
If your organisation pays or tracks overtime by fortnight, set an Overtime Fortnight Anchor Date so every Appointment and Shift in the same pay fortnight is checked against the same 14 days.
{% endhint %}

### Choosing an Overtime Fortnight Anchor Date

The Anchor Date does not need to be your _first_ or _next_ pay fortnight. Because fortnights repeat, any past fortnight start date gives exactly the same fortnights as a recent one. Set the Anchor Date to a fortnight start that is:

1. **In the past**, never a future date such as your next pay run.
2. **Earlier than any Appointment or Shift you will schedule or edit**, including historical ones. A date before your organisation started using Maica is ideal.
3. **A real pay fortnight start date**, so the fortnights line up with your payroll.

For example, if one of your pay fortnights starts on **Monday 14 September 2026**, you can count back a whole number of fortnights and use **Monday 15 September 2025** (26 fortnights earlier).

{% hint style="danger" %}
Do not set the Overtime Fortnight Anchor Date in the future. Appointments and Shifts dated before the Anchor Date can be checked against the wrong fortnight, so the wrong hours are counted towards the limit.
{% endhint %}

{% hint style="warning" %}
The Planner's **Fortnight** period and the **Find Resource** search do not currently use the Overtime Fortnight Anchor Date. The hours they show for a Resource can cover a different 14 days to the overtime check. To line the Planner up with your pay fortnight, see [Select Date](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/the-planner/planner-actions/select-date).
{% endhint %}

To learn how the overtime limits are set on each Resource, see the [Resource Profile](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/resources/resource-profile).
