# Fee Adjustments and Corrections

## Overview

Sometimes a fee needs correcting after it has already been billed. A rate might change part way through a period, a fee might stop applying, or Services Australia might advise a new amount that takes effect from an earlier date. When this happens, Maica works out the difference for the periods already billed and creates an adjustment so the resident's account ends up correct, without you having to recalculate anything by hand.

This article explains when an adjustment happens, how the correction is created, and how to check the result.

## When an adjustment is needed

An adjustment is created whenever a fee's rate changes with effect from a date that has already been billed, or when a fee ceases and some of the billed period needs to be credited back. Common triggers include:

* A resident's means tested fee changes following a new fee advice from Services Australia, backdated to an earlier date.
* A fee is corrected because it was set up at the wrong rate.
* A fee stops applying from a date that falls inside a period already billed.

In each case, the original charge was correct at the time it was billed, so Maica does not delete or rewrite it. Instead it adds a separate correction for the difference, which keeps a clear audit trail.

## How adjustment invoices are created

There are two ways a correction gets triggered, and both produce the same kind of result.

| Trigger       | How it starts                                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automatic** | When Services Australia advises a rate change or cessation, Maica closes the old fee item, creates the new one, and generates the correction for the already-billed periods. |
| **User-led**  | When you replace a fee item with a new one whose start date falls before the last billed period, Maica recognises the overlap and generates the correction when you save.    |

In both cases Maica creates a single adjustment invoice with one correction line that covers the difference for the affected periods:

* If the new rate is higher, the line is an extra charge.
* If the new rate is lower, or the fee has ceased, the line is a credit.

Maica also checks whether any part of the same period has already been corrected through payment reconciliation, and only adjusts the remaining difference. This prevents a period from being corrected twice.

{% hint style="info" %}
The correction covers only the days that were billed at the old rate from the new rate's effective date onward. Days billed correctly are left untouched, and future billing simply uses the new rate.
{% endhint %}

## Reviewing the result

After an adjustment is created, you can review it on the resident's account. Look for the adjustment invoice and its correction line, which is dated to the day the adjustment was run and identifies the fee item it relates to. A positive amount is an additional charge to the resident; a negative amount is a credit.

{% hint style="success" %}
If the rate change has no effect on already-billed periods, for example because nothing had been billed yet at the old rate, Maica makes no correction and simply applies the new rate going forward. Seeing no adjustment in that situation is expected.
{% endhint %}
