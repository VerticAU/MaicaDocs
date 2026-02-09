---
description: Learn about how Maica uses Contacts within the overall solution.
---

# Participant

### Definition

A Participant is the person receiving services under the context of a Service Agreement. This includes information such as personal details, funding information, notes, preferences, among many others. Maica uses the native Salesforce Contacts object to capture Participants and you can learn more about Salesforce Contacts [here](https://help.salesforce.com/s/articleView?id=sf.contacts_overview.htm\&type=5).

{% hint style="info" %}
Maica considers a Contact to be a Participant when an active Service Agreement is associated with the Contact record. The Service Agreement does not need to be fully funded but it does need to have the relevant Support Items for which services are being delivered.
{% endhint %}

### Purpose

The purpose of Participants is to capture the people receiving services and their relevant attributes and related information. This includes a number of default attributes, such as Age, Gender, etc as well as related information including their [preferences](../../participants/manage-preferences.md), goals, [notes taken](../../participants/billable-participant-notes/), funding, and manh others.

The underlying Salesforce platform allows for the easy extension of any of these components using the platform configuration tools which you can learn about [here](https://help.salesforce.com/s/articleView?id=sf.customize_overview.htm\&type=5).

### Usage

Participants are used throughout Maica and are part of virtually every part of the Maica lifecycle. This starts from Intake, Profile Management, Service Agreements, Appointments, Invoices, and Reporting. Participants form one of the core concepts of Maica and without a Participant, not only can Maica not function, any healthcare service provider also can't achieve their goals without Participants.

### Final Thoughts

Maica, like healthcare service providers, exists to empower the caring for Participants. We take great care to create a Participant profile that is relevant, useful and enjoyable to use.&#x20;

{% hint style="info" %}
If you are using a Salesforce edition in which [Person Account](https://help.salesforce.com/s/articleView?id=sf.account_person.htm\&language=en_US\&type=5) is used (your system administrator will know), then please be assured that Maica will work within this architecture also.
{% endhint %}
