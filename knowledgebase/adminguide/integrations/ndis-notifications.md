---
description: Learn how to Integrate with Stripe within Maica
---

# NDIS Notifications

## What are NDIS Notifications?&#x20;

NDIS Notifications are data updates made available through webhooks for integrated systems when certain events occur within the NDIS. These notifications provide information on changes within the NDIS through webhooks, which Maica uses to capture and display event data. This data is then displayed or updated within the application as needed.

{% hint style="info" %}
It is important to note that NDIS notifications via webhooks are **not real-time alerts** sent to users in the traditional sense. Instead, they function as **data updates** that are made available through webhooks when specific events occur on the NDIS side. These notifications simply provide information that **Maica** can retrieve and display to users, but they don't actively notify users on their own.
{% endhint %}

To further understand NDIS Notifications, please refer to the definitions from the NDIS:&#x20;

<table><thead><tr><th width="190">Term</th><th>Definition </th></tr></thead><tbody><tr><td><strong>NDIS Notifications</strong> </td><td>Digital Partners (Maica) can receive notifications for events they have subscribed to, by leveraging Webhooks.</td></tr><tr><td><strong>Webhook</strong></td><td>A webhook (also called a web callback or HTTP push API), is a lightweight API that powers one-way data sharing triggered by events. Unlike typical API's where you would need to poll for data in order to get updates in real-time, a webhook delivers data to your application as the event happens, meaning you get the data immediately.</td></tr><tr><td><strong>Events</strong></td><td>Specific actions or changes within the NDIS system that trigger data updates through webhooks. These events signify key occurrences related to a participant's plan, funding, or service interactions that integrated systems need to be aware of. Examples of events include a plan modification, a funding allocation update, or a change in the status of an invoice. When such an event occurs, the NDIS generates a webhook with the relevant data, allowing Maica to capture and reflect this information for users.</td></tr></tbody></table>

Please see the table below to see which NDIS Events Maica supports and handles.&#x20;

## Events

The following table outlines the Events Maica supports.&#x20;

{% hint style="info" %}
Each Event is linked to an associated Flow Description. This explains in more detail how the Event is handled within **Maica**.&#x20;
{% endhint %}

<table><thead><tr><th width="140">Name</th><th width="234">Code </th><th>Description</th></tr></thead><tbody><tr><td>New Service Booking created</td><td><code>SB_NEW</code></td><td><p>The notification for this event will be triggered when a new service booking is created:</p><ul><li>By a Staff member using the staff portal</li><li>By a Participant using the myplace participant portal</li><li>By a Provider using the myplace provider portal</li><li>Via API</li></ul></td></tr><tr><td>SB End Date updated</td><td><code>SB_END_DATE_UPDATED</code></td><td><p>The notification for this event will be triggered when the end date of a service booking is updated:</p><ul><li>By a Staff member using the staff portal</li><li>By a Participant using the myplace participant portal</li><li>By a Provider using the myplace provider portal</li><li>By a Digital Partner using Provider API's PATCH</li><li>Due to a plans' end date being updated as a result of an unscheduled plan review, participant access being revoked or participant access being ceased (due to death).</li></ul></td></tr><tr><td>Service Booking Budget Updated</td><td><code>SB_BUDGET_UPDATED</code></td><td><p>The notification for this event will be triggered when the quantity and/or allocated amount of one or more supports within a service booking is updated:</p><ul><li>By a Staff member using the staff portal</li><li>By a Participant using the participant portal</li><li>By a Provider using the myplace provider portal</li><li>Via API</li></ul></td></tr><tr><td>Service Booking deleted</td><td><code>SB_DELETED</code></td><td><p>The notification for this event will be triggered when a service booking is deleted</p><ul><li>By a Participant using the myplace participant portal</li><li>By a Provider using the myplace provider portal</li><li>By a Provider using the Provider API's DELETE /{service_booking_id} operation</li></ul></td></tr><tr><td>Remittance Advise is generated</td><td><code>REMIT_ADV_GENERATED</code></td><td><p>The notification for this event will be triggered overnight and the JSON payload available in your chosen webhook, when the remittance advice is ready, for payment claims that have been processed and paid, the day before. See sample JSON payload below:</p><p><br>Please note that this notification does not currently work in the Test Vendor environment and therefore cannot be used for testing.</p></td></tr><tr><td>Budget Updated</td><td><code>BUDGET_UPDATED</code></td><td><p>This notification will allow Plan Managers and Support Coordinators to be notified when SAP participant's budget is changed given that consent is provided. The notification for this event will be triggered and sent to the Plan Manager or Support Coordinator when a participant's budget is updated, either via APIs or via a Staff Member using the Staff Portal, given that the provider has consent/authority with the related participant.<br><br>The notification will be triggered for the following scenarios:</p><ul><li>A participant plan extension</li><li>Service Booking creation, update, or deletion.</li><li>Service booking on quotation approved.</li><li><p>Update on Participant's Active Plan Budget.</p><ul><li>Spent Amount</li><li>Remaining Amount (claim status is pending payment, or payment cancellation)</li></ul></li></ul></td></tr><tr><td>Plan End Date is updated </td><td><code>PLAN_END_DT_UPDATED</code></td><td><p>The notification of this event will be triggered when the plan end date of a participant's current active plan is updated</p><ul><li>Due to an unscheduled plan review</li><li>Due to the auto extension of plan</li><li>Due to the participant's access ceasing (due to death for instance)</li></ul></td></tr><tr><td>PACE Budget Updated</td><td><code>BUDGET_UPDATED</code></td><td><p>This notification will allow Plan Managers and Support Coordinator to be notified when a PACE participant's budget is updated.</p><p></p><p>The notification for this event will be triggered sent to the Plan Manager or Support Coordinator when a participant's budget is updated via APIs or a Staff Member using the Staff Portal given that provider has consent/authority with the related participant.</p></td></tr><tr><td>PACE New Plan Created</td><td><code>PLAN_APPROVED</code></td><td><p>This notification will allow Plan Managers or Support Coordinator to be notified when a participant's new plan is created.</p><p></p><p>The notification for this event will be triggered and sent to the Plan Manager or Support Coordinator when there is a new plan approval given that the provider has consent/authority to view plan details with the related participant.</p></td></tr><tr><td>PACE Relationship Created</td><td><code>RLTN_CREATED</code></td><td><p>For PACE participant the notification for this event will be triggered when:</p><ul><li>My Provider Relationship is created between participant and provider in PACE.</li><li>Plan Manager Relationship is created between participant and provider in PACE.</li><li>Recovery Coach Relationship is created between participant and provider in PACE.</li><li>Support Coordinator Relationship is created between participant and provider in PACE.</li></ul></td></tr><tr><td>PACE Relationship End Date Update</td><td><code>RLTN_END_DATE_UPDATE</code></td><td><p>For PACE participant the notification for this event will be triggered when:</p><ul><li>My Provider Relationship end date is updated in PACE.</li><li>Plan Manager Relationship end date is updated in PACE.</li><li>Recovery Coach Relationship end date is updated in PACE.</li><li>Support Coordinator Relationship end date is updated in PACE.</li></ul></td></tr></tbody></table>

## How do set up NDIS Notifications?&#x20;

In order to set up the NDIS Notifications within your Maica instance, please follow the following steps:&#x20;

1. Create a Salesforce Site under the name `NDIS Notifications`.&#x20;

{% hint style="info" %}
To learn how to Create a Site, please click [here](create-a-site.md).&#x20;
{% endhint %}

2. Assign the `Maica - Handle NDIS Notifications` permission set to the Site Guest User.&#x20;

{% hint style="info" %}
This Permission Set grants access to Maica objects that will be updated based on the NDIS event payload.
{% endhint %}

{% hint style="info" %}
Ensure the Site Guest User is assigned the proper timezone. This is important as Salesforce sets it to GMT by default.
{% endhint %}

3. Navigate to `Maica Settings` -> `NDIS Notifications`
4. Find and choose the created Site in the `Notifications Endpoint (Site)` , as shown below:&#x20;

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

5. Finally, select the `Subscribe All` button

{% hint style="info" %}
Please note, **Maica’s** subscription to NDIS events is secured with a private key generated on the Salesforce side, ensuring that only the authorised NDIS endpoint can transmit data to **Maica’s** Salesforce public site. Each notification payload is validated to confirm it is signed with the private key, maintaining the integrity and security of the data exchange.
{% endhint %}
