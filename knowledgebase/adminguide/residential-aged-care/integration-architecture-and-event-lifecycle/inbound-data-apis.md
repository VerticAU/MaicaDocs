# Inbound Data APIs

Alongside the event APIs that send data to Services Australia, the residential aged care integration includes a set of _inbound_ APIs that read data back from Services Australia into Maica. These reads keep a resident's funding picture, balances and confirmed subsidy data current, and they feed the monthly claim and reporting processes.

This article explains what each inbound read provides, where the data lands in Maica, and when it runs. It is written for administrators who need to understand the data flow behind the resident record and the monthly claim.

{% hint style="info" %}
For the authentication and gateway headers shared by every Services Australia call, see [PRODA authentication and setup](proda-authentication-and-setup.md). For the overall data flow and event status model, see [Integration architecture and event lifecycle](./).
{% endhint %}

## How inbound reads work

Inbound APIs are read-only. Maica sends a `GET` request to Services Australia, receives the current data, and writes it onto the relevant Maica records. Nothing is changed at Services Australia by an inbound read.

Three characteristics are common to all inbound reads:

* **They are keyed to a known identity.** Most reads are scoped to a single resident (by their Services Australia care recipient identifier) or to a single service. The resident's identity is established at entry, so inbound reads generally depend on an accepted entry event already existing.
* **They are mapped onto existing Maica records.** Inbound data updates the resident's **Funding** record, **Funding Item** records, the **Claim Batch**, and related classification records, rather than creating standalone copies.
* **They record when they last ran.** The reads that run on a schedule or on demand stamp a last-synchronised date and time so you can see how current the data is.

{% hint style="info" %}
The Care Recipient Details read is the backbone of the resident-level inbound data and has its own dedicated workflow. See [Care recipient details sync](care-recipient-details-sync.md) for how the manual, scheduled and bulk refreshes work.
{% endhint %}

## Resident-level reads

These reads return data about an individual resident and are scoped by the resident's Services Australia care recipient identifier.

### Care Recipient Fee Summary

The Fee Summary read returns the government-published fees and contributions that apply to a resident for a given fee type. It is the reference point for the means-tested amounts that Services Australia has determined for that resident.

{% hint style="warning" %}
By design, the means-tested amounts used in resident billing are entered into Maica manually from the resident's fee advice letter (the SA457), not applied automatically from this read. The Fee Summary read provides the government reference figures; the rates that drive billing are set on the resident's fee arrangement. See [Configuring resident fees](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/the-manage-racs-agreement-component/configuring-resident-fees-tab) in the User Guide.
{% endhint %}

### Medicare Details

The Medicare Details read returns a resident's Medicare information confirmed by Services Australia.

| Field           | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| Medicare number | The resident's Medicare card number as held by Services Australia |
| Date of birth   | The resident's date of birth, used to confirm identity matches    |
| Gender          | The resident's recorded gender                                    |
| Expiry date     | The expiry date of the resident's Medicare card                   |

The returned values are written onto the resident's **Funding** record. This read is read-only and is used to confirm and keep the resident's identity details aligned with the Services Australia record.

### Leave and respite balances

Two related reads return the resident's remaining entitlement days:

* **Leave balances** return the remaining social leave and transition (hospital) leave days for the resident.
* **Respite balances** return the remaining residential respite days for the resident.

These reads are typically run before recording a leave or respite period, so that the available balance can be checked before an event is submitted.

{% hint style="info" %}
For how leave and respite are recorded and how the balances are used day to day, see [Managing temporary leave](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/managing-temporary-leave) and [Managing residential respite care](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/managing-residential-respite-care) in the User Guide.
{% endhint %}

## Claim and payment reads

These reads return service-level financial data and underpin the monthly claim and the reconciliation and reporting processes.

### Claims

The Claims read is the central financial reconciliation interface. Services Australia calculates the monthly residential care subsidy automatically from the events and classifications submitted during the month; the provider does not build a claim, they finalise it.

The Claims interface has two operational roles:

* **Reading the claim.** Maica retrieves the full claim for a service and claim month, including the service classifications, the per-resident funding detail, and the registered nurse eligibility data. This is how the confirmed subsidy position is brought into Maica.
* **Finalising the claim.** Finalising formally closes the claim month and triggers Services Australia's final payment calculation. This is an irreversible action taken once billing has run and accommodation balances have been submitted.

When a claim reaches an approved state, the confirmed data is written across several records:

| Record                           | What the claim populates                                                                                                   |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Claim Batch**                  | Confirmed claim status, the Services Australia operational bed count, registered nurse eligibility, and the last sync time |
| **Funding Item**                 | One per resident per claim month, including the supported resident status                                                  |
| **Claim Service Classification** | The service-level classifications confirmed for the month                                                                  |
| **AN-ACC Classification**        | The resident-level AN-ACC classifications confirmed for payment                                                            |

{% hint style="info" %}
The Claims read and finalisation run as part of the monthly Claim Batch workflow. For the resident-facing view of claiming, see [How resident billing works](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/how-resident-billing-works). Accommodation balances must be submitted before a claim can be finalised; see [Accommodation balance reporting](accommodation-balance-reporting.md).
{% endhint %}

{% hint style="warning" %}
Registered nurse eligibility is returned inside the Claims response and written to the Claim Batch. This is distinct from the separate 24/7 registered nurse coverage check that providers run for their own GPMS reporting; see [24/7 RN coverage check configuration](../reporting-capability-matrix/24-7-rn-coverage-check-configuration.md).
{% endhint %}

### Payment statements

Two reads provide the read-only financial settlement view once Services Australia has paid:

* The **service payment summary** lists the payments made to a service, with their payment identifiers and totals.
* The **payment statement** returns the detail behind an individual payment.

These reads are used to reconcile what Services Australia actually paid against the invoices and claim data held in Maica. The payment statement response also carries resident-level balance figures (remaining respite and social leave) that are sourced from this read rather than from the claim.

{% hint style="info" %}
For how the payment settlement data is matched back to invoices, see [Reconciling payments](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/reconciling-payments) in the User Guide and [Statement reconciliation service](../statement-reconciliation-service.md).
{% endhint %}

## Service-level summary reads

The integration design also describes three service-level summary reads: a **service summary** (service identifiers, AN-ACC classifications, bed capacity, accreditation, respite allocation, and care minute and 24/7 RN eligibility), a **service occupancy summary** (daily occupancy confirmed by Services Australia), and a **24/7 RN supplement summary** (monthly registered nurse supplement detail). These feed the Quarterly Financial Report and registered nurse reporting.

{% hint style="danger" %}
These three service-level summary reads are defined in the integration design, but a dedicated inbound interface for them could not be confirmed in the current `release-production` code. In the deployed build, registered nurse eligibility is delivered through the Claims response rather than through a standalone supplement summary read. Confirm the service summary, occupancy and standalone RN supplement summary read paths with the engineering team before publishing this section.
{% endhint %}

## Where the data is used

Inbound data supports the resident record and the downstream processes:

* **The resident record** reflects current Medicare details, leave and respite balances, and confirmed funding.
* **The monthly claim** is reconciled against the confirmed subsidy and the actual payments.
* **Reporting** draws on the confirmed claim and service data for the Quarterly Financial Report and registered nurse reporting.
