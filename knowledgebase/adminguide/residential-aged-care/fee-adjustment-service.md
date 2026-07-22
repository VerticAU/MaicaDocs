# Fee Adjustment Service

When a fee rate change takes effect on a date that falls inside a period that has already been billed, the resident has been charged at the old rate for days that should have been charged at the new rate. The fee adjustment service generates a compensating invoice for the difference, so the resident's account reflects the correct rate without the original invoices having to be reversed.

This article explains what the service does, when it runs, and how the adjustment is calculated. It is written for administrators and power users who support the billing process.

{% hint style="info" %}
This service works hand in hand with the [Statement reconciliation service](statement-reconciliation-service.md). Together they keep the two ways a rate can be corrected (a detected or manual rate change, and a payment statement reconciliation) from adjusting the same period twice.
{% endhint %}

## What the service does

The service produces a single adjustment for the retrospective window, which runs from the new rate's start date to the last period already billed at the old rate. The adjustment is either:

* **An additional charge**, when the rate increased, or
* **A credit**, when the rate decreased or the fee ceased.

The adjustment is recorded as an invoice line item marked as a **Rate Adjustment**, raised against the resident's service agreement through the shared adjustment invoice process. It does not alter the original invoices.

{% hint style="warning" %}
The adjustment quantity is derived from the existing invoice line items in the window, not recalculated from calendar days. The original line items already reflect any leave adjustments, pro-rata splits, or cap limits applied when they were billed, so reusing them keeps the adjustment consistent with the original charge.
{% endhint %}

## When the service runs

There are two ways the service is triggered. Both follow the same calculation logic, so the result is the same regardless of how the rate change arose.

### After an automated fee update or cessation

When a rate change is applied to an agreement item (for example following a detected government rate change), the fee update process creates the new agreement item and then invokes the adjustment service for any billing already stamped at the old rate inside the window. The same happens when a fee ceases: the service is invoked with an effective new rate of zero, producing a full credit for any billing after the cessation date.

{% hint style="info" %}
For how rate changes are detected and applied, see [Fee detection and rate updates](/broken/pages/3c4471bff8b9aadb01aa7d0f1f31cddb161e29e8).
{% endhint %}

### After a manual rate change

When a provider records a rate change in the **Manage RACS Agreement** component and the new agreement item's start date is earlier than the period last billed on the previous item, the save handler invokes the same adjustment service. This lets providers generate adjustments from manually entered rate changes, not only from changes detected from Services Australia.

## How the adjustment is calculated

The calculation follows a consistent sequence:

1. **Determine the window.** The window starts at the new rate's start date (or the cessation date) and ends at the last period billed on the previous agreement item. If nothing was billed in that window, the service exits cleanly and no adjustment is created.
2. **Find the affected line items.** The service reads the existing line items on the previous agreement item that fall within the window. Line items already marked as a Rate Adjustment are excluded, so a period is never adjusted twice.
3. **Work out the adjustable quantity.** For each line item, the service uses the billed quantity, splitting it proportionally where a billing period straddles the window start so that only the in-window days are adjusted.
4. **Apply the rate difference.** The adjustment uses the difference between the new and old rate. For a cessation, the new rate is zero, so the difference is the full old rate as a credit.
5. **Deduplicate against statement reconciliation.** Before creating the adjustment, the service checks for existing **Statement Reconciliation** line items covering the same agreement item and period. If reconciliation has already corrected some or all of the difference, only the residual amount is generated.

If, after these steps, there is nothing left to adjust (the rate is unchanged, the quantity is zero, or reconciliation already covered it), no adjustment invoice is created.

{% hint style="success" %}
Because the service excludes prior Rate Adjustment line items and nets off existing Statement Reconciliation line items, it is safe for the same rate change to be processed by both the detection path and the reconciliation path without double-charging or double-crediting the resident.
{% endhint %}

## What this service does not do

The fee adjustment service works entirely on existing Maica data. It does not call Services Australia, it does not create or end-date agreement items (that is the fee update process), and it does not perform cap validation or leave counting. Its single responsibility is to calculate and raise the adjustment for an already-billed period.
