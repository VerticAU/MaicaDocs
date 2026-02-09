---
description: >-
  This article shows you how to send a Participant a list of their upcoming
  appointments using the Upcoming Appointments Quick Action available on the
  Contact record.
---

# Emailing Upcoming Appointments

Maica allows authorised users to send Participants a list of their upcoming appointments directly via email. This is achieved using a configured Lightning Email Template and a streamlined Quick Action accessible from the Contact record

## What are Upcoming Appointments?

Upcoming Appointments refer to scheduled sessions or services linked to a Participant that are due to occur within a specified date range. These can include therapy sessions, consultations, or any other service activities recorded in Maica.

## How do I Email Upcoming Appointments to a Participant?&#x20;

### Step 1: Select the Upcoming Appointments Quick Action

1. Open the Participant’s **Contact** record in Maica.
2. In the top-right corner of the record, click the **Upcoming Appointments** Quick Action.

### Step 2: Choose the Date Range

1. In the pop-up modal, begin by entering a **Start Date** and **End Date**.

{% hint style="info" %}
This defines the window of appointments you want to include in the email.
{% endhint %}

2. Select the **Status**

{% hint style="info" %}
This filters which appointments will be included.
{% endhint %}

### Step 3: Apply Additional Filters (_Optional_)&#x20;

You can further narrow down the list of appointments by applying any of the following filters:

* **Appointment Service**
* **Resource**
* **Location**

{% hint style="info" %}
Note, If no filters are applied, all values will be included by default.
{% endhint %}

{% hint style="info" %}
Appointments are selected based on whether they are linked to the Participant (Contact) through:

* `Appointment → Location`
* `Appointment → Delivery Activity → Appointment Service`
* `Appointment → Appointment Resource → Resource`

Only appointments falling within the filter criteria are displayed and sent.
{% endhint %}

### Step 4: Click Generate

Once all filters are set:

1. Click **Generate**.
2. Maica will create an email using your organisation’s Upcoming Appointments template.
3. The list of matching appointments will be included directly in the body of the email.

{% hint style="info" %}
The email will be sent using the **From Email Address** and **Email Template** set in the Upcoming Appointments settings. To learn more about these Settings, [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/upcoming-appointments).&#x20;
{% endhint %}

## FAQs

<details>

<summary><strong>Can I customise the appointment email format?</strong></summary>

Yes. A default Lightning Email Template called _Upcoming Appointments Email Template_ is provided. It can be cloned and tailored to match your organisation's branding.

</details>

<details>

<summary><strong>Can appointments be sent as a PDF attachment?</strong></summary>

No. As of now, appointments are sent embedded within the email body only.

</details>

<details>

<summary><strong>What happens if no appointment status is selected?</strong></summary>

All statuses will be included by default if none are selected in the filter.

</details>

<details>

<summary><strong>Why am I not seeing the Quick Action?</strong></summary>

Access to the Quick Action depends on your user role and page layout configuration. Contact your administrator if it is not visible.

</details>
