# Reporting RAD/RAC balances

## Overview

Providers are required by law to report refundable accommodation balances (the RAD and RAC lump sums residents hold) to Services Australia every month, as at the last day of each claim month. Maica reports these balances for you as a month-end step, drawing on the deposit movements it has recorded throughout the month.

This article explains how the monthly report is produced and how Maica checks that every resident's balance has been reported before you finalise the subsidy claim.

## How balances are reported

The accommodation balance report is a monthly action, not a real-time one. Throughout the month, every movement on a resident's deposit (payments in, retention deductions, draw-downs, and refunds) is recorded against their lump sum account. At month end, Maica gathers these into a balance report and submits it to Services Australia.

You trigger the report from the claim batch for the month. For each resident with a deposit, Maica reports the balance as at the last day of the claim month, or as at the departure date if the resident left during the month. The reason reported reflects the most significant movement in the month, such as an initial payment, a refund, or a regular drawdown.

{% hint style="info" %}
Maica will not report the same resident twice for the same month. If a balance has already been submitted for a resident that month, it is skipped, so you can safely re-run the report.
{% endhint %}

{% hint style="warning" %}
If a balance report fails to send for a resident, it is marked as failed with the error detail recorded, while the rest of the batch continues. Review and resolve any failed reports before finalising the claim.
{% endhint %}

## The pre-claim balance gate

Before you finalise the monthly subsidy claim, Maica runs a gate check against Services Australia to confirm no resident is missing an accommodation balance report for the month.

| Gate check result            | What happens                                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| **No residents outstanding** | Finalisation proceeds.                                                                   |
| **Residents outstanding**    | Finalisation is blocked, and Maica lists the affected residents so you can resolve them. |

This keeps the accommodation balance report and the subsidy claim in step, so you do not finalise a claim while balances are still missing.

## Resolving outstanding balances

If the gate check lists outstanding residents, resolve them before finalising:

1. Review the list of affected residents Maica shows, which includes each resident's name, identifier, and last submitted balance.
2. Re-run the balance report from the claim batch to pick up any residents that were missed.
3. For an individual resident, use the manual submission action on their accommodation balance record.
4. Re-attempt claim finalisation once the outstanding reports are submitted.

{% hint style="success" %}
Most outstanding balances are cleared simply by re-running the month-end report. The manual submission action is there for the occasional resident that needs to be handled on their own.
{% endhint %}

## Related articles

* [How MAICA Connects to Services Australia](/broken/pages/b4e12063bbfefb35f82fc584f1197977dddbb52c)
* [Managing RAD/RAC Accommodation Deposits](/broken/pages/ecc2254913dd0f416cd9d0d648641ed77a7233fb)
* [Reconciling Payments](/broken/pages/38a5ab3d89004eb97623dfa15a7c9a8b5597d327)
