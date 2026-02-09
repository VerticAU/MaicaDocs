---
description: Learn how to Manage NDIS Service Agreements in Maica
---

# Manage Service Agreement

## What does the `Manage Service Agreement` Quick Action do?

The Manage Service Agreement tool in **Maica** is a Quick Action with a customised User Interface for adding, updating, and managing Services within a NDIS Service Agreement. `Manage Service Agreement` allows you to add new Services in the form of [Agreement Items](../../the-building-blocks.md#agreement-items) against a [Service Agreement](../../../getting-started/maica-key-concepts/service-agreement.md). These [Agreement Items](../../the-building-blocks.md#agreement-items) will ultimately form the base of your Appointments or Shifts.

## Where do I find the `Manage Service Agreement` button?

The Manage Service Agreement function is visible at the top right hand corner of your interface on the Service Agreement record, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/manage service agreement button.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
This function is only available when the `Funding Type` is set to one of the options listed on the NDIS Agreements page. To learn more about these options, click [here](./#what-is-a-ndis-service-agreement).&#x20;
{% endhint %}

## How do I manage my Service Agreement?&#x20;

In order to begin managing your Service Agreement and adding Services, simply click the `Manage Service Agreement` button to display the pop-up, as shown below. &#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-26 at 11.23.24 am.png" alt=""><figcaption></figcaption></figure>

The main function within the `Manage Service Agreement` function is adding [Agreement Items](../../the-building-blocks.md#agreement-items), however, before you start adding [Agreement Items](../../the-building-blocks.md#agreement-items), there are some other fields to populate, including:&#x20;

<table><thead><tr><th width="247">Field </th><th>Description</th></tr></thead><tbody><tr><td><code>Start Date</code> </td><td>This field is defaulted to the Start Date of your Service Agreement. When adding Agreement Items, they will default to this Date, however, the Start Date of each Item is adjustable.</td></tr><tr><td><code>End Date</code></td><td>This field is also defaulted to the End Date of your Service Agreement. Similar to the Start Date, when adding Agreement Items, they will default to this Date, however, the End Date of each Item is adjustable.<br><br>You can also quickly apply the same End Date to <strong>all</strong> items by entering the desired Date and checking the box next to the End Date field. </td></tr><tr><td><code>Price List</code></td><td>This is the Price List associated with the Service Agreement. If you wish to change the associated Price List, you can do so within the Manage Service Agreement pop-up. To learn more about Price List's, click <a href="../../../getting-started/maica-key-concepts/price-list.md">here</a>.</td></tr></tbody></table>

After you have populated the above fields, you can begin adding Agreement Items.&#x20;

To do so, click the `Add +` button on the far right hand side of the interface.&#x20;

Maica will then ask you to choose between `Category` or `Item` funding. Choose, your preference, and your Agreement Item record will be added and become ready to be populated. An Agreement Line Item contains a number of fields that are required to be populated before the record is submitted, as shown below.

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-26 at 11.49.08 am.png" alt=""><figcaption><p>Agreement Item for Funding Types other than Combination</p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-26 at 2.53.19 pm.png" alt=""><figcaption><p>Agreement Item when Funding Type is Combination</p></figcaption></figure>

Each field is explained in further detail in the table below:  &#x20;

<table><thead><tr><th width="247">Field </th><th>Description</th></tr></thead><tbody><tr><td><code>Start Date</code> </td><td>The Start Date for each Agreement Item is defaulted to the Start Date of your Service Agreement, however it is adjustable within the confines of your Service Agreement period (Start &#x26; End Dates).</td></tr><tr><td><code>End Date</code></td><td>The End Date for each Agreement Item is defaulted to the End Date of your Service Agreement, however it is adjustable within the confines of your Service Agreement period (Start &#x26; End Dates).</td></tr><tr><td><code>Support Category</code></td><td>This field is a dropdown of all available Support Categories within the NDIS. </td></tr><tr><td><code>Support Item</code> </td><td>If you selected Item Funding when adding your Agreement Item, this field is a selectable dropdown of all available Support Items within the chosen Support Category. <br><br>If you selected Category Funding when adding your Agreement Item, this field will not be available as Maica will use the chosen Support Category to bill against. </td></tr><tr><td><code>Quantity</code> </td><td>This is a manual input field that allows for you to set a desired Quantity. This is essentially the duration of a Service. A Quantity of 1 is equivalent to 1 hour. It is also used to calculate the <code>Total Quantity</code>.   </td></tr><tr><td><code>Rate</code> </td><td>This is a customisable field that represents the cost per unit of quantity of the chosen Support Category or Item. It is automatically populated from the associated Price List, however it can be adjusted if desired. </td></tr><tr><td><code>Total</code> </td><td>This field shows a multiplication of the <code>Quantity</code> and <code>Rate</code> to represent the overall cost of the Agreement Item. </td></tr><tr><td><code>Utilisation %</code></td><td>This field is available if your selected <code>Funding Type</code> is <strong>any</strong> from the specified list shown <a href="./#what-is-a-ndis-service-agreement">here</a>, other than <code>Combination</code>. <br><br>It represents the proportion of the allocated budget that has been used for a particular support item, calculated as a percentage of the total available funds for that item. It helps track whether spending is within budget (under 100%) or has exceeded the allocated amount (over 100%).</td></tr><tr><td><code>Funding Type</code></td><td>This field is available only if your selected <code>Funding Type</code> is <code>Combination</code>. <br><br>It is a selectable dropdown to allow you to chose a specific Funding Type for each Agreement Item. If this is the case, you can see the <code>Utilisation %</code> in the Agreement Item record once submitted.</td></tr></tbody></table>

Once you have finalised your Agreement Items, click `Submit` to save your changes.&#x20;

## What happens after I click `Submit` ?&#x20;

After you click `Submit`, **Maica** will update the Service Agreement and any associated records to match your changes. An Agreement History record will be created, as well as individual records for all your Agreement Items.&#x20;

{% hint style="info" %}
To learn more about an Agreement Item Record, click [here](../../the-building-blocks.md#agreement-items).&#x20;
{% endhint %}

The Service Agreement Summary will also be generated, showing you all your Agreement Items and total overall Budget on an interactive graph, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-08-26 at 3.19.10 pm.png" alt=""><figcaption></figcaption></figure>
