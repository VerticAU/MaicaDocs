# Fee Detection and Rate Updates

When Services Australia recalculates a resident's means tested or income tested fees, the provider needs to apply the new rate and correct any amounts already billed at the old rate. The fee detection process automates this: it polls Services Australia per resident, detects rate changes and cessations, and applies them through the same add-only update path used everywhere in RACS.

This is distinct from indexation. Indexation applies government-published standard rates to everyone at once (see [The Indexation Engine](/broken/pages/3ed372f3dda1121e094267f1d68e251488927b9d)); fee detection applies per-resident rate changes that Services Australia calculates from each resident's means assessment.

## The fee rate callout

The fee rate check is implemented as the `RAC_ResidentFeeCalloutBatch` class. It is a scheduled, batched, callout-capable process that runs one Agreement Item per chunk, so each transaction can make its own outbound call to Services Australia.

It is gated by the **Automate Resident Fee Rate Updates** toggle on the [RACS Configuration tab](/broken/pages/2b656a6ab4739aa11d813d1f9fd43403d818e278). When the toggle is off, the batch does no work and records a log entry confirming it was blocked, so administrators can keep a schedule in place and use the toggle as the on/off control.

### Scope

The batch only considers active Agreement Items on active residential agreements, and only those whose fee type is one of the means tested or income tested contributions that Services Australia publishes per-resident rates for: the Means Tested Care Fee, Income Tested Fee, Daily Accommodation Contribution, Non-Clinical Care Contribution, and Hotelling Contribution.

### The integration dependency

The actual call to Services Australia is made by a separate Services Australia integration component, not by the batch itself. When that component is not present in the org, the batch logs a warning for the item and moves on without failing. In other words, the detection framework is wired and schedulable ahead of the integration component being deployed; until the integration component is in place, runs complete but make no live calls.

### Outcomes

For each resident item, the callout returns one of four outcomes:

| Outcome         | Meaning                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **No change**   | The Services Australia rate matches the current rate. The last-checked timestamp is updated; nothing else changes. |
| **Rate change** | Services Australia reports a different rate or start date. The change is applied.                                  |
| **Cessation**   | The fee has stopped for this resident.                                                                             |
| **Error**       | The callout failed. No change is made, and the error is logged. The batch continues with the next item.            |

## Applying a detected change

When a change or cessation is detected, the update is applied by the `RAC_FeeUpdateService` using an add-only pattern, so history stays clean and already-billed periods are corrected rather than overwritten.

* **Rate change.** The current Agreement Item is end-dated at the day before the new start date, and a successor item is created at the new rate from the new start date. The retrospective adjustment chain then corrects any periods already billed at the old rate. Cap and retention totals carry forward to the successor so the resident's accumulated caps are not reset by a rate change.
* **Cessation.** The current item is end-dated at the cessation date, no successor is created, and a full credit is generated for any periods billed beyond the cessation.

{% hint style="info" %}
The same update logic backs the manual Apply Changes flow that runs from the **Check Fee Rates** button, and the single-item [Change Rate action](/broken/pages/247282d7aaca99e45a7944ad084d99ed1d4632a6). The retrospective correction itself is handled by the fee adjustment service; see [Fee Adjustment Service](/broken/pages/89fa64995643cb2152d136c621ff72e5010a3815).
{% endhint %}

## Fees excluded from automated detection

Several fee types are deliberately kept out of automated rate detection because they are maintained by other processes:

* **Basic Daily Fee** and **Daily Accommodation Payment** are reindexed by the indexation engine.
* **RAD/RAC Retention** is calculated by the retention service against the lump sum.
* **Higher Everyday Living Fee** and **Extra Service Fee** are provider-set and not driven by Services Australia rate detection.

In addition, an individual Service Agreement can be marked as excluded from automated rate changes, which removes that resident from both the scheduled fee rate check and the indexation engine. This is intended for residents whose fees are managed manually, such as short-stay respite residents billed in advance for the whole stay.

{% hint style="warning" %}
The per-Service-Agreement exclusion control is part of the RACS rollout. Confirm its availability and exact field name in your installed package version.
{% endhint %}

## Related articles

* [The Indexation Engine](/broken/pages/3ed372f3dda1121e094267f1d68e251488927b9d)
* [Scheduling and Manual Rate Changes](/broken/pages/247282d7aaca99e45a7944ad084d99ed1d4632a6)
* [Automation Toggles](/broken/pages/2b656a6ab4739aa11d813d1f9fd43403d818e278)
* [How Maica Connects to Services Australia](/broken/pages/b670aa7ed42f40262b8bec92309e0b46a3c6e4d9)
