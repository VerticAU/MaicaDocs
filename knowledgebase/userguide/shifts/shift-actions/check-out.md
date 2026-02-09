---
description: Learn about checking out of Shifts
---

# Check-Out

## What does the Check-Out Action include?

When checking out of a Shift, you are presented with a number of distinct areas of input including **Shift Date Information**, **Resource(s) that are Checking Out**, **Shift Service Information** and **Check-Out Location**, as well as **Shift Checklist Information**. These areas are further described in this article.

## Shift Date Information

Similar to [Check-In](check-in.md), This part of the Check-Out process captures the relevant Date and Time information. **Maica** offers configurable capability for Check-Out information to ensure that [Shifts](../../getting-started/maica-key-concepts/shift.md) can be accurately recorded.&#x20;

When Checking-Out of your [Shift](../../getting-started/maica-key-concepts/shift.md), **Maica** will automatically populate the Date and Time information to the current Date and Time. This can be configured by manually entering any desired Date and Time, or by setting the information directly to match the scheduled Shift by selecting the text shown below.

<figure><img src="../../.gitbook/assets/shift checkoout.png" alt="" width="417"><figcaption></figcaption></figure>

{% hint style="info" %}
You cannot set a `Check-Out` Date/Time before your `Check-In` Date/Time. In this instance, **Maica** will display an **error**. To learn more about how Maica validates the parameters of an Shift, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/appointment#check-out-date-time-must-be-after-check-in-date-time).&#x20;
{% endhint %}

## Who is Checking-Out?

Again, similar to Check-In, this part of the Check-Out process determines which [Resource(s)](../../getting-started/maica-key-concepts/resource.md) are Checking-Out at any given time. When you check out of a Shift for the first time, all of the [Resource(s)](../../getting-started/maica-key-concepts/resource.md) allocated to that Shift are automatically populated. This can be modified by manually removing any [Resource(s)](../../getting-started/maica-key-concepts/resource.md) that are not currently Checking-Out. To Check-Out these [Resource(s)](../../getting-started/maica-key-concepts/resource.md) at a later time, simply reselect the Shift, then Check-Out, and repeat the process. All [Resource(s)](../../getting-started/maica-key-concepts/resource.md) assigned to the Shift who have not already Checked-Out will be automatically populated once again.

{% hint style="info" %}
The status of the Shift changes from `In Progress` to `Completed` after the last Resource(s) checks out.&#x20;
{% endhint %}

## Shift Service Information

This part of the process offers an overview of the Shift Service(s) delivered as well as the ability to adjust the quantity of each service as required. Adjusting the quantity offers you flexibility within an Shift to control how long each Service may have been delivered. This means, if the actual Service duration is different from the scheduled Time, this can easily be captured.

{% hint style="info" %}
To learn more about the quantity function, click [here](../create-a-shift/summary.md#id-1.-adjusted-quantity).&#x20;
{% endhint %}

## Check-Out Location

This part of the Check-Out process captures accurate Check-Out Location information. **Maica** offers the ability for Check-Out locations to be tracked to ensure that Shifts can be accurately recorded.&#x20;

{% hint style="info" %}
In order for a Location to be obtained, the User must have Location Permissions set to Allowed on their Device or Browser.&#x20;
{% endhint %}

## Shift Checklist Information

This part of the Check-Out process captures any [Checklist(s)](../../getting-started/maica-key-concepts/checklist.md) assigned to the Shift. If a [Checklist(s)](../../getting-started/maica-key-concepts/checklist.md) has been associated with a Shift, you will be presented with the list of each Checklist Item and asked to capture the outcome of each item.

<figure><img src="../../.gitbook/assets/Screenshot 2024-10-03 at 4.44.07 pm.png" alt="" width="375"><figcaption></figcaption></figure>

{% hint style="info" %}
This stage will only show Checklist Item(s) that are set to an execute status of `After` or `Either`
{% endhint %}

Similar to Check-In, for each **Checklist Item,** if so configured in the [Checklist](../../getting-started/maica-key-concepts/checklist.md), you are prompted to provide further information to manage possible outcomes of **Checklist Items** in the form of a **Note**. You access this **Note** by simply clicking on each **Checklist Item.**

{% hint style="info" %}
After clicking on the Checklist Item, you can also set the `Status` of your Checklist Item.&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/check in note.png" alt="" width="429"><figcaption></figcaption></figure>
