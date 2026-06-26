# APCS RAD/RAC Ledger Export

## Overview

Providers who held refundable accommodation deposits (RADs) or contributions (RACs) at any point during a financial year must include an Annual Prudential Compliance Statement (APCS) in their Annual Financial Report, lodged by 31 October. The APCS is audited and demonstrates that deposits were managed and refunded correctly. Maica provides an export tool that produces a per-resident RAD/RAC ledger in a format you and your auditor can work from directly.

This article explains how to generate the export and how to read it, including the refund compliance flag your auditor relies on.

## Generating the export

The export is generated at the facility level.

1. Open the **Service Provider Account** record for the facility.
2. Select the RAD/RAC ledger export action.
3. Choose the financial year. It defaults to the most recently completed year, and the current in-progress year is not available, since the APCS covers completed years only.
4. Generate the export, which downloads as a CSV file.

The export contains one row for every resident who held a RAD or RAC at any point during the year, including residents who have since departed. Departed residents are listed first, ordered by departure date, followed by current residents ordered by name.

## Reading the ledger

Each row sets out the deposit position and movements for a resident across the year.

| Column                                     | What it shows                                                      |
| ------------------------------------------ | ------------------------------------------------------------------ |
| **Resident details**                       | The resident's name and care recipient identifier.                 |
| **Entry date**                             | When the resident entered care.                                    |
| **Accommodation payment type**             | RAD, DAP, RAC, DAC, or a combination.                              |
| **Opening balance**                        | The deposit balance as at the start of the financial year.         |
| **Total paid in**                          | Initial and additional payments received during the year.          |
| **Total draw-downs**                       | Amounts drawn from the deposit during the year.                    |
| **Total retention deducted**               | Retention deducted during the year.                                |
| **Total partial refunds**                  | Partial refunds paid during the year.                              |
| **Closing balance**                        | The deposit balance as at the end of the financial year.           |
| **Departure date**                         | When the resident left (blank if still in care).                   |
| **Balance at departure**                   | The deposit balance on the departure date (blank if no departure). |
| **Refund due date and actual refund date** | When the refund was due and when it was paid.                      |
| **Refund met deadline**                    | The compliance flag (see below).                                   |

## The refund compliance flag

The **refund met deadline** flag is the key compliance indicator your auditor uses to confirm that refunds were paid within the legislated timeframes. Maica derives it for each departed resident:

| Flag        | Meaning                                                       |
| ----------- | ------------------------------------------------------------- |
| **Yes**     | The refund was paid on or before the refund due date.         |
| **No**      | The refund was paid after the refund due date.                |
| **Pending** | No refund has been paid yet, and the due date has not passed. |
| **Overdue** | No refund has been paid yet, and the due date has passed.     |

The flag is blank for residents who did not depart during the year.

{% hint style="info" %}
The refund due date is set when a resident's departure is processed, based on the notice given. For how that date is determined, see [Refunding Lump Sum Deposits](../refunding-lump-sum-deposits.md).
{% endhint %}
