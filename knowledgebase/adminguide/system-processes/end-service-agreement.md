---
description: Learn about the process behind Ending a Service Agreement in Maica
---

# End Service Agreement

The **End Agreement** process in **Maica** is an automated system event that manages the structured conclusion of a Participant’s Service Agreement. It ensures that once an Agreement is ended, all associated records are updated consistently — including **Agreement Items**, **Appointments**, and **Delivery Activities** — while maintaining audit integrity and data alignment across the system.

### Purpose

The process allows Providers to conclude Service Agreements in a compliant, auditable, and system-driven manner. When a Service Agreement is ended (either immediately or on a future date), Maica:

* Updates the **End Date**, **Status**, and **Cancellation Reason** on the Service Agreement
* Aligns related **Agreement Item End Dates**
* Cancels all **Appointments** and **Delivery Activities** scheduled after the End Date
* Runs a **scheduled process** to automatically mark the Agreement as inactive once the End Date has passed

### Technical Overview

The End Agreement process operates through a combination of **Automation** and **Validation Rules**. All actions are initiated from the **End Agreement Quick Action**, available on active Service Agreement records.

| Component                                               | Type                            | Purpose                                                                                             |
| ------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| **End Agreement**                                       | Quick Action                    | Launches the Service Agreement cancellation process.                                                |
| **Maica – Cancellation Automation – Service Agreement** | Screen Flow                     | Core automation handling cancellation logic, field updates, and record queries.                     |
| **Maica – Service Agreement Cancellation Scheduler**    | Scheduled Record-Triggered Flow | Executes at midnight following the End Date to finalise the Agreement status.                       |
| **GetServiceAgreementCancellationInvocable**            | Apex Class                      | Retrieves and processes related Agreement Items, Appointments, and Delivery Activities efficiently. |

### Logic Summary

#### Service Agreement Updates

When a user confirms an Agreement end:

* `maica_cc__End_Date__c` → updated to entered End Date
* `maica_cc__Cancellation_Reason__c` → populated from user input
* `maica_cc__Cancellation_Reason_Other__c` → populated if “Other” selected
* `maica_cc__Status__c` → set to _Cancelled_ (if End Date = today)
* If End Date is in the future, record remains _Active_ until midnight on that date

**Validation**

* _**VAL\_SERVICE\_AGREEMENT\_0006**:_ Ensures “Other” details are entered if “Other” is selected.
* _**VAL\_AGREEMENT\_ITEM\_0003**:_ Prevents Agreement Items from falling outside Service Agreement date boundaries.

#### Agreement Item Alignment

All Agreement Items linked via `Service_Agreement__c` are updated so that:

* `maica_cc__End_Date__c` = Service Agreement `maica_cc__End_Date__c`
* If an Agreement Item’s existing End Date is **earlier**, it remains unchanged.
* If an Agreement Item’s Start Date is **after** the new End Date, the Start Date is cleared to bypass validation conflicts.

This maintains strict date consistency between the Service Agreement and its Agreement Items.

#### Appointment and Delivery Activity Handling

**1:1 Appointments**

For Appointments where the Participant is the only attendee:

* `maica_cc__Status__c` = _Cancelled_
* `maica_cc__Cancellation_Date__c` = `DateTime.now()`
* `maica_cc__Cancellation_Reason__c` = _Service Agreement Ended_ (added as new picklist value)

All linked Delivery Activities are also updated:

* `maica_cc__Status__c` = _Cancelled_
* `maica_cc__Billing_Status__c` = _Do Not Bill_

**Group Appointments**

For multi-participant Appointments:

* The Appointment remains _Active_
* Only Delivery Activities where `maica_cc__Participant__c = [ending participant]` are updated to:
  * `Status` = _Cancelled_
  * `Billing Status` = _Do Not Bill_

This ensures that ending one Participant’s Service Agreement does not affect others in the same session.

#### Scheduled Cancellation

If the End Date is set to a future date, the Service Agreement remains active until midnight on that date.\
At midnight, the **Maica – Service Agreement Cancellation Scheduler** flow runs and finalises the cancellation automatically.

| Field                       | Update    |
| --------------------------- | --------- |
| `maica_cc__Is_Cancelled__c` | TRUE      |
| `maica_cc__Status__c`       | Cancelled |

{% hint style="info" %}
The End Agreement Quick Action is also hidden once `Is_Cancelled__c = TRUE`.  Quick Action visibility is driven by `Is_Cancelled__c` rather than `Active__c`, ensuring that Agreements ended early but still within date range are handled correctly.
{% endhint %}

### Key Fields

| Object                      | Field                                                                                       | Purpose                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Service\_Agreement\_\_c** | `maica_cc__End_Date__c`                                                                     | Defines the last valid date of the Agreement.                        |
|                             | `maica_cc__Cancellation_Reason__c`                                                          | Captures the primary reason for cancellation.                        |
|                             | `maica_cc__Cancellation_Reason_Other__c`                                                    | Records further detail if “Other” selected.                          |
|                             | `maica_cc__Is_Cancelled__c`                                                                 | Indicates whether the Agreement has been finalised by the scheduler. |
| **Agreement\_Item\_\_c**    | `maica_cc__End_Date__c`                                                                     | Updated to match the parent Service Agreement.                       |
| **Appointment\_\_c**        | `maica_cc__Status__c`, `maica_cc__Cancellation_Date__c`, `maica_cc__Cancellation_Reason__c` | Populated when an Appointment is cancelled.                          |
| **Delivery\_Activity\_\_c** | `maica_cc__Status__c`, `maica_cc__Billing_Status__c`                                        | Defines whether the Delivery Activity should be billed.              |

### Example Scenarios

<table><thead><tr><th width="287.0322265625">Scenario</th><th>System Behaviour</th></tr></thead><tbody><tr><td><strong>Immediate Cancellation</strong></td><td>If End Date = today, all records update instantly and the Agreement is cancelled immediately.</td></tr><tr><td><strong>Future-Dated Cancellation</strong></td><td>The Agreement remains active until the End Date passes; scheduler finalises the cancellation at midnight.</td></tr><tr><td><strong>Participant in Group Appointment</strong></td><td>Only the Participant’s Delivery Activities are cancelled; the Appointment remains active for others.</td></tr><tr><td><strong>Agreement Item Date Conflict</strong></td><td>Start Date cleared if it falls after the new End Date to avoid validation failure.</td></tr></tbody></table>

### Technical Architecture Summary

```apex
Trigger: End Agreement Quick Action (Service_Agreement__c)
      ↓
Flow: Maica – Cancellation Automation – Service Agreement
      ↓
Apex: GetServiceAgreementCancellationInvocable
      ↓
Record Updates:
   • Service_Agreement__c (End Date, Status, Reason)
   • Agreement_Item__c (End Date alignment)
   • Appointment__c (Cancel future Appointments)
   • Delivery_Activity__c (Cancel future records)
      ↓
Scheduled Flow: Maica – Service Agreement Cancellation Scheduler
      ↓
Final Outcome:
   • Agreement marked Cancelled
   • Quick Action hidden
   • Participant removed from future sessions

```
