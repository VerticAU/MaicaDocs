# Rate Configuration

Two sections of the [RACS Configuration tab](./) hold the published rates and indexation values that the billing and indexation engines read. The **Interest Rates** section changes every quarter; the **Indexed Rates and Supplements** section changes twice a year at indexation. Keeping these values current is the administrator's responsibility, and the engines use whatever is stored here at the time they run.

{% hint style="info" %}
Enter each rate exactly as the government publishes it. For a percentage rate, type the published figure (for example, enter `7.78` for a rate of 7.78%).
{% endhint %}

## Interest rates (quarterly)

The Australian Government publishes these two rates each quarter, on 1 January, 1 April, 1 July, and 1 October. Update both when a new quarterly notice is released.

| Field                | Type    | What it controls                                                                                                                                                                                                                            | On-screen help text                                                                                                                |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **RAC Current MPIR** | Percent | The current Maximum Permissible Interest Rate (MPIR). Used to convert between a lump sum (RAD) and a daily payment (DAP), and to calculate the Daily Accommodation Contribution (DAC), at the time a new accommodation agreement is signed. | Current MPIR published by the Australian Government. Updated quarterly. Used for new accommodation agreements.                     |
| **RAC Current BIR**  | Percent | The current Base Interest Rate (BIR). Used to calculate the interest owed to a resident or their estate when a refundable accommodation deposit is refunded late.                                                                           | Current BIR published by the Australian Government. Updated quarterly. Used to calculate interest on delayed refunds at departure. |

{% hint style="warning" %}
The MPIR stored here is the rate used for **new** agreements. The MPIR that applied when an existing agreement was signed is captured separately on that resident's Service Agreement, so updating this field does not change the rate locked in on agreements already in place.
{% endhint %}

{% hint style="info" %}
When a departure refund is processed, the BIR current in this field is captured against the resident's Lump Sum Account and used to calculate any late refund interest. For how that interest is calculated, see [Refunding Lump Sum Deposits](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/refunding-lump-sum-deposits).
{% endhint %}

## Indexed rates and supplements (March and September)

These values are reindexed twice a year, on 20 March and 20 September. Update them when each new indexation is published, before you run the indexation engine.

| Field                            | Type     | What it controls                                                                                                                                                                                                     | On-screen help text                                                                           |
| -------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **RAC BDF Standard Rate**        | Currency | The current published standard Basic Daily Fee (BDF). The indexation engine reads this rate when it updates Agreement Items at each indexation date.                                                                 | Current published BDF daily rate. Updated in March and September at indexation.               |
| **RAC DAP Index Number**         | Number   | The current DAP indexation number published by Services Australia. The indexation engine uses it to recalculate DAP rates for residents under 1 November 2025 fee arrangements.                                      | Current DAP index number from Services Australia. Enter before running the Indexation Engine. |
| **Max Accommodation Supplement** | Currency | The maximum daily accommodation supplement rate the government pays for low means residents. The billing engine uses it to determine accommodation payment eligibility and to help calculate means tested care fees. | Maximum daily accommodation supplement rate. Indexed on 20 March and 20 September.            |

{% hint style="warning" %}
Enter the new **DAP Index Number** before triggering the indexation engine. The engine reads the value stored here at the moment it runs, so an out-of-date index number produces out-of-date DAP rates.
{% endhint %}

## How these values are used

Entering a value on this tab does not recalculate anything by itself. The stored values are read by other processes when they run:

* The **billing engine** reads the BDF standard rate and the maximum accommodation supplement as it bills.
* The **indexation engine** reads the BDF standard rate and the DAP index number at each indexation date.
* The **departure process** captures the BIR when a refund is processed.

For the mechanics of indexation, see [The Indexation Engine](../billing-engine-architecture/the-indexation-engine.md).
