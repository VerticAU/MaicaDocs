# How Resident Billing works

## Overview

Resident billing in Maica is automated. Each fee a resident pays, such as the Basic Daily Fee, a means tested fee, or an accommodation payment, is set up as a separate item on their Service Agreement. A billing engine then runs every day, works out what is owed for each item, and produces the resident's invoices. You configure the fees once, and the engine bills them on schedule for as long as they apply.

This article explains the billing cycle, how invoices are put together, and which parts of billing happen automatically versus the parts you do yourself.

## Billing periods and the billing cycle

The billing engine is a scheduled process that runs automatically once a day. On each run it looks for every active fee item whose next billing date has arrived, and bills it.

For each item due, the engine:

1. Works out the billing period it is charging for, based on the item's frequency and whether it bills in advance or in arrears.
2. Calculates the charge from the daily rate and the number of days in the period, applying any rules that are specific to that fee type.
3. Checks the charge against any caps that apply (annual, lifetime, or duration limits).
4. Creates an invoice line for the charge.
5. Updates the running totals on the fee item and on the resident's funding record.
6. Moves the item's next billing date forward to the next cycle.

Fee items can be billed daily, weekly, or monthly, or as a one-off charge, and most residents have several items running side by side, for example a Basic Daily Fee item, a means tested fee item, and an accommodation item all billing in parallel.

{% hint style="info" %}
The billing engine is general purpose. It does not have separate logic hard-coded for every fee; instead it reads the fee type on each item and applies the right rules from there. That is why setting the correct fee type when you configure an item matters. See [Configuring Resident Fees (Fees Tab)](the-manage-racs-agreement-component/configuring-resident-fees-tab.md).
{% endhint %}

{% hint style="warning" %}
**Leave does not change what is billed.** No leave type suspends billing or reduces the days charged, and the engine does not read leave records when it bills. The resident is paying to hold their place, and the place is held whether they occupy it or not. See [Fee Treatment during Leave](fee-treatment-during-leave.md).
{% endhint %}

## Invoices and invoice lines

Each charge the engine calculates becomes an **invoice line**. Lines for the same resident are gathered under a single **invoice** for the open invoice period, so a resident receives one invoice covering all their fees rather than a separate invoice per fee.

Statements are produced separately, by a run someone in your organisation starts for a chosen period, usually once the month has finished and all of its charges have been raised. See [Resident Monthly Statements](resident-monthly-statements.md).

{% hint style="success" %}
Every line the billing engine creates is marked as coming from the billing engine. This makes it easy to tell automated charges apart from adjustments or manual corrections when you review a resident's account.
{% endhint %}

## What happens automatically and what you do yourself

Most billing is hands-off, but some actions remain with your team by design.

| Happens automatically                                              | You do this yourself                                                                              |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| The daily billing run, calculating and invoicing all due fee items | Setting up fee items and their rates on the Fees tab                                              |
| Rolling each item's next billing date forward                      | Changing a rate when a resident's fees change                                                     |
| Applying caps during billing                                       | Recording leave, which is needed for reporting and for Services Australia rather than for billing |
| Drawing eligible charges down against a lump sum deposit           | Generating each period's monthly statements                                                       |
|                                                                    | Monitoring events the engine does not track, such as the day-29 hospital leave fee reduction      |

An administrator can also trigger an extra billing run on demand from the Maica settings, in addition to the daily scheduled run. This is mainly used for testing or catch-up, and is described in the administration guide.

{% hint style="warning" %}
If a single fee item cannot be billed, the engine marks just that item as failed and records a log entry, then carries on with the rest. It does not stop the whole run. Your billing team can find failed items by filtering on the billing status and reviewing the logs.
{% endhint %}

{% hint style="info" %}
A failed item stays out of billing until someone clears its billing status, so it does not resolve itself on the next run. Reviewing failures promptly matters: an item left failed is a fee that is not being charged.
{% endhint %}
