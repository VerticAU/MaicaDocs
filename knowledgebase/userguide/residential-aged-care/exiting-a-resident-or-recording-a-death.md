# Exiting a Resident or recording a death

## Overview

When a resident permanently leaves your service, whether they move to another home, return to family, transfer to hospital, or pass away, you record the departure through the **Manage Departure** action on their Service Agreement. This single action coordinates everything that needs to happen: it notifies Services Australia, runs the resident's final billing, deducts any remaining retention, prepares the refund of their lump sum deposit, and closes the Service Agreement.

Recording a death follows exactly the same process. The only difference is the departure reason you select and the way the refund due date is handled, both of which are covered below.

{% hint style="warning" %}
**Prerequisites:** The resident must have an active Service Agreement, and an accepted entry must already exist for them with Services Australia. You record the departure on the Service Agreement, not on the resident's accommodation record.
{% endhint %}

## Where do I find it?

The **Manage Departure** action sits at the top right of the resident's Service Agreement record.

1. Open the resident's **Service Agreement** record.
2. Select **Manage Departure** from the action buttons.
3. The departure modal opens at the first step.

{% hint style="info" %}
The same **Manage Departure** action is used twice in a resident's exit: first to process the departure (the steps below), and later to record the refund payment once you have paid the deposit back. When you reopen the action after a departure has been processed, it takes you straight to the refund step. See [Refunding Lump Sum Deposits](refunding-lump-sum-deposits.md).
{% endhint %}

## Processing a departure

The departure runs across three steps. You move through them in order, and the financial closure only runs after Services Australia has confirmed the departure.

{% stepper %}
{% step %}
## Confirm the departure details

The first step shows the resident's current details for reference and asks you to enter the departure-specific information.

| Field                 | Required | What to enter                                                                                                                                    |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Departure Date**    | Yes      | The date the resident permanently left. Defaults to today. It must be on or before today, and on or after the resident's entry date.             |
| **Departure Reason**  | Yes      | The reason the resident left (see the reason codes below).                                                                                       |
| **Notice Given Date** | No       | The date the resident or their representative gave notice they were leaving. This determines when the refund is due, so enter it if you have it. |

A balance summary on this step shows the current balance of any lump sum deposit the resident holds, so you can see the pre-departure position before you proceed.

{% hint style="info" %}
The **Notice Given Date** matters financially. If at least 14 days notice was given, the deposit refund is due on the departure date itself. If less than 14 days notice was given, or none, the refund is due within 14 days of departure. Entering an accurate notice date here saves correcting the refund timeframe later.
{% endhint %}
{% endstep %}

{% step %}
## Submit the departure to Services Australia

When you confirm the details, Maica creates the departure event and submits it to Services Australia. This step must succeed before any of the resident's financial closure runs.

{% hint style="danger" %}
The final billing, retention, and refund do not run unless Services Australia accepts the departure submission. This is deliberate: confirmation from Services Australia is the trigger for closing the resident's finances, so the figures can never run ahead of the official record.
{% endhint %}
{% endstep %}

{% step %}
## Run the departure processor

Once the submission succeeds, Maica runs the resident's financial closure automatically. This involves several actions in sequence:

1. **Final billing** is run up to and including the departure date, for the fees that still apply on that day (see the section on the departure day below).
2. **Departure credits** are issued where a fee that bills in advance had already been charged beyond the departure date, so the resident is not left paying for days after they left (see below).
3. **Final retention** is deducted from the lump sum deposit, calculated proportionally up to the departure date.
4. A **refund transaction** is recorded against the lump sum deposit for the balance that remains.
5. The **refund due date** is calculated and saved, based on the notice given.
6. The **base interest rate** that applies to the refund is captured against the deposit, so interest can be worked out later.
7. All **Agreement Items** are closed and the **Service Agreement** is marked as discharged with the departure date.

When the closure finishes, a summary panel shows the departure date and reason, the final billing period, the refund amount, the refund due date, and the closed status of the Service Agreement.

{% hint style="success" %}
If the resident holds a lump sum deposit, the summary panel reminds you to return to the **Manage Departure** action once you have paid the refund, so you can record the refund date and any interest owed.
{% endhint %}
{% endstep %}
{% endstepper %}

## Departure reason codes

Select the reason that best matches why the resident left. The reasons available in the action are listed below.

| Reason                                      | Use when                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| **Deceased**                                | The resident passed away.                                                    |
| **Return to Family or Home**                | The resident returned to family care or to their own home.                   |
| **To Another Service (Provider Initiated)** | The resident moved to another residential service, arranged by the provider. |
| **To Another Service (Resident Initiated)** | The resident moved to another residential service, at their own request.     |
| **To Hospital**                             | The resident transferred to hospital on a permanent basis.                   |
| **Other**                                   | The departure does not fit any of the reasons above.                         |

{% hint style="info" %}
Two further reason codes, **Auto Departure** and a combined-departure code, can appear on a resident's record when Services Australia assigns them automatically. You cannot select these yourself; they are recorded by Services Australia and shown for reference only.
{% endhint %}

## How the departure day affects billing

Services Australia does not pay subsidy or supplements for the day a resident departs. In practice this means the resident's last subsidised day is the day before they leave.

Because of this, only certain fees can be charged on the departure day, and only if the services they cover were actually provided that day:

* **Can be charged on the departure day:** the Basic Daily Fee, and the Daily Accommodation Payment for residents who pay for their own accommodation.
* **Cannot be charged on the departure day:** the Means Tested Care Fee, the Hotelling Contribution, the Non-Clinical Care Contribution, the Income Tested Fee, and the Daily Accommodation Contribution.

Maica applies these rules automatically during the final billing run, so the contributions that depend on subsidy are excluded from the departure day while the chargeable fees are still billed.

### Departure credits for fees billed in advance

Some fees bill **in advance**, meaning a charge for a period may already have been raised before the resident departed. When a resident leaves part way through a period that was billed ahead, they would otherwise be left paying for days after their departure.

To prevent this, the departure processor issues a **Departure Credit** for the days beyond the departure date on any in-advance fee item that was billed past that date. Each credit is calculated pro-rata for the unused days, is derived only from the original advance charge raised by the billing engine (not from later adjustments), and is attached to the resident's final invoice so it offsets the amount already charged.

{% hint style="info" %}
Departure credits are produced automatically as part of the closure run; there is no separate action to trigger them. They appear as credit lines on the final invoice, distinguishable from other charges by their source. You do not need to calculate or raise them by hand.
{% endhint %}

{% hint style="warning" %}
For residents on hospital leave, the day-29 reduction in the Means Tested Care Fee is monitored by your team rather than applied automatically. Check the resident's leave position before processing a departure that follows a long hospital stay.
{% endhint %}

## Recording a death and handling probate

A death is recorded the same way as any other departure: open **Manage Departure**, enter the departure date, and select **Deceased** as the reason.

For a death there is usually no advance notice, so the deposit refund is initially set to fall due 14 days after the departure date. Under the aged care rules, however, the refund of a deceased resident's deposit is not actually due until probate or letters of administration have been granted. When you have sighted the grant of probate, update the refund due date on the lump sum deposit so the refund timeframe and any interest are calculated correctly.

{% hint style="info" %}
Until probate is sighted, leave the refund as outstanding. The base interest that accrues on the refund still applies from the day after departure, and is calculated when you finally record the refund payment. See [Refunding Lump Sum Deposits](refunding-lump-sum-deposits.md).
{% endhint %}

## What happens after a departure

Processing the departure closes the resident's care and accommodation finances, but it does not, on its own, mark the lump sum deposit as fully refunded. The deposit stays open with a refund amount and a refund due date recorded against it.

The deposit is only finalised when you record the actual refund payment, which is a separate step you complete once the money has been paid back. That step also works out any interest owed to the resident or their estate.
