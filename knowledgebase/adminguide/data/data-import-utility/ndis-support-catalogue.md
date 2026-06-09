---
description: Learn how to Import NDIS Support Catalogues into Maica
---

# NDIS Support Catalogue

## How do I import an NDIS Support Catalogue?

{% hint style="info" %}
This is an extension of the Data Import Utility article. Please read the previous article before continuing on to this one. You can access it immediately by clicking [here](./).
{% endhint %}

### 1. Select Flow Setting and Upload your File&#x20;

The first step of importing an NDIS Support Catalogue is identical to any other Data Import and is explained [here](./). This article will continue based on the assumption that these steps have been completed.&#x20;

### 2. Configure your Import&#x20;

Once you have clicked `Import`, you will have the ability to configure your import to your preference. This is where you may specify which Price Lists you want **Maica** to make for you, as well as offer a useful description for future reference, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-30 at 4.37.47 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
It is our recommendation to select a description comparable to the period covered by the Support Catalogue, or the filename of the actual CSV file received from the NDIS website for clarity.&#x20;
{% endhint %}

### 3. Confirm and Process&#x20;

Once you have configured your import, simply click `Confirm` to start the Import Process. The data from the `NDIS Support Catalogue File` will be interpreted by the `NDIS Import Support Items Catalogue Flow` in **Maica** and processed.

As part of the import, you should understand how your data will be altered. Once done, your `Support Item` and `Price List` data will be changed as follows:

* Any **new** Support Item in the NDIS Support Catalogue will be created as a **new** `Support Item` in **Maica**
* Any **existing** Support Item in the NDIS Support Catalogue that is **updated**, i.e the `Name` is changed, will **update** the existing (corresponding) `Support Item` record in **Maica**.
  * The records are matched based on the `Support Item Number` as this is in the file and on the `Support Item` record in **Maica**.
* As part of the import process, Maica will create new `Price List` records for each of the Areas selected in [Step 2](ndis-support-catalogue.md#id-2.-configure-your-import).
  * The created `Price List` record(s) will have the following name format: `NDIS Supports {STATE} ({CREATED DATE})`
  * Example: **NDIS Supports VIC 25/10/2022**
* Each of the `Support Item` records created or updated by the import will be added to the new `Price List(s)` so it can be used whenever this `Price List` is selected in Maica

{% hint style="info" %}
For any import errors, the `Support Item` record will need to be created or updated manually and added to the necessary `Price List(s)`.
{% endhint %}
