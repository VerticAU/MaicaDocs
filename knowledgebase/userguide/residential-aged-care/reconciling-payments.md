# Reconciling Payments

## Overview

Each month, Services Australia calculates and pays the government subsidy for your residents. Reconciliation is the process of checking that what Services Australia authorised matches what Maica has already billed, and correcting any difference. Maica does most of this for you by comparing the authorised amounts against your existing charges and creating adjustments to close any gaps.

This article explains what reconciliation compares and how to run it.

## Payment statement versus invoices

Two sources come together in reconciliation:

* The **payment data from Services Australia**, read into Maica, which sets out the authorised amount for each resident. This is the reference, the figure that is treated as correct.
* The **invoices and charges in Maica**, including any rate adjustments already made, which represent what you have billed.

Reconciliation compares the two. Where Maica's charges do not match the authorised amount, it creates a reconciliation adjustment so the resident's account lines up with what Services Australia authorised.

{% hint style="info" %}
The payment data that reconciliation works from is read in from Services Australia. For how that inbound data arrives, see [Keeping Care Recipient Data in Sync](how-maica-connects-to-services-australia/keeping-care-recipient-data-in-sync.md).
{% endhint %}

## Running reconciliation

Reconciliation runs in two ways:

| Mode                | When it runs                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Whole claim**     | Automatically, after the month's claim data has been brought in from Services Australia, across all residents in the claim. |
| **Single resident** | On demand, using the **Run Reconciliation** action on a resident's funding record, when you want to reconcile one resident. |

Both work the same way. Maica looks at the authorised amount, compares it with what has been billed, and adds a reconciliation adjustment only for the difference.

{% hint style="success" %}
Reconciliation is safe to re-run. If a resident has already been reconciled, the comparison finds no remaining difference and adds nothing further, so running it again will not create duplicate adjustments.
{% endhint %}

{% hint style="warning" %}
Reconciliation and fee rate corrections are aware of each other. If a rate change has already corrected part of a period, reconciliation only adjusts what remains, so the same period is never corrected twice. See [Fee Adjustments and Corrections](fee-adjustments-and-corrections.md).
{% endhint %}

## When something cannot be reconciled

If Maica cannot resolve a particular amount, for example because it cannot match it to a charge, it records that case for review rather than stopping. The rest of the reconciliation still completes. Your billing team can review these logged cases and resolve them manually.
