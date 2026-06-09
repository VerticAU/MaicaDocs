---
description: Learn how Maica manages multiple Service Provider IDs
hidden: true
noIndex: true
---

# Multiple Service Provider ID Support

Maica supports integration with **multiple Services Australia Provider IDs** under the PRODA framework. This allows organisations delivering services across different Provider IDs to authenticate, synchronise, and submit claims seamlessly within a single Maica org.

### Component Behaviour

* Multiple PRODA devices can be configured in Maica, each linked to its own **Provider ID**.
* Synchronisation processes (e.g., Budget/Plan Sync, Bulk Budget Sync, Claim Batch generation, Claim submission, Check Claim Status) automatically use the correct Provider ID for authentication.
* If no Provider ID is recorded on the Contact or Claim Batch, Maica will prompt you to select one.
* A default Provider ID may be configured in the Integration Management tab and is auto-populated where possible.

{% hint style="info" %}
All API callouts to Services Australia are authenticated against the correct Provider ID and device credentials.
{% endhint %}

### Data Model

The following fields ensure correct mapping between Care Recipients, Claim Batches, and PRODA devices:

#### Contact

<table><thead><tr><th width="160.79296875">Field Label</th><th width="303.8046875">API Name</th><th width="86.859375">Type</th><th>Description</th></tr></thead><tbody><tr><td>Services Australia Provider ID</td><td><code>Services_Australia_Provider_ID__c</code></td><td>Text</td><td>Services Australia Provider ID for the Service Provider that this Participant is linked to.</td></tr><tr><td>NDIS Provider ID</td><td><code>NDIS_Provider_ID__c</code></td><td>Text</td><td>NDIS Provider ID for the Service Provider that this Participant is linked to.</td></tr></tbody></table>

#### Claim Batch

<table><thead><tr><th width="106.3828125">Field Label</th><th width="307.8671875">API Name</th><th width="88.59765625">Type</th><th>Description</th></tr></thead><tbody><tr><td>Services Australia Provider ID</td><td><code>Services_Australia_Provider_ID__c</code></td><td>Text</td><td>Provider ID applied to the Claim Batch. Used to filter related Invoice Line Items (ILIs) and in claim submission processes.</td></tr></tbody></table>

#### PRODA Device Settings

<table><thead><tr><th>Field Label</th><th width="193.9921875">API Name</th><th width="110.9453125">Type</th><th>Description</th></tr></thead><tbody><tr><td>Device Name</td><td><code>maica_Device_Name__c</code></td><td>Text</td><td>Friendly identifier for the PRODA device.</td></tr><tr><td>Provider ID</td><td><code>maica_Provider_ID__c</code></td><td>Text</td><td>Provider ID linked to the device. Must match IDs stored on Contacts or Claim Batches.</td></tr><tr><td>Device Keys</td><td><code>maica_Device_Keys__c</code></td><td>Encrypted</td><td>Credentials used for authentication with Services Australia APIs.</td></tr><tr><td>Device Type</td><td><code>maica_Device_Type__c</code></td><td>Picklist</td><td>Identifies whether the device is used for Services Australia or NDIS.</td></tr><tr><td>Is Active</td><td><code>maica_Is_Active__c</code></td><td>Checkbox</td><td>Indicates if the device is currently available for authentication.</td></tr></tbody></table>

***

### Process Flow

#### 1. Participant Budget Sync

* When `Services_Australia_Provider_ID__c` on the Contact is null, you are prompted to select a Provider ID.
* The default Provider ID from Integration Management settings is pre-populated where configured.
* The selected Provider ID is stored on the Contact and used for synchronisation.

#### 2. Generate Claim Batch

* When `Services_Australia_Provider_ID__c` on the Claim Batch is null, you are prompted to select a Provider ID.
* The default Provider ID from Integration Management settings is pre-populated where configured.
* Invoice Line Items (ILIs) are retrieved based on the following conditions:

```apex
ILI retrieval conditions:
- Funding Structure = Support at Home
- Service Provider = selected Service Provider ID
- Service Date >= selected Start Date
- Service Date <= selected End Date
- Participant.Services_Australia_Provider_ID__c = ClaimBatch.Services_Australia_Provider_ID__c
- Claim Batch is null (or matches existing Claim Batch Id)

If includeFailedItems = TRUE:
- Also include ILIs where Claim Status = 'Submission Failed'
  AND Participant.Services_Australia_Provider_ID__c = ClaimBatch.Services_Australia_Provider_ID__c
```

#### 3. Check Claim Status

* All processes use `Services_Australia_Provider_ID__c` from the Claim Batch to ensure claim checks are tied to the correct Provider ID.

### UI Behaviour

* **PRODA Device Settings Page**
  * Here, you can register and manage multiple devices.
  * Each device includes its Provider ID, keys, and activation state.
* **Budget/Plan Sync & Claim Batch UI**
  * If Provider ID is not defined on the record, a modal prompts you to select one.
  * Dropdown values are pulled from active PRODA Devices in Settings.

{% hint style="warning" %}
If no valid Provider ID/device combination exists, processes fail with an error instructing administrators to configure PRODA devices.
{% endhint %}

***

### Scheduled Jobs

* **Device Activation Reminder** – runs daily at 10:00 AM to notify administrators of devices requiring activation.
* **Device Keys Expiration Management** – runs daily at 2:00 AM to alert administrators of expiring keys.

{% hint style="success" %}
Always ensure that `Services_Australia_Provider_ID__c` is populated on Contacts and Claim Batches, and that corresponding PRODA devices are active. These mappings are critical for synchronisation, claim submission, and reporting accuracy.
{% endhint %}
