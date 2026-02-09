---
description: Learn how to create Service Bookings in Maica
---

# Create Service Booking

## How do I create a Service Booking in Maica?&#x20;

In Maica, you can create `Service Bookings` through the `Create Service Booking` Quick Action located on the `Funding Record`.&#x20;

The `Create Service Booking` Quick Action in Maica allows you to create Service Bookings for your `Participants` that will Sync directly with the NDIS.

Please follow the steps below to create a Service Booking:&#x20;

### 1. Use the `Create Service Booking` Quick Action&#x20;

The first step in creating a `Service Booking` is simply clicking the `Create Service Booking` Quick Action located on the `Funding Record`, as shown below:&#x20;

<figure><img src="../../../.gitbook/assets/create sb.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
In the screenshot above you can see that `PACE Plan` is not checked. If this was to be checked, the `Create Service Booking` Quick Action would not be available.&#x20;
{% endhint %}

### 2. Service Booking Setup

Once you clicked on the Quick Action above, you will be shown the `Create Service Booking` pop-up, as shown below:&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2024-09-05 at 11.31.56 am.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Please confirm the details below to create a Service Booking and associated Service Items. Two types of Service Bookings can be created, depending on the Participant’s Plan, a Standard Booking or a Plan Managed Booking. A Standard Booking is available when the Participant’s funds are Agency Managed. A Plan Managed Booking is only available to Plan Managers.

In order to successfully create the Service Booking, please ensure:

* The Service Booking is being created for Support(s) you are registered to Provide
* There is sufficient Budget available in the [Participant’s Plan](https://vertic23-dev-ed.develop.lightning.force.com/lightning/r/maica__Plan__c/a0O5i000007ioKvEAI/a0O5i000007ioKvEAI)
* The Start and End Dates sit within the Start and End Dates of the Participant’s Plan
* For Plan Managed Service Bookings, a Standard Service Booking under the CB Choice and Control Category must first exist between the Plan Manager and the Participant
* If a Participant has a Stated Item, the Stated Item must be selected in the Support Item list below
* Declare that this Service Booking has been discussed with and agreed by the Participant
{% endhint %}

Before populating your Booking Items, you should first set up your `Service Booking` by selecting the `Period` of the `Service Booking` as well as the `Type`.&#x20;

For your Booking `Period`, you can choose between `Custom` Dates, or the entire `Plan` Date.&#x20;

For your Booking `Type`, you can choose between `Standard Booking` or `Plan Managed`. Please refer to the information box above to understand the difference and which one will be relevant for your `Service Booking`.&#x20;

### 3. Populate Booking Items

Once you have setup your Service Booking, it is time to add your Booking Items.&#x20;

{% hint style="info" %}
`Booking Items` refer to the specific services or supports that are allocated under a `Service Booking`.
{% endhint %}

To begin, simply click the `+ Add` button on the right hand side of the interface. This will create a Booking Item Line Item with the following fields ready to be populated:&#x20;

<figure><img src="../../../.gitbook/assets/booking item (1).png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="214">Field </th><th>Description</th></tr></thead><tbody><tr><td><code>Support Category</code> </td><td>NDIS <code>Support Categories</code> are the broad areas of funding under the National Disability Insurance Scheme (NDIS). Refer below for more information around available Support Categories to select for your <code>Service Bookings</code>. </td></tr><tr><td><code>Support Item</code> </td><td>NDIS <code>Support Items</code> are the specific services or products that participants can access through their NDIS funding, based on their plan’s approved categories.</td></tr><tr><td><code>Quantity</code> </td><td>This is a <strong>Maica</strong> concept that allows you to adjust the <code>Quantity</code> of delivery for any specified <code>Support Item</code>.</td></tr><tr><td><code>Rate</code> </td><td>This is the price of 1 <code>Quantity</code> unit of any <code>Support Item</code>. This field is automatically populated based on the selected <code>Price List</code>, but is adjustable if desired. </td></tr><tr><td><code>Price List</code></td><td>This field allows you to selected which <code>Price List</code> you wish to associate with the selected <code>Support Item</code> delivery. </td></tr></tbody></table>

If you have associated `Funding Items` (`Plan Budgets`) on your Participants `Funding Record`, the Support Categories will be automatically populated with the available `Support Categories` and Budget. If you attempt to Add additional `Booking Items`, you will only be able to select from `Support Categories` associated with the linked `Funding Items`.&#x20;

If you have no associated `Funding Items`, you will be able to select from all `Support Categories`.

{% hint style="info" %}
Please note that if you do not have access to a Participants `Plan Budgets` or you haven't synced them into **Maica**, you can still create a `Service Booking` to submit to the NDIS, however the NDIS may return an error if there is insufficient or no funding associated to the selected `Support Category`.&#x20;
{% endhint %}

### 4. Confirm and Finalise

After you have added all of your Booking Items, you will need to confirm your Service Booking before it can be created and synced with the NDIS. To do so, **Maica** will present you with a summary and a toggle, as illustrated below:

<figure><img src="../../../.gitbook/assets/Screenshot 2024-09-05 at 11.50.58 am.png" alt=""><figcaption></figcaption></figure>

Once the toggle is selected `TRUE`, the `Submit` button will appear and you will be able to confirm your `Service Booking`.&#x20;

After doing so, your `Service Booking` Record will be synced with the NDIS, and if successful, created in **Maica** within the `Funding Record` where you can manage and review your `Service Booking`. To learn more about managing a `Service Booking`, click here.&#x20;
