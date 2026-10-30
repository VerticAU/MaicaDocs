# Support at Home Statement Generation

## What does statement generation do?

Support at Home monthly statements record each participant's budget balances and service activity for a calendar month. Maica builds them from the Budget Usage that Services Australia reports. Generation is owned by a single engine, so every route that generates a month, including the packaged **Generate Support at Home Statements** flow and the **Generate Statements** screen in Claim Management, produces the same result.

This article explains the engine. For the inputs on the screen, see **Other** under Claim Management.

## Where do I run it?

In **Maica Settings**, open **Claim Management**, select the **Other** tab and use **Generate Service Agreement Statements** with the type **Support at Home - Monthly**. The period must be a complete calendar month.

{% hint style="warning" %}
Generating a month that already has statements recalculates that month in place. Take an export of the statements first if you need to keep the earlier figures.
{% endhint %}

## What a run produces

For each eligible Service Agreement, a run produces:

* One **Statement Header** for the month
* One **Statement Line** for each Funding Item that was active in the month, including prior-period lines
* One **Care Management** line on the header, where provider Care Management usage applies

### Totals on each line

| Field                           | What it holds                                                                                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Total Budget Funding**        | The funding for the budget, taken from its Entitlements. Where there are none, the Approved Amount is used, and where there is neither the value is $0.00 |
| **Total Prior Period Expenses** | Expenses on the budget delivered before the statement month                                                                                               |
| **Total Client Contributions**  | Care recipient contributions on the linked invoice lines, counted once for each invoice line                                                              |

The statement header also holds **Total Care Management Quantity**, the Care Management hours delivered in the month, counted once for each invoice line.

Where one invoice line is paid from more than one of the plan's budgets, its client contribution is divided between their lines in proportion to each budget's share of the invoice line's usage. The remainder of a cent goes to the largest share, and where the invoice line has no usage the whole amount goes to the lowest budget Id. A budget that belongs to a different Funding, such as the provider Care Management pool, does not take a share.

## Recalculation

The engine owns its lines. On every run it rebuilds each line from all of its linked usage plus any newly available usage, so a line is never added to. Running the same month again therefore gives identical figures, creates no second header and no duplicate lines, and links any new usage.

* **Closing balance.** A line closes on all usage delivered up to the period end, so its closing balance matches the next statement's opening balance.
* **Zero activity.** A budget with no activity still has a line.
* **Failure.** A run that fails rolls back, so no partial header or lines remain.

## Usage reported by an earlier statement flow

Statements produced by a flow that pre-dates the engine linked only invoice lines. For usage whose invoice line is already on another Support at Home statement, the engine links the usage to that statement and leaves it out of the month, so it is never counted as prior period spend or contributions.

An earlier flow ended each monthly header on the first day of the following month. The engine recognises such a header as the same month, reuses it, and sets the header and its lines to end on the last day of the month. A delivery on the first day of a month is attributed to the header that starts that day.

## Care Management attribution

Provider Care Management usage is attributed to the statement header that covers its delivery date. It is found by way of the invoice line, its Agreement Item and its Service Agreement.

* There is one Care Management line for each header. Its fees and its hours, counted once for each invoice line, are rebuilt from all attributed usage on the line and on the header, so a re-run leaves them identical.
* Usage that an earlier statement has already reported is skipped.
* Attribution runs in batches of up to 2,000 rows.
* Attribution runs at the end of generation for the Service Agreement being generated, under its own savepoint. If it fails, only the attribution is rolled back, an **Error** Log is written and the statement is still generated.
* Where a run reaches the row limit, an **Info** Log points to the **Care Management Attribution** Temporary Job, which attributes the remainder.

See **Temporary Jobs** for how to run the job.

## Funding Item Usage detail

Each Funding Item Usage record shows the details of its invoice line: **Quantity**, **Unit Price**, **Unit of Measurement**, **Care Recipient Contribution Amount** and **Delivered by Third Party**. They are read-only.

New installations open Funding Item Usage on the packaged Maica record page. Where an organisation uses its own record page, these fields are added to it by an administrator.

## Permissions

The engine writes statements in user mode, so each user who generates statements, or retries a statement Log, needs:

* **Service Agreement Statement** Create Access and Edit Access
* **Funding Item Usage** Edit Access
* Read Access to Funding, Funding Item, Entitlement and Invoice Line Item

Where access is granted through profiles or cloned permission sets, the same object and field access is needed, including the statement totals and the Funding **Service Provider** field.

## Failures and logs

| Log        | Written when                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| **Failed** | A statement run fails, including a failure reported by a flow that fills a Text output named `Flow_Fault_Message` |
| **Error**  | Care Management attribution cannot complete during generation                                                     |
| **Info**   | A run reaches the attribution row limit, or the Temporary Job reports more usage remaining                        |

## FAQs

<details>

<summary>Does generating a month again create duplicate statements?</summary>

No. Maica rebuilds the existing header and lines in place and links any new usage.

</details>

<details>

<summary>Can I trace a Statement Line back to the service charges?</summary>

Yes. Navigate from the Statement Line to its Budget Usage, and from there to the Invoice Line Item.

</details>

<details>

<summary>Why is a Care Management figure missing from a statement?</summary>

Check whether the provider's Care Management budgets have been refreshed from the provider Account, and whether the **Care Management Attribution** Temporary Job reports usage remaining.

</details>
