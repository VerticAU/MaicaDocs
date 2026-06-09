---
description: >-
  Learn about the Reference Data Template required to Import your Data into
  Maica
---

# Reference Data Template

## What is a Reference Data Template?

Maica provides you with a spreadsheet template in which you may enter your data. This template is called the `Maica Reference Data - Import Templates` and it contains a number of tabs for typical Data Objects in **Maica** that Reference Data may be beneficial for.&#x20;

Each Data Object has a unique set of fields that need to be populated, hence the corresponding tab is specific to any particular Object. Within each tab, each row in the spreadsheet corresponds to a Salesforce record, while the columns correlate directly to Salesforce attributes.&#x20;

{% hint style="danger" %}
It is crucial that the first row within each tab is **not** modified. Modifying or adding columns in the first row will result in errors when attempting to import your data into **Maica**.&#x20;
{% endhint %}

The template's objective is to allow you to **bulk load** the necessary reference data for **Maica** to get you up and running.

You can download two versions of the template below:&#x20;

<table><thead><tr><th width="216">Template Type </th><th>Description</th></tr></thead><tbody><tr><td><a href="https://docs.google.com/spreadsheets/d/1yqbW3i79DNL7u42elwJIQsvkpSsnZzT24EyxIyDueqE/edit?usp=sharing">Blank Template</a></td><td>This is a blank template ready to be populated with your data. </td></tr><tr><td><a href="https://docs.google.com/spreadsheets/d/1ULSIITxtj0iwlR2gU9G6AYYubnuwLexONsThW0XNxN8/edit?usp=sharing">Populated Template</a></td><td>This a template with pre-populated data that you can refer to when populating your own template. </td></tr></tbody></table>

{% hint style="info" %}
To download a Template, click on the Template Name in the table above. Once you have opened it, simply create your own copy and start populating it.
{% endhint %}

## How do I populate my template?&#x20;

As mentioned above, Maica objects contain attributes of varying Data Types. So, to begin populating a Reference Data Template, lets use an example object: `Appointment Services`.

{% hint style="info" %}
When preparing your reference data for loading, there are several formatting requirements that you must follow to guarantee that your data is loaded successfully.
{% endhint %}

In the downloadable template above, each column will come pre-populated with a value for each column letting you know what Data Type is expected. Remember, each column represents an attribute of the specific object. Below shows the pre-populated columns and rows for the `Appointment Services` object:&#x20;

<figure><img src="../../.gitbook/assets/as rows.png" alt=""><figcaption></figcaption></figure>

Here we can see `Line 1` contains the attributes of the Appointment Services object, and `Line 2` contains the required Data Type to input in order to populate that attribute.&#x20;

So, in order to populate the attributes, we first must understand the Data Types. The table below explains each Data Type in more detail:&#x20;

<table><thead><tr><th width="243">Data Type </th><th>Description</th></tr></thead><tbody><tr><td><code>Object API Name</code></td><td>This column represents the Data Object you are loading for and must be populated with a valid API name of a Maica Object. It’s required on <strong>every</strong> row to tell the <a href="../data-import-utility/data-import-flows.md">import flow</a> which object to retrieve and write the values to. </td></tr><tr><td><code>Related Record Name</code></td><td>Any column that references the Name value of a related Object represents a lookup field linking the record to another related record. In the Reference Data loading process we use the Name value from the related object to search for, find and relate the loaded record. In the above example, this is shown in the <code>Related Client Note Template Name</code>. Note, this may be called <code>Participant Note</code> in your Maica instance. <br><br>If there is more than one record with the same Name value, the import for this row will fail. (The flow can be easily extended to reference IDs of records for loading purposes if required.)</td></tr><tr><td><code>Text Value</code></td><td>This field accepts free text values, however it is important to check if there are any length restrictions. To do so: Go to Setup > Object Manager > {Object Name} > Fields &#x26; Relationships and look at the field you are populating. This process is further explained <a href="reference-data-template.md#id-1.-head-to-the-setup">below</a>.</td></tr><tr><td><code>Rich Text Value</code></td><td>As per the Text Value but allows loading in of HTML formatted text.</td></tr><tr><td><code>Number Value</code></td><td>This field accepts numbers values, however it is important to check if there are any length restrictions or if decimals are allowed. To do so: Go to Setup > Object Manager > {Object Name} > Fields &#x26; Relationships and look at the field you are populating. This process is further explained <a href="reference-data-template.md#id-1.-head-to-the-setup">below</a>.</td></tr><tr><td><code>Picklist Value</code></td><td>This field only accepts valid available and active values from the Object Picklist. check the field under Setup > Object Manager > {Object Name} > Fields &#x26; Relationships > {Field Name} to check for valid, active values. This process is further explained <a href="reference-data-template.md#id-1.-head-to-the-setup">below</a>. </td></tr><tr><td><code>Multi-Select Picklist Values</code></td><td>As above, but allows for many values to be loaded. Each value must be valid and be separated by a semicolon <code>;</code>.</td></tr><tr><td><code>Date Value</code></td><td>This field only accepts valid Date format values. Your Salesforce Org setting will determine the acceptable default date format, but typically this will be <code>dd/mm/yyyy</code> or <code>mm/dd/yyyy</code>.</td></tr><tr><td><code>Date/Time Value</code></td><td>This field only accepts valid Date/Time format values. Your Salesforce Org setting will determine the acceptable default date/time format, but typically this will be <code>dd/mm/yyyy</code>, <code>hh:mm:ss</code>.</td></tr><tr><td><code>Boolean Value</code></td><td>Only valid <code>TRUE</code> values will be accepted (field is set to FALSE by default). (TRUE, true, True, 1, yes, Yes, YES).</td></tr></tbody></table>

Now, these Data Types must be practically applied to the attributes shown in `Line 1`. In order to understand the formatting or values of any field, you can follow the below steps:&#x20;

#### 1. Head to the `Setup`&#x20;

For our example we are using the `Appointment Service` Object. First, you must go to the `Setup` by clicking the `Cog` (as shown below) followed by clicking `Setup`.

<figure><img src="../../.gitbook/assets/setup.png" alt=""><figcaption></figcaption></figure>

#### 2. Find the Object in the Object Manager&#x20;

Once in the Setup, head to the Object Manager by clicking the following.&#x20;

<figure><img src="../../.gitbook/assets/object manager.png" alt=""><figcaption></figcaption></figure>

Then, use the Quick Find to search for the required Data Object. In this case: `Appointment Service`.

#### 3. Find Attribute in `Fields & Relationships`

After you have selected the required object, click the `Fields & Relationships` tab and find the attribute you are wanting to understand the formatting or values for. For example, let's say within `Appointment Services` tab of our template you want to populate the `Available Sections` column. You can see from the template that the Data Type for this column is `Multi-Select Picklist Values`, but you may be wondering what these values are.  So, in the `Fields & Relationships` of `Appointment Services`, find `Available Sections` and select it, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/available sections.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Within **Maica** you can also find or confirm the `Data Type` for any `Field`, as shown above.&#x20;
{% endhint %}

#### 4. Find associated `Values` to populate your Template

After you have found the required `Field`, in this case `Available Sections`, scroll down to see the `Values` and their associated `API Name`, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/api name.png" alt=""><figcaption></figcaption></figure>

Now, you can see the required information to populate your column within the Template.&#x20;

{% hint style="info" %}
For any Picklist, always use the Values `API Name`when populating your template.&#x20;
{% endhint %}

{% hint style="info" %}
Ensure you always refer back to the required formatting of the Data Type when populating the template, as shown [above](reference-data-template.md#how-do-i-populate-my-template).&#x20;
{% endhint %}

Please see below for an exmaple of how this column would be populated within the Template with the correct values and formatting.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-09-03 at 12.18.49 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
If you require custom `Picklist` values, you can add them in the `Values` section of the `Data Object` by simply clicking `New`.&#x20;
{% endhint %}
