---
description: >-
  The Price List object in Maica manages pricing information for your products
  or services.
---

# Price List

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Price List** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1ZRh7uGeAMGDriXNE0vGZqwwR-Wfk_SOjlzr-AIqQVBs/edit?usp=sharing" %}
Price List Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1ZRh7uGeAMGDriXNE0vGZqwwR-Wfk_SOjlzr-AIqQVBs/edit?usp=sharing) to view and download the complete Price List Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Price List Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Price List End Date Cannot Be Before Start Date&#x20;

This rule ensures that the Price List End Date is not before the Start Date.

| Validation Rule Detail  |                                                          |
| ----------------------- | -------------------------------------------------------- |
| Rule Name               | VAL\_PRICE\_LIST\_0001                                   |
| Error Message           | VAL\_0001: The End Date cannot be before the Start Date. |
| Error Location          | `End Date`                                               |

{% code title="Error Condition Formula " %}
```apex
AND(
    NOT(ISBLANK(maica_cc__End_Date__c)),
    maica_cc__End_Date__c < maica_cc__Start_Date__c
)
```
{% endcode %}

### Price List Start Date Cannot Be After End Date

This rule ensures that the Price List Start Date is not after the End Date.&#x20;

| Validation Rule Detail  |                                                         |
| ----------------------- | ------------------------------------------------------- |
| Rule Name               | VAL\_PRICE\_LIST\_0002                                  |
| Error Message           | VAL\_0002: The Start Date cannot be after the End Date. |
| Error Location          | `Start Date`                                            |

{% code title="Error Condition Formula " %}
```apex
AND(
    NOT(ISBLANK(maica_cc__Start_Date__c)),
    maica_cc__Start_Date__c > maica_cc__End_Date__c
)
```
{% endcode %}
