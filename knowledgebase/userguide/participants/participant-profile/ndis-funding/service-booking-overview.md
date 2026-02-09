---
description: Learn about Service Bookings and how they are managed in Maica
---

# Service Booking Overview

## What is a Service Booking?&#x20;

The NDIS defines a `Service Booking` as the following:&#x20;

> Service Bookings are used to set aside funding for an NDIS registered provider for a support they will deliver.

Essentially, it is an agreement between an NDIS participant and a registered service provider that allocates a specific portion of the participant's NDIS funding for certain services. Service bookings are used to reserve funding for services that the participant plans to receive under their NDIS plan.

{% hint style="info" %}
If you're looking for detailed information about Service Bookings and their importance in the NDIS, refer to the Service Booking resources published by the **NDIS** [here](https://www.ndis.gov.au/participants/working-providers/service-bookings).&#x20;
{% endhint %}

{% hint style="warning" %}
In the upcoming PACE system rollout from the NDIS, `Service Bookings` are being phased out to offer participants greater flexibility with their NDIS funds. Hence, this section will only be relevant for your non-PACE Participants.&#x20;
{% endhint %}

## What are the components a Service Booking Record?&#x20;

In Maica, you can find the following information and functionality on a Service Booking Record:&#x20;

* Budget Information (Funding Information)
* Service Booking Period Information (Start Date & End Date)
* Service Booking Progress Information (Period and Funding Utilisation )
* NDIA Synchronisation Information (NDIS Reference & Last Sync Date)
* Booking Items (where the actual details of the funded supports are defined)

## Service Booking Statuses

When it comes to the `Status` of a `Service Booking`, we have used the same `Service Booking Status` variables seen in PRODA and simply replicated them in **Maica**. This ensures familiar terminology and consistency across `Service Booking` records in PRODA and **Maica**. Please refer to the table below to view the status values and their related API names.

| Status                        | API Name |
| ----------------------------- | -------- |
| In Process                    | `INPR`   |
| Awaiting Participant Approval | `APAP`   |
| Awaiting Provider Approval    | `APRO`   |
| Change Awaiting Participant   | `APAC`   |
| Change Awaiting Provider      | `APRC`   |
| Rejected                      | `REJT`   |
| Approved                      | `APPR`   |
| Completed                     | `CMPD`   |
| Deleted                       | `DELE`   |

{% hint style="info" %}
The `Deleted` `Status` does not actually delete the `Service Booking` record from **Maica**. When an NDIS staff member deletes a `Service Booking` in PRODA, it may be assigned this `Status` value. This value cannot be set via the **Maica** functionality.

If you want to cancel (or stop) a `Service Booking`, utilise the `Manage Service Booking` Quick Action, specifically the Reduce stop Date option. To learn more about managing a `Service Booking`, click [here](manage-service-booking.md).&#x20;
{% endhint %}

{% hint style="info" %}
When generating `Reports` for your `Service Bookings`, Salesforce will refer to them by their `API Name` rather than the `Status` name.&#x20;
{% endhint %}

## How do I create Service Bookings?&#x20;

In Maica, you can create `Service Bookings` through the `Create Service Booking` Quick Action located on the `Funding Record`.&#x20;

The `Create Service Booking` Quick Action in Maica allows you to create Service Bookings for your `Participants` that will Sync directly with the NDIS.

To learn more about the `Create Service Booking` Quick Action, click [here](create-service-booking.md).&#x20;
