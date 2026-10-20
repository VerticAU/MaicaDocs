---
description: Learn about Bulk Price List Update Settings in Maica
---

# Price List Update

The **Bulk Price List Update** section allows you to apply a selected Price List to Service Agreements in bulk. You can choose to:

1. **Apply a Price List Immediately** — this updates all currently Active Service Agreements right away.
2. **Schedule a Price List Update** — this sets a future date on which the selected Price List will take effect.

{% hint style="info" %}
Please note, you can define which Service Agreements should be impacted by the Price List update by adding filter criteria. By default, only Agreements with a Status of “Active” will be updated. However, you can optionally add additional fields to target specific subsets of Agreements.
{% endhint %}

Please refer to the below table for more information on each setting:

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Apply this Price List</code></td><td>Select the Price List you want to apply to existing Service Agreements. This field is used for an immediate update.</td></tr><tr><td><code>Confirm Toggle</code></td><td>A toggle that confirms your intention to perform the immediate update. Once confirmed, the Update Price List button is activated.</td></tr><tr><td><code>Price List (Scheduled)</code></td><td>Select the Price List that should take effect on a future date.</td></tr><tr><td><code>Effective Date</code></td><td>Defines when the selected Price List should be applied. No changes occur until this date is reached.</td></tr><tr><td><code>Enable</code></td><td>Applies the scheduled update. Once enabled, Maica will automatically update all qualifying Service Agreements on the selected date.</td></tr></tbody></table>

## Price List Update Behaviour

The **Price List Update Behaviour** section sets, for each funding source, what happens to an Agreement Item's remaining quantity when its rate changes, for example after a price list update. You can find it in **Maica Settings** under **Agreement Management** > **Price List Update**.

Each funding source is set to one of two behaviours:

<table><thead><tr><th width="222">Behaviour</th><th>What it does for stated Agreement Items</th></tr></thead><tbody><tr><td><code>Dynamic Total Budget</code></td><td>The <code>Quantity Remaining</code> is the item's <code>Quantity</code> minus the <code>Quantity Delivered</code>. A change to the rate does not change the quantity remaining. This is the default.</td></tr><tr><td><code>Static Total Budget</code></td><td>The budget stays fixed when the rate changes. The <code>Quantity Remaining</code> is recalculated as the <code>Approved Amount</code> minus the <code>Utilised Amount</code>, divided by the current <code>Rate</code>. Where the rate is zero or blank, it falls back to <code>Quantity</code> minus <code>Quantity Delivered</code>.</td></tr></tbody></table>

{% hint style="info" %}
Agreement Items that are category funded always use `Quantity` minus `Quantity Delivered`, whichever behaviour applies.
{% endhint %}

Maica resolves the behaviour for each Service Agreement from its **Funding Source** and stores it in the system-maintained `Resolved Rate Change Behaviour` field on the Service Agreement. The behaviour is resolved when the Service Agreement is created, and again whenever its `Funding Source` or `Price List` changes. It cannot be edited on the Service Agreement.

### Saving your changes

The section takes part in the page-level **Save** on Maica Settings, so changes to the behaviour for each funding source are saved with the rest of the page.

{% hint style="warning" %}
A funding source with no behaviour set resolves to **Dynamic Total Budget**. If the stored value for the whole section is blank or cannot be read, every funding source resolves to **Dynamic Total Budget**. Maica does not show a warning in that case, so if the Settings screen does not show the behaviour you set, check the stored value.
{% endhint %}

### Access to the setting

The packaged **Maica\_Setting\_Create\_Access** and **Maica\_Setting\_Edit\_Access** permission sets grant access to the `Price List Update Behaviour` field (`Price_List_Update_Behaviour__c`) on the Setting object. Where users reach Maica Settings through your own profile or permission set, grant **Edit** on that field there. Add the field to your Setting page layout only if administrators edit Setting records directly.
