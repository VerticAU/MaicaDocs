# RACs Solution Overview

The Residential Aged Care Services (RACS) solution is the set of objects, automation, user interface components, and Services Australia integrations that together support running a residential aged care home in Maica. This article gives administrators a map of how the solution is put together and what it does and does not cover.

If you are new to the solution, the [Introduction to the RACS Solution](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/introduction-to-the-racs-solution) in the User Guide is a gentler starting point. This article assumes familiarity with Salesforce and the Maica platform.

## Architecture and packaging

RACS is delivered as part of the **MaicaClientCare** package and uses the `maica_cc` namespace, the same namespace as the rest of the Client Care data model. New Apex classes built for RACS use the `RAC_` prefix, and the RACS settings components use a `settingRACS` prefix, so RACS artefacts are easy to identify in an org.

The solution is made up of the following building blocks.

| Building block                        | What it provides                                                                                                                                                                                                        |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Data model**                        | A set of new custom objects plus new fields on existing objects. See [The RACS Data Model](the-racs-data-model.md).                                                                                                     |
| **Billing engine and scheduled Apex** | A daily billing engine (`RAC_BillingEngine`), an annual financial year reset (`RAC_FinancialYearReset`), the indexation engine, and the scheduled fee rate check batch. These generate invoices and keep rates current. |
| **Manage RACS Agreement component**   | A custom Lightning Web Component with three tabs (Fees, RAD/RAC, Accommodation) for configuring fees, managing accommodation deposits, and relocating residents.                                                        |
| **Services Australia integration**    | Apex classes that submit care and supplement events, sync resident data inbound, and report accommodation balances through the Business-to-Government (B2G) API suite.                                                  |
| **RACS settings**                     | A RACS Configuration tab and an APCS Export tab mounted inside the existing Maica Settings tab.                                                                                                                         |
| **Reporting and compliance**          | SIRS fields, reports and a dashboard on the Incident object, the 24/7 registered nurse coverage check, the APCS ledger export, and the data behind the Quarterly Financial Report.                                      |

{% hint style="info" %}
The RACS settings tabs are mounted into the existing **Maica Settings** tab through Custom Metadata records, not as standalone tabs or Lightning pages. This follows the established Maica Settings framework pattern.
{% endhint %}

### Access and permissions

Access to RACS features is granted through **permission sets and permission set groups**, never through profiles. This follows the standard Maica convention. The solution ships with two permission set groups, **Manage Care Recipient** and **Manage Billing and Claiming**, which bundle the feature-level permission sets such as Manage Service Agreement, Departure Processing, Claims Management, and Accommodation Balance Reporting. Administrators assign the appropriate group or individual permission sets to users based on their role.

## What is in scope

The solution covers the financial and administrative operation of residential aged care:

* **Permanent and respite care.** Both resident types are supported, with respite handled differently for accommodation costs.
* **Fees and automated billing.** Fee configuration and a daily billing engine that generates invoices.
* **Accommodation deposits.** RAD, RAC, and legacy bond accounts managed as a financial ledger.
* **The resident lifecycle.** Entry, respite, leave, room moves, and departure, including death and refunds.
* **Services Australia integration.** Care and supplement events outbound, resident data sync inbound, and accommodation balance reporting.
* **Reconciliation.** Matching subsidy payments against invoices.
* **Reporting and compliance data.** The data foundations for compulsory reporting, plus SIRS incident management and registered nurse coverage.

## What is out of scope

Some areas are deliberately not part of RACS. Knowing these avoids confusion during implementation.

| Out of scope                               | Why                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Home Care Packages and Support at Home** | Handled by Maica's separate aged care agreement features, not RACS.                                                                        |
| **SIRS submission to government**          | There is no B2G API for SIRS. Maica holds the incident data and the provider keys the notification into the My Aged Care portal manually.  |
| **Some notification automations**          | Recipient, channel, and content of alerts are implementation-specific and cannot be reliably packaged, so they are left to implementation. |
| **Mobile app incident presentation**       | How SIRS fields appear in the mobile app is a separate product decision.                                                                   |
| **Profile-based security**                 | All access is via permission sets, in line with the Maica convention.                                                                      |
