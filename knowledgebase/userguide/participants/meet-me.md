---
description: >-
  Learn about Maica's Meet Me functionality, an AI summary driven that sits on
  the Participant Profile
---

# Meet Me

Meet Me is an AI-powered summary that appears on the Participant record page. It reads across the Participant's recent Notes, Appointments, Goals, Delivery Activity, and Service Agreements, and generates a short, plain-English overview - written like a handover note from another care worker.

The goal is to give you enough context to walk into a service informed, without opening multiple records first.

***

### How it Works

When you open a Participant's record, Meet Me starts generating a summary automatically. A loading state is shown while it runs - this typically takes 5 to 15 seconds.

The summary is displayed as plain prose. In the **Detailed** view (the default), it is broken into labelled sections based on the data available.

<table><thead><tr><th width="265.1376953125">Section</th><th>What it covers</th></tr></thead><tbody><tr><td><strong>Recent Notes</strong></td><td>Key themes from recent Participant Notes</td></tr><tr><td><strong>Appointments</strong></td><td>Upcoming and recent Appointments, status, and cancellations</td></tr><tr><td><strong>Goals</strong></td><td>Active Goals and current progress</td></tr><tr><td><strong>Delivery Activity</strong></td><td>Recent service delivery activity</td></tr><tr><td><strong>Service Agreements</strong></td><td>Active Service Agreement status, Support Categories, and high-level budget</td></tr><tr><td><strong>Custom sections</strong></td><td>Any additional data your organisation has configured (e.g. Medications, Risk Assessments)</td></tr></tbody></table>

{% hint style="info" %}
Sections with no data in the selected date range are omitted rather than shown empty.
{% endhint %}

***

### Setting your Filters

The **COG icon** on the Meet Me card opens a settings panel where you can control what the summary includes. Settings are saved per device and persist across sessions.

<table><thead><tr><th>Setting</th><th>Options</th><th width="150.7158203125">Default</th><th>What it does</th></tr></thead><tbody><tr><td><strong>Summary type</strong></td><td>Short, Detailed</td><td>Detailed</td><td>Short gives a 2 to 3 sentence overview. Detailed gives the full section-by-section summary</td></tr><tr><td><strong>Date range</strong></td><td>7, 14, 30, or 60 days</td><td>30 days</td><td>How far back to look for related records</td></tr><tr><td><strong>Data sections</strong></td><td>Toggle each section on or off</td><td>All on</td><td>Controls which standard data types are included</td></tr></tbody></table>

{% hint style="info" %}
Custom object sections (e.g. Medications, Risk Assessments) are controlled by your administrator and cannot be toggled from the settings panel. If they are active, they will always appear when relevant data exists.&#x20;
{% endhint %}

{% hint style="success" %}
If the Participant's records have been updated and you want a fresh summary, click the **refresh button** on the Meet Me card. Each generation creates a new summary from the current data.
{% endhint %}

***

### What is Included

The following standard Maica data is used in summaries:

<table><thead><tr><th width="221.44140625">Data type</th><th>What's included</th><th>Volume limit</th></tr></thead><tbody><tr><td><strong>Participant Notes</strong></td><td>Most recent Notes within the date range</td><td>Up to 5 Notes, 500 characters each</td></tr><tr><td><strong>Appointments</strong></td><td>Upcoming and recent Appointments, status, cancellation reasons</td><td>Up to 20</td></tr><tr><td><strong>Goals</strong></td><td>Active Goals, stage, and progress notes</td><td>Up to 10</td></tr><tr><td><strong>Delivery Activity</strong></td><td>Recent direct Delivery Activity records</td><td>Up to 20</td></tr><tr><td><strong>Schedule</strong></td><td>Schedule records linked to Appointments</td><td>Included with Appointments</td></tr><tr><td><strong>Service Agreements</strong></td><td>Active and recent Service Agreements, Support Categories</td><td>Up to 5</td></tr><tr><td><strong>Agreement Items</strong></td><td>Key Agreement Item line items</td><td>Up to 10</td></tr><tr><td><strong>Custom objects</strong></td><td>Configured by your administrator</td><td>Up to 10 types, default 10 records per type</td></tr></tbody></table>

***

### What is Never Included

Some information is excluded from the summary by design, to reduce privacy risk:

* Participant name
* NDIS number
* Date of birth
* Phone number
* Email address
* Documents and file attachments
* Historical data beyond the selected date range (for standard data types)

{% hint style="info" %}
These exclusions are enforced in the system and cannot be overridden.
{% endhint %}

***

### Privacy

When a summary is generated, a structured text payload is sent to Google's Gemini AI to produce the summary text. Direct identifiers (name, NDIS number, date of birth, phone, email) are stripped out before the payload leaves Maica.

{% hint style="info" %}
How Meet Me is used within your organisation, including whether Participants are informed that their care information is processed by a third-party AI service, is the responsibility of your organisation and its administrators. If you have questions about how Meet Me is configured where you work, contact your Maica administrator.
{% endhint %}

***

### Troubleshooting

<table><thead><tr><th width="238.443359375">Problem</th><th>What to check</th></tr></thead><tbody><tr><td><strong>Summary seems incomplete</strong></td><td>Check that the relevant sections are toggled on in the COG panel, and that the date range is wide enough</td></tr><tr><td><strong>Summary doesn't match what you expect</strong></td><td>The AI only sees what is in Maica. Check the record dates against your selected date range</td></tr><tr><td><strong>Config error shown</strong></td><td>Meet Me is not currently enabled for your organisation or setup is incomplete. Contact your administrator</td></tr><tr><td><strong>Error shown</strong></td><td>A technical issue occurred during generation. Refresh the page or regenerate after a short wait. Contact your administrator if it persists</td></tr><tr><td><strong>Empty data message</strong></td><td>The Participant has no relevant records in the selected date range. Broaden the date range in the COG panel to look further back</td></tr></tbody></table>

***

### Frequently Asked Questions

<details>

<summary><strong>Does Meet Me work on mobile?</strong> </summary>

Yes. Meet Me is available in the Maica mobile app. The same summary is generated regardless of device, with the display optimised for smaller screens.

</details>

<details>

<summary><strong>Can I save or share the summary?</strong></summary>

The summary is displayed on screen only. It is not saved to the Participant's record and is regenerated each time you open the page. You can copy the text manually if needed.

</details>

<details>

<summary><strong>How long does generation take?</strong></summary>

Typically 5 to 15 seconds, depending on the volume of data and network conditions. A loading indicator is shown throughout.

</details>

<details>

<summary><strong>Why is the wording different each time?</strong> </summary>

Meet Me uses a generative AI model, so phrasing varies between generations even when the underlying data is unchanged. The content should be substantively the same.

</details>
