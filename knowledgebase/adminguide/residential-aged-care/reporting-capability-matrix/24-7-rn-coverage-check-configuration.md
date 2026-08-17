# 24/7 RN Coverage Check Configuration

Providers must report 24/7 registered nurse (RN) coverage to GPMS each month, confirming whether a registered nurse was on duty and present for every hour of every day. Maica calculates this result from rostering data and records it as a coverage check, giving the facility manager the figures and the audit trail they need to complete the GPMS submission.

This article explains how the coverage check is calculated, how to run it, and how to read and use the result. It is written for administrators and facility managers.

{% hint style="info" %}
The coverage result also reflects the registered nurse eligibility that arrives in the monthly claim. This check is the provider's own coverage calculation for GPMS reporting; for the eligibility returned with the claim, see [Inbound Data APIs](../integration-architecture-and-event-lifecycle/inbound-data-apis.md).
{% endhint %}

## How coverage is calculated

The check looks at the registered nurse shifts worked at the facility during the month and works out whether every hour of every assessed day was covered.

* **Qualifying shifts.** A shift counts as RN coverage where the linked appointment service is classified as **Registered Nurse**. This is an explicit, auditable classification on the shift.
* **Actual times, not scheduled.** The check uses the resource's actual start and end times, and only includes shifts that were completed (the actual end time is recorded). A scheduled shift that was cancelled or not checked out does not contribute to coverage, which matches the regulatory intent.
* **Building the timeline.** For each assessed day, the check assembles the actual coverage windows, merges any that overlap, and identifies any hour with no qualifying RN on duty. Those are gap hours. Shifts that span midnight are split across the two calendar days.

The overall result is **Pass** when there are no gap hours, and **Fail** when there are any. A facility that qualifies for the Modified Monash exemption is recorded as **Exemption Applied**, where a reduced coverage standard applies.

{% hint style="info" %}
Each day is measured against its own real length rather than a fixed 1,440 minutes. Across a daylight saving transition the local day is genuinely 23 or 25 hours long, and measuring against a fixed figure charged the missing hour as a gap every spring-forward day, turning a fully staffed day into a Fail. A normal day still computes to exactly 1,440 minutes, so ordinary months are unaffected.
{% endhint %}

## The assessment window

The check assesses **complete calendar days only**. The window runs from the first of the coverage month to the earlier of the month end and **yesterday**, and that date is stamped on **Assessment Period End**.

The cap exists because coverage is derived from actual shift times. A shift in progress today has no actual end time recorded, so an uncapped window scored every remaining day of the month as a full 24-hour gap. A correctly staffed facility checked mid-month returned a plausible looking Fail on the record that backs the GPMS declaration.

A completed prior month is unaffected: its month end already falls before yesterday, so the whole month is assessed and only **Assessment Period End** is newly populated.

### Partial results

Where the assessed window is shorter than the coverage month, the result is partial. Three things follow:

| Behaviour                          | Detail                                                                                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Partial Month is ticked**        | A formula, so it cannot drift out of step with the dates it describes                                                                                                       |
| **Gap Detail leads with a caveat** | A first line naming the exact window assessed and directing the user to re-run after month end. Written even when there are no gaps, so a partial **Pass** still carries it |
| **GPMS Submitted is blocked**      | A validation rule prevents the confirmation while the record is partial                                                                                                     |

Re-running the check after the month has ended updates the same record in place, widens the window to the full month, clears the partial flag automatically, and preserves any GPMS submission confirmation already recorded.

{% hint style="warning" %}
**A run on the first day of a month, for that same month, is rejected before any calculation happens.** No complete day exists to assess, so Maica reports that no complete days are available and writes no record at all. The quick action withholds its Run button in that situation rather than allowing a submission that is certain to fail.
{% endhint %}

## Running the check

Run the check from the quick action on the **Location** record:

{% stepper %}
{% step %}
#### Open the facility's Location record
{% endstep %}

{% step %}
#### Launch the **RN coverage check** quick action
{% endstep %}

{% step %}
#### Select the month and year to assess
{% endstep %}

{% step %}
#### Run the calculation
{% endstep %}
{% endstepper %}

The check produces or updates one coverage record for the facility for that month. Running it again for the same month (for example after late timesheet corrections) overwrites the previous result; the prior outcome is retained in the field history on the coverage status.

The modal warns before the run when the selected month is the current one, so the user knows the result will be provisional before they commit to it.

{% hint style="success" %}
Because the calculation uses actual times, run the check after timesheets for the month have been confirmed, so completed shifts are reflected accurately. For the GPMS declaration, run it after month end.
{% endhint %}

## The coverage check record

Each run records its result on an **RN Coverage Check** record under the facility. The fields below capture the result and the GPMS submission tracking. The calculated fields are system-maintained and read-only; the two GPMS fields are filled in by the facility manager.

| Field                       | API name                     | Description                                                                                                                                                                                                            | Help text                                                                                                                            |
| --------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Coverage Month**          | `Coverage_Month__c`          | The month being assessed, stored as the first day of that month. Together with the facility, it identifies the coverage record.                                                                                        | The month being checked. Stored as the first day of that month.                                                                      |
| **Coverage Status**         | `Coverage_Status__c`         | The overall result for the month: Pass for full coverage with no gaps, Fail where one or more hours had no qualifying RN on duty, or Exemption Applied where the facility qualifies for the Modified Monash exemption. | Overall RN coverage result for this month. Set automatically when the coverage check is run.                                         |
| **Assessment Period End**   | `Assessment_Period_End__c`   | The last day actually assessed: the month end for a completed month, or yesterday for a run part-way through the current month.                                                                                        | The last complete day assessed by this check. Set automatically.                                                                     |
| **Partial Month**           | `Partial_Month__c`           | A formula, ticked whenever the assessed window is shorter than the coverage month. Because it is derived it cannot drift, and a completing re-run clears it automatically.                                             | Ticked when this result covers only part of the month. Re-run after month end for the GPMS declaration.                              |
| **Total RN Hours**          | `Total_RN_Hours__c`          | The total hours of qualifying RN coverage during the assessed period after merging overlapping shifts.                                                                                                                 | Total hours of RN coverage in this month after merging overlapping shifts. Set automatically.                                        |
| **Gap Hours**               | `Gap_Hours__c`               | The total hours in the assessed period with no qualifying RN on duty. Zero results in a Pass; any value above zero results in a Fail.                                                                                  | Total hours with no RN coverage this month. Zero means full coverage was achieved.                                                   |
| **Gap Detail**              | `Gap_Detail__c`              | A list of the specific dates and time windows where coverage gaps were found, used to investigate which shifts were missed. On a partial result it opens with a line naming the window assessed.                       | Dates and times where RN coverage gaps were found. Blank if no gaps. Use this to investigate missed shifts before GPMS submission.   |
| **Days With Gaps**          | `Days_With_Gaps__c`          | The number of distinct days in the assessed period that had at least one coverage gap, showing how widespread the gaps were.                                                                                           | Number of days in this month that had at least one coverage gap. Set automatically.                                                  |
| **MM Exemption Applicable** | `MM_Exemption_Applicable__c` | Whether the facility qualifies for the Modified Monash category 5 to 7 exemption (a remote facility with 30 or fewer operational beds), where a reduced coverage standard applies.                                     | Ticked if this facility qualifies for the MM 5-7 exemption (remote location, 30 or fewer beds). A reduced coverage standard applies. |
| **Run Date**                | `Run_Date__c`                | When the coverage calculation was last run for this month.                                                                                                                                                             | When this coverage check was last run. Updated each time the calculation is re-run for this month.                                   |
| **Run By**                  | `Run_By__c`                  | The user who ran the coverage check, for accountability.                                                                                                                                                               | The user who ran this coverage check. Set automatically.                                                                             |
| **GPMS Submitted**          | `GPMS_Submitted__c`          | Ticked by the facility manager once the GPMS coverage entry for the month is complete. This is a manual confirmation; it does not submit to GPMS. It cannot be ticked on a partial result.                             | Tick this after completing the GPMS submission for this month.                                                                       |
| **GPMS Submitted Date**     | `GPMS_Submitted_Date__c`     | The date the GPMS entry was completed, entered alongside the GPMS Submitted flag, useful for checking the submission was on time.                                                                                      | Date the GPMS submission was completed. Enter when you tick GPMS Submitted.                                                          |

Both **Assessment Period End** and **Partial Month** appear on the coverage check record page: the former alongside Coverage Month, the latter alongside Coverage Status so the provisional flag reads next to the result it qualifies.

### Validation rules

| Rule                                        | Effect                                                                                                                                   |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **GPMS Submission Requires Complete Month** | Blocks **GPMS Submitted** from being ticked while **Partial Month** is true, because the GPMS declaration requires a full calendar month |
| **Coverage Month Must Be A Month Start**    | **Coverage Month** must be populated and must be the first day of a month                                                                |
| **Assessed Result Requires Period End**     | A record carrying a **Run Date** must also carry an **Assessment Period End**                                                            |

{% hint style="info" %}
**Assessment Period End must be writable, not read-only,** in any bespoke permission set used by people who run the check. The quick action writes the record as the running user, so a read-only grant fails the run. **Partial Month** is a formula and is readable only. The packaged Create and Edit permission sets already grant this correctly.
{% endhint %}

## The Modified Monash exemption

A facility in Modified Monash category 5, 6, or 7 with 30 or fewer operational beds qualifies for a reduced coverage standard rather than full 24/7 coverage. The check reads the facility's Modified Monash classification and capacity from the Location record to decide whether the exemption applies, and records the result as **Exemption Applied** with the exemption flag ticked.

## Shift types and the coverage query

The Shift record type carries several direct care worker classifications: Registered Nurse, Enrolled Nurse, Personal Care Worker and Assistant in Nursing. These are the Department's categories for care minutes reporting.

{% hint style="info" %}
The RN coverage check qualifies shifts on **Registered Nurse** alone, so the additional classifications do not affect a coverage result. They are used by the Care Minutes Check, which counts all four. See [Care Minutes Check Configuration](care-minutes-check-configuration.md).
{% endhint %}

## Using the result for GPMS

The coverage record gives the facility manager everything needed for the monthly GPMS entry: the pass or fail result, the total RN and gap hours, and the gap detail to investigate any misses. GPMS submissions are due by the 7th of the following month.

Run the check after month end so the record covers the whole month, confirm **Partial Month** is not ticked, complete the GPMS entry, then tick **GPMS Submitted** and record the date so Maica holds a simple compliance trail. The check does not submit to GPMS directly.
