---
description: Learn about how Maica uses Resources within the overall solution.
---

# Resource

### Definition

A Resource is a person delivering a service, either via an Appointment or a Shift. This includes information such as personal details, availability, unavailability, skills, and the relationship to specific [Participants](participant.md).&#x20;

{% hint style="info" %}
A Resource record is linked to a Salesforce [User](https://help.salesforce.com/s/articleView?id=sf.admin_users.htm\&type=5) record to provide access to Maica and the underlying Salesforce platform.
{% endhint %}

### Purpose

The purpose of Resources is to capture the care team delivering services. This has been architected as its own data object, called Resource rather than using the native Salesforce Contact. The main reason for this is to separate the workforce from the overall Contacts/Participants in the system. Resources also capture fundamentally different information which lends itself moreso to a specific data object to manage this.&#x20;

### Usage

Resources are used widely in Maica, including associating them with [Appointments](appointment.md) and [Shifts](../../the-planner/planner-views-and-modes/shift-view.md). This includes beign able to filter and select Resources for [Appointments](appointment.md) based on Skills and Availability. In addition, Maica generates [Timesheets](timesheet.md) for Resources when [Appointments](appointment.md) or [Shifts](shift.md) are completed successfully. &#x20;

{% hint style="info" %}
Resources, via their Salesforce User record have access to Maica and the underlying Salesforce platform through the web browser or a number of available mobile applications.
{% endhint %}

### Final Thoughts

Resources, or your care team, are the backbone of your organisation, making a real difference to your [Participants](participant.md). We are proud to have built a powerful and enjoyable application for your team to use and ensure that the focus remains on the quality of service to your [Participants](participant.md).
