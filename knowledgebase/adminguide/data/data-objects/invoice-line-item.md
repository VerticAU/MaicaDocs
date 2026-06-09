---
description: >-
  The Invoice Line Item object in Maica represents the specific Item level
  detail associated with an Invoice.
---

# Invoice Line Item

## Fields & Relationships

The table below provides a comprehensive overview of all fields and relationships for the **Invoice Line Item** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1YOiRfZ8mFEIfCMipRt371TYMbsTSfcZP4sipdBOzHbg/edit?usp=sharing" %}
Invoice Line Item
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1YOiRfZ8mFEIfCMipRt371TYMbsTSfcZP4sipdBOzHbg/edit?usp=sharing) to view and download the complete Invoice Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Invoice Line Item Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Support Item is Mandatory&#x20;

This rule makes sure the Support Item is mandatory.

| Validation Rule Detail  |                                           |
| ----------------------- | ----------------------------------------- |
| Rule Name               | VAL\_INVOICE\_LINE\_ITEM\_0001            |
| Error Message           | VAL\_0001: The Support Item is mandatory. |
| Error Location          | `Support Item`                            |

{% code title="Error Condition Formula" %}
```apex
ISBLANK(maica_cc__Support_Item__c)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Invoice Line Item Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Status Management&#x20;

This flow evaluates and updates the status of an invoice line item.

| Flow Detail  |                                              |
| ------------ | -------------------------------------------- |
| Flow Label   | Maica - Invoice Line Item Status Management  |
| API Name     | `maica__Invoice_Line_Item_Status_Management` |
| Type         | `Autolaunched Flow`                          |

#### Flow Summary

This flow ensures that the invoice line item status is accurately updated based on the calculated values and specified conditions.

* Starts on invoice line item creation or update.
* Evaluates the status based on various conditions and calculations.
* Assigns the appropriate status (Entered, Claimed, Fully Paid, Partially Paid, Not Paid).

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow begins when an invoice line item is created or updated.
   * It is triggered before the record is saved.
2. **Set Line Total and GST (Assignment)**:
   * Calculates and assigns the line total, GST amount, and amount for the invoice line item.
3. **Evaluate Status (Decision)**:
   * The flow checks the status of the invoice line item based on various conditions:
     * **Claim Type = Home Care Package**: Proceeds to evaluate further conditions.
     * **Entered**: If the line total is greater than 0, the claim count is 0, the claim balance equals the line total, and the paid amount is 0, it sets the status to "Entered".
     * **Claimed**: If the line total is greater than 0, the claim count is greater than 0, the claim balance equals the line total, and the paid amount is 0, it sets the status to "Claimed".
     * **Fully Paid**: If the line total is greater than 0, the claim count is greater than 0, the claim balance is less than or equal to 0, and the paid amount is greater than or equal to the line total, it sets the status to "Fully Paid".
     * **Partially Paid**: If the line total is greater than 0, the claim count is greater than 0, the claim balance is greater than 0 but less than the line total, and the paid amount is less than the line total, it sets the status to "Partially Paid".
     * **Not Paid**: If the line total is greater than 0, the claim count is greater than 0, the claim balance is greater than 0, and the paid amount is 0, it sets the status to "Not Paid".
4. **Set Entered Status (Assignment)**:
   * Sets the invoice line item status to "Entered".
5. **Set Claimed Status (Assignment)**:
   * Sets the invoice line item status to "Claimed".
6. **Set Fully Paid Status (Assignment)**:
   * Sets the invoice line item status to "Fully Paid".
7. **Set Partially Paid Status (Assignment)**:
   * Sets the invoice line item status to "Partially Paid".
8. **Set Not Paid Status (Assignment)**:
   * Sets the invoice line item status to "Not Paid".

</details>

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Invoice Line Item Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Invoice Line Rollup Expenditure&#x20;

This trigger is designed to manage the rollup of expenditures for invoice line items in Maica.

| Detail      |                                     |
| ----------- | ----------------------------------- |
| Load Order  | 1                                   |
| Label       | `InvoiceLineRollupExpenditure_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceLineRollupExpenditure_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the rollup expenditure process for invoice line items.

* **Trigger Conditions**:
  * When a new invoice line item (`maica__Invoice_Line_Item__c`) is created.
  * When an existing invoice line item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an invoice line item record is created or updated, the trigger is initialised. The `InvoiceLineRollupExpenditure_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceLineRollupExpenditure_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The expenditure data for each line item is validated to ensure it is complete and accurate.
     * **Calculation**: The total expenditure is calculated based on the line items of the invoice, taking into account the item types and financial rules.
     * **Update**: The invoice record is updated with the newly calculated rolled-up expenditure data.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice line item has its expenditures rolled up correctly, according to the logic specified in the handler class. This helps maintain accurate financial data for invoices.

</details>

### Invoice Line Booking Item

This trigger is designed to manage the booking items for invoice line items in Maica.

| Detail      |                               |
| ----------- | ----------------------------- |
| Load Order  | 2                             |
| Label       | `InvoiceLineBookingItem_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceLineBookingItem_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the booking items process for invoice line items.

* **Trigger Conditions**:
  * When a new invoice line item (`maica__Invoice_Line_Item__c`) is created.
  * When an existing invoice line item is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an invoice line item record is created or updated, the trigger is initialised. The `InvoiceLineBookingItem_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceLineBookingItem_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The booking item data for each line item is validated to ensure it is complete and accurate.
     * **Linking**: Booking items are linked to the corresponding invoice line items, ensuring that the relationship between booking items and invoice line items is correctly established.
     * **Update**: The invoice line item record is updated with the newly linked booking item data.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice line item has its booking items linked correctly, according to the logic specified in the handler class. This helps maintain accurate booking item data for invoice line items.

</details>

### Invoice Line Item → Plan Budget Link&#x20;

This Invoice Line Item trigger ensures every Invoice Line Item is automatically linked to the appropriate Plan Budget, and was rolled out with the Support at Home updates. This automation removes the need for manual intervention and supports accurate financial traceability, reporting, and compliance under Support at Home. It is detailed below:&#x20;

***

#### Component Behaviour

When an Invoice Line Item is created, the trigger evaluates the record and attempts to populate the **Plan Budget lookup field**.

* If a matching Plan Budget is found, the lookup is set automatically.
* If no match exists, the Plan Budget field remains blank. This is an acceptable outcome and does not generate an error.
* The trigger runs only on **create**, not on updates or deletions.

This ensures invoice data remains consistently aligned with the budgets defined in Service Agreements and their associated Plans.

***

#### Data Model

The trigger relies on attributes across the **Invoice Line Item**, **Agreement Item**, **Service Agreement**, and **Plan Budget** objects. These fields provide the necessary inputs for matching.

#### Invoice Line Item

| Field Name     | Type     | Description                                                                                   |
| -------------- | -------- | --------------------------------------------------------------------------------------------- |
| Agreement Item | Lookup   | References the Agreement Item that defines the service being invoiced.                        |
| Budget Type    | Picklist | Defines the budget type for the line item. Uses a global value set aligned with Plan Budgets. |
| Plan Budget    | Lookup   | Populated automatically by the trigger if a matching Plan Budget is found.                    |

#### Plan Budget

| Field Name  | Type     | Description                                                                                   |
| ----------- | -------- | --------------------------------------------------------------------------------------------- |
| Status      | Picklist | Identifies whether the Plan Budget is active. The trigger only considers active Plan Budgets. |
| Budget Type | Picklist | Defines the budget type of the Plan Budget. Must match the Invoice Line Item’s Budget Type.   |

#### Agreement Item

| Field Name        | Type   | Description                                               |
| ----------------- | ------ | --------------------------------------------------------- |
| Service Agreement | Lookup | Links the Agreement Item to its parent Service Agreement. |

#### Service Agreement

| Field Name | Type   | Description                                                                          |
| ---------- | ------ | ------------------------------------------------------------------------------------ |
| Plan       | Lookup | Links the Service Agreement to the parent Plan, which contains related Plan Budgets. |

***

#### Process Flow

The trigger logic follows a straightforward process:

1. **Invoice Line Item is created**
   * Trigger executes immediately on create.
2. **Traverse relationships**
   * From Invoice Line Item → Agreement Item → Service Agreement → Plan.
3. **Retrieve Plan Budgets**
   * Gather all Plan Budgets linked to the Plan.
4. **Filter Plan Budgets**
   * Status must equal _Active_.
   * Budget Type must equal the Budget Type on the Invoice Line Item.
5. **Populate Plan Budget**
   * If one matching record is found, populate the Plan Budget lookup on the Invoice Line Item.
   * If no match is found, leave the Plan Budget field blank with no error.

***

#### Calculation Logic&#x20;

The trigger does not perform financial calculations itself; it ensures records are correctly linked so downstream calculations and reports remain accurate.

*   **Matching Criteria:**

    ```apex
    PlanBudget.Status = 'Active'
    AND PlanBudget.BudgetType = InvoiceLineItem.BudgetType
    ```
*   **Assignment:**

    ```apex
    InvoiceLineItem.PlanBudget = Matching PlanBudget.Id
    ```
* **Null Handling:**\
  If no match is found, the field is left blank. No logging or error is raised.
