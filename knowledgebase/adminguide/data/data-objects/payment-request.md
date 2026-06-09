---
description: >-
  This object in Maica represents the details of a Payment Request claimed from
  the NDIA - for Clients with an Agency Managed Service Agreement.
---

# Payment Request

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Payment Request** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1sAN_oeJQSMsGHQZ2kDNq8yMyMicAbXEni1kSwEYPGYk/edit?usp=sharing" %}
Payment Request Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1sAN_oeJQSMsGHQZ2kDNq8yMyMicAbXEni1kSwEYPGYk/edit?usp=sharing) to view and download the complete Payment Request Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Payment Request Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Status Cannot Be Changed When Payment Request Status is `Paid`

When the Payment Request Status is updated to Paid, the Status on the record cannot be changed.

| Validation Rule Detail  |                                                                      |
| ----------------------- | -------------------------------------------------------------------- |
| Rule Name               | x01\_Paid\_PR\_Cannot\_Be\_Changed                                   |
| Error Message           | You cannot modify a Paid Payment Request. Payment Request Error x01. |
| Error Location          | `Top of Page`                                                        |

{% code title="Error Condition Formula" %}
```apex
AND(
ISPICKVAL(PRIORVALUE(maica_cc__Status__c), "41"),
NOT(ISPICKVAL(maica_cc__Status__c, "41"))
)
```
{% endcode %}

## Automation&#x20;

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Payment Request Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Payment Request Initialise Claim Reference

This trigger is designed to initialise the claim reference for payment requests in Maica.&#x20;

| Detail      |                                         |
| ----------- | --------------------------------------- |
| Load Order  | 1                                       |
| Label       | `PaymentRequestInitClaimReference_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `PaymentRequestInitClaimReference_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the initialization of the claim reference for payment requests.

* **Trigger Conditions**:
  * When a new payment request (`maica__Payment_Request__c`) is created.
  * When an existing payment request is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a payment request record is created or updated, the trigger is initialised. The `PaymentRequestInitClaimReference_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `PaymentRequestInitClaimReference_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The payment request data is validated to ensure it is complete and accurate.
     * **Initialisation**: Based on predefined criteria, the claim reference is initialised to ensure each payment request has a unique and consistent reference.
     * **Update**: The payment request record is updated with the newly initialised claim reference.

**Trigger Outcome**:

Once executed, the trigger ensures that each payment request has its claim reference initialised correctly, according to the logic specified in the handler class. This helps maintain accurate and consistent claim reference data for payment requests.

</details>
