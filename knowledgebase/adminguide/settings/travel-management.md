---
description: Learn about Travel Management Settings in Maica
---

# Travel Management

These settings determine how Maica manages Travel and its function throughout the application. Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Enable Travel Management</code></td><td>This either enables the automated travel calculation or disables it which then means that all travel will be calculated either manually or via custom-developed logic.</td></tr><tr><td><code>Reimbursement Rate</code></td><td>This is the financial rate used to generate the expense claim record for any Resource during the management of travel costs.</td></tr><tr><td><code>Default Expense Status</code></td><td>When Maica generates expense claim records for any Resource, this sets the default status used for such expenses.</td></tr><tr><td><code>Chargeable Travel</code></td><td>This determines which parts of travel are to be charged to a Participant's Service Agreement; options included <code>Only charge to the Appointment</code>, <code>Only charge from the Appointment</code>, <code>Don't charge</code>, <code>Charge for travel to and from the Appointment</code>.</td></tr><tr><td><code>Payable Travel</code></td><td>This determines which parts of travel are to be paid to any Resource as an expense; options included <code>Only pay to the Appointment</code>, <code>Only pay from the Appointment</code>, <code>Don't pay</code>, <code>Pay for travel to and from the Appointment</code>.</td></tr><tr><td><code>Travel Claim Type</code></td><td>When Maica automatically generates an additional Appointment Service (if selected below) for billing purposes, the Travel Claim Type determines the Claim Type assigned to this service.</td></tr><tr><td><code>Travel Timesheet Activity</code></td><td>When Maica generates an corresponding Timesheet Activity for travel, this determines which Support Item (marked as a Timesheet Activity) will be used.</td></tr><tr><td><code>Travel Mechanism</code></td><td>How travel origin/destination and sequence (Previous/Next Appointment) are determined. <br><br><strong>Default</strong>: Origins and destinations are set manually by the user on each individual appointment. Maica uses the <code>Previous/Next Appointment Timespan (Days)</code> setting to determine how far back and forward it looks when suggesting a previous or next appointment as an origin or destination.<br><br><strong>Sequential</strong>: Maica automatically determines the origin and destination for each appointment in a worker's day based on the order of their schedule. Travel is calculated between consecutive appointments within a defined time gap. No manual origin/destination setup is required.</td></tr><tr><td><code>Travel Sequence Gap (hours)</code></td><td>The maximum time gap (in hours) between two appointments for them to be considered part of the same travel sequence. Hidden when Default is selected.<br><br><em>Sequential Travel only</em></td></tr><tr><td><code>Previous/Next Appointment Timespan (days)</code></td><td>Maica uses Google to calculate travel times between a source and destination; these can be various options such as <code>Current Location</code>, <code>Primary Location</code>, <code>Manual Address</code>, and <code>Previous Appointment</code>. This setting determines how far back (in Days) Maica goes to find any applicable previous Appointment.</td></tr></tbody></table>

### Time-Based Cost Management & Non-Time Based Cost Management

When managing billable travel, there are two foundational components to this process:

* **Time-Based Travel** – Travel billed based on time spent traveling to and from an appointment.
* **Non-Time-Based Travel** – Travel billed based on distances traveled (e.g., kilometers).

These settings determine, for each `Funding Structure` which way Maica will generate the relevant billing records for travel.&#x20;

| Setting      | Sub-Setting       | Description                                                                                                                                                                                      |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Funding Type | Funding Structure | For each combination of `Funding Type` and `Funding Structure`, such as `NDIS -> Agency Managed` or `HCP -> Home Care Packages`, this determines which method Maica will use to bill for travel. |

### Primary Support

In **Maica**, when Travel Management is enabled, the system determines the correct **Travel Support Item** based on the **Primary Support** Appointment Service.

{% hint style="info" %}
* The **first selected Appointment Service** in an Appointment is always the **Primary Support**.
* The **Primary Support** is identified in Maica by the **starred Appointment Service** in the Appointment modal.
* Travel items are determined **based on the Primary Support’s Claim Type or Support Item**.
{% endhint %}

So, how are Travel Support Items assigned? Well, as mentioned, when scheduling an Appointment, the first selected Appointment Service is by default the Primary Support. This means for:&#x20;

**Time-Based Assignments:** Maica looks for the related Claim Type or Support Item within the specified Appointment Service in settings.

and for **Non-Time Based Assignments:** Maica also looks for the related Claim Type or Support Item within the specified Appointment Service in settings.

So, when an Appointment Service is specified in the Settings, Maiac's logic will select the Primary Support Item and then locate the required Travel Support Item by matching on Category and Registration Group.

{% hint style="warning" %}
If the Appointment Service contains Support Items that do not have Support Categories or Registration Groups, matching logic will not be applied.
{% endhint %}

For example, if:

* **Primary Appointment Service:** `01 Self Care`
* **Primary Delivery Activity:**
  * `Assistance With Self-Care Activities – Standard – Weekday Night (01_799_0107_1_1)`
* **Time-Based Delivery Activity:**
  * `01_799_0107_1_1` (from Primary Support)
  * **Claim Type:** `Provider Travel`
* **Non-Time-Based Delivery Activity:**
  * `Provider Travel – Non-Labour (01_002_0107_1_1)`

Then,&#x20;

* **Maica** recognises `"01 Self Care"` as the **Primary Support**.
* It assigns **Time-Based Travel** by checking the **Claim Type** OR **Support Item** within the Primary Support.&#x20;
* It assigns **Non-Time-Based Travel** by checking the **Claim Type** OR **Support Item** and, if applicable, matching on **Category** and **Registration Group**.

{% hint style="info" %}
If no matching support item is found, the system sets the **Delivery Activity Billing Status** to `Review` for further validation.
{% endhint %}

{% hint style="success" %}
This example demonstrates the typical billing outcomes when Travel Management is enabled and charge for both Time and Non-time based activities is selected.
{% endhint %}

#### Selecting your Primary Support

To reorder your Appointment Services, and hence determine the Primary Support, you can use the arrow on any applicable Appointment Service. As shown below.&#x20;

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
To Note:&#x20;

* Empty Appointment Services are excluded from being nominated as the Primary Support.
* Appointment Services where the Claim Type is equal to the `Time Based` , `Non Time Based` or `Same Appointment Service` Travel Setting Claim Type are also excluded.
* When an Appointment contains multiple Participants, there can only be one Primary Support selected, hence it will apply to all Participants.
{% endhint %}
