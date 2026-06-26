# The Manage RACs Agreement component

The **Manage RACS Agreement** component is the central tool for managing a resident's residential aged care Service Agreement. It is a single screen with three tabs that cover the financial and accommodation side of a resident's stay: configuring fees, managing their accommodation deposit, and moving them between rooms.

This article explains where to find the component, what must be in place before you can use it, and what each tab does. The detailed how-to for each tab is covered in its own article.

## Where do I find it?

The component opens from a button on the resident's Service Agreement record.

1. Open the resident's **Service Agreement** record.
2. Select the **Manage RACS Agreement** button in the highlights area at the top of the page.
3. The component opens with the **Fees** tab active by default.

{% hint style="info" %}
The button appears only on Service Agreements whose Funding Source is Residential Aged Care Services. It is not shown on NDIS, Support at Home, or other funding source agreements.
{% endhint %}

## Before you can use it

The component checks two preconditions when it opens. Both must be met, or the component shows a message explaining what to fix first.

| Precondition              | What it means                                                    | Message if not met                                                                                                       |
| ------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Linked Funding record** | The Service Agreement must be linked to a Funding record         | This Service Agreement is not linked to a Funding record. Please complete the Service Agreement setup before proceeding. |
| **Fee Arrangement set**   | The resident's fee arrangement must be set on the Funding record | A Fee Arrangement must be set before fees can be configured.                                                             |

{% hint style="warning" %}
The Funding link is checked first. Because the fee arrangement is read from the Funding record, a missing Funding link is the more fundamental problem to resolve. If you see the Fee Arrangement message, confirm the arrangement on the resident's Funding record. See [Understanding Fee and Accommodation Arrangements](/broken/pages/2bcc18eafba856acca0c5471e1fbbc091d342119).
{% endhint %}

## The three tabs

The component groups all of its functions into three tabs.

| Tab               | What you use it for                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| **Fees**          | Set up and maintain the fee items that the billing engine reads to generate invoices           |
| **RAD/RAC**       | Manage the resident's accommodation deposit account: payments, draw-downs, and partial refunds |
| **Accommodation** | Move a resident permanently to a different room within the same home                           |

Each tab is documented in detail in its own article:

* [Configuring Resident Fees (Fees Tab)](/broken/pages/983e97abf946b7dab6d3c8f8af3f9e5b859abebc)
* [Managing RAD/RAC Accommodation Deposits (RAD/RAC Tab)](/broken/pages/c7771c5eec0192569a7c7302fdcd1e06f859274e)
* [Relocating a Resident (Accommodation Tab)](/broken/pages/44e11daf605a78e2f7a923a89e11d1e68a5aadb4)

{% hint style="info" %}
The Fees and RAD/RAC tabs work together. The lump sum account on the RAD/RAC tab links to a daily accommodation payment item on the Fees tab, so for some residents you configure fees first. The RAD/RAC article explains this order of operations.
{% endhint %}
