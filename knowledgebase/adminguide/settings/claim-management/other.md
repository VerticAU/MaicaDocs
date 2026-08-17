---
description: >-
  Learn about Other Claim Management functionality in Maica, including Support
  at Home Monthly Statements
---

# Other

Claim Management allows you to generate a number of different **Service Agreement Statement** types, including those for participants funded under the Support at Home program. Each statement captures a participant's budget balances and service activity for the month, producing a complete record that can be used for reporting, compliance, and document generation.

To access Statement Management, navigate to **Claim Management** in Maica's Settings and select the **Other** tab.

## Generating a Service Agreement Statement

#### What to fill in?

The **Generate Service Agreement Statements** component presents the following inputs:

| Field                         | Description                                                                                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Period Selection**          | Toggle between a date range input and a month picker. Whether the period must be a complete calendar month depends on the statement **Type** selected. |
| **Service Provider**          | Optional. Filter to a specific Service Provider to restrict which Service Agreements are included. Leave blank to include all eligible providers.      |
| **Statement Generation Flow** | The flow that drives generation logic. Search for and select the appropriate flow for your statement type.                                             |
| **Period**                    | The statement month to generate for.                                                                                                                   |
| **Type**                      | The type of statement to generate. See below for available options.                                                                                    |
| **Funding Type**              | The Funding Type of Service Agreements to be included in the run.                                                                                      |

Once your inputs are complete, select **Confirm** to submit. Maica processes one `Service Agreement` at a time in the background. Any errors encountered are routed to Log records for review.

{% hint style="info" %}
The **Type** field is a restricted picklist offering the following options:

* **Monthly** and **Discharge** are general statement types available across funding programs.
* **Statement Header** is a structural record type used as the parent container in the two-level statement hierarchy.
* **Support at Home - Monthly** is the statement type used for participants funded under the Support at Home program and is the primary use case for this process.
* **Residential Aged Care - Monthly** is the statement type used for residents in residential aged care. Its generation logic differs from the Support at Home logic described below, and is documented in [Residential Aged Care Statement Generation](../../residential-aged-care/residential-aged-care-statement-generation.md).
{% endhint %}

{% hint style="warning" %}
**Support at Home - Monthly** requires the period to be a complete calendar month: the Period Start must be the first day of a month and the Period End the last day of that same month. **Residential Aged Care - Monthly** does not, and takes the window exactly as entered, so that a final statement for a resident who left part way through a month can be produced.
{% endhint %}

{% hint style="success" %}
The process can also be run on-demand for a single `Service Agreement`, for example to correct a prior run, fill a gap, or generate a final statement for a participant who has exited.
{% endhint %}

### What Maica Does When You Run It?

{% hint style="info" %}
Please note, the steps below describe the generation logic for the **Support at Home - Monthly** statement type. For the **Residential Aged Care - Monthly** logic, see [Residential Aged Care Statement Generation](../../residential-aged-care/residential-aged-care-statement-generation.md).
{% endhint %}

Once submitted, Maica works through the following steps for each eligible `Service Agreement`.

#### 1. Retrieve relevant Service Agreements

Maica queries all `Service Agreements` that:

* Are active Support at Home agreements
* Fall within the selected statement period
* Match the Service Provider filter, if one was provided

Maica then processes each returned `Service Agreement` one at a time.

#### 2. Identify active Funding Items

For each `Service Agreement`, Maica retrieves all `Funding Item` records linked to the participant's funding that were active for any part of the statement month. A Funding Item is in scope if its date range overlaps the statement period by at least one day.

{% hint style="info" %}
These are the individual budget streams, for example an Ongoing quarterly budget, a Short-Term Restorative Care pathway, or an Assistive Technology and Home Modifications allocation, each of which produces its own Statement Line.
{% endhint %}

#### 3. Retrieve Budget Usage records

Maica retrieves two sets of `Budget Usage` records. Both sets must not already be linked to an existing Statement Line:

* **Current-period records**: Budget Usage with a delivery date falling within the statement month.
* **Prior-period records**: Budget Usage with a delivery date outside the statement month, or belonging to Funding Items whose periods have already expired. These are included on the current statement as prior-period lines, ensuring no Budget Usage record is ever left without a statement.

{% hint style="info" %}
Budget Usage records from Services Australia are the authoritative source for all statement content. The presence of a Budget Usage record confirms that a claim has been processed by Services Australia. Unprocessed or pending activity does not produce Budget Usage records and will not appear on a statement.\
\
The delivery date on a Budget Usage record reflects when Services Australia acknowledged the service, not the provider's internal service date.
{% endhint %}

#### 4. Create (or locate) the Statement Header

Maica checks whether a Statement Header already exists for this agreement and period.

* **If none exists**: a new Statement Header is created as the parent record for the month. It stores the statement period, status, and the relationship back to the `Service Agreement`.
* **If one exists**: Maica operates in amendment mode. Only missing Statement Lines are added and only previously unlinked Budget Usage records are linked. Existing balances are not changed.

{% hint style="success" %}
There can be multiple Statement Lines under a single Statement Header, one per active Funding Item for the period.
{% endhint %}

#### 5. Create Statement Lines and calculate balances

One Statement Line is created for each Funding Item in scope, including any prior-period Funding Items identified in Step 3. For each Statement Line, Maica calculates and populates the following fields:

<table><thead><tr><th width="265.142578125">Field</th><th>How the value is derived</th></tr></thead><tbody><tr><td><code>Period Opening Balance</code></td><td>If this is the first statement for the Funding Item: the full Approved Amount on the Funding Item record. If prior statements exist: the <code>Period Closing Balance</code> from the most recent prior Statement Line for that Funding Item, ordered by the parent Statement Header's period end date.</td></tr><tr><td><code>Period Closing Balance</code></td><td>Opening Balance + SUM of all current-period Budget Usage amounts for this Funding Item. Budget Usage amounts are stored as negative numbers by Services Australia, so this is equivalent to Opening Balance minus the absolute drawdown. For example: Opening Balance = $7,348.82, period drawdown = $990.00 → Closing Balance = $6,358.82.</td></tr><tr><td><code>Total Claimable Expenditure</code></td><td>The absolute value of all current-period Budget Usage amounts linked to this Statement Line. Represents total drawdown for the statement month. Set to $0.00 for prior-period lines and lines with no activity.</td></tr><tr><td><code>Is Prior Period Line</code></td><td>Set to true where the Statement Line relates to a Funding Item whose period does not overlap with the current statement month. Used by document generation to group and label prior-period items separately.</td></tr><tr><td><code>Prior Period Budget Type</code></td><td>Populated when <code>Is Prior Period Line</code> is true. Records the budget type code of the prior-period Funding Item (for example, ON or CM) so document generation can label prior-period lines without re-querying the Funding Item.</td></tr><tr><td><code>Issue Date</code></td><td>Set to the date the statement generation run was executed.</td></tr><tr><td><code>Status</code></td><td>Set to Generated on creation.</td></tr></tbody></table>

{% hint style="info" %}
If a Funding Item was active during the period but has no Budget Usage activity, a Statement Line is still created with equal opening and closing balances and $0.00 total claimable expenditure. This ensures the budget stream is represented on the statement even when no services were delivered.
{% endhint %}

#### 6. Link Budget Usage records to Statement Lines

Each Budget Usage record from both the current-period and prior-period sets is linked to its corresponding Statement Line. Once linked, a Budget Usage record is excluded from all future statement runs, which prevents any activity from appearing on more than one statement. All linking is performed as a bulk operation.

{% hint style="info" %}
To trace from a Statement Line back to individual service charges, navigate: Statement Line → Budget Usage → Invoice Line Item.
{% endhint %}

### The Resulting Structure

After a run completes, each participant's monthly statement is made up of:

**Statement Header**: one per participant per month. Holds the period dates and links back to the `Service Agreement`.

**Statement Lines**: one per active Funding Item (budget type) for the period. Each line holds the opening balance, closing balance, and total claimable expenditure for that specific budget. Prior-period lines are flagged separately so they can be grouped and labelled accordingly in the generated document.

**Budget Usage records**: linked to their Statement Line, these provide the full itemised service delivery detail. To trace from a Statement Line back to individual service charges, navigate: Statement Line → Budget Usage → Invoice Line Item.

***

## Generate Bulk Commonwealth Unspent Amount File

Also available on the Other tab, this tool generates a bulk file of unspent Commonwealth amounts for a selected Service Provider and period. The file is produced and made available for download in the **Files** section of the component once generated. This is used to report unspent funding back to the Commonwealth as required under Support at Home obligations.

## Generate Bulk Invoice Amount File

This tool generates a bulk file of invoice amounts for a selected Service Provider and period, also available for download once produced. It provides an aggregated view of invoiced amounts across the selected period and is typically used for reconciliation and reporting purposes.
