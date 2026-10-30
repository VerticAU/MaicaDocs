---
description: Learn about the Basic Planner Filters in Maica
---

# Basic Filters

## What are the Basic Filters in Maica?

Once you have chosen the Filter from the Planner, you may switch between Basic and Advanced Filters. The Basic panel is organised into collapsible sections, including **Fulfilment**, **Service** and **General**, and each filter has a help icon with a short description. The table below describes the Basic Filters in more depth.

{% hint style="info" %}
Please keep in mind that some Filter options will apply to either Appointments or Shifts depending on what [View](../planner-views-and-modes/) your Planner is in. As a general rule; `Schedule`, `Participant`, `Asset` and `Accomodation` Views apply to `Appointments`, whilst `Roster` and `Shift` Views apply to `Shifts`.
{% endhint %}

<table><thead><tr><th width="261">Filter</th><th>Description</th></tr></thead><tbody><tr><td>Appointment Type or Shift Type</td><td>This refers to the type of Appointment or Shift you are wanting to see in the Planner, such as <code>Booking</code>.</td></tr><tr><td>Status</td><td>This refers to the Status of the Appointment or Shift you are wanting to see in the Planner, such as <code>Scheduled</code> or <code>Completed.</code></td></tr><tr><td>Appointment Resource Status</td><td>This filters by the status of the Resource allocations on an Appointment or Shift, such as <code>Confirmed</code>. It starts from the <strong>Default Appointment Resource Status</strong> setting, and starts with all statuses when that setting is blank. Unfilled counts <code>Confirmed</code> allocations only, so allocations offered by Broadcast stay <code>Pending</code> or <code>Accepted</code> until confirmed; include those statuses to see offered work.</td></tr><tr><td>Show Unavailability</td><td>This toggles the display of Unavailability records in the Planner.</td></tr><tr><td>Unavailability Status</td><td>This filters the Status on the Unavailability records shown in the Planner, such as <code>Approved</code>. Please note, this Filter is only filtering Unavailability records, all other Appointments and Shifts will not be impacted. Leave it empty to show every status.</td></tr><tr><td>Resource Skills</td><td>This filters Resources based on associated Skills, such as the ability to <code>Administer Medication</code>. This filter is particularly relevant on Schedule View in Timeline Mode, when the Planner is organised by Resource.</td></tr><tr><td>Location</td><td>This filters Appointments based on the Location at which they are being held; this Location is recorded against an Appointment as an address or a lookup to a Location record.</td></tr><tr><td>Appointment or Shift Services</td><td>This refers to the associated Appointment or Shift Services for any given Appointment or Shift; this means you can filter based on what services are being delivered.</td></tr><tr><td>Show Shifts</td><td>On Calendar View, this filter gives the ability to toggle the visibility for Shifts on and off alongside Appointments.</td></tr><tr><td>Show Roster Shifts</td><td>On <a href="../planner-views-and-modes/shift-view.md">Shift View</a>, this filter gives the ability to include Shifts that belong to a Roster. Shift View shows standalone Shifts only by default, so toggle this on if a Shift you expect to see is missing because it sits under a Roster.</td></tr><tr><td>Show Unfilled Appointments or Shifts</td><td>Maica considers an Unfilled Appointment or Shift any Appointment or Shift that does not have the required number of Resources or Participants allocated to match the required number. This filter option allows you display your unfilled Appointments or Shifts on the Planner, and stacks with the other active filters.</td></tr><tr><td>Unfilled Only</td><td>This filter allows you to only display Unfilled Appointments or Shifts. This may be beneficial when completing or finalising your roster to see which Appointments or Shifts require attention.</td></tr><tr><td>Hide Empty Rows</td><td>When in Timeline Mode, this filter hides the rows for records with no Appointments in the selected time period; this means if you had a <code>Resource</code> with no Appointments for the selected period, they would not show in your Planner if this was toggled on.</td></tr><tr><td>My Participants Only</td><td>When using the <code>Resource Participant</code> related list in the <a href="../../resources/resource-profile.md#resource-participants">Resource Profile</a>, it is possible to assign certain Participants to a particular Resource. This filter allows you to only see the Participants assigned to you as the logged on User/Resource.</td></tr><tr><td>Participants</td><td>This allows you to select a number of specific <code>Participants</code> and only see their associated Appointments or Shifts in the Planner.</td></tr><tr><td>My Appointments Only or My Shifts Only</td><td>This will automatically only show the Appointments or Shifts in which the logged on User/Resource is allocated.</td></tr><tr><td>Resources or Assets</td><td>This allows you to select a number of specific <code>Resources</code> and/or <code>Assets</code> and only see their associated Appointments or Shifts in the Planner.</td></tr><tr><td>Match Participant &#x26; Resource</td><td>If you have selected specific Participants or Resources from the above filters, this filter will show only Appointments where both of them are allocated together.</td></tr></tbody></table>

{% hint style="info" %}
Please keep in mind that the Filter options available will vary depending on the [View](../planner-views-and-modes/) you select on your Planner. The table above shows all available Filter options.
{% endhint %}

{% hint style="info" %}
In [Roster View](../planner-views-and-modes/roster-view.md), the Shifts shown are determined by the Roster you select from the toolbar rather than by these filters, so the view stays empty until a Roster is selected. The selected Roster sets the Location, which cannot be changed in Roster Mode.
{% endhint %}

## Include and Exclude

Picklist and lookup filters can either include or exclude the values you select. The Include / Exclude menu sits beside the filter's label and appears once at least one value is selected.

* **Include** shows only records that match the selected values. This is the default.
* **Exclude** hides records that match the selected values.

Include / Exclude is available on Type, Status, Appointment Resource Status, Unavailability Status, Location, Services, Skills, Participants and Resources. The menu keeps its choice while you change the selected values, and returns to **Include** when you empty the filter.

{% hint style="info" %}
Excluding by a lookup such as Location hides only the records that carry one of the selected values. Records with no value for that lookup remain visible.
{% endhint %}

## Saved filters

The settings on the Basic and Advanced tabs can be saved from **Your Filters**. Saved filters keep the criteria only. Grouping, sorting, the Planner view, the period and the mode stay as you set them. See **Saved Planner Filters** for the full workflow.
