---
description: >-
  The Service Agreement object in Maica represents the details of a Service
  Agreement signed between your organisation and a Client.
---

# Service Agreement

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Service Agreement** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1qZX0yHpJeApeopMzgOPaLNw2gar77YyyyqB7wsEtOv4/edit?usp=sharing" %}
Service Agreement Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1szKqu8Z_xvJHWfJCC7h0iI83eUun9oGZ-0suFaxxobI/edit?usp=sharing) to view and download the complete Service Agreement Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Service Agreement Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### Funding Administrator Required for Non-Self Funded Sources

Ensures that the Funding Administrator lookup is populated when the Funding Source is any value other than Self-Funded. Not required for Self and Agency Managed in the NDIS.

| Validation Rule Detail  |                                                      |
| ----------------------- | ---------------------------------------------------- |
| Rule Name               | VAL\_SERVICE\_AGREEMENT\_0001                        |
| Error Message           | VAL\_0001: Please provide the Funding Administrator. |
| Error Location          | `Funding Administrator`                              |

{% code title="Error Condition Formula " %}
```apex
AND(
  ISBLANK(maica_cc__Funding_Administrator__c),
  NOT(
    OR(
      ISPICKVAL(maica_cc__Funding_Source__c, 'Self Funded'),
      AND(
        ISPICKVAL(maica_cc__Funding_Source__c, 'NDIS'),
        ISPICKVAL(maica_cc__Funding_Type__c, 'Self Managed')
      ),
      AND(
        ISPICKVAL(maica_cc__Funding_Source__c, 'NDIS'),
        ISPICKVAL(maica_cc__Funding_Type__c, 'Agency Managed')
      )
    )
  )
)
```
{% endcode %}

### Agreement Start Date Must Be Before End Date

Ensures that the Agreement's Start Date cannot be after the End Date.

| Validation Rule Detail  |                                                         |
| ----------------------- | ------------------------------------------------------- |
| Rule Name               | VAL\_SERVICE\_AGREEMENT\_0002                           |
| Error Message           | VAL\_0002: The Start Date cannot be after the End Date. |
| Error Location          | `Start Date`                                            |

{% code title="Error Condition Formula " %}
```apex
maica_cc__Start_Date__c  >  maica_cc__End_Date__c
```
{% endcode %}

### Start and End Dates Required for NDIS Funding Source

Ensures the Start and End Date are provided when the Funding Source is NDIS.

<table><thead><tr><th width="360">Validation Rule Detail </th><th></th></tr></thead><tbody><tr><td>Rule Name </td><td>VAL_SERVICE_AGREEMENT_0003</td></tr><tr><td>Error Message </td><td>VAL_0003: As the Funding Source is NDIS, the Start and End Date are required.</td></tr><tr><td>Error Location </td><td><code>Top of Page</code></td></tr></tbody></table>

{% code title="Error Condition Formula " %}
```apex
AND(
  ISPICKVAL(maica_cc__Funding_Source__c, 'NDIS'),
  OR(
    ISBLANK(maica_cc__Start_Date__c),
    ISBLANK(maica_cc__End_Date__c)
  )
)
```
{% endcode %}

### Price List Must Be Associated

Ensures that the Price List is populated.

<table><thead><tr><th width="360">Validation Rule Detail </th><th></th></tr></thead><tbody><tr><td>Rule Name </td><td>VAL_SERVICE_AGREEMENT_0004</td></tr><tr><td>Error Message </td><td>VAL_0004: Please associate a Price List.</td></tr><tr><td>Error Location </td><td><code>Price List</code></td></tr></tbody></table>

{% code title="Error Condition Formula " %}
```apex
ISBLANK(maica_cc__Price_List__c)
```
{% endcode %}

### Price List and Service Agreement Date Alignment&#x20;

Ensures that the associated Price List Start Date is less than or equal to the Service Agreement Start Date and the Price List End Date is greater than the Service Agreement Start Date.

| Validation Rule Detail  |                                                                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rule Name               | VAL\_SERVICE\_AGREEMENT\_0005                                                                                                                                                          |
| Error Message           | VAL\_0005: The Price List Start Date must be less than or equal to the Service Agreement Start Date and the Price List End Date must be greater than the Service Agreement Start Date. |
| Error Location          | `Price List`                                                                                                                                                                           |

{% code title="Error Condition Formula " %}
```apex
AND(
  maica_cc__Price_List__r.maica_cc__Start_Date__c <= maica_cc__Start_Date__c,
  maica_cc__Price_List__r.maica_cc__End_Date__c > maica_cc__Start_Date__c
)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Service Agreement Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Cancel Service Agreement

This flow is designed to manage the cancellation of a service agreement. It ensures that service agreements can only be canceled if they are active, providing confirmation screens for user actions and handling any errors that may occur during the process.

| Flow Detail  |                                    |
| ------------ | ---------------------------------- |
| Flow Label   | Maica - Cancel Service Agreement   |
| API Name     | `maica__Cancel_Service_Agreement`  |
| Type         | `Screen Flow`                      |

#### Flow Summary

This flow facilitates the cancellation process for service agreements by following these steps:

* Checking the status of the service agreement.
* Confirming the cancellation with the user.
* Setting the service agreement as cancelled.
* Updating the service agreement record.
* Displaying appropriate messages based on the outcome of the process.

<details>

<summary>Flow Description</summary>

1. **Start (Screen Flow)**:
   * The flow is initiated.
2. **Get Current Service Agreement (Get Records)**:
   * The flow retrieves the current Service Agreement record based on the `recordId` provided.
   * If the record retrieval fails, the flow handles the error through the `Handle_Error` assignment.
3. **Service Agreement With Active Status? (Decision)**:
   * The flow checks if the retrieved Service Agreement has an active status.
   * **Yes**: If the Service Agreement is active, the flow proceeds to the `Cancel Service Agreement` screen.
   * **No**: If the Service Agreement is not active, the flow displays the `Service Agreement Not Active` screen and ends.
4. **Cancel Service Agreement (Screen)**:
   * The flow displays a confirmation screen for canceling the Service Agreement, showing the participant's name and a note that active service bookings with PRODA are not impacted.
   * Upon confirmation, the flow moves to the next step.
5. **Set Service Agreement Is Cancelled To True (Assignment)**:
   * The flow sets the `Is_Cancelled__c` field of the Service Agreement to `true`.
   * It then proceeds to update the Service Agreement record.
6. **Update Service Agreement (Update Records)**:
   * The flow updates the Service Agreement record with the new status.
   * If the update operation fails, the flow handles the error through the `Handle_Error` assignment.
7. **Finish Cancel Service Agreement (Screen)**:
   * The flow displays a screen indicating the successful cancellation of the Service Agreement.
   * The flow then ends.
8. **Service Agreement Not Active (Screen)**:
   * If the Service Agreement is not active, the flow displays a screen indicating that the agreement is not active and cannot be canceled.
   * The flow then ends.
9. **Handle Error (Assignment)**:
   * If any errors occur during the process (such as during record retrieval or updating), the flow captures the error message in the `FlowFaultMessage` variable and ends.

</details>

### Discharge Service Agreement Screen Flow

This flow is designed to handle the discharge process for Service Agreements. It ensures a smooth and efficient discharge process with appropriate error handling and user guidance.

| Flow Detail  |                                                        |
| ------------ | ------------------------------------------------------ |
| Flow Label   | Maica - Discharge Service Agreement Screen Flow        |
| API Name     | `maica__Maica_Discharge_Service_Agreement_Screen_Flow` |
| Type         | `Screen Flow`                                          |

#### Flow Summary

This flow facilitates the discharge process for Service Agreements by following these steps:

* Displaying instructions for discharging a Service Agreement.
* Calling a subflow to generate a discharge statement.
* Checking for any fault messages from the subflow.
* Updating the Service Agreement record with discharge details.
* Displaying success or error messages based on the outcome of the process.

<details>

<summary>Flow Description </summary>

1. **Start (Screen Flow)**:
   * The flow is initiated.
2. **Discharge Service Agreement (Screen)**:
   * Displays instructions to the user, prompting them to proceed with the discharge process by selecting "Next".
   * Connects to the `Call_Generate_Discharge_Statement_Flow` subflow.
3. **Call Generate Discharge Statement Flow (Subflow)**:
   * Triggers the subflow `Maica_Generate_Discharge_Statement` to generate a discharge statement for the service agreement.
   * If the subflow sets the `FlowFaultMessage`, the flow proceeds to the `Discharge_Failed` screen.
   * If the `FlowFaultMessage` is not set, the flow proceeds to the `Discharge_Complete` screen.
4. **Flow Fault Message Set? (Decision)**:
   * Checks if the `FlowFaultMessage` is set.
   * **Flow Fault Message Set**: If the `FlowFaultMessage` is set, the flow proceeds to the `Discharge_Failed` screen.
   * **Default Outcome**: If the `FlowFaultMessage` is not set, the flow proceeds to the `Discharge_Complete` screen.
5. **Discharge Complete (Screen)**:
   * Displays a success message indicating that the service agreement has been successfully discharged and the discharge statement has been generated.
   * Connects to the `UPDATE_Service_Agreement` record update.
6. **Service Agreement (Update Records)**:
   * Updates the service agreement record to set the `Discharged__c` field to `true` and the `Discharge_Date__c` to the current date.
   * If the update operation fails, the flow handles the error through the `Handle_Error` assignment.
7. **Discharge Failed (Screen)**:
   * Displays an error message indicating that the discharge process has failed, along with the fault message.
   * Ends the flow.

</details>

### Generate Discharge Statement&#x20;

This flow generates Statement for period of the claim to the discharge date, then generates the Discharge Statement record.

| Flow Detail  |                                             |
| ------------ | ------------------------------------------- |
| Flow Label   | Maica - Generate Discharge Statement        |
| API Name     | `maica__Maica_Generate_Discharge_Statement` |
| Type         | `Autolaunched`                              |

#### Flow Summary

This flow ensures that a discharge statement is accurately generated based on the service agreement and its related monthly statements.

* Starts on service agreement creation or update.
* Retrieves and validates the service agreement.
* Assigns statement period dates and calls a subflow to generate service agreement statements.
* Loops through monthly statements and updates discharge statement counters.
* Creates the discharge statement and updates the service agreement.

<details>

<summary>Flow Description</summary>

1. **Start (Record-Triggered Flow)**:
   * The flow begins when a service agreement is created or updated.
2. **Get Service Agreement (Get Records)**:
   * Retrieves the service agreement based on the provided Service Agreement Id.
3. **Validate Not Discharged (Decision)**:
   * Checks if the service agreement is not already discharged:
     * If not discharged, it proceeds to assign the statement period date values.
     * If discharged, it assigns a fault message indicating the service agreement is already discharged.
4. **Assign Statement Period Date Values (Assignment)**:
   * Sets the claim period start date to the first day of the current month.
   * Sets the claim period end date to the current date.
5. **Call Generate Service Agreement Statements Flow (Subflow)**:
   * Calls another flow to generate service agreement statements for the specified period.
6. **Decision Flow Fault Message (Decision)**:
   * Checks if a fault message is set:
     * If a fault message is set, it assigns the fault message.
     * If no fault message is set, it proceeds to get the monthly statements.
7. **Get Monthly Statements (Get Records)**:
   * Retrieves monthly statements related to the service agreement.
8. **Loop Through Monthly Statements (Loop)**:
   * Iterates over the retrieved monthly statements:
     * For each statement, it adds the values to the discharge statement counters.
9. **Assign Counters (Assignment)**:
   * Updates the discharge statement counters by adding values from the monthly statements:
     * `Lifetime Billable Fees`
     * `Lifetime Claimable Expenditure`
     * `Lifetime Claimable Fees`
     * `Lifetime Client Contributions`
     * `Lifetime Subsidy Supplement Income`
10. **Assign Discharge Statement Values (Assignment)**:
    * Sets the discharge statement values:
      * `Issue Date`
      * `Period Start Date`
      * `Period End Date`
      * `Status`
      * `Type`
11. **Create Discharge Statement (Create Records)**:
    * Creates the discharge statement record.
12. **Assign Service Agreement Values (Assignment)**:
    * Updates the service agreement to set the discharge date and mark it as discharged.

</details>

### Service Agreement Fee Invoicing Initialisation&#x20;

> Fee Invoicing Step 1

This flow is designed to schedule the initialisation of the invoicing process for service agreements, setting their status to "Initialised" to trigger the fee invoicing flow. By automating this process, the flow ensures that service agreements are ready for fee invoicing without manual intervention.&#x20;

| Flow Detail  |                                                          |
| ------------ | -------------------------------------------------------- |
| Flow Label   | Maica - Service Agreement - Fee Invoicing Initialisation |
| API Name     | `maica___Service_Agreement_Fee_Invoicing_Initialisation` |
| Type         | `Autolaunched`                                           |

#### Flow Summary

This flow ensures that the invoicing process for service agreements is initialised on a daily basis by:

* Running the flow daily at a specified time.
* Filtering service agreements based on their status and funding type.
* Updating the invoicing flow status to "Initialised" to trigger the fee invoicing flow.

<details>

<summary>Flow Description </summary>

1. **Start (Scheduled Flow)**:
   * The flow is initiated on a daily schedule at 00:15 UTC.
   * Retrieves service agreements with specific conditions:
     * `Status__c` is "Active" or "On Leave".
     * `Funding_Type__c` is "Home Care Package".
2. **Update Service Agreement (Update Records)**:
   * Updates the `Invoicing_Flow_Status__c` field of the retrieved service agreements to "Initialised".

</details>

### Service Agreement Fee Invoice Trigger

> Fee Invoicing Step 2

This flow is designed to trigger the generation of fee invoices and their line items for service agreements. It ensures a streamlined and automated process for generating fee invoices for service agreements, with appropriate error handling and logging mechanisms.

| Flow Detail  |                                                      |
| ------------ | ---------------------------------------------------- |
| Flow Label   | Maica - Service Agreement - Fee Invoice Trigger      |
| API Name     | `maica__Maica_Service_Agreement_Fee_Invoice_Trigger` |
| Type         | `Autolaunched`                                       |

#### Flow Summary

This flow facilitates the generation of invoices and line items for service agreement fees by:

* Detecting changes to the invoicing flow status.
* Retrieving the relevant service agreement record.
* Triggering the Fee Invoice Generation Flow to create invoices and line items.
* Updating the service agreement status to complete.

<details>

<summary>Flow Description </summary>

1. **Start (Auto-Triggered Flow)**:
   * The flow is initiated, starting with the detection of changes to the `Invoicing_Flow_Status__c` field.
2. **Get Service Agreement (Record Lookup)**:
   * Retrieves the service agreement record where `Invoicing_Flow_Status__c` is `Initialised` and `Funding_Type__c` is `Home Care Package`.
   * Proceeds to trigger the Fee Invoice Generation Flow.
3. **Trigger Fee Invoice Generation Flow (Subflow)**:
   * Triggers the subflow `Maica_Service_Agreement_Fee_Invoice_Generation_Autolaunch` to generate invoices and line items for the service agreement.
   * Passes the `recordId` of the service agreement and the `Processing_Date`.
   * Captures any fault message.
   * Proceeds to the `DECISION_Flow_Fault` decision.
4. **Flow Fault? (Decision)**:
   * Checks if the `FlowFaultMessage` is set.
   * If the `FlowFaultMessage` is set, the flow proceeds to the `CREATE_Log` step.
   * If the `FlowFaultMessage` is not set, the flow proceeds to the `UPDATE_Service_Agreement` step.
5. **Update Service Agreement (Update Records)**:
   * Updates the service agreement record to set the `Invoicing_Flow_Status__c` field to `Complete`.
   * Ends the flow.
6. **Create Log (Record Create)**:
   * Creates a log record to capture the details of the error.
   * Captures the `FlowFaultMessage` and other relevant details.
   * Proceeds to update the service agreement status to `Failed`.
7. **Update Service Agreement to Failed (Update Records)**:
   * Updates the service agreement record to set the `Invoicing_Flow_Status__c` field to `Failed`.
   * Ends the flow.

</details>

### Service Agreement Fee Invoice Generation

> Fee Invoicing Step 3

This flow automates the process of generating fee invoice line items for service agreements. It ensures a streamlined and automated process for generating accurate fee invoices and their associated line items based on the service agreement details.

| Flow Detail  |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| Flow Label   | Maica - Service Agreement - Fee Invoice Generation (Autolaunch)    |
| API Name     | `maica__Maica_Service_Agreement_Fee_Invoice_Generation_Autolaunch` |
| Type         | `Autolaunched`                                                     |

#### Flow Summary

This flow facilitates the generation of fee invoice line items for service agreements by following these steps:

* Starting the flow and retrieving the service agreement.
* Retrieving the related plan and service agreement leave records.
* Checking if the service agreement is on leave and handling accordingly.
* Retrieving and validating the income-tested fee plan budget.
* Assigning the income-tested fee rate and adding the budget to the collection.
* Checking the type of leave and retrieving the corresponding billable plan budgets.
* Validating the existence of billable and claimable plan budgets.
* Calling the Invoice Invocable actions to create copayment and claim invoices.
* Looping through the billable and claimable plan budgets to assign invoice line item values.
* Creating the invoice line items.
* Handling errors during the process.

<details>

<summary>Flow Description</summary>

1. **Start (Auto-Triggered Flow)**:
   * The flow is initiated, starting with the retrieval of the service agreement.
2. **Get Service Agreement (Record Lookup)**:
   * Retrieves the service agreement record where the Id matches `Service_Agreement_Id`.
   * Proceeds to retrieve the related plan.
   * If the record retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
3. **Get Plan (Record Lookup)**:
   * Retrieves the plan record associated with the service agreement's NDIS Plan.
   * Proceeds to retrieve the service agreement leave.
   * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
4. **Get Service Agreement Leave (Record Lookup)**:
   * Retrieves the service agreement leave record associated with the service agreement.
   * Moves to the decision step to check if the service agreement is on leave.
   * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
5. **Service Agreement On Leave? (Decision)**:
   * Checks if the service agreement leave record is not null.
   * If on leave, proceeds to get the income tested fee plan budget.
   * If not on leave, proceeds to get all billable plan budgets.
6. **Get Income Tested Fee Plan Budget (Record Lookup)**:
   * Retrieves the income tested fee plan budget associated with the service agreement's NDIS Plan.
   * Proceeds to the decision step for consecutive leave days.
   * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
7. **Consecutive Leave Days? (Decision)**:
   * Checks the consecutive leave days and the applicability of the income tested fee.
   * If consecutive leave days > 28 and income tested fee applicable, proceeds to get the basic subsidy plan budget.
   * If less than 28 days or not applicable, proceeds to assign income tested fee plan budget to the collection.
8. **Get Basic Subsidy Plan Budget (Record Lookup)**:
   * Retrieves the basic subsidy plan budget associated with the service agreement's NDIS Plan.
   * Proceeds to the decision step for income tested fee rate.
   * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
9. **Income Tested Fee Rate? (Decision)**:
   * Checks if the income tested fee rate is greater than 25% subsidy rate.
   * If true, proceeds to assign income tested fee rate.
   * Proceeds to the next decision step for leave type.
10. **Assign Income Tested Fee Rate (Assignment)**:
    * Assigns the adjusted income tested fee rate to the income tested fee plan budget.
    * Proceeds to assign the income tested fee plan budget to the collection.
11. **Assign Income Tested Fee Plan Budget to Collection (Assignment)**:
    * Adds the income tested fee plan budget to the collection of billable plan budgets.
    * Proceeds to the decision step for leave type.
12. **Leave Type? (Decision)**:
    * Checks the leave type of the service agreement.
    * Proceeds to get billable plan budgets excluding income tested fee if leave type is Hospital or Social.
    * Proceeds to get billable plan budgets excluding income tested fee and basic daily fee if leave type is Respite or Transition.
13. **Get Billable Plan Budgets Excluding Income Tested Fee (Record Lookup)**:
    * Retrieves the billable plan budgets excluding income tested fee associated with the service agreement's NDIS Plan.
    * Proceeds to validate the billable plan budgets.
    * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
14. **Get Billable Plan Budgets Excluding Income Tested Fee and Basic Daily Fee (Record Lookup)**:
    * Retrieves the billable plan budgets excluding income tested fee and basic daily fee associated with the service agreement's NDIS Plan.
    * Proceeds to validate the billable plan budgets.
    * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
15. **Get All Billable Plan Budgets (Record Lookup)**:
    * Retrieves all billable plan budgets.
    * Proceeds to validate the billable plan budgets.
    * If retrieval fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
16. **Validate Billable Plan Budgets? (Decision)**:
    * Checks if billable plan budgets exist.
    * If true, proceeds to call invoice invocable for copayment.
    * Proceeds to validate the claimable plan budgets if billable plan budgets do not exist.
17. **Call Invoice Invocable (Apex Action)**:
    * Calls the apex invocable method to get the copayment invoice.
    * Passes parameters like allowDML, fundingType, isCopayment, participantId, and serviceProviderId.
    * Captures the copayment invoice.
    * Proceeds to loop through the billable plan budgets.
    * If the action fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
18. **Loop Billable Plan Budgets (Loop)**:
    * Iterates through each billable plan budget.
    * Proceeds to assign invoice line item values.
    * Proceeds to validate the claimable plan budgets if no more values.
19. **Assign Invoice Line Item Values (Assignment)**:
    * Assigns values to the invoice line item from the current billable plan budget in the loop.
    * Proceeds to add the invoice line item to the collection.
20. **Assign Invoice Line Item to Collection (Assignment)**:
    * Adds the invoice line item to the collection of invoice line items.
    * Proceeds to the next iteration of the loop.
21. **Validate Claimable Plan Budgets? (Decision)**:
    * Checks if claimable plan budgets exist.
    * If true, proceeds to call invoice invocable for claim.
    * Proceeds to create invoice line items if claimable plan budgets do not exist.
22. **Call Invoice Invocable (Apex Action)**:
    * Calls the apex invocable method to get the claim invoice.
    * Passes parameters like allowDML, fundingType, isCopayment, participantId, and serviceProviderId.
    * Captures the claim invoice.
    * Proceeds to loop through the claimable plan budgets.
    * If the action fails, the flow handles the error through the `ASSIGN_Flow_Fault_Message` assignment.
23. **Loop Claimable Plan Budgets (Loop)**:
    * Iterates through each claimable plan budget.
    * Proceeds to assign invoice line item values.
    * Proceeds to create invoice line items if no more values.
24. **Assign Invoice Line Item Values (Assignment)**:
    * Assigns values to the invoice line item from the current claimable plan budget in the loop.
    * Proceeds to add the invoice line item to the collection.
25. **Assign Invoice Line Item to Collection (Assignment)**:
    * Adds the invoice line item to the collection of invoice line items.
    * Proceeds to the next iteration of the loop.
26. **Create Invoice Line Items (Create Records)**:
    * Creates invoice line items from the collection of invoice line items.
    * Completes the creation and ends the flow.
    * If an error occurs during creation, it moves to the error handling step.
27. **Assign Flow Fault Message (Assignment)**:
    * Assigns the flow fault message to the `FlowFaultMessage` variable in case of errors.

</details>

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Service Agreement Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Service Agreement Price List&#x20;

This trigger is designed to ensure that the correct price list is applied to service agreements in Maica.

| Detail     |                                  |
| ---------- | -------------------------------- |
| Load Order | 1                                |
| Label      | `ServiceAgreementPriceList_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Trigger Execution**

The trigger logic defined in the `ServiceAgreementPriceList_MDTM` class is executed when the trigger conditions are met.&#x20;

* **Trigger Conditions**:
  * When a new service agreement (`maica__Service_Agreement__c`) is created.
  * When an existing service agreement is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

**Logic Explanation**

1. **Initialisation**:
   * When a service agreement record is created or updated, the trigger is initialised. The `ServiceAgreementPriceList_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ServiceAgreementPriceList_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The service agreement data is validated to ensure it meets the criteria required for applying a price list.
     * **Determination**: The appropriate price list is determined based on predefined criteria such as the type of service and the client category.
     * **Application**: The correct price list is then applied to the service agreement record.

**Trigger Outcome**:

After the price list application logic is executed, the service agreement record is saved with the associated price list. The outcome is a consistent and accurate application of price lists to service agreements, ensuring proper billing and management of services.

</details>

### Service Agreement Name Formatting

This trigger is designed to ensure that the service agreement names are formatted correctly in Maica.

| Detail      |                                       |
| ----------- | ------------------------------------- |
| Load Order  | 1                                     |
| Label       | `ServiceAgreementNameFormatting_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Trigger Execution**

The trigger logic defined in the `ServiceAgreementNameFormatting_MDTM` class is executed when the trigger conditions are met.&#x20;

* **Trigger Conditions**:
  * When a new service agreement (`maica__Service_Agreement__c`) is created.
  * When an existing service agreement is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

**Logic Explanation**

1. **Initialisation**:
   * When a service agreement record is created or updated, the trigger is initialised. The `ServiceAgreementNameFormatting_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ServiceAgreementNameFormatting_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The current name format of the service agreement is validated to check if it meets the predefined formatting criteria.
     * **Formatting**: If the name does not meet the criteria, the appropriate formatting rules are applied. This may include adding standard prefixes, suffixes, or adjusting the structure of the name.

**Trigger Outcome**:

After the name formatting logic is applied, the service agreement record is saved with the newly formatted name. The outcome is a consistent and standardised format for all service agreement names, which helps maintain uniformity and clarity across records.&#x20;

</details>

### Service Agreement Validation&#x20;

This trigger is designed to manage the validation of service agreements in Maica.

| Detail      |                                   |
| ----------- | --------------------------------- |
| Load Order  | 2                                 |
| Label       | `ServiceAgreementValidation_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `ServiceAgreementValidation_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the validation process for service agreements.

* **Trigger Conditions**:
  * When a new service agreement (`maica__Service_Agreement__c`) is created.
  * When an existing service agreement is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a service agreement record is created or updated, the trigger is initialised. The `ServiceAgreementValidation_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ServiceAgreementValidation_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The service agreement data is validated to ensure it is complete and accurate.
     * **Check**: The data is checked for completeness and accuracy based on predefined criteria such as required fields and logical consistency.
     * **Update**: The service agreement record is updated with the results of the validation, including any errors or warnings.

**Trigger Outcome**:

Once executed, the trigger ensures that each service agreement is validated correctly, based on the logic defined in the handler class. This helps maintain accurate and complete data for service agreements.

</details>
