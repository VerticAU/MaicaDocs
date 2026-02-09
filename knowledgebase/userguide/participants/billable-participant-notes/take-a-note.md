---
description: Learn about capturing Note details for a new Billable Participant Note
---

# Take a Note

## What does the Take a Note stage include?

The Take a Note tab captures the basic details of the Billable Participant Note, as described in the below table:

<table><thead><tr><th width="298">Information Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Category</code></td><td>This allows for the selection of a Category by selecting one from the provided dropdown list. </td></tr><tr><td><code>Interaction Type</code></td><td>This allows for the selection of a Interaction Type by selecting one from the provided dropdown list. </td></tr><tr><td><code>Participant</code></td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/participant.md">Participant(s)</a> by simply typing a name of a Participant (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="../../appointments/create-an-appointment/smart-selection-filter.md">Smart Selection</a> of <a href="../../getting-started/maica-key-concepts/participant.md">Participant(s)</a>.<br><br>This is a required field as Notes in <strong>Maica</strong> are always held against a Participant. </td></tr><tr><td><code>Goal</code></td><td>Once a <a href="../../getting-started/maica-key-concepts/participant.md">Participant</a> has been selected, this allows for the Participant Note to be associated with a <code>Goal</code></td></tr><tr><td><code>Date &#x26; Time</code></td><td>The Date &#x26; Time details are pre-populated from the current Date &#x26; Time, and the duration is set to 15 minutes. <br><br>The Date &#x26; Time can be changed manually if required, and your default duration can also be adjusted in Maica Settings; click here to learn more. </td></tr><tr><td><code>Note Text</code></td><td>This allows for custom text around the details of the Note. You can also insert a template here. </td></tr><tr><td><code>Billable Participant Note</code></td><td>This toggle allows for the Note to be billable. If toggled <code>on</code>, <strong>Maica</strong> will generate an Invoice Line Item for the selected <a href="../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a> and duration/quantity.<br><br><strong>Maica</strong> will also validate that the selected <a href="../../getting-started/maica-key-concepts/participant.md">Participant</a> has the an <a href="../../getting-started/maica-key-concepts/service-agreement.md">Agreement</a> for the selected <a href="../../getting-started/maica-key-concepts/appointment-service.md">Service</a>. If they don't, <strong>Maica</strong> will alert you and not allow the Note to be continued to the next stage. To learn more, see <a href="take-a-note.md#id-1.-no-agreement-for-appointment-service">below</a>. </td></tr></tbody></table>

{% hint style="info" %}
If the Participant Note is not to be billable, then simply disable the `Billable Participant Note` toggle.&#x20;
{% endhint %}

{% hint style="success" %}
**Non-Billable Notes and Appointment Service**\
\
When a note is marked as **non-billable**, you can still select an **Appointment Service** to indicate which service the note relates to.

\
This helps maintain reporting accuracy without affecting billing or claiming.<br>

* **Quantity** is locked at 0
* **Claim Type** is hidden
* A **Delivery Activity** is still created, but with `Billing Status = Do Not Bill`



✅ **Example**:\
\
A user creates a non-billable Participant Note for a group session and selects “Community Access” as the Appointment Service.\
Maica logs the note and creates a Delivery Activity for reporting, but excludes it from invoicing.
{% endhint %}

## Things to look out for: Take a Note

<figure><img src="../../.gitbook/assets/things to look out for bpn.png" alt="" width="563"><figcaption></figcaption></figure>

### 1. No Agreement for Appointment Service

This alert will show in the instance where the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have no [Agreement](../../service-agreements/agreement-management/) for the selected [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md). When this is the case, **Maica** will alert you under the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) input box (as shown) and the `Save & Next` button will become unavailable. This is the only restriction that **Maica** enforces where the user cannot continue to create a Billable Participant Note.

In order to resolve this alert, you **must** select an [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) that the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../getting-started/maica-key-concepts/service-agreement.md) for and hence can be billed against.

When the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../getting-started/maica-key-concepts/service-agreement.md) for the selected [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md), the alert will be replaced by the following billing and budget information:&#x20;

<figure><img src="../../.gitbook/assets/take a note bpn.png" alt="" width="563"><figcaption></figcaption></figure>

<table><thead><tr><th width="178">Reference </th><th>Description </th></tr></thead><tbody><tr><td>1</td><td>This is the total cost of the Note. It is calculated based on the <code>Duration</code> and price of the <a href="../../getting-started/maica-key-concepts/appointment-service.md"><code>Appointment Service</code></a>. </td></tr><tr><td>2</td><td>This is the amount of Available Funding the selected <a href="../../getting-started/maica-key-concepts/participant.md">Participant</a> has within their <a href="../../getting-started/maica-key-concepts/service-agreement.md">Service Agreement</a> for the allocated <a href="../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a>. </td></tr><tr><td>3</td><td>This is the quantity of the created Billable Participant Note based on the <code>Start Time</code> and <code>End Time</code> for each selected <a href="../../getting-started/maica-key-concepts/participant.md">Participant</a>. For example, the shown Note time is from 9:39am - 9:54am, this is a quantity of 0.25 which represents a 1/4 of an hour. This field is adjustable, please refer to the <a href="take-a-note.md#id-1.-adjusted-quantity">Adjusted Quantity</a> section for further information. </td></tr><tr><td>4</td><td>This is a dropdown to select the required <code>Claim Type</code>.</td></tr></tbody></table>
