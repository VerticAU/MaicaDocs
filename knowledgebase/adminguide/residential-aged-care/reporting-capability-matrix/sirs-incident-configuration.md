# SIRS Incident Configuration

The Serious Incident Response Scheme (SIRS) requires providers to notify the Aged Care Quality and Safety Commission (ACQSC) of reportable incidents within set deadlines. Maica supports this by extending the Incident record with SIRS fields, revealing a SIRS compliance section when an incident is marked reportable, and providing packaged reports and a dashboard to track notifications. Submission to the ACQSC portal remains a manual provider action; there is no government API for SIRS.

This article explains the SIRS fields, the conditional page section, the notification deadlines, and the packaged reporting. It is written for administrators.

## Marking an incident reportable

The **SIRS Reportable** checkbox sits on the main Incident record, always visible. The incident manager ticks it to confirm the incident meets the SIRS reportable threshold. Maica does not decide reportability automatically; it is a manual judgement. Ticking the box reveals the **SIRS Compliance** section on the record, where the rest of the SIRS detail is captured.

{% hint style="info" %}
The **SIRS Compliance** section is hidden until **SIRS Reportable** is ticked, so non-reportable incidents stay uncluttered. The checkbox itself is always visible so it can be ticked at any time.
{% endhint %}

## The SIRS fields

The SIRS extension adds the following fields to the Incident record. The notification due date is calculated and read-only; the rest are completed by the incident manager as the notification progresses.

| Field                        | API name                      | Description                                                                                                                                                          | Help text                                                                                            |
| ---------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **SIRS Reportable**          | `SIRS_Reportable__c`          | Confirms the incident meets the SIRS reportable threshold. When ticked, the SIRS compliance section appears and the notification process begins.                     | Tick to confirm this incident is reportable under SIRS. This will reveal the SIRS compliance fields. |
| **SIRS Category**            | `SIRS_Category__c`            | The SIRS category the notification will be lodged under, describing the nature of the incident.                                                                      | Select the SIRS category that applies to this incident.                                              |
| **SIRS Priority**            | `SIRS_Priority__c`            | The notification priority, which sets the deadline. Priority 1 requires notification within 24 hours; Priority 2 within 30 days.                                     | P1 - notify ACQSC within 24 hours. P2 - notify within 30 days.                                       |
| **Notification Due**         | `SIRS_Notification_Due__c`    | The deadline by which the ACQSC notification must be completed, calculated automatically from the incident date and the selected priority.                           | The deadline for ACQSC notification. Calculated automatically from incident date and priority.       |
| **SIRS Notification Status** | `SIRS_Notification_Status__c` | The progress of the notification, from pending through to submitted, closed or withdrawn.                                                                            | Track the progress of this SIRS notification from Pending through to Closed.                         |
| **ACQSC Reference Number**   | `SIRS_ACQSC_Reference__c`     | The reference number the ACQSC portal assigns when the notification is submitted.                                                                                    | Enter the reference number from the ACQSC portal once you have submitted the notification.           |
| **SIRS Submitted Date**      | `SIRS_Submitted_Date__c`      | The date the notification was completed in the My Aged Care portal.                                                                                                  | The date you completed the SIRS notification in the My Aged Care portal.                             |
| **Submitted By**             | `SIRS_Submitted_By__c`        | The user who completed the portal submission.                                                                                                                        | Select the user who completed the ACQSC portal submission.                                           |
| **Police Report Required**   | `Police_Report_Required__c`   | Indicates a police report is required, typically for Priority 1 incidents involving potential criminal conduct or unexplained death, within the same 24-hour window. | Tick if this incident requires a police report within 24 hours.                                      |
| **Police Report Reference**  | `Police_Report_Reference__c`  | The reference number provided by police once the report has been lodged.                                                                                             | Enter the police incident reference number once the report has been made.                            |

### Notification priorities and deadlines

The **SIRS Priority** drives the **Notification Due** deadline:

| Priority                                | Deadline                                 |
| --------------------------------------- | ---------------------------------------- |
| **Priority 1 - Notify within 24 hours** | 24 hours from the incident date and time |
| **Priority 2 - Notify within 30 days**  | 30 days from the incident date           |

Maica calculates **Notification Due** from the incident date and time plus the window for the selected priority, so the deadline is always visible on the record without manual calculation.

## Tracking submission status

As the notification progresses, the incident manager updates the **SIRS Notification Status** and records the outcome:

| Status        | Meaning                                                  |
| ------------- | -------------------------------------------------------- |
| **Pending**   | Reportable, notification not yet submitted (the default) |
| **Submitted** | The notification has been lodged in the ACQSC portal     |
| **Closed**    | The ACQSC has closed the case                            |
| **Withdrawn** | The notification was withdrawn                           |

After lodging the notification, record the **ACQSC Reference Number**, the **SIRS Submitted Date**, and the user in **Submitted By**, so the record holds a complete compliance trail.

## Reports and dashboard

Maica packages six SIRS reports in the **MAICA RACS - SIRS Compliance** report folder, built on a dedicated SIRS incidents report type:

| Report                         | Purpose                                                            |
| ------------------------------ | ------------------------------------------------------------------ |
| **Open P1 incidents**          | Priority 1 incidents still pending, by deadline and location       |
| **Open P2 incidents**          | Priority 2 incidents still pending, by deadline and location       |
| **Overdue notifications**      | Pending incidents whose notification deadline has passed           |
| **Submissions month to date**  | Submitted incidents this month, by category and location           |
| **Submissions year to date**   | Submitted incidents this financial year, by category and location  |
| **Average time to submission** | Average days from incident to submission, by priority and location |

These feed the packaged **SIRS Compliance Dashboard**, which shows the operational urgency view (open P1 count, overdue count, and an open incidents table) alongside the governance view (month-to-date and year-to-date submissions and the average days to submission). The dashboard includes an optional location filter that is available but not applied by default.

{% hint style="warning" %}
The reports and dashboard help providers monitor and meet their notification deadlines, but they do not submit anything to the ACQSC. The notification itself must be lodged manually in the My Aged Care portal, and the result recorded back on the incident.
{% endhint %}

## Related articles

* [Reporting capability matrix](/broken/pages/efe6cc4b66d9e57081be81f7fb8483813e396fba)
* [Managing SIRS notifications](/broken/pages/9f1604f9658cd8cbcf07202a6245668d5bcd9cb4)
* [The RACS data model](/broken/pages/d7be69b5f2100d0d8a11db0ec4f4f0af5de424b0)
