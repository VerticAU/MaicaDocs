---
description: Learn how to configure Meet Me within the Maica Settings
---

# Meet Me Configuration

This article covers the initial setup of Meet Me, including prerequisites, API key configuration, and custom object setup.

For ongoing administration, privacy obligations, and performance management, see [Meet Me Administration.](meet-me-administration.md)

***

### Prerequisites

Before setting up Meet Me, you will need:

<table><thead><tr><th width="271.9345703125">Requirement</th><th>Notes</th></tr></thead><tbody><tr><td><strong>A Google AI Studio API key</strong></td><td>Free to start. Sign up at <a href="https://aistudio.google.com">aistudio.google.com</a> and generate a key in the API Keys section. Usage beyond the free tier is billed to the Google account that owns the key</td></tr><tr><td><strong>The Meet Me permission set</strong></td><td>Assigned to any users who need access to the summary or the admin settings. Covers field-level access to the AI configuration fields on the Settings object</td></tr><tr><td><strong>The Meet Me Settings tab</strong></td><td>Available in the Maica Admin app navigation</td></tr></tbody></table>

***

### Initial Configuration

#### Step 1 - Open Meet Me Settings

Navigate to the Maica Admin app and open the **Meet Me Settings** tab.

#### Step 2 - Enter your API Key

Paste your Google AI Studio API key into the `API Key` field. The key is stored securely in Maica's configuration settings and is never displayed back in plain text after saving.

#### Step 3 - Choose a Model (Optional)

The `AI Model` field defaults to `gemini-2.5-flash` if left blank. This is a high-capability, fast, and cost-efficient model suitable for production use.

To use a different Gemini model, enter the model API name (available from the Google AI Studio documentation). If unsure, leave this blank.

#### Step 4 - Test the Connection

Before enabling Meet Me for your users, click **Test Connection**. This makes a minimal call to Gemini using the key and model you've entered and confirms they are valid. A success message means Meet Me is ready to activate.

#### Step 5 - Enable Meet Me

Toggle the `AI Enabled` switch on. Once enabled, the `aiParticipantSummary` component on the `Contact` record page will begin generating summaries for users with the Meet Me permission set.

***

### Custom Object Configuration

Meet Me can include data from custom objects in your Salesforce org, beyond the standard Maica data types. This is configured exclusively by the administrator and is not visible or adjustable by care workers.

#### When to Use

Use custom objects when your organisation tracks Participant-relevant information in custom Salesforce objects that isn't captured in the standard Maica data model. Common examples include Medications, Risk Assessments, Behaviour Support Plans, and Clinical Notes.

#### Object Requirements

For a custom object to be supported, it must meet the following requirements:

<table><thead><tr><th width="296.099609375">Requirement</th><th>Detail</th></tr></thead><tbody><tr><td><strong>Direct relationship to Contact</strong></td><td>A Lookup or Master-Detail field to <code>Contact</code>. Indirect relationships (via intermediate objects) are not supported in v1</td></tr><tr><td><strong>Supported field types</strong></td><td><code>Text</code>, <code>Number</code>, <code>Date</code>, <code>Checkbox</code>, <code>Picklist</code>, <code>Currency</code>, <code>Percent</code>, <code>TextArea</code></td></tr><tr><td><strong>Unsupported field types</strong></td><td>Formula fields and lookups to other objects are not included</td></tr></tbody></table>

#### Configuring a Custom Object

1. In the **Custom Objects** section of Meet Me Settings, click **Discover Objects**. This scans your org for queryable custom objects. Objects already configured will show their existing settings.
2. Click **Configure** on an object to open its settings panel:

<table><thead><tr><th width="221.28515625">Field</th><th>Description</th></tr></thead><tbody><tr><td><strong>Display label</strong></td><td>The heading that appears in the AI prompt for this object's section (e.g. "Medications"). Use meaningful, plain English - this is what the AI sees</td></tr><tr><td><strong>Contact lookup field</strong></td><td>The field on this object that relates it to <code>Contact</code>. Used to filter records to the current Participant</td></tr><tr><td><strong>Included fields</strong></td><td>The fields to send to Gemini. Only selected fields are included. Start with the most relevant - more is not always better</td></tr><tr><td><strong>Date filter field</strong></td><td>Optional. A date or datetime field to filter records by (e.g. only medications prescribed within the last 60 days). Leave blank to include all records regardless of date</td></tr><tr><td><strong>Volume cap</strong></td><td>Maximum records per Participant to include. Default is 10. Use a lower cap for objects with many records per Participant (e.g. daily activity logs)</td></tr></tbody></table>

3. Use the **Active** toggle to enable or disable the configuration. Inactive configs remain saved but are not queried at summary time.
4. Click **Save Custom Objects** to apply changes.

{% hint style="info" %}
Configuration is saved via the Salesforce Metadata API, which is asynchronous. Changes typically take 5 to 10 seconds to propagate. Refresh the page before testing if summaries don't immediately reflect a change.
{% endhint %}

#### Limits

<table><thead><tr><th width="244.869140625">Limit</th><th>Detail</th></tr></thead><tbody><tr><td><strong>Active custom objects</strong></td><td>Maximum of 10 at any one time. This protects against Salesforce governor limit consumption</td></tr><tr><td><strong>Volume per object</strong></td><td>Default 10 records, configurable per object</td></tr></tbody></table>

{% hint style="info" %}
If a field included in a custom object configuration is deleted or renamed in Salesforce, that field will be silently skipped at query time. The rest of the object's fields will still be included, but the affected data will not appear in summaries. Review custom object configurations after any org schema changes.&#x20;
{% endhint %}

***

### Supported Salesforce Objects Reference

| Object                         | What is queried                                                                    | Max records                                | Date range filter applies? |
| ------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------ | -------------------------- |
| **Participant Notes**          | Note text (up to 500 chars each), date, Note type                                  | 5                                          | Yes                        |
| **Appointments**               | Appointment type, status, date, cancellation reason, Delivery Activity (sub-query) | 20                                         | Yes                        |
| **Participant Goals**          | Goal name, stage, progress notes                                                   | 10                                         | No (all active Goals)      |
| **Delivery Activity** (direct) | Activity type, outcome, date                                                       | 20                                         | Yes                        |
| **Schedule**                   | Schedule name, frequency (linked via Appointments)                                 | Included with Appointments                 | Via Appointments           |
| **Service Agreements**         | Agreement name, Support Category, status                                           | 5                                          | No (active agreements)     |
| **Agreement Items**            | Item name, key fields                                                              | 10                                         | No                         |
| **Custom objects**             | Admin-configured                                                                   | 10 types × admin-set cap (default 10 each) | Optional per config        |
