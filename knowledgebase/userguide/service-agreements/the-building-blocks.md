---
description: >-
  Learn about the components that make up a Service Agreement in Maica and how
  they are used.
---

# The Building Blocks

## Foundations of a Service Agreement

Service Agreement's are an extremely important data structure in the Maica solution. They underpin the financial arrangement (or contract) between your organisation and your Participants. Maica supports a number of financial structures under which Service Agreements can be managed, such as NDIS and Aged Care.

Let's discuss the foundations of a Service Agreement and the various data points that are critical to putting one together, best illustrated in the below diagram.

<figure><img src="../.gitbook/assets/Maica Solution Architecture - Service Agreement Hierarchy (2).png" alt=""><figcaption></figcaption></figure>

## The Big Picture

Service Agreement's form an essential part of the Maica solution by detailing how funding is organised between your organisation (the service provider) and the Participant. A Service Agreement consists of a number of **Agreement Items** that, together, make up the overall funding structure of the Service Agreement.

**Agreement Items** (which are effectively individually funded services) use either [Support Items](the-building-blocks.md#support-items) (for stated funding which can only use the specified Support Item) or [Support Categories](the-building-blocks.md#support-categories) (for bucket funding where any Support Item from this Support Category can be billed against).&#x20;

Once a Service Agreement is set up for a given Participant, any time an Appointment or Billable Participant Note is created, Maica validates that the required funding is in place. The process by which this validation occurs is that any funded Support Item (or Support Category) is validated against any selected Appointment Service within an Appointment.

{% hint style="info" %}
_A good example of this might be Support Coordination. If a participant has specific funding for Support Coordination in their Service Agreement and an Appointment Service that has the matching Support Items then the Appointment can go ahead. If the selected Appointment Service does not have the matching Support Items however, Maica will not allow the creation of the Appointment._&#x20;
{% endhint %}

The below sections further explain the key blocks that make up a Service Agreement.&#x20;

## Registration Groups

NDIS Registration Groups refer to specific categories of services and supports that providers can apply to offer under the National Disability Insurance Scheme (NDIS) in Australia. Each group represents a different area of support, such as personal care, assistive technology, behaviour support, and more.&#x20;

Providers must meet certain standards and be registered with the NDIS in the appropriate groups to deliver these services to participants. Registration ensures that providers adhere to quality and safety guidelines, offering participants reliable and compliant support options tailored to their individual needs.

Maica natively supports all required NDIS Registration Groups and these are linked to Support Categories within the solution.

## Support Categories

Support Categories organise and group Support Items and are used in **Maica** for bucket funding where any Support Item from a Support Category can be billed against.&#x20;

**NDIS Support Categories** are the broad areas of funding under the National Disability Insurance Scheme (NDIS) that help participants achieve their goals and improve their quality of life.&#x20;

These categories are grouped into three main types:&#x20;

* Core Supports (for daily living and essential activities)&#x20;
* Capacity Building Supports (to enhance skills and independence)&#x20;
* Capital Supports (for investments like assistive technology and home modifications).&#x20;

Each category covers different aspects of support, allowing participants to choose services that suit their specific needs and help them work toward their goals.

**Aged Care Support Categories** are configurable classifications designed to help you manage and track budgets effectively. These categories organise the different types of budget requirements, such as subsidies, supplements, client contributions, and fees, ensuring they align with Home Care Package requirements. The Support Categories in **Maica** serve as budget placeholders that the [Manage Budget](agreement-management/aged-care-agreements/manage-budget.md) feature can reference to keep track of spending and available funds.

{% hint style="info" %}
To learn how to configure Support Categories for Home Care Packages, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/configuring-maica-components).&#x20;
{% endhint %}

## Support Items

A Support Item is used to define a distinct service or product being delivered to a Participant, such as an occupational therapy session or wheelchair. Support Items capture information about the service itself as well as the service day (weekday, Saturday, Sunday, etc) , service time (morning, afternoon, etc), and many other attributes to define what a service is and how it is delivered.

**Support Items related to the NDIS** are the specific services or products that participants can access through their NDIS funding, based on their plan’s approved categories. These items are detailed in the NDIS Price Guide and include a wide range of supports, such as assistance with daily living, therapeutic services, assistive technology, transportation, and home modifications.&#x20;

Each support item falls under a specific support category and is designed to meet the unique needs of participants, helping them achieve their personal goals, increase independence, and improve overall quality of life.

**Support Items related to Aged Care** are configurable objects that represent specific services or budget items within a Home Care Package, such as subsidies, management fees, and supplements. Support Items help organise and track various aspects of a Home Care Package budget, ensuring accurate billing, budgeting, and compliance.

{% hint style="info" %}
To learn how to configure Support Items for Home Care Packages, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/configuring-maica-components).&#x20;
{% endhint %}

{% hint style="info" %}
Please note that the term `Support Item` is interchangeable in the **Maica** system with the term `Product`. The terminology is dependant on which version of **Maica** you use.&#x20;
{% endhint %}

## Agreement Items

A Maica Service Agreement has a number of Agreement Items that essentially specify what is being funded, whether this be Support Item-level funding or Support Category-level funding. Each Agreement Item either specifies a Unit Price (when funded by Support Item) or an allowance (when funded by Support Category).&#x20;

{% hint style="info" %}
When Maica generates Invoices and Invoice Line Items, it is Agreement Items that are used to draw the funding down which is then reflected at the overarching Service Agreement.
{% endhint %}

Agreement Items are configured directly on a Service Agreement record. On an NDIS Agreement, it is through the [Manage Service Agreement](agreement-management/ndis-agreements/manage-service-agreement.md) Quick Action, and on a Aged Care Agreement, it is through the [Manage Services](agreement-management/aged-care-agreements/manage-services.md) Quick Action.&#x20;

Once created, whether it is NDIS or Aged Care, you will be able click on an individual Agreement Item record directly from the Agreement Item component within the Service Agreement.&#x20;

Each Agreement Item contains Funding Information and Support Item Information. The below tables describe the key fields for each of the above listed sections:&#x20;

### Support Item Information

<table><thead><tr><th width="222">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Budget Indicator</code> </td><td>The Budget Indicator is a visual sign within the Agreement Item header that alerts you whether the Item is Under or Over Budget. </td></tr><tr><td><code>Support Category</code> </td><td>This field represents the allocated <a href="the-building-blocks.md#support-categories">Support Category</a> to the Agreement Item. </td></tr><tr><td><code>Support Purpose</code></td><td>This field represents the allocated Support Purpose to the Agreement Item. </td></tr></tbody></table>

### Funding Information

<table><thead><tr><th width="222">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Quantity</code> </td><td>This field represents the Quantity of the Agreement Item. This is a customisable field used to represent duration of a Service being delivered. It is multiplied against the Rate to determine the total cost of the Service. A Quantity of 1 is equivalent to 1 hour. </td></tr><tr><td><code>Quantity Delivered</code></td><td>This field represents the actual quantity delivered for the <em>Agreement Item</em> based on associated <em>Invoice Line Item</em> records. Maica increments this field using the <code>maica__Invoice_Line_Item__c.maica__Quantity__c</code> value. This ensures the delivered quantity respects any ratio-based adjustments configured in <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/billing-management">Billing Management Settings</a>.</td></tr><tr><td><code>Quantity Remaining</code></td><td>This field represents the number of units or services still to be delivered for the <em>Agreement Item</em>. It is calculated as:<br><code>maica__Quantity__c - maica__Quantity_Delivered__c</code></td></tr><tr><td><code>Rate</code></td><td>This field represents the Rate in which an Agreement Item will be cost on an hourly basis. The Rate is a figure that is sourced from the Service Agreement's associated <a href="../getting-started/maica-key-concepts/price-list.md">Price List</a>, however it can be adjusted if desired. </td></tr><tr><td><code>Total Allocated</code></td><td><p>This field represents the total budget allocated to the <code>Agreement Item</code>. </p><ul><li><p>For Support Items, this is calculated as:</p><ul><li><code>maica__Total_Expenditure__c</code> + (<code>maica__Quantity_Remaining__c</code> * <code>maica__Rate__c</code>)</li></ul></li><li><p>For Support Categories, this is calculated as:</p><ul><li><code>maica__Quantity__c</code> * <code>maica__Rate__c</code></li></ul></li></ul></td></tr><tr><td><code>Total Delivered</code>  </td><td>This field represents the amount spent by the Participant for the <code>Agreement Item</code>. This is calculated as the SUM of the <code>Invoice Line Item</code> records associated with the <code>Agreement Item</code> with the formula <code>maica__Invoice_Line_Item__c</code>.<code>maica__Line_Total__c</code></td></tr><tr><td><code>Total Remaining</code> </td><td>This field represents the amount of funds remaining for the <code>Agreement Item</code>. This is calculated using the following logic: <code>maica__TotalAllocated__c</code> - (<code>maica__Total_Expenditure__c</code> + <code>maica__Total_Committed__c</code>)</td></tr><tr><td><code>Total Committed</code></td><td>This field represents the portion of the budget that has been committed to future service delivery but not yet delivered. It is typically used for scheduled services. By default, this field is not used in Client Care but can be enabled for organisations that wish to track upcoming commitments separately from delivered services.</td></tr><tr><td><code>Utilisation</code> </td><td>This field outputs a <strong>formula</strong> that divides the <code>Total Delivered</code> by the <code>Total Allocated</code> to display a percentage indicating how much of the total <strong>Total Allocated</strong> has been consumed. </td></tr></tbody></table>

{% hint style="info" %}
Use the next few articles to learn how to apply Maica Service Agreements to specific use cases like Home Care Packages and NDIS.
{% endhint %}
