---
description: Learn how to manage Service Bookings in Maica
---

# Manage Service Booking

## How do I manage a Service Booking in Maica?&#x20;

In Maica, you can manage `Service Bookings` through the `Manage Service Booking` Quick Action located on the `Service Booking Record`.&#x20;

The `Manage Service Booking` Quick Action in Maica allows you to manage previously created Service Bookings for your `Participants`. It connects a variety of common PRODA operations directly into **Maica**, eliminating the need for you to handle updates twice and split your work between two applications.

Please follow the steps below to manage a Service Booking:&#x20;

### 1. Use the `Manage Service Booking` Quick Action&#x20;

The first step in managing a `Service Booking` is simply clicking the `Manage Service Booking` Quick Action located on the `Service Booking Record`, as shown below:&#x20;

<figure><img src="../../../.gitbook/assets/manage service booking.png" alt=""><figcaption></figcaption></figure>

### 2. Select Management Action

Once you clicked on the Quick Action above, you will be shown the `Manage Service Booking` pop-up, as shown below:&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-10-17 at 2.36.48 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Please note that if the `Service Booking` `Start Date` is before 1 Jul 2024 then the only available option will be **Reduce End Date**.
{% endhint %}

Here you will be asked to select which management action you wish to perform. Each action is explained further below:&#x20;

#### Update (Extend, Reallocate CORE Budget)&#x20;

If a `Service Booking` has multiple `Booking Item` records for a **Flexible** or **Core** `Support Category` (01–04), **Maica** allows you to alter the `Quantity` or `Rate` to move funding across these `Booking Item` records. You can do this if there is enough Total Remaining Budget for the parent `Service Booking`.

In order to do this, simply update the `Quantity` and/or `Rate` using the input fields shown below.&#x20;

<figure><img src="../../../.gitbook/assets/core budget fields.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Make sure to tick the box indicating that you discussed this update with the Participant before submitting it to the NDIS.
{% endhint %}

Once the update has been successfully completed, the `Booking Item` records will be modified to reflect the budget reallocation.

{% hint style="info" %}
Whilst **Maica** will not prevent you from **exceeding** the Remaining Amount, a warning will be displayed that the Service Booking Remaining Amount is being exceeded.
{% endhint %}

#### Reduce End Date

If circumstances change between you and one of your Participants, you can utilise **Maica** to cancel or end a `Service Booking`.

In order to do this, you do not need to remove the `Service Booking`; instead, reduce the End Date and enter a date between Today and the current `Service Booking` End Date. This will automatically trigger a cancellation in PRODA.

When you reduce the end date or end a service booking, you should keep the following points in mind:

* You cannot backdate a Service Booking's End Date to a date earlier than the date you are amending it.
* PRODA (and thus Maica) does not have a distinct Cancelled Status value, hence there is nothing on the record in Maica to indicate that the End Date has been decreased and the Service Booking cancelled. As a result, we have included an Info Panel to the Quick Action to notify you that you will receive an error if you try to reduce the End Date again, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-09-05 at 2.33.54 pm.png" alt=""><figcaption></figcaption></figure>

Under the Reduce End Date action, you can also manage **Retained** or **Accrual** `Booking Item` Amounts. Here, you have the option to add an accrual amount to ensure that sufficient funds are retained in the `Service Booking` to cover pending `Payment Requests` for services rendered.

Unspent funds are refunded to the available support category balance. This means that you can continue to claim for services provided (via `Invoices` and `Payment Requests`), but the `Participant` can use the unspent funds in a new `Service Booking` with a new Provider.

<figure><img src="../../../.gitbook/assets/accrual amount.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
For more information regarding how to Cancel or End a `Service Booking` correctly and what happens in PRODA, please refer to the NDIS reference linked [here](https://www.ndis.gov.au/providers/working-provider/connecting-participants/managing-service-bookings#ending-a-service-booking).
{% endhint %}

#### Approve&#x20;

If one of your Participants has chosen the NDIA to pay their Providers, i.e. Agency Managed, then a `Service Booking` is created by the NDIA to link the supports in their `Plan` to their chosen Providers. As **Maica** is listening to the `New Service Booking Provider` notification, this Agency Managed `Service Booking` will appear in **Maica** with a Status of `Awaiting Provider Approval` or `Change Awaiting Provider`.

Given the `Service Booking` is created by the NDIA (and not you), you must **approve** the `Service Booking` **before** the Participant receives services. This ensures your Participant has funding allocated to pay your `Invoices` .

Use the Manage `Service Booking` Quick Action to Approve the `Service Booking` and begin delivering services.

#### Reject&#x20;

The `Reject` option corresponds to the `Approve` function, as stated above. If you do not agree or approve the `Service Booking` created/updated by the NDIA, you can reject it using the Manage Service Booking Quick Action.

#### Delete&#x20;

{% hint style="info" %}
The Delete function provides the ability to update the `Service Booking` `Status` to `Deleted`. This will **not** delete the `Service Booking` record in **Maica**.&#x20;
{% endhint %}

{% hint style="warning" %}
If you wish to [End a Service Booking](https://www.ndis.gov.au/providers/working-provider/connecting-participants/managing-service-bookings#ending-a-service-booking), you should do this by updating the End Date, as explained [above](manage-service-booking.md#reduce-end-date). Service Bookings should not be deleted.
{% endhint %}

#### Force Sync&#x20;

Because the NDIS is ultimately in charge of `Service Booking` Data, it is crucial that the NDIS and **Maica** are coordinated and consistent, this where the Force Sync becomes helpful.

In the event you believe a **Maica** `Service Booking` record has become misaligned with the PRODA version, use the **Force Sync** option to update the `Service Booking` and associated `Booking Item` records.&#x20;

Essentially, all the data stored on these records will be updated and replaced with what is current in PRODA.

{% hint style="info" %}
Please note: any manual data updates you have made to the Maica fields on the `Service Booking` and `Booking Item` records will be **overwritten** when the records by the force sync.&#x20;



Any custom fields (i.e. created by you and not **Maica** during the sync process) will not be affected.
{% endhint %}
