# Keeping Care Recipient data in Sync

## Overview

As well as sending events to Services Australia, Maica reads information back from it. This inbound data keeps each resident's record aligned with what the government holds, so the fees, balances, and payment details you see in Maica reflect the official position. Inbound data is read-only: it updates the resident's record in Maica but is never changed and sent back through these channels.

This article explains the resident data Maica brings in and what each piece is used for.

## Care recipient details sync

The care recipient details sync is the core inbound process. It retrieves a resident's details as held by Services Australia, including their approvals and identifiers, and aligns the resident's funding record in Maica. This sync underpins the other data Maica reads, because it confirms the resident's identity and care details against the government record.

{% hint style="info" %}
The care recipient details sync can be run for an individual resident or in bulk across residents. The configuration and bulk options are covered in the administration guide.
{% endhint %}

## The inbound data Maica reads

Beyond the core details sync, Maica reads a number of summaries and statements from Services Australia. Each keeps a specific part of the resident's financial or care picture current.

| Inbound data                                      | What it tells you                                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Care recipient fee summary**                    | The government-determined fees that apply to the resident, used as the reference when configuring their fees. |
| **Medicare details**                              | The resident's Medicare identity information held by Services Australia.                                      |
| **Leave balances**                                | The resident's remaining social and transition care leave.                                                    |
| **Respite balances**                              | The resident's remaining respite days.                                                                        |
| **Service summary**                               | The master record of the provider's service as held by Services Australia.                                    |
| **Service occupancy summary**                     | The daily bed occupancy confirmed by Services Australia.                                                      |
| **24/7 registered nurse supplement summary**      | The monthly registered nurse supplement payment detail.                                                       |
| **Claims**                                        | The pre-calculated monthly subsidy breakdown for review and finalisation.                                     |
| **Payment statement and service payment summary** | The detailed breakdown of payments and totals, used when reconciling.                                         |

{% hint style="success" %}
The fee summary is especially useful when setting a resident's fees, because it shows the government's current determination to check your fee items against. The payment data feeds the reconciliation process. See [Reconciling Payments](../reconciling-payments.md).
{% endhint %}
