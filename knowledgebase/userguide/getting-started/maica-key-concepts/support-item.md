---
description: Learn about how Maica uses Support Items within the overall solution.
---

# Support Item

### Definition

A Support Item is used to define a distinct service or product being delivered to a Participant, such as an occupational therapy session or wheelchair. Support Items capture information about the service itself as well as the service day (weekday, Saturday, Sunday, etc) , service time (morning, afternoon, etc), and many other attributes to define what a service is and how it is delivered.

A typical example of a Support Item might be:

<table data-view="cards"><thead><tr><th>Support Item Name</th><th>Service Day</th><th>Service Time</th><th>Unit of Measure</th></tr></thead><tbody><tr><td>Therapy Services</td><td>Weekday</td><td>Morning</td><td>Hours</td></tr><tr><td>Wheelchair</td><td>Anytime</td><td>Anytime</td><td>Unit</td></tr><tr><td>Support Coordination</td><td>Saturday</td><td>Anytime</td><td>Hours</td></tr></tbody></table>

### Purpose

The purpose of Support Items is to define the service being delivered as well as capture them in the [Service Agreement](service-agreement.md) for a [Participant](participant.md). A number of funding strutures may use Support Item differently, for example, in the NDIS, Support Items are billed differently depending on when a service is delivered. In this case, it would be useful to have mutliple Support Items for each time (such as morning or afternoon) and associate these with the appropriate [Price List](price-list.md).

### Usage

Support Items are used widely within Maica, including in the management of [Service Agreements](service-agreement.md), [Appointment Services](appointment-service.md), and [Invoices](invoice.md). These records bring together the funding captured under a [Service Agreement](service-agreement.md) with the [Appointment Service](appointment-service.md) being delivered within an [Appointment](appointment.md) or [Shift](shift.md).

### Item Number Override&#x20;

An important field to call out here is the `Item Number Override`, specifically added for **Support at Home**. &#x20;

The **Item Number Override** field allows you to define your own Support Item Numbers for **Support at Home** Products/Support Items when variations or custom pricing are required. This addresses scenarios where the standard Services Australia Product catalogue does not support specific pricing or item definitions.

{% hint style="info" %}
Some Support at Home products may require alternative item numbers due to:

* Non-standard or variable pricing requirements.
* Variants such as daytime, afternoon, evening, or overnight rates.
* Gaps in the Services Australia product catalogue where no equivalent Support Item definition exists.

The **Item Number Override** field enables Providers to enter a custom item number that best suits these use cases.
{% endhint %}

Please refer to the field details in the table below:&#x20;

<table><thead><tr><th width="211.90625">Field Label</th><th width="124.328125">Object</th><th width="85.09765625">Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>Item Number Override</strong></td><td>Product / Support Item</td><td>Text</td><td>Defines a custom Support Item Number for Support at Home products. Can be used when the default Services Australia item number is not sufficient.</td></tr></tbody></table>

{% hint style="info" %}
The existing **Support Item Number** field can be left blank if an override value is used
{% endhint %}

Products or Support Items with an override item number can be included in:

* **Price Books**
* **Service Agreements**
* **Budget Planning and Claims Processes**

{% hint style="warning" %}
**Please note:** It is _not advised_ to populate the **Item Number Override** field for **NDIS Products and Services**.

This field is intended specifically for **Support at Home** use cases where flexibility is needed for pricing or categorisation.
{% endhint %}

### Final Thoughts

Support Items are the backbone of setting up your services, particularly via [Appointment Services](appointment-service.md). We would typically expect a Maica solution to have potentially hundreds of Support Items to distinguish between each service. There is absolutely no issue with having many Support Items in your catalogue. &#x20;
