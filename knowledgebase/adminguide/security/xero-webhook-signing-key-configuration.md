# Xero Webhook Signing Key — Configuration

Maica receives webhook notifications from Xero (for example Invoice and payment events). To prove each notification genuinely came from Xero, Maica verifies an HMAC-SHA256 signature on every inbound request using a signing key you configure. This article explains where that key comes from and how to set it.

### What is the key?

When you set up a webhook in your Xero app, Xero issues a webhook signing key. Xero signs every webhook payload with it, and Maica recomputes the signature to confirm the request is authentic before processing it.&#x20;

{% hint style="info" %}
It is your organisation’s own Xero secret; it is not shared with other Maica customers.
{% endhint %}

### Where is it stored and how is it used?&#x20;

The key is stored on the Maica integration setting and used only server-side, inside Apex, to verify inbound webhook signatures (XeroNotificationPostProc). Note:&#x20;

* It is never returned in any response, never shown in the UI after entry, and never written to a log.
* Access to the field is controlled by object permissions and Field-Level Security; only administrators should have access.

### How to configure your key?

{% stepper %}
{% step %}
### In Xero

&#x20;Open your app’s webhook configuration and copy the webhook signing key.
{% endstep %}

{% step %}
### In the Maica Integration Settings

Paste the value into the Xero Webhooks Key field.
{% endstep %}

{% step %}
### Save

Maica will begin verifying inbound Xero webhooks against this key.
{% endstep %}
{% endstepper %}

### How to rotate your key?

If you regenerate the signing key in Xero, paste the new value into the Xero Webhooks Key field. Inbound webhooks signed with the old key will fail verification once Xero switches over, so update both sides together.

{% hint style="info" %}
If Xero webhooks start returning signature failures (HTTP 401 from Maica), confirm the key in Salesforce exactly matches the current key in your Xero app.
{% endhint %}
