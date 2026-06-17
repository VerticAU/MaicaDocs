---
description: Learn how to configure Appointment Services in Maica
---

# Appointment Services

## How do I configure Appointment Services?&#x20;

To correctly configure an Appointment Service, please follow the steps indicated below.

### 1. Search for `Appointment Services` in the App Launcher

In the Salesforce App Launcher, search for `Appointment Services` and choose it to open the list view of all `Appointment Services` in your Maica instance, as shown below.

<figure><img src="../../.gitbook/assets/app launcher .png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The Salesforce App Launcher is found in the top left corner of your interface.&#x20;
{% endhint %}

### 2. Create new `Appointment Service`

Once you are viewing your `Appointment Services`, simply click the `New` button located in the top right hand corner of your interface to bring up the `New Appointment Service` pop-up, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/new appointment service.png" alt=""><figcaption></figcaption></figure>

After the pop-up is displayed, you will be prompted to fill-in the following fields:&#x20;

<table><thead><tr><th width="267">Field </th><th>Description </th></tr></thead><tbody><tr><td><code>Name</code></td><td>This will be the name of your Appointment Service. As an Appointment Service is essentially a parent object for your Support Items, we recommend naming your Appointment Services generically based on the Support Items it will contain. </td></tr><tr><td><code>Claim Types</code> </td><td><ul><li><strong>Available</strong>: Lists all potential Claim Types that can be associated with the Appointment Service.</li><li><strong>Chosen</strong>: Select the relevant Claim Types for this Service that match the associated Support Items. Only selected Claim Types in this section will apply to the Appointment Service.  </li></ul></td></tr><tr><td><code>Tags</code></td><td>These are custom tags to categorise or group Appointment Services. Tags can assist in easy search and filter of Services when assigning a Service to an Appointment. </td></tr><tr><td><code>Available Sections</code></td><td><ul><li><strong>Available</strong>: Lists different sections that can be added to the appointment service.</li><li><strong>Chosen</strong>: Select the sections relevant to this Service. This customises what fields or information will be displayed when setting up an Appointment using this Service.</li></ul></td></tr><tr><td><code>Start &#x26; End Date</code></td><td>This field represents the beginning date (when the Appointment Service becomes active) and when the end date (when the Appointment Service is no longer valid). If the End Date is left blank, the Appointment Service will be active indefinitely. </td></tr><tr><td><code>Participant Note Template</code></td><td><ul><li><strong>Participant Note Template</strong>: This assigns a template for Participant Notes that will be associated with the Service. Select a pre-existing template or search for one to guide standard note-taking.</li><li><strong>Pre-load Template</strong>: If checked, this option will automatically load the selected Note template whenever this Appointment Service is used.</li></ul></td></tr><tr><td><code>Enable Billable Participant Notes</code></td><td>When enabled, this Appointment Service can be selected when creating a Billable Participant Note. Use this checkbox to control Billable Participant Note eligibility at the record level. When checked, the Service is available for selection while a Billable Participant Note is being created against an Appointment.</td></tr></tbody></table>

Finally, once populated, simply click `Save` to create your `Appointment Service`.&#x20;

### 3. Assign relevant `Skills` and `Checklists`

Select your newly created Appointment Service to open up the record. Once open, you will see the related list fields on the right hand side of your interface, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-11-07 at 1.05.34 pm.png" alt=""><figcaption></figcaption></figure>

This step is only going to focus on `Skills` and `Checklists`. Both of these related lists work the same way, which is:&#x20;

1. Click the `New` button to add `Skills` and `Checklists`&#x20;
2. Select which `Appointment Service` you wish to assign the `Skill` or `Checklist` too. The Service you open the selector from will be selected by default.&#x20;
3. Select which `Skill` or `Checklist` you wish to assign from your configured list.&#x20;

{% hint style="info" %}
You can also set the `Requirement Level` to either `Required` or `Recommended` for any added `Skills`&#x20;
{% endhint %}

4. Click `Save` to finalise your selection.&#x20;

{% hint style="info" %}
Note, you can also assign Skills and Checklists to an Appointment Service through the related lists on the relevant Skills and Checklists records.&#x20;
{% endhint %}

### 4. Assign `Support Items` to an `Appointment Service`

{% hint style="info" %}
Note, you must have configured your Support Items before assigning them an Appointment Service. In order to learn how to **configure** Support Items, click [here](support-items.md).&#x20;

\
Please note that depending on the version of Maica you are using, Support Items may be referred to as Products (the NDIS term) in your instance.
{% endhint %}

Again, on your newly created Appointment Service, refer to the related list fields on the right hand side of your interface to identify the Support Items list. Here you will see all associated Support Items within an Appointment Service.&#x20;

{% hint style="danger" %}
It is crucial to note here that assigning Support Items does not work in the same way as assigning Skills and Checklists. \
\
Clicking the `New` on the Support Item related list directly from your Appointment Service record will create an entirely new Support Item, not assign an existing one. In order to assign a Support Item to an Appointment Service, you must do it directly from the Support Item record.&#x20;
{% endhint %}

As mentioned, in order to assign a Support Item to an Appointment Service, you must do it directly from the Support Item record. This is due to the fact that one Support Item can only ever belong to one Appointment Service.&#x20;

To explain how this process works, please refer to the demonstration below. In the Demonstration, the following examples will be used and referenced:&#x20;

* **Appointment Service**: Recovery Coaching
* **Support Item**: Psychosocial Recovery Coaching - Saturday

{% embed url="https://app.arcade.software/share/icHbURk7K3F18seGb4Ji" %}

Now, your Appointment Service is ready to be used.

## Things to look out for: Basic Details

### 1. Duplicate Support Items&#x20;

When configuring Appointment Services, it is crucial that no Support Items with the same configuration are assigned to the same Appointment Service, as this will disrupt **Maica's** ability to accurately validate the Participants funding, and potentially disrupt the [Billing Flow](../billing-invoice-generation.md).&#x20;

{% hint style="info" %}
If two Support Items (with identical configurations) were to be assigned to the same Appointment Service, the Billing Automation would face ambiguity. Maica’s Billing Automation relies on identifying a unique Support Item within an Appointment Service to bill correctly. If multiple Support Items with identical identifiers were present, the Automation wouldn’t know which one to bill against, potentially leading to billing errors or incorrect Invoicing.\
\
To learn more about the Billing Flow, click [here](../billing-invoice-generation.md).&#x20;
{% endhint %}

The following four fields in a Support Item decide whether they are considered 'identical' within the **Maica** system:

1. `Service Day`&#x20;
2. `Service Time`&#x20;
3. `Support Category`&#x20;
4. `Registration Group`&#x20;

So, in summary, no two Support Items with identical inputs to the four fields listed above can exist within the same Appointment Service. If one field differs, they can exist.&#x20;

{% hint style="info" %}
Please note, **Maica's** `SupportItemServiceValidation_MDTM` trigger based Automation will prevent this from occurring given this trigger is enabled.&#x20;
{% endhint %}

