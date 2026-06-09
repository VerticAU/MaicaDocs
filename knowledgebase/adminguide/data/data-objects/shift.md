---
description: >-
  The Shift object in Maica represents an available period of work in which Jobs
  can be scheduled, rostered and delivered.
---

# Shift

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Shift** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1nF3bXTDoI4CUZ53Phlt_QYYIs6eUS4S9lKXko4Lr_8Y/edit?usp=sharing" %}
Shift Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1nF3bXTDoI4CUZ53Phlt_QYYIs6eUS4S9lKXko4Lr_8Y/edit?usp=sharing) to view and download the complete Shift Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Shift Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Shift Start Date Must Be Before Shift End Date

Ensures that the Shift Start Date is before the Shift End Date

| Validation Rule Detail  |                                                          |
| ----------------------- | -------------------------------------------------------- |
| Rule Name               | VAL\_SHIFT\_0001                                         |
| Error Message           | VAL\_0001: The Shift Start must be before the Shift End. |
| Error Location          | `Shift Start`                                            |

{% code title="Error Condition Formula" %}
```apex
AND(
    NOT(ISBLANK(maica_cc__Shift_Start__c)),
    NOT(ISBLANK(maica_cc__Shift_End__c)),
    maica_cc__Shift_Start__c > maica_cc__Shift_End__c
)
```
{% endcode %}
