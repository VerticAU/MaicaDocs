---
description: Get an overview of the Stripe integration in Maica.
---

# Stripe Integration Overview

## What does the Stripe Integration in Maica support?&#x20;

In Maica, there are two main processes that the Stripe Integration supports, these are:&#x20;

1. Manual Sync via Process Invoice Quick Action
2. Automated Sync via Salesforce Flow

{% hint style="info" %}
To learn about the Manual Sync Process, click [here](../invoices/invoice-actions/process-an-invoice.md).&#x20;
{% endhint %}

This article further explains and provides an overview of the Automated Sync via Salesforce Flow in **Maica**.&#x20;

### Automated Process Invoice Overview

The below diagram outlines the steps involved in the automated Stripe sync, as well as the outcomes of the process.&#x20;

<figure><img src="../.gitbook/assets/stripe process new.png" alt=""><figcaption></figcaption></figure>



<table><thead><tr><th width="225">Condition </th><th>Description </th></tr></thead><tbody><tr><td><ol><li>Conditions Met </li></ol></td><td><p>In order for the Processing Sync to be triggered, the <code>Invoice</code> must satisfy a specific set of conditions, these being: </p><ul><li><code>maica__Payment_Balance__c</code> > 0</li><li><code>maica__Total_Amount__c</code> > 0</li><li><code>maica__Status__c</code> = <code>Entered</code></li><li><code>maica__Stripe_Invoice_ID__c</code> = NULL</li><li>(<code>maica__Funding_Structure__c</code> = <code>Self Managed</code> OR <code>maica__Is_Copayment_Invoice__c</code> = TRUE)</li><li><code>maica__Authorise_Stripe_Auto_Billing__c</code> = TRUE</li><li><code>Stripe_Customer_ID__c</code> != NULL</li></ul><p>These conditions are further explained <a href="stripe-integration-overview.md#automated-process-invoice-sync-conditions">below</a>. </p></td></tr><tr><td><ol start="2"><li>Sync Executed</li></ol></td><td>Once the above conditions are met, the Sync will be executed. This essentially means the Sync will be active 24/7 and triggered to run at any time the conditions are met. <br><br>A Sync can also be manually executed if required, click here to learn how to manually <a href="../invoices/invoice-actions/process-an-invoice.md">Process an Invoice</a>.<br><br>The Flow responsible for this Automation in Maica is the <code>Maica - Create Stripe Invoice Flow</code>. To learn more about this flow, click here.</td></tr><tr><td><ol start="3"><li>Create Invoice</li></ol></td><td>Once the Sync is executed, an <code>Invoice</code> and associated <code>Payment</code> record are created in Stripe. <br><br><strong>Maica</strong> maps relevant information directly to Stripe including <code>Invoice</code> information such as the <code>Participant</code> and the <code>Date</code>, as well as the detail from the related <code>Invoice Line Item</code> records, such as <code>Product</code>, <code>Quantity</code> and <code>Rate.</code></td></tr><tr><td><ol start="4"><li>Process Invoice</li></ol></td><td>Immediately after the <code>Invoice</code> record is created in Stripe, it will be automatically processed using the default <code>Payment Method</code> associated with <code>Customer</code> (the <code>Partic</code>ipant from the <code>Invoice</code> in <strong>Maica</strong>).</td></tr><tr><td><ol start="5"><li>Create Payment</li></ol></td><td><p>Once the <code>Payment</code> has been successfully processed, the corresponding <code>Payment</code> Record will be created in <strong>Maica</strong>. This record represents the <code>Payment</code> that has been used to process the associated <a href="../getting-started/maica-key-concepts/invoice.md">Invoice</a>. This record can be found in the <code>Payments</code> related list on the <code>Invoice</code> in <strong>Maica</strong>.<br><br>This <code>Payment</code> record will be automatically populated with fields such as <code>Source</code>, <code>Type</code>, <code>Stripe Invoice ID</code>, <code>Stripe Payment ID</code> and <code>Payment Amount</code>. Any error messages and descriptions from Stripe will also show on the <code>Payment</code> Record. </p><p></p><p>You can learn more about the Payment Record fields <a href="stripe-integration-overview.md#payment-record-fields">below</a>. </p></td></tr><tr><td><ol start="6"><li>Update Invoice</li></ol></td><td><p>For traceability, the <code>Invoice</code> is updated with relevant Stripe information, including:</p><ul><li><code>Stripe Dashboard Link</code></li><li><code>Stripe Invoice ID</code></li><li><code>Stripe Invoice Link</code></li></ul><p>These fields will assist you in locating the Payment/Invoice in Stripe.</p><p></p><p>The creation of the <code>Payment</code> record also triggers a number of Rollup Summary fields on the parent <code>Invoice</code>, specifically: </p><ul><li><code>maica__Total_Payment_Amount__c</code></li><li><code>maica__Last_Payment_Date__c</code></li><li>The <code>maica__Payment_Amount__c</code> Formula will also be updated</li></ul><p>The Invoice <code>Status</code> will also be updated.</p></td></tr><tr><td><ol start="7"><li>Process Ends</li></ol></td><td>The process completes. </td></tr></tbody></table>

{% hint style="info" %}
Once the `Invoice` is created in Stripe, the `Invoice Amount` cannot be edited in **Maica** at the `Invoice` level. This is managed by **Maica's** validation; for additional information, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/invoice#restrict-invoice-amount-change).
{% endhint %}

{% hint style="info" %}
Please note, some services may include fractional quantities (e.g., 1.5 hours). **Stripe** only supports whole-number quantities, so these items are shown using an adjusted quantity and rate. The total amount remains accurate and matches the service description.
{% endhint %}

#### Automated Process Invoice Sync Conditions

The following table further outlines the required conditions for the Sync to commence.&#x20;

<table><thead><tr><th width="383">Condition</th><th>Description </th></tr></thead><tbody><tr><td><code>maica__Payment_Balance__c</code> > 0</td><td>The invoice must have an outstanding balance that is greater than zero. This means there's an amount that still needs to be paid.</td></tr><tr><td><code>maica__Total_Amount__c</code> > 0 </td><td>The total amount for the invoice must be greater than zero. This ensures that only invoices with actual charges are processed.</td></tr><tr><td><code>maica__Status__c</code> = <code>Entered</code></td><td>The invoice status must be marked as <code>Entered</code>.</td></tr><tr><td><code>maica__Stripe_Invoice_ID__c</code> = NULL </td><td>This condition checks that the invoice has not already been processed through Stripe. If the invoice has a Stripe ID, it means it has already been synced.</td></tr><tr><td>(<code>maica__Funding_Structure__c</code> = <code>Self Managed</code> OR <code>maica__Is_Copayment_Invoice__c</code> = TRUE)</td><td>The invoice is either for a self-managed participant or it is marked as a co-payment invoice, meaning the participant is responsible for a portion of the payment.</td></tr><tr><td><code>maica__Authorise_Stripe_Auto_Billing__c</code> = TRUE </td><td>The participant or your organisation has authorised automatic billing through Stripe by checking the <code>Authorise Stripe Auto Billing</code> on your Participants Service Agreement. </td></tr><tr><td><code>Stripe_Customer_ID__c</code> != NULL</td><td>The participant must have a valid <code>Stripe Customer ID</code> and hence Payment Method, indicating they are set up for payment processing through Stripe.</td></tr></tbody></table>

#### Payment Record Fields

As mentioned, after a Payment has been applied to an Invoice a Payment Record will be created. It includes a number of important fields, including:&#x20;

<table><thead><tr><th width="241">Field</th><th>Description </th></tr></thead><tbody><tr><td><code>Type</code> </td><td>This field indicates the type of Payment Record, whether it is a transaction processed via Stripe or a Reconciliation following a Payment applied to an invoice in the Finance System (Xero).</td></tr><tr><td><code>Source</code> </td><td>This field indicates how the Payment was created. </td></tr><tr><td><code>Paid</code></td><td>This field indicates if the Payment has been successfully processed. For example, the Invoice has been reconciled in Xero and synchronised with Maica.  </td></tr><tr><td><code>Include</code> </td><td>This field indicates if the Payment Amount should be included in the rollup to the <code>Total Payment Amount</code> on the Invoice record. The default value is checked.</td></tr><tr><td><code>Payment Date</code></td><td>This field indicates the Date &#x26; Time in which Payment was received </td></tr><tr><td><code>Finance External ID</code> </td><td>The unique identifier of the Payment record in an external system. Maica uses this field as part of the Xero integration.</td></tr><tr><td><code>Payment Amount</code></td><td>The amount of the received Payment. This can be the full or a partial amount of the total Invoice.  </td></tr><tr><td><code>Stripe Payment ID</code></td><td>The ID of the corresponding Payment record in Stripe.</td></tr><tr><td><code>Stripe Invoice ID</code></td><td>The ID of the corresponding Invoice record in Stripe.</td></tr><tr><td><code>Error Code</code></td><td>The Error Code returned by Stripe </td></tr><tr><td><code>Error Message</code></td><td>The Error Message returned by Stripe </td></tr></tbody></table>
