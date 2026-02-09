---
description: Learn about the Funding Record and what information it captures in Maica
---

# Funding Record Overview

## What is a Funding Record?&#x20;

In Maica, the `Funding` record contains key information that will drive interactions with your `Participants`, as well as serving as the foundation for some central **Maica** functions, such as `Service Booking` creation.

A `Funding` record is where you can find the following information and functionality:

* PACE Information
* Plan Budget Information
* Plan Period Information (Start Date & End Date)
* NDIA Synchronisation Information (NDIS Reference & Last Sync Date)
* Plan Goals
* Service Bookings

{% hint style="info" %}
You can also create a `Service Booking` in **Maica** and PRODA directly from the `Funding` record. Click [here](service-booking-overview.md) to learn more about creating `Service Bookings`.
{% endhint %}

## **Understanding NDIS Plan Synchronisation (PACE & non-PACE)**

***

### **How Maica Synchronises Plans**

When you run [**Synchronise Participant Information**](synchronise-participant-information.md), Maica connects with the NDIS API (via PRODA) to fetch the latest NDIS plan data for a Participant. Maica then uses this information to populate and maintain `Funding` records.

Maica uses different logic for **PACE plans** versus **non-PACE plans**:

***

**Non-PACE Plans**

* Maica attempts to match the incoming NDIS plan using the **NDIS reference ID** (the unique plan identifier from the API).
* If a matching plan already exists in Maica:
  * Maica **updates** the existing record with any new data.
* If no matching plan exists:
  * Maica **creates** a new `Funding` record.

This ensures that your Maica funding data stays consistent with the NDIS plan lifecycle.

***

**PACE Plans**

Unlike traditional plans, **only one PACE plan will exist per Participant** in Maica, even if the plan is no longer “active” in date terms.

* When a PACE plan is returned from the NDIS API:
  * Maica looks for any existing `Funding` records where `PACE Plan` = TRUE for the Participant — _not just active ones_.
  * If a PACE plan exists:
    * Maica **updates** that PACE `Funding` record with the latest details from the API.
    * This includes updates such as extended `End Dates` or changes to funding periods.
  * If no PACE plan exists:
    * Maica **creates** a new PACE `Funding` recor&#x64;**.**

{% hint style="info" %}
**Maica will never create more than one PACE** `Funding` record for a Participant.
{% endhint %}

This change improves data accuracy and avoids duplication, especially where plan end dates are extended or adjusted.

## How do I create a Funding Record?&#x20;

{% hint style="warning" %}
A very important point to note about `Plan` records is that they are created and updated in PRODA only and not **Maica**. PRODA is the master of this information and **Maica** simply retrieves the most up-to-date `Plan` information and create a `Funding` record based on the retrieved information. What this means is that any updates to the `Funding` record in **Maica** will not be reflected in PRODA. This applies to `Plan Goal` records also. You cannot create a `Funding` record for your `Participants` in **Maica** without retrieving the information directly from PRODA first.&#x20;
{% endhint %}

As mentioned above, `Plan` records are created and updated in PRODA, **Maica** only retrieves the information and populates a `Funding` record based on the retrieved information.&#x20;

In order to retrieve the required information to populate `Funding` records for your Participants, refer to Maica's [`Synchronise Participant Information`](synchronise-participant-information.md) Quick Action tool.&#x20;

## What are the key components of a Funding Record?&#x20;

A `Funding` Record contains a number of components, these are explained in further detail below.&#x20;

### Funding Item

The `Funding Item` represents the specific Plan Budget Items or Funded Supports included in a Participant's `Plan`. Generally, these define what `Support Category` and `Support Item` (for a stated support) can be selected to form part of a `Service Booking`.

If `Funding Item` records exist in **Maica**, they will be used as an outline when a `Service Booking` is being created. This essentially means that the Categories and Amounts from the `Funding Item` will be used as the default `Booking Items` in the `Create Service Booking` Quick Action.&#x20;

To learn more about that the `Create Service Booking` Quick Action, click [here](service-booking-overview.md).

{% hint style="warning" %}
`Plan Budget` records can only be retrieved by **Maica** and used to generate `Funding Item` records if your Organisation satisfies **all** of the required criteria set by the NDIS. Please contact the NDIA directly if you want more information regarding `Plan Budget` access as **Maica** does not manage or enable this.
{% endhint %}

`Funding Item` information will be accessible on the right hand side of your `Funding` record interface, and will include Budget records and a summary component, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-09-05 at 10.49.50 am.png" alt=""><figcaption></figcaption></figure>

#### Funding Period

`Funding Periods` allow the NDIA to define how often Participants can access portions of their budget, rather than receiving full access upfront. The NDIS will issue funding intervals of 1, 3, 6, or 12 months for eligible Participants.

When `Funding Periods` exist, they will display within the related `Funding Item` in **Maica**. This allows you to view how the Participant’s total approved budget has been broken into intervals for use.

{% hint style="info" %}
**Please note:** Maica does not create or determine this information. All Funding Period information is retrieved directly from the NDIS and is presented in Maica for visibility only.
{% endhint %}

{% hint style="info" %}
Depending on your version of **Maica**, Funding Periods may also be displayed as Plan Periods.&#x20;
{% endhint %}

On the Funding Item, there will be two sections related to Funding Periods:&#x20;

#### 1. Funding Period Information

This section provides an overview of the Funding Period Information, including:

<table><thead><tr><th width="303.4703369140625">Field</th><th>Description</th></tr></thead><tbody><tr><td><code>Instalment Type</code></td><td>Defines the interval type (e.g. Regular)</td></tr><tr><td><code>Instalment Start Date</code></td><td>Start date of the current funding period</td></tr><tr><td><code>Instalment End Date</code></td><td>End date of the current funding period</td></tr><tr><td><code>Next Instalment Start Date</code></td><td>Start date of the upcoming funding period</td></tr><tr><td><code>Next Instalment End Date</code></td><td>End date of the upcoming funding period</td></tr><tr><td><code>Next Instalment Release Amount</code></td><td>Amount to be released at the start of the next funding period</td></tr><tr><td><code>Plan Component</code></td><td>Identifies the part of the plan this funding applies to (e.g. Core Flexible)</td></tr><tr><td><code>Management Type</code></td><td>Indicates if the funding is Plan Managed or Self Managed</td></tr></tbody></table>

#### 2. List of Funding Periods

Then, each individual Funding Period record is displayed in the table at the bottom of the Funding Item, including:

<table><thead><tr><th width="185.85333251953125">Field</th><th>Description</th></tr></thead><tbody><tr><td><code>Funding Period ID</code></td><td>A unique reference for each funding period. You can also click into the Funding Period ID to view the record in further detail. </td></tr><tr><td><code>Amount</code></td><td>The amount of budget available for that period</td></tr><tr><td><code>End Date</code></td><td>The final date the funds for this period are valid</td></tr><tr><td><code>Released</code></td><td>Indicates whether the funds are currently available (Yes/Not yet released)</td></tr></tbody></table>

{% hint style="success" %}
In order to learn more about Participant `Funding Periods`, click [here](https://www.ndis.gov.au/news/10721-changes-ndis-funding-periods).
{% endhint %}

{% hint style="info" %}
Please note, both Support Coordinators & Plan Managers, based on their authority, have limited access to the budget. This is not determined by Maica.&#x20;
{% endhint %}

### Funding Goal&#x20;

If the `Participant` has identified specific `Plan Goals` in their planning conversations with the NDIS, these can be retrieved and made available in **Maica** as `Funding Goals`.

{% hint style="info" %}
In order to learn more about Participant `Plan Goals`, click [here](https://www.ndis.gov.au/participants/creating-your-plan/setting-goals).&#x20;
{% endhint %}

In **Maica**, a `Funding Goal` has a Master-Detail relationship with `Funding`. This means that you cannot have a `Funding Goal` without `Funding`. Furthermore, if `Funding` is deleted, all associated `Funding Goal` records will also be deleted.&#x20;

Additionally, due to the nature of how `Plan Goal` records are stored and managed by the NDIS, Maica **re-creates** these records as part of **each sync**. This means that any changes, either new records or updates to existing records will be lost following a sync. Essentially `Plan Goal` records, like `Plans`, are managed by the NDIS and we **do not** recommend updating these records in **Maica**.&#x20;

You may wish to create your own `Participant Goals` seperate from `Funding Goals` to manage the Goals you have set between your Organisation and the Participant.&#x20;

As above, `Funding Goal` information will be accessible on the right hand side of your `Funding` record interface.

### Service Booking&#x20;

The `Service Booking` related component provides a view of all your Participants `Service Booking` records that have been created in **Maica** and PRODA that are related to the specific `Funding` you are viewing.

The `Funding` is the key component in creating a `Service Booking`, as Maica **cannot** create a `Service Booking` in PRODA without a reference to the `Funding`.

{% hint style="info" %}
Similar to the `Funding` and `Funding Goal` information, the NDIS provides a number of `Service Booking` resources you can refer to for more information. Please click [here](https://www.ndis.gov.au/participants/working-providers/service-bookings) to learn more.&#x20;
{% endhint %}

`Service Bookings` can be created in **Maica** directly from the Funding Record, to learn more about this process, click [here](service-booking-overview.md).&#x20;

As above, `Service Booking` information will be accessible on the right hand side of your `Funding` record interface.

## What other information is stored in a Funding Record?

### Budget Information&#x20;

The Budget Information section has a number of Roll-Up Summary fields that collect data from the corresponding `Funding Item` record(s). For example, if there are five `Funding Item` entries, each with an Approved Amount of $2000, the `Fundings` record's Total Approved Value will be $10,000.

If there is no `Funding Item` data, all Totals will be $0 with 0% Utilisation.

<table><thead><tr><th width="200">Field Name</th><th>Notes</th></tr></thead><tbody><tr><td><code>Total Approved</code></td><td><strong>SUM</strong> total of the <code>Approved Amount</code></td></tr><tr><td><code>Total Allocated</code></td><td><strong>SUM</strong> total of the <code>Allocated Amount</code></td></tr><tr><td><code>Total Remaining</code></td><td><strong>SUM</strong> total of the <code>Remaining Amount</code></td></tr><tr><td><code>Total Spent</code></td><td><strong>SUM</strong> total of the <code>Spent Amount</code></td></tr><tr><td><code>Utilisation</code></td><td><strong>Formula</strong> that divides the <code>Total Approved</code> by the <code>Total Spent</code> to display a percentage indicating how much of the total <strong>Approved</strong> <code>Plan Budget</code> has been spent.</td></tr></tbody></table>

### NDIA Synchronisation Information&#x20;

The NDIA Synchronisation Information section contains information on to help identify your Participants Plan in PRODA as well as when it was last synchronised in Maica.<br>

<table><thead><tr><th width="200">Field Name</th><th>Notes</th></tr></thead><tbody><tr><td><code>NDIS Reference</code></td><td>The unique identifier (or ID) assigned to the Plan in PRODA. This is not generated by <strong>Maica</strong>.</td></tr><tr><td><code>Last NDIS Sync</code></td><td>Represents the date and time the <code>Plan</code> record was last synchronised or refreshed from PRODA.</td></tr></tbody></table>

## Things to be aware of: NDIS Funding Records&#x20;

### 1. Automatic Plan Extensions&#x20;

If your `Plan` expires and your new `Plan` has not yet been finalised, the NDIS will automatically extend your current `Plan` for up to another 12 months.

This means that your present financing will continue until your new `Plan` is finalised, ensuring that you have no gaps in your money or support.

If your current `Plan` is less than a 12-month plan, your extended `Plan` will be for the same time period; for example, a six-month `Plan` will be automatically extended for six months.

**Maica** 'listens' for this event in PRODA and will extend the `End Date` of the corresponding `Funding Record` for you.

### 2. Service Booking Extensions

If the `Plan` has been automatically extended as described above, the `End Date` will be automatically extended for all active `Service Booking Records`.

Again, in this instance, **Maica** will update all relevant `Service Booking Records`.&#x20;
