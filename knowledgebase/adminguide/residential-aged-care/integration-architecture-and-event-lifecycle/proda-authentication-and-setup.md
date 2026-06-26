# PRODA Authentication and Setup

Every Maica integration with Services Australia, including all of the residential aged care event and data APIs, authenticates through PRODA. Before any aged care event can be submitted or any care recipient data synced, an administrator must configure and activate a PRODA business-to-government (B2G) connection. This article explains how that authentication works and how to set it up for aged care.

{% hint style="info" %}
PRODA configuration is a System Administrator task. The same framework also powers NDIS claiming, so an organisation that already claims through Maica will recognise the device model described here. Aged care uses its own service connection alongside the NDIS one.
{% endhint %}

## How Maica authenticates with Services Australia

Maica authenticates using the PRODA B2B device protocol. This protocol relies on a registered device with an RSA key pair and a per-device activation step, rather than a simple username and password. Because the protocol is non-standard, Maica brokers it through a dedicated PRODA proxy service: the proxy holds the device protocol logic and exchanges the device credentials for a short-lived access token on Maica's behalf.

Two services are supported: `NDIS` and `AGC` (Aged Care). Residential aged care uses the `AGC` service. Each outbound request Maica sends to Services Australia carries:

* `Authorization: Bearer [token]` - the short-lived PRODA access token that authenticates the request.
* `X-IBM-Client-Id` - the API key identifying the Maica software product to Services Australia.

Write operations (creating, updating, or deleting events) additionally include:

* `x-requested-with` - a CSRF mitigation header required by Services Australia on every POST, PUT, and DELETE.
* `if-match` - an ETag value from the previous read, used for concurrency control so an update cannot overwrite a record changed elsewhere since it was last read.

### The aged care endpoints

Maica targets the Services Australia Aged Care Web Services (ACWS) endpoints. The endpoint used is derived automatically from the device **Mode** and is stored on the connection, so administrators do not enter it by hand.

| Mode   | Aged Care endpoint                                                           |
| ------ | ---------------------------------------------------------------------------- |
| `Test` | `https://test.healthclaiming.api.humanservices.gov.au/claiming/ext-vnd/acws` |
| `Live` | `https://healthclaiming.api.humanservices.gov.au/claiming/ext-prd/acws`      |

### Failures do not block care operations

A core design principle applies across every Services Australia integration: a failed callout never blocks a care operation in Maica. If a submission fails because of a network error, a Services Australia outage, or a validation rejection, the Maica record changes are kept, the failure is logged on the relevant Aged Care Event with an error status and detail, and the user is notified so they can retry. Authentication problems surface the same way, so a lapsed or misconfigured PRODA connection produces a clear, retryable error rather than data loss.

## Where do I configure PRODA?

PRODA connections are configured on the **PRODA Integration** tab within **Client Management Settings**. Maica's validation messages point administrators to this tab whenever a connection is missing or incomplete.

## Before you begin

{% hint style="warning" %}
**Prerequisites.** Before configuring the aged care connection, the provider must hold a valid PRODA organisation credential, have Maica registered as an approved B2G software product with Services Australia, and have a PRODA device activation code ready. Without these, the device cannot be activated and the connection cannot authenticate.
{% endhint %}

## The configuration objects

PRODA configuration is held across three objects. Two are configured by the administrator, and one is managed by the Maica package.

### The PRODA device

The PRODA device (`PRODA_Setting__c`) represents a single registered B2B device. It holds the identity of the device in PRODA and, once activated, its RSA key pair and expiry dates.

| Field               | API name             | Description                                                                                                                                       | On-screen help text                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Device Name**     | `Device_Name__c`     | The name of the B2B device as registered in PRODA. It must match the device name used at activation.                                              | None                                                                                                                                                                                                                                                                                                                                                |
| **Organisation ID** | `Organisation_ID__c` | The provider's PRODA organisation (RA) identifier under which the device is registered.                                                           | None                                                                                                                                                                                                                                                                                                                                                |
| **Mode**            | `Mode__c`            | Switches the connection and endpoints between the Services Australia test and live environments. Defaults to `Test`.                              | Allows to switch the PRODA/NDIS connection and endpoints into Live or Test mode.                                                                                                                                                                                                                                                                    |
| **Client ID**       | `Client_ID__c`       | The PRODA client identifier for the device.                                                                                                       | The ID of the Client in PRODA.                                                                                                                                                                                                                                                                                                                      |
| **Product ID**      | `Product_ID__c`      | The identifier of the Maica software product registered with Services Australia. It must match the product authorisation for the B2B integration. | Unique identifier of the software product registered in the Services Australia Health Systems Developer Portal. This value must match the product authorisation configured for the PRODA B2B integration. It ensures that the calling application is recognised as an approved product for the requested service (e.g., Aged Care Support at Home). |

The remaining device fields are set by the system, not entered by hand. The **Public Key** (`Public_Key__c`) and **Private Key** (`Private_Key__c`) make up the RSA key pair generated during activation. The **Device Expiry** (`Device_Expiry__c`) and **Device Key Expiry** (`Device_Key_Expiry__c`) record when the device and its keys lapse, and are populated from the activation response.

### The API connection

The API connection (`PRODA_Provider_Setting__c`) links a service type to a device. An organisation has one connection per service: an NDIS connection and, for residential aged care, an Aged Care connection.

| Field                | API name              | Description                                                                                                                                        | On-screen help text                                                  |
| -------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Service Type**     | `Service_Type__c`     | The Services Australia service this connection authenticates against. Select **Aged Care** for residential aged care. Required.                    | None                                                                 |
| **PRODA Setting**    | `PRODA_Setting__c`    | The PRODA device this connection uses to authenticate. Required.                                                                                   | None                                                                 |
| **Auth Client ID**   | `Auth_Client_ID__c`   | The client ID taken from the credentials of the connected app used for authorisation.                                                              | The Client ID key from the Credentials of the Connected Application. |
| **Default Provider** | `Default_Provider__c` | Marks this connection as the default for its service type. Maica uses the default Aged Care connection for every residential aged care submission. | None                                                                 |

Three connection fields are system-managed. The **Endpoint** (`Endpoint__c`) is derived from the service type and the device mode when the device is activated or refreshed. The **Access Token** (`Access_Token__c`) and **Access Token Expiry** (`Access_Token_Expiry__c`) hold the encrypted, short-lived token that Maica caches and reuses between calls.

{% hint style="warning" %}
There must be exactly one connection per service type with **Default Provider** ticked. Maica selects the connection for aged care submissions by looking for the connection where **Service Type** is **Aged Care** and **Default Provider** is true. If no default aged care connection exists, submissions fail with a configuration error.
{% endhint %}

### Package-managed settings

A protected custom setting (`Protected_Setting__c`) holds two values used by the proxy framework: the proxy access token that authorises Maica to the PRODA proxy, and the encryption key used to protect stored access tokens at rest. These values are managed within the Maica package and are not edited by provider administrators.

## Setting up the aged care connection

{% stepper %}
{% step %}
## Create and configure the device

Create a PRODA device record and enter the **Organisation ID**, **Device Name**, **Mode**, **Client ID**, and **Product ID**. Set **Mode** to `Test` while validating the integration, and to `Live` for production submissions.
{% endstep %}

{% step %}
## Activate the device

Activation registers the device with PRODA. Maica generates an RSA key pair, sends the public key together with the organisation ID, device name, product ID, and the activation code to PRODA through the proxy, and stores the resulting key pair and expiry dates on the device.

{% hint style="info" %}
Activation also updates every connection linked to the device: it sets each connection's endpoint from the service type and mode, and clears any cached access token so the next call obtains a fresh one.
{% endhint %}
{% endstep %}

{% step %}
## Create the Aged Care connection

Create an API connection, set **Service Type** to **Aged Care**, link it to the activated device in **PRODA Setting**, enter the **Auth Client ID**, and tick **Default Provider**.

{% hint style="success" %}
Once an activated device and a default Aged Care connection are in place, Maica obtains and refreshes access tokens automatically. No further day-to-day action is needed unless the device expires or the keys need refreshing.
{% endhint %}
{% endstep %}
{% endstepper %}

## Keeping the connection healthy

### Token handling

Maica requests an access token the first time a connection is used, caches it in encrypted form on the connection, and reuses it until shortly before it expires. When the cached token nears expiry, the next call obtains a new one. This happens automatically.

### Device and key expiry

A device carries an expiry date and a key expiry date. If the device has not been activated, or its expiry has passed, aged care submissions stop and Maica returns an error explaining that the device must be activated or renewed via the PRODA Integration tab. Renew the device keys before the key expiry date to avoid interruption.

{% hint style="danger" %}
If the device is not activated or has expired, every aged care API call will fail until it is renewed. Track the device and key expiry dates and refresh ahead of time, as expired credentials block entry, departure, leave, supplement, and balance submissions alike.
{% endhint %}

### Diagnostic logging

Detailed PRODA request and response logging is gated by a permission set (`Maica_PRODA_Debug`). Assign it only when investigating an authentication problem, since it records request and response detail for troubleshooting.

## Related articles

{% hint style="info" %}
For how authenticated calls flow to and from Services Australia and how event statuses progress, see [Integration architecture and event lifecycle](/broken/pages/9f898474e0009cdc10b82cd848599da2a1977748). For the objects that store PRODA configuration alongside the wider solution, see [The RACS data model](/broken/pages/656667b08c1afdd99c5a41b5c4d4b46fe607db42). For the day-to-day user view of submitting events, see [Working with Services Australia](/broken/pages/5525c59fd0f4fb5b762ca3f9c0619a1ccef35814) in the User Guide.
{% endhint %}
