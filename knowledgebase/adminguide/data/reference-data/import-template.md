---
description: Learn how to Import your Reference Data Template into Maica
---

# Import Template

How do I import my Template?&#x20;

Once you have completed your [Reference Data Template](reference-data-template.md), you can import it into Maica using Maica's [Data Import Utility](../data-import-utility/) Tool.&#x20;

First, you must export your Template as a CSV file.&#x20;

{% hint style="info" %}
Your Reference Data Template will be comprised of many tabs (one for each Data Object supported), you can only import one tab at a time into Maica and it must be in a CSV format.&#x20;
{% endhint %}

Once you have exported your Template out of Google Sheets or Excel (whichever you prefer to use), you will be ready to import it into Maica.&#x20;

To complete the import, use the [Data Import Utility ](../data-import-utility/)Tool that is described [here](../data-import-utility/).&#x20;

{% hint style="info" %}
When importing Reference Data into Maica you must select [`Maica - Reference Data Import Handler`](../data-import-utility/data-import-flows.md) as the `Flow Setting`. If you are unsure what a `Flow Setting` is, please refer to our article on the [Data Import Utility](../data-import-utility/). To learn more about the logic behind the Flow itself, click [here](../data-import-utility/data-import-flows.md).
{% endhint %}

Once you have chosen the correct `Flow Setting` and uploaded your file, but before you finalise your import, we recommend ticking the `Check Only` box. As explained in the [Data Import Utility](../data-import-utility/) article, the `Check Only` checkbox replicates the data uploading process. This means you may check for mistakes before transferring data to Maica. If there are any errors, you will get an [Error Report](import-template.md#error-handling).&#x20;

Once you have checked and finalised your file, uncheck this box and press import to start the upload process.&#x20;

{% hint style="info" %}
Allowing `Parallel` uploads will speed up the process, but we do not suggest it because it may cause Record Lock difficulties.
{% endhint %}

After you have imported your data, you will see a successful display message indicating that the import has been completed, as shown below.

<figure><img src="../../.gitbook/assets/Screenshot 2024-09-03 at 1.34.08 pm.png" alt=""><figcaption></figcaption></figure>

## Error Handling

After each import execution, **Maica** will display the number of successful rows as well as the number of failed rows. If there are any failures, an Error Report will be available for download.

The error report will include a complete list of failed rows as well as an explanation for each failure.

You can then repair any data errors and reload the failed rows to finish your data load.

Please refer to the table [below](import-template.md#common-errors) for an outline of some common errors that may arise when importing your Reference Data Template

## Import Sequence&#x20;

Due to relationships between Objects in **Maica**, some Data Objects being imported may have a `Related Record Name` field. This essentially means that certain Objects will have columns in their Reference Data Template that call for the Name Value of a related Object. This Value represents a lookup field linking the record to another related record. In the Reference Data importing process we use the Name Value from the related Object to search for, find and relate the imported record.

As a result, certain Objects need to be imported prior to others that may be searching for a related record.&#x20;

For example: A `Price Book Entry` will rely on a `Product`, hence `Products` must be imported into **Maica** prior to `Price Book Entries`. This is because you need `Products` to create a `Price Book Entry`, which is shown in the Price Book Entry Template through the `Related Record Name` column of `Product Name`, as shown below. Hence, when importing `Price Book Entries` into **Maica**, the system will search for the related `Products` that must have been previously imported.&#x20;

<figure><img src="../../.gitbook/assets/related product.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Please note that `Price Book Entries` may be called `Price List Entries` in your **Maica** instance, and `Products` may be called `Support Items`. The logic is unchanged.&#x20;
{% endhint %}

The logic below outlines the Data Object relationships and the required import order of each of them.&#x20;

```
// Primary Object Relationships

Products -> PriceBook -> PriceBookEntry -> AppointmentService

// Additional Object Relationships

Connections -> Contacts
Unavailability, Availability -> Resource
ResourceSkills -> Resource
ParticipantGoals -> Contacts
ShiftResources -> Shifts
ChecklistItems -> Checklist
```

{% hint style="info" %}
`Contacts` (Participants) are not imported using the Reference Data Template, but rather configured directly in **Maica**. However, it is important that you configure your `Contacts` prior to Importing Reference Data.&#x20;
{% endhint %}

The above logic shows that each object (or group of objects) on the right depends on the object (or group of objects) on the left. Arrows (`->`) indicate the dependency, meaning the object on the left must be imported before the object on the right can be correctly imported or used.

## Common Errors&#x20;

The table below describes some common errors and solutions that can occur when attempting to import a Reference Data Template into **Maica**.

{% embed url="https://docs.google.com/spreadsheets/d/1jUnhcsIrjZnFMZDH-ruTHxJIVOAXngi-jChQ3-57g18/edit?usp=sharing" %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1jUnhcsIrjZnFMZDH-ruTHxJIVOAXngi-jChQ3-57g18/edit?usp=sharing) to view and download the complete Reference Data - Common Errors sheet
{% endhint %}
