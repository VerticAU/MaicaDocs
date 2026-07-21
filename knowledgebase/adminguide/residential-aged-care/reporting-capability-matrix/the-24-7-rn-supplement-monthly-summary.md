# The 24/7 RN Supplement Monthly Summary

Services Australia pays a monthly 24/7 registered nurse supplement to eligible residential services. Maica reads that supplement position back from Services Australia and stores it against the **Location**, so a service can see what it has been assessed and paid for the registered nurse supplement each month. This article explains the two records that hold the supplement data, how they are synced, and how the supplement summary differs from the other registered nurse figures in the solution.

It is written for administrators and facility managers responsible for revenue assurance and registered nurse reporting.

{% hint style="info" %}
This article covers the supplement Maica reads back from Services Australia. For the provider's own coverage calculation used for GPMS reporting, see [24/7 RN Coverage Check Configuration](24-7-rn-coverage-check-configuration.md).
{% endhint %}

## How it differs from the other RN figures

There are three separate registered nurse concepts in the residential solution. Keeping them apart avoids confusion.

| Concept                         | Question it answers                                                         | Where it lives                                                       |
| ------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **24/7 RN coverage check**      | Did we have an RN on duty every hour, for our GPMS submission?              | RN Coverage Check record on the Location                             |
| **RN eligibility on the claim** | Did Services Australia assess the service as eligible in the monthly claim? | The RN eligibility flag on the Claim Batch, from the claims response |
| **24/7 RN supplement summary**  | What supplement has Services Australia assessed and paid, month by month?   | RN Supplement Summary and Breakdown records on the Location          |

{% hint style="info" %}
The coverage check is your own calculation; the supplement summary is Services Australia's assessed and paid position. Both surface on the Location record, so the facility manager can compare what was achieved against what was paid.
{% endhint %}

## The two records

The supplement is held in a two-tier structure, both parented to the **Location**.

### RN Supplement Summary

One **Registered Nurse Supplement Summary** record (`Registered_Nurse_Supplement_Summary__c`) exists per entitlement month for a Location. It holds the headline supplement position for that month.

| Field                 | API name               | Description                                                                                                              |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Location**          | `Location__c`          | The service this supplement summary belongs to                                                                           |
| **Entitlement Month** | `Entitlement_Month__c` | The month the supplement entitlement relates to, stored as the first day of that month                                   |
| **Total Amount**      | `Total_Amount__c`      | The total supplement amount for the entitlement month                                                                    |
| **Last Sync**         | `Last_Sync__c`         | When this summary was last refreshed from Services Australia                                                             |
| **External ID**       | `External_ID__c`       | Composite upsert key in the format `{locationId}_{YYYY-MM}`, marked External ID and Unique to prevent duplicates on sync |

### RN Supplement Breakdown

Each summary has one or more **Registered Nurse Supplement Breakdown** records (`Registered_Nurse_Supplement_Breakdown__c`) as master-detail children. Where the summary is indexed by entitlement month, each breakdown carries the detail for a claim month, so the structure captures adjustments made across claim months against a single entitlement month.

| Field                     | API name                   | Description                                                                                                  |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **RN Supplement Summary** | `RN_Supplement_Summary__c` | The parent summary this breakdown belongs to (master-detail)                                                 |
| **Claim Month**           | `Claim_Month__c`           | The claim month this breakdown detail relates to                                                             |
| **Eligibility**           | `Eligibility__c`           | The eligibility status returned by Services Australia for this claim month, such as Eligible or Not Eligible |
| **MMM Classification**    | `MMM_Classification__c`    | The Modified Monash Model classification that applies                                                        |
| **Occupied Bed Days**     | `Occupied_Bed_Days__c`     | The occupied bed days Services Australia recorded for the month                                              |
| **Amount**                | `Amount__c`                | The supplement amount for this claim month                                                                   |

{% hint style="info" %}
The entitlement-month summary with claim-month breakdowns is what lets the record show a supplement adjustment history: a later claim month can adjust an earlier entitlement month, and each adjustment is a breakdown row under the same summary.
{% endhint %}

## How the summary is synced

The supplement summary is retrieved as part of the monthly **Claims Sync** action, not as a standalone step you run separately. When Claims Sync runs, it retrieves the supplement summary for the service alongside the claim and payment data.

* The read is keyed on the **Service NAPS ID** from the Location linked to the Claim Batch.
* It applies only to residential aged care Claim Batches, whose Funding Type is **Permanent** or **Respite**. The sync does not run the supplement read for other funding types.
* The Location must have a Service NAPS ID set, or the step reports that it is missing.

Each returned summary is written using its composite External ID, and its breakdown children are written beneath it, so re-running the sync updates the existing records rather than creating duplicates.

{% hint style="info" %}
For the full Claims Sync sequence and where the supplement read sits within it, see [Claims, Payment and Reconciliation Integration](../integration-architecture-and-event-lifecycle/claims-payment-and-reconciliation-integration.md).
{% endhint %}

## Where to find it

The supplement records surface on the **Location** record:

1. Open the facility's **Location** record.
2. Find the **RN Supplement Summaries** related list.
3. Open a summary to see its entitlement month, total amount, and last sync, and its **RN Supplement Breakdowns** for the claim-month detail.

Both the summary and the breakdown have their own record pages, so you can open a summary and drill into any breakdown from its related list.
