---
description: >-
  Learn how to Reclaim via the NDIS when your Funding Type is Agency Managed in
  Maica
---

# Reclaim an Invoice

## How do I Reclaim an Invoice via the NDIS on Maica?

Maica has `Automation` for NDIS Claiming. This article talks about scenarios in which manual claiming may be required or chosen for a specific [Invoice](../../getting-started/maica-key-concepts/invoice.md), this process is called [Reclaiming](reclaim-an-invoice.md#reclaiming).&#x20;

{% hint style="info" %}
To learn more about Maica's Claiming Automation, click [here](claim-an-invoice.md).&#x20;
{% endhint %}

{% hint style="info" %}
Claiming **only** applies when the `Funding Type` is `Agency Managed`.&#x20;
{% endhint %}

## Reclaiming&#x20;

Unfortunately, not all claiming attempts are successful. There are scenarios within Maica's Claiming Automation in which a `Payment Request` may be rejected by the NDIS, for example, if the Service Date was to be outside of the Active Service Booking it will result in the NDIS rejecting your claim. Additionally, you also may receive a `Failed Payment Request`, indicating that the claim was not properly submitted to the NDIS for processing. In these scenarios, the `Payment Request` status will be updated to either `Rejected` or `Failed` and you may need to **Reclaim**, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/rejected - green.png" alt=""><figcaption><p>Example of a Rejected Payment Request</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/failed - green.png" alt=""><figcaption><p>Example of a Rejected Payment Request</p></figcaption></figure>

{% hint style="info" %}
**Maica** will provide you with a detailed description as to why your Claim may have either `Failed` or been `Rejected`, it is important to address these reasons before Reclaiming.&#x20;
{% endhint %}

## How do I submit a Reclaim?&#x20;

In order to manually claim or reclaim an [Invoice](../../getting-started/maica-key-concepts/invoice.md) in **Maica**, simply navigate to the [Invoice](../../getting-started/maica-key-concepts/invoice.md) record from the Maica menu bar. Once you are in the Invoice record, click the `Claim` button in the top right corner of your interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/claim button.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
You can also `Reclaim` numerous Invoices at once if necessary. To do so, pick them in the Invoice list view from the Invoices tab in the **Maica** menu, and then click the `Claim Management` icon in the upper right corner of the interface. Then, follow the same steps outlined below.
{% endhint %}

Once the `Claim` button has been clicked, **Maica** will present a Claim Management screen. This screen will display all the key Invoice information, as well as all [Applicable Invoice Line Items](reclaim-an-invoice.md#applicable-invoice-line-item-rules). As shown below.

{% hint style="info" %}
Applicable Invoice Line Items are defined by a set of rules within Maica. These are described in more detail [below](reclaim-an-invoice.md#applicable-invoice-line-item-rules).&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/claim manage.png" alt=""><figcaption></figcaption></figure>

| Claim Management Field                                           | Description                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ol><li>General Fields </li></ol>                                | This includes basic information on the [Invoice](../invoice-overview/#what-is-an-invoice) including the `ID`, `Date`, `Participant`, `etc`. It also includes basic information for each [Invoice Line Item](../invoice-overview/#invoice-key-terms) including `Support Category`, `Support Item`, `etc`.  |
| <ol start="2"><li><code>Line Total</code> </li></ol>             | This is the total sum for the Support Items delivered for each [Invoice Line Item](../invoice-overview/#invoice-key-terms).                                                                                                                                                                               |
| <ol start="3"><li><code>Claimed Amount</code></li></ol>          | This represents the total amount of money claimed for each [Invoice Line Item](../invoice-overview/#invoice-key-terms). If you received a partial payment for a previous claim, this could represent a portion of the `Line Total`.                                                                       |
| <ol start="4"><li><code>Available Claim Amount</code> </li></ol> | This represents the maximum value remaining that can be claimed, and is the difference between the `Line Total` and `Claimed Amount`.                                                                                                                                                                     |
| <ol start="5"><li><code>Claim Amount</code> </li></ol>           | This is a input field that is used to specify the amount you would like to claim during any particular claim attempt. This amount automatically populates to the `Available Claim Amount` but is manually edited if desired.                                                                              |

Next, confirm all your details are correct by checking the box at the bottom, and submit your Claim.&#x20;

## What happens after I submit my Claim?

After you submit your Claim, the next steps of the process are dependant on your Claim Method settings set by your Organisations Administrator. Your Claim Method will be set as one of the following:&#x20;

1. [API](reclaim-an-invoice.md#api)&#x20;
2. [BPR File](reclaim-an-invoice.md#bpr-file)&#x20;

{% hint style="info" %}
To learn more about Claim Method Settings, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management).&#x20;
{% endhint %}

### API&#x20;

If your Claiming Method is API, then there is nothing left for you to do. A new [Payment Request](../invoice-overview/#invoice-key-terms) will be automatically generated and submitted to PRODA. Your [Invoice Line Item](../invoice-overview/#invoice-key-terms) will be set to a status of [Claimed](../invoice-overview/#invoice-statuses), your new [Payment Request](../invoice-overview/#invoice-key-terms) will be set to a status of [Awaiting Approval](../invoice-overview/#invoice-statuses) and your Invoice Claim Behaviour will be set to Claim Attempted.

{% hint style="info" %}
To learn more about the how the API Claim Method works in Maica, click [here](claim-an-invoice.md).&#x20;
{% endhint %}

### BPR File

If your Claiming Method is BPR File, then, similar to API, a new [Payment Request](../invoice-overview/#invoice-key-terms) will automatically be generated, however, it will **not** be submitted for claiming. The [Payment Request](../invoice-overview/#invoice-key-terms) will be generated and picked up via the standard BPR File Generation Process.&#x20;

Once the BPR File is generated (with the newly created [Payment Request](../invoice-overview/#invoice-key-terms) included), your [Invoice Line Item](../invoice-overview/#invoice-key-terms) will be set to a status of [Claimed](../invoice-overview/#invoice-statuses), your new [Payment Request](../invoice-overview/#invoice-key-terms) will be set to a status of [Awaiting Approval](../invoice-overview/#invoice-statuses) and your Invoice Claim Behaviour will be set to Claim Attempted.

{% hint style="info" %}
To learn more about the how the BPR File Claim Method works in Maica, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/claim-management#generate-bulk-payment-request-bpr-file).&#x20;
{% endhint %}

## Applicable Invoice Line Item Rules&#x20;

`Applicable Invoice Line Items` in **Maica** are determined by a set of rules and logic that are important to maintaining the integrity of the software.&#x20;

In **Maica**, any [Invoice Line Item](../invoice-overview/#invoice-key-terms) record that is associated with a [Payment Request](../invoice-overview/#invoice-key-terms) and holds any of the below listed `Status` values cannot be [Reclaimed](reclaim-an-invoice.md#reclaiming). These values include:&#x20;

* `BLANK`
* `Awaiting Approval`
* `Pending Payment`
* `Fully Paid`

**Maica** considers Payment Request records with the `Status` values to either be part of an Active or Complete Claim Cycle, and hence we do not allow them to be [Reclaimed](reclaim-an-invoice.md#reclaiming) as to avoid duplicate [Payment Requests](../invoice-overview/#invoice-key-terms) being generated.&#x20;

{% hint style="info" %}
Should you wish to include an `Invoice` record with such an existing `Payment Request`, you need to first **cancel** the `Payment Request` via the Cancel Quick Action on the `Payment Request` itself.
{% endhint %}
