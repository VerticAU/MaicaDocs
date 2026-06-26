# Reporting Capability Matrix

Registered residential aged care providers must report across several government systems under the Aged Care Act 2024. Maica supports these obligations to different degrees: some through a direct integration with Services Australia, some by providing a reportable data extract that reduces manual effort, and some not at all where the required data is not held in Maica.

This article sets out, for each obligation, which system it is submitted through and what Maica provides. It is the starting point for the rest of this section, which documents each supported capability in detail. It is written for administrators.

## The reporting systems

Provider reporting operates across five government systems. Maica's role varies for each.

| System                     | What it covers                                                                        | Maica's role                                                        |
| -------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Services Australia B2G** | Monthly subsidy claims and RAD/RAC balance reporting                                  | Direct API integration                                              |
| **GPMS**                   | Quarterly Financial Report, quality indicators, 24/7 RN coverage, provider operations | Data extract or calculation for some components; no integration     |
| **ACFR Portal**            | Annual Prudential Compliance Statement                                                | Custom data export for the auditor                                  |
| **ACQSC SIRS Portal**      | Serious incident reporting                                                            | Incident management and notification preparation; manual submission |
| **Local / offline**        | Offline beds and similar facility data                                                | Out of scope                                                        |

## What Maica provides for each obligation

The table below summarises each obligation and whether Maica provides a direct integration, a reportable output, or no capability.

| Obligation                                     | System                 | Maica capability                                                    |
| ---------------------------------------------- | ---------------------- | ------------------------------------------------------------------- |
| Monthly subsidy claims                         | Services Australia B2G | Full integration: monthly claim finalisation through the Claims API |
| RAD/RAC balance reporting                      | Services Australia B2G | Integration: monthly accommodation balance submission               |
| Quarterly Financial Report - occupancy         | GPMS                   | Reportable output: a standard report to support manual entry        |
| Quarterly Financial Report - leave utilisation | GPMS                   | Reportable output: a standard report to support manual entry        |
| 24/7 registered nurse coverage                 | GPMS                   | Calculation: a monthly coverage result to support manual entry      |
| Annual Prudential Compliance Statement         | ACFR Portal            | Reportable output: a resident-level RAD/RAC ledger export           |
| Serious incident reporting (SIRS)              | ACQSC SIRS Portal      | Incident management and notification preparation                    |
| Quality Indicator Program                      | GPMS                   | Out of scope: clinical data not held in Maica                       |
| Provider Operations Collection                 | GPMS                   | Out of scope: governance data not held in Maica                     |
| Offline beds                                   | Local                  | Out of scope: facility management data                              |

{% hint style="info" %}
Where Maica provides a reportable output rather than an integration, the figures still have to be entered into the relevant portal by the provider. The benefit is that the data is aggregated in one place, removing the need to assemble it from separate systems.
{% endhint %}

## Where the detail lives

Each supported capability is documented in its own article in this section:

* The two Services Australia integrations are covered in [Inbound data APIs](../integration-architecture-and-event-lifecycle/inbound-data-apis.md) and [Accommodation balance reporting](../integration-architecture-and-event-lifecycle/accommodation-balance-reporting.md).
* The two Quarterly Financial Report outputs are covered in [QFR report configuration](qfr-report-configuration.md).
* The coverage calculation is covered in [24/7 RN coverage check configuration](24-7-rn-coverage-check-configuration.md).
* The prudential compliance export is covered in [APCS export tool configuration](apcs-export-tool-configuration.md).
* Serious incident reporting is covered in [SIRS incident configuration](sirs-incident-configuration.md).

{% hint style="warning" %}
The accommodation balance data model is in place, but the automated monthly submission to Services Australia could not be confirmed in the current build. See [Accommodation balance reporting](../integration-architecture-and-event-lifecycle/accommodation-balance-reporting.md) for the detail and the confirmation that is needed.
{% endhint %}
