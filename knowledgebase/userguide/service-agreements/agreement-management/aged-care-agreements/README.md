---
description: Learn about Aged Care Service Agreements in Maica
---

# Aged Care Agreements

{% hint style="danger" %}
Please note, as of November 1st 2025 Home Care Packages are being replaced with Support at Home funding.&#x20;
{% endhint %}

## What is a Aged Care Service Agreement?&#x20;

In **Maica**, we have an option for `Aged Care Service Agreements` to be specifically curated in order to support the requirements of `Home Care Packages` or `Support at Home`, ensuring that they are perfectly tailored to support Aged Care Participants.&#x20;

In order to set a Service Agreement as HCP specific, simply select `Home Care Package` as the `Funding Type` when [creating the Service Agreement](../#how-do-i-create-a-service-agreement), the same applies for `Support at Home`. This will dynamically update the page and display the relevant components needed to populate your Agreement.&#x20;

For Home Care Packages, these are:&#x20;

* [Manage Budget](manage-budget.md)
* [Manage Services ](manage-services.md)
* [Discharge Services](discharge-services.md)&#x20;

{% hint style="info" %}
As mentioned above, both Manage Budget and Discharge Services will become obsolete as of November 1st, 2025. \
\
In Maica, to discharge a Service Agreement beyond this will simply be done via a checkbox attribute on the Service Agreement which updates the Status.&#x20;
{% endhint %}

& for Support at Home, these are:&#x20;

* [Manage Services](manage-services.md)&#x20;

These components are Quick Actions that are displayed on the top right hand corner of your interface. To learn more about each one, please refer to the relevant pages linked above.&#x20;

## Key Components&#x20;

Outside of the above mentioned Quick Actions, An Aged Care Service Agreement has several important components and details; for additional information on each one, please see below.

### Information Tab&#x20;

On the left hand side of your Agreement you will notice an Information Tab which contains crucial details for your Agreement, including the following key fields:&#x20;

<table><thead><tr><th width="253">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Price Book</code></td><td>This refers to the associated Price Book that you link to your Service Agreement in order to control pricing. <br><br>This <strong>can</strong> be modified at any time during the term of the Agreement, and <strong>Maica</strong> will keep track of it in the <code>Agreement History</code> as well as the <code>Previous Price Book</code> and <code>Last Price Book Change</code> fields in the Information Tab.</td></tr><tr><td><code>Funding Type</code></td><td>This refers to selected Funding Type for the Service Agreement. For all Aged Care Service Agreements, this will be Home Care Package or Support at Home. </td></tr><tr><td><code>Status</code></td><td>This refers to the current <code>Status</code> of the Service Agreement. To learn more about how the Status is determined within <strong>Maica</strong>, click <a href="../#service-agreement-statuses">here</a>. </td></tr><tr><td><p><code>Estimated Expenditure</code> </p><p><code>(Current Quarter)</code></p></td><td>The estimated cost of service delivery for the Service Agreement for the current quarter</td></tr><tr><td><code>Available Funding - Active</code></td><td>The sum of the Approved Amount from all related Plan Budget records where Is Active = TRUE.</td></tr><tr><td><code>Remaining Funding - Active</code></td><td>The sum of the Remaining Amount from all related Plan Budget records where Is Active = TRUE.</td></tr><tr><td><code>Total Items</code></td><td>This refers to the total number of Agreement Items within the Service Agreement. To learn more about how Agreement Items are configured, click <a href="manage-services.md">here</a>. </td></tr><tr><td><code>Total Allocated</code></td><td>This refers to the total amount of allotted funds across all associated Agreement Items.</td></tr><tr><td><code>Total Expenditure</code></td><td>This refers to the total amount of spent funds across all associated Agreement Items.</td></tr><tr><td><code>Total Remaining</code></td><td>This refers to the total amount of remaining funds across all associated Agreement Items.</td></tr><tr><td><code>Utilisation</code> </td><td>This is a percentage calculated based on the Total Expenditure against the Total Allocated in order to represent how much of the Participants Funding has been spent. </td></tr><tr><td><code>Agreement Period Progress</code></td><td>This refers to the amount of time the Service Agreement is through its lifecycle based on the Start and End Dates </td></tr><tr><td><p><code>Authorise Stripe</code> </p><p><code>Auto Billing</code></p></td><td>Indicates if the Participant authorises automatic billing through Stripe for this Service Agreement.</td></tr><tr><td><code>Start &#x26; End Date</code></td><td>This represents the beginning and ending of the Agreement period. <br><br>The End Date can be left blank. Home Care Package Agreements are usually open ended and do not have to have a defined End Date.</td></tr></tbody></table>

### Home Care Agreement&#x20;

The Home Care Agreement component offers a summary of information that is specifically relevant to the administration of a Home Care Package as a Service Agreement, as well as Service Delivery and management of the Home Care Package Budget.&#x20;

{% hint style="success" %}
For Home Care Packages, the Budget and all included components are managed using the `Manage Budget` Quick Action. To learn more about managing your Budget, click [here](manage-budget.md). \
\
For Support at Home, this is managed by the Synchronisation automation in Maica.&#x20;
{% endhint %}

This summary section is found on the right hand side of your interface.

Within the Home Care Agreement Tab, there are a number of fields, these are explained further in the below table:&#x20;

| Field                                  | Description                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Plan`                                 | This is a related record to the Service Agreement which represents details of the [Budget](manage-budget.md).                                                                                                                                                                                                                                            |
| `Estimate Expenditure (Current Month)` | This is a calculation that evaluates the [Agreement Items](../../the-building-blocks.md) set up against your [Budget](manage-budget.md). These [Agreement Items](../../the-building-blocks.md) will include information on the Services being provided as well as their cost. The of these Items will be calculated for the current month in this field. |
| `Home Care Account Balance`            | This field represents the balance of the package at the conclusion of the current claim period or the current month. This takes into account the Package and the Package Budget, as well as its Projected Unspent Funds.                                                                                                                                 |
| `Projected Unspent Funds Balance`      | This field represents the estimated amount of funds available in the package budget at the end of the month.                                                                                                                                                                                                                                             |
| `Provider Held Commonwealth Funds`     | <p>This field represents the balance of funds held by the provider on behalf of the Commonwealth.<br><br>These funds can be drawn down in the case of an overspend at the conclusion of a claim period. </p>                                                                                                                                             |
| `Provider Held Care Recipient Funds`   | <p>This field represents the balance of funds held by the provider on behalf of the Participant. <br><br>These funds can be drawn down in the case of an overspend at the conclusion of a claim period. </p>                                                                                                                                             |
| `Opt in to Return Unspent Funds`       | This field indicates the Provider has opted in to automatically return unspent funds for this Service Agreement.                                                                                                                                                                                                                                         |
| `Discharge Date`                       | This field represents the Date that the Service Agreement is [Discharged](discharge-services.md).                                                                                                                                                                                                                                                        |

### Service Agreement Leave&#x20;

The Service Agreement Leave component provides the ability to be able to place a Service Agreement on leave according to the four types of leave that are configurable and acceptable according to the Government Legislation.

In order to learn how to set up a Service Agreement Leave Record, click [here](../#service-agreement-leave).&#x20;

### Service Agreement Statements

The Service Agreement Statement component provides the ability to be able to generate a Service Agreement Statement Record. This is essentially a monthly summary of the Service Agreement.&#x20;

Statements will count and calculate all Services delivered and the cost of those Services delivered throughout the Claim Period, as well as any fees, charges, client contributions or other outgoings assessed against the Service Agreement during the Claim Period.&#x20;

### Agreement Items&#x20;

The Agreement Items component provides the ability to view each [Agreement Item](../../the-building-blocks.md#agreement-items) as an individual record. [Agreement Items](../../the-building-blocks.md#agreement-items) are configured and added to an Agreement through the [Manage Services](manage-services.md) Quick Action.&#x20;

