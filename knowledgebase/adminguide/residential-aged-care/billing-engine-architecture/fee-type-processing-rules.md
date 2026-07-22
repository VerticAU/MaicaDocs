# Fee Type Processing Rules

Not every fee is billed the same way. The billing engine reads the **Fee Type** on each Agreement Item's linked Support Item and applies the processing rules that fee type requires: some fees are subject to regulatory caps, some are gated by a duration, and most are billed straight through. This article explains how fee types are classified, how caps are validated, and how billing changes on the day a resident departs.

## Fee type classification

The engine groups fee types into three handling classes.

| Handling class   | Fee types                                                                                                                                                             | How they are billed                                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Capped**       | Non-Clinical Care Contribution (NCCC), Means Tested Care Fee (MTCF)                                                                                                   | Routed through the Cap Service, which limits the chargeable amount to remaining cap headroom.                                      |
| **Retention**    | RAD/RAC Retention                                                                                                                                                     | The deduction amount is calculated by the Retention Service; the Cap Service gates whether retention is still within its duration. |
| **Pass-through** | Income Tested Fee (ITF), Basic Daily Fee, Hotelling Contribution, Daily Accommodation Payment, Daily Accommodation Contribution, Accommodation Charge, and other fees | Billed at their calculated amount with no monetary cap.                                                                            |

The Cap Service is the authoritative gate on which fee types have cap semantics. It only accepts NCCC, MTCF, ITF, and retention. The accommodation and daily fees are never sent to it; they pass through at their raw amount.

{% hint style="info" %}
The Income Tested Fee is a pass-through fee with no monetary cap of its own.
{% endhint %}

## Cap validation

For capped fee types, the engine asks the Cap Service to evaluate the proposed charge against every applicable cap before billing it. The service returns the chargeable amount (clamped to remaining headroom, or zero if fully blocked), the cap that was hit, and a human-readable reason.

| Fee type              | Caps applied                                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **NCCC**              | A duration cap (no NCCC after the resident's NCCC expiry date) and a lifetime cap (cumulative NCCC against the configured lifetime cap). |
| **MTCF**              | An annual cap (per-resident, see below) and a lifetime cap.                                                                              |
| **RAD/RAC Retention** | A duration gate: no retention after the retention expiry date. The amount itself is capped by the Retention Service.                     |

The cap values themselves are configured on the [RACS Configuration tab](/broken/pages/0ae4e45ff9f83e2a3a240a31c2b87a029130a33f) and documented in [Caps and Duration Settings](../the-racs-configuration-tab/caps-and-duration-settings.md).

{% hint style="info" %}
There is no daily monetary cap. Daily rates are simply applied to the number of chargeable days in each period by the period calculator. The caps that exist are annual, lifetime, and duration based.
{% endhint %}

### When a cap is reached

When a cap is engaged, the chargeable amount is reduced to whatever headroom remains (which may be zero), and the engine sets **Cap Reached** on the Agreement Item. A capped item drops out of the engine's selection on subsequent runs, so it is not re-evaluated until its circumstances change (for example, an annual cap resets). A charge that exactly fills the remaining headroom is still treated as a cap hit so the item is correctly flagged.

### The MTCF annual cap year

The MTCF annual cap does not follow the financial year. Each resident has their own cap year that begins on the anniversary of their first entry to aged care. When a run falls on or after the next anniversary, the engine rolls the cap year over: it resets the resident's annual cumulative totals to zero and advances the cap year start to the current anniversary, so a fresh year of headroom is available for that day's charge. This rollover happens before the annual cap is evaluated.

## Day of departure rules

Billing on the day a resident departs is handled by the departure process rather than the standard daily cycle. The governing principle is that fees which depend on a government subsidy are not charged for the departure day, because no subsidy is payable for it. Self-funded charges, such as the Basic Daily Fee and a self-funded Daily Accommodation Payment, may still apply.

{% hint style="info" %}
The full departure sequence, including refund timing and interest, is covered in [Exiting a Resident or Recording a Death](/broken/spaces/hehRshYIRk6XUlay9L3b/pages/5165be3af2d6397f82ae455706d7b19c5db43e5c).
{% endhint %}
