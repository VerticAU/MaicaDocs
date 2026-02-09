---
description: Learn how to Credit an Invoice in Maica
---

# Credit an Invoice

## Crediting Functionality&#x20;

In the course of processing invoices, errors may occasionally occur, such as submitting a Payment Request with incorrect details, such as the wrong Support Category, Quantity, or Amount. Maica’s Credit Management functionality allows for the easy correction of these discrepancies.

{% hint style="info" %}
The Credit Management functionality allows you to `Cancel` a `Payment Request` that is in the status of `Payment Pending` or `Paid`.
{% endhint %}

As part of this process, it is essential to understand how the NDIS handles a Payment Request once it has been cancelled in PRODA. The following text outlines this:&#x20;

> * If you cancel a `Payment Request` with a `Status` of **Pending Payment**, the `Payment Request` will not be processed.
> * If you cancel a `Payment Request` with a `Status` of **Paid**, the Agency may:
>   * Send you an invoice requesting repayment of the cancelled amount or
>   * Offset your future payment requests against the cancelled amount

{% hint style="info" %}
This text is also displayed within the `Credit Management` tool under `NDIS Cancellation Process`. It is not unique to Maica and comes from the NDIS, however it has been displayed within Maica for clarity. &#x20;
{% endhint %}

{% hint style="info" %}
This function is **only available via the API**. If you manage your claiming process via the BPR File, you need to manually Cancel the Payment Request in Maica and PRODA.
{% endhint %}

## How do I Credit an Invoice?&#x20;

In **Maica**, you can `Credit` an Invoice through the Credit Quick Action found in the dropdown menu located in the top right corner of your interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/cancel dropdown.png" alt=""><figcaption></figcaption></figure>

However, in order to be able to Credit an Invoice, two conditions must be met:&#x20;

1. `Funding Structure` = Agency Managed
2. `Status` not equal `Entered` OR `Cancelled`

If these two conditions are met, you should see the Credit button within the dropdown, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-27 at 2.21.26 pm.png" alt="" width="106"><figcaption></figcaption></figure>

{% hint style="info" %}
You can also `Credit` numerous Invoices at once if necessary. To do so, pick them in the Invoice list view from the Invoices tab in the **Maica** menu, and then click the `Credit Management` icon in the upper right corner of the interface. Follow the same steps outlined below.
{% endhint %}

Once you have clicked the Credit button, you will be presented with the `Credit Management` pop-up.&#x20;

The `Credit Management` tool is divided into two sections.

1. NDIS Cancellation Process&#x20;
2. Selected Invoices

{% hint style="info" %}
As mentioned above, the NDIS Cancellation Process is shown for clarity. It explains how the NDIS handles a Payment Request once it has been cancelled in PRODA.
{% endhint %}

The Selected Invoices section displays a list of all Invoices that have been selected to be Credited (if done through the `Credit Management` option, there may be numerous). Each Invoice will be a dropdown with all the Invoice Line Items and associated Payment Requests that are selectable for Cancellation in order to Credit your Invoice. This is shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-27 at 2.59.14 pm.png" alt=""><figcaption></figcaption></figure>

From here, simply select the desired [Payment Requests](../invoice-overview/payment-request-overview.md) you wish to Cancel and click the Credit button in the bottom corner of the interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/select payment requets.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The Credit amount is the Sum of all the `Paid Amounts` from the selected Payment Requests.&#x20;
{% endhint %}

After completion, you will notice a green tick next to the Payment Request line, and the `Payment Request Status` in **Maica** will be updated to `Cancelled`.

If the `Payment Request` had a previous status of `Paid`, you will either receive an Invoice from the NDIA, or the amount will be offset against a future `Payment Request`.
