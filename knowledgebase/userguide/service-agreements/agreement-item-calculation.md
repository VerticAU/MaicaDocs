---
description: Learn about how Maica calculates Agreement Item Totals from Invoices
---

# Agreement Item Calculation

## **Overview**

This article explains how Maica uses a combination of `Invoice.Status` and the `Invoice Line Item.Include` field to determine which records contribute to the `Agreement Item → Total Delivered` calculation. This dual-condition logic ensures both flexibility and accuracy in how utilisation is tracked — supporting full invoice cancellation scenarios as well as granular exclusions of individual line items.

## **What Are Included Invoice Line Items?**

Included items are `Invoice Line Item` records where `Include = TRUE`. These are treated as valid and are rolled up to the corresponding `Agreement Item.Total Delivered` value.

This mechanism allows for two types of exclusion use cases:

1. **Full Invoice Cancellation:** If an `Invoice` has its `Status` set to **Cancelled**, _all_ related `Invoice Line Items` are excluded from `Agreement Item` totals. This is useful when an entire invoice is no longer valid and should be ignored in utilisation figures.
2. **Line Item-Level Exclusion:** If a specific `Invoice Line Item` is updated with `Include = FALSE`, that individual item is excluded from the rollup, _even if_ the parent invoice remains valid. This allows organisations to correct or void individual charges without affecting the entire invoice.

## **How Maica Supports This Feature**

* A checkbox field `Include` (default **TRUE**) exists on each `Invoice Line Item`.
* Maica’s rollup logic now checks both:
  * `Invoice_Line_Item__c.Include = TRUE`
  * Related `Invoice.Status` is **not** `Cancelled`

**This ensures:**

* Flexibility to cancel entire invoices
* Precision to exclude only specific line items as needed

This ensures accurate Agreement utilisation tracking and supports a range of real-world billing and reconciliation scenarios.



<br>
