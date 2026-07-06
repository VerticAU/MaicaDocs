# PRODA

These settings determine how Maica connects your instance to PRODA and the government APIs. Maica supports connecting to more than one service at once, so a single instance can hold separate connections for NDIS and Aged Care (Support at Home).

## Things to note: PRODA integrations

To achieve a successful connection between your Maica instance and the government APIs, both your **Organisation** and each **Software Instance** (or **Device**) must be registered within PRODA. During software instance registration, PRODA provides a **Device Activation Code (DAC)** that Maica requires so we can activate the device on your behalf.

Please note the following definitions:

| Term                                | Definition                                                                                                                                                                    |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PRODA (Provider Digital Access)** | A secure online authentication system used by government services, including the NDIS and Aged Care, to verify the identity of providers and manage authorised system access. |
| **Device**                          | A software instance or system that connects to a government API, enabling authorised digital interactions between service providers and the relevant scheme.                  |
| **Device Activation Code (DAC)**    | A unique code provided by PRODA when registering a software instance, required for authorising the device to access the APIs on behalf of the registered organisation.        |
| **Service Type**                    | The scheme a connection is for. Maica supports **NDIS** and **Aged Care** (used for Support at Home). Each PRODA connection is tied to one service type.                      |

Maica has simplified this process, but certain steps must still be completed by your organisation. These are described below.

{% hint style="info" %}
Maica supports multiple PRODA devices, so you can connect separately to different services (for example, one device for NDIS and another for Aged Care / Support at Home). Each connection links a PRODA device to a service type so that the related functions are submitted through the correct channel.
{% endhint %}

## Registering your device in PRODA

### Prerequisite requirements

Before you can use the API-dependent features of Maica, you need an active PRODA device for each service you intend to connect. Without an active device, Maica cannot connect to that service's API.

As a prerequisite, it is assumed you have completed the following within PRODA:

* **Created and verified your PRODA account.** Your organisation must have a verified PRODA account with an authorised person who can manage devices. This is the identity PRODA uses to confirm who is authorising system access.
* **Registered your organisation for the relevant service.** Your organisation must be linked in PRODA to the government service you are connecting to (for example, the NDIS or the Aged Care system), so that the correct APIs are made available to it.
* **Created and registered your B2B Device.** A B2B Device is the software instance that will communicate with the API. Registering it in PRODA is what produces the Device Activation Code, Device Name, and organisation (RA) details that Maica needs.

{% hint style="info" %}
These are all steps you complete directly in PRODA, before you configure anything in Maica. If you need help with them, the NDIA has published a [PRODA Step-by-Step Guide](https://drive.google.com/file/d/1-xxMU0aOQdasYszCrWUVMl9VtedksDY7/view) with instructions and screenshots that walk you through account verification and B2B Device registration.
{% endhint %}

### Details to capture during registration

When you register the device within PRODA, make note of the following so you can complete activation in Maica. For NDIS, follow the official [NDIA PRODA Step-by-Step Guide](https://drive.google.com/file/d/1-xxMU0aOQdasYszCrWUVMl9VtedksDY7/view) (see Page 20 onwards):

{% hint style="info" %}
For an **NDIS** connection:

* **Add Service Provider (NDIS API)** – Page 20
* **Assign Device Attribute** – use `NAPI_PROVIDER_CATALOGUE` – Page 22

The device attributes and service provider steps differ for Aged Care. Refer to the relevant Services Australia guidance for the Aged Care API when registering an Aged Care device.
{% endhint %}

{% hint style="warning" %}
The **Device Name** is case-sensitive and must be entered in Maica exactly as it appears in PRODA. Make a note of the exact name you use when registering the device.
{% endhint %}

{% hint style="danger" %}
When PRODA displays your **Device Activation Code (DAC)**, store it somewhere safe immediately. You **cannot** retrieve this code once you leave the screen, and it is valid for one-time use only within 7 days. If the device is not activated within that period, you will need to obtain a new activation code.
{% endhint %}

Once the PRODA device is created, ensure the following details are captured and available before you move to Maica:

* Device Activation Code
* Device Name (exactly as registered, including case)
* PRODA RA (Organisation ID)
* The Service Type this device is for (NDIS or Aged Care)

## Activating a PRODA device in Maica

In the NDIS Integration settings, the **PRODA Devices** section lists your activated devices and lets you add new ones. To activate a device, add a new device and complete the activation form with the details from PRODA.

The activation form asks for the following:

| Field                       | Description                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Service Type**            | The scheme this device is for. Select **NDIS** or **Aged Care**. This determines which API the device authenticates against.                                                            |
| **Mode**                    | The PRODA environment you wish to connect to. Use **TEST** if you are connecting from a Salesforce Sandbox, or **LIVE** if you are connecting from your Salesforce Production instance. |
| **Device Activation Code**  | The one-time code issued to your organisation's authorised person during Device Registration in PRODA. It is valid for 7 days.                                                          |
| **Device Name**             | The name of the B2B Device. This is **case-sensitive** and must match the name in PRODA exactly.                                                                                        |
| **PRODA RA (Organisation)** | Your Registration Authority (RA) number.                                                                                                                                                |

{% hint style="info" %}
You will be issued all of this information when you complete your B2B Device Registration in PRODA.
{% endhint %}

Once the details are entered, submit the activation. This notifies the Maica team to finalise the registration on our end, and the device will show as **Pending Activation** until we complete the process.

{% hint style="success" %}
Once the device is activated and confirmed by the Maica team, its status updates to reflect that the device is live and ready to use.
{% endhint %}

## Creating an API connection

A PRODA device authenticates with PRODA, but Maica routes each API function (such as claiming or reference data) through a named **connection** tied to a service type. After a device is activated, create a connection so Maica knows which device to use for which service.

In the NDIS Integration settings, the **PRODA Connections** section lets you add a connection for each service type. When adding a connection you provide:

| Field            | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| **Name**         | A label for the connection, so it can be identified in the list.     |
| **Service Type** | The scheme this connection serves. Select **NDIS** or **Aged Care**. |
| **PRODA Device** | The activated PRODA device this connection should use.               |

{% hint style="info" %}
If a connection shows as pending, contact a member of the Maica team or email [maica@vertic.com.au](mailto:maica@vertic.com.au) to finalise the connection.
{% endhint %}

## Checking a connection

To confirm a connection is working, use the **Check Connectivity** action on the relevant connection. Maica sends a lightweight reference-data request to that service's API:

* For an **NDIS** connection, Maica requests reference data from the NDIS API.
* For an **Aged Care** connection, Maica requests the service list from the Aged Care API.

{% hint style="info" %}
This is a check only. It confirms the connection works and will not affect your Salesforce data in any way.
{% endhint %}

## Managing device expiry

When you first activate a device in PRODA, an expiration date is set. On this date, PRODA disables the device, and it can no longer communicate with the APIs unless it has been **extended** or a new device has been **created**.

When a device is registered, Maica stores its **Device Expiry Date** and displays it against the device in the PRODA Devices section, so you can see at a glance when action is required.

{% hint style="warning" %}
Failing to extend or activate a new device before the Device Expiry Date will result in the device being **disabled** by PRODA. Maica will then be unable to communicate with that service's API functions.
{% endhint %}

### Extending a device

Device extension happens entirely in the PRODA portal, not in Maica. To extend a device, the authorised person signs in to PRODA, opens the organisation's B2B Devices, selects the device, and extends its expiry. PRODA sets a new expiry date, and no re-activation is required in Maica because the underlying device remains the same.

{% hint style="info" %}
You can extend a device **at any time** before its Device Expiry Date via PRODA. Doing so extends the current device and means you do not need to create and register a new one. It is good practice to extend well ahead of the expiry date to avoid any interruption to your API access.
{% endhint %}

{% hint style="danger" %}
If a device has already expired, it **cannot** be extended. You will need to create and register a new device within PRODA and activate it in Maica.
{% endhint %}

### Refreshing device keys

Each PRODA device holds a set of security keys with their own validity period, shown against the device alongside the expiry date. If a device's keys need to be renewed, use the **Refresh Device Keys** action on the device to update them without re-activating the device.

## Expired PRODA device

If a device is not extended before its Device Expiry Date, PRODA disables it, and the device is shown as expired in the NDIS Integration settings.

{% hint style="info" %}
As noted above, an expired device cannot be extended. You will need to create and register a new device within PRODA and activate it in Maica.
{% endhint %}

While a device is expired, attempting to use any of Maica's PRODA or API-dependent functions for that service will return an error, because Maica does not send requests to the API once the device has expired.

## NDIS notifications

This section designates the Site that handles NDIS notifications received via webhook.

{% hint style="info" %}
For more information on NDIS Notifications, including setup and assigning the necessary permission set, see the [NDIS Notification](/broken/pages/62f66b2a4d2aa9348bf9206064fc3a11045b191d) page.
{% endhint %}
