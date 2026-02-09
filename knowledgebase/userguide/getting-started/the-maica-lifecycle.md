---
description: Learn about the overall Maica Lifecycle
---

# The Maica Lifecycle

### The Maica Lifecycle in 90 seconds

{% embed url="https://player.vimeo.com/video/989234772" %}
The Maice Lifecycle in 90 seconds
{% endembed %}



### The Maica Lifecycle in one Picture

Maica follows a best-practise lifecycle to manage not only the care worker experience but also the Participant care throughout the solution as shown in the below diagram.

<figure><img src="../.gitbook/assets/Maica Solution Architecture - ✅ Maica Lifecycle KB.png" alt=""><figcaption><p>The Maica Lifecycle</p></figcaption></figure>

### The Maica Lifecycle Description

Maica views the entire experience as a single solution rather than a set of distinct features. This means that, at all times, everything that is important to the needs of healthcare service Providers is considered, including financial agreements, availability of care workers, participant preferences, etc.&#x20;

The above diagram outlines a process flow that involves multiple systems and interactions, starting with an external interaction, leading to service management and eventually ending in finance and resource handling. Let’s break it down step by step:

* **Starting Point**: The process can begin in various ways, such as through Email, an Online Chat, an Online Referral Form (hosted on a website), or a Phone Call. These are all the methods a participant can use to initiate contact.
* **Participant Information**: Once contact is made, the system identifies or creates a record for the Participant (the individual receiving the services). The participant’s Preferences (such as preferred communication method or service type) are then set.
* **Service Agreement**: If services are required, a Service Agreement is created for either an Aged Care budget, NDIS (which is validated against an NDIS Plan), or any other configured funding type. This agreement lays out the details of what services will be provided to the participant.
* **Appointments and Shifts**: After the service agreement is in place, Appointments and/or Shifts are scheduled. Each appointment is connected to resources (people, services, etc.) and is linked to the timesheets and staff availability, as seen by the connection to Resources and Skill(s).
* **Timesheets and Resource Management**: When an appointment happens, Timesheets are generated, which capture the time spent by staff or resources in delivering the service. These timesheets are important for payroll and resource allocation and are linked to the Human Resource Management system.
* **Invoices and Claims**: Once services are delivered, an Invoice is generated. The diagram shows how different claims (such as NDIS Claims, Aged Care Claims, or Plan Manager submissions) impact this process. This is also linked to determining the Invoice Funding Type, meaning where the payment for the service is coming from.
* **Finance and Payroll**: The invoice information is synchronised with the Finance Management system and other external systems like Payroll & Award Integration for processing payments. Additionally, HR Management is updated with availability and skills information to allocate resources efficiently.

{% hint style="info" %}
This is complemented with selected external applications to fulfil specific functions, including award interpretation, document management, and finance, all built on the Salesforce platform for security, compliance, and scalability.
{% endhint %}
