---
description: Learn about Xero Integration Settings in Maica
---

# Xero Integration

This section of Maica allows administrators to manage and configure their Xero integration.

Please see the breakdown below for further information on each section:&#x20;

### 1. Enable the Integration

Ensure the **Xero Integration toggle** at the top of the settings page is switched to **Enabled**. This is required to activate any of the settings or integrations below. If this toggle is off, Maica will not attempt to communicate with Xero, and synchronisation will not occur.

### 2. Active Connections

Active Connections display which Xero organisations Maica is currently linked to. If multiple companies exist in your Xero instance (e.g. a Production and Demo organisation), Maica will list them here and allow you to select the one to connect with.

{% hint style="info" %}
**For more information on connecting Maica to Xero and setting up your Connection, please** [**click here**](../../integrations/xero-integration/)**.**
{% endhint %}

### 3. Webhooks

This section configures the Site Maica will use to listen for real-time Xero Notifications.

{% hint style="info" %}
**For more information on setting up Webhooks in Maica, please** [**click here**](../../integrations/xero-integration/#webhooks)**.**
{% endhint %}

### 4. Synchronisation&#x20;

This section controls how invoices are synchronised between Maica and Xero.

* **Invoice Xero Sync Flow**: Select the Automation flow responsible for pushing invoices to Xero.&#x20;
* **Run Now**: Click this button to manually trigger the Invoice Synchronisation.&#x20;

Once configured, Maica will regularly run the selected flow to keep Xero updated with Maica invoice records.
