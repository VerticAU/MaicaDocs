# Reporting RAD/RAC Balances

Providers are required by law to report refundable accommodation balances (the RAD and RAC lump sums residents hold) to Services Australia every month, as at the last day of each claim month. Maica reports these balances for you from the monthly claim, drawing on the deposit movements it has recorded throughout the month.

This article explains how the monthly report is produced, how you submit it, and how to correct or remove a balance after it has been sent.

## How balances are reported

The accommodation balance report is a monthly action, not a real-time one. Throughout the month, every movement on a resident's deposit (payments in, top-ups, drawdowns, and refunds) is recorded against their lump sum account. At month end, Maica gathers these into a balance report for each resident and submits it to Services Australia.

For each resident with a deposit, Maica reports the balance as at the last day of the claim month, or as at the departure date if the resident left during the month. The reason reported reflects the most significant movement in the month, such as a payment received, a refund, or no change.

## Submitting balances from the claim

You submit balances from the monthly **Claim Batch**. The submission action opens a window that shows you every resident for the claim month, grouped so you can see the position before you send anything.

| Group             | What it means                                                 |
| ----------------- | ------------------------------------------------------------- |
| **Eligible**      | Ready to submit to Services Australia                         |
| **Submitted**     | Already submitted for this month                              |
| **Deleted**       | Removed at Services Australia                                 |
| **Cannot submit** | Cannot be submitted; the reason is shown against the resident |

When you submit, Maica sends each eligible balance to Services Australia one at a time and shows you the progress as it works through them.

{% hint style="success" %}
Maica will not report the same resident twice for the same month. A resident who has already been submitted appears under **Submitted**, so you can safely re-open and re-run the submission to pick up anyone who was missed.
{% endhint %}

{% hint style="warning" %}
If a balance fails to send for a resident, it is marked with the error detail while the rest continue. Review the residents that failed, resolve the issue, and submit them again.
{% endhint %}

## Correcting or removing a balance

After a balance has been submitted, you can manage it per resident from the same window:

* **Sync** refreshes the resident's balance from Services Australia so Maica shows the current position.
* **Correct** lets you submit a corrected balance, replacing the value held at Services Australia.
* **Delete** removes the submission at Services Australia.

{% hint style="info" %}
When you correct or delete a balance, Maica first re-reads the latest version from Services Australia, so your change is always applied to the current record rather than an out-of-date one.
{% endhint %}
