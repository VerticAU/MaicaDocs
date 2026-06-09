---
description: >-
  This object in Maica represents the specific Budget Items or Funded Supports
  included in a Participant's NDIS Funding or Home Care Package.
---

# Funding Item

{% hint style="info" %}
Depending on your Maica package, this Data Object may be called `Plan Budget` in your organisation
{% endhint %}

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Funding Item** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1nvlJzb_ZHafA0Kv8gDgtDS6fyKijyx-gpO5gAFnTjbg/edit?usp=sharing" %}
Funding Item Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1nvlJzb_ZHafA0Kv8gDgtDS6fyKijyx-gpO5gAFnTjbg/edit?usp=sharing) to view and download the complete Funding Item Schema.
{% endhint %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Funding Item Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Update `Is Active` Value

This flow is designed to update the `Is Active` field value for a Funding Item record based on its Effective Date and End Date.

| Flow Detail  |                                                    |
| ------------ | -------------------------------------------------- |
| Flow Label   | Maica - Funding Item - Update Is Active Value      |
| API Name     | `maica__Maica_Funding_Item_Update_Is_Active_Value` |
| Type         | `Autolaunched Flow`                                |

#### Flow Summary

* Updates the `Is Active` field for a Funding Item record based on its Effective Date and End Date.
* Ensures the `Is Active` field reflects the current status of the Funding Item according to the specified dates.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * Triggered when the Effective Date, End Date, or Is Active field is changed.
2. **Calculate Is Active Status (Formula)**:
   * Determines if the Funding Item is currently active based on the Effective Date, End Date, and current date.
3. **Update Funding Item Record (Record Update)**:
   * Updates the Is Active field with the calculated status.

</details>

### Funding Item Before Insert&#x20;

This flow is designed to set attribute values from the related Product before inserting a Funding Item record.

#### Flow Summary

* This flow sets the attribute values for a Funding Item record from the related Product before the record is inserted or updated.
* It ensures that the Funding Item's Unit of Measurement and Support Purpose Picklist fields are accurately populated.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * Triggered before inserting or updating a Funding Item record.
2. **Calculate Unit of Measurement (Formula)**:
   * Converts the Unit of Measurement from the related Product record to text.
3. **Assign Plan Budget Values (Assignment)**:
   * Sets the Product Unit of Measurement and Support Purpose Picklist fields on the Funding Item record based on values from the related Product.

</details>
