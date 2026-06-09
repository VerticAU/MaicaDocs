# PRODA B2B Device Keys — Configuration and Rotation

Maica connects to the Australian Government PRODA and NDIA CIAM gateways using a PRODA B2B device. Each device authenticates with an RSA key pair. This article explains how those keys are created, where they are stored, and how to rotate them.

### How are the keys created?&#x20;

Salesforce cannot generate RSA key pairs natively, so Maica generates them through the Maica Integration proxy. When you activate or refresh a PRODA device from Maica Settings → PRODA Integration, Maica calls the proxy, which generates a fresh RSA-2048 key pair. The proxy encrypts the private key with AES-256 before it is returned to Salesforce, so the value written to the PRODA Setting record (Private\_Key\_\_c) is ciphertext, not a readable key.

### Where are the keys stored?&#x20;

* The public key is registered with PRODA / CIAM during device activation.
* The private key is stored on the PRODA Setting record as AES-256 ciphertext. The key needed to decrypt it lives only inside the Maica proxy environment; it is not stored in   Salesforce, in metadata, or in any export. Reading the field directly returns ciphertext that cannot be decrypted from within Salesforce.&#x20;
* The private key is only ever decrypted inside the proxy, in memory, at the moment a PRODA/CIAM access token is requested. It is never sent back to Salesforce in readable form.

### Who can access these fields?&#x20;

Access to PRODA Setting records and the Private\_Key\_\_c / Public\_Key\_\_c fields is controlled by standard object permissions and Field-Level Security. Only administrators with the relevant Maica Permission Set should be granted access.&#x20;

{% hint style="warning" %}
Do not expose these fields on page layouts available to non-administrators.
{% endhint %}

### How do you rotate the keys?&#x20;

{% stepper %}
{% step %}
### Open the Maica Settings

Head to PRODA Integration and select the device
{% endstep %}

{% step %}
### Choose Refresh Device Keys

Maica generates a new key pair through the proxy, re-registers the new public key with PRODA, and replaces the stored (encrypted) private key. &#x20;
{% endstep %}

{% step %}
### &#x20;Confirm the device shows an updated Device Key Expiry

Rotate keys on the schedule mandated by your PRODA agreement, or immediately if you suspect the device has been compromised.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
**Please note & be aware**

1. Never paste a raw private key into the field manually. Always use the activate/refresh actions so the value is generated and encrypted correctly.
2. If device authentication starts failing after an org refresh or sandbox copy, re-run Refresh Device Keys to re-establish a valid key pair.
{% endhint %}

