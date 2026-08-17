# Care Minutes

The **Care Minutes Check** measures the direct care minutes your facility delivered against the targets published for it, and projects where the quarter will land if the remaining roster is worked as planned.

It is built for steering a quarter while it is still running. A shortfall found in week four can be corrected by rostering more shifts in the weeks that follow, which is why the check is designed to be run repeatedly rather than once at quarter end.

## Where do I find it?

Open the **Location** record for the facility and choose **Run Care Minutes Check** from the highlights panel. Completed checks are listed under **Care Minutes Checks** on the same record.

## Running the check

Choose a quarter and select **Run**. The picker offers the current quarter and the four before it, and defaults to the current one.

A few rules apply to the period:

* Only calendar quarters can be checked, beginning 1 January, 1 April, 1 July or 1 October.
* A future quarter cannot be checked.
* The current quarter can be checked from its **second day** onwards. On the first day no complete day exists to assess, so the check reports that and writes nothing.

There is one record per facility per quarter. Running the check again for the same quarter updates that record rather than creating a second one, so the figures always reflect the most recent run.

{% hint style="info" %}
Re-running preserves the targets you entered, the target source date and any notes on the record. Only the calculated figures are replaced.
{% endhint %}

## What the check assesses

The check only ever assesses **complete days**. The assessed period runs from the start of the quarter to the earlier of the quarter end and yesterday, and the record shows that date as **Assessment Period End**.

Stopping at yesterday is deliberate. A shift still running today would add its minutes to the numerator while today's occupied bed days had not yet been counted, which would make every in-flight result read high.

A result covering less than the whole quarter is flagged as a **partial quarter**. For twelve of the thirteen weeks in a quarter that is the normal state, not a problem.

{% hint style="warning" %}
Where the assessed window is shorter than a fortnight, treat the average with particular caution. Over a short window the result is dominated by whichever days of the week happened to fall inside it, and weekday and weekend staffing patterns differ.
{% endhint %}

## Reading the result

### The two figures that matter

| Figure                                 | What it means                                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Delivered Minutes Per Resident Day** | Direct care minutes actually worked in the assessed period, divided by subsidised care days in the same period  |
| **Projected Minutes Per Resident Day** | The same measure carried out to quarter end, assuming the remaining roster is worked and occupancy holds steady |

Each has an RN equivalent, because the Department sets a separate registered nurse target as well as a total.

### Compliance status

The status compares your figures against the two targets on the record. On a partial quarter it compares the **projected** figures, because judging an in-flight quarter on delivered minutes alone would report almost every facility short. Once the quarter is complete it compares the **delivered** figures.

| Status                  | Meaning                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| **Met**                 | Both the total and the RN figure are at or above target                                             |
| **RN Shortfall**        | The total is met, the RN figure is not                                                              |
| **Total Shortfall**     | The RN figure is met, the total is not                                                              |
| **Both Shortfall**      | Neither is met                                                                                      |
| **Targets Not Entered** | One or both targets are blank, so no comparison is possible                                         |
| _Not assessable_        | The facility carried no subsidised care days in the period, so there is no denominator to divide by |

Variance is the figure minus the target, so a **negative variance means under-delivery**.

{% hint style="info" %}
Targets are published by the Department and adjusted for your facility's casemix. They are entered by hand on the check record, along with the date you took them from the portal. Until both are entered, the check calculates every figure but reports **Targets Not Entered** rather than a verdict.
{% endhint %}

## What counts as care minutes

Minutes come from **Shifts** at the facility whose type is one of the direct care categories: Registered Nurse, Enrolled Nurse, Personal Care Worker or Assistant in Nursing. Cancelled shifts are excluded. A shift is counted in the day it started, so a shift running past midnight belongs wholly to the day it began.

For each shift, Maica takes the best record of what was actually worked:

{% stepper %}
{% step %}
### Worker recorded times

Where workers checked in and out, their own times are used and each worker is counted separately.
{% endstep %}

{% step %}
### Shift times

Where nobody recorded individual times but the shift itself carries actual times, those times stand in for each assigned worker.
{% endstep %}

{% step %}
### Neither

A shift whose time has passed with no times recorded anywhere contributes nothing, and is counted under **Unverified Past Shifts** so you can find it.
{% endstep %}
{% endstepper %}

Where some workers on a shift recorded times and others did not, only the recorded times count. Once a shift has begun, actuals are the record.

{% hint style="warning" %}
**Approved breaks are deducted from delivered minutes.** A worker does not check out for lunch, so the break sits inside the recorded window and a check-in to check-out figure overstates the care delivered. An eight hour shift with a thirty minute break counts as 450 care minutes, not 480.

Every approved break is deducted, whether paid or unpaid, because the measure is time actually providing care. Only breaks with a status of **Approved** are deducted, so a pending or rejected break never reduces your figures.
{% endhint %}

A break recorded against a named worker comes off that worker's minutes. A break recorded against the shift with no worker named is treated as one everybody on the shift took.

## What counts as a resident day

The denominator is **subsidised care days**, not resident days. Two things shape it.

**Days start when subsidy starts.** A resident's days are counted from the later of their agreement start and the entry date on their accepted entry event, so days before subsidy began are never counted. Days stop at the earlier of the quarter end, the discharge date and the agreement end date.

**Non-subsidised leave is deducted.** The rules follow the Department's definition, which is not the same as the one Services Australia uses for the 24/7 RN Supplement:

| Leave                                       | Effect on the denominator                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| Social leave, non-claimable                 | Deducted in full                                                            |
| Transition care, non-claimable              | Deducted in full                                                            |
| Hospital leave                              | Deducted from day 29 of each episode, counted from that episode's own start |
| Social, transition care and emergency leave | Not deducted. The resident is still in care and subsidy continues           |

The days deducted are shown on the result as **Excluded Leave Days**, so the denominator can be reconciled against your Services Australia payment statement.

{% hint style="info" %}
The 28 day hospital allowance is per episode, counted from when that episode actually began rather than from the start of the quarter. Two separate twenty day stays therefore give forty countable days, while one continuous forty day stay gives twenty eight countable and twelve excluded.
{% endhint %}

## How the projection works

The projection adds the minutes your remaining roster is expected to deliver to the minutes already delivered, and holds occupancy flat for the rest of the quarter.

Rostered minutes come from shifts still to come, calculated from the scheduled times and the number of resources the shift requires, and net of any approved breaks already recorded against them. A shift with no required resource count contributes nothing, since there is no figure to project from.

{% hint style="warning" %}
The projection is an assumption, not a measurement. It assumes every rostered shift is worked, assumes occupancy stays where it is, and projects no leave forward. Use it to steer, and use the delivered figures once the quarter closes.
{% endhint %}

## Checking your data before you rely on a result

Three counters on the result tell you how much of the figure rests on complete records:

| Counter                    | What to do about it                                                                                                                                |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unverified Past Shifts** | Shifts that have finished with no times recorded anywhere. They contributed nothing. If they were worked, record the times and run the check again |
| **Unfilled Roster Slots**  | Slots on upcoming shifts with nobody assigned. The projection still counts them, so a high number means the projection depends on filling them     |
| **Break Minutes Deducted** | The total approved break time removed from delivered minutes. Useful when reconciling against payroll                                              |

{% hint style="danger" %}
From FY2025-26 the Care Minutes Performance Statement is externally audited and reconciled against payroll. A high **Unverified Past Shifts** count means minutes that were probably worked are not being reported, and an unrecorded break would overstate what was. Clear both before treating a result as final.
{% endhint %}

## Related articles

* [24/7 Registered Nurse Coverage](24-7-registered-nurse-coverage.md), the other quarterly compliance check on the same record
* [Care Minutes Check Configuration](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/residential-aged-care/reporting-capability-matrix/care-minutes-check-configuration) in the Administration Guide, for the field reference, permissions and the full calculation
