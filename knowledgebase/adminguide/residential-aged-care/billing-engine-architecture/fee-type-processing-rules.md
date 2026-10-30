---
description: >-
  Understand how the billing engine classifies fee types, applies caps and
  handles periods with nothing to bill
---

# Fee Type Processing Rules

Not every fee is billed the same way. The billing engine reads the **Fee Type** on each Agreement Item's linked Support Item and applies the processing rules that fee type requires: some fees are subject to regulatory caps, some are gated by a duration, and most are billed straight through. This article explains how fee types are classified, how caps are validated, what happens when a period produces no charge, and how billing changes on the day a resident departs.

## Fee type classification

The engine groups fee types into three handling classes.

| Handling class   | Fee types                                                                                                                                                             | How they are billed                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Capped**       | Non-Clinical Care Contribution (NCCC), Means Tested Care Fee (MTCF)                                                                                                   | Routed through the Cap Service, which limits the chargeable amount to remaining cap headroom.                                      |
| **Retention**    | RAD/RAC Retention                                                                                                                                                     | The deduction amount is calculated by the Retention Service; the Cap Service gates whether retention is still within its duration. |
| **Pass-through** | Income Tested Fee (ITF), Basic Daily Fee, Hotelling Contribution, Daily Accommodation Payment, Daily Accommodation Contribution, Accommodation Charge, and other fees | Billed at their calculated amount with no monetary cap.                                                                            |

The Cap Service is the authoritative gate on which fee types have cap semantics. It only accepts NCCC, MTCF, ITF, and retention. The accommodation and daily fees are never sent to it; they pass through at their raw amount.

{% hint style="info" %}
The Income Tested Fee is a pass-through fee with no monetary cap of its own.
{% endhint %}

A `Month` item that bills `In Arrears` is billed after each month ends, and its billing date is set to the end of that month.

## Cap validation

For capped fee types, the engine asks the Cap Service to evaluate the proposed charge against every applicable cap before billing it. The service returns the chargeable amount (clamped to remaining headroom, or zero if fully blocked), the cap that was hit, and a human-readable reason.

| Fee type              | Caps applied                                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **NCCC**              | A duration cap (no NCCC after the resident's NCCC expiry date) and a lifetime cap (cumulative NCCC against the configured lifetime cap). |
| **MTCF**              | An annual cap (per-resident, see below) and a lifetime cap.                                                                              |
| **RAD/RAC Retention** | A duration gate: no retention after the retention expiry date. The amount itself is capped by the Retention Service.                     |

The cap values themselves are configured on the [RACS Configuration tab](https://knowledge.maica.com.au/maica-knowledge-base/maica-administration-guide/residential-aged-care/the-racs-configuration-tab) and documented in [Caps and Duration Settings](../the-racs-configuration-tab/caps-and-duration-settings.md). They are read from the single active Billing Setting.

{% hint style="info" %}
There is no daily monetary cap. Daily rates are simply applied to the number of chargeable days in each period by the period calculator. The caps that exist are annual, lifetime, and duration based.
{% endhint %}

### When the caps are not set

NCCC and MTCF items are billed only while all three caps are set on the Billing Setting. While any cap is blank or zero, the engine holds those items back rather than billing them without a cap. Each held-back item stays **Initialised**, is not marked Failed, and writes one **Error** to the Logs for the nightly run, even though it is held back again on every catch-up step. Once the caps are set, the items bill on the next run.

### When a cap is reached

When a cap is engaged, the chargeable amount is reduced to whatever headroom remains (which may be zero), and the engine sets **Cap Reached** on the Agreement Item. A capped item drops out of the engine's selection on subsequent runs, so it is not re-evaluated until its circumstances change (for example, an annual cap resets). A charge that exactly fills the remaining headroom is still treated as a cap hit so the item is correctly flagged.

### The MTCF annual cap year

The MTCF annual cap does not follow the financial year. Each resident has their own cap year that begins on the anniversary of their first entry to aged care. When a run falls on or after the next anniversary, the engine rolls the cap year over: it resets the resident's annual cumulative totals to zero and advances the cap year start to the current anniversary, so a fresh year of headroom is available for that day's charge. This rollover happens before the annual cap is evaluated.

## When a period produces no charge

A period can resolve to nothing chargeable for more than one reason, and the engine treats each differently. The distinction matters because it decides whether the item bills that period again.

| Situation                                                                                           | Invoice line | Billing cursor                | Outcome on the item                                                                                           |
| --------------------------------------------------------------------------------------------------- | ------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| A cap engages and leaves nothing chargeable                                                         | None         | **Not** advanced              | **Cap Reached** is set and **Billing Status** goes to `Complete`. The item is finished and drops out of scope |
| The period is legitimately worth nothing, from a zero rate or a zero quantity on the Agreement Item | None         | Advanced                      | **Billing Status** goes to `Complete`. The item consumed its period and moves on to the next one              |
| The derived line quantity is blank or not positive                                                  | None         | Not advanced                  | The item is failed and logged for triage                                                                      |
| A retention item's last deduction falls inside its cadence window                                   | None         | Moved to the rescheduled date | **Billing Status** goes to `Complete`. No charge is raised for this period                                    |
| A due item's current billing period is empty, for example because it has already been billed        | None         | Not advanced                  | The item is left unchanged and is not marked Failed. One **Warning** is written to the Logs                   |

{% hint style="warning" %}
The engine never creates an Invoice Line Item with a quantity of zero or less, whatever the fee type. Such a line is rejected by validation at commit time and would take the whole chunk's commit down with it, so the engine fails that one item instead and leaves the rest of the run intact.
{% endhint %}

The second row is the one worth understanding, because leaving the cursor alone there would be the more cautious-looking choice and is in fact the damaging one: the item would stay permanently due, and every catch-up run would replay the same empty period indefinitely.

### The empty period Warning

When a due item's current period has nothing to bill, the engine does not move its cursor, correct its dates or mark it Failed. Failed takes an item out of scope, and rewriting a cursor would hide a manual edit and risk billing a period twice. The item is left as it is and the run writes one **Warning** to the **Logs**, with the Source **RAC Billing Engine**, naming the item and the reason.

* The reason says **already billed** only where the engine's own guard against billing a period twice emptied the period. Otherwise the Warning names the dates that left nothing to bill, with blanks shown as **none** and dates as year-month-day.
* The Warning is written once for each nightly run, not again on every catch-up step. The warning that the catch-up chain has stopped points to these per-item Warnings.
* An item that has already been billed to its End Date, such as a fee that ceased after its period was billed, is finished rather than stuck, and writes no Warning.
* The departure process skips an empty period quietly, because a one-off fee that has already been billed legitimately has nothing to bill at departure.

A Warning usually points to dates that need correcting, such as a cursor that was edited into a month that is already billed. Correct the item's billing dates and the next run picks it up.

## Day of departure rules

Billing on the day a resident departs is handled by the departure process rather than the standard daily cycle. The governing principle is that fees which depend on a government subsidy are not charged for the departure day, because no subsidy is payable for it. Self-funded charges, such as the Basic Daily Fee and a self-funded Daily Accommodation Payment, may still apply.

* An **In Arrears** item is billed up to the departure date only, so a mid-month departure does not bill the rest of the month.
* An **In Advance** item that has already been billed through the departure date is not billed again at departure. Departure credits refund the days after the departure.
* A successor created by indexation or a rate change is treated as billed through the same date as the item it replaced. Days already billed on the earlier item are not billed again, and a successor that still has days to bill is billed from the first unbilled day.
* A departure after a mid-period rate change credits the days after the departure at the rate each part of the period was billed at.
* An item that starts after the departure date is ended on its own start date and never enters final billing.

{% hint style="info" %}
The full departure sequence, including refund timing and interest, is covered in [Exiting a Resident or Recording a Death](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/exiting-a-resident-or-recording-a-death).
{% endhint %}
