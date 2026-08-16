# Resident Monthly Statements

A monthly statement gives a resident a single record of what they were charged over a period, split by the type of fee. It is the record a statement document is produced from, and the one finance staff work from when a resident or their representative queries a charge.

## When a statement is produced

Statements are produced by a run that someone in your organisation starts for a chosen period, usually once the month being covered has finished and all of its charges have been raised.&#x20;

That ordering matters. The nightly billing run raises the invoice lines; the statement is calculated from those lines afterwards. A statement generated before the month's charges were all raised would understate the resident's position, so the period is normally generated after the month has closed.

{% hint style="info" %}
A statement can be produced for any window, not only a whole month. This is what allows a final statement for a resident who left part way through a month, and a statement for an earlier period that was never generated at the time.
{% endhint %}

For how a run is started and configured, see [Residential Aged Care Statement Generation](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/residential-aged-care/residential-aged-care-statement-generation) in the Administration Guide. For how the charges themselves are raised, see [How Resident Billing Works](how-resident-billing-works.md).

## What is on a statement

The statement records the period it covers, the date it was issued, and a total for each type of fee charged in that period:

| Total                                     | What it covers                                                                         |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| **Total Accommodation Charges**           | Daily Accommodation Payment, Daily Accommodation Contribution and accommodation charge |
| **Total Basic Daily Fees**                | The basic daily fee                                                                    |
| **Total Hotelling Contributions**         | The hotelling contribution                                                             |
| **Total Non-Clinical Care Contributions** | The non-clinical care contribution                                                     |
| **Total Means Tested Care Fees**          | The means tested care fee                                                              |
| **Total Income Tested Fees**              | The income tested fee                                                                  |
| **Total RAD/RAC Retention**               | Retention deducted from a lump sum deposit                                             |
| **Total Billable Fees**                   | Everything charged in the period                                                       |

{% hint style="warning" %}
**Total Billable Fees** is the whole period rather than the sum of the rows above it. Charges that have no total of their own, such as a higher everyday living fee, an extra service fee, an additional service fee or a booking fee, are included in it and nowhere else. Where the two do not agree, the difference is made up of those charges.
{% endhint %}

Each charge that contributed is linked to the statement, so you can open the statement and see the individual invoice lines behind any total.

## One statement covers one period

A period can only ever be covered by one statement. If a statement already exists for part of the window being generated, Maica reports the conflict rather than creating a second statement, because two statements each claiming part of the same dates cannot be reconciled afterwards.

The practical consequence for day to day work is that a gap should be filled by generating the missing window itself, rather than by generating a wider period that overlaps a statement already in place.

## When a figure changes

Running the same period again recalculates the statement rather than creating another one. Every total is worked out afresh from the charges as they currently stand, so a charge that was amended or credited after the statement was first produced is picked up, and the issue date changes to the date of the recalculation.

{% hint style="danger" %}
Once a statement has been exported, claimed against or dispatched, it can no longer be recalculated. At that point the figures have already been sent out or claimed, and restating them would leave the record disagreeing with the document the resident holds. If a charge on a statement at that stage turns out to be wrong, raise it as an adjustment rather than regenerating the statement.
{% endhint %}

## Residents who leave

A resident who has been discharged still appears in statement generation, so a final statement can be produced for the part of the month they were in care. Enter a period ending on their discharge date.

This is specific to residential aged care. For other programs a discharged agreement drops out of statement generation entirely.

## Checking a run

Statements are generated one resident at a time in the background, so one resident's statement failing does not stop the rest. A completion message confirms the run finished, but not that every resident received a statement: where a period conflicted with an existing statement, or a charge was linked to the wrong statement, that resident is reported as an error instead.

{% hint style="info" %}
After a run, ask whoever started it to confirm the Log records were reviewed. A resident missing a statement is visible there and nowhere else.
{% endhint %}
