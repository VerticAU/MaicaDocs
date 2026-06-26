# APCS Export Tool Configuration

The Annual Prudential Compliance Statement (APCS) requires providers to account for residents' refundable accommodation deposits and contributions. Maica provides an export tool that produces a resident-level RAD/RAC ledger for a facility and financial year, as a CSV the provider gives to their APCS auditor. The export is a reference document; it does not submit to the ACFR portal.

This article explains where to find the tool, what to select, and how to read the ledger it produces. It is written for administrators.

{% hint style="info" %}
For where this sits among the provider's reporting obligations, see [Reporting capability matrix](/broken/pages/efe6cc4b66d9e57081be81f7fb8483813e396fba).
{% endhint %}

## Where to find it

The export tool lives inside **Maica Settings**, under the **Residential Aged Care Services** menu, on the **APCS Export** tab. It is not a separate app or tab; access is granted through permission sets rather than profiles.

## Generating an export

The tool takes two inputs:

1. **Facility.** The Location whose RAD and RAC accounts you want to export.
2. **Financial year.** The reporting period, as a financial year (for example 2024-25). Only completed financial years can be selected; the year currently in progress is not offered.

Running the export downloads a CSV. There is no on-screen preview; the output is the CSV file only. The export reads existing Maica data and does not call Services Australia.

{% hint style="info" %}
The export respects your access. It runs in your user context, so if you do not have access to the underlying records, the export returns no rows.
{% endhint %}

## What is included

The export produces one row per in-scope lump sum account under the facility for the year:

* **Included:** accounts whose deposit type is a Refundable Accommodation Deposit (RAD) or a Refundable Accommodation Contribution (RAC).
* **Included even when dormant:** an account that carried a balance forward from a prior year but had no transactions during the year appears with its opening and closing balance equal to the carried-forward amount and all year totals at zero.
* **Excluded:** Accommodation Bond accounts, and residents with no lump sum account (for example DAP-only residents), which have no ledger to report.

## How the rows are ordered

Departed residents appear first, ordered by departure date, followed by current residents ordered by name. This groups the residents whose refunds an auditor is most likely to scrutinise at the top of the ledger.

## Reading the ledger

The ledger has 15 columns, in the following order. The figures for the year are derived from the lump sum transactions recorded against each account.

| Column                         | What it shows                                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Resident full name**         | The resident the account belongs to                                                                             |
| **Care recipient ID**          | The resident's Services Australia identifier                                                                    |
| **Entry date**                 | The resident's entry date                                                                                       |
| **Accommodation payment type** | RAD or RAC, with a combination indicator where the resident pays by a combination of lump sum and daily payment |
| **Opening balance**            | The account balance at the start of the financial year                                                          |
| **Total paid in**              | Payments into the account during the year (initial payment, additional payments, and transfers in)              |
| **Total drawdowns**            | Amounts drawn down during the year                                                                              |
| **Total retention deducted**   | Retention amounts deducted during the year                                                                      |
| **Total partial refunds**      | Partial refunds made during the year                                                                            |
| **Closing balance**            | The account balance at the end of the financial year                                                            |
| **Departure date**             | The departure date, for residents who left                                                                      |
| **Balance at departure**       | The account balance as at departure                                                                             |
| **Refund due date**            | The date the refund was due, based on the departure                                                             |
| **Actual refund date**         | The date the refund was actually made                                                                           |
| **Refund met deadline**        | Whether the refund was made within the statutory deadline                                                       |

{% hint style="success" %}
The last three columns are the refund compliance view. Together they let the auditor see, for each departed resident, when the refund was due, when it was paid, and whether it met the deadline.
{% endhint %}

{% hint style="info" %}
For how refunds are recorded against a resident, see [Refunding lump sum deposits](/broken/pages/357d25b821f5c8ba1468f16bed70818bf365a006) in the User Guide. For the underlying ledger, see [The lump sum account model](/broken/pages/af8f4e5058cb358aaec98e76a8aa17d5b3721b99).
{% endhint %}

## Related articles

* [Reporting capability matrix](/broken/pages/efe6cc4b66d9e57081be81f7fb8483813e396fba)
* [Accommodation balance reporting](/broken/pages/5b1ff06d0ff9e7fe74168bbb6e0a24610e8a5fc8)
* [The lump sum account model](/broken/pages/af8f4e5058cb358aaec98e76a8aa17d5b3721b99)
* [The RACS data model](/broken/pages/d7be69b5f2100d0d8a11db0ec4f4f0af5de424b0)
