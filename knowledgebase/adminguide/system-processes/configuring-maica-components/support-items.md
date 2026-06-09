---
description: Learn how to configure Support Items in Maica
---

# Support Items

{% hint style="info" %}
Please note that that NDIS Support Items, that are defined by the NDIA, will be imported into your Maica instance by **Maica's** Data Import Function. The following article is only about configuring custom Support Items for Home Care Packages. To learn more about importing NDIS Support Items, click [here](../../data/data-import-utility/).&#x20;
{% endhint %}

{% hint style="info" %}
Please also note that the term `Support Item` is interchangeable in the **Maica** system with the term `Product`. The terminology is dependant on which version of **Maica** you use.
{% endhint %}

Similar to Support Categories, custom fields have been added to the Support Item object in **Maica**. These allow you to configure appropriate Support Items to represent the Home Care Package Budget, and allows them to be useable within the [Manage Budget](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements/agreement-management/aged-care-agreements/manage-budget) tool.&#x20;

So, the following section explains how to configure a Support Item, the steps you need to take to ensure that you can effectively set up and manage budgets while adhering to Home Care Package requirements, and details of the key configurable fields/components within the Support Item object. Below will also detail the relationship between Support Items and Support Categories, as well as how to be relate them in **Maica**.&#x20;

## How do I configure Support Items?&#x20;

If you wish to configure your own Support Items within **Maica** in order to set up and manage budgets correctly, please follow the steps indicated below.

### 1. Search for `Support Items` in the App Launcher

In the Salesforce App Launcher, search for `Support Items` and choose it to open the list view of all `Support Items` records in your Maica instance, as shown below.

<figure><img src="../../.gitbook/assets/support item search.png" alt=""><figcaption></figcaption></figure>

### 2. Create new `Support Item`

Once you are viewing your `Support Item`, simply click the `New` button located in the top right hand corner of your interface to bring up the `New Support Item` pop-up, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/new support item.png" alt=""><figcaption></figcaption></figure>

After the pop-up is displayed, you will be prompted to fill-in a number of fields.&#x20;

### 3. Populate `Support Items` Fields

Each field on the New Support Item pop-up is detailed below. The key fields are described and their relationships are described in further detail:

1. `Support Item Name`:  This will be the name of your Support Item. You can name your Support Item anyway you wish.
2. [`Support Category`](support-categories.md): This field allows you to associate your Support Item with any given Support Item.&#x20;

{% hint style="info" %}
Please note that a Support Category can hold multiple Support Items, but one Support Item can only ever be associated with one Support Category. \
\
Selecting a Support Category will also populate the Support Purpose of the Support Item automatically based on the selected Support Purpose of the associated Category.&#x20;
{% endhint %}

3. `Registration Group`: This field allows you to associate a Support Item with a specific Registration Group for classification.

{% hint style="info" %}
To learn more about Registration Groups, click [here](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements/the-building-blocks).&#x20;
{% endhint %}

4. `Support Item Number`: The unique identifier number for the support item.
5.  `Support Item Type`: The Support Item Type pick list is a crucial field in configuring your Support Item. It essentially defines the type of Support Item, however this is important for both building your budget, as well as **Maica's** fee automation and regulations on a Service Agreement. \
    \
    There are values within the Support Item Type pick list to support a Home Care Package, these values are described below: <br>

    <table><thead><tr><th width="279">Support Item Type</th><th>Description</th></tr></thead><tbody><tr><td>Basic Subsidies</td><td>A Basic Subsidy for home care packages is a government-funded financial support provided to eligible individuals to help cover the costs of home care services. It is part of the Australian Government’s Home Care Package Program, aimed at assisting older adults to live independently in their own homes for as long as possible. <br><br>The subsidy amount depends on the level of care required, ranging from basic support for daily tasks to higher levels of care for more complex needs.</td></tr><tr><td>Care Management Fees</td><td>Care Management Fees in home care packages refer to the costs associated with planning and coordinating the care services provided to an individual. These fees cover the management of the home care package, including creating care plans, organizing services, monitoring care quality, and ensuring that the individual’s needs are met. <br><br>Care management can be provided at varying levels, depending on the complexity of the Participant's requirements.</td></tr><tr><td>Package Management Fees</td><td>Package Management Fees for home care packages are the costs related to the administration and organisation of the overall home care package. These fees cover tasks such as managing budgets, handling invoicing and compliance, maintaining records, and ensuring that the services provided meet regulatory requirements. <br><br>They are necessary to ensure the smooth operation of the home care package and are separate from care management fees.</td></tr><tr><td>Basic Daily Fees</td><td>Basic Daily Fees for home care packages are optional contributions paid by the individual receiving care to help cover the costs of their home care services. The fee is set by the government and is typically a small percentage of the aged pension. <br><br>It helps supplement the government subsidy and can be charged in addition to the care management and package management fees, depending on the provider.</td></tr><tr><td>Income Tested Fees</td><td>Income Tested Fees for home care packages are additional fees that some individuals may be required to pay based on their income. These fees are determined by the Australian Government and apply to those with higher incomes, contributing toward the cost of their home care services. <br><br>The amount varies depending on the individual’s income level, and there are annual and lifetime caps to limit the total amount a person can be required to pay. These fees are separate from the basic subsidy and other fees associated with the home care package.</td></tr><tr><td>Various Types of Supplements</td><td><p>Supplements for home care packages are additional payments provided by the Australian Government to support individuals with specific care needs. These supplements are designed to address special circumstances and can be added to the basic subsidy. Common types of supplements include:</p><ul><li>Dementia and Cognition Supplement: For individuals with cognitive impairments such as dementia.</li><li>Veterans’ Supplement: For veterans who have a related health condition.</li><li>Oxygen Supplement: For those requiring continuous oxygen due to medical conditions.</li><li>Enteral Feeding Supplement: For individuals needing tube feeding.</li><li>Hardship Supplement: For those facing financial difficulties in paying home care fees.</li></ul><p>These supplements help ensure that individuals with specialised needs receive appropriate care and support.</p></td></tr></tbody></table>

{% hint style="info" %}
As mentioned, selecting the correct Support Item Type is important for **Maica**. They allow the system to determine when you have added the Support Item as a Planned Budget so it can correctly attribute the planned Budget Item effectively.\
\
For example, a Package Management fee is obviously going to act as a debit against the package budget and will raise a package management fee through our invoicing automation, whereas a Basic Subsidy as a plan budget line is going to be added to the budget as a credit.&#x20;
{% endhint %}

6. `Funding Level`: Funding Level defines what level of funding can be assigned, and therefore set the rate against the relevant items.

{% hint style="info" %}
For example, if we select a Care Management Fee, we can select from levels 1-4 and define a price level against each Funding Level by creating different Products. A Care Management Fee for a Level 1 package will attract a certain rate, whereas a higher rate will be applied to a Level 4 package. The same applies for a Basic Subsidy.
{% endhint %}

7. `Quantity Unit of Measure`: The Quantity Unit of Measure field allows you to specify the billing frequency or unit for the Support Item.

{% hint style="warning" %}
Home Care Package Support Items should all be set to a **daily** unit of measurement because fees and credits that are in the package budget through subsidies are always charged at a daily rate according to the rate schedule provided by the Commonwealth.
{% endhint %}

8. `Claim Type`:&#x20;
   * **Claim Types (Available)**: Lists possible claim types applicable to the Support Item.
   * **Claim Types (Chosen)**: Shows selected claim types that apply specifically to this Support Item.

{% hint style="warning" %}
The Claim Type should be set as Home Care Package.\
\
**Maica** has various different claim types that can be applied to particular Support Items, and to make it is important to make sure that the system is selecting the Home Care Package value that we're not pulled into any order of claims process that you might be running. \
\
If you're using in **Maica**, and you're administering NDIS or CHSP for example, you want to selecting Home Care Package will ensure that your Home Care Package Support Items are specifically handled by your Home Care Package claiming processes.
{% endhint %}

9. `Service Day`: Specifies which days this Support Item is available for service.
10. `Service Time`: Sets the available time range for the service related to this Support Item.
11. `Appointment Service`: Captures what [Appointment Service](appointment-services.md) applies to this Support Item, including Skills and Resources.
12. `Travel Activity`: Marks the Support Item as a Travel Activity which is available when manually creating Timesheet Entries and Manage Travel when creating Appointments.
13. `Timesheet Activity`: Marks the Support Item as a Timesheet Activity which is available when manually creating Timesheet Entries.
14. `Display Name`: The name that will be displayed throughout Maica for this Support Item.
15. `Tags`: Keywords or phrases that help in categorising or searching for this Support Item throughout Maica.&#x20;

Once you have populated the relevant fields, click `Save` to finalise your Support Item.&#x20;

### 4. Assign a `Price List`&#x20;

Once you have configured your Support Items, it is important to add them to an associated [Price List](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/getting-started/maica-key-concepts/price-list).&#x20;

To do so, refer to the related list on the Support Item record. Simply click `New`, to add your Support Item as a Price List entry into a configured Price List. At this point, you can set your rate.

{% hint style="info" %}
This is particularly important, because as we add this particular Support Item to a Service Agreement using our [Manage Budget](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/service-agreements/agreement-management/aged-care-agreements/manage-budget) feature, it will pull in the rate that you have set.
{% endhint %}

Once done, your Support Item will be set up and ready to support you managing budgets of a Home Care Package Service Agreement.&#x20;
