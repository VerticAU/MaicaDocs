---
description: Learn how to configure Appointment Services in Maica
---

# Appointment Services

## How do I configure Appointment Services?

To correctly configure an Appointment Service, please follow the steps indicated below.

### 1. Search for `Appointment Services` in the App Launcher

In the Salesforce App Launcher, search for `Appointment Services` and choose it to open the list view of all `Appointment Services` in your Maica instance, as shown below.

<figure><img src="https://293583916-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F9selzjEx6KX7RYEawAVr%2Fuploads%2Ffcl49trqjk3QKynEXqoz%2Fapp%20launcher%20.png?alt=media&#x26;token=21bc94cd-0ca9-467f-b133-25e986e97d05" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The Salesforce App Launcher is found in the top left corner of your interface.
{% endhint %}

### 2. Create new `Appointment Service`

Once you are viewing your `Appointment Services`, simply click the `New` button located in the top right hand corner of your interface to bring up the `New Appointment Service` pop-up, as shown below.

<figure><img src="https://293583916-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F9selzjEx6KX7RYEawAVr%2Fuploads%2FldRJ5B9LBcEvlLuYgxLG%2Fnew%20appointment%20service.png?alt=media&#x26;token=1098a136-3552-4e33-8f62-5d0342f23495" alt=""><figcaption></figcaption></figure>

After the pop-up is displayed, you will be prompted to fill-in the following fields:

<table><thead><tr><th width="267">Field</th><th>Description</th></tr></thead><tbody><tr><td><code>Name</code></td><td>This will be the name of your Appointment Service. As an Appointment Service is essentially a parent object for your Support Items, we recommend naming your Appointment Services generically based on the Support Items it will contain.</td></tr><tr><td><code>Claim Types</code></td><td><ul><li><strong>Available</strong>: Lists all potential Claim Types that can be associated with the Appointment Service.</li><li><strong>Chosen</strong>: Select the relevant Claim Types for this Service that match the associated Support Items. Only selected Claim Types in this section will apply to the Appointment Service.</li></ul></td></tr><tr><td><code>Tags</code></td><td>These are custom tags to categorise or group Appointment Services. Tags can assist in easy search and filter of Services when assigning a Service to an Appointment.</td></tr><tr><td><code>Available Sections</code></td><td><ul><li><strong>Available</strong>: Lists different sections that can be added to the appointment service.</li><li><strong>Chosen</strong>: Select the sections relevant to this Service. This customises what fields or information will be displayed when setting up an Appointment using this Service.</li></ul></td></tr><tr><td><code>Start &#x26; End Date</code></td><td>This field represents the beginning date (when the Appointment Service becomes active) and when the end date (when the Appointment Service is no longer valid). If the End Date is left blank, the Appointment Service will be active indefinitely.</td></tr><tr><td><code>Participant Note Template</code></td><td><ul><li><strong>Participant Note Template</strong>: This assigns a template for Participant Notes that will be associated with the Service. Select a pre-existing template or search for one to guide standard note-taking.</li><li><strong>Pre-load Template</strong>: If checked, this option will automatically load the selected Note template whenever this Appointment Service is used.</li></ul></td></tr><tr><td><code>Enable Billable Participant Notes</code></td><td>When enabled, this Appointment Service can be selected when creating a Billable Participant Note. Use this checkbox to control Billable Participant Note eligibility at the record level. When checked, the Service is available for selection while a Billable Participant Note is being created against an Appointment.</td></tr><tr><td><code>Unfunded Service Delivery Permitted</code></td><td>When enabled, this Appointment Service can be scheduled and delivered without an associated Service Agreement or Agreement Item, and is priced from a Price List instead, with billing applied directly to the Participant. Leave it unchecked to require funded delivery.<br><br>To learn more, see <a href="../unfunded-service-delivery.md">Unfunded Service Delivery</a>.</td></tr><tr><td><code>Funding Source Selection Required</code></td><td>When enabled, the user is asked which Agreement Item applies whenever a Participant has more than one that could fund this Appointment Service, instead of one being selected automatically.</td></tr></tbody></table>

{% hint style="warning" %}
`Unfunded Service Delivery Permitted` and `Funding Source Selection Required` are granted on the packaged Appointment Service Create and Edit permission sets. Where your organisation uses a cloned or hand-built permission set over Appointment Service, grant read access to both fields. Maica reads these fields in user mode, so without read access, Create and Manage Appointment do not load.
{% endhint %}

Finally, once populated, simply click `Save` to create your `Appointment Service`.

### 3. Assign relevant `Skills` and `Checklists`

Select your newly created Appointment Service to open up the record. Once open, you will see the related list fields on the right hand side of your interface, as shown below.

<figure><img src="https://293583916-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F9selzjEx6KX7RYEawAVr%2Fuploads%2FZiXc39Z04H2gAJ5BEBVu%2FScreenshot%202024-11-07%20at%201.05.34%20pm.png?alt=media&#x26;token=877221d1-f8aa-4dd4-888c-ef4e6d94325c" alt=""><figcaption></figcaption></figure>

This step is only going to focus on `Skills` and `Checklists`. Both of these related lists work the same way, which is:

1. Click the `New` button to add `Skills` and `Checklists`
2. Select which `Appointment Service` you wish to assign the `Skill` or `Checklist` too. The Service you open the selector from will be selected by default.
3. Select which `Skill` or `Checklist` you wish to assign from your configured list.

{% hint style="info" %}
You can also set the `Requirement Level` to either `Required` or `Recommended` for any added `Skills`
{% endhint %}

4. Click `Save` to finalise your selection.

{% hint style="info" %}
Note, you can also assign Skills and Checklists to an Appointment Service through the related lists on the relevant Skills and Checklists records.
{% endhint %}

### 4. Assign `Support Items` to an `Appointment Service`

{% hint style="info" %}
Note, you must have configured your Support Items before assigning them an Appointment Service. In order to learn how to **configure** Support Items, click [here](support-items.md).

\
Please note that depending on the version of Maica you are using, Support Items may be referred to as Products (the NDIS term) in your instance.
{% endhint %}

Again, on your newly created Appointment Service, refer to the related list fields on the right hand side of your interface to identify the Support Items list. Here you will see all associated Support Items within an Appointment Service.

{% hint style="danger" %}
It is crucial to note here that assigning Support Items does not work in the same way as assigning Skills and Checklists.\
\
Clicking the `New` on the Support Item related list directly from your Appointment Service record will create an entirely new Support Item, not assign an existing one. In order to assign a Support Item to an Appointment Service, you must do it directly from the Support Item record.
{% endhint %}

As mentioned, in order to assign a Support Item to an Appointment Service, you must do it directly from the Support Item record. This is due to the fact that one Support Item can only ever belong to one Appointment Service.

To explain how this process works, please refer to the demonstration below. In the Demonstration, the following examples will be used and referenced:

* **Appointment Service**: Recovery Coaching
* **Support Item**: Psychosocial Recovery Coaching - Saturday

{% embed url="https://app.arcade.software/share/icHbURk7K3F18seGb4Ji" %}

Now, your Appointment Service is ready to be used.

## Things to look out for: Basic Details

### 1. Duplicate Support Items

When configuring Appointment Services, it is crucial that no Support Items with the same configuration are assigned to the same Appointment Service, as this will disrupt **Maica's** ability to accurately validate the Participants funding, and potentially disrupt the [Billing Flow](../billing-invoice-generation.md).

{% hint style="info" %}
If two Support Items (with identical configurations) were to be assigned to the same Appointment Service, the Billing Automation would face ambiguity. Maica’s Billing Automation relies on identifying a unique Support Item within an Appointment Service to bill correctly. If multiple Support Items with identical identifiers were present, the Automation wouldn’t know which one to bill against, potentially leading to billing errors or incorrect Invoicing.\
\
To learn more about the Billing Flow, click [here](../billing-invoice-generation.md).
{% endhint %}

The following four fields in a Support Item decide whether they are considered 'identical' within the **Maica** system:

1. `Service Day`
2. `Service Time`
3. `Support Category`
4. `Registration Group`

So, in summary, no two Support Items with identical inputs to the four fields listed above can exist within the same Appointment Service. If one field differs, they can exist.

{% hint style="info" %}
Please note, **Maica's** `SupportItemServiceValidation_MDTM` trigger based Automation will prevent this from occurring given this trigger is enabled.
{% endhint %}
