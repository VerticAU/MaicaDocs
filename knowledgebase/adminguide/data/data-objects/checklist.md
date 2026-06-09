---
description: >-
  The Checklist object in Maica is used to manage task lists for users, either
  before, during, or after shifts and appointments including the ability to
  include external links.
---

# Checklist

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Checklist** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1_VWodq3NYoiK5s9NK46QYw1oe8g_jZ5nrAuPfh3s6fs/edit?usp=sharing" %}
Checklist Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1_VWodq3NYoiK5s9NK46QYw1oe8g_jZ5nrAuPfh3s6fs/edit?usp=sharing) to view and download the complete Checklist Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Checklist Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Checklist Start Date Cannot Be After End Date

Ensures that the Checklist Start Date cannot be after the End Date.

| Validation Rule Detail  |                                                         |
| ----------------------- | ------------------------------------------------------- |
| Rule Name               | VAL\_CHECKLIST\_0001                                    |
| Error Message           | VAL\_0001: The Start Date cannot be after the End Date. |
| Error Location          | `Start Date`                                            |

{% code title="Error Condition Formula " %}
```apex
maica_cc__Start_Date__c > maica_cc__End_Date__c
```
{% endcode %}
