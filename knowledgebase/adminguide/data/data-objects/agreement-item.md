---
description: >-
  The Agreement object in Maica represents the specific Products (Support Items)
  to be delivered as part of the Service Agreement
---

# Agreement Item

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Agreement Item** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1FMoXctZL-0y7VrxRxbIWgSTVN5Ul6srL3G1xcqVVIe8/edit?usp=sharing" %}
Agreement Item Schema&#x20;
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1FMoXctZL-0y7VrxRxbIWgSTVN5Ul6srL3G1xcqVVIe8/edit?usp=sharing) to view and download the complete Agreement Item Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Agreement Item Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Start Date Cannot Be After End Date

Ensures that the start date cannot be after the end date of any Agreement Item.&#x20;

| Validation Rule Detail  |                                                 |
| ----------------------- | ----------------------------------------------- |
| Rule Name               | VAL\_AGREEMENT\_ITEM\_0001                      |
| Error Message           | VAL\_0001: Start Date cannot be after End Date. |
| Error Location          | `Top of Page`                                   |

{% code title="Error Condition Formula " %}
```apex
maica_cc__Start_Date__c  >  maica_cc__End_Date__c
```
{% endcode %}

## Automation&#x20;

## Trigger Handlers

The table below outlines the **Trigger Handlers** applied to the **Agreement Item Object** in **Maica** and their `Load Order`.

| Trigger Handler                                                                             | Load Order |
| ------------------------------------------------------------------------------------------- | ---------- |
| [AgreementItemSupportItem\_MDTM](agreement-item.md#agreement-item-support-item)             | 1          |
| [AgreementItemEstExpenditure\_MDTM](agreement-item.md#agreement-item-estimated-expenditure) | 2          |
| [AgreementItemRollupExpenditure\_MDTM](agreement-item.md#agreement-item-rollup-expenditure) | 2          |
| [AgreementItemTotalAllocated\_MDTM](agreement-item.md#agreement-item-total-allocated)       | 3          |

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Agreement Item Support Item

This trigger is designed to manage the support items of agreement items in Maica.

| Detail      |                                 |
| ----------- | ------------------------------- |
| Load Order  | 1                               |
| Label       | `AgreementItemSupportItem_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AgreementItemSupportItem_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the support items for agreement items.

* **Trigger Conditions**:
  * When a new agreement item (`maica__Agreement_Item__c`) is created.
  * When an existing agreement item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an agreement item record is created or updated, the trigger is initialised. The `AgreementItemSupportItem_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AgreementItemSupportItem_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The support item data is validated to ensure it is complete and accurate.
     * **Association**: The support items are associated with the agreement items based on predefined criteria such as item type and service requirements.
     * **Update**: The agreement item record is updated with the associated support item data.

**Trigger Outcome**:

Once executed, the trigger ensures that each agreement item has its support items associated correctly, based on the logic defined in the handler class. This helps maintain accurate and complete data for agreement items and their support items.

</details>

### Agreement Item Estimated Expenditure&#x20;

This trigger is designed to manage the estimated expenditure of agreement items in Maica.

| Detail      |                                    |
| ----------- | ---------------------------------- |
| Load Order  | 2                                  |
| Label       | `AgreementItemEstExpenditure_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AgreementItemEstExpenditure_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the estimated expenditure process for agreement items.

* **Trigger Conditions**:
  * When a new agreement item (`maica__Agreement_Item__c`) is created.
  * When an existing agreement item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an agreement item record is created or updated, the trigger is initialised. The `AgreementItemEstExpenditure_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AgreementItemEstExpenditure_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The agreement item data is validated to ensure it is complete and accurate.
     * **Calculation**: The estimated expenditure is calculated based on predefined criteria such as item type and service duration.
     * **Update**: The agreement item record is updated with the newly calculated estimated expenditure data.

**Trigger Outcome**:

Once executed, the trigger ensures that each agreement item has its estimated expenditure calculated correctly, based on the logic defined in the handler class. This helps maintain accurate financial data for agreement items.

</details>

### Agreement Item Rollup Expenditure&#x20;

This trigger is designed to manage the rollup of expenditures for agreement items in Maica.

| Detail      |                                       |
| ----------- | ------------------------------------- |
| Load Order  | 2                                     |
| Label       | `AgreementItemRollupExpenditure_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AgreementItemRollupExpenditure_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the rollup expenditure process for agreement items.

* **Trigger Conditions**:
  * When a new agreement item (`maica__Agreement_Item__c`) is created.
  * When an existing agreement item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an agreement item record is created or updated, the trigger is initialised. The `AgreementItemRollupExpenditure_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AgreementItemRollupExpenditure_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The expenditure data is validated to ensure it is complete and accurate.
     * **Calculation**: The total expenditure is calculated based on predefined criteria such as item type and financial rules.
     * **Update**: The agreement item record is updated with the newly calculated rolled-up expenditure data.

**Trigger Outcome**:

Once executed, the trigger ensures that each agreement item has its expenditures rolled up correctly, based on the logic defined in the handler class. This helps maintain accurate financial data for agreement items.

</details>

### Agreement Item Total Allocated&#x20;

This trigger is designed to manage the total allocation of agreement items in Maica.

| Detail      |                                    |
| ----------- | ---------------------------------- |
| Load Order  | 3                                  |
| Label       | `AgreementItemTotalAllocated_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AgreementItemTotalAllocated_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the total allocation process for agreement items.

* **Trigger Conditions**:
  * When a new agreement item (`maica__Agreement_Item__c`) is created.
  * When an existing agreement item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an agreement item record is created or updated, the trigger is initialised. The `AgreementItemTotalAllocated_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `3.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AgreementItemTotalAllocated_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The allocation data is validated to ensure it is complete and accurate.
     * **Calculation**: The total allocated amount is calculated based on predefined criteria such as item type and allocation rules.
     * **Update**: The agreement item record is updated with the newly calculated total allocated data.

**Trigger Outcome**:

Once executed, the trigger ensures that each agreement item has its total allocated amount calculated correctly, based on the logic defined in the handler class. This helps maintain accurate financial data for agreement items.

</details>
