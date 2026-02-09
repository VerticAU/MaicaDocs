---
description: Learn how Maica manages Funding from the Home Care Packages
---

# Home Care Package Funding

## How is Home Care Package Funding Managed in Maica?&#x20;

In **Maica**, `Funding` for Aged Care `Participants` with Home Care Package Funding is managed through a Quick Action located on the Participants Service Agreement. This Quick Action is the `Manage Budget` tool and is further explained in more detail [here](../../service-agreements/agreement-management/aged-care-agreements/manage-budget.md).&#x20;

Essentially, within the `Manage Budget` Quick Action you will manage all your Home Care Package Funding, however it is important to note that once a Budget has been created, **Maica** will generate a `Funding Record` for your Participant with the relevant data.&#x20;

This `Funding Record` will sit on your Participants Contact Record, and whilst is not useful in managing your Participants Funding, it will provide a handy overview of the Budget information. &#x20;

## What is included in a Home Care Package Funding Record?

Within a `Home Care Package` Funding Record you can find the following information and functionality:

* Funding Budget Information
* Funding Period Information (Start Date & End Date)
* Funding Items
* Funding Overviews & Charts&#x20;

## What are the key components of a Home Care Package Funding Record?&#x20;

The key components of a  Home Care Package `Funding` Record are the `Funding Items`, these are explained in further detail below.&#x20;

### Funding Item

The `Funding Item` represents the specific Plan Budget Items or Components included in a Participant's `Home Care Package`. Generally, these define what `Support Purposes` have been selected to form part of a `Home Care Package Budget`. For example, when Managing your Home Care Budget, if you have selected an Oxygen Supplement, as shown below.

<figure><img src="../../.gitbook/assets/Screenshot 2024-09-05 at 3.21.48 pm.png" alt=""><figcaption></figcaption></figure>

This will then be created as a `Funding Item` record in your `Funding Record`, as per below:&#x20;

<figure><img src="../../.gitbook/assets/funding item 2.png" alt=""><figcaption></figcaption></figure>

## What other information is stored in a Funding Record?

### Participant Budget Information&#x20;

The Participant Budget Information section has a number of Roll-Up Summary fields that collect data from the corresponding `Funding Item` record(s). These fields are explained in further detail below:&#x20;

<table><thead><tr><th width="294">Field Name</th><th>Notes</th></tr></thead><tbody><tr><td><code>Total Budget Income (Daily)</code></td><td><strong>SUM</strong> total of the <code>Subsidies</code> &#x26; <code>Supplements</code></td></tr><tr><td><code>Total Client Contributions (Daily)</code></td><td><strong>SUM</strong> total of the <code>Client Contributions</code></td></tr><tr><td><code>Total Claimable Fees (Daily)</code></td><td><strong>SUM</strong> total of the <code>Claimable Fees</code></td></tr><tr><td><code>Total Billable Fees (Daily)</code></td><td><strong>SUM</strong> total of the <code>Billable Fees</code></td></tr><tr><td><code>Total Available Funding (Current Month)</code></td><td><strong>Formula</strong> that first calculates the <strong>SUM</strong> of the <code>Daily Budget Income</code> and <code>Daily Client Contributions</code>, then subtracts the <code>Daily Claimable Fees</code> and then multiplies the <strong>Total</strong> by the days in the current month. </td></tr></tbody></table>
