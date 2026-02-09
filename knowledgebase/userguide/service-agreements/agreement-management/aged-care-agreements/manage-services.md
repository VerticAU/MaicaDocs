---
description: >-
  Learn how to Add and Manage Services within an Aged Care Service Agreement in
  Maica
---

# Manage Services

{% hint style="danger" %}
Please note, as of November 1st 2025 Home Care Packages are being replaced with Support at Home funding. This function will still be present in Maica.&#x20;
{% endhint %}

## What does the `Manage Services` Quick Action do?

The Manage Services tool in **Maica** is a Quick Action with a customised User Interface for adding, updating, and managing Services within a Service Agreement. `Manage Services` allows you to add new Services in the form of [Agreement Items](../../the-building-blocks.md#agreement-items) against a [Service Agreement](../../../getting-started/maica-key-concepts/service-agreement.md). These [Agreement Items](../../the-building-blocks.md#agreement-items) will ultimately form the base of your Appointments or Shifts.

## Where do I find the `Manage Services` button?

The Manage Services function is visible at the top right hand corner of your interface on the Service Agreement record, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/manage services button.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
This function is only available when the `Funding Type` is set to `Home Care Package`.&#x20;
{% endhint %}

## How do I add Services?&#x20;

In order to begin adding Services, simply click the `Manage Services` button to display the pop-up, as shown below. &#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-23 at 1.44.52 pm.png" alt=""><figcaption></figcaption></figure>

The Manage Services tool is divided into two sections.

1. The Budget Trend Analysis&#x20;
2. [`Agreement Items`](../../the-building-blocks.md#agreement-items)

{% hint style="success" %}
The Budget Trend Analysis section is also displayed on the Service Agreement Record, and is visible to assist you in monitoring and forecasting a Participant's financial status. However, it is purely a visual helper and is not crucial in adding Services. To read more about the Budget Trend Analysis tool, [click here](manage-services.md#budget-trend-analysis).&#x20;
{% endhint %}

In **Maica**, we Manage Services for a [Service Agreement](../../../getting-started/maica-key-concepts/service-agreement.md) through [Agreement Items](../../the-building-blocks.md#agreement-items). To begin adding Agreement Items, simply click the `+ Add` button to display the `Manage Agreement Item` pop-up, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-23 at 2.04.57 pm.png" alt=""><figcaption></figcaption></figure>

The Management Agreement Item is also divided into two sections, `Structure` and `Available Funding`. You should begin by populating the `Structure`. This is important as you may have quite a high number of [Support Items](../../the-building-blocks.md#support-items) or [Support Categories](../../the-building-blocks.md#support-categories) to choose from (these will be selectable in the `Available Funding` Section), and once the desired `Structure` has been populated, **Maica** will only show the [Items](../../the-building-blocks.md#support-items) or [Categories](../../the-building-blocks.md#support-categories) that fit the specified `Structure`.&#x20;

The `Structure` section contains a number of fields to be populated, these are explained in further detail in the table below:

<table><thead><tr><th width="264">Field </th><th>Description</th></tr></thead><tbody><tr><td><code>Funding Structure</code> </td><td>This field indicates the Funding Structure of the Agreement Item. <code>Support Item</code> allows you to configure funding for a specific <a href="../../the-building-blocks.md#support-items">Support Item</a>, whereas <code>Support Category</code> allows you to setup bucket funding for a <a href="../../the-building-blocks.md#support-categories">Support Category</a>. To learn more about the types of Funding Structure's in <strong>Maica</strong>, click <a href="../../the-building-blocks.md">here</a>.</td></tr></tbody></table>

The fields are slightly different depending on the selected `Funding Structure`, below are the displayed fields if you select `Support Item`:&#x20;

<table><thead><tr><th width="268">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Period</code></td><td>This field indicates the date range the funding is valid for. You can choose to preset the Period to the Participant(s) Active Plan Range, Active Service Agreement Range or input a Custom Range.  </td></tr><tr><td><code>Start &#x26; End Date</code></td><td>If a Custom Range is selected for your Period, you can input your desired Start &#x26; End Dates here. Otherwise, this field will be populated based on the Participants Active Plan or Service Agreement data within <strong>Maica</strong>. </td></tr><tr><td><code>Service Day</code> </td><td>This field allows you to set the days of the week the Client has nominated to receive the Service.</td></tr><tr><td><code>Service Time</code></td><td>This field allows you to set the time of day the Client has nominated to receive the Service.</td></tr><tr><td><code>Service Frequency</code></td><td>This field allows you to set the frequency or interval the Client has nominated to receive the Service. It is also used to calculate the <code>Total Quantity</code>.</td></tr><tr><td><code>Days of the Week</code></td><td>This field is only visible if <code>Service Frequency</code> is set to <code>Weekly</code>. It is a multi-select to set the specific days of the week the Client has nominated to receive the Service and it is also used to calculate the <code>Total Quantity</code>.</td></tr><tr><td><code>Quantity</code> </td><td>This is a manual input field that allows for you to set a desired Quantity. This is essentially the duration of a Service. A Quantity of 1 is equivalent to 1 hour. It is also used to calculate the <code>Total Quantity</code>.   </td></tr><tr><td><code>Total Quantity</code></td><td>The <code>Total Quantity</code> represents the Total Number of Services being delivered during the specified <code>Period</code>. </td></tr></tbody></table>

Below are the displayed fields if you select `Support Category` as your `Funding Structure`: &#x20;

<table><thead><tr><th width="268">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Period</code></td><td>This field indicates the date range the funding is valid for. You can choose to preset the Period to the Participant(s) Active Plan Range, Active Service Agreement Range or input a Custom Range.  </td></tr><tr><td><code>Start &#x26; End Date</code></td><td>If a Custom Range is selected for your Period, you can input your desired Start &#x26; End Dates here. Otherwise, this field will be populated based on the Participants Active Plan or Service Agreement data within <strong>Maica</strong>. </td></tr><tr><td><code>Amount</code> </td><td>This field represents the total amount for the Category Funding, for example allocating $5,000.00 to a specific Support Category would mean being able to use any Support Item within this Support Category to a total spend of $5,000.00.</td></tr><tr><td><code>Total Quantity</code></td><td>The <code>Total Quantity</code> represents the Total Number of Services being delivered during the specified <code>Period</code>. </td></tr></tbody></table>

Once you have populated your `Structure`, **Maica** will show you the [Items](../../the-building-blocks.md#support-items) or [Categories](../../the-building-blocks.md#support-categories) that fit the specified Structure and are available for selection in the Available Funding Section, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-23 at 4.16.03 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
As we have selected `Saturday` in the `Service Day` section, Maica will only show us the Support Item or Categories that are available on a `Saturday`.
{% endhint %}

The `Available Funding` section also has a `Total Items` field in the top right corner. This simply is a numerical value expressing the Total Number of available Items or Categories to select from that fit your inputted `Structure`.&#x20;

After the required Support Item or Category has been selected, simply click the `Add` button to finalise the Agreement Item and it as a Service.&#x20;

{% hint style="success" %}
Maica will only allow the Support Items and Categories within the recorded Participant's Plan Details (Active Plan) to be selected. To learn more about Plan Record's, click [here](manage-budget.md).&#x20;
{% endhint %}

## What happens after I add a Service?&#x20;

After you have added your required Service's, they will all be displayed within the UI in the form of a Summary table, as shown below:&#x20;

<figure><img src="../../../.gitbook/assets/agreement items (1).png" alt=""><figcaption></figcaption></figure>

Here you can manually override the Price List rate or edit the Quantity if you desire. This allows you to personalise your rates or use a different calculation method that suits your needs.&#x20;

Within this screen, there is also an `Actions` section located on the far right hand side of the interface. The buttons within that section have the following functions:&#x20;

<table><thead><tr><th width="151">Button</th><th>Description</th></tr></thead><tbody><tr><td><ol><li>Edit</li></ol></td><td>This button allows you to edit the Agreement Item by reopening the <a href="manage-services.md#how-do-i-add-services"><code>Manage Agreement Item</code></a> pop-up of an existing Item. </td></tr><tr><td><ol start="2"><li>Delete</li></ol></td><td>This button removes Agreement Items from the Service Agreement. </td></tr><tr><td><ol start="3"><li>Duplicate</li></ol></td><td>This button allows you to duplicate Agreement Items. This can be useful if you have similar Items that you do not wish to rebuild, you can simply duplicate and edit. </td></tr></tbody></table>

Once you have finalised your Agreement Items, click `Submit` and Maica will update the Service Agreement and any associated records to match your changes.&#x20;

## Budget Trend Analysis

The Budget Trend Analysis helps is a visual tool at the top of the Manage Services modal that helps you track how funding is being used across a Care Recipient’s Support at Home Plan. It provides a clear, quarter-by-quarter view of available funding, projected expenditure, and remaining balances.

### How does it work?&#x20;

For each quarter in the Care Recipient’s Plan, the component displays a **tile** showing:

* **Available Funding** – the total approved funding for that quarter.
* **Estimated Expenditure** – the projected cost of services scheduled in that quarter.
* **Remaining Funding** – the difference between available funding and estimated expenditure.

{% hint style="success" %}
The tiles update automatically when services or budgets are changed, ensuring the display always reflects the most up-to-date information.
{% endhint %}

This view makes it easy to see if funding is being used as expected or if adjustments to services may be needed.

{% hint style="info" %}
The Budget Trend Analysis calculations are supported by fields on the Plan, Service Agreement, and Agreement Item. For technical details about how these values are derived, see the Admin Guide for [Budget Trend Analysis](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/support-at-home/budget-trend-analysis).
{% endhint %}

## Validation&#x20;

### Appointment Service Validation for Support at Home&#x20;

When a Service Agreement is funded under **Support at Home** and linked to a Parent Plan, the Manage Services component validates selected services against the **Approved Services** defined on that Plan.

This ensures only services formally approved for the Care Recipient can be added to the Service Agreement.

#### So, what is the logic?&#x20;

Two validations are performed whenever a product/support item is selected:

1. **Support Item Match**
   * The selected Support Item must exist in the list of Approved Services on the Parent Plan.
2. **Date Range Match**
   * The Service Agreement Item’s start and end dates must fall within the Approved Service’s start and end dates.
   * Open-ended records (where start or end date is blank) are supported.

{% hint style="warning" %}
If a validation check fails, Maica will block creation of the Service Agreement Item and display an error message:

* If the Support Item is not approved.
* If the selected date range falls outside the Approved Service’s valid period.
{% endhint %}

{% hint style="info" %}
#### Special Scenario – No Approved Services Present

If the Parent Plan has **no Approved Services records**:

* Validation is skipped.
* Users may select any product from the Service Agreement’s price book.
{% endhint %}

{% hint style="success" %}
#### Additional Considerations

* The validation applies only when **Funding Type = Support at Home**.
* Only **newly added support items** are validated.
* This ensures services under Support at Home remain aligned with the Care Recipient’s Plan, while still allowing flexibility in cases where Approved Services are not recorded.
{% endhint %}
