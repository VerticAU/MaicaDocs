---
description: Learn how to Manage Prices Lists on a NDIS Service Agreement in Maica
---

# Manage Price List

## What does the `Manage Price List` Quick Action do?

The Manage Price List tool in **Maica** is a Quick Action that allows users to update the **Price List** associated with a **Service Agreement**.&#x20;

## Where do I find the `Manage Price List` button?

The Manage Price List Quick Action is visible at the top right hand corner of your interface on the Service Agreement record, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2025-02-18 at 2.23.59 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The **Manage Price List** Quick Action will only be displayed if:<br>

* `maica_cc__Status__c` = Draft OR
* `maica_cc__Status__c` = Pending Start OR
* `maica_cc__Status__c` = Active<br>

Meaning, if the `Status` of the `Service Agreement` is `Active`, `Pending Start` or `Draft`. If the Agreement is in any other status, the **Manage Price List** button will not be displayed.
{% endhint %}

## How does the Manage Price List Quick Action work?

In order to begin managing your Price List, simply click the `Manage Price List` button to display the pop-up, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2025-02-18 at 2.37.20 pm.png" alt=""><figcaption></figcaption></figure>

Here, you can immediately select your New Price List.&#x20;

{% hint style="info" %}
Please note, only `Support Items` from the selected `Price List` can be added to the Agreement. Changing the `Price List` may impact existing `Agreement Items` if they are not included in the `New Price List`.
{% endhint %}

There is also a selectable box to Update Rate on Agreement Items. If checked, the new Rate will be applied to Invoices going forward. Existing records will not be effected.

Once selected, click `Confirm`.&#x20;

After clicking Confirm, one of two things will happen:&#x20;

#### 1. Price List will be successfully updated&#x20;

If the new Price List is compatible with the Service Agreement (if all Support Items exist in the new Price List), the update proceeds and Maica will display a success message. You can close the window and your Price List will be updated.&#x20;

#### 2. Agreement Item record(s) are linked to Support Items that do not exist in the new Price List.

If If any Support Items are missing from the New Price List, a list of affected items is displayed, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2025-02-18 at 2.43.06 pm.png" alt=""><figcaption></figcaption></figure>

In this instance, you will have to select a different Price List or ensure that the Support Items are added to the Price List.

## What happens after I click `Done` ?

After you click **Done**, **Maica** updates the `Service Agreement` and associated records to reflect the `New Price List`.

1. The new Price List is applied to the Service Agreement.
2. If **Update Rate on Agreement Items** was selected, the new rates are applied to future invoices.
3. The **Previous Price List** and **Last Price List Change** fields are updated in the **System Information** section of the Service Agreement, as shown below.&#x20;

<figure><img src="../../../.gitbook/assets/Screenshot 2025-02-18 at 2.59.44 pm.png" alt=""><figcaption></figcaption></figure>
