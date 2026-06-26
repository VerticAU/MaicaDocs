# Prerequisites and Dependencies

Residential Aged Care Services (RACS) is delivered as part of the Maica platform and builds on the configuration and permission model that already governs the rest of Maica. Before you configure rates, admit residents, or connect to Services Australia, confirm that the package, platform, access, and baseline configuration prerequisites described here are in place.

{% hint style="info" %}
For a wider view of how RACS is packaged and where it sits in the Maica architecture, see [RACS Solution Overview](/broken/pages/422b93e2a98a5c35db214fdc1d2576d1b1cd53b8).
{% endhint %}

## Package architecture

RACS is not a standalone product. It is delivered through Maica's two-package structure:

| Package                           | Namespace    | Role                                                                                                               |
| --------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| **Maica** (base)                  | `maica__`    | The core Maica platform: Service Agreements, Funding, Agreement Items, billing, and the shared Settings framework. |
| **Maica Client Care** (extension) | `maica_cc__` | The package that contains the RACS objects, Apex services, LWCs, and Settings tabs. RACS ships here.               |

The Maica Client Care package depends on the base Maica package. The base package must be installed and current before Maica Client Care is installed or upgraded. All RACS objects and fields carry the `maica_cc__` namespace (for example `maica_cc__Lump_Sum_Account__c` and `maica_cc__Setting__c`).

{% hint style="warning" %}
Install or upgrade the base Maica package first, then Maica Client Care. Installing the extension package against an out-of-date base package can cause deployment errors.
{% endhint %}

## Platform requirements

RACS inherits the same Salesforce platform baseline as the rest of Maica:

* **Lightning Experience.** The entire RACS user interface is built with Lightning Web Components (the Manage RACS Agreement component, the RACS Configuration settings tab, the APCS export tool, and the coverage check). RACS is not supported in Salesforce Classic.
* **Custom objects and Apex.** RACS relies on custom objects, Apex services, and scheduled batch jobs, so the org must run a Salesforce edition that supports these (the same edition baseline required by the core Maica package).
* **Scheduled Apex.** The billing engine, indexation engine, and fee rate automation run as scheduled batch jobs. The org must allow scheduled Apex for these processes to run automatically.

{% hint style="info" %}
For the exact supported Salesforce editions and API version of your installed package, refer to your Maica release notes or the base Maica installation guide. RACS does not add platform requirements beyond those of the core Maica package.
{% endhint %}

## Access and permissions

Maica grants access through **permission sets and permission set groups**, never through profiles. Assign the appropriate permission set group to each user rather than editing profiles.

### Administrator access

Configuration of RACS (the RACS Configuration settings tab, rate values, automation toggles, and the operational tools that run from Maica Settings) is granted by the established Maica administrator permission set group, **Maica - Access Maica Settings & Object Permissions** (`Maica_Access_Maica_Settings_Group`). A user with this group can see the Residential Aged Care Services area in Maica Settings and edit the RACS configuration values.

### Operational access

Day-to-day RACS work is split across two operational personas, each delivered as a permission set group:

| Permission set group                                                                      | Grants                                                                                                                                                               |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maica - RACS - Manage Care Recipient** (`Maica_RACS_Manage_Care_Recipient`)             | Admitting residents, managing the Fees tab, syncing care recipient data, submitting Aged Care Events, running RN coverage checks, and viewing balances and invoices. |
| **Maica - RACS - Manage Billing and Claiming** (`Maica_RACS_Manage_Billing_and_Claiming`) | Managing RAD/RAC accommodation deposits, manual rate changes, claims sync, statement reconciliation, accommodation balance submission, and departure billing.        |

These two groups draw on a set of underlying feature permission sets (for service agreement management, departure processing, fee rate checks, care recipient sync, aged care events, RN coverage, claims, reconciliation, accommodation balance reporting, and RN supplement sync).

{% hint style="warning" %}
Permission set and permission set group names can change between package releases. Confirm the exact RACS permission set group names available in your installed package version before assigning them, and assign them alongside the baseline Maica permission set groups that any Maica user already requires.
{% endhint %}

## Baseline configuration

Two configuration prerequisites must be satisfied before RACS behaves correctly.

### An active Billing Setting record

All RACS configuration values (caps, rates, indexation numbers, and automation toggles) are stored on the Maica **Billing Setting** record - the `maica_cc__Setting__c` record where `API_Name__c = 'Billing_Setting'` and `Active__c = true`. This record ships with the base Maica package and exists in every installed org.

{% hint style="danger" %}
If no active Billing Setting record exists, the RACS Configuration tab cannot load its values and displays an empty state. A missing Billing Setting record indicates a base Maica package installation issue, not a RACS configuration issue. Resolve the package installation before continuing.
{% endhint %}

### Services Australia integration setup

The RACS features that exchange data with Services Australia (entry, departure, leave, and supplement events, inbound data syncs, and claims) require a working PRODA connection and the associated integration configuration. Set this up before using any Services Australia dependent feature.

{% hint style="info" %}
PRODA and integration setup is covered in [PRODA Authentication and Setup](/broken/pages/c9d1c1f26c027fbc39143fdf2bc8eefb8bc98db8). Features that do not touch Services Australia (such as internal billing and fee configuration) do not require it.
{% endhint %}

## Related articles

* [The RACS Configuration Tab](/broken/pages/fd2ae121a12e8b0367c63eb0410635dba566858b)
* [The RACS Data Model](/broken/pages/30b853dd63a9c8969b77b1e308dcd9ec9af6e1fa)
* [How Maica Connects to Services Australia](/broken/pages/dc86dbcf05950f265a19d3efeca3a3be97a6d132)
