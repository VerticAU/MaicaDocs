---
description: Learn about how Maica uses Appointment Services within the overall solution.
---

# Appointment Service

### Definition

An Appointment Service is an absolutely critical concept in Maica as this serves as the basis for creating a family of related [Support Items](support-item.md) for the purposes of billing. An Appointment Service captures all Support Items that essentially deliver the same service but at different times and days, so the billing engine can determine which specific [Support Item](support-item.md) to bill against. A typical example of an Appointment Service might be:

<table><thead><tr><th width="215">Appointment Service</th><th width="212">Support Item</th><th width="173">Service Day</th><th>Service Day</th></tr></thead><tbody><tr><td>Therapy Services</td><td>Occupational Therapy</td><td>Weekday</td><td>Morning</td></tr><tr><td></td><td>Occupational Therapy</td><td>Saturday</td><td>Morning</td></tr><tr><td></td><td>Occupational Therapy</td><td>Sunday</td><td>Morning</td></tr><tr><td></td><td>Occupational Therapy</td><td>Anytime</td><td>Anytime</td></tr></tbody></table>

{% hint style="info" %}
An Appointment Service also captures the required Skills and [Checklists](checklist.md) to deliver the service but the primary purpose of an Appointment Service is to control billings.
{% endhint %}

### Purpose

The purpose of Appointment Services, and by far the most significant advantage, is to abstract the need for the end user (or [Resource](resource.md)) to select a specific [Support Item](support-item.md) at the time of managing the [Appointment](appointment.md) or [Shift](shift.md). The best way to describe this is via an example...let's take the above Appointment Service. If an [Appointment](appointment.md) or [Shift](shift.md) is delivering this service, there is a potential difference in cost for the Participant if this service is delivered in the morning versus the evening, via specific [Support Items](support-item.md) for either time.

As the Resource managing the [Appointment](appointment.md) or [Shift](shift.md) though, we don't believe the selection of this specific [Support Item](support-item.md) should be required and the configuration of the Appointment Service abstracts this selection. The [Resource](resource.md) simply selects `Therapy Services` as the Appointment Service without needing to be concerned about when the service is being delivered.

{% hint style="info" %}
The Maica billing engine will determine at the time of billing which specific [Support Item](support-item.md) needs to be selected for billing rather than the end user ([Resource](resource.md)) having to do this.
{% endhint %}

### Usage

Appointment Services are used throughout the delivery of services within Maica. They are particularly important when managing [Appointments](appointment.md) as this will determine what is being delivered to your [Participants](participant.md). Appointment Services are also utilised in the following features:

* [Appointments](appointment.md)
* [Shifts](shift.md)
* [Billable Participant Notes](../../participants/billable-participant-notes/)

{% hint style="info" %}
The selection of a specific [Support Item](support-item.md) associated with an Appointment Service happens in Maica's billing engine at the time of billing.
{% endhint %}

### Final Thoughts

We totally appreciate that the concept of Appointment Services might be a little difficult to understand at first but, ultimately, they are designed to make life easier and abstract your care team from additional administration overhead during the management of [Appointments](appointment.md) or [Shifts](shift.md).
