---
description: >-
  This object represents a financial summary statement of a Service Agreement
  during the defined claim period. Referenced for claim extracts and monthly
  client statements.
---

# Service Agreement Statement

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Service Agreement Statement** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1oO_k7F2XEsunpMNHTQsv9qGkt3ASa5gC9FP_6xpOKuI/edit?usp=sharing" %}
Service Agreement Statement Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1oO_k7F2XEsunpMNHTQsv9qGkt3ASa5gC9FP_6xpOKuI/edit?usp=sharing) to view and download the complete Service Agreement Statement Schema.
{% endhint %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Service Agreement Leave Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Recalculate Service Agreement Statement Screen Flow&#x20;

This guided flow facilitates the recalculation of an existing Service Agreement Statement record.

| Flow Detail  |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| Flow Label   | Maica - Recalculate Service Agreement Statement Screen Flow        |
| API Name     | `maica__Maica_Recalculate_Service_Agreement_Statement_Screen_Flow` |
| Type         | `Screen Flow`                                                      |

#### Flow Summary

This flow guides the user through recalculating an existing Service Agreement Statement record:

* Starts from a user-initiated screen flow.
* Retrieves the Service Agreement Statement record.
* Calls a subflow to perform the recalculation.
* Checks for any fault messages and displays appropriate success or error messages based on the recalculation outcome.

<details>

<summary>Flow Description </summary>

1. **Start (Screen Flow)**:
   * The flow begins when a user starts the flow from the screen.
   * It guides the user to initiate the recalculation process.
2. **Recalculate Service Agreement Statement (Screen)**:
   * Displays instructions to the user about the recalculation process.
   * User clicks "Next" to proceed.
3. **GET Service Agreement Statement (Record Lookup)**:
   * Retrieves the Service Agreement Statement record using the provided record ID.
   * Passes the retrieved record to the subflow for recalculation.
4. **Call Generate Service Agreement Statement Flow (Subflow)**:
   * Calls the "Maica\_Generate\_Service\_Agreement\_Statements" subflow to perform the recalculation.
   * Inputs provided to the subflow:
     * `Claim_Period_End_Date`: End date of the statement period.
     * `Claim_Period_Start_Date`: Start date of the statement period.
     * `Recalculate_Statement`: Set to true to trigger recalculation.
     * `Service_Agreement_Id`: ID of the associated Service Agreement.
     * `Service_Agreement_Statement_Id`: ID of the Service Agreement Statement to be recalculated.
   * Outputs:
     * `FlowFaultMessage`: Captures any fault messages during recalculation.
5. **DECISION Flow Fault Message Set (Decision)**:
   * Checks if there is any fault message after the recalculation:
     * If a fault message is set, the flow proceeds to show the "Recalculation Failed" screen.
     * If no fault message, the flow proceeds to show the "Recalculation Complete" screen.
6. **Recalculation Complete (Screen)**:
   * Displays a success message indicating that the Service Agreement Statement has been successfully recalculated.
7. **Recalculation Failed (Screen)**:
   * Displays an error message with the fault details if the recalculation fails.
   * Advises the user to contact the system administrator and provide the fault message.

</details>
