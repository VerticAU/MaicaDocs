---
description: >-
  An Invoice represents the financial component following an instance of Service
  Delivery.
---

# Invoice

## Fields & Relationships

The table below provides a comprehensive overview of all fields and relationships for the **Invoice** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/117Q8wHpJdsgJvYmOHLfpNkxtY9Om2aJh1lZBNkcNylk/edit?usp=sharing" %}
Invoice Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/117Q8wHpJdsgJvYmOHLfpNkxtY9Om2aJh1lZBNkcNylk/edit?usp=sharing) to view and download the complete Invoice Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Invoice Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Funding Type Required When Invoice is Saved

This rule ensures that the `Funding Type` is populated when the Invoice is saved.

| Validation Rule Detail  |                                                             |
| ----------------------- | ----------------------------------------------------------- |
| Rule Name               | VAL\_INVOICE\_0001                                          |
| Error Message           | VAL\_0001: Please ensure that the Funding Type is provided. |
| Error Location          | `Funding Type`                                              |

{% code title="Error Condition Formula" %}
```apex
ISPICKVAL(maica_cc__Funding_Type__c, "")
```
{% endcode %}

### Restrict Invoice Amount Change&#x20;

This rule ensures that the `Invoice Total Amount` cannot be changed when a corresponding Stripe Invoice exists.

| Validation Rule Detail  |                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------- |
| Rule Name               | Restrict\_Invoice\_Amount\_Change                                                |
| Error Message           | The Total Amount cannot be be updated as there is a corresponding Stripe Invoice |
| Error Location          | `Top of Page`                                                                    |

{% code title="Error Condition Formula" %}
```apex
AND(
    NOT(ISBLANK(maica__Stripe_Invoice_ID__c)),
    ISCHANGED(maica__Total_Amount__c)
)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Invoice Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Cancel Invoice&#x20;

This flow is designed to cancel an invoice by updating its status to "Cancelled."

| Flow Detail  |                               |
| ------------ | ----------------------------- |
| Flow Label   | Maica - Cancel Invoice        |
| API Name     | `maica__Maica_Cancel_Invoice` |
| Type         | `Screen Flow`                 |

#### Flow Summary

This flow is designed to cancel an invoice by updating its status to "Cancelled".

* Retrieves an invoice.
* Checks the invoice status.
* Allows the user to confirm cancellation.
* Updates the invoice status to "Cancelled".
* Notifies the user of successful cancellation.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * Object: `Invoice__c`
   * Trigger: When the invoice record is updated or created.
   * Input Variable: `recordId`
2. **Get Invoice (Record Lookup)**:
   * Filters: Retrieves the invoice record where the Id matches `recordId`.
   * Connector: Proceeds to check the invoice status.
3. **Invoice Status (Decision)**:
   * Conditions: Checks if the invoice status is "Cancelled".
   * If "Cancelled": Displays the "Invoice Cancelled" screen.
   * If not "Cancelled": Proceeds to the "Cancel Invoice" screen.
4. **Cancel Invoice (Screen)**:
   * Displays a confirmation message asking the user to confirm the cancellation of the invoice.
   * Connector: Proceeds to set the invoice as cancelled upon confirmation.
5. **Set Invoice Cancelled (Assignment)**:
   * Sets the `Cancelled__c` field of the invoice to `true`.
   * Connector: Proceeds to update the invoice.
6. **Update Invoice (Record Update)**:
   * Updates the invoice record with the cancelled status.
   * Connector: Proceeds to display the "Invoice Cancelled" screen.
7. **Invoice Cancelled (Screen)**:
   * Displays a message confirming that the invoice has been cancelled.

</details>

### Invoice Status Management&#x20;

This flow evaluates and updates the status of an invoice based on its payment details and other related conditions.

| Flow Detail  |                                      |
| ------------ | ------------------------------------ |
| Flow Label   | Maica - Invoice Status Management    |
| API Name     | maica\_\_Invoice\_Status\_Management |
| Type         | `Autolaunched Flow`                  |

#### Flow Summary

This flow ensures that the invoice status is accurately updated based on the payment details and other conditions.

* Starts on invoice creation or update.
* Evaluates the status based on various conditions.
* Assigns the appropriate status (Cancelled, Not Paid, Partially Paid, Fully Paid).

<details>

<summary>Flow Description</summary>

1. **Start (Record-Triggered Flow)**:
   * The flow begins when an invoice is created or updated.
   * It is triggered before the record is saved.
2. **Status Evaluation (Decision)**:
   * The flow checks the status of the invoice based on various conditions:
     * If the invoice is cancelled, it proceeds to set the status to "Cancelled".
     * If all line items are not paid, it proceeds to set the status to "Not Paid".
     * If the invoice is partially paid and managed by an agency, it checks further conditions and then sets the status to "Partially Paid".
     * If the invoice is fully paid and managed by an agency, it checks further conditions and then sets the status to "Fully Paid".
     * For non-agency managed invoices, it similarly checks and sets the status to "Partially Paid" or "Fully Paid" based on payment details.
3. **Set Cancelled (Assignment)**:
   * Sets the invoice status to "Cancelled".
4. **Set Not Paid Status (Assignment)**:
   * Sets the invoice status to "Not Paid".
5. **Set Partially Paid Status (Assignment)**:
   * Sets the invoice status to "Partially Paid".
6. **Set Fully Paid Status (Assignment)**:
   * Sets the invoice status to "Fully Paid".

</details>

## Trigger Handlers

The table below outlines the **Trigger Handlers** applied to the **Invoice Object** in **Maica** and their `Load Order`.

| Trigger Handler                                                              | Load Order |
| ---------------------------------------------------------------------------- | ---------- |
| [InvoiceManageClaimSchedule\_MDTM](invoice.md#invoice-manage-claim-schedule) | 1          |
| [InvoiceNextScheduledDate\_MDTM](invoice.md#invoice-next-schedule-date)      | 1          |
| [InvoiceDefaults\_MDTM](invoice.md#invoice-defaults)                         | 1          |
| [InvoiceRollupExpenditure\_MDTM](invoice.md#invoice-rollup-expenditure)      | 2          |
| [InvoiceClaim\_MDTM](invoice.md#invoice-claim)                               | 10         |

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Invoice Manage Claim Schedule&#x20;

This trigger is designed to manage the claim schedule for invoices in Maica.

| Detail      |                                   |
| ----------- | --------------------------------- |
| Load Order  | 1                                 |
| Label       | `InvoiceManageClaimSchedule_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceManageClaimSchedule_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the claim schedule process for invoices.

* **Trigger Conditions**:
  * When a new invoice (`maica__Invoice__c`) is created.
  * When an existing invoice is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an invoice record is created or updated, the trigger is initialised. The `InvoiceManageClaimSchedule_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceManageClaimSchedule_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The invoice data is validated to ensure it is complete and accurate.
     * **Claim Scheduling**: Based on the invoice details, claims are scheduled to reflect the payment plan and due dates.
     * **Update**: The invoice record is updated with the newly scheduled claim data.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice has its claim schedule managed correctly, according to the logic specified in the handler class. This helps maintain accurate claim schedule data for invoices.

</details>

### Invoice Next Schedule Date

This trigger is designed to manage the next scheduled date for invoices in Maica. This ensures correct calculation of the next scheduled date for invoices, maintaining accurate scheduling data.

| Detail      |                                 |
| ----------- | ------------------------------- |
| Load Order  | 1                               |
| Label       | `InvoiceNextScheduledDate_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceNextScheduledDate_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the next scheduled date process for invoices.

* **Trigger Conditions**:
  * When a new invoice (`maica__Invoice__c`) is created.
  * When an existing invoice is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

1. **Initialisation**:
   * When an invoice record is created or updated, the trigger is initialised. The `InvoiceNextScheduledDate_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceNextScheduledDate_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The invoice data is validated to ensure it is complete and accurate.
     * **Date Calculation**: Based on the invoice details, the next scheduled date is calculated to reflect the payment plan and due dates.
     * **Update**: The invoice record is updated with the newly calculated next scheduled date.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice has its next scheduled date calculated correctly, according to the logic specified in the handler class. This helps maintain accurate scheduling data for invoices.

</details>

### Invoice Defaults&#x20;

This trigger is designed to manage the default values for invoices in Maica.

| Detail      |                        |
| ----------- | ---------------------- |
| Load Order  | 1                      |
| Label       | `InvoiceDefaults_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceDefaults_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the setting of default values for invoices.

* **Trigger Conditions**:
  * When a new invoice (`maica__Invoice__c`) is created.
  * When an existing invoice is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an invoice record is created or updated, the trigger is initialised. The `InvoiceDefaults_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceDefaults_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The invoice data is validated to ensure it is complete and accurate.
     * **Default Setting**: Based on predefined criteria, default values such as payment terms, due dates, and invoice status are set.
     * **Update**: The invoice record is updated with the newly set default values.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice has its default values set correctly, according to the logic specified in the handler class. This helps maintain accurate and consistent data for invoices.

</details>

### Invoice Rollup Expenditure&#x20;

This trigger is designed to manage the rollup of expenditures for invoices in Maica.&#x20;

| Detail      |                                 |
| ----------- | ------------------------------- |
| Load Order  | 2                               |
| Label       | `InvoiceRollupExpenditure_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceRollupExpenditure_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the rollup expenditure process for invoices.

* **Trigger Conditions**:
  * When a new invoice (`maica__Invoice__c`) is created.
  * When an existing invoice is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an invoice record is created or updated, the trigger is initialised. The `InvoiceRollupExpenditure_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceRollupExpenditure_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The expenditure data is validated to ensure it is complete and accurate.
     * **Calculation**: The total expenditure is calculated based on predefined criteria such as item type and financial rules.
     * **Update**: The invoice record is updated with the newly calculated rolled-up expenditure data.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice has its expenditures rolled up correctly, according to the logic specified in the handler class. This helps maintain accurate financial data for invoices.

</details>

### Invoice Claim

This trigger is designed to manage the claim process for invoices in Maica. This ensures correct generation of claims for invoices, maintaining accurate claim data.

| Detail      |                     |
| ----------- | ------------------- |
| Load Order  | 10                  |
| Label       | `InvoiceClaim_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `InvoiceClaim_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the claim process for invoices.

* **Trigger Conditions**:
  * When a new invoice (`maica__Invoice__c`) is created.
  * When an existing invoice is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an invoice record is created or updated, the trigger is initialised. The `InvoiceClaim_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `10.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `InvoiceClaim_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The invoice data is validated to ensure it is complete and accurate.
     * **Claim Generation**: Based on the invoice details, claims are generated to reflect the amounts and payment plans specified.
     * **Update**: The invoice record is updated with the newly generated claim data.

**Trigger Outcome**:

Once executed, the trigger ensures that each invoice has its claims processed correctly, according to the logic specified in the handler class. This helps maintain accurate claim data for invoices.

</details>
