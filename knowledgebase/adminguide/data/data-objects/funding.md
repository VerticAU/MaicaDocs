---
description: >-
  Represents the specific details of a Participant's funding, i.e. NDIS Funding
  or Home Care Package.
---

# Funding

{% hint style="info" %}
Depending on your Maica package, this Data Object may be called `Plan` in your organisation
{% endhint %}

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Funding** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1tUqCnhGFefwR2h92baZlkIpRc-fIMNBIqI5bLA6FEvA/edit?usp=sharing" %}
Funding Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1tUqCnhGFefwR2h92baZlkIpRc-fIMNBIqI5bLA6FEvA/edit?usp=sharing) to view and download the complete Funding Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Funding Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### End Date Must Be After Start Date&#x20;

This rule ensures that the End Date is after the Start Date.&#x20;

| Validation Rule Detail  |                                                       |
| ----------------------- | ----------------------------------------------------- |
| Rule Name               | VAL\_FUNDING\_0001                                    |
| Error Message           | VAL\_0001: The End Date must be after the Start Date. |
| Error Location          | `End Date`                                            |

{% code title="Error Condition Formula" %}
```apex
maica_cc__Start_Date__c  > maica_cc__End_Date__c
```
{% endcode %}

### Claim Period Required When Funding Source is Home Care Package

Ensures that the Claim Period is provided when the Funding Source is Home Care Package.

| Validation Rule Detail  |                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| Rule Name               | VAL\_FUNDING\_0002                                                                         |
| Error Message           | VAL\_0002: Please ensure that the Claim Period is provided when the Funding Source is HCP. |
| Error Location          | `Top of Page`                                                                              |

{% code title="Error Condition Formula " %}
```apex
AND(
ISPICKVAL(maica_cc__Funding_Source__c, "Home Care Package"),
ISPICKVAL(maica_cc__Claim_Period__c, "")
)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Funding Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Plan Date Change Email Notification&#x20;

This flow is designed to send an email notification when the start or end date of a Funding record changes.&#x20;

| Flow Detail  |                                                           |
| ------------ | --------------------------------------------------------- |
| Flow Label   | Maica - Funding Date Change Email Notification Flow       |
| API Name     | maica\_\_Funding\_Date\_Change\_Email\_Notification\_Flow |
| Type         | `Autolaunched Flow`                                       |

#### Flow Summary

* This flow sends an email notification when the start or end date of a funding record changes.
* It determines the recipient based on the email settings.
* Sends the email using a specified template.
* Triggers on the update of a funding record.
* Runs asynchronously after the record is saved.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is triggered upon the update of a funding record.
   * The flow runs asynchronously after the record is saved.
   * Proceeds to a fake assignment to fix a packaging issue.
2. **Fake Assignment (Assignment)**:
   * This step exists to ensure the flow runs properly due to a packaging issue.
   * Proceeds to the decision step to check if the email template in the email setting is null.
3. **Is Template in Email Setting Null? (Decision)**:
   * Checks if the `templateFromEmailSetting` is null.
   * **No**: If the template is not null, proceeds to the decision step to determine the email recipient.
   * **Yes**: Ends the flow.
4. **To whom should this message be delivered? (Decision)**:
   * Checks the recipient from the email setting and determines who should receive the email.
   * **Recipient In Email Setting Equals Current Participant Owner**: Assigns the participant owner's ID to `UserIdToSendEmail` and proceeds to send the email.
   * **Recipient In Email Setting Equals User And User Id In Email Setting Is Not Null**: Assigns the user ID from the email setting to `UserIdToSendEmail` and proceeds to send the email.
5. **Set Plan Participant Owner Id (Assignment)**:
   * Assigns the participant owner's ID to `UserIdToSendEmail`.
   * Proceeds to send the email.
6. **Set User Id (Assignment)**:
   * Assigns the user ID from the email setting to `UserIdToSendEmail`.
   * Proceeds to send the email.
7. **Send Email (Apex Action)**:
   * Calls the `SendEmailInvocable` Apex action to send the email.
   * Passes the email template, from email address, and recipient ID as input parameters.
   * Ends the flow.

</details>

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Funding Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Funding Record Adjust Recurring Invoices&#x20;

This trigger is designed to manage the adjustment of recurring invoices for plans in Maica.

| Detail     |                                       |
| ---------- | ------------------------------------- |
| Load Order | 1                                     |
| Label      | `FundingAdjustRecurringInvoices_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `FundingAdjustRecurringInvoices_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the adjustment process for recurring invoices.

* **Trigger Conditions**:
  * When a new funding record (`maica_cc__Funding__c`) is created.
  * When an existing funding record is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a plan record is created or updated, the trigger is initialised. The `FundingAdjustRecurringInvoices_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `FundingAdjustRecurringInvoices_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The funding record data is validated to ensure it is complete and accurate.
     * **Adjustment**: Recurring invoices are adjusted based on changes to the funding record details, such as modifications to the services or billing frequency.
     * **Update**: The funding record is updated with the newly adjusted invoice data.

**Trigger Outcome**:

Once executed, the trigger ensures that recurring invoices for funding records are adjusted correctly, according to the logic specified in the handler class. This helps maintain accurate invoice data for funding records.

</details>
