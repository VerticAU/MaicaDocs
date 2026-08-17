# 24/7 Registered Nurse Coverage

## Overview

Residential aged care providers must report each month whether a registered nurse (RN) was on duty and physically present at the facility for every hour of every day. This is reported through GPMS by the 7th of the following month, and the result affects eligibility for the 24/7 RN supplement. Maica works out the coverage result from your shift data so you can confirm the position before entering it into GPMS.

This article explains how to run the check, what the result tells you, and how it fits with your GPMS submission.

## Where do I find it?

The coverage check runs from the facility's Location record.

{% stepper %}
{% step %}
### Open the Location record

Open the **Location** record for the facility.
{% endstep %}

{% step %}
### Run the coverage check

Select the **Run 24/7 RN Coverage Check** action.
{% endstep %}

{% step %}
### Choose the month

Choose the month to check, usually the prior month, and confirm.
{% endstep %}
{% endstepper %}

## How the check works

Maica looks at the registered nurse shifts actually worked during the month, using the actual start and end times rather than what was scheduled, so the result reflects coverage that genuinely occurred. It then checks every hour of every assessed day for a gap where no RN was present.

* Overlapping RN shifts are merged, so concurrent cover is counted once.
* A shift that runs across midnight is split across the two days, so there is no false gap at midnight.
* A day with no RN shift at all, within the assessed period, is counted as a full day of gap.

The result is **Pass** when there are no gap hours anywhere in the assessed period, and **Fail** when there is one or more gap hour. Facilities in MM categories 5 to 7 with 30 or fewer operational beds qualify for a lesser standard, and their result shows as **Exemption Applied**.

## Which days are assessed

The check only assesses **complete calendar days**. The assessed period runs from the first of the month to the earlier of the month end and **yesterday**, and the result records that date as **Assessment Period End**.

Stopping at yesterday matters because coverage is measured from actual shift times, and a shift still in progress today has no actual end time yet. Assessing today would read as a gap for the remainder of the day.

For a completed prior month this makes no difference: the month end is already before yesterday, so the whole month is assessed.

{% hint style="warning" %}
**Running the check part-way through the current month gives a partial result.** Only the days up to yesterday are assessed. The days that have not happened yet are excluded rather than counted as gaps, so the result is a fair picture of the month so far, but it is not the figure to declare in GPMS.
{% endhint %}

A partial result is flagged in two places. The **Partial Month** box is ticked, and the **Gap Detail** opens with a line naming the exact window assessed and telling you to re-run after month end.

{% hint style="info" %}
**The check cannot be run on the first day of a month for that same month.** No complete day exists to assess, so Maica reports that and writes no record. Run it from the 2nd onwards. The action itself is withheld in that situation rather than letting you submit and receive an error.
{% endhint %}

## Reading the result

Each check creates or updates a coverage result record for that month, showing:

| Result field              | What it tells you                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| **Coverage status**       | Pass, Fail, or Exemption Applied.                                                         |
| **Total RN hours**        | The total qualifying RN coverage hours in the assessed period.                            |
| **Gap hours**             | The total hours with no RN coverage.                                                      |
| **Gap detail**            | The dates and time windows of each gap, led by the partial-result line where one applies. |
| **Days with gaps**        | How many calendar days had at least one gap.                                              |
| **Assessment Period End** | The last day actually assessed.                                                           |
| **Partial Month**         | Ticked when the assessed window is shorter than the whole month.                          |
| **GPMS submitted**        | A box you tick once you have completed the GPMS entry, with the date.                     |

{% hint style="info" %}
If you re-run the check for a month, for example after late timesheet corrections, the result record is updated rather than duplicated, and your GPMS submitted confirmation is preserved. Re-running a partial result after month end completes the assessment and clears the **Partial Month** flag.
{% endhint %}

## Using the result for GPMS

The coverage check tells you whether you met the requirement; you still report it to GPMS yourself.

{% stepper %}
{% step %}
### Run the check after month end

Run the check **after the month has ended**, so the whole month is assessed.
{% endstep %}

{% step %}
### Confirm the result is complete

Review the result and confirm **Partial Month** is not ticked.
{% endstep %}

{% step %}
### Investigate gaps

If the result is **Fail**, use the gap detail to investigate which shifts need attention before you report.
{% endstep %}

{% step %}
### Submit in GPMS

Log into GPMS and enter the coverage confirmation by the 7th of the month.
{% endstep %}

{% step %}
### Record the submission in Maica

Return to the coverage result record in Maica and tick **GPMS submitted**, recording the date.
{% endstep %}
{% endstepper %}

{% hint style="danger" %}
**GPMS Submitted cannot be ticked on a partial result.** The GPMS declaration covers a full calendar month, so Maica blocks the confirmation while the record is flagged as partial. Re-run the check after month end, which clears the flag, then record your submission.
{% endhint %}

{% hint style="success" %}
Running the check during the month is still worth doing. It is the only way to see a developing gap while there is time to roster against it. Treat the in-month result as a management tool and the post-month result as the declaration.
{% endhint %}

{% hint style="success" %}
The coverage check answers "did we meet the requirement?" The registered nurse supplement summary that Maica reads back from Services Australia answers "did Services Australia agree, and did they pay us?" Both appear on the Location record so you have the full picture.
{% endhint %}

## Related articles

* [Care Minutes](care-minutes.md), the other quarterly compliance measure taken from shift data
