# Architectural Principles

A small number of deliberate principles shape the RACS solution. Understanding them helps administrators configure, extend, and support the solution without working against its design. This article explains the most important boundary in the solution, the deposits versus invoicing split, and then the broader conventions the build follows.

## The deposits versus invoicing boundary

The single most important principle to understand is that **accommodation deposits and invoicing are kept apart**.

A refundable accommodation deposit (RAD or RAC) or a legacy bond is money the provider holds on the resident's behalf and must refund on departure. It is not a charge. For that reason it is tracked as a **financial ledger**: a Lump Sum Account with child Lump Sum Transaction records for every payment, retention deduction, draw-down, and refund. The ledger gives a complete audit trail and lets the balance be reconstructed at any point in time.

Daily accommodation payments (DAP and DAC), by contrast, are fees. They are configured as Agreement Items and billed by the billing engine like any other fee.

{% hint style="danger" %}
Never raise an invoice for a RAD, RAC, or bond. These are deposits held on the resident's behalf, not charges. Recording them as fees would misstate both the resident's liability and the provider's prudential position. Only DAP and DAC, the daily accommodation fees, are invoiced.
{% endhint %}

## Design boundaries and conventions

### Namespace and naming

All objects and fields use the `maica_cc` namespace. New Apex classes use the `RAC_` prefix, and the RACS settings components use the `settingRACS` prefix. These conventions make RACS artefacts straightforward to identify alongside the rest of the package.

### Single source of truth and formula propagation

Where a value belongs to the resident as a whole, it lives on the **Funding** record and is read elsewhere by formula rather than duplicated. The clearest example is the fee arrangement: it is stored on Funding and read by every linked Service Agreement through a read-only formula. When the arrangement changes, every Service Agreement reflects it immediately, with no record updates and no risk of values drifting out of step.

### Ledger integrity

The Lump Sum Account links to the Service Agreement with a **Lookup**, not a Master-Detail relationship, and that Lookup carries a Restrict delete constraint. This is deliberate. A Master-Detail relationship would cascade-delete the lump sum records if the Service Agreement were ever removed, destroying the financial audit trail. The Lookup avoids that, and the Restrict constraint goes further by blocking deletion of a Service Agreement outright while lump sum accounts still hang off it. The ledger is preserved regardless of what happens to the agreement.

Note that the relationship in the other direction is different. Each Lump Sum Transaction is a **Master-Detail** child of its Lump Sum Account, because a transaction has no meaning without its parent account.

Within the ledger, the signed transaction amount is the authoritative figure for balance mathematics, with a positive mirror field used only so that cumulative totals display as positive numbers.

### A general-purpose billing engine

The billing engine is a **general-purpose Agreement Item processor**, not a set of hard-coded routines for each fee. Fee-type-specific behaviour, such as cap validation, retention timing, or leave adjustments, activates based on the Fee Type classification of the Agreement Item's linked Support Item. Items without special rules are processed with a standard quantity, rate, and days calculation. This keeps the engine extensible: a new fee type is largely a matter of configuration on the Support Item rather than new engine code.

### Access via permission sets

All access is granted through permission sets and permission set groups, never profiles. This is the standard Maica convention and keeps access portable and auditable.

### Settings via the Maica Settings framework

RACS configuration surfaces inside the existing **Maica Settings** tab, mounted through Custom Metadata records rather than as bespoke tabs or Lightning pages. New settings reuse the framework other Maica settings use.

### Direct editing boundaries

Some objects must be managed through Maica's user interface components rather than edited directly, to avoid invalid data or processing errors. The lump sum ledger is a clear example: deposit payments, draw-downs, and refunds should be recorded through the Manage RACS Agreement component, which keeps the balance, transactions, and any dependent calculations consistent. For the general rules on which objects can be edited directly, see the [Maica Usage Rules](https://knowledge.maica.com.au/) in the User Guide.

### The government integration boundary

Where Services Australia provides a Business-to-Government (B2G) API, Maica integrates directly, for example for entry, departure, and supplement events, resident data sync, claims, and accommodation balance reporting. Where no API exists, Maica provides the data the provider needs and the provider completes the submission in the relevant portal. SIRS notifications and the APCS component of the Annual Financial Report both follow this pattern: Maica holds and outputs the data, and the provider keys it into the government portal.
