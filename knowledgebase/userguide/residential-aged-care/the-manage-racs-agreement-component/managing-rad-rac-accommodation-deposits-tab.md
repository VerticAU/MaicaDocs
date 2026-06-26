# Managing RAD/RAC Accommodation Deposits tab

The **RAD/RAC** tab manages a resident's accommodation deposit: their Refundable Accommodation Deposit (RAD), Refundable Accommodation Contribution (RAC), or legacy Accommodation Bond. The deposit is held as a Lump Sum Account, a financial ledger where every payment, deduction, draw-down, and refund is recorded as a transaction. Together the transactions give a complete audit trail of the deposit.

Not every resident has a deposit. Residents who pay daily only, or who are fully government-supported, have no lump sum account, and the tab handles that case too.

## Order of operations: fees first

For a resident who will pay a deposit, configure the Daily Accommodation Payment item on the [Fees tab](/broken/pages/a8f207d7c8347974147453ac94cecde562855aa9) **before** you create the lump sum account. The account links automatically to the active daily accommodation payment item, and that item must already exist.

{% hint style="warning" %}
If you try to create a lump sum account before a Daily Accommodation Payment item exists on the Fees tab, Maica blocks the setup and asks you to configure the fee item first. Set up the payment item at the full room price initially, since the lump sum amount may not be known yet.
{% endhint %}

The usual sequence is:

1. Configure the Daily Accommodation Payment item on the Fees tab.
2. Create the lump sum account on the RAD/RAC tab. Maica links it to the payment item automatically.
3. Once the first payment is received, record it on the account.
4. For Combination residents, update the Daily Accommodation Payment rate on the Fees tab to reflect the partial lump sum.

## Setting up the lump sum account

When no account exists, the tab offers two choices: **Set Up Lump Sum Account** or **Record as DAP Only**. Choose Record as DAP Only where the resident pays daily and no deposit applies.

When you set up an account, you confirm two things:

* **Deposit Type.** Pre-filled from the resident's circumstances: a Refundable Accommodation Contribution for low means residents, an Accommodation Bond for Pre-1 July 2014 residents, otherwise a Refundable Accommodation Deposit. You can override it.
* **Payment Method.** Full Lump Sum, Combination, DAP Only, or Undecided. Undecided is valid at entry, because the resident has up to six months to decide and pay.

The account is created with a status of **Awaiting Payment**, and the agreed room price is copied from the Service Agreement.

## Recording payments

Two operations record money coming in.

* **Record Initial Payment** records the first deposit payment and moves the account to **Active**.
* **Record Additional Payment** records a later top-up.

For both, the amount received cannot take the balance above the agreed room price.

{% hint style="warning" %}
The balance can never exceed the agreed room price. A deposit above the room price would count as a loan under aged care legislation, which creates extra compliance obligations. Maica blocks any payment that would breach this limit.
{% endhint %}

## Combination method and DAP recalculation

For a resident on the Combination method, part of the room price is covered by the lump sum and the rest is paid daily. Whenever the balance changes, the daily portion must be recalculated:

```
New DAP portion = (Agreed Room Price - Current Balance) x MPIR at Agreement / 365
```

The calculation always uses the interest rate locked in when the accommodation agreement was signed, not the current rate, so the daily payment reflects what the resident agreed to at entry.

{% hint style="info" %}
Maica recalculates and shows the new daily portion, then prompts you to update the Daily Accommodation Payment rate on the Fees tab. This keeps the rate change a deliberate, auditable step rather than a silent automatic one.
{% endhint %}

## Draw-downs and partial refunds

Two operations record money coming out while the resident is still in care.

* **Record Draw-Down** records a withdrawal from the balance, for example to fund care equipment at the resident's request. A reason is required for the audit trail.
* **Process Partial Refund** records a partial return of the balance to the resident.

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

## Related articles

* [Configuring Resident Fees (Fees Tab)](/broken/pages/a8f207d7c8347974147453ac94cecde562855aa9)
* [Relocating a Resident (Accommodation Tab)](/broken/pages/8159cf3281b3f449f9544c2d2b3013d8332116dc)
* [The Manage RACS Agreement Component](/broken/pages/77d88ed7b33d92dacd001e0cf1b212175adffd9d)
