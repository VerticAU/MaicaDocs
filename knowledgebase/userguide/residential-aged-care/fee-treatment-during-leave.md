# Fee Treatment during Leave

## Overview

When a resident takes temporary leave, their place is held and their care continues to be billed, but the type and length of leave can change what the government pays and, in some cases, what the resident owes. This article explains how each leave type affects fees so you know what to expect on the resident's invoices.

This is the fees-focused companion to the lifecycle article on recording leave. For how to enter a leave period and track leave balances, see [Managing Temporary Leave](managing-temporary-leave.md).

## How leave affects billing

When the billing engine bills a fee item, it checks for any leave that overlaps the billing period and applies the rules for that leave type before calculating the charge. For this to work, the leave must be recorded against the resident before the billing run, so record leave promptly.

For residential aged care, most fees continue during leave. The main thing to watch is the reduction in the government subsidy that can occur on long hospital stays, which may reduce a resident's means tested fee. That reduction is not applied automatically; it is monitored by your team, as explained below.

## Fee treatment by leave type

| Leave type                | Fee treatment                                                                                                                                                                                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Social leave**          | The Basic Daily Fee continues at the standard rate, and the resident keeps paying their agreed fees and accommodation costs. The government pays the subsidy for up to 52 days of social leave per financial year.                                         |
| **Hospital leave**        | The Basic Daily Fee continues, and means tested fees continue for the first 28 days. From day 29 the variable part of the government subsidy stops, which may reduce the resident's means tested care fee. This is a provider-monitored event (see below). |
| **Transition care leave** | All fees continue unchanged. Billing is not suspended or adjusted for transition care leave.                                                                                                                                                               |
| **Emergency leave**       | Treated the same as normal billing: fees continue unchanged unless specific government guidance for the emergency says otherwise. Emergency leave does not use up a resident's social leave entitlement.                                                   |

{% hint style="info" %}
Hospital leave is unlimited. Social leave is limited to 52 days per financial year; beyond that, the government stops paying the subsidy for the extra days, though the resident's fees still apply.
{% endhint %}

## Provider-monitored adjustments

A few situations change a resident's fees but are not detected or applied by the billing engine. Your team needs to watch for these and make the change in Maica when they occur.

* **Day 29 of a hospital stay.** From the 29th day of a continuous hospital leave episode, the variable subsidy component ceases, which can reduce the resident's means tested care fee. The billing engine does not track hospital leave length or adjust the fee for you. When a hospital stay reaches this point, review the resident's means tested care fee and update the rate if it needs to change.
* **Social leave beyond 52 days.** Once a resident passes their annual social leave entitlement, the subsidy stops for the additional days. The resident's fees continue, but you should be aware of the subsidy position when reconciling payments.

{% hint style="warning" %}
Changing a fee rate part way through a period that has already been billed creates a correction. Maica handles this for you when you update the rate. See [Fee Adjustments and Corrections](fee-adjustments-and-corrections.md).
{% endhint %}

{% hint style="danger" %}
You cannot charge a fee to reserve a resident's place in order to make up for a subsidy reduction during leave. Only the fees the resident already pays continue.
{% endhint %}
