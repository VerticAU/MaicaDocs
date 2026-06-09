---
description: >-
  Learn about the Automation involved when Importing BPR Remittance and Results
  Files into Maica
---

# BPR File Import Flows

### What are the Data Import Flows? <a href="#what-are-the-data-import-flows" id="what-are-the-data-import-flows"></a>

As part of the [Data Import Utility](https://knowledge.maica.com.au/maica-knowledge-base/maica-administration-guide/data/data-import-utility), Automation is involved to ensure it's successful completion.

When using the tool, you are prompted to select a `Flow Setting` that essentially tells **Maica** which type of Data you are wanting to Import and allows the Automation to read the files correctly. It is important to understand the logic within the Automation and the altercations to the Data that will be involved when doing so. This article explains the logic behind the BPR File Import Flows in more detail.

{% hint style="info" %}
To learn about the other Flows the Data Import Utility can handle, click [here](../../../data/data-import-utility/data-import-flows.md).&#x20;
{% endhint %}

## Maica - NDIS Import - BPR Results File

This flow is designed to process the NDIS Bulk Payment Request (BPR) Results File and update the status of the Payment Request in Maica.

| Flow Detail |                                                             |
| ----------- | ----------------------------------------------------------- |
| Flow Label  | Maica - NDIS Bulk Payment Request Results File              |
| API Name    | maica\_\_Maica\_NDIS\_Bulk\_Payment\_Request\_Results\_File |
| Type        | `Autolaunched Flow`                                         |

#### **Flow Summary**

* Processes NDIS Bulk Payment Request (BPR) Results File.
* Updates the status of Payment Requests to **Open**, **Successful**, or **Failed** based on the BPR file outcomes.
* Handles errors for Paid or missing Payment Requests.

<details>

<summary>Flow Description</summary>

1. **Start (Auto-Triggered Flow)**
   * The flow starts automatically when provided with a `claimReference`, `reason`, and `status`.
2. **Get Payment Request (Record Lookup)**
   * Looks up the **Payment\_Request\_\_c** record based on the following:
     * `Claim_Reference_Index__c = claimReference`
     * `Claim_Reference_Index__c` is not null.
   * If the record lookup fails, it redirects to the **Handle Failure** assignment.
3. **IF (Decision)**
   * Checks if a Payment Request record was found:
     * **Payment\_Request\_Found**: If true, proceeds to the next decision: **Payment Request Status**.
     * **Default Outcome**: If no record is found, assigns the error message "No Payment Request" in **Not Found**.
4. **Payment Request Status (Decision)**
   * Evaluates the `status` and `Status__c` fields to determine the next action:
     * **Paid**: If the current `Status__c` = **Paid**, redirects to **Throw Error**, setting the error message:
       * _"Payment Request Status is already Paid. It was not updated as part of the import."_
     * **Open**: If `status` = **Open**, updates the Payment Request's status to **Open.**
     * **Successful**: If `status` = **Successful**, updates the Payment Request's status to **Successful** and clears any error details.
     * **Default Outcome**: For any other status, sets the Payment Request status to **Failed** and assigns the failure `reason` to `Error_Details__c` .
5. **Update Payment Request (Record Update)**
   * Updates the **Payment\_Request\_\_c** record with the new values:
     * `Status__c` and `Error_Details__c` based on the earlier decision.
6. **Throw Error (Assignment)**
   * Assigns the following message to `FlowFaultMessage`:
     * _"Payment Request Status is already Paid. It was not updated as part of the import."_
7. **Handle Failure (Assignment)**
   * Handles any errors in the flow by assigning `$Flow.FaultMessage` to `FlowFaultMessage`.
8. **Not Found (Assignment)**
   * If no Payment Request is found, assigns the message:
     * _"No Payment Request"_ to `FlowFaultMessage`.

</details>

## Maica - NDIS Import - BPR Remittance File

This flow processes the NDIS Bulk Payment Request (BPR) Remittance File to handle remittance advice and update payment-related data in Maica.

| Flow Detail |                                            |
| ----------- | ------------------------------------------ |
| Flow Label  | Maica - Remittance Advice Import           |
| API Name    | maica\_\_Maica\_Remittance\_Advice\_Import |
| Type        | `Autolaunched Flow`                        |

#### **Flow Summary**

* Processes the NDIS BPR Remittance File for payment reconciliation.
* Invokes an Apex action to handle remittance advice.
* Updates relevant records with payment information (amount and date).
* Captures errors during processing for reporting.

<details>

<summary>Flow Description</summary>

1. **Start (Auto-Triggered Flow)**
   * The flow starts automatically with the following input values:
     * `claimReference` (NDIS Reference).
     * `paidAmount` (Amount Paid).
     * `paidDate` (Date Payment Was Made).
2. **Handle Remittance Advice (Apex Action)**
   * Invokes the [**NDISHandleRemittanceAdviceInvocable**](bpr-file-import-flows.md#ndishandleremittanceadviceinvocable) Apex action (as detailed below).
   * Passes the following parameters:
     * `ndisReference = claimReference`
     * `paidAmount = paidAmount`
     * `paidDate = paidDate`
   * **Error Handling**: If the Apex action fails, the flow proceeds to the **Handle Failure** step.
3. **Handle Failure (Assignment)**
   * Captures the `$Flow.FaultMessage` and assigns it to `FlowFaultMessage` for error reporting.

</details>

<details>

<summary>NDISHandleRemittanceAdviceInvocable</summary>

The trigger logic defined in the **NDISHandleRemittanceAdviceInvocable** class is executed when the **Data Import Flow** is triggered. The class processes remittance advice data using a **Claim Reference** to update payment requests.

Please note, the class can also be executed when remittance advice data is received via **NDIS Webhook** (JSON body provided).

***

#### **Trigger Conditions**:

* When a **Claim Reference** (`ndisReference`) is provided during the Data Import Flow.

***

#### **Logic Explanation**

**1. Initialisation:**

* The trigger initialises when the input `ndisReference` (Claim Reference) is provided.
* The system validates that the `ndisReference` is not blank.

***

**2. Trigger Execution:**

* **Validation**:
  * Ensures that the `ndisReference` is provided.
  * Throws an error if the Claim Reference is missing.
* **Query Payment Requests**:
  * Finds `Payment_Request__c` records where `Claim_Reference_Index__c` matches the provided Claim Reference.
* **Update Payment Requests**:
  * Updates the following fields:
    * **Paid Amount** (`Paid_Amount__c`)
    * **Paid Date** (`Paid_Date__c`)
    * **Status** (`Status__c` → set to PAID if the Paid Amount > 0).
* **Logging**:
  * If no matching payment request is found, a log entry is created for troubleshooting.

***

#### **Trigger Outcome**

Once executed, the trigger ensures:

* **Payment\_Request\_\_c** records are updated with:
  * Paid Amount
  * Paid Date
  * Status (set to **PAID** if applicable).
* Logs are created for any unmatched records.

This process ensures accurate updates to payment requests using the provided **Claim Reference** during the **Data Import Flow**.

</details>
