---
description: Learn about the Appointment Profile Record in Maica
---

# Open Appointment Profile

## How do I open the Appointment Profile?

To open an Appointment Profile, simply open an [Appointment](../../getting-started/maica-key-concepts/appointment.md) and then click the `External Link` button located in the top right corner of the screen to bring up the profile, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/open app profile.png" alt="" width="473"><figcaption></figcaption></figure>

Once clicked, you will be directed to a new Salesforce tab showing you the Appointment Profile. Here, you will see a summary of the [Appointment](../../getting-started/maica-key-concepts/appointment.md) including any [Checklists](../../getting-started/maica-key-concepts/checklist.md), [Delivery Activities](../../getting-started/maica-key-concepts/delivery-activity.md), Files and more.&#x20;

You can also open an Appointment Profile directly from the [Planner](../../the-planner/planner-overview.md), simply by clicking the `Expand Profile` button located in the bottom right corner of any [Appointment](../../getting-started/maica-key-concepts/appointment.md), as shown below.&#x20;

<figure><img src="../../.gitbook/assets/open app profile qa.png" alt="" width="367"><figcaption></figcaption></figure>

## Appointment Profile Actions

### 1. Generate Invoice

If an Appointment has the status `Completed`, you will be able to manually generate an [Invoice](../../getting-started/maica-key-concepts/invoice.md) for this [Appointment](../../getting-started/maica-key-concepts/appointment.md) in the Appointment Profile. To begin, simply click the `Generate Invoice` button located in the top right corner of the Appointment Profile, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/generate invoice.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
**Maica** will automatically generate Invoices for completed Appointments through its Automation. This process is for situations where manual Invoice Generation is required, or, Automation is toggled off. To learn more about Invoice Automation, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/invoice#automation).&#x20;
{% endhint %}

Once the `Generate Invoice` button has been clicked, **Maica** will display a summary of the Invoice to be generated. For each Participant, **Maica** will show you Invoice Line Items with information on the Claim Type, Quantity, Rate and Total Cost of each item. You will also be able to see if the Item exceeds the current remaining budget of the Participant(s) Service Agreement, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/invoice budget exceed.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The quantity is based on the `Service Time` dropdown. For example, if the Check-Out time for your Appointment was different to the Scheduled End, and you wanted to bill accordingly, **Maica** will automatically update the quantity and cost of the delivery.&#x20;
{% endhint %}
