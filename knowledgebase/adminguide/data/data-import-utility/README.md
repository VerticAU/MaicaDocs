---
description: Learn how to Import Data into Maica
---

# Data Import Utility

## What is the Data Import Utility?&#x20;

The Data Import Utility in Maica is a tool that allows you to quickly and easily import data into Maica. There are a number of important Data Records that must be up to date and are critical to keeping Maica functioning effectively, including Support Catalogues and Price Lists, and hence importing Data efficiently is of upmost importance. The Data Import Utility allows you to stay on top of these updates without having to ever manually compare new Catalogues or Lists with your current Data.&#x20;

## Where do I find the Data Import Utility?&#x20;

In order to access the Data Import tool, first click the `App Launcher` located in the top left corner of your interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/app launcher.png" alt=""><figcaption></figcaption></figure>

Once open, simply search `Data Import` and select the `Data Import` tool under `Items`, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/data import.png" alt="" width="375"><figcaption></figcaption></figure>

{% hint style="info" %}
In order to see the Data Import tab - you need to have the `Maica - Manage Maica Settings` [Permission Set](../permission-sets.md) assigned to your user.
{% endhint %}

## How do I use the Data Import Utility?&#x20;

### 1. Select `Flow Setting`

After you have opened the Data Import Tool, you will be presented with the following screen:&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-30 at 4.08.08 pm.png" alt=""><figcaption></figcaption></figure>

&#x20;As the utility supports a few different processes, the first step is to select the `Flow Setting` or _Import Process._ **Maica** supports the following options:&#x20;

* Reference Data Import&#x20;
* NDIS Bulk Payment Request Results File&#x20;
* NDIS Import Support Items Catalogue&#x20;
* NDIS Bulk Payment Remittance File&#x20;

This `Flow Setting` essentially tells **Maica** which type of Data you are wanting to Import so the Automation can read the files correctly. &#x20;

### 2. Import File&#x20;

Once you have selected the required Flow Setting, the page will dynamically update and present you with a `Upload Files` button. Simply click this button and select the desired file.&#x20;

{% hint style="info" %}
Files used by the Data Import Utility must have a **CSV file** format.
{% endhint %}

### 3. Confirm Import

After uploading your File, you will see the following two options displayed:

* `Check Only`: Check this option if you want to **validate** the file and the import prior to processing it. By selecting `Check Only`, **no records** will be created or updated in Maica.
* `Allow Parallel`: Check this option if you want to create multiple records simultaneously to process the file quicker. If you require your records to **match** the order of the file, ensure this checkbox is **not** selected.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-30 at 4.15.32 pm.png" alt=""><figcaption></figcaption></figure>

Once done, click `Import` to confirm.&#x20;

{% hint style="info" %}
If you are Importing NDIS Import Support Items Catalogue, there are a few additional steps. Click [here](ndis-support-catalogue.md) to learn more.&#x20;
{% endhint %}
