---
description: Learn about how Maica uses Assets within the overall solution.
---

# Asset

### Definition

An Asset is a non-human Resource delivering a service, either via an Appointment or a Shift. This includes information such as location details, availability, unavailability, skills, and the relationship to specific [Participants](https://knowledge.maica.com.au/maica-knowledge-base/getting-started/maica-key-concepts/participant).

{% hint style="info" %}
Typical Assets might be cars being used to deliver services, rooms being booked, as well as any equipment beign taken to [Appointments](/broken/pages/qWrsJvyquHTBgREf1QDj) and [Shifts](/broken/pages/zNYLCCfkOlI0IqQ3sOvl), such as medical equipment.
{% endhint %}

### Purpose

The purpose of Assets is to capture the various non-human [Resources](/broken/pages/4q3WtyUGzX83jJhpjEHo) delivering services. This has been architected as a record type on the [Resource](/broken/pages/4q3WtyUGzX83jJhpjEHo) data object rather than using the native Salesforce Contact. The main reason for this is to separate the workforce (human and non-human) from the overall Contacts/Participants in the system. Assets also capture fundamentally different information which lends itself moreso to a specific data object to manage this.

### Usage

Assets are used widely in Maica, including associating them with [Appointments](https://knowledge.maica.com.au/maica-knowledge-base/getting-started/maica-key-concepts/appointment) and [Shifts](https://knowledge.maica.com.au/maica-knowledge-base/the-planner/planner-views-and-modes/shift-view). This includes beign able to filter and select Assets for [Appointments](https://knowledge.maica.com.au/maica-knowledge-base/getting-started/maica-key-concepts/appointment) based on Skills and Availability.&#x20;

{% hint style="info" %}
In many ways, Maica treats Assets just like [Resources](/broken/pages/4q3WtyUGzX83jJhpjEHo) with some reduced functionality, such as capturing personal information as this does not apply to non-human [Resources](/broken/pages/4q3WtyUGzX83jJhpjEHo).
{% endhint %}

### Final Thoughts

There are many use cases where not only human care workers ([Resources](/broken/pages/4q3WtyUGzX83jJhpjEHo)) are involved in the delivery of services but also non-human ones, such as cars, rooms, equipment, among many others. Maica offers the ability to treat these non-human [Resources](/broken/pages/4q3WtyUGzX83jJhpjEHo) just like your care team buy including them in the scheduling, filtering, and rostering of your services.
