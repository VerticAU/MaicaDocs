# Care Minutes Check Configuration

The **Care Minutes Check** compares direct care minutes delivered at a facility against the Department's published targets for it, and projects the quarter's likely landing point from the remaining roster. It follows the same pattern as the [24/7 RN Coverage Check](/broken/pages/88cc7c0914f7a2e6941c8da7bffa9f5a1a3c521a): a quick action on **Location**, a calculated record, and a Flow entry point for automation.

The numerator sits on the Appointment tree and the denominator on the Service Agreement tree, and no report type can join the two. That is why this is a calculation rather than a report, and why its inputs need to be configured deliberately.

This article covers the access model, the data the calculation depends on, and the rules it applies. For the operational view, see [Care Minutes](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/reporting-obligations-overview/care-minutes) in the User Guide.

## Access

### Permission sets

| Permission set                                 | Grants                                                                                                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Maica - Care Minutes Check - Read Access**   | Read on the object and every field, plus the Care Minutes Check tab                                                 |
| **Maica - Care Minutes Check - Create Access** | Create, with the five user-entered fields and the calculated fields writable                                        |
| **Maica - Care Minutes Check - Edit Access**   | Edit, on the same field basis                                                                                       |
| **Maica - Care Minutes Check - Delete Access** | Delete on the object                                                                                                |
| **Maica - RACS - Care Minutes Check**          | The **RACS - Run Care Minutes Check** custom permission and tab visibility. Object access comes from the sets above |

A user who runs the check needs create or edit access as well as read, because running it writes the record.

{% hint style="warning" %}
The calculated fields must be **writable**, not read-only, for anyone who runs the check. The record page already prevents users typing into them, and the calculation writes them through the running user's own permissions, so a read-only grant causes the run to fail with an access error on the first field it writes.
{% endhint %}

### The running user's own context

The whole feature runs in the running user's context. There is no system-mode path, so a user running the check needs read access to everything the calculation reads, and a Flow automation user needs exactly the same access a person does.

Reads span **Appointment**, **Appointment Resource**, **Service Agreement**, **Funding**, **Aged Care Event** and **Unavailability**. The Unavailability dependency is easy to miss: breaks are Unavailability records, and without read access on them the calculation cannot run.

### Where the action appears

**Run Care Minutes Check** sits on the Location highlights panel. Completed records appear in the **Care Minutes Checks** related list on the same record, newest quarter first.

## The record and its natural key

One record exists per facility per quarter, keyed on **Location** and **Quarter Start**. Running the check again for the same pair updates that record in place.

Two validation rules protect the key and the audit trail:

| Rule                                      | Effect                                                                              |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| **Quarter Start Must Be A Quarter Start** | Quarter Start must be populated and must be 1 January, 1 April, 1 July or 1 October |
| **Assessed Result Requires Period End**   | A record carrying a Run Date must also carry an Assessment Period End               |

The second rule is scoped so it does not block unrelated edits to older records. It also deliberately stops short of making Assessment Period End mandatory outright, because a record may legitimately be created by hand to hold the Department's targets before any run has happened.

{% hint style="info" %}
The **RN Coverage Check** object carries the equivalent two rules, since it shares the same shape
{% endhint %}

## Field reference

### Entered by the provider

These five are never written by the calculation and survive every re-run.

| Field                         | Purpose                                                         |
| ----------------------------- | --------------------------------------------------------------- |
| **Total Care Minutes Target** | The Department's casemix-adjusted total target for the facility |
| **RN Care Minutes Target**    | The registered nurse target                                     |
| **Target Source Date**        | The date the targets were taken from the portal                 |
| **Notes**                     | Free text                                                       |
| **Quarter Start**             | The quarter being assessed. Set on creation and never moved     |

### Written by the calculation

| Group            | Fields                                                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Assessed period  | **Assessment Period End**, plus the **Partial Quarter** and **Days Remaining** formulas                                                                                 |
| Delivered        | **Delivered Direct Care Minutes**, **Delivered RN Minutes**, **Delivered EN Minutes**, **Delivered PCW Minutes**                                                        |
| Denominator      | **Occupied Bed Days**, **Excluded Leave Days**                                                                                                                          |
| Delivered ratios | **Delivered Minutes Per Resident Day**, **Delivered RN Per Resident Day**                                                                                               |
| Projection       | **Rostered Minutes Remaining**, **Projected Total Minutes**, **Projected Occupied Bed Days**, **Projected Minutes Per Resident Day**, **Projected RN Per Resident Day** |
| Comparison       | **Total Variance**, **RN Variance**, **Compliance Status**                                                                                                              |
| Data quality     | **Unfilled Roster Slots**, **Unverified Past Shifts**, **Shift Level Sourced Shifts**, **Break Minutes Deducted**, **Rostered Break Minutes Deducted**                  |
| Audit            | **Run Date**, **Run By**                                                                                                                                                |

**Appointment Resource** carries two formula fields as reporting aids: **Direct Care Minutes**, which resolves the worker's actual times and falls back to the shift's, and **Actual Times Recorded**. Both exist for reporting. The calculation does its own arithmetic, because it needs to distinguish states these fields cannot express.

## The assessed period

The quarter runs from the selected Quarter Start to three months later, less one day. The assessed period ends at the **earlier of the quarter end and yesterday**, and that date is stamped on **Assessment Period End**.

Capping at yesterday keeps the two sides of the ratio aligned. A shift in progress today would otherwise add minutes to a numerator whose denominator stopped at yesterday, biasing every in-flight result high.

Running the check on the first day of the current quarter is rejected before any query or write, since no complete day exists to assess.

## The numerator: delivered and rostered minutes

### Which shifts are in scope

An Appointment is in scope where it uses the **Shift** record type, sits at the Location, carries a **Type** of Registered Nurse, Enrolled Nurse, Personal Care Worker or Assistant in Nursing, is not **Cancelled**, and has a scheduled start inside the quarter.

Assigned resources count where their status is **Accepted** or **Confirmed**. Resources of type **Asset** are excluded, since a booked room or vehicle would otherwise contribute a full shift of care minutes through the shift-level path.

A shift is attributed to the day it started, so a shift crossing midnight counts wholly in the day it began.

### How each shift resolves

| Step | Condition                                                               | Result                                                                   |
| ---- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1    | At least one assigned resource recorded both an actual start and end    | Their own times are summed, each worker counted separately               |
| 2    | No resource recorded actuals, but the shift itself carries actual times | The shift's times stand in for each **assigned** worker                  |
| 3    | Neither, and the shift's scheduled end has passed                       | Counted under **Unverified Past Shifts**. Contributes to neither measure |
| 4    | Neither, and the shift is still to come                                 | Counted as rostered minutes                                              |

Where some resources recorded actuals and others did not, only the actuals count and the establishment figure never tops them up.

{% hint style="warning" %}
Step 2 multiplies by the resources **actually assigned**, never by **Required Resources**. The two are independent: a provider may leave the required count at zero while still rostering staff, and a shift needing five people but filled by two delivered two people's worth of care. A shift with actual times but nobody assigned is therefore reported as unverified rather than as a shift that delivered nothing.
{% endhint %}

Once the quarter is complete, a shift with no actuals is always unverified, whatever its scheduled end. Nothing can be "remaining" on a closed quarter, so a night shift ending on the first day of the next quarter is not reported as rostered.

### Break deduction

Breaks are **Unavailability** records of type **Appointment Break** attached to the shift. Only those with a status of **Approved** are honoured, matching how timesheets treat them, so a pending or rejected break never reduces a reported figure.

Every approved break is deducted, paid or unpaid. The Department's test is time actually providing a service, and no care is delivered during any break. Maica also carries no paid indicator on a break: the **Billable** flag records whether time can be charged to a client, which is a different question.

| Break shape       | Treatment                                                       |
| ----------------- | --------------------------------------------------------------- |
| Names a resource  | Deducted from that worker's minutes only                        |
| Names no resource | Treated as shift-wide and deducted once per worker on the shift |

Each break is clipped to the window it is being deducted from, so a break recorded outside the worked window deducts nothing and one that overhangs deducts only the overlap. The result floors at zero, so a mis-recorded break longer than the shift cannot drive a figure negative.

The deduction is reported in two separate fields on purpose. **Break Minutes Deducted** is the audited figure taken off delivered minutes and is the one to reconcile against payroll. **Rostered Break Minutes Deducted** is a projection over shifts still to come, and folding the two together would put an unaudited number inside an audited one.

### Rostered minutes

A shift still to come projects its scheduled duration multiplied by **Required Resources**, net of breaks. A shift-wide break comes off the per-slot duration before the multiply, since whoever fills each slot takes it; a break attributed to a named worker comes off once, after the multiply, and only where that worker is assigned.

A blank **Required Resources** resolves to zero rather than one, so such a shift projects nothing. This matches how the Resources Balance field behaves and avoids fabricating a worker from a field the provider never filled in.

**Unfilled Roster Slots** counts required resources not yet assigned on upcoming shifts.

## The denominator: subsidised care days

**Occupied Bed Days** is subsidised care days, not resident days. It is built in two stages that pull in opposite directions.

### Stage 1, gross occupancy

Service Agreements count where they sit at the Location through their Funding, are not cancelled and not draft, carry a funding source of **Residential Aged Care**, and a funding type of **Permanent** or **Respite**.

| Boundary | Resolved as                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| Start    | The latest of the quarter start, the agreement start, and the **Entry Date** on the resident's accepted **Entry** event |
| End      | The earliest of the assessment period end, the **Discharge Date** and the agreement **End Date**                        |

The entry date clamp matters because nothing ties an agreement start to physical entry. A provider who dates the agreement from bed allocation would otherwise carry genuinely unsubsidised days in the denominator. Where the resident has no accepted entry event the term is simply omitted rather than treated as a blank date.

Discharge Date is honoured separately from End Date because the departure process stamps the discharge date without setting the agreement end date.

### Stage 2, non-subsidised leave

Leave is read from **Aged Care Event** records with an event category of **Leave** and a status of **Accepted**. No other status deducts.

| Event type                                                           | Treatment                                                                  |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `SOC_NC`                                                             | Excluded in full                                                           |
| `TC_NC`                                                              | Excluded in full                                                           |
| `HOSP`                                                               | Excluded from day 29 of the episode, counted from that episode's own start |
| Anything else, including social, transition care and emergency leave | Claimable. Deducts nothing                                                 |

An unrecognised event type is treated as claimable, so a new Services Australia code cannot start deducting days on its own.

{% hint style="danger" %}
**Leave dates on an Aged Care Event are end-exclusive.** The end date is the resident's first day back, so an episode is `end - start` with no additional day. Service Agreement dates are inclusive and use `end - start + 1`. Reversing the two is the likeliest source of an incorrect denominator. An episode with no end date is open and runs to the end of the assessed period.
{% endhint %}

Excluded leave is clamped to the assessed window and to the resident's own agreement spans, then merged, so a day is never deducted twice and leave dated outside a resident's time in care cannot come off another resident's days.

**Occupied Bed Days** is gross occupancy less excluded leave, floored at zero. **Excluded Leave Days** is written raw so the two can be reconciled against the Services Australia payment statement.

{% hint style="info" %}
This is the Department's definition of leave, not the Services Australia one. They genuinely differ: Services Australia counts extended hospital leave in the occupied bed days behind the 24/7 RN Supplement, while the Department caps hospital leave at 28 days. Do not expect the two denominators to agree.
{% endhint %}

## Projection, ratios and compliance

The projection holds occupancy flat: projected bed days are the assessed days plus the residents still in care on the last assessed day multiplied by the days remaining. No leave is projected forward.

The four ratios are calculated to one decimal place. A zero denominator produces a **blank** ratio rather than zero, because no residents to average over is a different statement from an average of zero minutes.

Compliance compares the **projected** figures on a partial quarter and the **delivered** figures on a complete one. Variance is figure minus target, so negative is under-delivery. Where either target is blank the status is **Targets Not Entered** and both variances stay blank. Where a ratio is blank the status is left blank rather than reported as Met, because asserting compliance from no data is the one error this feature is built to avoid.

## Running from a Flow

**Generate Care Minutes Check** is available as an invocable action, taking a Location and a quarter start. It handles a whole batch in one call, returns one result per request in the order they were passed, and isolates failures: a request naming an unknown Location fails on its own slot without affecting the others. Requests sharing a facility and quarter collapse onto the single record that key allows.

The Flow's running user needs the same access as a person, per the access model above.

## What the check depends on

The calculation reads data your organisation maintains for other reasons, so a facility can produce a result that is technically correct and practically wrong. Five dependencies decide whether the figures mean anything.

| Dependency             | Why it matters                                                                                                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shift types**        | Only shifts typed Registered Nurse, Enrolled Nurse, Personal Care Worker or Assistant in Nursing are counted. A facility whose direct care shifts carry another type reports zero delivered minutes |
| **Recorded times**     | Minutes come from actual times, on the worker or on the shift. A shift with neither contributes nothing and is counted under **Unverified Past Shifts**                                             |
| **Required Resources** | The projection multiplies scheduled duration by this field. A blank value contributes nothing, so an unpopulated field understates the projection                                                   |
| **Approved breaks**    | Only breaks recorded as Appointment Break Unavailability records with a status of **Approved** are deducted. An unapproved or unrecorded break overstates delivered minutes                         |
| **Targets**            | Both targets must be entered on the record before any compliance verdict is possible. Without them the check calculates every figure and reports **Targets Not Entered**                            |

{% hint style="success" %}
Run the check for a completed prior quarter and reconcile **Occupied Bed Days** and **Excluded Leave Days** against the Services Australia payment statement. That is the quickest way to confirm the leave and entry data behind the denominator is sound before anyone relies on an in-flight result.
{% endhint %}

Targets are keyed in per facility per quarter, so entering them is part of opening each quarter rather than a one-off task.
