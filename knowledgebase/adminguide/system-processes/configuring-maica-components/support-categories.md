---
description: Learn how to configure Support Categories in Maica
---

# Support Categories

{% hint style="info" %}
Please note that that NDIS Support Categories will be configured into your Maica instance by the **Maica** team during Post Installation. The following article is only about configuring custom Support Categories for Home Care Packages.
{% endhint %}

When it comes to Home Care Packages, custom fields have been added to the Support Category object in **Maica**. These allow you to configure appropriate Support Categories to represent the Home Care Package Budget, and allow our [Manage Budget](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements/agreement-management/aged-care-agreements/manage-budget) feature to interrogate the Support Category Records in your system to ensure that you can effectively set up and manage budgets while adhering to Home Care Package requirements.&#x20;

## Support Categories Template

As well as the ability to configure Support Categories, **Maica** offers a template with default categories, categorised by the various line items that form a package budget for home care, as per the table below.&#x20;

{% hint style="info" %}
You can import these Support Categories into **Maica** using our Reference Data Template, which is further explained [here](../../data/reference-data/).&#x20;
{% endhint %}

<table><thead><tr><th width="248"></th><th>Description </th></tr></thead><tbody><tr><td>Billable Fees</td><td>Fees that are charged directly to a customer through a co-payment invoice.</td></tr><tr><td>Claimable Fees</td><td>Fees that the provider can claim on behalf of the Home Care Package.</td></tr><tr><td>Client Contributions</td><td>Money paid into the package directly by the client, such as a basic daily fee.</td></tr><tr><td>Subsidies</td><td>The base subsidy paid by the government into the Home Care Package budget.</td></tr><tr><td>Supplements</td><td>Additional pieces of funding that individual participants can acquire approval for, to help with specific needs.</td></tr></tbody></table>

## How do I configure Support Categories?&#x20;

If you wish to configure your own Support Categories within **Maica** in order to set up and manage budgets correctly, please follow the steps indicated below.

### 1. Search for `Support Categories` in the App Launcher

In the Salesforce App Launcher, search for `Support Categories` and choose it to open the list view of all `Support Categories` records in your Maica instance, as shown below.

<figure><img src="../../.gitbook/assets/app launcher support cats.png" alt=""><figcaption></figcaption></figure>

### 2. Create new `Support Category`

Once you are viewing your `Support Categories`, simply click the `New` button located in the top right hand corner of your interface to bring up the `New Support Category` pop-up, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/support cats new button.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Note, you can also customise imported by Support Categories by simply selecting them and clicking the `Edit` button.&#x20;
{% endhint %}

After the pop-up is displayed, you will be prompted to fill-in the following fields:&#x20;

<table><thead><tr><th width="267">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Name</code></td><td>This will be the name of your Support Category. You can name your Support Categories anyway you wish.</td></tr><tr><td><code>NDIS Name</code></td><td>This is the official name of the support category as recognised by the NDIS (National Disability Insurance Scheme), if applicable. Note: As NDIS Support Categories are populated via the Data Import, this will be automatically be populated. </td></tr><tr><td><code>Support Purpose</code></td><td>The Support Purpose dropdown is a configurable field within a Support Category, to which new values have been added to represent the categories of budget items within a Home Care Package.<br><br>It is important that before you begin adding products that represent actual budget items to the package, you first set up your support categories to support the creation of the products underneath.</td></tr><tr><td><code>Category Number</code></td><td>This field is a unique identifier or reference number for the Support Category.</td></tr><tr><td><code>Fund Management Type</code></td><td>Specifies the type of fund management associated with the Support Category, indicating how funds are managed for services under this category. <br><br>If you are configuring Support Categories for Home Care Packages, please ensure this is set to Home Care Package. </td></tr></tbody></table>

{% hint style="warning" %}
The `Category Product` field associates the Support Category to a specific Product.\
\
However, please note, it is not best practice on **Maica** to use the `Category Product` field when configuring Support Categories, rather, it is best practice to link Products Records to Support Categories directly from the Product record. This is further explained [here](support-items.md).&#x20;
{% endhint %}

Once populated, simply click `Save` to create your Support Category.&#x20;

### 3. Populate your `Support Category` with `Support Items`

Now that your Support Category has been set up, you must populate it with Support Items that correspond to the budget items in the package.

As mentioned above, this is not done through the Support Category, but rather, directly from the Support Item record.&#x20;

{% hint style="danger" %}
Clicking the `New` on the Support Item related list directly from your Support Category record will create an entirely new Support Item, not assign an exisiting one.&#x20;
{% endhint %}

{% hint style="info" %}
In order to learn how to configure and assign Support Items to your Support Category, please click [here](support-items.md).&#x20;
{% endhint %}
