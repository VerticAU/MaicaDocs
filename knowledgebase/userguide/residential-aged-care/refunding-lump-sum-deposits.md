# Refunding Lump Sum Deposits

## Overview

When a resident leaves your service or passes away, any lump sum accommodation deposit they paid (a refundable accommodation deposit or contribution) must be returned. Processing the departure prepares the refund: it works out the balance remaining after the final retention and records when the refund is due. Recording the refund is a separate step you complete once the money has actually been paid back.

This article covers when a refund is due, how interest is calculated, and how to record the payment in Maica.

{% hint style="warning" %}
**Prerequisites:** The resident's departure must already be processed through the **Manage Departure** action, so that the refund amount and refund due date are recorded against the deposit. See [Exiting a Resident or Recording a Death](/broken/pages/52e1b40f1a1927baf1ad1439323a71b5370e1e2d).
{% endhint %}

## When is a refund due?

The refund due date is set automatically when you process the departure, based on the notice the resident gave.

| Situation                                          | Refund is due                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------------- |
| At least 14 days notice was given before departure | On the departure date                                                   |
| Less than 14 days notice, or no notice             | Within 14 days of the departure date                                    |
| The resident has passed away                       | Initially 14 days after departure, then updated once probate is sighted |

{% hint style="info" %}
For a death, the refund is not legally due until probate or letters of administration have been granted. Maica sets a provisional due date of 14 days after departure, and you should update it once you have sighted the grant of probate. This keeps the interest calculation accurate.
{% endhint %}

## How interest is calculated

Two different interest rates can apply to a refund, depending on whether it is paid on time. Maica calculates both for you when you record the payment.

### Base interest

Base interest is the standard interest that accrues on the deposit from the day after the resident departs up until the refund is paid (or up to the refund due date, whichever comes first). The base interest rate that applies is captured against the deposit at the time of departure, so the rate cannot drift while the refund is outstanding.

### Penalty interest for late refunds

If you pay the refund after the date it was due, a higher penalty rate applies to the overdue period. This penalty interest accrues from the day after the refund due date up to the date you actually pay. It is calculated on top of the base interest, not instead of it.

The table below shows how the two combine.

| When you pay              | Base interest                                    | Penalty interest                                    |
| ------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| On or before the due date | From the day after departure to the payment date | None                                                |
| After the due date        | From the day after departure to the due date     | From the day after the due date to the payment date |

{% hint style="success" %}
If the refund is paid on the same day the resident departs, with the refund due that day, no interest is owed. Maica shows the interest as zero in that case and records no interest transaction.
{% endhint %}

## Recording the refund payment

Once you have paid the deposit back to the resident or their estate, return to the **Manage Departure** action to record it. Because the departure has already been processed, the action opens directly at the refund step.

{% stepper %}
{% step %}
## Reopen the Manage Departure action

Open the resident's **Service Agreement** record and select **Manage Departure**. Maica detects that the departure is already processed and the refund has not yet been recorded, and takes you straight to the refund step.

The step shows the resident's name, the refund amount, and the refund due date for reference.
{% endstep %}

{% step %}
## Enter the actual refund date

Enter the **Actual Refund Date**, which is the date you paid the refund.

{% hint style="warning" %}
The actual refund date must be on or after the departure date, and it cannot be a future date.
{% endhint %}
{% endstep %}

{% step %}
## Review the calculated interest

As soon as you enter the refund date, Maica calculates and displays the interest before you commit anything:

* **Base interest**, with the number of days and the rate used.
* **Penalty interest**, shown only if the refund was paid late.
* **Total interest**, which is the sum of the two.

Review these amounts carefully. They represent the interest owed to the resident or their estate on top of the deposit itself.
{% endstep %}

{% step %}
## Confirm the refund

When you confirm, Maica:

1. Records the actual refund date against the deposit.
2. Captures the penalty rate that applied at the due date.
3. Creates an interest transaction on the deposit for the total interest owed (only if interest is greater than zero).
4. Records the total interest paid.

Once the deposit balance has been fully cleared, the deposit is marked as **Refunded** and the resident's exit is complete.

{% hint style="info" %}
If interest works out to zero, for example a refund paid on time with no base interest period, no interest transaction is created. The refund date is still recorded and the action closes.
{% endhint %}
{% endstep %}
{% endstepper %}

## When a balance remains

In normal processing the deposit balance reaches zero when the refund payment is recorded, and the deposit is marked as **Refunded**. If a balance still remains after the refund, for example because of a partial refund or an adjustment that is still in progress, the deposit is left open rather than closed, and Maica records a note so your billing team can reconcile the remaining amount.

{% hint style="warning" %}
You cannot record a refund payment twice. Once a refund date has been recorded against a deposit, the refund step cannot be re-confirmed. If something needs to change after the refund has been recorded, raise it with your billing team rather than reopening the action.
{% endhint %}

## Related articles

* [Exiting a Resident or Recording a Death](/broken/pages/52e1b40f1a1927baf1ad1439323a71b5370e1e2d)
* [Managing RAD/RAC Accommodation Deposits](/broken/pages/5029be4ff8a685c62fd0783b757adb02aced860f)
* [Understanding Fee and Accommodation Arrangements](/broken/pages/2bcc18eafba856acca0c5471e1fbbc091d342119)
