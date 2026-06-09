---
description: >-
  Represents the NIDS Support Category a Support Items or Service Booking may be
  associated with.
---

# Support Category

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Support Category** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1VLMjyqUc_ehT5pFzqXuooMWb-0a5Btrb9Hj7fLHFkK0/edit?usp=sharing" %}
Support Category Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1VLMjyqUc_ehT5pFzqXuooMWb-0a5Btrb9Hj7fLHFkK0/edit?usp=sharing) to view and download the complete Support Category Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Shift Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Category Number and Support Purpose Required When Category Source is NDIS

Ensures that a Category Number and Support Purpose is provided when the Category Source is NDIS.

| Validation Rule Detail  |                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Rule Name               | VAL\_SUPPORT\_CATEGORY\_0001                                                                                     |
| Error Message           | VAL\_0001: Please ensure that Category Number and Support Purpose are provided when the Category Source is NDIS. |
| Error Location          | `Top of Page`                                                                                                    |

{% code title="Error Condition Formula" %}
```apex
AND(
  ISPICKVAL(maica_cc__Funding_Source__c, "NDIS"),
  OR(
    ISPICKVAL(maica_cc__Support_Purpose__c, ""),
    ISBLANK(maica_cc__Category_Number__c)
  )
)
```
{% endcode %}
