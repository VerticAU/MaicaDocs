# Billing Engine Architecture

The residential billing engine is the scheduled process that turns each resident's configured fees into invoices, statements, and accommodation drawdowns every day, without manual intervention. It is implemented as the `RAC_BillingEngine` Apex class and is the heart of residential aged care billing in Maica.

This article explains how the engine is structured: what it processes, the services it orchestrates, and the lifecycle of a single billing run. The rules it applies are covered in the companion articles on [Next Billing Date and Catch-Up Chains](next-billing-date-and-catch-up-chains.md) and [Fee Type Processing Rules](fee-type-processing-rules.md).

## What the engine does

The engine is a daily, scheduled, batched orchestrator. On each run it walks every active residential Agreement Item that is due, derives the period to bill, evaluates caps and leave, creates the resulting invoice line items, rolls them up into invoices and monthly statements, performs automatic accommodation drawdown where eligible, and advances each item's billing cursor.

Technically, `RAC_BillingEngine` is a Salesforce `Batchable`, `Schedulable`, and `Stateful` class. A few properties follow from that design:

* **Scheduled and batched.** A daily scheduled run starts a fresh batch. The batch processes Agreement Items in chunks of **20** at a time, each chunk with its own governor limits.
* **Callout-free.** The engine never calls Services Australia. Fee rate callouts are separate scheduled job (see [Fee Detection and Rate Updates](fee-detection-and-rate-updates.md)).
* **Stateful counters.** The engine keeps running totals (items completed, items failed, statements touched, chain depth) across all chunks so the run can report a tidy summary at the end.

{% hint style="info" %}
Only Agreement Items whose Funding has a Funding Source of `Residential Aged Care` are in scope. The engine does not touch Home Care Package or NDIS funding.
{% endhint %}

## The Agreement Item processor

The engine is a general-purpose Agreement Item processor: it does not contain fee-specific code paths for each fee type baked into the run loop. Instead it reads the configuration on each Agreement Item and its linked Support Item, then delegates the specialised work to a small set of focused services.

### Agreement Item structure

Each Agreement Item carries the fields the engine needs to bill it:

| Field                                     | Role in billing                                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **Rate** and **Quantity**                 | The base inputs to the charge amount.                                                               |
| **Billing Method**                        | `In Advance` or `In Arrears`. Drives when a period becomes billable.                                |
| **Service Frequency**                     | `Day`, `Week`, `Month`, or `One` (one-off). Drives the length of each billing period.               |
| **Start Date** and **End Date**           | The lifecycle window. Periods are clamped so they never fall outside this window.                   |
| **Next Billing Date**                     | The cursor that determines when the item is next due.                                               |
| **Last Billed Period End**                | The last day already billed. Prevents re-billing the same days.                                     |
| **Cumulative Amount (FY)**                | The running total used for annual cap evaluation.                                                   |
| **Cap Reached**                           | Set when a cap is engaged. A capped item drops out of the engine's scope.                           |
| **Active Item**                           | A formula that is true when today falls within the item's dates and the parent agreement is active. |
| **Automatic RAD Drawdown**                | Whether eligible charges trigger a drawdown against the lump sum.                                   |
| **Billing Status**                        | `Initialised`, `Complete`, or `Failed`.                                                             |
| **Fee Type** (on the linked Support Item) | Tells the engine which processing rules apply.                                                      |

### Orchestrated services

The run loop delegates to four focused services:

* **Billing Period Calculator** derives the period to bill and adjusts chargeable days for leave.
* **Cap Service** evaluates the regulatory caps for capped fee types.
* **Retention Service** calculates retention deductions from the lump sum.
* **Drawdown Service** performs automatic accommodation drawdown after billing.

## The lifecycle of a run

A run moves through three stages, with the heavy lifting happening per item.

### Selecting what is due

The run starts by selecting active, in-scope Agreement Items that are due: the item must be active, not already at a cap, have a Next Billing Date on or before today, not be in a `Failed` state, and belong to an active residential agreement. Items are processed grouped by Service Agreement so each monthly statement is built once per agreement per period.

### Processing each item

Each item is processed end to end inside its own try block, so a failure on one item never stops the others. The per-item pipeline runs in this order:

1. Derive the billing period.
2. Skip empty periods, and flag a guardrail breach for logging.
3. Compute the proposed charge amount.
4. Apply the fee type rules: route capped fees through the Cap Service, retention through the Retention Service, and bill pass-through fees at their raw amount.
5. Get or create the monthly Service Agreement Statement for the period.
6. Get or create the invoice header for the period.
7. Stage the invoice line item.
8. Stage the Funding cumulative updates.
9. Stage the Agreement Item update (advance the billing cursor, set **Billing Status** to `Complete`).
10. Queue an accommodation drawdown where eligible.

All database writes are staged and committed once per chunk as bulk operations, which keeps the run efficient and within platform limits.

### Outputs of a run

A successful run produces:

* **Invoice line items**, each stamped with a line item source of `Billing Engine`.
* **Invoices** that roll up the line items for the period.
* **Service Agreement Statements** of type `Residential Aged Care - Monthly` with a status of `Generated`, one per agreement per period.
* **Updated Funding cumulatives** that feed cap evaluation.
* **Retention and accommodation drawdown** records where applicable.

{% hint style="info" %}
The `Billing Engine` line item source identifies charges the nightly engine raised. The same **Line Item Source** field carries other values for lines created by other processes, including **Departure Credit** for the pro-rata credits the departure processor raises when an in-advance fee was billed beyond a resident's departure date. Filtering on this source lets you separate routine engine charges from departure credits and other adjustments. See [Exiting a Resident or recording a death](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/exiting-a-resident-or-recording-a-death).
{% endhint %}

{% hint style="warning" %}
If an item fails, its **Billing Status** is set to `Failed` and an error Log record is created, but the run continues with the next item. Failed items are skipped on later runs until an administrator clears the failure, so they do not block billing for other residents. Review the Log list view alongside the Billing Status filter to triage failures.
{% endhint %}

## Automatic and manual runs

The engine normally runs on its daily schedule. An administrator can also trigger an ad-hoc run from the Maica Settings area. Either way, the same pipeline executes; the only difference is what starts it. For scheduling, see [Scheduling RACS Background Jobs](scheduling-racs-background-jobs.md); for manual rate changes, see [Scheduling and Manual Rate Changes](scheduling-and-manual-rate-changes.md).
