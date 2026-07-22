# The RACs Configuration tab

The **RACS Configuration** tab is where administrators maintain the government-published rates, regulatory caps, indexation values, and automation toggles that drive the residential aged care billing engine, indexation engine, and claims reconciliation. These values are global: they apply to every resident and provider in the organisation, so they are configured centrally in one place rather than per resident.

## Where do I find it?

The tab lives inside the existing Maica Settings area.

1. Open **Maica Settings**.
2. In the left navigation, select **Residential Aged Care Services**.
3. The right panel shows two tabs. **RACS Configuration** is the first tab and is selected by default. **APCS Export** is the second tab.

{% hint style="info" %}
The Residential Aged Care Services area is only visible to users whose permission set group grants access to Maica Settings. See [Prerequisites and Dependencies](../prerequisites-and-dependencies.md) for the access model.
{% endhint %}

## How the tab is organised

The tab presents twelve configuration fields grouped into four accordion sections. All four sections are expanded by default, so you can scan every value at a glance. Each section can be collapsed and expanded independently while you work; reopening the tab resets every section to expanded.

The sections are grouped by **update cadence** rather than by fee type, because administrators usually update these values in response to a government publication that arrives on a known schedule (a quarterly interest rate notice, a twice-yearly indexation notice, a legislated cap change).

| Section                                                 | What it covers                                                                               | Fields | Typical update trigger                                         |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -----: | -------------------------------------------------------------- |
| **Regulatory Caps and Durations**                       | NCCC and MTCF caps, and the durations that limit certain charges                             |      5 | A legislated change to a cap or duration                       |
| **Interest Rates (Quarterly)**                          | The MPIR and BIR used for accommodation payments and late refund interest                    |      2 | Quarterly rate notices (1 January, 1 April, 1 July, 1 October) |
| **Indexed Rates and Supplements (March and September)** | The standard Basic Daily Fee, the DAP index number, and the maximum accommodation supplement |      3 | Twice-yearly indexation (20 March and 20 September)            |
| **Automation**                                          | Toggles that control whether scheduled background processes run                              |      2 | Set once, after validating the relevant process                |

Each section opens with a short paragraph explaining its purpose and update cadence, followed by its fields. The individual fields are documented in [Caps and Duration Settings](caps-and-duration-settings.md), [Rate Configuration](rate-configuration.md), and [Automation Toggles](/broken/pages/e383a85f8371009b2768bc0603c17e4011f55d0b).

## Saving changes

The tab has a single **Save** button in the card header. Saving writes all twelve fields to the underlying record in one atomic operation, so you can update several values across different sections and commit them together.

* A successful save shows a **Configuration saved** confirmation.
* If a value fails validation (for example a negative cap), the save is rejected and the validation message is shown. No values are changed.
* Switching to the APCS Export tab and back discards any unsaved edits without a confirmation prompt, in line with the standard Maica Settings behaviour.

{% hint style="success" %}
You do not have to save each section separately. Make all the changes prompted by a government publication, then click **Save** once.
{% endhint %}

## What drives these values

All twelve fields are stored on the Maica **Billing Setting** record (the `maica_cc__Setting__c` record where `API_Name__c = 'Billing_Setting'`). RACS values belong to the billing domain, so they sit on the same record that the core Billing Settings component uses for non-RACS billing configuration. The tab resolves and edits this single record.

{% hint style="warning" %}
If no active Billing Setting record exists in the org, the tab loads but shows the empty state "Unable to load the RACS configuration record. Contact your administrator if this persists." No fields are displayed and Save is unavailable. This points to a base package installation issue rather than a RACS problem.
{% endhint %}

The tab only edits these values. The behaviour they drive is owned by other parts of the solution: the billing engine, the indexation engine, the fee detection batch, and the statement reconciliation service. Entering a value here does not trigger any recalculation on its own.
