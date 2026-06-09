---
description: Learn about Renewal Management Settings in Maica
hidden: true
noIndex: true
---

# Renewal Management

Maica gives you the ability to automatically generate new Service Agreement records ahead of expiry, helping you stay proactive with renewals. These settings allow you to define when and how a Renewal Service Agreement is created, and who it is assigned to.

The configuration options below apply to **Service Agreements with an End Date**, and each setting plays a role in determining how the new Agreement will be generated when the renewal logic runs daily.

Please refer to the below table for more information on each setting, and the section below for more detail around the entry criteria (the criteria required for a Service Agreement to be included in the automated renewal process):&#x20;

<table><thead><tr><th width="222">Setting</th><th width="315.765625">Description</th><th>Configuration Options</th></tr></thead><tbody><tr><td><code>Renew Service Agreements</code></td><td>Defines how many days before the current Service Agreement ends that the system should trigger the renewal logic. This is when the new Service Agreement record will be created.</td><td>Numeric (1-100)</td></tr><tr><td><code>Set the Renewal Service Agreement Start Date to</code></td><td>Sets the start date of the new Agreement relative to the current Agreement's End Date. For example, entering '1' means the new Agreement will begin the day after the existing one ends.</td><td>Numeric (1-100)</td></tr><tr><td><code>Set the Renewal Service Agreement End Date to</code></td><td>Sets the duration of the new Agreement by specifying how many days it should run for from the new Start Date.</td><td>Numeric (1-100)</td></tr><tr><td><code>Assign the Renewal Service Agreement to</code></td><td>Choose whether the new Agreement should be assigned to the current owner of the expiring Agreement or a specific user.</td><td>Select</td></tr><tr><td><code>Daily Service Agreement Renewal Time</code></td><td>Defines the time each day that Maica will run the automated renewal logic. Only Agreements within the configured date window will be actioned.</td><td>Time Picker </td></tr><tr><td><code>Run Now</code></td><td>Immediately runs the renewal logic using the settings above. </td><td></td></tr></tbody></table>

### Entry Criteria

For a Service Agreement to be included in the automated renewal process, it must meet the following criteria:

* **Auto Renewal** is enabled on the record (`Auto_Renewal__c = TRUE`).
* **End Date** of the Service Agreement falls within the configured renewal window.

{% hint style="info" %}
The renewal window is determined using this logic:\
\
The system checks if the Agreement’s **End Date** is within _X_ days from today, where _X_ is the number configured in **Renew Service Agreements**.

For example, if **Renew Service Agreements** is set to 30, the system will begin considering Agreements for renewal when their End Date is within 30 days from the current date.
{% endhint %}

Agreements that meet both conditions will be processed when the daily renewal job runs.
