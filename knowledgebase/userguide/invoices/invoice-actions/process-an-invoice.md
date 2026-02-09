---
description: Learn how to Process Invoices in Maica
---

# Process an Invoice

## How do I Process an Invoice?&#x20;

In **Maica**, you can only process payment for an [Invoice](../../getting-started/maica-key-concepts/invoice.md) using the **Stripe Payment Integration**. Please see below for more detailed information on the steps involved in processing an [Invoice](../../getting-started/maica-key-concepts/invoice.md) using Stripe.&#x20;

{% hint style="info" %}
In order to process invoices using the Stripe Payment Integration, you first must have Stripe configured. To learn more about how to configure Stripe in your Maica instance, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/stripe-integration).&#x20;
{% endhint %}

## Stripe Payment Integration&#x20;

The Stripe Payment Integration in Maica allows you to process [Invoices](../../getting-started/maica-key-concepts/invoice.md) directly through **Maica** using Stripe. In Maica, there are two options for processing an Invoice, these include:&#x20;

1. [Charge the default payment method associated with the Client](process-an-invoice.md#id-1.-charge-the-default-payment-method-associated-with-the-client)
2. [Generate the hosted Invoice link](process-an-invoice.md#id-2.-generate-the-hosted-invoice-link)

{% hint style="info" %}
The first choice is handy if your Participant has disclosed a Payment Method and consented to be charged with your organisation, while the second option is useful if they have not.
{% endhint %}

Please see below for more detailed information on each step in order to process an [Invoice](../../getting-started/maica-key-concepts/invoice.md).&#x20;

### Charge the default payment method associated with the Client

#### 1. Set up Payment Methods

Firstly, you must begin by setting up Payment Methods for each required [Participant(s)](../../getting-started/maica-key-concepts/participant.md). The integration allows you to establish a new Payment Method directly from your Participant record. You can begin adding Payment Methods by selecting your Participant record, then clicking the `Stripe Payment Methods` button, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/add payment methods.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
You can add multiple payment methods for each Participant(s). If there are multiple payment methods, you can toggle the default.
{% endhint %}

After clicking the `Stripe Payment Methods` button, and before you can add in any Payment Methods, **Maica** will first prompt you to provide a Stripe Customer ID for the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md). If you have one, please enter it in the `Stripe Customer ID` input in the `Participant Record`, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/stripe customer id.png" alt="" width="536"><figcaption></figcaption></figure>

Alternatively, click the `Create a New Stripe Customer` button, and **Maica** will automatically sync with Stripe, create a `Stripe Customer ID` using the related payment method, and populate this field for you.&#x20;

Once a `Stripe Customer ID` has been provided, you will be able to add Payment Methods. The supported Payment Methods are `Credit Card` and/or `Direct Debit`.

After Payment Methods have been added, Maica will display the following on the Participant(s) record.

<figure><img src="../../.gitbook/assets/Payment Information.png" alt="" width="555"><figcaption></figcaption></figure>

#### 2. Toggle Default Payment Method

In order to Toggle the Default Payment Method for your [Participant(s)](../../getting-started/maica-key-concepts/participant.md), simply reselect the `Stripe Payment Methods` button after a Payment Method has been added. This allows you to choose between any associated Payment Methods, or, a new Payment Method, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/default payment method.png" alt="" width="563"><figcaption></figcaption></figure>

Simply select which Payment Method you would like to be Default and close the pop-up. Your default Payment Method will be displayed in the `Payment Information` section of the Participant record, as per the screen above.&#x20;

#### 3.  Process an Invoice

Once a Payment Method has been added and the [Participant](../../getting-started/maica-key-concepts/participant.md) has a `Stripe Customer ID`, the Payment Method is ready to be charged and hence associated [Invoices](../../getting-started/maica-key-concepts/invoice.md) are ready to be processed.&#x20;

{% hint style="info" %}
Invoices can be processed manually or using Maica automation. This article illustrates an Invoice being processed manually. To learn more about Invoice automation, click [here](../../integrations/stripe-integration-overview.md).
{% endhint %}

To begin processing an [Invoice](../../getting-started/maica-key-concepts/invoice.md), first navigate to the required [Invoice](../../getting-started/maica-key-concepts/invoice.md) then click the `Process Invoice` button in the top right corner of your interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/process invoice.png" alt=""><figcaption></figcaption></figure>

Once you click the `Process Invoice` button, **Maica** will display a custom UI pop-up, simply select `Charge the default payment method associated with the Client`. This will charge the [Default Payment Method ](process-an-invoice.md#id-2.-toggle-default-payment-method)set on the Participant record. This is useful when the payment is coming directly from the [Participant](../../getting-started/maica-key-concepts/participant.md). &#x20;

***

Once done, **Maica** will take you to a confirmation page where you can confirm your payment. Once confirmed, the [Invoice](../../getting-started/maica-key-concepts/invoice.md) will automatically update and populate the `Stripe Payment Information` with a `Stripe Invoice ID`, `Stripe Invoice Link` and `Stripe Dashboard Link`, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-13 at 1.33.58 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Your Processed Invoice can be accessed directly from **Maica** by clicking on the `Stripe Dashboard Link` or `Stripe Invoice Link`.
{% endhint %}

### 2. Generate the hosted Invoice link

If your Participant has not disclosed a Payment Method with your Organisation or they would rather process an Invoice themselves directly, you can send them a Stripe Hosted Invoice Link for any Invoice they are associated with. This option will provide the URL for the Stripe hosted invoice page, which allows the Invoice Recipient to view and pay the Invoice directly.

{% hint style="info" %}
Please note, in order to send an Invoice link, you must still have the [Stripe Integration Configured](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/stripe-integration).
{% endhint %}

{% hint style="info" %}
If your Participant has set up a Payment Method (as above), you can still Process an Invoice through a hosted link if you desire.&#x20;
{% endhint %}

You do this by selecting the `Process Invoice` Quick Action located on the associated Invoice, and selecting `Generate the hosted Invoice link`.

Once the link has been issued and the Invoice has been processed, a `Stripe Customer ID` will be populated for the Participant so you can identify them in both Stripe and **Maica**. Additionally, once processed, the [Invoice](../../getting-started/maica-key-concepts/invoice.md) will automatically update and populate the `Stripe Payment Information` with a `Stripe Invoice ID`, `Stripe Invoice Link` and `Stripe Dashboard Link`.&#x20;

{% hint style="info" %}
Your Processed Invoice can be accessed directly from **Maica** by clicking on the `Stripe Dashboard Link` or `Stripe Invoice Link`.
{% endhint %}

## What happens next?&#x20;

After your [Invoice](../../getting-started/maica-key-concepts/invoice.md) has been Processed, **Maica** will generate a payment record. This is the payment that has been used to process the associated [Invoice](../../getting-started/maica-key-concepts/invoice.md). This record sits within your Invoice record under `Payments`, as shown below.

<figure><img src="../../.gitbook/assets/payment record.png" alt="" width="563"><figcaption></figcaption></figure>

The Payment Record holds all the information from the [Invoice](../../getting-started/maica-key-concepts/invoice.md) including `Type`, `Source`, `Date`, `Amount` , `Invoice Number` and more.&#x20;
