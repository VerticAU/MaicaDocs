# Claims, Payment and Reconciliation Integration

The monthly residential care claim is not built and submitted from Maica. Services Australia calculates the subsidy from the events and classifications lodged during the month, and Maica retrieves that calculated position. A single user action, **Claims Sync** (the **Sync Claim Batch** action on the Claim Batch), orchestrates a sequence of read integrations that together assemble the full monthly picture on the Claim Batch and its related records. Once the claim month is ready, the **Finalise Claim** action closes it.

This article explains the orchestration, the order the steps run in, what each step reads and writes, how the claim month is finalised, and the integration characteristics an administrator needs to support it. It is the technical companion to the user-facing [Monthly Claim Batch and Claims Sync](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/monthly-claim-batch-and-claims-sync) article.

{% hint style="info" %}
For the shared authentication and gateway headers used by every Services Australia call, see [PRODA Authentication and Setup](proda-authentication-and-setup.md). For the catalogue of individual inbound reads and where each lands, see [Inbound Data APIs](/broken/pages/9fa8a492d0fc7d5f06ef6189a7de35f369419453).
{% endhint %}

## Why the integrations are documented together

The service payment summary, claims, payment statement, and registered nurse supplement reads are separate Services Australia interfaces, but a provider never runs them individually. They all execute inside one **Claims Sync** action on the Claim Batch, in a fixed order, as a single orchestrated operation. Documenting them as one workflow reflects how the system actually behaves and how an administrator troubleshoots it.

{% hint style="info" %}
The reconciliation step at the end of the sequence is the existing statement reconciliation service running in-line. It is documented in full in [Statement Reconciliation Service](../statement-reconciliation-service.md); this article covers only how it fits into the sync order.
{% endhint %}

## The Claims Sync orchestration

Claims Sync runs six steps in sequence. Each step is a separate Apex processor that performs its own Services Australia read and writes only the Claim Batch fields (or related records) it owns, so the steps do not overwrite each other. **Claim details** runs first and is the only step whose failure stops the sync. Every other step reports a warning against itself and the sync continues, leaving the completed steps' data in place so the run can be repeated after the problem is resolved.

<table><thead><tr><th width="87.28125">Order</th><th>Step (Apex processor)</th><th>Reads from Services Australia</th><th>Writes to Maica</th></tr></thead><tbody><tr><td>1</td><td>Claim details (<code>AGCClaimDetailsSyncProc</code>)</td><td>Residential care claim details</td><td>Claim Batch claim status, operational beds, submission date, paid date, RN eligibility; Claim Service Classification records; per-resident Funding Item records</td></tr><tr><td>2</td><td>Payment summary (<code>AGCSyncPaymentSummaryProc</code>)</td><td>Service payment summary</td><td>Claim Batch payment fields (advance and claim amounts and dates, held-over and special payment amounts)</td></tr><tr><td>3</td><td>Payment statement summary (<code>AGCPaymentStatementSummaryProc</code>)</td><td>Payment statement service summary</td><td>Claim Batch respite and residential respite incentive (RRI) fields</td></tr><tr><td>4</td><td>Payment statement care recipients (<code>AGCPaymentStatementCareRecipientsProc</code>)</td><td>Payment statement care recipient detail</td><td>Per-resident balance data on Funding</td></tr><tr><td>5</td><td>RN supplement summary (<code>AGCRNSSummarySyncProc</code>)</td><td>24/7 RN supplement summary</td><td>RN Supplement Summary and Breakdown records on the Location</td></tr><tr><td>6</td><td>Reconciliation (<code>RACReconcileProc</code>)</td><td>(no call; uses data already synced)</td><td>Reconciliation adjustments against invoices</td></tr></tbody></table>

{% hint style="warning" %}
The order matters. Claim details runs first because it establishes the claim status and the concurrency token the later steps depend on. Reconciliation runs last and only when the payment statement care recipients step succeeded, because it works against the entitlement records that step writes. A failure part-way through leaves earlier steps' data committed, and the sync can be run again.
{% endhint %}

### Steps that depend on the claim status

The payment statement summary and the payment statement care recipients steps only have data to read once Services Australia has approved the claim. They run when the **Claim Status** is **Approved** or **Completed**. For an earlier status, the step does not run and the sync shows the reason.

### Soft warnings versus failures

A step can complete but still surface **warnings** - for example, a care recipient the claim references that cannot be matched to a Contact, or a rejected event on a resident. Warnings do not stop the sequence; the step finishes and the next one runs. A **failure** (a callout error or missing prerequisite) in the claim details step stops the sync. A failure in any other step is reported as a warning on that step and the sync continues. Steps that did not run show the reason, and a single summary message lists any steps that failed.

## What each step reads and writes

### Claim details

Retrieves the residential care claim for the service and claim month. It writes the claim status, the Services Australia operational bed count, the submission date, the paid date and registered nurse eligibility to the Claim Batch, and upserts the service-level **Claim Service Classification** records.

This step also matches each returned care recipient to a Contact and their residential aged care Funding, then upserts one **Funding Item** per resident for the claim month (carrying the supported resident status). This happens on every run, whatever the claim status, so the Funding Items exist while the claim is still **Submitted**. Accommodation balance submission needs those Funding Items, and balances must be submitted before the claim month can be finalised.

{% hint style="info" %}
There is no separate "write confirmed data" action to run. The per-resident write happens inside this step.
{% endhint %}

### Payment summary

Retrieves the service payment summary for the claim month and writes the payment position onto the Claim Batch: advance paid date and amount, claim paid date, claim and paid totals, current held-over payment amount, and special payment amount. It holds financial reference data only.

### Payment statement summary

Retrieves the payment statement service summary for the claim month and writes the respite allocation and usage figures and the residential respite incentive (RRI) figures to the Claim Batch. Where a month has no respite data, these fields are cleared so a prior month's values do not linger. Stamps the payment statement last sync time.

{% hint style="warning" %}
The resident-level respite and social leave balance figures are sourced from the **payment statement** response, not the claim response. They are written by the payment statement steps, so they only populate once those steps have run.
{% endhint %}

### Payment statement care recipients

Retrieves the payment statement care recipient detail for the claim month and writes the per-resident balance data onto each resident's Funding record, matched by the Services Australia care recipient identifier.

### RN supplement summary

Retrieves the 24/7 registered nurse supplement summary for the service and writes it to the **Location** as RN Supplement Summary records with their monthly Breakdown children. This step is independent of every other step, and is covered in full in its own article.

{% hint style="info" %}
The RN supplement summary is stored against the Location and is indexed by entitlement month, which is why it lives outside the resident-level Claim Batch data.
{% endhint %}

### Reconciliation

Runs the statement reconciliation service against the data the earlier steps synced, preparing adjustment lines where the confirmed position differs from the invoices already raised. It makes no Services Australia call. See [Statement Reconciliation Service](../statement-reconciliation-service.md).

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

Each step wraps its work so that a failure is surfaced as a processing error rather than leaving a half-written state, and each step saves the PRODA access token on completion so the connection is reused efficiently across the sequence. Because steps commit their own owned fields, the data from steps that succeeded before a failure is retained.

## Finalising the claim month

Services Australia's claims interface includes a **finalise** operation: it formally closes the claim month and triggers the final payment calculation. Maica exposes it as the **Finalise Claim** quick action on the Claim Batch, for **Permanent** and **Respite** claims. Users need the `Can_Manage_RACS_Claims` custom permission, which the **Maica - RACS - Claims Management** permission set grants.

{% hint style="danger" %}
Finalising cannot be undone from Maica. Once Services Australia has accepted the finalise, the claim month is closed.
{% endhint %}

### When a claim month is ready to finalise

A Claim Batch is ready to finalise only when all of the following are true:

* The **Funding Type** is **Permanent** or **Respite**
* The **Location** has a **Service ID**, and the Claim Batch has a **Claim Period Start Date**
* The **Claim Status** is **Submitted**. Services Australia reports a claim month that has not been finalised as open, which Maica shows as **Submitted**
* The **Balance Submission Status** is **Complete**, meaning Accommodation Balances have been submitted for the month
* The claim has been synced, so **Claim Last Sync** is populated

Where a condition is not met, the action explains what to do first and shows no Finalise button. A **Cancelled** claim cannot be finalised.

### How the finalise runs

The finalise action does not trust the screen. When you confirm, Maica:

1. Reads the current claim details from Services Australia
2. If the month is no longer open, updates the Claim Batch from Services Australia and reports that the month is already finalised. Any **Claim Status** past **Submitted**, other than **Cancelled**, is treated as finalised
3. Otherwise, repeats the readiness checks on the server before sending anything
4. Requires a current ETag from the claim read, and sends the finalise with that ETag as the `if-match` header for concurrency control. If the claim has changed since you opened the action, Services Australia refuses it and Maica asks you to refresh and try again
5. Reads the claim again and updates the Claim Batch with the result

{% hint style="info" %}
If Services Australia accepts the finalise but the refresh of the Claim Batch afterwards fails, Maica still reports the finalise as successful, and shows a warning asking you to run **Sync Claim Batch** to update the status. A refresh failure is never reported as a failed finalise.
{% endhint %}

{% hint style="warning" %}
Balance submission is stamped on the Claim Batch when the submission action finishes. Where the **Balance Submission Status** cannot be stamped, an error message now says so, because **Finalise Claim** depends on it. See [Accommodation Balance Reporting](accommodation-balance-reporting.md).
{% endhint %}

To learn how users run the action, see Finalise Claim in the User Guide.
