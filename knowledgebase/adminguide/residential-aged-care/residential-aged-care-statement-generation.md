# Residential Aged Care Statement Generation

A Residential Aged Care monthly statement is a `Service Agreement Statement` record of the type `Residential Aged Care - Monthly`. It summarises what a resident was charged over a period, split into totals by fee type, and it is the record document generation and financial reporting read from.

Statement generation is a process an administrator runs for a chosen period. It is not part of the nightly billing run: the billing engine creates invoice lines and invoices, and statement generation reads those committed lines afterwards. That separation is deliberate. Because every total is derived from committed Invoice Line Items rather than accumulated as charges are raised, a statement can be regenerated and it is self-correcting when lines are later amended or credited.

{% hint style="info" %}
Earlier versions of the billing engine produced these statements as part of the nightly run. It no longer does. See [Billing Engine Architecture](billing-engine-architecture/).
{% endhint %}

## Where do I find it?

Navigate to **Claim Management** in Maica's Settings and select the **Other** tab. The **Generate Service Agreement Statements** component drives every statement type in the package, including Support at Home. The Residential Aged Care behaviour described in this article is selected through the **Type** field.

## Running a generation

The component presents these inputs:

| Field                                              | What to enter                                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Period Selection**                               | Toggle between **Month Picker** and **Date Range Picker**.                                                                                                          |
| **Period**, or **Period Start** and **Period End** | The window the statement covers. For a Residential Aged Care statement this window is used exactly as entered.                                                      |
| **Service Provider**                               | Optional. Restricts the run to Service Agreements for one provider. Leave blank to include all of them.                                                             |
| **Statement Generation Flow**                      | The auto-launched flow that generates the statements. For this statement type, select **Maica - Generate Residential Aged Care Statements** or your own copy of it. |
| **Type**                                           | `Residential Aged Care - Monthly`.                                                                                                                                  |
| **Funding Type**                                   | The Funding Type of the Service Agreements to include. Required.                                                                                                    |

Once **Funding Type** and the period are populated, Maica retrieves the matching Service Agreements and reports how many were found. **Confirm** submits the run.

Maica then writes one queued Log record per Service Agreement and processes them in the background, one Service Agreement at a time, so a failure on one resident never stops the others. Progress is shown in the component, and a message on completion reports either that all statements were generated or that some were generated with errors.

{% hint style="warning" %}
A Residential Aged Care statement period is taken verbatim from what you enter. There is no requirement that it be a complete calendar month, because a retrospective period and a final statement for a resident who left part way through a month both need an arbitrary window. This differs from **Support at Home - Monthly**, which does enforce a complete calendar month.
{% endhint %}

{% hint style="danger" %}
The confirmation notice states that Service Agreements with an existing statement overlapping the period are excluded from processing. For this statement type they are not excluded: they are attempted and rejected with an error, and the reason is recorded on the Log record for that Service Agreement. Always review the Log records after a run rather than reading a completion message as confirmation that every resident received a statement.
{% endhint %}

### Which Service Agreements are included

A Service Agreement is in scope for the run when it starts on or before the period end, or has no start date; it ends on or after the period start, or has no end date; it matches the **Service Provider** filter where one was given; and it matches the selected **Funding Type**.

{% hint style="info" %}
**Discharged residents are included, and only for this statement type.** Every other statement type excludes an agreement that carries a Discharge Date. A resident who leaves part way through a month would otherwise never receive a final statement, and would also be skipped when generating a period retrospectively.
{% endhint %}

## What the process does for each Service Agreement

For each Service Agreement in scope, and for the one period requested, Maica works through the following steps.

{% stepper %}
{% step %}
### Check the period against existing statements

Maica selects every `Residential Aged Care - Monthly` statement on that Service Agreement whose own period intersects the requested window, then classifies what it finds:

| What is found                                                    | Outcome                                                                                                                              |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Nothing                                                          | A new statement is created.                                                                                                          |
| Exactly one statement covering **identical** start and end dates | Treated as a re-run of that statement. See [Re-running a period](residential-aged-care-statement-generation.md#re-running-a-period). |
| Anything else                                                    | Rejected. The error names each overlapping statement, its period, and how many of the period's Invoice Line Items it holds.          |

Overlap is deliberately detected on the statement periods themselves rather than on the lines they hold. A statement generated before its lines existed overlaps a window while holding nothing inside it, and testing the lines would miss it, which is how two overlapping statements could previously be created for the same resident.

Exactly one statement may cover a period. Nothing in this process can move a line from one statement to another, so resolve the overlapping statement before generating the new one.
{% endstep %}

{% step %}
### Collect the period's charges

Maica selects the Invoice Line Items belonging to the Service Agreement's Agreement Items whose **Service Date** falls inside the window.

If any of those lines is already linked to a statement that does **not** overlap the window, the run is rejected for that Service Agreement. This is reachable after a Service Date has been corrected into the period while the line kept its old statement link: its figures are carried by a statement covering other dates, and silently re-linking it would change that statement's totals without recalculating them. Correct the linkage on the named lines, then generate again.

{% hint style="info" %}
Neither rejection quietly drops a line from the totals. Dropping it would hand the resident a statement that omits charges they genuinely incurred, with nothing reported anywhere.
{% endhint %}
{% endstep %}

{% step %}
### Calculate the totals

Each line's **Line Total** is added to the total for its Support Item's fee type. Lines with a blank or zero amount are skipped.

| Field                                                       | What it sums                                                                           |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `Total_Accommodation_Charges__c`                            | Daily Accommodation Payment, Daily Accommodation Contribution and Accommodation Charge |
| `Total_Basic_Daily_Fees__c`                                 | Basic Daily Fee                                                                        |
| `Total_Hotelling_Contributions__c`                          | Hotelling Contribution                                                                 |
| `Total_NCCC__c` (**Total Non-Clinical Care Contributions**) | Non-Clinical Care Contribution                                                         |
| `Total_Means_Tested_Care_Fees__c`                           | Means Tested Care Fee                                                                  |
| `Total_Income_Tested_Fees__c`                               | Income Tested Fee                                                                      |
| `Total_RAD_RAC_Retention__c`                                | RAD/RAC Retention                                                                      |
| `Total_Billable_Fees__c` (**Total Billable Fees**)          | **Every** charge in the period, whatever its fee type                                  |

**Total Billable Fees** is the whole period, not a subtotal of the seven above it. Fee types with no dedicated total, which includes Higher Everyday Living Fee, Extra Service Fee, Additional Service Fee, Booking Fee, Accommodation Bond and Other, contribute to it and to nothing else, as does any line whose Support Item carries no fee type at all. Where the two sides do not reconcile, the difference is the charges in those categories.

**Issue Date** is stamped with the date the run executed, so on a re-run it names the most recent recalculation rather than the original one.
{% endstep %}

{% step %}
### Link the lines and commit

Each contributing line has its **Service Agreement Statement** lookup written back, and nothing else on the line is touched. In particular the line's **Claim Status** is never written by statement generation. The statement and the back links are committed together, so a failure on either leaves neither behind.
{% endstep %}
{% endstepper %}

## Re-running a period

Running the same Service Agreement and the same period again recalculates the statement in place. Three properties follow from that:

* **Totals are reassigned, not accumulated.** Amended or credited lines are reflected, and a period whose lines have all gone keeps its statement with the totals zeroed. The record is never deleted.
* **The issue date is restamped**, so it always names the latest recalculation.
* **Stale back links are cleared.** A line whose Service Date was corrected out of the window stops pointing at this statement, which both keeps the linked set reconciling with the figures and frees the line to join the statement its new date belongs to.

{% hint style="warning" %}
A re-run is refused once the statement has left the `Generated` status. An `Exported`, `Claim Processed` or `Dispatched` statement has already been sent or claimed against, and restating its figures would diverge the record from the document the resident holds and from the claim already lodged. The error names the statement, its period and its current status.
{% endhint %}

## The flow, and using your own copy of it

Generation is driven by the packaged auto-launched flow **Maica - Generate Residential Aged Care Statements**. The flow itself is a thin wrapper: it calls the packaged Apex that does the work, then writes a Log record of type `Error` with a source of `Maica - Generate Residential Aged Care Statements` when generation faults, carrying the Service Agreement, the statement type, the funding type, the period and the message.

The flow ships as a **template**, so an organisation that needs to extend the process can create its own copy, modify it, and select that copy in the **Statement Generation Flow** field. The Apex it calls is available to a subscriber organisation, so a large retrospective backfill can also be driven directly rather than through the settings component.

{% hint style="warning" %}
The **Statement Generation Flow** field is a free selection, and where the flow it names cannot be found Maica falls back to the general **Maica - Generate Service Agreement Statements** flow rather than reporting the problem. Selecting the wrong flow therefore produces statements of the wrong shape rather than an error. Confirm the field names the Residential Aged Care flow, or your copy of it, before a production run.
{% endhint %}

The flow runs in system context without sharing, so the records it creates do not depend on the running user's record access. The period, statement type and funding type are all passed in from the settings component rather than being decided inside the flow.

## Generating retrospectively, and final statements

Because the period is taken verbatim, the same process covers three cases that would otherwise need separate handling:

* **A period that was never generated.** Enter the window and run it. Totals come from the committed invoice lines, so a period generated long after the fact produces the same figures it would have produced at the time.
* **A resident discharged part way through a month.** Enter the window ending on the discharge date. The agreement is in scope despite being discharged.
* **A correction.** Re-run the same window, subject to the status rule above.

## Troubleshooting

| Message                                                                                       | Cause                                                                                              | Action                                                                                                                 |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Existing statements overlap that period                                                       | More than one statement, or one statement with different bounds, intersects the window             | Resolve or correct the overlapping statement, then generate again                                                      |
| Invoice Line Items dated in that period are already linked to a statement outside this period | A Service Date was corrected into this period and the line kept its old statement link             | Correct the linkage on the named lines                                                                                 |
| Only a statement still in the Generated status can be regenerated                             | The statement has been exported, claimed or dispatched                                             | Do not restate it. If the figures are genuinely wrong, resolve it with the existing statement rather than regenerating |
| Both a claim period start date and a claim period end date are required                       | The run reached the flow without a complete period                                                 | Check the period inputs on the component                                                                               |
| A Generate Service Agreement Statements Flow was not found                                    | The **Statement Generation Flow** field names nothing that resolves, and neither does the fallback | Select an active auto-launched flow in that field                                                                      |

Every failure lands on the Log record for the Service Agreement it belongs to, so a run that reports errors can be triaged resident by resident.
