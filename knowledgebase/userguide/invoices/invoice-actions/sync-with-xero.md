---
description: Learn how to Sync Invoices with Xero in Maica
---

# Sync with Xero

## How do I Sync an Invoice with Xero on Maica?

{% hint style="success" %}
Syncing with Xero will only be supported if a Connection and Webhook has already been set up within your Organisation. Before attempting to Sync Invoices, please ensure this is the case. To learn more about configuring your Xero Integration, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/xero-integration). \
\
Syncing with Xero also requires your Support Items to be configured correctly. Please click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/xero-integration/support-item-configuration) to learn how to configure your Support Items in order to facilitate the Xero Integration.&#x20;
{% endhint %}

Maica has `Automation` for Syncing with Xero. This article talks about scenarios in which manual Syncing may be required or chosen for a specific [Invoice](../../getting-started/maica-key-concepts/invoice.md).

{% hint style="info" %}
To learn more about Maica's Syncing Automation, click here.&#x20;
{% endhint %}

## Sync with Xero Quick Action&#x20;

If you wish to manually Sync an Invoice with Xero outside of Maica's automation, the best way to do so is directly from the Invoice Record. Located in the top left corner of the interface, you will a find a `Sync with Xero` button, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/sync with xero button.png" alt=""><figcaption></figcaption></figure>

Simply click this button to begin the Sync. Once clicked, Maica will display a pop-up confirming that you are about to Sync the Invoice and related Invoice Line Items with Xero. Click `Confirm` to finalise the Sync.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-29 at 2.06.10 pm.png" alt=""><figcaption></figcaption></figure>

Once confirmed, Maica will show a success message, and you can shut the window. As shown below.

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-29 at 2.30.01 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
If you receive an error message at this stage, please ensure your [Xero Integration](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/xero-integration) has been configured correctly.&#x20;
{% endhint %}

Once done, you will be able to see the Invoice Record in Xero with the matching `Invoice Reference` from **Maica**.&#x20;

{% hint style="info" %}
To read a full overview of the Xero Integration in Maica, click [here](../../integrations/xero-integration-overview.md).&#x20;
{% endhint %}

## What happens after my Invoice has been Synced?&#x20;

After an invoice has been successfully synced, the Invoice Record will be updated accordingly. Two new fields will be automatically populated from Xero. These are the `Xero Invoice Number` and `Xero ID`, as shown below. These values come from Xero and will help you identify the associated Invoice between **Maica** and Xero when required.&#x20;

<figure><img src="../../.gitbook/assets/xero info 2.png" alt=""><figcaption></figcaption></figure>
