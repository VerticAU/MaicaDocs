# Fee Detection and Rate Updates

When Services Australia recalculates a resident's means tested or income tested fees, the provider needs to apply the new rate and correct any amounts already billed at the old rate. The fee detection process automates this: it polls Services Australia per resident, detects rate changes and cessations, and applies them through the same add-only update path used everywhere in RACS.

This is distinct from indexation. Indexation applies government-published standard rates to everyone at once (see [The Indexation Engine](the-indexation-engine.md)); fee detection applies per-resident rate changes that Services Australia calculates from each resident's means assessment.

## The fee rate callout

The fee rate check is implemented as the `RAC_ResidentFeeCalloutBatch` class. It is a scheduled, batched, callout-capable process that runs one Agreement Item per chunk, so each transaction can make its own outbound call to Services Australia.

It is gated by the **Automate Resident Fee Rate Updates** toggle on the [RACS Configuration tab](https://knowledge.maica.com.au/maica-knowledge-base/maica-administration-guide/residential-aged-care/the-racs-configuration-tab). When the toggle is off, the batch does no work and records a log entry confirming it was blocked, so administrators can keep a schedule in place and use the toggle as the on/off control.

### Scope

The batch only considers active Agreement Items on active residential agreements, and only those whose fee type is one of the means tested or income tested contributions that Services Australia publishes per-resident rates for: the Means Tested Care Fee, Income Tested Fee, Daily Accommodation Contribution, Non-Clinical Care Contribution, and Hotelling Contribution.

Hotelling Contribution is polled because Services Australia publishes a rate for it, even though the billing engine applies no cap to it locally. Daily Accommodation Contribution is the Maica label for the fee Services Australia calls the Means Tested Accommodation Contribution; they are the same fee.

### Outcomes

For each resident item, the callout returns one of four outcomes:

| Outcome         | Meaning                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| **No change**   | The Services Australia rate matches the current rate. The last-checked timestamp is updated; nothing else changes. |
| **Rate change** | Services Australia reports a different rate or start date. The change is applied.                                  |
| **Cessation**   | The fee has stopped for this resident.                                                                             |
| **Error**       | The callout failed. No change is made, and the error is logged. The batch continues with the next item.            |

## The last-checked watermark

Each Agreement Item carries a **Fee Last Checked** timestamp (`Fee_Last_Checked_DateTime__c`). Where it is populated, the batch sends it to Services Australia as the "updated from" parameter, so each poll asks only for changes published since the previous one. On an item's first ever poll the parameter is omitted entirely and the full picture is requested.

{% hint style="warning" %}
**A failed poll does not advance the watermark.** Only a poll that actually completed updates the timestamp. This matters because the watermark is fed straight back to Services Australia on the next run: stamping a failed attempt would make the following poll ask only for changes since an attempt that never landed, and a rate change published inside the missed window would never be seen again. The resident would keep billing at the old rate indefinitely, with nothing to indicate it.
{% endhint %}

A poll that **completed** still advances the watermark even when the answer was uninteresting. That includes a response that came back empty, and a response the classifier could not use. In both cases Services Australia answered, so the window has genuinely been covered. Declining the stamp only on a failure costs at most one extra night of replay.

### An empty response means no change, not a cessation

When a watermarked poll returns no rows at all, that is the normal steady state of a fee that has not changed. The batch treats it as no change, and deliberately writes no log entry, because one warning per unchanged fee per night would be noise rather than signal.

This is distinct from a response that arrives carrying rows but none for the fee code that was asked about. That case is classified and does produce a warning, because Services Australia answered about the resident without mentioning the fee.

{% hint style="info" %}
The attended **Check Fee Rates** action treats an empty response the same way, but does write a warning, because a user asked the question and is waiting for an answer.
{% endhint %}

### When a poll fails

An integration failure never end-dates an Agreement Item and never stops the batch. A 4xx or 5xx response, an amount that cannot be parsed, a missing service or care recipient identifier, and an unconfigured PRODA provider all degrade to no change plus one warning, and the run moves on to the next item. The item keeps its previous watermark, so the next run re-asks for the same window.

## Applying a detected change

When a change or cessation is detected, the update is applied by the `RAC_FeeUpdateService` using an add-only pattern, so history stays clean and already-billed periods are corrected rather than overwritten.

* **Rate change.** The current Agreement Item is end-dated at the day before the new start date, and a successor item is created at the new rate from the new start date. The retrospective adjustment chain then corrects any periods already billed at the old rate. Cap and retention totals carry forward to the successor so the resident's accumulated caps are not reset by a rate change.
* **Cessation.** The current item is end-dated at the cessation date, no successor is created, and a full credit is generated for any periods billed beyond the cessation.

The successor item is seeded with its own billing cursor before it is inserted, derived from where the predecessor stopped. Without that seeding a successor would carry no cursor, and the billing engine only selects items whose cursor is populated, so the fee would never bill again. See [Next Billing Date and Catch-Up Chains](next-billing-date-and-catch-up-chains.md).

{% hint style="info" %}
The same update logic backs the manual Apply Changes flow that runs from the **Check Fee Rates** button, and the single-item Change Rate action. The retrospective correction itself is handled by the fee adjustment service; see [Fee Adjustment Service](../fee-adjustment-service.md).
{% endhint %}

## Fees excluded from automated detection

Several fee types are deliberately kept out of automated rate detection because they are maintained by other processes:

* **Basic Daily Fee** and **Daily Accommodation Payment** are reindexed by the indexation engine.
* **RAD/RAC Retention** is calculated by the retention service against the lump sum.
* **Higher Everyday Living Fee** and **Extra Service Fee** are provider-set and not driven by Services Australia rate detection.

In addition, an individual Service Agreement can be marked as excluded from automated rate changes using the **Exclude from Automated Rate Changes** checkbox (`Exclude_From_Automated_Rate_Changes__c`) on the Service Agreement. When set, the resident is removed from both the scheduled fee rate check and the indexation engine. This is intended for residents whose fees are managed manually, such as short-stay respite residents billed in advance for the whole stay. The manual **Check Fee Rates** action remains available for an excluded resident.
