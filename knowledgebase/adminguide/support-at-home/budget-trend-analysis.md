---
description: Learn about Maica's Budget Trend Analysis logic.
---

# Budget Trend Analysis

## Overview&#x20;

The Budget Trend Analysis component displays funding and expenditure on a **quarterly basis**, aligned with the budget periods defined in a Care Recipient’s Plan under Support at Home. This helps you track approved funds, projected expenditure, and remaining balances for each quarter.

The component displays **one tile per quarter**.

Each tile contains:

* `Available Funding` – total approved funding for the quarter.
* `Estimated Expenditure` – projected expenditure for the quarter, rolled up from Service Agreement Items.
* `Remaining Funding` – available funding minus estimated expenditure.

{% hint style="info" %}
Tiles refresh automatically as Service Agreement Items or Plan Budgets are updated.
{% endhint %}

## Attributes

The Budget Trend Analysis component relies on two primary attributes to perform quarterly calculations. These attributes define how expenditure and available funding are derived and applied within the component.

#### `Estimated Quarterly Expenditure`

* **Purpose:**\
  Rolls up planned expenditure per quarter from Service Agreement Items.
* **Calculation:**
  * For each Agreement Item:
    * Map service occurrences into quarterly budget periods based on service dates.
    * Calculate the number of occurrences using frequency and service dates.
    * Multiply by cost per occurrence.
  * Aggregate across all Agreement Items to determine total expenditure for the quarter.
* **Component Behaviour:**\
  Used by the Budget Trend Analysis component as the projected expenditure figure for each quarter.

***

#### `Available Funding Quarterly`

* **Purpose:** Represents the amount of approved funding available to the Care Recipient for each quarter, calculated on a rolling basis.
* **Data Source:** Derived from Plan Budget records that overlap each tile's quarter date range, using the filter: `Effective_Date__c <= quarterEnd AND (End_Date__c >= quarterStart OR End_Date__c = NULL)`.
* **Rolling Balance Logic:**
  * For the first period tile, Available Funding is based on the current Remaining Amount of all active Plan Budgets overlapping that quarter.
  * For subsequent period tiles, the balance carries forward from the previous period's projected unspent balance rather than recalculating from a static approved sum.
* **Component Behaviour:** Used as the approved funding figure for each quarterly tile and combined with Estimated Quarterly Expenditure to calculate Remaining Funding.

## Fields&#x20;

The accuracy of the Budget Trend Analysis component also relies on a set of supporting fields across the **Plan**, **Service Agreement**, and **Agreement Item** objects. These fields provide the values that are surfaced in the component and ensure calculations are performed consistently at the quarterly level.

### Plan

<table><thead><tr><th>Field Name</th><th width="102.35546875">Type</th><th width="207.18359375">Filter Conditions</th><th>Description </th></tr></thead><tbody><tr><td><br><strong>Total Approved - Active</strong></td><td>Rollup Summary</td><td><p>Summarised Object: <code>Plan Budget</code></p><p><strong>SUM</strong> <code>Approved Amount</code></p><p>Filter <code>Is Active</code> = TRUE</p></td><td>Represents the SUM of the <code>Approved Amount</code> from all related <code>Plan Budget</code> records where <code>Is Active</code> = TRUE. Use this to view the total approved funding from currently active Plan Budget items.</td></tr><tr><td><strong>Total Remaining - Active</strong></td><td>Rollup Summary</td><td><p>Summarised Object: <code>Plan Budget</code></p><p><strong>SUM</strong> <code>Remaining Amount</code></p><p>Filter <code>Is Active</code> = TRUE</p></td><td>Represents the SUM of the <code>Remaining Amount</code> from all related <code>Plan Budget</code> records where <code>Is Active</code> = TRUE. Use this to monitor how much approved funding is still available within the active Plan Budgets items.</td></tr></tbody></table>

### Service Agreement

<table><thead><tr><th width="176.95703125">Field Name</th><th width="104.28125">Type</th><th width="225.75390625">Formula</th><th>Description</th></tr></thead><tbody><tr><td><strong>Available Funding - Active</strong></td><td>Formula (Currency)</td><td><code>Plan</code> <strong>→</strong> <code>Total Approved - Active</code></td><td>Represents the SUM of the <code>Approved Amount</code> from all related <code>Plan Budget</code> records where <code>Is Active</code> = TRUE. Value taken from the roll-up summary field on the <code>Plan</code> record.</td></tr><tr><td><strong>Remaining Funding - Active</strong></td><td>Formula (Currency)</td><td><code>Plan</code> <strong>→</strong> <code>Total Remaining - Active</code></td><td>Represents the SUM of the <code>Remaining Amount</code> from all related <code>Plan Budget</code> records where <code>Is Active</code> = TRUE. Value taken from the roll-up summary field on the <code>Plan</code> record.</td></tr></tbody></table>

### Agreement Item&#x20;

<table><thead><tr><th width="178.64453125">Field Name</th><th width="105.63671875">Type</th><th width="221.44921875">Purpose</th><th>Description</th></tr></thead><tbody><tr><td>Estimated Expenditure Current Quarter</td><td>Currency</td><td>Stores the projected expenditure for the current quarter at item level.</td><td>Calculated by mapping service dates into the current quarter, multiplying the number of occurrences by the cost per occurrence, and storing the total.</td></tr></tbody></table>

## Calculation Logic

Once the data model fields are populated, the component applies the following calculations:

1. **Estimated Expenditure (Quarterly)**
   * Taken from Agreement Item → _Estimated Expenditure Current Quarter_.
   * Represents the rolled-up total of projected costs for that quarter.
2. **Available Funding (Quarterly)**
   * Derived from Plan Budget records overlapping the quarter's date range. For the first period, this reflects the current Remaining Amount of all overlapping active Plan Budgets. For subsequent periods, the balance carries forward from the previous period's projected unspent balance.
   * Represents the approved quarterly funding available to the Care Recipient.
3. **Remaining Funding (Quarterly)**
   * Formula:

```apex
Remaining Funding = Available Funding – Estimated Expenditure
```

## Working Examples&#x20;

### Agreement Item One

| Field                 | Value                      |
| --------------------- | -------------------------- |
| **Start Date**        | 1 July 2025                |
| **End Date**          | 1 July 2026                |
| **Rate**              | $100.00 per service        |
| **Service Frequency** | Weekly                     |
| **Service Duration**  | 1.00                       |
| **Schedule Count**    | 1                          |
| **Current Month**     | July 2025                  |
| **Current Quarter**   | Q3 (July – September 2025) |

* **Weekly frequency** = 1 session per week (Friday)
* **Schedule Count = 1** → only one service occurrence per week.
* **1 service x 1 hour x $100.00/hour = $100.00 per service**

| 📅 Step 1: Count Fridays                                                                                                                                                                                                                                                                                                                                                                                                                           | 💰 Step 2: Calculate Estimated Expenditure                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p><strong>July 2025 Fridays:</strong></p><p>Fridays fall on: <strong>4th, 11th, 18th, 25th</strong> → <strong>4 Fridays</strong></p><p><strong>Q3 2025 (July, August, September) Fridays:</strong></p><ul><li><strong>July</strong>: 4 Fridays</li><li><strong>August</strong>: 5 Fridays → 1st, 8th, 15th, 22nd, 29th</li><li><strong>September</strong>: 4 Fridays → 5th, 12th, 19th, 26th</li><li><strong>Total: 13 Fridays</strong></li></ul> | <p><strong>Estimated Expenditure (Current Month – July 2025):</strong></p><ul><li>4 Fridays × $100.00 = <strong>$400.00</strong></li></ul><p><strong>Estimated Expenditure (Current Quarter – Q3 2025):</strong></p><ul><li>13 Fridays × $100.00 = <strong>$1,300.00</strong></li></ul> |

#### Final Answer&#x20;

| Item                                        | Amount    |
| ------------------------------------------- | --------- |
| **Estimated Expenditure (Current Month)**   | $400.00   |
| **Estimated Expenditure (Current Quarter)** | $1,300.00 |

***

### Agreement Item Two

| Field                 | Value                      |
| --------------------- | -------------------------- |
| **Start Date**        | 1 July 2025                |
| **End Date**          | 1 July 2026                |
| **Rate**              | $87.16 per service         |
| **Schedule Count**    | 1                          |
| **Service Frequency** | Weekly                     |
| **Schedule Day**      | Tuesday;Wednesday;Thursday |
| **Current Month**     | July 2025                  |
| **Current Quarter**   | Q3 2025 (July – September) |

| 📅 Step 1: Count Weekly Sessions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 💰 Step 2: Calculate Expenditure                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <p>Since there are 3 scheduled days per week, and 1 session per scheduled day per week, we get <strong>3 sessions per week</strong></p><p><strong>July 2025</strong></p><p>There are 5 Tuesdays, 5 Wednesdays, and 5 Thursdays:</p><ul><li>Total sessions in July = 5 × 3 = <strong>15 sessions</strong></li></ul><p><strong>Q3 2025 (July–September):</strong></p><ul><li><strong>August 2025</strong>: 4 Tuesdays, 4 Wednesdays, 4 Thursdays or 4 × 3 = 12</li><li><strong>September 2025</strong>: 5 Tuesdays, 4 Wednesdays, 4 Thursdays or 13 total</li><li><strong>Total sessions in Q3</strong> = 15 (Jul) + 12 (Aug) + 13 (Sep) = <strong>40 sessions</strong></li></ul> | <p>Rate per session = $87.16</p><p>✅ Estimated Expenditure (Current Month):</p><p>15 sessions × $87.16 = <strong>$1,307.40</strong></p><p>✅ Estimated Expenditure (Current Quarter):</p><p>40 sessions × $87.16 = <strong>$3,486.40</strong></p> |

#### Final Answer&#x20;

| Item                                        | Amount    |
| ------------------------------------------- | --------- |
| **Estimated Expenditure (Current Month)**   | $1,307.40 |
| **Estimated Expenditure (Current Quarter)** | $3,486.40 |
