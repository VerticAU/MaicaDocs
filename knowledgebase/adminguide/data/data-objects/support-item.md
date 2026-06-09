---
description: >-
  This object in Maica represents the Services to be delivered and are
  associated Support Categories.
---

# Support Item

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Support Item** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1V0ZCpbFgHMHe-o10keG8njmdt0eL1m4ib_xC1NEPaNE/edit?usp=sharing" %}
Support Item Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1V0ZCpbFgHMHe-o10keG8njmdt0eL1m4ib_xC1NEPaNE/edit?usp=sharing) to view and download the complete Support Category Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Shift Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Key NDIS Attributes Required When Funding Source is NDIS

Ensures key NDIS attributes cannot be null if the Funding Source equals NDIS

| Validation Rule Detail  |                                                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rule Name               | VAL\_SUPPORT\_ITEM\_0001                                                                                                                                                |
| Error Message           | VAL\_0001: When the Funding Source is NDIS, the following fields are required: Support Category, PACE Support Category, Support Item Number, Service Day, Service Time. |
| Error Location          | `Top of Page`                                                                                                                                                           |

{% code title="Error Condition Formula" %}
```apex
AND(
    ISPICKVAL(maica_cc__Funding_Source__c, "NDIS"),
OR(
    ISBLANK(maica_cc__Support_Category__c),
    ISBLANK(maica_cc__PACE_Support_Category__c),
    ISBLANK(maica_cc__Support_Item_Number__c),
    ISPICKVAL(maica_cc__Service_Day__c, ""),
    ISPICKVAL(maica_cc__Service_Time__c, "")
)
)
```
{% endcode %}

### Category Support Item or Bucket Cannot Be Related to Appointment Service Record

Ensures that a Category Support Item, or Bucket, cannot be related to an Appointment Service record.

| Validation Rule Detail  |                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| Rule Name               | VAL\_SUPPORT\_ITEM\_0002                                                                           |
| Error Message           | VAL\_0002: A Category Support Item, or Bucket, cannot be related to an Appointment Service record. |
| Error Location          | `Appointment Service`                                                                              |

{% code title="Error Condition Formula" %}
```apex
AND(
    maica_cc__Bucket__c = TRUE,
    NOT(ISBLANK(maica_cc__Appointment_Service__c))
)
```
{% endcode %}

## Automation&#x20;

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Support Item Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Support Item Service Validation&#x20;

This trigger is designed to manage the validation of support item services in Maica.

| Detail      |                                     |
| ----------- | ----------------------------------- |
| Load Order  | 1                                   |
| Label       | `SupportItemServiceValidation_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `SupportItemServiceValidation_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the validation process for support item services.

* **Trigger Conditions**:
  * When a new support item (`maica__Support_Item__c`) is created.
  * When an existing support item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a support item record is created or updated, the trigger is initialised. The `SupportItemServiceValidation_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `SupportItemServiceValidation_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The support item data is validated to ensure it is complete and accurate.
     * **Compliance Check**: The support item is checked for compliance with predefined service criteria, ensuring that it meets all necessary standards and requirements.
     * **Update**: The support item record is updated with the validation results, indicating whether it has passed or failed the validation checks.

**Trigger Outcome**:

Once executed, the trigger ensures that each support item service is validated correctly, according to the logic specified in the handler class. This helps maintain accurate and compliant support item data.

</details>

### Support Item Unit of Measure

This trigger is designed to manage the unit of measure for support items in Maica.

| Detail      |                                 |
| ----------- | ------------------------------- |
| Load Order  | 1                               |
| Label       | `SupportItemUnitOfMeasure_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `SupportItemUnitOfMeasure_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the unit of measure setting process for support items.

* **Trigger Conditions**:
  * When a new support item (`maica__Support_Item__c`) is created.
  * When an existing support item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a support item record is created or updated, the trigger is initialised. The `SupportItemUnitOfMeasure_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `SupportItemUnitOfMeasure_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The support item data is validated to ensure it is complete and accurate.
     * **Unit of Measure Setting**: Based on predefined criteria, the unit of measure is set or updated for each support item, ensuring that it meets all necessary standards and requirements.
     * **Update**: The support item record is updated with the unit of measure details, indicating whether it has passed or failed the validation checks.

**Trigger Outcome**:

Once executed, the trigger ensures that each support item has its unit of measure set or updated correctly, according to the logic specified in the handler class. This helps maintain accurate and consistent unit of measure data for support items.

</details>
