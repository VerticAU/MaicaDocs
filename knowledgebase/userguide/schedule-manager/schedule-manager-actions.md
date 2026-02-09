---
description: Learn about the Schedule Manager Actions within Maica
---

# Schedule Manager Actions

## What are the Schedule Manager Actions?

The **Schedule Manager Actions** are tools that allow you to manage multiple **Appointments** or **Shifts** directly from the Schedule Manager, and also include Additional Actions for the Manager itself.&#x20;

These actions are designed to make bulk updates easier, as well as provide quick access to configuration tools and supporting functions.

Actions in the Schedule Manager fall into two categories:

* [**Bulk Actions**](schedule-manager-actions.md#bulk-actions) – operations that can be applied to multiple selected records at once:
  * [Resource Allocation](schedule-manager-actions.md#resource-allocation)
  * [Change Status](schedule-manager-actions.md#change-status)
  * [Cancel](schedule-manager-actions.md#cancel)
  * [Quick Complete](schedule-manager-actions.md#quick-complete)
* [**Additional Actions**](schedule-manager-actions.md#additional-actions) – options for configuring the table view or creating new records from within the Schedule Manager:
  * [Select Fields to Display](schedule-manager-actions.md#select-fields-to-display)

{% hint style="info" %}
The following actions are also accessible from the Schedule Manager, however, their detailed functionality is described in other areas of the Knowledge Base. Please click each action below for more information.&#x20;

* [New Appointment](../the-planner/planner-actions/create-new-appointment.md)
* [Appointment Optimiser](../the-planner/planner-actions/appointment-optimiser.md)
* [New Participant Note](../participants/billable-participant-notes/)
* [Single Appointment Line Actions](../appointments/appointment-actions/)
{% endhint %}

The sections below describe each of these actions in more detail

## Bulk Actions&#x20;

As mentioned, Bulk Actions allow you to update multiple **Appointments** or **Shifts** at the same time. To use these actions, you must first select at least one record. Selection is done using the checkboxes located on each row, or by using the checkbox in the header row to select or deselect all records in the view. Each Bulk Action is further described below:&#x20;

### Resource Allocation&#x20;

The **Resource Allocation** action allows you to assign one or more Resources to multiple selected **Appointments** or **Shifts** at the same time. You can add additional Resources, or replace existing.&#x20;

When selected from the **Bulk Actions** menu, the [Find Resource](../appointments/create-an-appointment/smart-selection-filter.md) modal will open. This screen uses the Smart Selection Filter, which applies the same matching logic as the Appointment Optimiser to order resources by suitability.

{% hint style="info" %}
To learn more about how Resources are scored and matched, refer to the [Smart Selection Filter](../appointments/create-an-appointment/smart-selection-filter.md) article and Matching Score Importance Level in the [Rostering Management Settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/rostering-management).
{% endhint %}

From the modal, you can search for and select the resources you wish to allocate.

After confirming your selection, the **Confirm Resource Allocation** screen will appear. Here you can choose how the resources are applied:

* **Merge** – keeps existing resources on the appointments and adds the newly selected ones.
* **Override** – removes existing resources and replaces them with the newly selected ones.

Once confirmed, Maica will validate rostering conflicts before applying the allocation across all selected appointments or shifts.

### Change Status&#x20;

The **Change Status** action allows you to update the status of multiple selected **Appointments** or **Shifts** in a single step.

When selected from the **Bulk Actions** menu, the **Select Status** modal will appear. From here, you can choose the new status from the dropdown menu and apply it to all selected records.

After choosing a status, the **Confirm Status Change** screen will be displayed. This provides a final confirmation that the status change will be applied to the selected records. Selecting **Yes, Change Status** will complete the update.

### Cancel&#x20;

The **Cancel** action allows you to cancel multiple selected **Appointments** or **Shifts** at once.

When selected from the **Bulk Actions** menu, the **Cancel Appointments** modal will appear. From here you can:

* Enter the Date and Time of the cancellation.
* Select a Cancellation Reason from the dropdown menu.
* Add a Cancellation Reason Description to provide more detail.

After completing the form, you will be taken to the **Confirm Cancellation** screen. This provides a final confirmation before the cancellation is applied to the selected records. Selecting **Yes, Cancel** will complete the process.

### Quick Complete&#x20;

The **Quick Complete** action allows you to finalise multiple selected **Appointments** or **Shifts** in a single step. This action is designed to streamline processing by running the associated timesheet and invoicing workflows automatically.

When selected from the **Bulk Actions** menu, the **Confirm Quick Complete** screen will appear. Here, a message showing the number of records to be completed will display. Selecting **Yes, Complete** will immediately trigger Maica's validation and finalise the selected appointments or shifts.

### Bulk Actions Interactive Overview&#x20;

For a hands-on walk-through of the Bulk Actions in the Schedule Manager, you can access the **Interactive Overview** below.&#x20;

{% embed url="https://app.arcade.software/share/pRStY8TPuYfsIRuTSMQi" %}

## Additional Actions&#x20;

In addition to Bulk Actions, there are Actions designed for configuring the Schedule Manager and help you customise the way information is displayed, these are detailed below.

{% hint style="info" %}
Note: You can order information in the Schedule Manager by clicking on the header of any column. For example, clicking **Scheduled Start** will toggle the table between earliest-first and latest-first order.
{% endhint %}

{% hint style="info" %}
You can also drag the edges of any column header to adjust its width. This allows you to customise the table layout for easier readability.
{% endhint %}

### Select Fields to Display&#x20;

The **Select Fields to Display** option allows you to configure which columns are visible in the table view.&#x20;

In order to configure the columns, begin by opening the Select Fields to Display modal, then:&#x20;

1. In **Available Fields** (left), click the field you want to add.
2. Click the **right arrow** to move it into **Visible Fields** (right).
3. To remove a column, select it in **Visible Fields** and click the **left arrow**.
4. To change the display order, use the **up/down arrows** to the right of the **Visible Fields** column.
5. Click **Confirm** to apply the layout to the table.

{% hint style="success" %}
Custom columns, such as formula fields, will appear in **Available Fields** once created.&#x20;
{% endhint %}

