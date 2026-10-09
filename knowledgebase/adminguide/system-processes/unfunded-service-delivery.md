---
description: >-
  Configure Appointment Services to be delivered and priced without an Agreement
  Item
---

# Unfunded Service Delivery

Not every support a Participant receives is covered by a Service Agreement. **Unfunded Service Delivery** allows an Appointment Service to be scheduled and delivered without an Agreement Item. The Service is priced from a Price List, and billing is applied directly to the Participant without drawing from any funding.

A related setting controls whether users choose between funding sources when a Participant has more than one Agreement Item that could fund the same Service.

{% hint style="info" %}
Both settings are unticked by default. Users select funding sources and Price Lists in the **Select Funding Source** dialog of the Standard experience. To learn more, see [Create an Appointment](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/appointments/create-an-appointment) in the User Guide.
{% endhint %}

## Configuring an Appointment Service

Two checkboxes on the **Appointment Service** control this. To learn how to set up an Appointment Service, see [Appointment Services](configuring-maica-components/appointment-services.md).

| Field                                   | What it does                                                                                                                                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unfunded Service Delivery Permitted** | Allows this Appointment Service to be scheduled and delivered without an associated Service Agreement or Agreement Item, with billing applied directly to the Participant.                                    |
| **Funding Source Selection Required**   | Asks the user which Agreement Item applies whenever a Participant has more than one that could fund this Appointment Service. When unticked, Maica selects one of the matching Agreement Items automatically. |

The two are independent. A Service can ask the user to choose between several Agreement Items without permitting unfunded delivery, and it can permit unfunded delivery without ever asking a question, which is what happens when a Participant has exactly one eligible Agreement Item.

{% hint style="warning" %}
Maica reads both fields in user mode. Where your organisation uses a cloned or hand-built permission set over Appointment Service, in place of the packaged **Maica - Appointment Service Create Access** and **Maica - Appointment Service Edit Access** sets, grant read access to both fields. Without read access, Create and Manage Appointment do not load.
{% endhint %}

## Preparing your organisation for unfunded delivery

Unfunded delivery bills under an **Unfunded** Funding Type, which must exist on the Funding Type value set before an unfunded Appointment can be billed.

{% stepper %}
{% step %}
#### Add the Unfunded Funding Type

In Salesforce Setup, open **Picklist Value Sets**, open the **Funding Type** value set, and add the value `Unfunded`.
{% endstep %}

{% step %}
#### Map it to Do Not Claim

On the **Invoice** object, open the **Claim Behaviour** field and add `Unfunded` as a controlling value for **Do Not Claim**, so unfunded delivery is invoiced but never claimed.
{% endstep %}

{% step %}
#### Set its Ratio Calculation Base

In **Maica Settings** → **Billing Management**, set the [Ratio Calculation Base](../settings/billing-management/ratio-calculation-base.md) for `Unfunded` in the same way as any other Funding Type.
{% endstep %}

{% step %}
#### Check your Price Lists

The Price List a user can choose must be **Active** and must hold at least one **Active** Price List Entry. A Price List with no active entry can price nothing, so Maica does not offer it.
{% endstep %}
{% endstepper %}

{% hint style="danger" %}
Until the `Unfunded` value exists on the **Funding Type** value set, billing for an unfunded delivery cannot complete. Maica refuses the Invoice and names what is missing.
{% endhint %}

## How a funding selection is used

A funding source chosen in the **Select Funding Source** dialog is stored on the **Delivery Activity**, in either the **Agreement Item** or the **Price List** lookup.

The stored selection is honoured on every recalculation, including the billing flow, quick completion and the autocomplete batch, each of which prices the row from the stored selection.

Where the stored selection is no longer valid, for example because the Agreement Item has expired, Maica resolves the cost against the funding that is available and returns a funding warning, and the calculation completes.

{% hint style="danger" %}
A Delivery Activity is funded by an Agreement Item or priced from a Price List, never both. Maica enforces this whenever either value is set or changed, with the message: "VAL\_0002: A Delivery Activity is either funded by an Agreement Item or priced from a Price List, not both. Clear one of them before saving."
{% endhint %}

## How an unfunded delivery is invoiced

An unfunded Delivery Activity is invoiced to the Participant under the **Unfunded** Funding Type. Because that Funding Type is mapped to **Do Not Claim**, the Invoice is produced but never submitted as a claim. To learn how Invoices are produced, see [Billing Invoice Generation](billing-invoice-generation.md).

{% hint style="info" %}
The billing flow supplies **Unfunded** as the Funding Type where a row carries none, so a row priced from a Price List does not need the Funding Type set by hand.
{% endhint %}
