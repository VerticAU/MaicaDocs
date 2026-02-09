---
description: Learn about checking out of Appointments
---

# Check-Out

## What does the Check-Out Action include?

When checking out of an [Appointment](../../getting-started/maica-key-concepts/appointment.md), you are presented with four distinct areas of input including **Appointment Date Information**, **Resource(s) that are Checking Out**, **Appointment Service Information** and **Check-Out Location** whilst the second shows **Appointment Checklist Information** and the **Manage Travel** Action.&#x20;

## Appointment Date Information

Similar to [Check-In](check-in.md), This part of the Check-Out process captures the relevant Date and Time information. **Maica** offers configurable capability for Check-Out information to ensure that [Appointments](../../getting-started/maica-key-concepts/appointment.md) can be accurately recorded.&#x20;

When Checking-Out of your [Appointment](../../getting-started/maica-key-concepts/appointment.md), **Maica** will automatically populate the Date and Time information to the current Date and Time. This can be configured by manually entering any desired Date and Time, or by setting the information directly to match the scheduled [Appointment](../../getting-started/maica-key-concepts/appointment.md) by selecting the text shown below.

<figure><img src="../../.gitbook/assets/appointment actions quality (1).png" alt="" width="464"><figcaption></figcaption></figure>

{% hint style="info" %}
You cannot set a `Check-Out` Date/Time before your `Check-In` Date/Time. In this instance, **Maica** will display an **error**. To learn more about how Maica validates the parameters of an appointment, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/appointment#check-out-date-time-must-be-after-check-in-date-time).&#x20;
{% endhint %}

## Who is Checking-Out?

Similar to [Check-In](check-in.md), this part of the Check-Out process determines which [Resource(s)](../../getting-started/maica-key-concepts/resource.md) are Checking-Out at any given time. When you check out of an [Appointment](../../getting-started/maica-key-concepts/appointment.md) for the first time, all of the [Resource(s)](../../getting-started/maica-key-concepts/resource.md) allocated to that [Appointment](../../getting-started/maica-key-concepts/appointment.md) are automatically populated. This can be modified by manually removing any resources that are not currently Checking-Out. To Check-Out these [Resource(s)](../../getting-started/maica-key-concepts/resource.md) at a later time, simply reselect the [Appointment](../../getting-started/maica-key-concepts/appointment.md), then Check-Out, and repeat the process. All [Resource(s)](../../getting-started/maica-key-concepts/resource.md) assigned to the [Appointment](../../getting-started/maica-key-concepts/appointment.md) who have not already Checked-Out will be automatically populated once again.

{% hint style="info" %}
The status of the Appointment changes from `In Progress` to `Completed` after the last Resource(s) checks out.&#x20;
{% endhint %}

## Appointment Service Information

This part of the Check-Out process offers an overview of the [Appointment Service(s)](../../getting-started/maica-key-concepts/appointment-service.md) delivered as well as the ability to adjust the quantity of each service as required. Adjusting the quantity offers you flexibility within an [Appointment](../../getting-started/maica-key-concepts/appointment.md) to control how long each [Participant](../../getting-started/maica-key-concepts/participant.md) may spend for each [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) within an [Appointment](../../getting-started/maica-key-concepts/appointment.md). This means, if the actual service duration has changed for one or more Participants, this can easily be captured at the time of Check-Out.

{% hint style="info" %}
To learn more about the quantity function, click [here](../create-an-appointment/summary.md#things-to-look-out-for-summary).&#x20;
{% endhint %}

## Check-Out Location

This part of the Check-Out process captures accurate Check-Out Location information. **Maica** offers the ability for Check-Out locations to be tracked to ensure that [Appointments](../../getting-started/maica-key-concepts/appointment.md) can be accurately recorded.&#x20;

{% hint style="info" %}
In order for a Location to be obtained, the User must have Location Permissions set to Allowed on their Device or Browser.&#x20;
{% endhint %}

## Appointment Checklist Information

This part of the Check-Out process captures any [Checklist(s)](../../getting-started/maica-key-concepts/checklist.md) assigned to the [Appointment](../../getting-started/maica-key-concepts/appointment.md). If a [Checklist(s)](../../getting-started/maica-key-concepts/checklist.md) has been associated with an [Appointment](../../getting-started/maica-key-concepts/appointment.md), you will be presented with the list of each Checklist Item and asked to capture the outcome of each item.

<figure><img src="../../.gitbook/assets/checkout checklist.png" alt="" width="474"><figcaption></figcaption></figure>

{% hint style="info" %}
This stage will only show Checklist Item(s) that are set to an execute status of `After` or `Either`
{% endhint %}

Similar to [Check-In](check-in.md), for each **Checklist Item,** if so configured in the [Checklist](../../getting-started/maica-key-concepts/checklist.md), you are prompted to provide further information to manage possible outcomes of **Checklist Items** in the form of a **Note**. You access this **Note** by simply clicking on each **Checklist Item.**

<figure><img src="../../.gitbook/assets/check in note.png" alt="" width="429"><figcaption></figcaption></figure>

## Manage Travel

The `Manage Travel` Action offers the ability to capture travel and associated expense claim information. The main purpose of the **Travel Management** tool in **Maica** is to facilitate the accurate recording of travel-related information and ensure that travel-related expenses and time is tracked and logged accurately.&#x20;

{% hint style="success" %}
Travel is recorded at the **Resource level** on the **Appointment Resource** record. The Appointment displays totals and averages rolled up from its related Resources.
{% endhint %}

The tool is broken down into a number of sections, as outlined below:&#x20;

{% hint style="info" %}
The following sections explain the `Manage Travel` tool from a User Experience perspective. If you wish to dive deeper into the logic behind how **Maica** handles travel, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/travel-claiming-and-expenses).&#x20;
{% endhint %}

### 1. Time and Distance&#x20;

The first step in using the Manage Travel tool is to track the time and distance travelled as part of the Appointment. **Maica** will automatically populate, using Google, and based on the information provided at the [Location](../create-an-appointment/location.md) stage of the Appointment creation, however, it can be adjusted if desired.&#x20;

{% hint style="info" %}
If you would like to make this information adjustable, this can be managed via Permissions Sets.
{% endhint %}

### 2. Resource Tabs

If you have multiple Resource(s) assigned to a particular Appointment, this section allows you switch between each one and adjust their Travel individually.&#x20;

### 3. Time Based Travel Breakdown&#x20;

The Time Based Travel Breakdown allows you to divide the total minutes of travel into the time travelled to an Appointment, and from an Appointment.&#x20;

You can do so by moving the slider to your desired split of Travel Time.&#x20;

This allows flexibility in your Travel billing, and also has a direct relationship with how you may want to charge for Travel.&#x20;

{% hint style="info" %}
In the Travel Management Settings, you can select how you wish to charge for Travel. The options include; `Do not charge`, `Charge travel to an Appointment`, `Charge Travel from an Appointment`, `Charge for both`. To learn more, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/travel-management).&#x20;
{% endhint %}

### 4. Create a Timesheet Entry&#x20;

**Maica** allows you to create Timesheet Entries based on the Time Based Travel. These can be both Billable and Non-Billable, depending on how you treat Travel within your organisation. In order to create a Timesheets from Travel, you must have `Payable Travel` not equal to `Do not Pay` (it can be any other value) in the Travel Management Settings.&#x20;

{% hint style="info" %}
To learn more about the Payable Travel Setting, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/travel-management).&#x20;
{% endhint %}

### 5. Non-Time Based Travel Breakdown&#x20;

The Non-Time Based Travel Breakdown allows to divide the total kilometres of travel into the distance travelled to an Appointment, and from an Appointment.&#x20;

Similar to the Time Based Travel Breakdown, you can do so by moving the slider to your desired split of Travel Distance. Additionally, you can manually input distance values for either distance to or from the Appointment.&#x20;

When updating travel distances in the **Travel Management** modal, the system dynamically recalculates values based on the input changes. The logic ensures that adjustments are proportionally applied while maintaining accuracy.

{% hint style="info" %}
Travel distances can be recorded with **up to two decimal places**. Please note:&#x20;

* If you attempt to add more than two decimal places in the total distance travelled, Maica will display an error.&#x20;
* If you attempt to add more than two decimals to either the distance travelled before or after an Appointment, Maica will round this to two decimal places automatically.&#x20;
{% endhint %}

As Expense Claims are based on Non-Time Based Travel, it is important to note that within the Travel Management Settings, you can select how you wish to Pay for Travel. The options include; `Do not pay`, `Pay for travel to an Appointment`, `Pay for Travel from an Appointment`, `Pay for both`.&#x20;

{% hint style="info" %}
To learn more about the Travel Management Settings, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/travel-management).
{% endhint %}

This essentially means that if you have selected any value other than `Do not pay`, moving the slider will determine your Resource(s) reimbursement amount based on your Travel Management Settings.&#x20;

### 6. Create an Expense Claim

Finally, once the above stages have been completed, the Manage Travel Tool will create an Expense Claim.&#x20;

{% hint style="info" %}
An Expense Claim essentially represents the amount required to pay the `Resource` for any expenses they might have incurred.
{% endhint %}

The Expense Claim is generated based on Non-Time Based Travel Breakdown as well as Reimbursement Rate set in the [Travel Management Settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/travel-management). It is stored as a record against a Resource that captures what they should be paid for their expenses.&#x20;

