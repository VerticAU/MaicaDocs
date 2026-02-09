---
description: Learn how to Synchronise Participant Information with the NDIS in Maica
---

# Synchronise Participant Information

## What is the `Synchronise Participant Information` Quick Action?

The `Synchronise Participant Information` Quick Action in **Maica** allows you to connect with the PRODA/NDIS systems to retrieve key `Participant` data such as Plan Records, Plan Budgets, Plan Goals, and Service Bookings from the PRODA.&#x20;

Essentially, it will generate a `Funding Record` for your Participant with the relevant and selected data directly from the NDIS/PRODA.&#x20;

{% hint style="info" %}
To learn the diference between how Maica behaviours for PACE and Non-Pace Plans, [click here](funding-record-overview.md#understanding-ndis-plan-synchronisation-pace-and-non-pace).&#x20;
{% endhint %}

## Where do I find the `Synchronise Participant Information` Quick Action?

The `Synchronise Participant Information` Quick Action in **Maica** is located in the top right corner of your interface on the `Participant` Record, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/sync button.png" alt=""><figcaption></figcaption></figure>

The Quick Action will retrieve the following information from PRODA for your Participants:&#x20;

* `Plan` and `Plan Budgets`
* `Plan Goals` as recorded on the Participant's Plan with the NDIS
* `Service Bookings` and `Booking Items`

## How do I use the `Synchronise Participant Information` Quick Action?

To begin Syncing Data for your Participant, simply click the `Synchronise Participant Information` Quick Action to display the following pop-up:&#x20;

{% hint style="warning" %}
Maica needs certain information about the Participant in order to retrieve the information from the NDIS systems, including `Last Name`, `Date of Birth`, and `NDIS Number`. This needs to be populated in the [Participant Record](../) before the Sync can be successful.&#x20;
{% endhint %}

<figure><img src="../../../.gitbook/assets/Screenshot 2024-09-04 at 11.54.39 am.png" alt=""><figcaption></figcaption></figure>

Here, you can nominate which Data you wish to Sync with Maica, including:&#x20;

* `Plan Budgets`: These are retrieved from the NDIS Plan the Participant has set up with the agency.

{% hint style="info" %}
In order to retrieve `Plan Budgets` you must first confirm that the `Participant` has provided Consent to access the Data via the NDIS Participant Portal. Plan Budget data is not available to all Providers. Records will only be returned if you have the required consent in place according to the NDIS guidelines.
{% endhint %}

* `Plan Goals`: These are retrieved from the NDIS Goals the Participant has set up with the agency.

{% hint style="info" %}
Syncing any `Plan Goals` will remove all current `Goals` and refresh them with the Data from the NDIS.&#x20;
{% endhint %}

* `Service Bookings`: This will retrieve all associated (and available) Service Bookings for the Participant.

Once you have selected which Data you wish to Sync, click `Confirm` and **Maica** will connect directly to the NDIS to retrieve the following information. Once done, you will see the following Summary screen.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-09-04 at 12.09.26 pm.png" alt=""><figcaption></figcaption></figure>

At this stage, you can close the pop-up and your Data in **Maica** will updated accordingly.&#x20;
