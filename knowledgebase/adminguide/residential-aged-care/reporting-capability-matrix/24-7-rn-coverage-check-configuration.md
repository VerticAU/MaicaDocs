# 24/7 RN Coverage Check Configuration

Providers must report 24/7 registered nurse (RN) coverage to GPMS each month, confirming whether a registered nurse was on duty and present for every hour of every day. Maica calculates this result from rostering data and records it as a coverage check, giving the facility manager the figures and the audit trail they need to complete the GPMS submission.

This article explains how the coverage check is calculated, how to run it, and how to read and use the result. It is written for administrators and facility managers.

{% hint style="info" %}
The coverage result also reflects the registered nurse eligibility that arrives in the monthly claim. This check is the provider's own coverage calculation for GPMS reporting; for the eligibility returned with the claim, see [Inbound data APIs](/broken/pages/b4be395b86720f94e7ab5eeaa756b489f3111300).
{% endhint %}

## How coverage is calculated

The check looks at the registered nurse shifts worked at the facility during the month and works out whether every hour was covered.

* **Qualifying shifts.** A shift counts as RN coverage where the linked appointment service is classified as **Registered Nurse**. This is an explicit, auditable classification on the shift.
* **Actual times, not scheduled.** The check uses the resource's actual start and end times, and only includes shifts that were completed (the actual end time is recorded). A scheduled shift that was cancelled or not checked out does not contribute to coverage, which matches the regulatory intent.
* **Building the timeline.** For each day of the month, the check assembles the actual coverage windows, merges any that overlap, and identifies any hour with no qualifying RN on duty. Those are gap hours. Shifts that span midnight are split across the two calendar days.

The overall result is **Pass** when there are no gap hours, and **Fail** when there are any. A facility that qualifies for the Modified Monash exemption is recorded as **Exemption Applied**, where a reduced coverage standard applies.

## Running the check

Run the check from the quick action on the **Location** record:

1. Open the facility's Location record.
2. Launch the **RN coverage check** quick action.
3. Select the month and year to assess.
4. Run the calculation.

The check produces or updates one coverage record for the facility for that month. Running it again for the same month (for example after late timesheet corrections) overwrites the previous result; the prior outcome is retained in the field history on the coverage status.

{% hint style="success" %}
Because the calculation uses actual times, run the check after timesheets for the month have been confirmed, so completed shifts are reflected accurately.
{% endhint %}

## The coverage check record

Each run records its result on an **RN Coverage Check** record under the facility. The fields below capture the result and the GPMS submission tracking. The calculated fields are system-maintained and read-only; the two GPMS fields are filled in by the facility manager.

| Field                       | API name                     | Description                                                                                                                                                                                                            | Help text                                                                                                                            |
| --------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Coverage Month**          | `Coverage_Month__c`          | The month being assessed, stored as the first day of that month. Together with the facility, it identifies the coverage record.                                                                                        | The month being checked. Stored as the first day of that month.                                                                      |
| **Coverage Status**         | `Coverage_Status__c`         | The overall result for the month: Pass for full coverage with no gaps, Fail where one or more hours had no qualifying RN on duty, or Exemption Applied where the facility qualifies for the Modified Monash exemption. | Overall RN coverage result for this month. Set automatically when the coverage check is run.                                         |
| **Total RN Hours**          | `Total_RN_Hours__c`          | The total hours of qualifying RN coverage during the month after merging overlapping shifts.                                                                                                                           | Total hours of RN coverage in this month after merging overlapping shifts. Set automatically.                                        |
| **Gap Hours**               | `Gap_Hours__c`               | The total hours in the month with no qualifying RN on duty. Zero results in a Pass; any value above zero results in a Fail.                                                                                            | Total hours with no RN coverage this month. Zero means full coverage was achieved.                                                   |
| **Gap Detail**              | `Gap_Detail__c`              | A list of the specific dates and time windows where coverage gaps were found, used to investigate which shifts were missed. Blank when the status is Pass.                                                             | Dates and times where RN coverage gaps were found. Blank if no gaps. Use this to investigate missed shifts before GPMS submission.   |
| **Days With Gaps**          | `Days_With_Gaps__c`          | The number of distinct days in the month that had at least one coverage gap, showing how widespread the gaps were.                                                                                                     | Number of days in this month that had at least one coverage gap. Set automatically.                                                  |
| **MM Exemption Applicable** | `MM_Exemption_Applicable__c` | Whether the facility qualifies for the Modified Monash category 5 to 7 exemption (a remote facility with 30 or fewer operational beds), where a reduced coverage standard applies.                                     | Ticked if this facility qualifies for the MM 5-7 exemption (remote location, 30 or fewer beds). A reduced coverage standard applies. |
| **Run Date**                | `Run_Date__c`                | When the coverage calculation was last run for this month.                                                                                                                                                             | When this coverage check was last run. Updated each time the calculation is re-run for this month.                                   |
| **Run By**                  | `Run_By__c`                  | The user who ran the coverage check, for accountability.                                                                                                                                                               | The user who ran this coverage check. Set automatically.                                                                             |
| **GPMS Submitted**          | `GPMS_Submitted__c`          | Ticked by the facility manager once the GPMS coverage entry for the month is complete. This is a manual confirmation; it does not submit to GPMS.                                                                      | Tick this after completing the GPMS submission for this month.                                                                       |
| **GPMS Submitted Date**     | `GPMS_Submitted_Date__c`     | The date the GPMS entry was completed, entered alongside the GPMS Submitted flag, useful for checking the submission was on time.                                                                                      | Date the GPMS submission was completed. Enter when you tick GPMS Submitted.                                                          |

## The Modified Monash exemption

A facility in Modified Monash category 5, 6, or 7 with 30 or fewer operational beds qualifies for a reduced coverage standard rather than full 24/7 coverage. The check reads the facility's Modified Monash classification and capacity from the Location record to decide whether the exemption applies, and records the result as **Exemption Applied** with the exemption flag ticked.

## Using the result for GPMS

The coverage record gives the facility manager everything needed for the monthly GPMS entry: the pass or fail result, the total RN and gap hours, and the gap detail to investigate any misses. GPMS submissions are due by the 7th of the following month. After completing the entry, tick **GPMS Submitted** and record the date, so Maica holds a simple compliance trail. The check does not submit to GPMS directly.

## Related articles

{% hint style="info" %}
* [Reporting capability matrix](/broken/pages/efe6cc4b66d9e57081be81f7fb8483813e396fba)
* [QFR report configuration](/broken/pages/89bd1007b38bb0f77edf9228da0a3147182bf20d)
* [Inbound data APIs](/broken/pages/b4be395b86720f94e7ab5eeaa756b489f3111300)
* [The RACS data model](/broken/pages/d7be69b5f2100d0d8a11db0ec4f4f0af5de424b0)
{% endhint %}
