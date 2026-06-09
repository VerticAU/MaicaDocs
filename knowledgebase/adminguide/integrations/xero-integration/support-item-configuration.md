---
description: >-
  Learn how to configure your Support Items to facilitate the Xero Integration
  within Maica
---

# Support Item Configuration

## How do I configure my Support Items to facilitate the Xero integration?&#x20;

{% hint style="info" %}
If you have not already set up your Xero Connection and Webhook, please do so before configuring your Support Items. Click [here](./) to learn how.
{% endhint %}

Once you have connected **Maica** and **Xero**, you then need to populate your Support Item records to facilitate the integration. This step is crucial in ensuring the integration executed effectively.&#x20;

So, to get started, head to a Support Item record.&#x20;

Scroll down to the `Xero Information` Section, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-29 at 9.53.11 am.png" alt="" width="563"><figcaption></figcaption></figure>

There are three fields related to the Support Item that need to be populated, these include:&#x20;

<table><thead><tr><th width="339">Field </th><th>Description</th></tr></thead><tbody><tr><td><code>Xero Invoice Line Description</code></td><td>The description of the Support Item used where it appears on related Invoice Line Item records in Xero. This is the Support Item description that is provided to the customer. <br><br>If left null, <strong>Maica</strong> will automatically use the name of the associated Support Item. </td></tr><tr><td><code>Finance Account Code</code></td><td>The Xero General Ledger Account Code, i.e. Income or Revenue, that is applied to the Support Item. This field is used by Maica as part of the Xero integration and determines how the income is treated in your finance system.</td></tr><tr><td><code>Tax Type</code></td><td>The Xero Tax Rate applied to the Support Item from a finance perspective, i.e. GST on Income. This field is used by Maica as part of the Xero integration.</td></tr></tbody></table>

{% hint style="info" %}
For `Tax Type`, the default value is `GST Free Income`, you can change this to match your billing processes.&#x20;
{% endhint %}

{% hint style="success" %}
Ensure that these fields are populated for all your Support Items in order to facilitate the Xero Integration within **Maica**.&#x20;
{% endhint %}
