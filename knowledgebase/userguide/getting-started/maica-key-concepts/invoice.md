---
description: Learn about how Maica uses Invoices within the overall solution.
---

# Invoice

### Definition

An Invoice is the financial record capturing the delivered services required to be billed. This includes several Invoice Line Items, one for each delivered service across a billing period which essentially dictates how long an Invoice is `open` for before being finalised.

### Purpose

The prupose of Invoices is to ensure Maica captures all financial obligations to a Participant's [Service Agreement](service-agreement.md). This primarily records what needs to be billed, using a number of funding structures, and also reduces the available funding on a [Service Agreement](service-agreement.md).

### Usage

Invoices are primarily used within Maica's billing logic where records are created based on completed [Appointments](appointment.md) or [Shifts](shift.md). Similar to [Delivery Activities](delivery-activity.md), Invoices are largely a backend record and mostly managed by Maica's automation.

{% hint style="info" %}
It is quite common that Maica submits Invoices to external finance systems, like Xero to which Maica has a pre-configured [integration](../../integrations/xero-integration-overview.md).&#x20;
{% endhint %}

### Final Thoughts

Invoices are an essential component in the billing execution logic and typcially require no manual intervention. Solution administrators may manage these records if required but this would be unusual.
