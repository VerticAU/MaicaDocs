---
description: "Get\_an overview of the Xero integration in Maica."
---

# Xero Integration Overview

## What does the Xero Integration in Maica support?&#x20;

In Maica, there are two main processes that the Xero Integration supports, these are:&#x20;

1. Invoice Sync Process&#x20;
2. Invoice Payment Process&#x20;

This article further explains and provides an overview of both of those processes.&#x20;

{% hint style="success" %}
Syncing with Xero will only be supported if a Connection and Webhook has already been set up within your Organisation. Before attempting to Sync Invoices, please ensure this is the case. To learn more about configuring your Xero Integration, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/xero-integration). \
\
Syncing with Xero also requires your Support Items to be configured correctly. Please click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/xero-integration/support-item-configuration) to learn how to configure your Support Items in order to facilitate the Xero Integration.&#x20;
{% endhint %}

### Invoice Sync Process Overview

The Invoice Sync Process outlines the stages of Invoicing Syncing within **Maica** and Xero, as well as the outcomes of the process.&#x20;

{% hint style="info" %}
For clarity, any _Italic_ text in the description refers to a record in Xero, and any standard text refers to a record in **Maica**.&#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/Invoice Sync Process_New.png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="207">Stage</th><th>Description </th></tr></thead><tbody><tr><td><ol><li>Sync Executed </li></ol></td><td>The first stage of the Syncing process is the Sync itself. Maica has automation for Syncing invoices based on a Schedule that can be configured within the <code>Maica - Xero Invoice Sync Scheduled Flow</code> to match your organisations preferences. <br><br>A Sync can also be manually executed if required, click here to learn how to manually <a href="../invoices/invoice-actions/sync-with-xero.md">Sync an Invoice</a>.  </td></tr><tr><td><ol start="2"><li>Retrieve Invoice Data</li></ol></td><td>During the Syncing process, Maica will retrieve the relevant Invoice (including Line Item and associated Participant) Data to share with Xero where the Invoice <code>Finance_External_ID__c</code> field is null. This essentially means that any Invoice that has not already been Synced or that had issues with a previous Sync will be retrieved. <br><br>To learn about the Xero recommended limits of Invoice Line Item records associated with an Invoice, click <a href="../invoices/invoice-overview/invoice-line-item-overview.md">here</a>. </td></tr><tr><td><ol start="3"><li>Check if <em>Contact</em> exists in Xero </li></ol></td><td>Once Maica has retrieved the required Invoice Data, it will cross check if the Participant associated with the Invoice has an associated <em>Contact</em> in Xero. <br><br><strong>Please note:</strong>  Xero does not allow the creation of duplicate Contacts. For example, attempting to create two records with the name <em>Adam Smith</em> will result in an <strong>error</strong>.</td></tr><tr><td><ol start="4"><li>Create <em>Contact</em>  </li></ol></td><td>If there is no associated <em>Contact</em> in Xero for a Participant associated to an Invoice being Synced, one will be created.  </td></tr><tr><td><ol start="5"><li>Update <em>Contact</em></li></ol></td><td>If there is an associated <em>Contact</em> in Xero for a Participant associated to an Invoice being Synced, it will be updated with the relevant information.  </td></tr><tr><td><ol start="6"><li>Create <em>Invoice</em></li></ol></td><td>After the Invoices from Maica have been assigned to a <em>Contact</em> in Xero, an <em>Invoice</em> record will be created in Xero. Maica maps relevant information directly to Xero including the <code>Invoice Reference Number</code> and <code>Date</code>.  </td></tr><tr><td><ol start="7"><li>Update Invoice</li></ol></td><td>After an Invoice has been successfully synced, the Invoice Record in <strong>Maica</strong> will be updated accordingly. Two new fields will be automatically populated from Xero. These are the <code>Xero Invoice Number</code> and <code>Xero ID</code>.</td></tr><tr><td><ol start="8"><li>Process Ends</li></ol></td><td>The process is complete. </td></tr></tbody></table>

### Invoice Payment Process Overview

The Invoice Payment Process outlines the stages of Invoicing Payment within Xero and Maica, as well as the outcomes of the process.&#x20;

{% hint style="info" %}
As above, any _Italic_ text in the description refers to a record in Xero, and any standard text refers to a record in **Maica**.&#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/Invoice Payment Process.png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="207">Stage</th><th>Description </th></tr></thead><tbody><tr><td><ol><li>Payment Applied </li></ol></td><td>The first stage of the Payment process is Payment being applied to the Invoice. Payment can be applied at any time, and can be done directly through the Invoice or through a reconciliation. Whether the Payment is Fully or Partially paid is irrelevant, the Payment Process will commence. </td></tr><tr><td><ol start="2"><li>Create Payment Record</li></ol></td><td>Once a Payment has been made, an associated Payment Record will be created within the Invoice Record to reflect the Payment. This record includes a number of fields which are outlined in more detail in the table <a href="xero-integration-overview.md#payment-record-fields">below</a>. </td></tr><tr><td><ol start="3"><li>Update Invoice</li></ol></td><td>After the Payment Record has been created, the associated will automatically update to reflect the Payment. Under Payment Information, the <code>Total Payment Amount</code> and <code>Last Payment Date</code> fields will populate. </td></tr><tr><td><ol start="4"><li>End </li></ol></td><td>The process is complete and the <a href="https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/invoice-line-item#flows">Invoice Status Flow</a> takes over.</td></tr></tbody></table>

#### Payment Record Fields

As mentioned, after a Payment has been applied to an Invoice a Payment Record will be created. It includes a number of important fields, including:&#x20;

<table><thead><tr><th width="241">Field</th><th>Description </th></tr></thead><tbody><tr><td><code>Type</code> </td><td>This field indicates the type of Payment Record, whether it is a transaction processed via Stripe or a Reconciliation following a Payment applied to an invoice in the Finance System (Xero).</td></tr><tr><td><code>Source</code> </td><td>This field indicates how the Payment was created. </td></tr><tr><td><code>Paid</code></td><td>This field indicates if the Payment has been successfully processed. For example, the Invoice has been reconciled in Xero and synchronised with Maica.  </td></tr><tr><td><code>Include</code> </td><td>This field indicates if the Payment Amount should be included in the rollup to the <code>Total Payment Amount</code> on the Invoice record. The default value is checked.</td></tr><tr><td><code>Payment Date</code></td><td>This field indicates the Date &#x26; Time in which Payment was received </td></tr><tr><td><code>Finance External ID</code> </td><td>The unique identifier of the Payment record in an external system. Maica uses this field as part of the Xero integration.</td></tr><tr><td><code>Payment Amount</code></td><td>The amount of the received Payment. This can be the full or a partial amount of the total Invoice.  </td></tr></tbody></table>
