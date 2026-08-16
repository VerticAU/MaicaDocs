# Billing Engine Architecture

The residential billing engine is the scheduled process that turns each resident's configured fees into invoice lines, invoices and accommodation drawdowns every day, without manual intervention. It is implemented as the `RAC_BillingEngine` Apex class and is the heart of residential aged care billing in Maica.

This article explains how the engine is structured: what it processes, the services it orchestrates, and the lifecycle of a single billing run. The rules it applies are covered in the companion articles on [Next Billing Date and Catch-Up Chains](next-billing-date-and-catch-up-chains.md) and [Fee Type Processing Rules](fee-type-processing-rules.md).

## What the engine does

The engine is a daily, scheduled, batched orchestrator. On each run it walks every in-scope residential Agreement Item that is due, derives the period to bill, evaluates caps, calculates retention, creates the resulting invoice line items, resolves the invoice each Service Agreement bills onto, performs automatic accommodation drawdown where eligible, and advances each item's billing cursor.

Technically, `RAC_BillingEngine` is a Salesforce `Batchable`, `Schedulable`, and `Stateful` class. A few properties follow from that design:

* **Scheduled and batched.** A daily scheduled run starts a fresh batch. The batch processes Agreement Items in chunks of **1** at a time, each chunk with its own governor limits.
* **Callout-free.** The engine never calls Services Australia. Fee rate callouts are a separate scheduled job (see [Fee Detection and Rate Updates](fee-detection-and-rate-updates.md)).
* **Stateful counters.** The engine keeps running totals across all chunks so the run can report a rollup at the end: items completed, items failed, Agreement Item updates actually committed, chain depth, and the number of Service Agreements that fell back to an engine-built invoice header.

{% hint style="info" %}
Only Agreement Items whose Funding has a Funding Source of `Residential Aged Care` are in scope. The engine does not touch Home Care Package or NDIS funding.
{% endhint %}

### Why the chunk size is one

A chunk size of one is a deliberate choice of failure isolation over throughput. Every write the engine makes belongs to a single savepoint-guarded commit phase at the end of the chunk, so an unhandled database error in that phase rolls the whole chunk back. At a wider chunk that rollback would take every other item in the chunk down with the one the database rejected. At one, a commit failure quarantines exactly the item that caused it and no sibling.

The trade is that the per-chunk fixed cost, the parent record loads, the cap settings and the invoice resolution, is paid once per Agreement Item rather than once per chunk of many. Total queries across a run rise accordingly. The daily run is unattended and chains itself until the backlog drains, so elapsed time is the currency the design is willing to spend.

### What sits outside the engine

Two things a reader might reasonably expect the engine to handle sit outside it.

* **Statements.** The engine does not create, update, roll up, count or link to any Service Agreement Statement. Statement generation is a separate, flow-driven process that an administrator runs for a chosen period from **Claim Management** in Maica's Settings. It derives its totals from committed Invoice Line Items rather than accumulating them as charges are raised, which is what allows a statement to be regenerated and to correct itself when lines are later amended. See Residential Aged Care Statement Generation.
* **Leave.** The engine does not read leave records when billing. No leave type suspends resident billing in residential aged care, so chargeable days always equal the total days in the period. Leave is still recorded, and still drives reporting and submission to Services Australia; it simply has no bearing on what the engine charges. The reasoning is set out in Next Billing Date and Catch-Up Chains.

{% hint style="warning" %}
A resident's fees do not reduce during any type of leave. The resident is paying to hold a bed and the bed is held whether they occupy it or not, so every leave provision's consequence falls on the provider's subsidy rather than on what the resident owes.
{% endhint %}

## The Agreement Item processor

The engine is a general-purpose Agreement Item processor: it does not contain fee-specific code paths for each fee type baked into the run loop. Instead it reads the configuration on each Agreement Item and its linked Support Item, then delegates the specialised work to a small set of focused services.

### Agreement Item structure

Each Agreement Item carries the fields the engine needs to bill it:

| Field                                                       | Role in billing                                                                                                            |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Rate** and **Quantity**                                   | The base inputs to the charge amount.                                                                                      |
| **Billing Method**                                          | `In Advance` or `In Arrears`. Defers the first period for an in-arrears item, and drives the in-advance horizon guardrail. |
| **Service Frequency**                                       | `Day`, `Week`, `Month`, or `One` (one-off). Drives the length of each billing period.                                      |
| **Start Date** and **End Date**                             | The lifecycle window. Periods are clamped so they never fall outside this window.                                          |
| **Next Billing Date**                                       | The cursor that determines when the item is next due. A blank cursor is invisible to the engine.                           |
| **Last Billed Period Start** and **Last Billed Period End** | The period just billed. Last Billed Period End prevents re-billing the same days.                                          |
| **Last Billed Date**                                        | The run date on which the item was last billed, which differs from the period dates on a catch-up run.                     |
| **Cumulative Amount (FY)**                                  | The running total used for annual cap evaluation.                                                                          |
| **Cap Reached**                                             | Set when a cap is engaged. A capped item drops out of the engine's scope.                                                  |
| **Automatic RAD Drawdown**                                  | Whether eligible charges trigger a drawdown against the lump sum.                                                          |
| **Billing Status**                                          | `Initialised`, `Complete`, or `Failed`.                                                                                    |
| **Fee Type** (on the linked Support Item)                   | Tells the engine which processing rules apply.                                                                             |

{% hint style="info" %}
**Active Item** is a formula that is true when today falls within the item's dates and the parent agreement is active. The billing engine does not use it to decide eligibility, for the reasons given under Selecting what is due. Other components, including the Manage RACS Agreement screens and the accommodation service, do rely on it.
{% endhint %}

### Orchestrated services

The run loop delegates to four focused services:

* **Billing Period Calculator** derives the period to bill and the chargeable day count.
* **Cap Service** evaluates the regulatory caps for capped fee types.
* **Retention Service** calculates retention deductions from the lump sum.
* **Drawdown Service** performs automatic accommodation drawdown after billing.

## The lifecycle of a run

A run moves through three stages, with the heavy lifting happening per item.

### Selecting what is due

The run selects Agreement Items on seven conditions. An item is in scope when it has started, carries a cursor that is due, has not aged out, is neither capped nor in a failed state, and belongs to an agreement that is in a billable state under a residential funding source:

| Condition                   | Detail                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| The item has started        | Start Date is on or before the run date.                                                                                                  |
| The cursor is due           | Next Billing Date is populated and on or before the run date.                                                                             |
| The item has not aged out   | End Date is blank, or falls within the lookback window described below.                                                                   |
| No cap is engaged           | Cap Reached is not ticked.                                                                                                                |
| The item is not quarantined | Billing Status is not `Failed`.                                                                                                           |
| The agreement is billable   | Not cancelled, not a draft, not discharged, started on or before the run date, and either open-ended or ended within the lookback window. |
| The funding is residential  | The agreement's Funding has a Funding Source of `Residential Aged Care`.                                                                  |

Eligibility deliberately gates on no formula field. Both the item's **Active Item** formula and the agreement's **Status** formula embed a test that today falls on or before the end date, and that test defeats the cursor: an item whose cursor is clamped to its end date would be eligible on exactly one calendar day, because the cursor matures on that date and the formula turns false the next morning. Since the batch runs overnight, a fee ceased during business hours would then have no eligible run at all and its accrued days would never be billed. The exclusions the agreement's **Status** formula expresses are therefore stated as the explicit conditions in the table above, which are filterable and carry no date test.

Discharged agreements stay out of scope because final billing on departure is owned by the departure process, which drives the same per-item pipeline directly. See [Exiting a Resident or recording a death](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/exiting-a-resident-or-recording-a-death).

Items are ordered by Service Agreement so that related work is processed together.

#### The lookback window for ended items

An Agreement Item with an End Date stays in scope for **three months** after that date, so a missed or failed run can still be recovered without the scope query trawling history. An item that has billed everything it owes leaves scope on its own before then, because the cursor is cleared once a period reaches the item's End Date and a blank cursor is excluded.

An item that still carries unbilled time when the three months elapse drops out of scope permanently, and the accrued time is lost. To make that visible while there is still time to act, the engine reports every such item during the final month before it ages out.

{% hint style="warning" %}
Once per dispatch, the engine writes one Log record of type `Warning` with a Source of `RAC Billing Engine` for each Agreement Item that carries unbilled time and is within one month of leaving billing scope. The record names the item, its End Date, its cursor, its last billed period and the exact date from which it will be excluded. Bill the item or extend its End Date before that date. Where more than 200 items are inside the warning window, the closest to expiry are itemised and the record states the true total rather than truncating silently.
{% endhint %}

### Processing each item

Each item is processed end to end inside its own try block, so a failure on one item never stops the others. The per-item pipeline runs in this order:

{% stepper %}
{% step %}
#### Resolve the parent records

Resolve the parent Service Agreement, Funding and Lump Sum Account from the records preloaded for the chunk.
{% endstep %}

{% step %}
#### Derive the billing period

Derive the billing period. An empty period is a legitimate skip that leaves the cursor untouched; a breach of the in-advance horizon fails the item.
{% endstep %}

{% step %}
#### Compute the proposed charge amount

Daily fee types multiply rate by quantity by chargeable days; other frequencies charge rate by quantity for the whole period. Retention takes its amount from the Retention Service.
{% endstep %}

{% step %}
#### Apply fee type rules

Route capped fees (Non-Clinical Care Contribution and Means Tested Care Fee) through the Cap Service, retention through the Retention Service and its own duration cap, and bill pass-through fees at their raw amount.
{% endstep %}

{% step %}
#### Resolve and widen the invoice

Take the invoice for the period from the chunk's pre-resolved map and widen its billing period bounds to cover this item.
{% endstep %}

{% step %}
#### Stage the Invoice Line Item

Stage the Invoice Line Item.
{% endstep %}

{% step %}
#### Stage the Funding cumulative updates

Stage the Funding cumulative updates.
{% endstep %}

{% step %}
#### Stage the Agreement Item update

Advance the billing cursor, stamp the period dates and set **Billing Status** to `Complete`.
{% endstep %}

{% step %}
#### Queue settlements

Queue an accommodation drawdown where eligible, and a retention settlement where the Retention Service built one.
{% endstep %}
{% endstepper %}

All database writes are staged and committed once per chunk as bulk operations, which keeps the run efficient and within platform limits.

#### Periods that produce no charge

Three outcomes at step 4 end the item's turn early, and they are deliberately different from each other:

| Outcome                                                                       | What happens                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A cap engages and leaves nothing chargeable                                   | **Cap Reached** is ticked and **Billing Status** is set to `Complete`. No line is created and the cursor is **not** advanced, because a capped item is finished.                                                      |
| The period is legitimately worth nothing, from a zero rate or a zero quantity | The cursor **is** advanced and **Billing Status** is set to `Complete`. No line is created. The item consumed its period, so leaving the cursor would make it permanently due and every catch-up hop would replay it. |
| The derived line quantity is blank or not positive                            | The item is failed and logged. A line with a quantity of zero or less is rejected by validation at commit time and would take the whole chunk down with it.                                                           |

A retention item whose last deduction falls inside its cadence window is a fourth case: the Retention Service signals a reschedule, the engine pushes the cursor forward to the rescheduled date, stamps `Complete`, and creates no line.

### Outputs of a run

A successful run produces:

* **Invoice line items**, each stamped with a line item source of `Billing Engine`, a service date of the period end, and the derived quantity and unit price for the fee type.
* **Invoices** that the line items roll up into, resolved as described under [How the invoice for a period is resolved](./#how-the-invoice-for-a-period-is-resolved), with their billing period bounds widened across every contributing item.
* **Updated Funding cumulatives** that feed cap evaluation.
* **Retention and accommodation drawdown** records where applicable, each dated to the period they settle rather than to the run date.
* **Log records** for per-item failures and for the operational warnings described in this article.

{% hint style="info" %}
The `Billing Engine` line item source identifies charges the nightly engine raised. The same **Line Item Source** field carries other values for lines created by other processes, including **Departure Credit** for the pro-rata credits the departure processor raises when an in-advance fee was billed beyond a resident's departure date. Filtering on this source lets you separate routine engine charges from departure credits and other adjustments.
{% endhint %}

## How the invoice for a period is resolved

The engine does not decide invoice grouping from chunk membership. Before the per-item loop runs, it asks the package's own invoice find-or-create which invoice each Service Agreement in the chunk should bill onto.

The rule, in plain terms: any invoice for this Service Agreement whose **Status** is `Entered` and whose **Invoice Closure Date** is either blank or has not yet passed. Status defaults to `Entered` on the object, which is why invoices the engine has already raised satisfy the condition without the field ever having been set. Where no such invoice exists, one is created.

Three consequences are worth knowing before triaging a surprise:

* **Successive nightly runs inside one invoice period bill onto one invoice per Service Agreement**, rather than one per run. This is the invoice period behaviour used elsewhere in the package.
* **Catch-up hops merge.** During a catch-up night, successive hops for the same Service Agreement roll into a single invoice for the run, with the period bounds widened across every contributing hop. A fee type that settles its own invoice within the same run is the exception and correctly raises a fresh invoice per hop: retention and automatic RAD drawdown both write a Payment against the invoice they just billed, which moves it off `Entered`, and appending a later period's charges to a settled invoice would misstate it.
* **Departure lines attach to the run's invoice** where the departure is processed within the same open invoice period, rather than raising a second one.

{% hint style="warning" %}
This behaviour depends on the Invoice setting's **Invoice Period** and **Invoice Period Anchor Date** being configured. Without them the Invoice Closure Date is never stamped, the closure condition matches forever, and one invoice is reused indefinitely for a Service Agreement rather than one per invoice period. That is organisation data rather than packaged configuration, so no upgrade can supply it.
{% endhint %}

Where resolution fails for a Service Agreement, the engine builds its own invoice header and the item still bills, rather than failing the run. At the end of the dispatch it writes one Log record of type `Warning` naming how many Service Agreements were affected and noting that the period may now carry a second invoice header for the same Service Agreement. Reconcile or void the extra header before it is claimed. Where duplicate open invoices already exist for a Service Agreement, the match between them is not deterministic until they are consolidated.

## Reviewing a run

Failures are reported through Log records rather than through the batch job, so the Log list view is where triage starts.

{% hint style="warning" %}
When a single item fails, its **Billing Status** is set to `Failed`, a Log record of type `Error` with a Source of `RAC Billing Engine` is created, and the run continues with the next item. Failed items are skipped on later runs until an administrator clears **Billing Status**, so they do not block billing for other residents. Review the Log list view alongside the Billing Status filter to triage failures.
{% endhint %}

{% hint style="danger" %}
When a chunk loses its commit phase, the batch job still reports as completed with no errors, because the engine handles the failure rather than letting it escape. The Log record is the only signal. It names every Agreement Item in the chunk, states whether they were successfully re-stamped as `Failed` and are therefore out of scope pending triage, or whether the re-stamp itself failed and they remain in scope and need escalation.
{% endhint %}

Log records carry Service Agreement, Funding, Participant and Support Item lookups where they can be resolved, so billing operations can triage from the Log list view.

## Automatic and manual runs

The engine normally runs on its daily schedule. An administrator can also trigger an ad-hoc run from the Maica Settings area, which returns the job so progress can be followed. Either way, the same pipeline executes; the only difference is what starts it. An ad-hoc run always executes in the running user's own security context.

For scheduling, see [Scheduling RACS Background Jobs](scheduling-racs-background-jobs.md); for manual rate changes, see [Scheduling and Manual Rate Changes](scheduling-and-manual-rate-changes.md).
