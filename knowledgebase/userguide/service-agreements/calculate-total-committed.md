---
description: >-
  Learn about the Calculate Total Committed Quick Action and how it functions in
  Maica
---

# Calculate Total Committed

The **Total Committed Calculation** Quick Action allows you to manually recalculate committed funding or preview committed values for a specific date range under either a **Service Agreement** or **Agreement Item**.

This gives you real-time visibility into how much of the Budget is already allocated, both from past activity and forecasted future services.

{% hint style="success" %}
As mentioned, but important to note, this quick action is also available on **Agreement Item** records. If accessed from an Agreement Item, the calculation will only apply to that individual item. If accessed directly from a Service Agreement, the calculation will include all associated Agreement Items with that Service.
{% endhint %}

## How does the Quick Action work?

Begin by selecting the **Total Committed Calculation** Quick Action from the top of your Service Agreement or Agreement Item.

Once done, you will have two options:

{% hint style="info" %}
Please note, if the **Enable Total Committed Calculation** setting is turned off in your Maica Settings, this quick action will still be visible, but only the **Preview by Date Range** option will be available. The **Calculate Total Committed** option will not appear.\
\
To learn more about the **Enable Total Committed Calculation** setting, see [General Settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/general-settings).
{% endhint %}

1. **Calculate Total Committed**

<figure><img src="../.gitbook/assets/Screenshot 2025-07-24 at 2.54.29 pm.png" alt="" width="375"><figcaption></figcaption></figure>

This will:

* Run the Total Committed Calculation process, which is further described in [Total Committed Calculation](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/total-committed-calculation).
* It will then update the **Total Committed** field with the new value.

{% hint style="success" %}
Use this option when you want to manually update the Committed Values on a Service Agreement or Agreement Item
{% endhint %}

***

2. **Preview by Date Range**

<figure><img src="../.gitbook/assets/Screenshot 2025-07-24 at 2.56.05 pm.png" alt="" width="375"><figcaption></figcaption></figure>

{% hint style="info" %}
When you select **Preview by Date Range**, the Date Range fields will show and the button will dynamically update from **Confirm** to **Preview**.
{% endhint %}

Here you can:

* Enter a **Start Date** and **End Date**
* Click **Preview**

This will:

* Run the same calculation logic
* Return a committed value for that date range
* **Not update any fields** on the record

{% hint style="warning" %}
The Date Range Preview is for inspection purposes only. It does not affect any fields on the Service Agreement or Agreement Item.
{% endhint %}

## What if a date has no matching funding?

The figure includes recurring schedules, projected up to their End Date, as well as Appointments that have already been created. Where a projected date has no matching funding, Maica leaves that date out of the figure and still counts every other date. For example, a date after the end of your Service Agreement, or a public holiday with no Public Holiday Support Item, is left out.

{% hint style="info" %}
Where dates are left out, Maica writes a **Warning** to the Logs for the Delivery Activity. It names the Schedule, the number of dates left out and the first date left out. This applies to **Preview by Date Range** as well as **Calculate Total Committed**. A fully funded schedule writes no Warning.
{% endhint %}

To learn how recurring schedules are projected, see [Total Committed Calculation](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/total-committed-calculation) in the Administration Guide.

## What happens next?

* If you chose **Calculate Total Committed**, the calculation will run and automatically update the Total Committed field, you can then close the modal.
* If you chose **Preview by Date Range**, a value will display under the date fields for your selected period. Nothing will be saved, and you can then change the dates and run it again, or close the modal.
