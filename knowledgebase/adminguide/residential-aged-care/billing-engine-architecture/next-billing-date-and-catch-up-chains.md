# Next Billing Date and Catch up Chains

The **Next Billing Date** on an Agreement Item is the cursor that tells the billing engine when the item is next due. Every run selects items whose Next Billing Date is populated and on or before today. This article explains how the date is first set, how it advances, and how the catch-up chain clears a backlog of overdue periods in a single dispatch.

## How the Next Billing Date is first set

When an Agreement Item is created, Maica calculates its initial Next Billing Date from the item's start date, billing method, service frequency and end date. No form sets the value: it is always derived on the server, so it cannot be set incorrectly when the item is created.

The calculation follows these rules:

| Billing method              | Frequency       | Initial Next Billing Date                                          |
| --------------------------- | --------------- | ------------------------------------------------------------------ |
| `In Advance`                | Any             | The start date                                                     |
| `In Arrears`                | `Day`           | The start date                                                     |
| `In Arrears`                | `Week`          | The start date                                                     |
| `In Arrears`                | `Month`         | The **last day of the start month**                                |
| `In Arrears`                | `One` (one-off) | The **end date**, or the start date where the item has no end date |
| Not set, or any other value | Any             | The start date                                                     |

The result is then clamped to the item's end date, so a derived cursor never falls outside the item's own window.

For example, an in-arrears monthly item starting 15 May has an initial Next Billing Date of 31 May. The period derived from that cursor is the calendar month containing it, so May is billed at the end of May, once the month it covers has run. An in-advance item bills from its start date because the upcoming period is charged upfront.

{% hint style="info" %}
Arrears deferral applies to the **first period only**. Once a period has been billed, the cursor advances to the day after the period just billed, so every subsequent period is billed on its own first day regardless of the billing method.
{% endhint %}

Deferral is only representable for two of the four frequencies, which is why the table reads the way it does. A monthly period is derived from the calendar month _containing_ the cursor, so a cursor sitting at the month end still resolves to that month. A one-off's period is its whole window and anchors on the start date rather than on the cursor, so a cursor at the window end bills the whole window once, at the end, which is what in arrears means for a period defined by the agreement rather than by a frequency. For a weekly item the cursor **is** the period start, so a deferred cursor would define a fresh seven-day period and permanently skip the days before it; for a daily item the period is the cursor itself. Both therefore seed the start date and bill their first period on time.

{% hint style="warning" %}
If the calculated Next Billing Date falls on or before today, for example on a backdated start date, no special action is needed. The next scheduled run detects the item and works through every outstanding period automatically using the catch-up chain described below.
{% endhint %}

### Manual overrides

An administrator can set the Next Billing Date directly on the Agreement Item record page, and Maica treats a deliberate override as authoritative. When the item's dates, billing method or frequency later change, Maica compares the current cursor against the value its stored settings imply. Where the two match, the cursor is Maica's to re-derive; where they differ, the cursor has either been advanced by the engine or deliberately overridden, and it is left untouched. Rewriting an advanced cursor would move it backwards over periods already billed and charge the resident twice.

{% hint style="warning" %}
Overriding the cursor on a one-off item does not shorten what it bills. A one-off's period runs from its start date to its end date whatever the cursor holds, so an override set mid-window bills the whole window rather than only the tail. The Last Billed Period End still prevents any repeat charge.
{% endhint %}

## How a billing period is derived

On each run, the engine derives the period to bill from the item's frequency. It uses the Next Billing Date as the seed, falling back to the start date for an item the engine has never billed:

| Frequency | Period billed                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Day`     | The seed date only                                                                                                                                                   |
| `Week`    | The seed date through to six days later (a 7-day period)                                                                                                             |
| `Month`   | The whole calendar month containing the seed, regardless of the day of the month                                                                                     |
| `One`     | The item's whole window, from its start date to its end date. The period anchors on the start date rather than on the cursor, and the item bills once and then stops |

Monthly periods are aligned to the calendar month so consecutive months stay contiguous with no gaps or overlaps. Periods are then clamped to the item's start and end dates so billing never extends outside the agreement, and the engine refuses to re-bill any day on or before the **Last Billed Period End**. Where those adjustments leave the period start after the period end, there is nothing to bill: the engine skips the item and leaves the cursor where it is.

{% hint style="warning" %}
**Leave does not reduce chargeable days, and no leave type suspends billing.** Chargeable days always equal the total days in the period, and the engine does not read leave records when billing at all. The resident is paying to hold a bed and the bed is held whether they occupy it or not, so every leave provision's consequence falls on the provider's subsidy rather than on what the resident owes. See [Fee Treatment During Leave](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/fee-treatment-during-leave).
{% endhint %}

Leave records still need recording promptly, for reporting and for submission to Services Australia. They simply have no bearing on what the engine charges.

### The in-advance guardrail

When the billing method is `In Advance`, the engine will not bill more than one calendar month ahead of the run date. If a derived period would end beyond that horizon, the engine **fails the item**: **Billing Status** is set to `Failed`, a Log record of type `Error` with a Source of `RAC Billing Engine` records the breach and the dates involved, and the cursor is not advanced.

{% hint style="info" %}
A failed item stays out of billing scope until an administrator clears its **Billing Status**, so a guardrail breach needs triage rather than time. A visible failure is deliberate here: a silently skipped item would keep returning to scope every night without anyone being told that a resident's fees were not billed.
{% endhint %}

## How the date advances

After an item is billed for a period, the engine stamps the **Last Billed Period Start** and **Last Billed Period End**, records the **Last Billed Date** as the run date, sets **Billing Status** to `Complete`, and advances the **Next Billing Date** to the day after the period just billed. The next run picks up from there. This is what keeps each item moving forward one period at a time.

On a catch-up run the Last Billed Date and the period dates deliberately differ, because the engine is replaying a period that has already elapsed.

The cursor is **cleared** rather than advanced in two cases, so a finished item shows a clean closed state rather than a misleading future date:

* The item is a one-off and its single period has been billed.
* The period just billed reached or passed the item's End Date.

A cleared cursor takes the item out of billing scope, because the engine only selects items whose Next Billing Date is populated.

### When the cursor moves without a charge

Three situations move or hold the cursor without producing an invoice line:

| Situation                                                                     | Effect on the cursor                                                                                                                                        |
| ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A cap engages and leaves nothing chargeable                                   | The cursor is **not** advanced. **Cap Reached** is ticked and **Billing Status** is set to `Complete`, which takes the item out of scope for good.          |
| The period is legitimately worth nothing, from a zero rate or a zero quantity | The cursor **is** advanced and **Billing Status** is set to `Complete`. The item consumed its period, so holding the cursor would leave it permanently due. |
| A retention item's last deduction falls inside its cadence window             | The cursor is pushed forward to the rescheduled date and **Billing Status** is set to `Complete`. No charge is raised for this period.                      |

### When the item's own settings change

An edit to the item's dates, method or frequency, a cessation, or a rate change that clones a successor item all route through one rule so the cursor has a single definition. Maica recognises three states:

{% stepper %}
{% step %}
## Billed and closed

The cursor is blank and a Last Billed Period End is recorded. If the item's window now extends past that date, billing resumes on the day after it; otherwise the item stays closed. A one-off stays closed regardless.
{% endstep %}

{% step %}
## Maica's to derive

The cursor is blank with nothing billed, or it still matches exactly what its stored settings imply. It is re-derived from the new settings.
{% endstep %}

{% step %}
## Claimed

The cursor has been advanced by the engine or deliberately overridden. It is left untouched.
{% endstep %}
{% endstepper %}

For a rate change, the predecessor item's cursor is the input, so a successor resumes the day after the predecessor's last billed period, carries an override across, or seeds fresh, according to which of the three states the predecessor was in. This is what keeps a scheduled rate change from skipping or repeating a period. See [Scheduling and Manual Rate Changes](scheduling-and-manual-rate-changes.md).

## The catch-up chain

A single scheduled run advances each due item by one period. On its own, that would mean a backdated item overdue by many periods could only ever catch up one period per day, never closing the gap. The catch-up chain solves this.

When a run finishes, the engine counts the items that are still due, using exactly the same conditions as the run's own selection. If any remain **and** the run just completed committed at least one Agreement Item update, it immediately launches a fresh batch run rather than waiting for the next scheduled run. Each chained run is a new transaction with a full set of governor limits, and each one advances every still-due item by one more period.

### Depth limit

To protect against runaway chaining, the chain stops after a maximum depth of **62** runs. The limit bounds how many catch-up **periods** a single dispatch can replay, not how many items it can process: a batch job runs across the entire selected scope and finishes once, so a single hop already covers the whole backlog of due items, and each further hop buys one more period per item. At 62 daily periods that is roughly two months of catch-up, which is the largest realistic backdating scenario.

If the chain reaches the depth limit before the backlog is cleared, the engine records a warning and stops. The remaining items are picked up on the next scheduled run and continue catching up from there. No backlog is lost.

### When the chain stops early

A hop that commits nothing ends the chain, rather than burning through the depth limit. The reasoning is that a hop which committed no Agreement Item update would repeat exactly the same work on the next hop with exactly the same result. Without that rule a single permanently unbillable item would requeue the chain to its depth limit every night.

The engine records a Log entry of type `Warning`, with a Source of `RAC Billing Engine`, in each of the three conditions worth an administrator's attention:

| Condition                                                           | What the warning tells you                                                                                                                                                              |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The chain reached its depth limit                                   | The depth reached, the cap, and the completed and failed counts for the dispatch. The remaining backlog will be picked up on the next scheduled run.                                    |
| The chain stopped with work still outstanding and nothing committed | How many Agreement Items are still eligible, the depth reached, and the counts for the dispatch. Check the Log records of type `Error` from the same source for the underlying failure. |
| An invoice could not be resolved for one or more Service Agreements | How many Service Agreements billed onto a fallback invoice header, and that the period may now carry a duplicate header. See [Billing Engine Architecture](./).                         |

The first two are mutually exclusive. The third is independent of both and can accompany either.

{% hint style="warning" %}
Items in a `Failed` state are excluded from the catch-up count as well as from the run itself. This prevents a persistently failing item from consuming chain capacity and starving legitimately overdue items. If you see either chain warning repeatedly, review Agreement Items that are overdue or failed for a configuration problem.
{% endhint %}
