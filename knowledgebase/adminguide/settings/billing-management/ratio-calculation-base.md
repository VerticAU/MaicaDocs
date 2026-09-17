---
description: Learn about Ratio Calculation Base in Maica
---

# Ratio Calculation Base

When an Appointment is delivered to more than one Participant at the same time, the cost of that support is shared between them. The `Ratio Calculation Base` setting determines **how** Maica applies that share: by reducing the `Quantity`, or by reducing the `Unit Price`.

This page explains both options, how Maica decides which one applies to a given Service, and what you need to configure when your organisation introduces a new `Funding Type`.

## Where do I find it?

The setting is located in **Maica Settings** under **Billing Management**, in the `Ratio Calculation Base` section.

The section lists your `Funding Types`, grouped by `Funding Source`:

| Funding Source | Funding Types listed                                                                                                              |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `NDIS`         | `Agency Managed`, `Plan Managed`, `Self Managed`, `Combination`                                                                   |
| `HCP`          | `Home Care Package`                                                                                                               |
| `Other`        | Every remaining value in the `Agreement Item` → `Funding Type` picklist, including any custom values your organisation has added. |

Each `Funding Type` can be set to either `Quantity` or `Unit Price`.

{% hint style="info" %}
A `Funding Type` with no value selected is not an error state. Maica simply falls back to `Quantity` for that `Funding Type`. See [What happens when a Funding Type is not configured](ratio-calculation-base.md#what-happens-when-a-funding-type-is-not-configured) below.
{% endhint %}

## How the two options differ

Maica divides by the `Required Participants` value on the Appointment.

| Setting      | What Maica does                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Quantity`   | The `Quantity` is divided by `Required Participants`. The `Unit Price` remains the full rate from the Agreement Item.                       |
| `Unit Price` | The `Quantity` remains the full, undivided value. The `Unit Price` is divided by `Required Participants` and rounded to two decimal places. |

On both bases, `Quantity Delivered` is the Participant's ratio'd share. This is the value that rolls up to the `Agreement Item` and drives utilisation. It is not used to calculate the invoiced amount.

### Worked example

An Appointment of **2 hours**, with **1 Resource** and **3 Required Participants**, billed against an `Agreement Item` with a `Rate` of **$100.00** per hour.

| Value on the Invoice Line Item | `Quantity` base | `Unit Price` base |
| ------------------------------ | --------------- | ----------------- |
| `Quantity`                     | 0.67            | 2.00              |
| `Unit Price`                   | $100.00         | $33.33            |
| `Line Total`                   | $67.00          | $66.66            |
| `Quantity Delivered`           | 0.67            | 0.67              |

{% hint style="info" %}
The two bases produce a near-identical `Line Total`. They are not always exactly equal, because the `Unit Price` is rounded to two decimal places before being multiplied out. Which base you choose is driven by how your claims need to be presented, not by the total charged.
{% endhint %}

## How Maica decides which base applies

When a `Delivery Activity` is costed, Maica resolves the base in this order:

{% stepper %}
{% step %}
#### Read the Agreement Item Funding Type

It reads the `Funding Type` on the `Agreement Item` that the `Delivery Activity` is billed against.
{% endstep %}

{% step %}
#### Fall back to the Service Agreement Funding Type

If that field is blank, it falls back to the `Funding Type` on the parent `Service Agreement`.
{% endstep %}

{% step %}
#### Look up the Ratio Calculation Base

It looks that `Funding Type` up in the `Ratio Calculation Base` setting.
{% endstep %}

{% step %}
#### Use the default base

If no value is stored against that `Funding Type`, it uses `Quantity`.
{% endstep %}
{% endstepper %}

The same resolution is used when Maica generates travel `Delivery Activities` through Travel Management.

{% hint style="warning" %}
The `Funding Type` on the **Agreement Item** wins. If an `Agreement Item` carries a different `Funding Type` to its parent `Service Agreement` (for example under a `Combination` agreement), the `Agreement Item` value is the one that determines the ratio base.
{% endhint %}

## What happens when a Funding Type is not configured

If a `Funding Type` has no `Ratio Calculation Base` value stored against it, Maica uses `Quantity`. On the `Quantity` base, Maica trusts the `Quantity` already stored on the `Delivery Activity` as the ratio'd value and copies it into `Quantity Delivered`.

For an organisation that bills on the `Unit Price` base, that fallback produces the following on affected records:

* The `Unit Price` on the `Invoice Line Item` is the **full** rate, not the ratio'd rate.
* The `Quantity Delivered` on the `Delivery Activity` and `Invoice Line Item` is the **full** quantity, not the Participant's share.
* Each Participant's `Agreement Item` is drawn down at the full quantity, so utilisation is overstated.

{% hint style="danger" %}
No error, warning or `Review` billing status is raised when a `Funding Type` is missing from this setting. The records bill successfully and look correct at a glance. The only symptom is an un-ratio'd `Unit Price` and `Quantity Delivered` on group Appointments.
{% endhint %}

## Adding a new Funding Type

Adding a value to the `Agreement Item` → `Funding Type` picklist does **not** automatically configure how that funding type is ratio'd.

{% hint style="warning" %}
Whenever you add a new `Funding Type` value, you must also set its `Ratio Calculation Base` in Billing Management Settings. Until you do, Maica treats it as `Quantity`.
{% endhint %}

Follow these steps:

{% stepper %}
{% step %}
#### Add the new picklist value

Add the new value to the `Funding Type` picklist on the `Agreement Item` object in Salesforce Setup.
{% endstep %}

{% step %}
#### Open Ratio Calculation Base settings

Navigate to **Maica Settings** → **Billing Management** → `Ratio Calculation Base`. Your new value appears automatically under the `Other` funding source group.
{% endstep %}

{% step %}
#### Select the ratio base

Select `Quantity` or `Unit Price` for the new `Funding Type`. Match whichever base your equivalent existing funding types already use.
{% endstep %}

{% step %}
#### Save

Click **Save**.
{% endstep %}

{% step %}
#### Review existing records

Review any `Agreement Items`, `Delivery Activities` and `Invoice Line Items` already created against the new `Funding Type`. See [Changing the setting after records exist](ratio-calculation-base.md#changing-the-setting-after-records-exist) below.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
The `Unit Price` base is intended for NDIS funding. If your new `Funding Type` is an NDIS funding type, or will be claimed through NDIS Claiming, set it to the same base as your other NDIS funding types rather than leaving it to fall back to `Quantity`.
{% endhint %}

## Changing the setting after records exist

Changing the `Ratio Calculation Base` affects future calculations. It does not retrospectively recalculate records that have already been billed.

| Billing Status | Effect of the change                                                                                                                                                    |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Pending`      | The `Delivery Activity` is recalculated the next time it is costed or billed, and picks up the new base automatically.                                                  |
| `Generated`    | The `Delivery Activity` is not recalculated. Its existing `Quantity Delivered` and its `Invoice Line Item` retain the values produced under the previous configuration. |

{% hint style="warning" %}
Correcting records that have already reached `Generated` requires a data remediation, not a settings change. Contact Maica Support before attempting this, and always take a backup of the affected `Invoice Line Items` first.
{% endhint %}

### A note on stored Quantity values

On the `Quantity` base, Maica uses the `Quantity` already stored on the `Delivery Activity` and treats it as the Participant's ratio'd share. If that `Quantity` was written while a different base was in effect, or before the `Funding Type` was configured, the stored full value carries straight through to `Quantity Delivered`.

This is why records created before a `Funding Type` is configured need to be reviewed, rather than simply left to recalculate.
