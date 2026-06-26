# Accommodation Balance Reporting

Providers must report each resident's refundable accommodation balance (RAD or RAC) to Services Australia every month, as required by the Aged Care Act 2024. The balance is reported as at the last day of the claim month, and reporting must be completed before the monthly claim can be finalised.

This article explains the accommodation balance record, the monthly submission workflow, and the gate that prevents a claim from being finalised while balances are outstanding. It is written for administrators and power users.

{% hint style="danger" %}
The **Accommodation Balance** data model (the record, its fields and access permissions) is present in the current build, but the automated monthly submission to Services Australia (the submission batch, the **Submit Accommodation Balances** quick action, and the Services Australia callout) could not be confirmed in the current `release-production` code. Treat the submission and gate workflow described below as the intended design and confirm the automation status with the engineering team before relying on it or publishing this article.
{% endhint %}

## Why balances are reported

Accommodation balance reporting is a monthly reporting action, not a real-time or per-transaction one. The balance movements that occur during the month (a deposit, a top-up, a drawdown, a refund) are tracked internally by the billing engine as lump sum transactions. The accommodation balance submission is a separate, deliberate month-end step that communicates the closing balance position to Services Australia.

{% hint style="info" %}
The lump sum account and its transactions are the provider's internal financial ledger. The accommodation balance submission is the external monthly report. To understand the ledger side, see [The lump sum account model](../the-lump-sum-account-model/).
{% endhint %}

## The accommodation balance record

Each monthly balance report is held as an **Accommodation Balance** record. One record is created per resident, per claim month, per submission. The record links to the resident's lump sum account and to the claim batch for the month, and it captures both what was reported and how the submission was received.

The fields below are the ones you will work with most often.

| Field                 | API name                          | Description                                                                                                                                            | Help text                                                                                |
| --------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Lump Sum Account**  | `Lump_Sum_Account__c`             | The lump sum account this balance report relates to, which provides the balance amount and deposit type.                                               | The resident's lump sum account (RAD or RAC) this balance report is for.                 |
| **Claim Batch**       | `Claim_Batch__c`                  | The monthly claim batch that generated this submission, linking the balance to the claim cycle and the facility.                                       | The monthly claim batch this balance was submitted as part of.                           |
| **Balance Type**      | `Accommodation_Balance_Type__c`   | The accommodation arrangement being reported for the resident, such as a refundable deposit, a contribution, or a supported resident with no lump sum. | The type of accommodation arrangement for this resident.                                 |
| **Balance Amount**    | `Accommodation_Balance_Amount__c` | The RAD or RAC balance as at the effective date, as submitted to Services Australia. Applies only to RAD and RAC balance types.                        | The accommodation balance amount submitted to Services Australia.                        |
| **Balance Reason**    | `Accommodation_Balance_Reason__c` | The reason describing the main balance movement this month, such as a payment received, a refund, or no change.                                        | The reason for the balance change this month (e.g. payment received, refund, no change). |
| **Effective Date**    | `Effective_Date__c`               | The date the balance is reported as at. This is the last day of the claim month, or the departure date for a resident who left during the month.       | The date the reported balance applies to.                                                |
| **Submission Status** | `Submission_Status__c`            | The status of this balance report within Maica as it moves through submission, correction or deletion.                                                 | The current status of this balance submission in Maica.                                  |
| **SA Status**         | `SA_Status__c`                    | The status returned by Services Australia for the submission.                                                                                          | Whether Services Australia has accepted or deleted this balance submission.              |
| **Error Message**     | `Error_Message__c`                | The error detail returned by Services Australia when a submission fails, so you can resolve it before resubmitting.                                    | The error returned by Services Australia. Review and correct before resubmitting.        |

### The submission lifecycle

The **Submission Status** field tracks where a balance report is in its lifecycle within Maica:

| Status        | Meaning                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| **Pending**   | The record has been created but not yet submitted to Services Australia.    |
| **Submitted** | Services Australia accepted the submission.                                 |
| **Failed**    | The submission was rejected or errored. The reason is in **Error Message**. |
| **Corrected** | A correction to a prior submission was accepted.                            |
| **Deleted**   | The submission was deleted at Services Australia.                           |

{% hint style="info" %}
Services Australia itself recognises only two outcomes for a balance, reflected in **SA Status**: **Accepted** and **Deleted**. There is no held or superseded state for accommodation balances, unlike the event APIs. For the event status model, see [Integration architecture and event lifecycle](./).
{% endhint %}

## The monthly submission workflow

The submission is designed to run as a discrete step in the monthly claim cycle, after the billing engine has run and before the claim is finalised:

1. The billing engine runs for the month, creating invoices and lump sum transactions.
2. Maica polls Services Australia for the claim data.
3. **Accommodation balances are submitted** for all eligible residents (the step described here).
4. The unsubmitted balance gate check confirms no resident is missing a balance.
5. The claim is finalised.

For each eligible resident, the submission derives the balance type, the balance amount as at month end, and the reason code from the month's lump sum transactions, then creates an Accommodation Balance record and submits it. A resident who already has a submission for the month is skipped, so the step is safe to re-run.

{% hint style="info" %}
Corrections use the standard create, update and delete operations. A correction or deletion re-fetches the current Services Australia concurrency token first, so a change is never applied against a stale version of the balance.
{% endhint %}

## The pre-claim gate

Before a claim is finalised, Maica asks Services Australia which residents it considers to be missing a balance submission for the month. This is the gate that enforces the legislative requirement to report balances before finalising.

* If no residents are returned, finalisation proceeds.
* If residents are returned, finalisation is blocked and the outstanding residents are listed so you can resolve them, either by re-running the submission or by submitting individual balance records.

Once the outstanding balances are resolved, you re-attempt finalisation and the gate check runs again.

{% hint style="warning" %}
Residents who do not require a balance (for example a supported resident with no lump sum) may appear in the unsubmitted list as advisory items. These can be acknowledged without blocking finalisation, whereas residents with a genuine RAD or RAC balance remain hard-blocking until reported.
{% endhint %}

{% hint style="info" %}
For the claim finalisation step that this gate protects, see the Claims section of [Inbound data APIs](inbound-data-apis.md). For the resident-facing view of balances and refunds, see [Refunding lump sum deposits](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/refunding-lump-sum-deposits) in the User Guide.
{% endhint %}
