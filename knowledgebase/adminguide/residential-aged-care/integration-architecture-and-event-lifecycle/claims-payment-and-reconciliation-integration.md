# Claims, Payment and Reconciliation Integration

The monthly residential care claim is not built and submitted from Maica. Services Australia calculates the subsidy from the events and classifications lodged during the month, and Maica retrieves that calculated position. A single user action, **Claims Sync**, orchestrates a sequence of read integrations that together assemble the full monthly picture on the Claim Batch and its related records.

This article explains the orchestration, the order the steps run in, what each step reads and writes, and the integration characteristics an administrator needs to support it. It is the technical companion to the user-facing [The Monthly Claim Batch and Claims Sync](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/the-monthly-claim-batch-and-claims-sync) article.

{% hint style="info" %}
For the shared authentication and gateway headers used by every Services Australia call, see [PRODA Authentication and Setup](proda-authentication-and-setup.md). For the catalogue of individual inbound reads and where each lands, see [Inbound Data APIs](inbound-data-apis.md).
{% endhint %}

## Why the integrations are documented together

The service payment summary, claims, payment statement, and registered nurse supplement reads are separate Services Australia interfaces, but a provider never runs them individually. They all execute inside one **Claims Sync** action on the Claim Batch, in a fixed order, as a single orchestrated operation. Documenting them as one workflow reflects how the system actually behaves and how an administrator troubleshoots it.

{% hint style="info" %}
The reconciliation step at the end of the sequence is the existing statement reconciliation service running in-line. It is documented in full in [Statement Reconciliation Service](../statement-reconciliation-service.md); this article covers only how it fits into the sync order.
{% endhint %}

## The Claims Sync orchestration

Claims Sync runs six steps in sequence. Each step is a separate Apex processor that performs its own Services Australia read and writes only the Claim Batch fields (or related records) it owns, so the steps do not overwrite each other. The steps run one after another and **stop on the first failure**, leaving the completed steps' data in place so the run can be repeated after the problem is resolved.

<table><thead><tr><th width="87.28125">Order</th><th>Step (Apex processor)</th><th>Reads from Services Australia</th><th>Writes to Maica</th></tr></thead><tbody><tr><td>1</td><td>Payment summary (<code>AGCSyncPaymentSummaryProc</code>)</td><td>Service payment summary</td><td>Claim Batch payment fields (advance and claim amounts and dates, held-over and special payment amounts)</td></tr><tr><td>2</td><td>Claim details (<code>AGCClaimDetailsSyncProc</code>)</td><td>Residential care claim details</td><td>Claim Batch claim status, operational beds, submission date, RN eligibility; Claim Service Classification records; on approval, per-resident Funding Item and AN-ACC data</td></tr><tr><td>3</td><td>Payment statement summary (<code>AGCPaymentStatementSummaryProc</code>)</td><td>Payment statement service summary</td><td>Claim Batch respite and residential respite incentive (RRI) fields</td></tr><tr><td>4</td><td>Payment statement care recipients (<code>AGCPaymentStatementCareRecipientsProc</code>)</td><td>Payment statement care recipient detail</td><td>Per-resident balance data on Funding</td></tr><tr><td>5</td><td>RN supplement summary (<code>AGCRNSSummarySyncProc</code>)</td><td>24/7 RN supplement summary</td><td>RN Supplement Summary and Breakdown records on the Location</td></tr><tr><td>6</td><td>Reconciliation (<code>RACReconcileProc</code>)</td><td>(no call; uses data already synced)</td><td>Reconciliation adjustments against invoices</td></tr></tbody></table>

{% hint style="warning" %}
The order matters. The payment and claim reads run before reconciliation because reconciliation works against the confirmed position the earlier steps bring in. A failure part-way through leaves earlier steps' data committed; re-running the sync repeats the whole sequence from the start.
{% endhint %}

### Soft warnings versus failures

A step can complete but still surface **warnings** — for example, a care recipient the claim references that cannot be matched to a Contact, or a rejected event on a resident. Warnings do not stop the sequence; the step finishes and the next one runs. A **failure** (a callout error or missing prerequisite) stops the sequence at that step.

## What each step reads and writes

### Payment summary

Retrieves the service payment summary for the claim month and writes the payment position onto the Claim Batch: advance paid date and amount, claim paid date, claim and paid totals, current held-over payment amount, and special payment amount. Stamps the claim last sync time.

### Claim details

Retrieves the residential care claim for the service and claim month. It writes the claim status, the Services Australia operational bed count, the submission date, and registered nurse eligibility to the Claim Batch, and upserts the service-level **Claim Service Classification** records.

When the returned claim status is **Approved**, this step additionally writes the confirmed per-resident data: it matches each returned care recipient to a Contact and their residential aged care Funding, then upserts one **Funding Item** per resident for the claim month (carrying the supported resident status), along with the confirmed AN-ACC classification data.

{% hint style="info" %}
The approved-claim data write happens inside this step when the status comes back as Approved. There is no separate "write approved data" action to run.
{% endhint %}

### Payment statement summary

Retrieves the payment statement service summary for the claim month and writes the respite allocation and usage figures and the residential respite incentive (RRI) figures to the Claim Batch. Where a month has no respite data, these fields are cleared so a prior month's values do not linger. Stamps the payment statement last sync time.

{% hint style="warning" %}
The resident-level respite and social leave balance figures are sourced from the **payment statement** response, not the claim response. They are written by the payment statement steps, so they only populate once those steps have run.
{% endhint %}

### Payment statement care recipients

Retrieves the payment statement care recipient detail for the claim month and writes the per-resident balance data onto each resident's Funding record, matched by the Services Australia care recipient identifier.

### RN supplement summary

Retrieves the 24/7 registered nurse supplement summary for the service and writes it to the **Location** as RN Supplement Summary records with their monthly Breakdown children. This step is covered in full in its own article.

{% hint style="info" %}
The RN supplement summary is stored against the Location and is indexed by entitlement month, which is why it lives outside the resident-level Claim Batch data.&#x20;
{% endhint %}

### Reconciliation

Runs the statement reconciliation service against the data the earlier steps synced, preparing adjustment lines where the confirmed position differs from the invoices already raised. See [Statement Reconciliation Service](../statement-reconciliation-service.md).

## Integration characteristics

### Identity and scope

Every step is scoped to one service for one claim month. The service is resolved from the **Location** linked to the Claim Batch (its Service ID, and for the RN supplement, its Service NAPS ID). The claim month is derived from the Claim Batch **Claim Period Start Date**, and the provider is taken from the Claim Batch **Services Australia Provider ID**, which is threaded through every step so a multi-provider organisation claims under the correct provider.

### Month parameter formats

The reads do not all express the claim month the same way. This is deliberate and matches each Services Australia interface.

| Interface                                       | Month parameter format                       | Example      |
| ----------------------------------------------- | -------------------------------------------- | ------------ |
| Service payment summary                         | Truncated year-month, as a from and to range | `2026-06`    |
| Residential claim details                       | Full date                                    | `2026-06-01` |
| Payment statement (summary and care recipients) | Full date                                    | `2026-06-01` |

### API versions

The integration calls these Services Australia interfaces at the following versions:

| Interface                           | Version | Base path                                                  |
| ----------------------------------- | ------- | ---------------------------------------------------------- |
| Service payment summary             | v1      | `residential-care/services/{serviceId}/payment-summary/v1` |
| Residential care claims             | v3      | `residential-care/claims`                                  |
| Residential care payment statements | v2      | `residential-care/payment-statements`                      |

{% hint style="warning" %}
These are the major versions expressed in the integration layer. Confirm the exact deployed sub-version with Services Australia's current published schema before relying on any field that changed between minor revisions.
{% endhint %}

### Failure handling and access tokens

Each step wraps its work so that a failure is surfaced as a processing error and the sync stops cleanly rather than leaving a half-written state, and each step saves the PRODA access token on completion so the connection is reused efficiently across the sequence. Because steps commit their own owned fields, the data from steps that succeeded before a failure is retained.

## The finalise primitive

Services Australia's claims interface includes a **finalise** operation: it formally closes the claim month and triggers the final payment calculation, and it is sent with the stored ETag as an `if-match` header for concurrency control.

{% hint style="danger" %}
The finalise operation exists as an integration primitive but is **not wired to a user action**. There is no Finalise button in the Claims Sync modal and no automated caller. The Claim Batch reaches its approved and completed states by polling the calculated position through Claims Sync, not by a Maica-initiated finalise.&#x20;
{% endhint %}
