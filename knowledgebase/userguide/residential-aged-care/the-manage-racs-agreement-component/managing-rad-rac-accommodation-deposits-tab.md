---
description: >-
  Learn how to set up and manage a resident's accommodation deposit on the
  RAD/RAC tab
---

# Managing RAD/RAC Accommodation Deposits tab

The **RAD/RAC** tab manages a resident's accommodation deposit: their Refundable Accommodation Deposit (RAD), Refundable Accommodation Contribution (RAC), or legacy Accommodation Bond. The deposit is held as a Lump Sum Account, a financial ledger where every payment, deduction, draw-down, and refund is recorded as a transaction. Together the transactions give a complete audit trail of the deposit.

Not every resident has a deposit. Residents who pay daily only, or who are fully government-supported, have no lump sum account, and the tab handles that case too.

## What setting up an account creates

You do not need to configure any fee items on the Fees tab before you create the lump sum account. Setting up the account creates the fee items that belong to it, in a single step. If any part fails, nothing is created.

| Deposit type                              | Daily item created and linked to the account                                                                             | Retention item            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| **Refundable Accommodation Deposit**      | A Daily Accommodation Payment at the full rate, worked out from the agreed room price and the interest rate at agreement | Post 1 November 2025 only |
| **Refundable Accommodation Contribution** | A Daily Accommodation Contribution at the rate you enter                                                                 | Post 1 November 2025 only |
| **Accommodation Bond**                    | None                                                                                                                     | None created at setup     |

The retention item is created only where the payment method is not **DAP Only**, because retention is charged on a lump sum balance and a DAP Only account never holds one. Its rate comes from the **RAC Retention Rate** setting. See **Configuring Resident Fees tab** for the terms of a retention item.

{% hint style="warning" %}
The Service Agreement needs a **Fee Arrangement** and a **Start Date** before an account can be set up. The daily and retention items start on the Service Agreement's start date.
{% endhint %}

The usual sequence is:

1. Create the lump sum account on the RAD/RAC tab.
2. Once the first payment is received, record it on the account.
3. Record any further payments, draw-downs and refunds as they occur. Maica adjusts the linked daily item for you, as described below.

## Setting up the lump sum account

When no account exists, the tab offers two choices: **Set Up Lump Sum Account** or **Record as DAP Only**. Choose Record as DAP Only where the resident pays daily and no deposit applies.

When you set up an account, you confirm the following:

* **Deposit Type.** Pre-filled from the resident's circumstances: a Refundable Accommodation Contribution for low means residents, an Accommodation Bond for Pre-1 July 2014 residents, otherwise a Refundable Accommodation Deposit. The types offered depend on the fee arrangement, as shown below.
* **Payment Method.** Full Lump Sum, Combination, DAP Only, or Undecided. Undecided is valid at entry, because the resident has up to six months to decide and pay.
* **DAC rate.** Required for a Refundable Accommodation Contribution. Use **Check Fee Rates** on the Fees tab to retrieve the current Services Australia rate, or enter the rate from the fee advice letter.

| Fee arrangement          | Deposit types offered                                                     |
| ------------------------ | ------------------------------------------------------------------------- |
| **Pre-1 July 2014**      | Accommodation Bond only                                                   |
| **1 July 2014**          | Refundable Accommodation Deposit or Refundable Accommodation Contribution |
| **Post 1 November 2025** | Refundable Accommodation Deposit or Refundable Accommodation Contribution |

Maica refuses an Accommodation Bond on any other arrangement, and a Refundable Accommodation Deposit or Contribution on Pre-1 July 2014, before anything is saved.

The account is created with a status of **Awaiting Payment**, and the agreed room price is copied from the Service Agreement.

{% hint style="warning" %}
Setting up accommodation requires the Service Agreement's **Funding** record to have a **Location** set. The room selection is scoped to that Location, so you only pick from rooms at the resident's facility. If the Funding record has no Location, Maica blocks the setup: the room lookup and the Save button are unavailable, and a message asks you to set the Location on the Funding record before adding accommodation. Set the Location first, then return to the tab.
{% endhint %}

### Record as DAP Only

**Record as DAP Only** creates no lump sum account. It records the payment method on the Service Agreement and creates the daily item at the full rate from the Service Agreement's start date: a Daily Accommodation Payment, or a Daily Accommodation Contribution at the rate you enter for a low means resident. The item is not linked to an account.

The action is not offered on the Pre-1 July 2014 arrangement, where the daily charge is an Accommodation Charge that you add through **Add Fee Item**.

## Recording payments

Two operations record money coming in.

* **Record Initial Payment** records the first deposit payment and moves the account to **Active**. It can only be recorded while the account is **Awaiting Payment**, and its date cannot be before the Service Agreement's start date.
* **Record Additional Payment** records a later top-up on an **Active** account.

For both, the amount received cannot take the balance above the agreed room price.

{% hint style="warning" %}
The balance can never exceed the agreed room price. A deposit above the room price would count as a loan under aged care legislation, which creates extra compliance obligations. Maica blocks any payment that would breach this limit.
{% endhint %}

## How the daily payment follows the balance

Every payment, partial refund and draw-down changes what the resident owes daily on the unpaid part of the room price. Maica changes the linked daily item for you. Where the item has already been billed, Maica end-dates it and creates a successor at the new rate from the effective date, so the earlier rate stays on record. An item that has never been billed is updated in place.

| Account                             | What happens to the linked daily item                                                                                                                                                                       |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Combination, RAD**                | A payment, partial refund or draw-down steps the Daily Accommodation Payment to the recalculated rate. A Combination paid to the full price steps to $0.00 and stays linked.                                |
| **Full Lump Sum or Undecided, RAD** | A payment or partial refund steps the temporary Daily Accommodation Payment. The payment that covers the agreed room price ends it, and the link to the account is removed. A draw-down does not change it. |
| **RAC**                             | The linked Daily Accommodation Contribution is set by Services Australia and is never recalculated. A Full Lump Sum RAC ends its temporary item when the payment covers the agreed room price.              |
| **Accommodation Bond**              | No daily item is linked.                                                                                                                                                                                    |

The recalculated daily rate for a Combination RAD is:

```
Daily rate = (Agreed Room Price - Current Balance - Cumulative Retention) x MPIR at Agreement / 100 / 365
```

Cumulative Retention is counted only on the Post 1 November 2025 arrangement. On every other arrangement it is zero. The calculation always uses the interest rate locked in when the accommodation agreement was signed, not the current rate, and the Post 1 November 2025 DAP index factor is applied on top. The rate is never negative.

## Draw-downs and partial refunds

Two operations record money coming out while the resident is still in care.

* **Record Draw-Down** records a withdrawal from the balance, for example to fund care equipment at the resident's request. A reason is required for the audit trail.
* **Process Partial Refund** records a partial return of the balance to the resident. The amount cannot exceed the current balance.

{% hint style="warning" %}
A partial refund that would leave a **Full Lump Sum** account below the agreed room price is blocked with a message to change the payment method to **Combination** first, then process the refund. A refund that takes the balance to exactly zero is allowed. The check applies only where the arrangement has a daily payment, so refunds on an Accommodation Bond are not blocked.
{% endhint %}

{% hint style="info" %}
The full refund of the balance when a resident permanently departs is handled by the departure process, not this tab. The RAD/RAC tab handles in-care partial refunds and draw-downs only.
{% endhint %}

Some draw-downs are created automatically. Where a fee item has Automatic RAD Drawdown enabled, the billing engine draws the fee from the deposit during each billing run. These appear in the transaction history with a source of System (Billing Engine), distinct from the entries you record by hand.

## Balance limits and transaction types

Every balance movement is a Lump Sum Transaction. The transaction types are:

| Transaction type               | Created by                | Description                                             |
| ------------------------------ | ------------------------- | ------------------------------------------------------- |
| **Initial Payment**            | You                       | The first deposit payment received                      |
| **Additional Payment**         | You                       | A later top-up payment                                  |
| **Retention Deduction**        | Billing engine            | A periodic retention deduction, where retention applies |
| **Draw-Down**                  | You or the billing engine | A withdrawal from the balance                           |
| **DAP Adjustment**             | Billing engine            | A Combination method adjustment                         |
| **Partial Refund**             | You                       | A partial return of the balance during care             |
| **Refund**                     | Departure process         | The final balance refund on permanent departure         |
| **Transfer In / Transfer Out** | You                       | Used when a resident transfers between providers        |
| **Adjustment**                 | You                       | A manual correction                                     |

{% hint style="info" %}
Retention deductions are created automatically by the billing engine, never recorded by hand. The engine applies the retention timing rules and stops deductions once the retention period ends. The account summary shows the retention expiry date so you can see when retention will cease.
{% endhint %}
