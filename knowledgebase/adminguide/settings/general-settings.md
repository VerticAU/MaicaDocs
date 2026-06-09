---
description: Learn about General Settings in Maica
---

# General Settings

These settings determine how Maica manages General Settings and their function throughout the application. Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Maica Managed Sharing</code></td><td><p>Salesforce offers a security mechanism called <a href="https://help.salesforce.com/s/articleView?id=sf.security_about_sharing_rules.htm&#x26;type=5">Sharing Rules</a> which allow you to configure access for particular users to specific records in Salesforce.<br></p><p>This setting enables Maica to automatically create or remove a Salesforce Sharing Rule for a Resource when a <strong>Resource Participant</strong> (on the Resource’s profile) is added or removed.</p><p></p><p><strong>Note</strong>: For this setting to function correctly, the <strong>Contact</strong> sharing model must be set to <strong>Private</strong>. Otherwise, all users may already have access to all Contact records, making sharing rules unnecessary or ineffective. To learn how to set the Contact sharing model to Private, refer to the section <a href="general-settings.md#enabling-maica-managed-contact-sharing">below</a>.</p></td></tr><tr><td><code>Allow Saving when Validation Rule is triggered</code></td><td>Salesforce offers a validation mechanism called <a href="https://help.salesforce.com/s/articleView?id=sf.fields_about_field_validation.htm&#x26;type=5">Validation Rules</a> which allow you to configure specific validations, such as field masks and mandated values.<br><br>This setting enables/disables Maica to adhere to any Salesforce Validation Rules configured against the Appointment record and, if triggered, prevent the creation/management of an Appointment.</td></tr><tr><td><code>Schedule Horizon</code></td><td>When creating recurring Appointments or Shifts, Maica will generate the relevant records in advance for you but this will be a rolling generation limited by the Schedule Horizon.<br><br>As an example, by setting the Schedule Horizon to 4 weeks, your recurring Appointments/Shifts will be generated 4 weeks in advance at any one time.</td></tr><tr><td><code>Enable Total Committed Calculation</code></td><td>This setting enables or disables Total Committed calculations across Maica. </td></tr></tbody></table>

#### Time Bracket Configuration Settings

Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Time of Day</code></td><td>When billing, particularly within the NDIS, there may be multiple <a href="../data/data-objects/support-item.md">Support Items</a> for the same service but different times, for example a Support Item for a 10am service might be different to a Support Item for the same service at 3pm.<br><br>As such, Maica needs to know what time falls into what bracket, for example 3pm is considered to be <code>Afternoon</code> and so forth. This setting defines the various time brackets and their corresponding service times for the purposes of billing.</td></tr><tr><td><code>Prioritisation</code></td><td>This setting defines which order Maica will use when a time falls into multiple time brackets so the most relevant Support Item is selected for the purposes of billing.</td></tr></tbody></table>

### Enabling Maica Managed Contact Sharing

Follow the steps below to configure your Salesforce org for Maica's Contact Sharing model.

{% hint style="info" %}
**Note**: Maica’s managed sharing applies to **Contact** records only. If your organisation requires managed sharing for other objects, this would need to be handled outside of the Maica package.
{% endhint %}

{% hint style="warning" %}
Contact records must be associated with an **Account** in order for sharing to apply.\
If a Contact does **not** have an Account, Salesforce will not apply any sharing rules—even if Maica Managed Sharing is enabled. This is a known Salesforce behaviour.

To fix this, either:

* Enable **Person Accounts** in your org, or
* Automatically assign a default Account to Contacts with no Account using a Flow (If you need help with this - please contact Maica Support).&#x20;
{% endhint %}

#### Step 1: Set Contact Sharing to Private

1. Go to **Setup** in Salesforce.
2. In the **Quick Find** box, search for and select **Sharing Settings**.
3. In the **Organisation-Wide Defaults** section:
   * Either select **Contacts** from the **Manage sharing settings for** dropdown, or
   * Click **Edit** and locate **Contact** in the list.
4. Set both **Internal Access** and **External Access** for **Contact** to **Private**.
5. Click **Save** if prompted.

{% hint style="info" %}
When the sharing model for Contacts is set to Private, a user can only see Contact records that they own or that are explicitly shared with them—either directly, via role hierarchy, manual sharing, sharing rules, or team access. This is the default and recommended setting for Maica.
{% endhint %}

{% hint style="warning" %}
Check the **Profiles that Override Contact Sharing** list. If any user profile has ticks here, those users will be able to view and modify all Contact records regardless of sharing settings. This may be appropriate for System Administrators, but **should not** be enabled for standard users.
{% endhint %}

#### Step 2: Enable Maica Managed Sharing

1. Navigate to **Maica Settings** in Salesforce.
2. Under the **General Settings** section, locate the **Maica Managed Sharing** setting (explained above).
3. Click **Edit**.
4. Toggle the setting **on**.
5. Click **Save**.

{% hint style="info" %}
**Note**: It may take a few minutes for any changes to take effect.
{% endhint %}

### Sharing Records

Contact sharing is managed via the **Resource Participants** object. In the example below, you can see that the Contact **Yuri Green** has been shared with this user:

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

To share another Contact:

1. Click **New** in the top-right corner of the **Resource Participants** section on the **Contact** record.
2. In the pop-up, select the appropriate **Resource** and **Contact**.
3. Set a **Start Date** for the access.
4. (Optional) Add an **End Date** if you want access to be removed automatically on a specific date. Most users will leave this blank.
5. Click **Save**.

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

Once saved, the selected Contact will be visible to the user associated with the Resource.\
For example, if you add Sarah Milne, that user will now have access to both Yuri Green and Sarah Milne’s records—along with any Contacts they own or that have been manually shared with them.
