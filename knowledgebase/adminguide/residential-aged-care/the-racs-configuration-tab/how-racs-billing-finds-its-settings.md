# How RACs Billing Finds Its Settings

## Why does this matter?

Every residential aged care (RACS) process reads its rates, caps and the **Automate Fee Rate Updates** toggle from one place: the single **active Billing Setting** that the **RACS Configuration** tab edits. If Maica cannot find exactly one usable Billing Setting, the processes that depend on it stop instead of billing from a guess.

## Which processes read it?

| Process                                              | What it reads                                                                                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Billing engine                                       | Rates, caps, the retention duration                                                                                        |
| Indexation Engine                                    | The Basic Daily Fee standard rate and the DAP index number                                                                 |
| Financial year reset                                 | The lifetime caps                                                                                                          |
| Fee validation and Add Fee Item                      | The retention duration and retention rate, and the DAP index number for a Post 1 November 2025 Daily Accommodation Payment |
| Drawdown, departure and refund interest              | The MPIR and BIR                                                                                                           |
| Lump sum retention                                   | The retention duration and retention rate                                                                                  |
| Fee rate automation and the scheduled fee rate check | The **Automate Fee Rate Updates** toggle                                                                                   |

No other Setting record is read. A value held on a different Setting record has no effect on RACS billing.

## How Maica finds the Billing Setting

Maica looks for the Setting record whose API name is `Billing_Setting` and requires exactly one that is **Active**. When it cannot, the **RACS Configuration** tab loads with no fields and no Save button and names the reason.

| Reason            | What it means                                                        | What to do                                                                 |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Missing**       | No Billing Setting record exists                                     | Contact Maica support                                                      |
| **Inactive**      | The record exists but is not active. The package creates it inactive | Tick **Active** on the Billing Setting record                              |
| **Duplicate**     | More than one active Billing Setting exists                          | Leave exactly one active and deactivate the others                         |
| **Access denied** | The user cannot read the Billing Setting                             | Grant the user access to the Billing Setting through their permission sets |

The rate and cap fields you see on the tab are the values the engines use.

{% hint style="warning" %}
While the Billing Setting cannot be bound, RACS billing, indexation and the financial year reset do not run. Adding a Post 1 November 2025 Daily Accommodation Payment is refused with the same reason, and a refund or departure that needs the MPIR or BIR is refused where those rates cannot be read.
{% endhint %}

## Rates and caps that must be set

| Value                                                                | When it is needed                                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **NCCC Lifetime Cap**, **MTCF Annual Cap** and **MTCF Lifetime Cap** | NCCC and MTCF items are held back, and not billed, until all three are set                                                     |
| **Basic Daily Fee standard rate**                                    | Indexation skips Basic Daily Fee items without it                                                                              |
| **DAP index number**                                                 | Indexation skips Daily Accommodation Payment items without it                                                                  |
| **Retention duration**                                               | A lump sum account's retention expiry cannot be worked out without it                                                          |
| **RAC Retention Rate**                                               | Post 1 November 2025 retention items cannot be created without it                                                              |
| **BIR**                                                              | A departure still closes, but **BIR at Departure** is left blank and a refund inside the BIR window is refused until it is set |

## Reading the billing Logs

The nightly billing run writes to the **Logs** with the Source **RAC Billing Engine**.

### Warning: a due item was not billed

When an Agreement Item is due but its current billing period has nothing to bill, the run writes one **Warning** that names the item and the reason. The reason says whether the period was already billed, or names the dates when it was not. The item is left unchanged and is not marked Failed.

A run writes this Warning once, at the start of the nightly run, rather than again on every catch-up step. An item that has already been billed to its End Date, such as a fee ceased after its period was billed, does not write a Warning.

A Warning usually points to dates that need correcting, for example a billing cursor that was edited into a month already billed. Correct the item's billing dates, or its Billing Status and Next Billing Date, and the next run picks it up.

### Error: NCCC and MTCF held back

Where a cap is missing, each NCCC and MTCF item is held back and writes one **Error** for the run. Set the caps on the **RACS Configuration** tab and the items bill on the next run.

### Warning: the catch-up chain stopped

When the catch-up chain stops with work outstanding, its Warning points to the per-item Warnings for the items that need attention.

## FAQs

<details>

<summary>Why did the tab load with no fields after an upgrade?</summary>

The Billing Setting is created inactive. Activate it, then run the fill-blanks script from the release's post-install steps if your values were held on another Setting record.

</details>

<details>

<summary>Why was an item not billed and not marked Failed?</summary>

A Failed item leaves billing scope. An item with nothing to bill for its current period is left alone so that no billing is hidden, and a Warning names it.

</details>

<details>

<summary>Why do I see the same Error for several NCCC and MTCF items?</summary>

Each held-back item writes its own Error once per run. They all clear when the caps are set.

</details>
