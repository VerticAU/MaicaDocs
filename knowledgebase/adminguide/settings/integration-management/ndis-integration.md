---
description: Learn about NDIS Integration Settings in Maica
---

# NDIS Integration

These settings determine how Maica manages the connection of your Maica instance to PRODA and the APIs.&#x20;

## Things to Note: NDIS Integrations

In order to achieve a successful connection between your Maica instance and the NDIS APIs, both your **Organisation** and **Software Instance**, or **Device**, must be registered within PRODA. As part of this process, a **Device Activation Code (DAC)** will be provided by **PRODA** during software instance registration that will be required by **Maica** so we can activate the device on your behalf.&#x20;

Please note the following definitions:&#x20;

<table><thead><tr><th width="277">Term</th><th>Definition </th></tr></thead><tbody><tr><td><strong>PRODA (Provider Digital Access)</strong></td><td>A secure online authentication system used by government services, including NDIS, to verify the identity of providers and manage authorised system access.</td></tr><tr><td><strong>Device</strong></td><td>Refers to a software instance or system that connects to the NDIS API, enabling authorised digital interactions between service providers and NDIS.</td></tr><tr><td><strong>Device Activation Code (DAC)</strong></td><td>A unique code provided by PRODA when registering a software instance, required for authorising the device to access NDIS APIs on behalf of the registered organisation.</td></tr></tbody></table>

Whilst **Maica** has simplified this process, there are certain steps that must be completed by your Organisation, these steps are described in detail below under [PRODA Device Management](ndis-integration.md#proda-device-management).&#x20;

## Activate PRODA Device

### Prerequisite Requirements&#x20;

Prior to using **Maica**, you need to activate your PRODA device. As mentioned above, an active PRODA device is required in order for Maica to use any of the API functions, without this, Maica cannot connect.&#x20;

As a prerequisite to this step, it is assumed that you have completed the following steps:&#x20;

* Created and **verified** your PRODA account
* Created and **registered** your B2B Device within PRODA

{% hint style="info" %}
If you need help with the above, the NDIA published a [PRODA Step-by-Step Guide](https://drive.google.com/file/d/1-xxMU0aOQdasYszCrWUVMl9VtedksDY7/view), which provides instructions and screenshots to walk you through the two processes listed above.
{% endhint %}

### Device Registration in PRODA&#x20;

When you register the device within PRODA, please make note of the following details in order to ensure a successful connection in **Maica.** Please follow the instructions outlined in the official [NDIA PRODA Step-by-Step Guide](https://drive.google.com/file/d/1-xxMU0aOQdasYszCrWUVMl9VtedksDY7/view) (see Page 20 onwards):

{% hint style="info" %}
* **Add Service Provider (NDIS API)** – Page 20
* **Assign Device Attribute** – Use `NAPI_PROVIDER_CATALOGUE` – Page 22
* The Device Name must be `maica`
* Please make sure the Device Name is all `lowercase`
* When you are provided with your `Device Activation Code` (DAC), store somewhere safe - you **cannot** get this detail once you leave this screen
{% endhint %}

For convenience, you may copy the Device Name provided below:

```
maica
```

{% hint style="info" %}
Once the PRODA device is created, ensure the following details are captured and available:

* Device Activation Code
* Device Name
* PRODA RA (Organisation ID)

These details are required to finalise the connection in the Maica Integration Settings screen.
{% endhint %}

### Device Activation in Maica&#x20;

Within the NDIS Integration settings, under Activate PRODA Device, you will find input boxes to populate with your information from PRODA. This includes the following:&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-10-28 at 11.59.43 am.png" alt=""><figcaption></figcaption></figure>

Each of these fields is further detailed below:&#x20;

{% hint style="info" %}
You will be issued all of this information following completion of your B2B Device Registration in PRODA
{% endhint %}

* **Mode**: Your PRODA environment that you wish to connect Maica to.
  * If you are using a Maica Sandbox - this should be TEST
  * If you are using your Maica Production instance - this should be LIVE
* **Your Device Activation Code**: The device activation code is issued to your organisation’s authorised person during Device Registration within PRODA. The device activation code will be displayed on the browser at this point. The code is for ‘one time use’ only, with a validity period of 7 days. If the device is not activated within this time period, the authorised person is required to obtain a new activation code.
* **Device Name**: The name of B2B Device. Note: it is case-sensitive.
* **PRODA RA (Organisation)**: This is your Registration Authority (RA) Number

Once done, click `Submit Device Activation Details` to finish your part of the process. This will notify the Maica team to complete the registration on our end. After successfully submitting the activation, your NDIS Integrations will let you know that your PRODA Device is Pending Activation. From here, we will complete the activation process.&#x20;

{% hint style="success" %}
Once the Device is activated and confirmed by the Maica team, this status will update to reflect that the connection is live and ready to use.
{% endhint %}

## Extend PRODA Device

When you first activate a device in PRODA, they will set an expiration date. This will mark the date the device will be disabled by PRODA and can no longer be used to communicate with the APIs without being **extended**, or a new device **created**.&#x20;

When your device is initially registered, Maica will store the `Device Expiry Date`, so we can help manage this process and ensure that you are alerted well ahead of time so you can **extend the device** and ensure continuity of your access to the APIs.

{% hint style="warning" %}
Failing to extend or activate a new device prior to the `Device Expiry Date` will result in the device being **disabled** by PRODA and **Maica** will be unable to communicate with any of the NDIS API functions.
{% endhint %}

### Viewing your Device Expiry Date&#x20;

After completing the device activation process, the NDIS Integration tab will display the Device Expiry Date specified by PRODA. This is prominently presented in an orange panel, as shown below:&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-10-28 at 1.54.35 pm.png" alt=""><figcaption></figcaption></figure>

### Device Extension &#x20;

After completing the device activation process, the NDIS Integration tab will display the following information:

{% hint style="success" %}
Your **Maica** PRODA device can be Extended at any time in PRODA portal.
{% endhint %}

You must extend your device directly from PRODA, not through **Maica**.&#x20;

{% hint style="info" %}
You can extend the Device Activation **at any time** prior to the `Device Expiry Date` via PRODA. Doing this prior to the `Device Expiry Date` will extend the current device and ensure that you do not need to create and register a new PRODA device.

Should your PRODA device expire, you will have to create and register a new device within PRODA. An expired device **cannot be extended**.
{% endhint %}

### Device Expiry Email Notification

As mentioned above, **Maica** stores the `Device Expiry Date` once the device is activated. In addition, we have introduced a useful daily process to check the `Device Expiry Date` and send an **email reminder** to warn you of the upcoming expiry, allowing you to **extend the device** and avoid any disturbance.

Found in the Maica Settings under Email Management, you can configure the following:&#x20;

* `Email Template`: The Salesforce Lightning Email Template you would like to send

{% hint style="info" %}
You can utilise ours, which is named `Maica PRODA Device Expiry Reminder`.
{% endhint %}

* `Days Prior to Expiry`: The number of days **prior** to the the `Device Expiry Date` that you would like to be notified to extend the device
* `Recipient`: The user you would like to receive the email notification.

{% hint style="info" %}
This must be an **Active** Salesforce user
{% endhint %}

This Setting is shown below:&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-10-28 at 2.28.31 pm.png" alt=""><figcaption></figcaption></figure>

## Expired PRODA Device

If you fail to extend the PRODA Device via the Maica Settings before the **Device Expiry Date**, PRODA will disable your device and display the following message on the NDIS Integration page of Maica Settings:

<figure><img src="../../.gitbook/assets/expired PRODA device.png" alt=""><figcaption></figcaption></figure>



{% hint style="info" %}
In this case, as mentioned above, you will be required to create and register a new device within PRODA. An expired device **cannot be extended**.
{% endhint %}

Furthermore, accessing any of Maica's PRODA and API-specific functionalities while your device is expired will result in the following message.&#x20;

<figure><img src="../../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

You will be unable to complete any of these actions/processes since Maica does not send any queries to the API after the device has expired.

## NDIS Connection Health Check

In order to check your connection to the NDIS API Reference Data endpoint, simply click the `Check API Connectivity` button, as shown below:&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-10-29 at 12.27.22 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
This is a check only and will not affect your **Maica** data in any way.
{% endhint %}

## NDIS Notifications

This section allows you to designate the Site that will handle NDIS Notifications received via webhook.&#x20;

{% hint style="info" %}
&#x20;For more information on NDIS Notifications, including setup and assigning the necessary permission set, see the [NDIS Notification](../../integrations/ndis-notifications.md) page.
{% endhint %}
