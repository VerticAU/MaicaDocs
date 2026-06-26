# How Resident Billing works

## Overview

Resident billing in Maica is automated. Each fee a resident pays, such as the Basic Daily Fee, a means tested fee, or an accommodation payment, is set up as a separate item on their Service Agreement. A billing engine then runs every day, works out what is owed for each item, and produces the resident's invoices. You configure the fees once, and the engine bills them on schedule for as long as they apply.

This article explains the billing cycle, how invoices are put together, and which parts of billing happen automatically versus the parts you do yourself.

## Billing periods and the billing cycle

The billing engine is a scheduled process that runs automatically once a day. On each run it looks for every active fee item whose next billing date has arrived, and bills it.

For each item due, the engine:

1. Works out the billing period it is charging for, based on the item's frequency and whether it bills in advance or in arrears.
2. Checks for any leave that changes the number of chargeable days in that period.
3. Calculates the charge from the daily rate and the chargeable days, applying any rules that are specific to that fee type.
4. Checks the charge against any caps that apply (daily, annual, lifetime, or duration limits).
5. Creates an invoice line for the charge.
6. Updates the running totals on the fee item and on the resident's funding record.
7. Moves the item's next billing date forward to the next cycle.

Fee items can be billed daily, weekly, fortnightly, or monthly, and most residents have several items running side by side, for example a Basic Daily Fee item, a means tested fee item, and an accommodation item all billing in parallel.

{% hint style="info" %}
The billing engine is general purpose. It does not have separate logic hard-coded for every fee; instead it reads the fee type on each item and applies the right rules from there. That is why setting the correct fee type when you configure an item matters. See [Configuring Resident Fees (Fees Tab)](the-manage-racs-agreement-component/configuring-resident-fees-tab.md).
{% endhint %}

## Invoices and invoice lines

Each charge the engine calculates becomes an **invoice line**. Lines for the same resident and billing period are gathered under a single **invoice** for that period, so a resident receives one invoice covering all their fees for the period rather than a separate invoice per fee.

Alongside invoices, the engine keeps each resident's monthly **statement** up to date. The statement summarises the resident's charges for the period and is generated as part of the billing run, so the running record stays current without any manual step.

{% hint style="success" %}
Every line the billing engine creates is marked as coming from the billing engine. This makes it easy to tell automated charges apart from adjustments or manual corrections when you review a resident's account.
{% endhint %}

## What happens automatically and what you do yourself

Most billing is hands-off, but some actions remain with your team by design.

| Happens automatically                                              | You do this yourself                                                                         |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| The daily billing run, calculating and invoicing all due fee items | Setting up fee items and their rates on the Fees tab                                         |
| Rolling each item's next billing date forward                      | Changing a rate when a resident's fees change                                                |
| Applying caps and leave rules during billing                       | Recording leave so the engine can apply it                                                   |
| Keeping the monthly statement up to date                           | Monitoring events the engine does not track, such as the day-29 hospital leave fee reduction |

An administrator can also trigger an extra billing run on demand from the Maica settings, in addition to the daily scheduled run. This is mainly used for testing or catch-up, and is described in the administration guide.

{% hint style="warning" %}
If a single fee item cannot be billed, the engine marks just that item as failed and records a log entry, then carries on with the rest. It does not stop the whole run. Your billing team can find failed items by filtering on the billing status and reviewing the logs.
{% endhint %}
