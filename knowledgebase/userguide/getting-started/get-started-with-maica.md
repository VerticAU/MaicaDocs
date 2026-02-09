---
description: Learn about the things to look for when first getting started with Maica.
---

# Get Started with Maica

So you have installed Maica or logging into Maica for the first time...exciting!

We thought we would share the most common initial tasks when first starting on Maica to set up what you need and ensure it works the way you want it to. The list below is a really good starting point.

* [Reference Data Load](get-started-with-maica.md#reference-data-load)
* [Settings](get-started-with-maica.md#settings)
* [Permission Sets](get-started-with-maica.md#permission-sets)
* [Appointment Service(s) Setup](get-started-with-maica.md#appointment-service-s-setup)
* [Resource(s) Setup](get-started-with-maica.md#resource-s-setup)
* [Integrations (NDIS, Google, Xero, Stripe)](get-started-with-maica.md#integrations-ndis-google-xero-stripe)

{% hint style="info" %}
As Maica has been built on the Salesforce platform, all of Salesforce's configuration and extension tools are available to make Maica uniquely yours, such as Lightning Page Layouts, Flows, Reports, and Data Model Extensions.
{% endhint %}

#### Reference Data Load

Maica pre-loads the required reference data into your solution during the installation process. This includes data such as [Support Items](maica-key-concepts/support-item.md), Support Categories, Reference Groups, [Price Lists](maica-key-concepts/price-list.md) and Price List Entries. These will serve as the foundation of your services whether this is NDIS or Aged Care.&#x20;

In cases where you wish to amend or change the default reference data, this can be loaded using this [Reference Data Import Template](https://docs.google.com/spreadsheets/d/1yqbW3i79DNL7u42elwJIQsvkpSsnZzT24EyxIyDueqE/edit?usp=sharing). &#x20;

{% hint style="info" %}
[Click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/reference-data/reference-data-template) to start configuring your reference data in Maica beyond the pre-loaded information.
{% endhint %}

#### Settings

When installing Maica for the first time, a bunch of [settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/general-settings) are pre-configured for you, including the way the [Planner](../the-planner/planner-overview.md) looks and behaves, [Appointments](maica-key-concepts/appointment.md) are managed and [Shifts](maica-key-concepts/shift.md) are allocated to your teams. There are many settings beyond this though that determine how Maica will behave, including:

* [Billing Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/billing-management)
* [Invoicing Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/invoice)
* [Travel Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/travel-management)

We would encourage you to go through all of Maica's settings to make sure they are configured in a way relevant to you.

{% hint style="info" %}
Your Maica implementation partner will be able to walk you through the various settings and their impact on how Maica works and our [knowledge base ](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/general-settings)also explains each setting for you.&#x20;
{% endhint %}

#### Permission Sets

Once you are satisfied that your reference data is in place and the settings are configured to your liking, another important concept becomes relevant. As Maica is built on top of the Salesforce platform, the solution offers you a large number of [permission sets](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/permission-sets) to control what users are able to do (and not do) in the system.&#x20;

{% hint style="info" %}
It is critical to go through an assign the relevant Permission Sets to the right users (Resources) in Maica so they can perform the needed functions but you can also restrict what actions they are able to take. If some functions are not available to some users, this might be because they don't have the right [Permission Set](https://help.salesforce.com/s/articleView?id=platform.perm_sets_overview.htm\&type=5) assigned.&#x20;
{% endhint %}

#### Appointment Service(s) Setup

Once you are ready to start scheduling and delivering services, either via Appointments or Shifts, you will need to set up your [Appointment Services](maica-key-concepts/appointment-service.md). These essentially function as the basis of what is being delivered and how this delivery is being billed for using Maica's billing automation.&#x20;

{% hint style="info" %}
You can learn more about Appointment Services in [Maica's Key Concepts](maica-key-concepts/) and [here](maica-key-concepts/appointment-service.md) to get started. Your Maica implementation partner can also assist you with the configuration of Appointment Services.
{% endhint %}

#### Resource(s) Setup

The concept of a [Resource](maica-key-concepts/resource.md) in Maica is quite important as this is the person delivering the service to your participants. These can be either human, such as care workers, or non-human, such as cars and rooms.&#x20;

{% hint style="info" %}
The key to setting up Resources is to link a Resource record to a [Salesforce User](https://help.salesforce.com/s/articleView?id=mktg.mc_co_manage_users.htm\&type=5) record as this is how your team is granted access to Maica (and Salesforce).
{% endhint %}

#### Integrations ([NDIS](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/integration-management/ndis-integration), Google, [Xero](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/xero-integration), [Stripe](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/integrations/stripe-integration))

Maica offers a number of native integrations, such as [Google](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/maps-management), [Xero](../integrations/xero-integration-overview.md), [Stripe](../integrations/stripe-integration-overview.md), and the [NDIS APIs](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/integration-management/ndis-integration). The connection to the NDIS APIs must be done via an accredited aggregator and [Vertic](https://www.vertic.com.au) will facilitate and manage this integration for all Maica clients. If you would like to use the automated travel features and maps integrations, then Maica requires a [Google Maps API](../shifts/shift-actions/google-maps.md) key to be configured. You will also find guides to configure the integration with Xero and Stipe in our knowledge base.

{% hint style="info" %}
Configuring integrations can be tricky and quite technical so your Maica implementation partner will be able to assist you in setting this up.&#x20;
{% endhint %}
