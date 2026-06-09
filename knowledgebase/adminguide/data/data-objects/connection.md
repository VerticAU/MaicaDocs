---
description: >-
  In Maica, the Connection object is used to track and manage relationships and
  connections between individuals (Contacts), including the type or nature of
  the relationship.
---

# Connection

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Connection** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1LYS0-SuVxNwB5fE6aRxDj_d6g7cUbEtlJk3yL-Was58/edit?usp=sharing" %}
Connection Schema
{% endembed %}

{% hint style="success" %}
Click here to view and download the complete Connection Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Connection Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Email Address Required for Connection Related Contact When Invoice or Statement Recipient equals TRUE

This rule is to ensure that the Connection Related Contact has an Email address when Invoice Recipient and/or Statement Recipient = TRUE

| Validation Rule Detail  |                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Rule Name               | VAL\_CONNECTION\_0001                                                                                              |
| Error Message           | VAL\_0001: The Related Contact must have an Email address when Invoice Recipient and/or Statement Recipient = TRUE |
| Error Location          | `Top of Page`                                                                                                      |

{% code title="Error Condition Formula " %}
```apex
AND(
OR(
maica_cc__Statement_Recipient__c,
maica_cc__Invoice_Recipient__c
),
ISBLANK(maica_cc__Related_Contact__r.Email)
)
```
{% endcode %}
