---
description: Use Permission Sets to manage user access and permissions within Maica.
hidden: true
noIndex: true
---

# Permission Sets

## What is a Permission Set?

A permission set is a collection of settings and permissions that give users access to various tools and functions. Permission sets extend users’ functional access without changing their profiles and are the recommended way to manage your users’ permissions.

## How is Permission Managed in Maica?

Maica leverages standard Salesforce [Permission Sets](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/perm_sets_overview.htm) to provide access to its range of features.&#x20;

For example, let’s say you have several **staff members** who need the ability to enter `Invoices` and `Claim` funds from the NDIS. Assign these users the `Maica - Manage Plan & Service Booking` Permission Set to ensure they can access the features and functionality required in this process.

Taking this a step further, assume that only 1 of these staff members needs the ability to delete a Service Booking. Assign this user the `Maica - Delete Service Booking` Permission Set in addition to the one above to enable this additional functionality.

{% hint style="info" %}
The `Permission Set` is complementary to their `Profile`, meaning it provides access to these Maica features **in addition** to what is already provided via their existing `Profile`
{% endhint %}

## Maica Permission Sets&#x20;

The table below provides an overview of the standard Maica Permission Sets and an example of the intended user.

<table data-full-width="false"><thead><tr><th width="373">Permission Set Name</th><th>Who is this for? </th></tr></thead><tbody><tr><td><code>Maica - General User</code></td><td>This needs to be assigned to <strong>all</strong> of your Maica users.</td></tr><tr><td><code>Maica Client Care - Care Worker</code></td><td>This needs to be assigned to <strong>all</strong> your care workers who work in service delivery</td></tr><tr><td><code>Maica Client Care - Manage Service Delivery</code> </td><td>This set is designed for users who oversee service delivery processes. It includes permissions to create, update, and view critical service-related objects.</td></tr><tr><td><code>Maica - Manage Maica Settings</code></td><td>This set allows users to view and modify Maica system settings. It is intended for system administrators or managers who need to adjust configurations and settings within Maica for system-wide operations.</td></tr><tr><td><code>Maica - Manage Crediting</code></td><td>This set is for users involved in the financial side of Maica, particularly around invoicing and crediting. It provides the ability to manage credits and is linked with invoicing and claiming permissions to ensure proper financial adjustments and management.</td></tr><tr><td><code>Maica - Delete Service Booking</code></td><td>This set is assigned to users who have the authority to delete service bookings. It grants specific permissions for managing service bookings, ensuring that they can remove bookings when necessary, typically handled by administrative staff.</td></tr><tr><td><code>Maica - Process Stripe Payments</code></td><td>This set is intended for users who handle payments through Stripe. It provides permissions to process and view payments.</td></tr><tr><td><code>Maica - Manage Invoice &#x26; Claiming</code></td><td>This should be assigned to users responsible for managing invoicing and claim submission processes, including generating and submitting invoices for services provided.</td></tr><tr><td><code>Maica - Manage Plan &#x26; Service Booking</code> </td><td>This set is for users who manage participant plans and service bookings. It includes permissions to create, update, and manage Plan Budgets and Plan Goals, ensuring that participant services are properly aligned with their NDIS plans.</td></tr></tbody></table>

## Full Permission Set Overview

You can access a full overview of all the Maica Permission Sets in the Google Sheet below.&#x20;

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1KBuMxnNTRKbxlzFbLSzHvUH8hzJ1lTMZT0KsFVQVwjU/edit?usp=sharing) to view and download the complete Maica Permission Matrix.&#x20;
{% endhint %}

{% embed url="https://docs.google.com/spreadsheets/d/1KBuMxnNTRKbxlzFbLSzHvUH8hzJ1lTMZT0KsFVQVwjU/edit?usp=sharing" %}
Maica Permission Sets Matrix
{% endembed %}
