---
description: Learn about the information in an Appointment Summary
---

# Summary

## What does the Summary stage include?

The Summary provides an overview of the [Appointment](../../getting-started/maica-key-concepts/appointment.md), including the selected `Start Date`, `Start Time`, `End Date` and `End Time`. It also summarises each selected [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) for each selected [Participant](../../getting-started/maica-key-concepts/participant.md), as described in the below image and by the below table:

<figure><img src="../../.gitbook/assets/summary numbers better.png" alt="" width="563"><figcaption></figcaption></figure>

<table><thead><tr><th width="178">Reference </th><th>Description </th></tr></thead><tbody><tr><td>1</td><td>This is the <a href="../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a> selected at the <a href="basic-details.md">Basic Details</a> stage</td></tr><tr><td>2</td><td>This is the <a href="../../getting-started/maica-key-concepts/participant.md">Participant(s)</a> selected at the <a href="basic-details.md">Basic Details</a> stage</td></tr><tr><td>3</td><td>This is the Claim Type selected at the <a href="basic-details.md">Basic Details</a> stage</td></tr><tr><td>4</td><td>This is the quantity based on the <a href="summary.md#id-2.-quantity-unit-of-measure">Unit of Measure</a>. <br><br>If the Unit of Measure is hourly, the Quantity field will show a Quantity based on the created <a href="../../getting-started/maica-key-concepts/appointment.md">Appointment</a>'s <code>Start</code> and <code>End</code> time for each selected <a href="../../getting-started/maica-key-concepts/participant.md">Participant</a>. For example, the shown Appointment time is from 8:15am - 11:45am, this is a quantity of 3.5 which represents 3 and a half hours. This field is adjustable for each <a href="../../getting-started/maica-key-concepts/participant.md">Participant</a>, please refer to the <a href="summary.md#id-1.-adjusted-quantity">Adjusted Quantity</a> section below for further information. <br><br>As mentioned, this field is dependant on the Quantity Unit of Measure, The possible fields are further described <a href="summary.md#id-2.-quantity-unit-of-measure">below</a>. </td></tr><tr><td>5</td><td>This is the Number of Appointments based on the Recurring Schedule calculated at the <a href="schedule.md">Schedule</a> stage </td></tr><tr><td>6</td><td>This is the total cost of the Appointments based on the Recurring Schedule calculated at the <a href="schedule.md">Schedule</a> stage. It is a sum of the total number of individual Appointments. </td></tr></tbody></table>

## Things to look out for: Summary

### 1. Adjusted Quantity

If the Unit of Measure if Hourly, then the Quantity field offers you flexibility within an [Appointment](../../getting-started/maica-key-concepts/appointment.md) to control how long each [Participant](../../getting-started/maica-key-concepts/participant.md) may spend at an [Appointment](../../getting-started/maica-key-concepts/appointment.md) or how long each Service may be delivered for. For example, if `Margaret Johnson` will attend the created [Appointment](../../getting-started/maica-key-concepts/appointment.md) for the full 3.5 hours, but `Luca Milne` may only attend for 2 hours and I wanted to bill accordingly, I would adjust Luca's quantity.&#x20;

When adjusting the quantity for a [Participant(s)](../../getting-started/maica-key-concepts/participant.md), **Maica** will alert you with a symbol indicating that you have individual [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) that does not correspond with the details of your [Appointment](../../getting-started/maica-key-concepts/appointment.md). This is not an error, but rather an alert to identify the adjusted quantity. Once you have changed the quantity for a [Participant(s)](../../getting-started/maica-key-concepts/participant.md), the total Appointment cost will also automatically update. Please refer to the image below for an example with an updated quantity and the changes **Maica** will display:

<figure><img src="../../.gitbook/assets/summary quantity.png" alt="" width="563"><figcaption></figcaption></figure>

{% hint style="info" %}
The unit of measurement for the quantity is dependant on the service delivered and its associated [Support Items](../../getting-started/maica-key-concepts/support-item.md).
{% endhint %}

### 2. Quantity Unit of Measure

The Quantity Unit of Measure field describes the billing frequency of the Support Item(s) making up the selected Appointment Service. These could be any of the following:&#x20;

* `Hourly`&#x20;
* `Daily`
* `Weekly`&#x20;
* `Monthly`&#x20;
* `Yearly`
* `Each`&#x20;

{% hint style="info" %}
Please note, the Appointment Service Quantity Unit of Measure will take on the majority selection of the encompassing Support Items within the Service. To learn more, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/configuring-maica-components/support-items).&#x20;
{% endhint %}

{% hint style="success" %}
If the Quantity Unit of Measure field is anything other than `Hourly`, **Maica** will default this field to `1`.&#x20;
{% endhint %}
