# Retention and Drawdown Logic

Two automated mechanisms reduce a resident's lump sum balance over the life of their stay: **retention**, the legislated amount a provider may keep from a Refundable Accommodation Deposit, and **automatic draw-down**, where a fee is settled directly from the deposit instead of being invoiced to the resident. Each is implemented as its own Apex service that the billing engine calls during the nightly run, and each writes its movements into the lump sum ledger.

This article explains how both services calculate their amounts, the records they create, and how they avoid ever pushing a balance below zero. It is written for administrators and power users who need to understand or support the billing engine's treatment of lump sum accounts.

{% hint style="info" %}
Both services depend on the objects described in [The Lump Sum Account Model](/broken/pages/64b4343810e7f34b807b481415f327eb40ba0f32), and both are driven by the billing engine covered in [Billing Engine Architecture](/broken/pages/a45d130dba1117c83b040866430cbc117789f738).
{% endhint %}

## Retention

Retention is the portion of a Refundable Accommodation Deposit that a provider is permitted to keep over time, at a legislated annual rate. Maica calculates it with the `RAC_RetentionService`, a stateless, read-only service that performs no database writes of its own. It returns a calculated amount and a pre-built transaction; the billing engine is responsible for committing the records.

### Daily-balance segmentation

Retention is not a flat monthly figure. Because a resident's balance can change part way through a period (an additional payment, a draw-down, a refund), the service segments the billing period at every balance-changing transaction and charges each segment at the balance that applied during it.

For a period containing transactions, the service divides the period into segments. The transaction date is treated as the last day of the old balance, and the new balance applies from the following day. Each segment's retention is then:

```
segment retention = annual rate / 365 x segment balance x segment days
```

The period total is the sum of all segments. A period with no balance changes is simply one segment at the opening balance.

{% hint style="info" %}
The annual rate is stored as a decimal on the retention fee item (for example, 0.0200 for 2% per annum), not as a dollar figure. The divisor is always 365, even in a leap year, matching how Services Australia publishes its daily-rate tables.
{% endhint %}

### Clamping to the balance

After summing the segments, the service clamps the total to the account's current balance. Retention can never exceed the balance held, so it can never drive the balance negative. When a clamp occurs, the service flags it so the engine can note it for operator review.

### Monthly cadence

Retention follows a once-per-calendar-month cadence required by the regulator. If the fee item was last charged retention less than a month ago, the service does not charge again on the normal billing path. Instead it signals the engine to skip the charge and push the item's next billing date forward by one month, so the next scheduled run picks it up at the right time. A validation rule on the Agreement Item enforces the same monthly cadence at configuration time, and this runtime check is the second line of defence against manual date overrides or imported data.

### Retention on departure

When a resident departs, the Departure Processor charges a final pro-rata retention for the days since the last retention charge up to the departure date. This path deliberately bypasses the monthly cadence guard, because a departing resident has no future run to pick up a rescheduled date; skipping the charge would silently drop the final retention.

The departure calculation also clamps the period end to the **Retention Expiry Date**. Retention is not chargeable beyond the legislated five-year cap, so any days past expiry are excluded while valid pre-expiry days are still charged.

### The records retention creates

When there is a retention amount to charge, the engine commits a set of linked records, following the same pattern used for draw-downs:

1. An **Invoice Line Item** for the retention amount.
2. A **Lump Sum Transaction** of type Retention Deduction, with a negative Amount, the new balance recorded in **Balance After**, a Source of System (Billing Engine), and a Description containing the calculation breakdown.
3. A **Payment** settling the line item, with the transaction linked back to it.

The account's balance is reduced by the retention amount in the same commit. The **Cumulative Retention Amount** roll-up on the account updates automatically from the new transaction, and the engine separately increments the cumulative retention figure held on the resident's Funding record.

{% hint style="warning" %}
No transaction is written when the calculated retention is zero or negative (for example, when the timing guard fires, the account has expired, or the opening balance is zero). The ledger is never polluted with zero-amount entries.
{% endhint %}

## Automatic draw-down

An automatic draw-down settles a fee directly from the resident's lump sum rather than invoicing them for it. It applies where the fee's Agreement Item has **Automatic RAD Drawdown** switched on. Maica performs it with the `RAC_DrawdownService`, which the billing engine calls after it has already created the invoice line item and invoice for the period.

### Eligibility

A draw-down only fires when every gate below passes. If any gate fails, the service returns a no-op result with a reason, and the engine simply moves on; this is not treated as an error.

| Gate             | Requirement                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Drawdown enabled | **Automatic RAD Drawdown** is checked on the Agreement Item.                                                            |
| Account active   | The parent Lump Sum Account has a Status of Active.                                                                     |
| Funds available  | The account's current balance is greater than zero.                                                                     |
| Not retention    | The fee type is not RAD/RAC Retention. Retention is handled only by the retention service and must never be self-drawn. |

### The draw-down amount

The amount drawn is the lesser of the invoiced amount and the current balance:

```
drawn amount = MIN(invoice amount, current balance)
```

When the balance is smaller than the invoiced amount, a **partial draw-down** fires: the deposit is drawn down to zero, a Payment is raised for that drawn portion, and the invoice stays open for the remaining amount so the resident can be billed for the shortfall.

### The records a draw-down creates

The service takes a database savepoint and commits four changes as a single unit. Before reading the balance it re-queries the account with a row lock, so a concurrent process (such as a departure refund running during the nightly batch) cannot consume the same balance twice.

1. A **Lump Sum Transaction** of type Draw-Down, with a negative Amount, the new balance in **Balance After**, and a link to the triggering Invoice Line Item.
2. A **Payment** against the invoice, with a Source of RAD Draw-Down, marked as paid, since the draw-down has already settled the amount from the deposit.
3. A back-link from the transaction to the Payment, giving navigation in both directions.
4. A reduction of the account's **Current Balance** by the drawn amount.

The **Cumulative Draw-Down Amount** roll-up on the account updates automatically from the new transaction.

{% hint style="danger" %}
If any of the four writes fails, the whole set is rolled back to the savepoint and the engine logs the failure before moving to the next item. The invoice line item and invoice the engine committed earlier are in a prior transaction and are left untouched.
{% endhint %}

### DAP recalculation after a draw-down

For a resident on the Combination payment method, reducing the balance changes the daily DAP they owe. After a successful draw-down, the service recalculates the DAP portion. This step is non-blocking: it runs in its own protected block, and if it fails it writes an error log rather than rolling back the draw-down that already succeeded. The detail of the recalculation, including the formula and where the rate is sourced, is covered in [Combination Method Configuration](/broken/pages/9fdbcef8349b60024e7330e99be2e0a541572473).

## How the two mechanisms compare

| Aspect                   | Retention                                                           | Automatic draw-down                                              |
| ------------------------ | ------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Purpose                  | Keep the legislated retention from a RAD over time.                 | Settle a fee from the deposit instead of invoicing the resident. |
| Trigger                  | A retention fee item due for billing.                               | A fee item with Automatic RAD Drawdown enabled.                  |
| Service                  | `RAC_RetentionService`                                              | `RAC_DrawdownService`                                            |
| Amount basis             | Daily-balance segmentation at the annual rate, clamped to balance.  | Lesser of the invoiced amount and the balance.                   |
| Cadence                  | Once per calendar month, plus a final pro-rata charge on departure. | Each time the fee item is billed.                                |
| Transaction type         | Retention Deduction                                                 | Draw-Down                                                        |
| Records committed        | Invoice Line Item, Transaction, Payment, balance update.            | Transaction, Payment, back-link, balance update.                 |
| Cumulative field updated | Cumulative Retention Amount.                                        | Cumulative Draw-Down Amount.                                     |

In both cases the balance can be reduced but never taken below zero, and every movement is written to the ledger with a System (Billing Engine) source so it is clearly distinguished from user-led entries.

## Related articles

* [The Lump Sum Account Model](/broken/pages/64b4343810e7f34b807b481415f327eb40ba0f32)
* [Combination Method Configuration](/broken/pages/9fdbcef8349b60024e7330e99be2e0a541572473)
* [Billing Engine Architecture](/broken/pages/a45d130dba1117c83b040866430cbc117789f738)
* [Fee Type Processing Rules](/broken/pages/3a1f6579724d27299299d7b2178feb8a073abbc5)
* [Rate Configuration](/broken/pages/42b4e9886132e33d96e417c735cec4de6ada97ff)
