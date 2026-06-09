---
description: Learn about what an implementation of Maica looks like.
---

# The Implementation Process

Maica is a purpose-built healthcare application for Australian NDIS and Aged Care providers and does not require any implementation to get started. We have described below the various steps involved in not only getting started with Maica but also extend it over time to grow alongside your organisation.

{% hint style="info" %}
Maica is built on the [Salesforce](https://www.salesforce.com) digital client management system and, as such, there are several models under which you can purchase the underlying Salesforce platform, as shown below:<br>

* `OEM` - this means that when purchasing Maica directly from us, this will include the underlying Salesforce platform (Salesforce Platform Starter Edition) so there is nothing else for you to do to get started.
* `ISV` - this means that you are purchasing Salesforce directly from Salesforce, via an Account Executive most likely, which then allows us to install Maica into your Salesforce environment.
* `Mixed`- this means that you may already have a Salesforce environment and want to expand this using Maica. In this case, we are able to provision `OEM` licences to your organisation or install Maica under the `ISV`model.

All underlying Salesforce instances **must** be hosted in Australia to be compliant with the NDIS and Aged Care legislation. When purchasing under `ISV`, please ask your Salesforce Account Executive to ensure this is the case. Maica will natively be hosted in Australia when purchssed under the `OEM`model.
{% endhint %}

### The Maica Standup Process (Mandatory)

As part of your licence subscription, we will provide the following standup services free of charge to you to.

{% hint style="info" %}
At the conclusion of this stage of your Maica adoption, we will ask you to formally accept the core Maica product prior to potentially extending your specific solution to meet particular organisational needs.
{% endhint %}

| Task                         | Description                                                                                                                                                                            | Assumption                                                                                                                                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Solution Installation        | <p>The installation of the Maica solution into your Salesforce instance. <br><br><em>Where applicable, we will assist you with getting access to your Salesforce environment.</em></p> | <p>If your Salesforce instance was purchased directly from Salesforce, you must ensure it is hosted in Australia. <br><br>If Maica is provisioning your Salesforce instance for you, we will take care of this.</p> |
| NDIS API Connection          | The connection of Maica to the NDIS APIs where this is relevant.                                                                                                                       | An agreement with the NDIA must be signed prior to gaining access to ensure data integrity.                                                                                                                         |
| Scheduling & Rostering Setup | This provides the required Appointment Services to enable the scheduling and rostering engine of Maica including all relevant settings, preferences, and resources.                    | Maica provides a set of compliant Appointment Services for the NDIS and Aged Care under which your organisation can start delivering services without the need for any further configuration.                       |
| Reference Data Load          | Setting up a set of required reference data for your organisation.                                                                                                                     | This includes Registration Groups, Support Categories, Support Items across NDIS and Aged Care.                                                                                                                     |
| End User Training            | The solution training of your team, including usage of Maica across all functions of the lifecycle.                                                                                    | This is constrainted to a  single 2 hour session.                                                                                                                                                                   |

{% hint style="info" %}
Everything documented in the Maica Knowledge Base is part of the core solution and requires no implementation fees whereas anything not documented in the Maica Knowledge Base is considered an extension and will go through our [Extensions Implementation Process](the-implementation-process.md#the-maica-extensions-implementation-process).
{% endhint %}

### The Maica Extensions Implementation Process (Optional)

In cases where your organisation has implementation needs beyond the core Maica product (as documented in the Maica Knowledge Base), Maica follows a strict `Time & Materials` approach whilst working with your team to define, determine, and implement the most appropriate technical solution(s) to meet your needs. This commercial model also keeps you in charge of how much financial input an implementation might require.&#x20;

The below table outlines some of the more typical tasks we have come across for your reference:

| Task                                | Description                                                                                                                                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Scheduling & Rostering Setup        | This configures any relevant extensions to the scheduling and rostering engine of Maica including all relevant services, settings, preferences, resources, and security/profile configuration.                                                                                       |
| Core Data Model Extensions          | This includes the extension of required attributes across existing Maica data objects, such as Contact, Service Agreement, and Appointment as well as the configuration of any newly determined data requirements.                                                                   |
| Billing Flow Extensions             | This is the extension development (using Salesforce Flows) of the standard Maica billing flows, including special billing conditions and recurring billing scenarios that might require amendments to Maica.                                                                         |
| Timesheet Flow Extensions           | This is the extension development (using Salesforce Flows) of the standard Maica timesheet flows to ensure that it is suitable for your organisational processes, including special award interpretation conditions.                                                                 |
| Document Generation                 | The development of several digital documents (including digital signature) using the [Conga Composer](https://conga.com/) or [DocuSign](https://www.docusign.com/) platforms.                                                                                                        |
| Xero Finance System Extensions      | The development of any required extensions to Maica’s native Xero integration where this is relevant.                                                                                                                                                                                |
| Online Portal Development           | <p>The development of a secure online portal for either Participants or Providers to allow for self-management of Appointments, Invoices, etc. <br><br>This typically requires custom branding and layouts to ensure your online presence is represented consistenly throughout.</p> |
| Integrations Development            | The development of various integrations to complement your Maica/Salesforce solutions, including systems such as KeyPay, SharePoint, Outlook, among other typical integrations we have come across.                                                                                  |
| Any Relevant Extensions Development | This includes the configuration and development of any relevant & required extensions to either the core Maica solution or the underlying Salesforce platform. This can include discovery workshops, architectural guidance, flow development among many other activities.           |

### How to get started?

The best way to get started with Maica would be to [request a trial](https://www.maica.com.au/request-a-trial) from us, [organise a demonstration](https://www.maica.com.au/schedule-a-demo) or simply [connect](https://www.maica.com.au/contact-us) to speak to our team.
