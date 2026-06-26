# 24/7 Registered Nurse Coverage

## Overview

Residential aged care providers must report each month whether a registered nurse (RN) was on duty and physically present at the facility for every hour of every day. This is reported through GPMS by the 7th of the following month, and the result affects eligibility for the 24/7 RN supplement. Maica works out the coverage result from your shift data so you can confirm the position before entering it into GPMS.

This article explains how to run the check, what the result tells you, and how it fits with your GPMS submission.

## Where do I find it?

The coverage check runs from the facility's Location record.

1. Open the **Location** record for the facility.
2. Select the **Run 24/7 RN Coverage Check** action.
3. Choose the month to check (usually the prior month) and confirm.

## How the check works

Maica looks at the registered nurse shifts actually worked during the month, using the actual start and end times rather than what was scheduled, so the result reflects coverage that genuinely occurred. It then checks every hour of every day for a gap where no RN was present.

* Overlapping RN shifts are merged, so concurrent cover is counted once.
* A shift that runs across midnight is split across the two days, so there is no false gap at midnight.
* A day with no RN shift at all is counted as a full day of gap.

The result is **Pass** when there are no gap hours anywhere in the month, and **Fail** when there is one or more gap hour. Facilities in MM categories 5 to 7 with 30 or fewer operational beds qualify for a lesser standard, and their result shows as **Exemption Applied**.

## Reading the result

Each check creates or updates a coverage result record for that month, showing:

| Result field        | What it tells you                                                       |
| ------------------- | ----------------------------------------------------------------------- |
| **Coverage status** | Pass, Fail, or Exemption Applied.                                       |
| **Total RN hours**  | The total qualifying RN coverage hours in the month.                    |
| **Gap hours**       | The total hours with no RN coverage.                                    |
| **Gap detail**      | The dates and time windows of each gap (blank when the result is Pass). |
| **Days with gaps**  | How many calendar days had at least one gap.                            |
| **GPMS submitted**  | A box you tick once you have completed the GPMS entry, with the date.   |

{% hint style="info" %}
If you re-run the check for a month, for example after late timesheet corrections, the result record is updated rather than duplicated, and your GPMS submitted confirmation is preserved.
{% endhint %}

## Using the result for GPMS

The coverage check tells you whether you met the requirement; you still report it to GPMS yourself.

1. Run the check for the month and review the result.
2. If the result is **Fail**, use the gap detail to investigate which shifts need attention before you report.
3. Log into GPMS and enter the coverage confirmation by the 7th of the month.
4. Return to the coverage result record in Maica and tick **GPMS submitted**, recording the date.

{% hint style="success" %}
The coverage check answers "did we meet the requirement?" The registered nurse supplement summary that Maica reads back from Services Australia answers "did Services Australia agree, and did they pay us?" Both appear on the Location record so you have the full picture.
{% endhint %}

## Related articles

* [Reporting Obligations Overview](/broken/pages/127cfa01211d2a0b958957b2ea15cf00bef844a2)
* [Quarterly Financial Report (QFR) Data](/broken/pages/4ae15b420c0c92b8e57100cca5693ba6a3a5e2e8)
* [Keeping Care Recipient Data in Sync](/broken/pages/2294317fb8aeece802d888c350f85d34ee5e3b24)
