---
description: Learn about Stripe Integration Settings in Maica
---

# Stripe Integration

The **Stripe** tab in the Integration Management screen allows Maica administrators to configure the Stripe payment gateway.

Please see the breakdown below for further information on each section:&#x20;

### 1. Stripe API Keys

To connect your Stripe account with Maica, you’ll need to enter three API credentials:

* **Stripe Publishable Key**
* **Stripe Secret Key**
* **Stripe Webhook Secret**

These credentials can be generated within your Stripe account and must be pasted into the fields provided in Maica.

{% hint style="info" %}
For detailed instructions on where to find these keys and how to configure your Stripe account, refer to the full [Stripe Integration article](../../integrations/stripe-integration.md).
{% endhint %}

### 2. Site Configuration

In order for the Integration to function properly, a **Site** must be selected from the list.&#x20;

{% hint style="info" %}
Please note, this Site must be configured to serve the public-facing payment page, and the associated Site User must have appropriate access in order to enable the **Pay Now** link for the Invoice PDF.&#x20;
{% endhint %}

Use the search field to locate and select the correct Site record.

{% hint style="info" %}
For more information on how to set up and configure Sites in Maica, see [Create a Site](../../integrations/create-a-site.md).
{% endhint %}
