# Accommodation Balance Reporting

Providers must report each resident's refundable accommodation balance (RAD or RAC) to Services Australia every month, as required by the Aged Care Act 2024. The balance is reported as at the last day of the claim month. Maica reports these balances from the monthly **Claim Batch**, drawing on the deposit position tracked on each resident's lump sum account.

This article explains the **Accommodation Balance** record, the fields it carries, and the submission, correction and deletion workflow as it is built. It is written for administrators and power users.

{% hint style="info" %}
The lump sum account and its transactions are the provider's internal financial ledger. The accommodation balance submission is the external monthly report to Services Australia. To understand the ledger side, see [The Lump Sum Account Model](../the-lump-sum-account-model/).
{% endhint %}

## Why balances are reported

Accommodation balance reporting is a monthly reporting action, not a real-time or per-transaction one. The balance movements that occur during the month (a deposit, a top-up, a drawdown, a refund) are tracked internally as lump sum transactions. The accommodation balance submission is a separate, deliberate month-end step that communicates the closing balance position to Services Australia.

## The Accommodation Balance record

Each monthly balance report is held as an **Accommodation Balance** record (`Accommodation_Balance__c`). A record links to the resident's lump sum account and to the claim batch for the month, and captures both what was reported and how Services Australia received it.

| Field                        | API name                          | Description                                                                                                                             |
| ---------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Lump Sum Account**         | `Lump_Sum_Account__c`             | The resident's lump sum account (RAD or RAC) this balance report relates to                                                             |
| **Claim Batch**              | `Claim_Batch__c`                  | The monthly claim batch this balance was submitted as part of                                                                           |
| **Balance Type**             | `Accommodation_Balance_Type__c`   | The accommodation arrangement being reported (see values below)                                                                         |
| **Balance Amount**           | `Accommodation_Balance_Amount__c` | The RAD or RAC balance as at the effective date, as submitted to Services Australia                                                     |
| **Balance Reason**           | `Accommodation_Balance_Reason__c` | The reason describing the main balance movement this month (see values below)                                                           |
| **Effective Date**           | `Effective_Date__c`               | The date the balance is reported as at: the last day of the claim month, or the departure date for a resident who left during the month |
| **Response Status**          | `Response_Status__c`              | The status returned by Services Australia for the submission                                                                            |
| **Accommodation Balance ID** | `Accommodation_Balance_ID__c`     | The identifier Services Australia assigns to the submission, required for any later correction or deletion                              |
| **Aged Care ETag**           | `Aged_Care_ETAG__c`               | The concurrency token returned with the last response, sent back as the `if-match` header on a correction or deletion                   |
| **Submitted At**             | `Submitted_At__c`                 | When the balance was submitted                                                                                                          |
| **Error Message**            | `Error_Message__c`                | The error detail returned by Services Australia when a submission fails, so it can be resolved before resubmitting                      |

### Balance Type values

| Value        | Label      | Meaning                                                                |
| ------------ | ---------- | ---------------------------------------------------------------------- |
| `RAD`        | RAD        | Refundable Accommodation Deposit                                       |
| `RAC`        | RAC        | Refundable Accommodation Contribution                                  |
| `NOT_NEEDED` | Not Needed | No balance applies for the resident                                    |
| `NO_DEPOSIT` | No Deposit | No lump sum was paid                                                   |
| `UNDECIDED`  | Undecided  | The resident is still within their accommodation payment choice period |

### Balance Reason values

| Value              | Label            | Meaning                                                 |
| ------------------ | ---------------- | ------------------------------------------------------- |
| `Regular drawdown` | Regular Drawdown | A routine drawdown against the balance                  |
| `PAID_IN`          | Paid In          | A payment was received                                  |
| `TOP_UP`           | Top Up           | The resident topped up their balance                    |
| `PART_REF`         | Partial Refund   | A partial refund was made                               |
| `FULL_REF`         | Full Refund      | The balance was fully refunded                          |
| `NO_CHG`           | No Change        | No movement this month                                  |
| `ERR_LAST`         | Error Last       | A correction to a previous submission that was in error |

### Services Australia response status

Unlike the event APIs, an accommodation balance has only two Services Australia outcomes, held in **Response Status**:

| Response Status | Meaning                                                          |
| --------------- | ---------------------------------------------------------------- |
| **Accepted**    | Services Australia has acknowledged the submission               |
| **Deleted**     | The submission has been removed from Services Australia's system |

{% hint style="info" %}
There is no held or superseded state for accommodation balances. For the event status model that does use those states, see [Integration Architecture and Event Lifecycle](file:///).
{% endhint %}

## Submitting balances for the month

Balances are submitted from the monthly **Claim Batch** using the accommodation balance submission action. The action opens a modal that previews the residents for the claim month, grouped by what can be done with each, and then submits the eligible balances one at a time.

### The submission preview

When the modal opens, it groups the month's residents into four lists so you can see the position before submitting anything:

| Group             | What it contains                                          |
| ----------------- | --------------------------------------------------------- |
| **Eligible**      | Balances ready to submit to Services Australia            |
| **Submitted**     | Balances already submitted for this claim month           |
| **Deleted**       | Balances that have been deleted at Services Australia     |
| **Cannot submit** | Residents that cannot be submitted, with the reason shown |

### Running the submission

Selecting submit sends each eligible balance to Services Australia **one at a time**, showing progress as it works through the list. Each balance is created at Services Australia through the accommodation balance API, and the response (including the assigned balance ID and ETag) is written back onto the Accommodation Balance record.

* If every balance succeeds, the modal reports success for the full count.
* If some fail, the modal reports how many failed so you can review the errors and retry. A failed balance records its **Error Message**, and the rest of the batch still completes.

{% hint style="success" %}
A resident who already has a submission for the month appears under **Submitted**, not **Eligible**, so re-running the action does not submit the same resident twice. Attempting to submit an already-submitted balance directly returns a message directing you to use **Correct** instead.
{% endhint %}

### The Claim Batch submission stamp

When the submission action finishes, it stamps the Claim Batch so the month's progress is visible on the record:

| Field                         | API name                           | Values                                                                                |
| ----------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| **Balance Submission Status** | `Acc_Balance_Submission_Status__c` | **Complete** (all balances submitted successfully) or **Failed** (one or more failed) |
| **Balance Submitted At**      | `Acc_Balance_Submitted_At__c`      | The time the submission action last ran                                               |

## Correcting and deleting a submitted balance

Once a balance has been submitted, the modal offers per-resident actions to keep it aligned with Services Australia:

* **Sync** re-reads the balance from Services Australia and refreshes the Maica record.
* **Correct** opens a modal to submit a corrected balance, replacing the value held at Services Australia.
* **Delete** removes the submission at Services Australia.

{% hint style="warning" %}
Corrections and deletions are concurrency-protected. Both send the stored ETag in the `if-match` header, and Maica re-fetches the current balance from Services Australia first so the change is never applied against a stale version. If the balance changed at Services Australia since Maica last read it, the ETag no longer matches and the change is refused.
{% endhint %}

## The unsubmitted-balance check

Services Australia can report which residents it considers to be missing a balance submission for the claim month. Maica includes the integration primitive for this check (scoped by the 10-character Services Australia Service ID on the Location).
