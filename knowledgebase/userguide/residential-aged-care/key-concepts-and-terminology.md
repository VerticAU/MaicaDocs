# Key Concepts and Terminology

Residential aged care comes with a large vocabulary of fees, deposits, and government acronyms. This article is a reference you can return to whenever a term is unfamiliar. It also explains, in plain language, how billing works from end to end so the rest of the solution makes sense in context.

## Core terms and acronyms

The terms below are grouped by theme. You do not need to memorise them, but a working familiarity will make the fee, accommodation, and reporting articles much easier to follow.

### Records and people

| Term                  | Meaning                                                                                                                                                                |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Resident**          | A person receiving permanent or respite care in the home. In the underlying Maica data, a resident is represented by a Participant together with their Funding record. |
| **Funding**           | The record holding the resident's overall care and funding position, including their fee arrangement and the data synced from Services Australia.                      |
| **Service Agreement** | The operational agreement for a resident's stay. It carries the fee items, the room link, and the deposit account link.                                                |
| **Agreement Item**    | A single configured fee on the Service Agreement (for example, the Basic Daily Fee). The billing engine reads these to generate invoices.                              |
| **Lump Sum Account**  | The ledger that tracks a resident's accommodation deposit and every movement against it.                                                                               |

### Fee types

| Term                       | Meaning                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BDF**                    | Basic Daily Fee. A daily fee toward living costs that every resident pays.                                                                                                              |
| **Means tested fee**       | A fee a resident pays based on an income and assets assessment by Services Australia. The exact fee depends on the fee arrangement.                                                     |
| **NCCC**                   | Non-Clinical Care Contribution. A means tested care fee under the 1 November 2025 arrangements.                                                                                         |
| **Hotelling Contribution** | A means tested contribution toward everyday living costs under the 1 November 2025 arrangements.                                                                                        |
| **MTCF**                   | Means Tested Care Fee. The means tested care fee under the 1 July 2014 arrangements.                                                                                                    |
| **ITF**                    | Income Tested Fee. The means tested fee under the Pre-1 July 2014 arrangements.                                                                                                         |
| **HELF**                   | Higher Everyday Living Fee. An optional fee for a higher standard of everyday services, agreed after entry. Replaces the former extra and additional service fees from 1 November 2025. |

### Accommodation and deposits

| Term            | Meaning                                                                                                              |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| **RAD**         | Refundable Accommodation Deposit. A lump sum a resident may pay for their room, refundable on permanent departure.   |
| **RAC**         | Refundable Accommodation Contribution. The equivalent of a RAD for a resident who is partly government-supported.    |
| **DAP**         | Daily Accommodation Payment. A non-refundable daily payment for accommodation, paid instead of, or alongside, a RAD. |
| **DAC**         | Daily Accommodation Contribution. The equivalent of a DAP for a partly supported resident.                           |
| **Bond**        | A legacy accommodation deposit under the Pre-1 July 2014 arrangements.                                               |
| **Retention**   | An amount deducted from a RAD or RAC over time, where it applies under the 1 November 2025 arrangements.             |
| **Combination** | Paying for accommodation as part lump sum and part daily payment.                                                    |

### Government, funding, and reporting

| Term                   | Meaning                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Services Australia** | The government agency Maica exchanges resident events, claims, and balances with.                                         |
| **Fee advice letter**  | The letter Services Australia issues on entry, setting out which fees a resident pays and the amounts.                    |
| **Means assessment**   | The income and assets assessment that determines a resident's means tested fees and accommodation treatment.              |
| **AN-ACC**             | Australian National Aged Care Classification. The funding model that matches subsidy to a resident's assessed care needs. |
| **MPIR**               | Maximum Permissible Interest Rate. Used to convert between a lump sum and a daily accommodation payment.                  |
| **BIR**                | Base Interest Rate. Used when calculating interest on a late deposit refund.                                              |
| **GPMS, ACFR, SIRS**   | The government portals and systems providers report into. SIRS is the Serious Incident Response Scheme.                   |

{% hint style="info" %}
Some of these terms map to specific picklist values and fields in Maica. Where that detail matters for administrators, it is covered in the Administration Guide rather than here.
{% endhint %}

## How residential aged care billing works at a glance

The billing process follows the same shape for every resident, regardless of their fee arrangement.

1. **Services Australia advises the fees.** When a resident enters care, Services Australia sends a fee advice letter to the provider and the resident, stating which fees apply and the amounts.
2. **You configure the fee items.** Using the **Manage RACS Agreement** component, you add an Agreement Item for each fee the resident pays, with its rate and billing method.
3. **The billing engine generates invoices.** A scheduled process runs each day, reads the active fee items, and creates the invoice line items for the period due. Most billing therefore happens without manual intervention once the fees are set up.
4. **Deposits are handled separately.** Accommodation deposits are not invoiced. They are recorded on the resident's Lump Sum Account as a running ledger of payments, deductions, and refunds.
5. **Subsidies are reconciled.** Services Australia pays subsidies and supplements to the provider. The payment statement is reconciled against the invoices you have raised so any differences can be reviewed.

{% hint style="warning" %}
Deposits and invoicing are deliberately kept apart. A RAD, RAC, or bond is a balance the provider holds on the resident's behalf, so it is tracked as a ledger rather than charged on an invoice. Daily accommodation payments (DAP and DAC), by contrast, are fees and are billed like any other fee item.
{% endhint %}
