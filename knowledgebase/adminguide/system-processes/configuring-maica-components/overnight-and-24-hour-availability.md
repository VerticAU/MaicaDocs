---
description: Learn how to configure Overnight Availability in Maica
---

# Overnight and 24 Hour Availability

## How do I set up Overnight Availability Records?&#x20;

To enable Overnight or 24 Hour Availability for a `Resource`, you must first properly configure an `Operating Hour` Record. To do so, follow the steps outlined below.

{% hint style="success" %}
As **Maica** creates `Availability` by referencing `Operating Hour` records, it is critical to appropriately configure an Overnight or 24 Hour `Operating Hour` record before attempting to plan a `Resource's` `Availability`.
{% endhint %}

### 1. Search for `Operating Hours` in the App Launcher or directly from the `Resource`

In Maica, there are two ways to create your `Operating Hours` record, these are:&#x20;

* Through the Salesforce App Launcher&#x20;
* Directly from the Resource Availability Record

Follow the steps below to see how they both work:

#### 1. Salesforce App Launcher&#x20;

In the Salesforce App Launcher, search for `Operating Hours`.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2025-02-06 at 9.17.14 am.png" alt="" width="294"><figcaption></figcaption></figure>

Then, simply select it to open the list view of all `Operating Hours` in your **Maica** instance, as shown below. Click `New` to begin populating your record.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2025-02-05 at 2.14.16 pm.png" alt=""><figcaption></figcaption></figure>

#### 2. Through the Resource Availability Record

Navigate to a `Resource` you wish to create an Overnight or 24 hour Availability record for. Then, under `Availability`, click `New`.

This will bring up the New Availability module, as shown below. Once here, navigate to the Operating Hours field, select it as if you were to assign an Operating Hours record, and click `New Operating Hour`.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2025-02-06 at 9.19.16 am.png" alt=""><figcaption></figcaption></figure>

### 2. Create new `Operating Hours` Record

After the pop-up is displayed, you will be prompted to fill-in the following fields:&#x20;

<table><thead><tr><th width="267">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Name</code></td><td>A descriptive name for the Operating Hour record.</td></tr><tr><td><code>Weekday</code></td><td>The day(s) of the week when this operating hour applies. You can select one or multiple days.</td></tr><tr><td><code>Start Time</code></td><td>The time when the operating hour begins for the selected weekday(s).</td></tr><tr><td><code>End Time</code></td><td>The time when the operating hour ends for the selected weekday(s).</td></tr></tbody></table>

To configure the `Operating Hours` records that enable overnight or 24-hour `Availability` for `Resources` in **Maica**, you will need to follow slightly different processes.

See the respective sections below for further information on each one.

#### 24 Hour Availability Configuration&#x20;

To set up an Operating Hour record to allow for 24 hour Availability, you need to set up the record so that:

* The `Start Time` and `End Time` are the same (e.g., **12:00 AM to 12:00 AM**).
* The **selected weekdays define the active period** (e.g., selecting **Monday and Tuesday** allows bookings spanning from Monday through to Wednesday).

{% hint style="info" %}
The system allows **appointments to be booked across multiple days** as long as they do not exceed the defined maximum (e.g., **48 hours if two consecutive days are selected**).
{% endhint %}

***

#### For example:&#x20;

If you wanted to book a Resource for an overnight Appointment **on Mondays and Tuesdays**, meaning they can take appointments that span **Monday through Wednesday,** then:&#x20;

1. Assign an **Operating Hour** record with the following inputs:
   * **Name:** "_Organisation Preference_"
   * **Weekday:** Monday, Tuesday
   * **Start Time:** **12:00 AM**
   * **End Time:** **12:00 AM**
2. Save the record.

{% hint style="warning" %}
Note,&#x20;

* If a user tries to book an appointment beyond the allowed range (e.g., past Wednesday in this case), **Maica** will not allow it.
* If a non-consecutive day is selected (e.g., Monday and Wednesday but not Tuesday), the system **prevents bookings that cross the missing day**.
{% endhint %}

#### Overnight  Availability Configuration

To set up an **Operating Hour** record to allow for **Overnight Availability**, you need to configure the record so that:

* The **End Time is earlier than the Start Time** (e.g., **6:00 PM to 6:00 AM**).
* A **single weekday is selected**, meaning the availability will carry into the following day.

{% hint style="info" %}
**Maica** recognises overnight availability when the End Time is before the Start Time, allowing availability to extend past midnight into the next day.
{% endhint %}

***

#### **For example:**

If you wanted to book a **Resource** for an overnight shift that starts on **Monday at 6:00 PM and runs until Tuesday at 6:00 AM**, then:

1. Assign an **Operating Hour** record with the following inputs:
   * **Name:** "_Organisation Preference_"
   * **Weekday:** Monday
   * **Start Time:** **6:00 PM**
   * **End Time:** **6:00 AM**
2. Save the record.

### 3. Assign Availability to the Resource&#x20;

Once the `Operating Hour` record has been created, the next step is to assign it to a `Resource’s` `Availability`. This ensures that the `Resource` follows the configured operating hours when scheduling Appointments.

Once your Availability Record has been created with the correctly configured Operating Hours, you will be ready to schedule Overnight or 24 Hour Appointments.&#x20;
