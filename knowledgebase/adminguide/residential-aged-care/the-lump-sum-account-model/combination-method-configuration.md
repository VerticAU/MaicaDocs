# Combination Method Configuration

The **Combination** payment method is for residents who pay part of their accommodation as a lump sum and the rest as a daily payment. The lump sum sits in their Lump Sum Account; the daily part is charged through a Daily Accommodation Payment (DAP) fee item. Because the two are linked, any change to the lump sum balance must change the daily DAP the resident owes. Maica keeps the two in step through the **DAP portion** and its recalculation logic.

This article explains how the Combination method is wired, how the DAP portion is calculated, when it is recalculated, and how the two trigger paths differ. It is written for administrators and power users.

{% hint style="info" %}
This article builds on [The Lump Sum Account Model](./) and the draw-down behaviour described in [Retention and Drawdown Logic](retention-and-drawdown-logic.md).
{% endhint %}

## What the Combination method represents

Every resident with a lump sum account has a **Payment Method**, one of Full Lump Sum, Combination, DAP Only, or Undecided. Under Combination, the resident has paid part of the agreed room price as a lump sum and pays a daily DAP on the uncovered remainder. As the lump sum balance moves, the uncovered remainder moves with it, and so does the daily DAP.

| Payment method | Lump sum                      | Daily DAP                      | DAP portion applies?   |
| -------------- | ----------------------------- | ------------------------------ | ---------------------- |
| Full Lump Sum  | Covers the full room price    | None                           | No                     |
| Combination    | Covers part of the room price | Charged on the remainder       | Yes                    |
| DAP Only       | None                          | Charged on the full room price | No (no account exists) |
| Undecided      | Not yet decided               | Not yet decided                | No                     |

## The account-to-fee-item link

The connection between the deposit and the daily charge is the **DAP Agreement Item** lookup (`maica_cc__DAP_Agreement_Item__c`) on the Lump Sum Account. It points directly at the resident's DAP fee item (the Agreement Item) so the system can update the daily rate whenever the balance changes.

This lookup is populated only for Combination residents. It is set automatically when the lump sum account is created, from the active DAP fee item that must already exist on the Service Agreement's Fees tab. The presence of this link is what tells the recalculation logic that a DAP portion needs maintaining; where it is blank, there is no DAP to recalculate and the logic does nothing.

{% hint style="warning" %}
A Daily Accommodation Payment fee item must be configured on the Fees tab before a lump sum account can be created. Without it, the account setup is blocked, because there would be nothing for the DAP Agreement Item link to point to.
{% endhint %}

## The DAP portion calculation

The daily DAP for a Combination resident is held in the **DAP Portion** field (`maica_cc__DAP_Portion__c`) on the account. It is the daily interest cost on the part of the room price the lump sum does not cover:

```
DAP portion = (agreed room price - current balance - retention add-back) x MPIR / 100 / 365
```

The result is rounded to the cent and clamped at zero. When the balance covers the full room price (or more), the uncovered remainder is zero or negative, so the DAP portion is zero; there is nothing to charge daily.

**Retention add-back.** For the **Post 1 November 2025** fee arrangement, the cumulative retention already deducted counts as still paid, so it is added back before the uncovered amount is worked out. For every other fee arrangement the add-back is zero.

**Indexation.** Where the linked DAP item has already been indexed, the recalculated rate keeps the indexation factor already applied to it, so an indexed DAP is not reset to its un-indexed rate.

{% hint style="info" %}
The division by 100 is deliberate. The interest rate is stored as a Salesforce Percent field, which holds the displayed percentage number itself (an administrator enters 7.78 for 7.78%, and the value stored is 7.78, not 0.0778). The formula normalises that to a true rate before applying it.
{% endhint %}

## When the DAP portion is recalculated

The DAP portion is recalculated every time the lump sum balance changes. There are two distinct trigger paths, and the difference between them matters.

### User-led changes on the RAD/RAC tab

When a user records a balance-changing operation through the RAD/RAC tab, the system recalculates the DAP portion as part of that operation and updates the **DAP Portion** field on the account. The operations that trigger this are:

* Recording an initial payment
* Recording an additional payment
* Recording a draw-down
* Processing a partial refund
* Changing the payment method to Combination

For these user-led operations, the system updates the account's **DAP Portion** but does not automatically change the rate on the DAP Agreement Item. Instead it shows an advisory prompting the user to update the DAP fee item rate on the Fees tab to match the new amount. This keeps the user in control of the fee item that drives billing.

This recalculation applies only when the resident's **Deposit Type** is a Refundable Accommodation Deposit (RAD). For a Combination resident whose deposit is a Refundable Accommodation Contribution (RAC) or a legacy Accommodation Bond, the manual recalculation is deliberately suppressed and no advisory is shown, because their daily contribution rates are means-tested and set by Services Australia fee advice rather than derived from the MPIR formula.

{% hint style="info" %}
After a user-led balance change on a Combination RAD account, look for the inline advisory and update the DAP Agreement Item rate on the Fees tab. The account's DAP Portion shows the new daily amount to enter.
{% endhint %}

{% hint style="warning" %}
For a Combination resident whose deposit is a RAC or Accommodation Bond, recording a manual transaction does not change the DAP Portion and shows no advisory, even though the payment method is Combination. Their daily contribution is set by Services Australia means-testing, not the MPIR formula.
{% endhint %}

### Automatic draw-downs by the billing engine

When the billing engine performs an automatic RAD draw-down on a Combination RAD account, it recalculates the DAP portion itself as a follow-up step, and unlike the user-led path it applies the result to billing. It does this by **stepping** the DAP fee item rather than editing its rate in place:

* The original DAP Agreement Item keeps its rate and ends on the last day of the period the draw-down settles, because that day was already billed at the old rate.
* A **successor** DAP Agreement Item starts the day after, carrying the recalculated rate and the original item's end date. The Lump Sum Account links to the successor.
* The **DAP Portion** on the Lump Sum Account and the **DAP Rate After Transaction** on the draw-down transaction that triggered it carry the successor's rate, giving a full audit history of rate changes over time.

Because the successor starts after the last billed day, no billed period is re-rated and no retrospective adjustment line is raised.

This step is non-blocking. It runs in its own protected block so that if it fails, the draw-down that already succeeded is not rolled back. On failure the engine writes an error log (with the account and the originating invoice context) rather than raising an error to the resident's billing.

{% hint style="warning" %}
Because the engine steps the DAP fee item automatically but user-led operations only prompt for it, the two paths differ. After a manual balance change, the fee item rate is only correct once a user applies the advisory. After an automatic draw-down, a successor item carrying the new rate is created for you.
{% endhint %}

### Accounts where nothing is recalculated

The automatic recalculation does nothing, and writes no log, for a Full Lump Sum account that still has a DAP linked, for a Combination account paying a RAC or legacy Accommodation Bond, and for an account with no linked DAP.

## Where the interest rate comes from

Both trigger paths use the **MPIR at Agreement** (`maica_cc__MPIR_at_Agreement__c`) on the Service Agreement: the rate captured for the resident when they signed their agreement. The automatic draw-down path does not use the organisation-wide **RAC Current MPIR** setting, so the two paths produce the same DAP portion for the same resident and balance.

{% hint style="info" %}
The **RAC Current MPIR** setting is still used elsewhere, for example for the interest on a refund that is paid late. It does not drive a DAP recalculation.
{% endhint %}

### When the recalculation is skipped

The automatic recalculation does not fail the draw-down when it cannot run. It skips the recalculation, changes nothing, and writes one log naming the reason, so the gap is visible to administrators:

* The Service Agreement has no **MPIR at Agreement**
* The Lump Sum Account has no **Agreed Room Price**. The recalculation never steps the DAP to $0.00 on a missing price
* There is no draw-down transaction to date the new rate from
