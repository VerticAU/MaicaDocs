---
description: Learn about Cancelling an Appointment
---

# Cancellation

## What does cancelling an Appointment involve?

When [Appointments](../../getting-started/maica-key-concepts/appointment.md) are cancelled, **Maica** will mark the [Appointment](../../getting-started/maica-key-concepts/appointment.md) and any existing [Delivery Activities](../../getting-started/maica-key-concepts/delivery-activity.md) as `cancelled` rather than simply deleting the [Appointment](../../getting-started/maica-key-concepts/appointment.md) and associated information.

**Maica** supports two scenarios in which [Appointments](../../getting-started/maica-key-concepts/appointment.md) can be cancelled, including:

1. **Single Appointments:** They are cancelled by simply setting all related [Delivery Activities](../../getting-started/maica-key-concepts/delivery-activity.md) to cancelled and the Appointment `Status` is also set to cancelled. _**Appointments are not deleted.**_
2. **Recurring** **Appointments:** They are cancelled for either only the specific [Appointment](../../getting-started/maica-key-concepts/appointment.md) being managed or for any future [Appointments](../../getting-started/maica-key-concepts/appointment.md) part of the [Recurring Schedule](../../the-planner/planner-views-and-modes/schedule.md). Maica will display the following option when a Recurring Appointment is attempted to be cancelled. _Appointments are not deleted._

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-06 at 1.39.48 pm.png" alt="" width="466"><figcaption></figcaption></figure>

{% hint style="info" %}
If you select to cancel the selected **Appointment** only, then Maica will remove this **Appointment** from the Recurring Schedule and effectively turn this **Appointment** into a single **Appointment** with all changes reflected.
{% endhint %}

## Cancellation Requested Date

When an Appointment is to be cancelled, **Maica** can capture the Date/Time of the cancellation request. This allows you to record the actual cancellation request time rather than it defaulting to the time when the cancellation action is performed. This ensures more accurate tracking of cancellation events and appropriate calculation of related charges.

The `Cancellation Requested Date` field allows you to manually input the date and time of the client's cancellation request, ensuring **Maica** records accurate information and processes Cancellation charges correctly.

#### For example:&#x20;

* A client requests the cancellation of an Appointment scheduled for 10:00 AM, 5th December 2024, at 8:00 AM, 5th December 2024.&#x20;
* You, as the user, cancel the Appointment in the Planner at 12:00 PM, 5th December 2024.&#x20;
* You can then populate the Cancellation Requested Date field with 8:00 AM, 5th December 2024 (the time the client made the request).&#x20;
* **Maica** uses the Cancellation Requested Date to determine Cancellation charges, reflecting the correct timeline and avoiding overcharging.

## Cancellation Reason&#x20;

When cancelling an Appointment, Maica asks for a `Cancellation Reason`. If a `Cancellation Reason` is selected, Maica requires a `Cancellation Date`.&#x20;

{% hint style="info" %}
To learn more about how Maica validates the parameters of an Appointment cancellation, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/appointment#cancellation-date-required-when-cancellation-reason-is-set).&#x20;
{% endhint %}

The Cancellation UI with all the above fields is shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-16 at 11.33.00 am.png" alt=""><figcaption></figcaption></figure>
