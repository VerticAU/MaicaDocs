# Invoice Line Item Overview

## What is an Invoice Line Item?

An Invoice Line Item is a specific entry on an Invoice that details a particular service provided, including its Quantity, Amount, Support Category, etc.

{% hint style="success" %}
Please note the following Xero recommended limits of Invoice Line Item records associated with an Invoice:

* Per Invoice: Xero recommends keeping invoices to no more than 50 line items. Exceeding this number may lead to issues with invoice loading times and overall system performance.
* Monthly Volume: For optimal performance, Xero suggests a monthly limit of approximately 1,000 sales invoices, each containing around 10 line items. This guideline helps maintain system efficiency and responsiveness.

To learn more about Maicas integration with Xero, click [here](/broken/pages/8cb1cfe1d6f824428e20146b504253bc2107be4d).
{% endhint %}

## Invoice Line Item Key Terms and Components

Whilst working with Invoice Line Item(s), you will come across a number of key terms and related components. The table below describes each of those in further detail:

<table><thead><tr><th width="187">Key Term</th><th width="146">Type</th><th>Description</th></tr></thead><tbody><tr><td>Payment Request</td><td>Related Object</td><td>A Payment Request is a Related Object to an Invoice Line Item that is dynamically created after a Claim has been made for that particular Line Item. It represents an attempt to make a Claim from PRODA. It contains details of the Request, including the Claim Date, Claim Amount, etc.</td></tr><tr><td>Line Total</td><td>Field</td><td>This field represents the total of the <code>GST Amount</code> + <code>Amount</code>.</td></tr><tr><td>Claim Type</td><td>Field</td><td>A Claim Type refers to a specific category or nature of a service or charge associated with an Invoice Line Item.</td></tr><tr><td>Claim Count</td><td>Field</td><td>This field represents the number of Payment Requests submitted to PRODA to claim the funds. For example, if you only got <code>Partially Paid</code> on your first request and you submit another one, the Claim Count would be 2.</td></tr><tr><td>Paid Amount</td><td>Field</td><td>This field represents the total value of the Invoice Line Item paid from PRODA. For example, if you submitted a Claim for a Invoice Line Item with a Line Total of $100 and only got paid $70, the Paid Amount would show $70</td></tr><tr><td>Claim Balance</td><td>Field</td><td>This field represents the difference between the Paid Amount and the Line Total. Hence, in the example above, the Claim Balance would be $30.</td></tr><tr><td>Quantity</td><td>Field</td><td>This field represents the multiplication value of any particular Unit Price within a Line Item. For example, if you charged a Service for $50 and set your Quantity to 2 (to perhaps represent 2 hours), this would set your Line Item amount to $100.</td></tr><tr><td>Quantity Delivered</td><td>Field</td><td>This field represents the ratio-adjusted Quantity delivered for a Service within a Line Item. It ensures that utilisation and financial roll-ups are calculated based on accurate values when either the Unit Price or Quantity is ratioed in your Maica <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/billing-management">Billing Management Settings</a>.<br><br>For example, if a Quantity of 2 is entered but the Unit Price is ratioed by 50%, Maica will calculate a Quantity Delivered of 1.<br><br>If the Line Item is removed from totals (by unticking the <code>Include</code> checkbox, which is ticked by default), it will not be considered in Quantity Delivered totals at the Agreement Item level.</td></tr></tbody></table>

{% hint style="info" %}
The `Line Total` and `Quantity Delivered` fields **only count Invoice Line Items where the `Include` checkbox is ticked**, which it is by default. Unticking `Include` removes that Line Item from these totals. Line Items belonging to a **Cancelled** Invoice are also excluded. This ensures voided or incorrect records do not impact delivery tracking or Agreement Item rollups.
{% endhint %}

## Invoice Line Item Statuses

### Entry Conditions

In order for a `Status` to be set for an Invoice Line Item, first the `Claim Type` must be `Agency Managed`. In scenarios where the `Claim Type` is not `Agency Managed`, no `Status` will be set.

### Statuses

Whilst working with Invoice Line Item(s), you will notice a `Status Bar` at the top of the page, as shown below. The default stage for an `Agency Managed` Invoice Line Item is `Entered`.

Similar to [Invoice(s)](file:///), these `Statuses` outline the stage of the lifecycle any particular Invoice Line Item will be in at any particular time. In **Maica**, the `Status` is adjusted dynamically depending on a range of factors and logic that are described below, and explained in further detail [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/invoice-line-item#status-management).

<table><thead><tr><th width="152">Status</th><th width="190">Description</th><th>Logic</th></tr></thead><tbody><tr><td><code>Entered</code></td><td>The Invoice Line Item has been created and recorded in the system but has not yet been processed for claiming or payment.</td><td><code>Line Total</code> > 0 AND<br><code>Claim Count</code> = 0 AND<br><code>Claim Balance Formula</code> = <code>Line Total</code> AND<br><code>Paid Amount</code> = 0</td></tr><tr><td><code>Claimed</code></td><td>The Invoice Line Item has been submitted for Claiming.</td><td><code>Line Total</code> > 0 AND<br><code>Claim Count</code> > 0 AND<br><code>Paid Amount</code> = 0</td></tr><tr><td><code>Partially Paid</code></td><td>A portion of the amount for the Invoice Line Item has been paid, but there is still an outstanding balance.</td><td><code>Line Total</code> > 0 AND<br><code>Claim Count</code> > 0 AND<br><code>Paid Amount</code> > 0 AND<br><code>Claim Balance Formula</code> > <code>Paid Tolerance Formula</code> AND<br><code>Paid Amount</code> &#x3C; <code>Line Total</code></td></tr></tbody></table>

For `Fully Paid` status, please refer to the following Condition Logic:

{% code title="Condition Logic" %}
```apex
1 AND 2 AND (3 OR 4)
```
{% endcode %}

{% hint style="info" %}
This logic evaluates whether conditions 1 and 2 are true, and then checks if either condition 3 or condition 4 is true. All parts of the logic must be satisfied for the overall condition to be true: both 1 and 2 must be true, and in addition, either 3 or 4 must also be true.
{% endhint %}

<table><thead><tr><th width="152">Status</th><th width="190">Description</th><th>Logic</th></tr></thead><tbody><tr><td><code>Fully Paid</code></td><td>The entire amount for the Invoice Line Item has been paid in full, and no further payment is required.</td><td><ol><li><code>Line Total</code> > 0 AND</li><li><code>Claim Count</code> > 0 AND</li><li><code>Paid Amount</code> >= 0 AND</li><li><code>Claim Balance Formula</code> >= <code>Paid Tolerance Formula</code></li></ol></td></tr></tbody></table>

## Including or Excluding Invoice Line Items from Totals

Sometimes an Invoice Line Item should not count toward totals, for example when it is invalid, voided, or needs to be removed from Agreement delivery calculations. Maica controls this with the **Include** checkbox on the Invoice Line Item.

The **Include** checkbox is **ticked by default**, which means the Line Item counts toward totals. To remove a Line Item from totals, you **untick** the **Include** checkbox.

When **Include** is unticked:

* The Line Item is **not** counted in the **Invoice totals**.
* If linked to an **Agreement Item**, its Line Total and Quantity Delivered are **excluded from Agreement delivery totals**.
* This allows for more accurate reporting when voiding items or adjusting invoices mid-claim.

You will typically untick **Include** in scenarios where:

* A specific line item is no longer valid and should be ignored.
* You want to prevent a line item from affecting the **Agreement Item Total Delivered** value.

{% hint style="info" %}
**How the rollup decides what to count:** a Line Item is included in Agreement Item and Service Agreement totals only when its **Include** checkbox is ticked **and** its related Invoice is not **Cancelled**. Unticking **Include** removes a single line; cancelling the Invoice removes all of its lines. This gives you the flexibility to void a whole invoice or exclude just one line as needed.
{% endhint %}

{% hint style="info" %}
**Note:** Line Items removed from totals are still visible and auditable. Unticking **Include** simply removes them from financial and delivery rollups; it does not delete the record.
{% endhint %}
