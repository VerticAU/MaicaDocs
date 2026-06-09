---
description: Learn about the Administration side of Meet Me within Maica
---

# Meet Me Administration

This article covers ongoing administration of Meet Me: model management, enabling and disabling the feature, privacy and security, AI behaviour, and performance.

For initial setup and custom object configuration, see [Meet Me Configuration](meet-me-configuration.md).

***

### Managing the Gemini Model

The `AI Model` field accepts any valid Gemini model API name. The default and recommended model is `gemini-2.5-flash`.

Model names change over time. We recommend reviewing Google's published deprecation schedule periodically.

{% hint style="info" %}
If a model is deprecated and the setting is not updated, summary generation will fail with an error. Use the **Test Connection** button to confirm whether the current model is valid. If users report consistent errors after a period of normal operation, check Google AI Studio for any deprecation notices.&#x20;
{% endhint %}

***

### Disabling Meet Me

<table><thead><tr><th width="209.087890625">Scope</th><th>How</th></tr></thead><tbody><tr><td><strong>Organisation-wide</strong></td><td>Toggle <code>AI Enabled</code> off in Meet Me Settings. The summary component shows a configuration message rather than generating summaries. All settings (API key, model, custom object configs) are preserved</td></tr><tr><td><strong>Specific users</strong></td><td>Remove the Meet Me permission set assignment</td></tr></tbody></table>

***

### Privacy and Data Handling

#### What Data Leaves Salesforce

When a summary is generated, a structured text payload is sent to Google's Gemini API via HTTPS. This payload includes:

* Participant Note text (up to the character limit per Note)
* Appointment dates, types, statuses, and cancellation reasons
* Goal names, stages, and progress notes
* Delivery Activity records (type, date, outcome)
* Service Agreement names, Support Categories, and status
* Agreement Item names and key fields
* Any fields from custom objects the administrator has configured

#### What is Explicitly Excluded

The following are stripped from the payload before it leaves Maica:

* Participant name
* NDIS number
* Date of birth
* Phone number
* Email address
* Any fields not explicitly selected for inclusion

{% hint style="info" %}
These exclusions are enforced in the Apex data layer. They are not configurable and cannot be accidentally included.
{% endhint %}

#### Google's Data Handling

Google's data handling for the AI Studio API is governed by Google's API terms of service and applicable privacy policies. Organisations should be aware:

* Data sent to the Gemini API may be used by Google to improve their models, unless data processing settings are configured otherwise in your Google AI Studio account
* Care organisations should review Google's current privacy terms for the AI Studio API and determine whether an enterprise API tier (which may offer stronger data isolation) is required under their privacy obligations
* The API key belongs to the organisation. The administrator is responsible for its security and for understanding the terms of the account under which it operates

#### Australian Privacy Principles (APP)

Organisations operating under the Australian Privacy Act should consider whether sending Participant data to a third-party AI service constitutes a disclosure of personal information. While Meet Me excludes direct identifiers, the combination of clinical and care data may still constitute personal information depending on context.

Recommended actions:

* Review your organisation's Privacy Policy to determine if it covers AI-assisted processing of Participant data
* Consider updating your Service Agreement with Participants to disclose that de-identified care information may be processed by a third-party AI service for the purpose of generating care summaries
* Speak with your legal counsel or privacy officer regarding your organisation's specific obligations

{% hint style="warning" %}
This is not legal advice. Each organisation's obligations will depend on their specific circumstances and applicable law.&#x20;
{% endhint %}

#### API Key Security

The Google AI Studio API key is stored in Maica's configuration settings as a Protected Custom Setting. It is not exposed in the UI after saving, not logged anywhere in the system, and not included in error messages. Access is restricted by the Meet Me permission set.

Treat the API key like a password:

* Do not share it
* Do not paste it into emails or documents
* Rotate it periodically, or immediately if you suspect it has been compromised
* Keys can be revoked and replaced in Google AI Studio at any time

***

### AI Behaviour and Limitations

#### What the AI Will and Won't Do

The AI model is given explicit instructions designed to keep summaries practical and safe for a care context.

| The AI is instructed to                                         | The AI is instructed to avoid                                                |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Summarise only what the provided data shows                     | Phrases expressing uncertainty (e.g. "I think", "it seems like", "possibly") |
| Write in plain, professional English for a care worker handover | Recommendations or clinical opinions                                         |
| Omit sections where no relevant data exists                     | Information not present in the provided data                                 |
| Avoid speculation, interpretation, and clinical language        | Commentary on the clinical appropriateness of medications or treatments      |

Summaries containing uncertainty phrases are automatically rejected and regenerated.

{% hint style="info" %}
Because Meet Me uses a generative AI model, two summaries generated for the same Participant with the same data may be worded differently. The content should be substantively the same, but phrasing will vary.
{% endhint %}

#### Retry Behaviour

The system automatically retries under the following conditions:

| Condition                                | Retry                              |
| ---------------------------------------- | ---------------------------------- |
| Gemini API timeout                       | One retry                          |
| Gemini API server error                  | One retry                          |
| Generated summary exceeds the word limit | One retry with adjusted parameters |

If the issue persists after one retry, an error state is shown to the user.

***

### Volume, Performance, and Cost

Meet Me generates one summary per page load (or on demand via the refresh button). Each generation uses approximately one Gemini API call.

#### Salesforce Governor Limits

Each summary generation uses:

* Up to 17 SOQL queries (7 standard objects plus up to 10 custom objects). Well within Salesforce's 100-query limit
* One HTTP callout. Counts toward Salesforce's callout limits

#### Managing Cost

Google bills based on the number of tokens in the prompt and response. Administrators can reduce per-summary cost by:

* Reducing the default date range (7 or 14 days rather than 60)
* Disabling data sections that are less relevant (via the care worker settings panel)
* Reducing volume caps on custom object configurations
* Using **Short** as the default summary type

Organisations with large Participant numbers should monitor Google AI Studio usage dashboards to understand API consumption and cost.

***

### Frequently Asked Questions

<details>

<summary><strong>Can Meet Me be enabled for some users but not others?</strong></summary>

Yes. The `AI Enabled` toggle controls the feature organisation-wide. For user-level control, use the Meet Me permission set - remove it from users who should not have access.

</details>

<details>

<summary><strong>What happens if the API key expires or is revoked?</strong> </summary>

Users will see an error state on the summary component. The error message indicates a connection failure. Update the API key in Meet Me Settings and test the connection.

</details>

<details>

<summary><strong>Is Participant data retained by Google after the API call?</strong> </summary>

Google's data retention policy for the Gemini API depends on the account type and usage tier. Review Google AI Studio's data terms and, if required by your privacy obligations, consider upgrading to a tier with explicit data retention controls.

</details>

<details>

<summary><strong>What does the display label for a custom object control?</strong></summary>

The display label is used as the section heading in the AI prompt (e.g. "Medications"). The AI uses this label to understand the context of the data, and it determines how the section heading appears in the generated summary. Choose labels that are plain, meaningful English.

</details>

<details>

<summary><strong>How many custom objects can be active at once?</strong> </summary>

A maximum of 10 active custom objects at any one time. Inactive configurations remain saved and can be re-activated later.

</details>

<details>

<summary><strong>What happens if a custom object's fields change?</strong> </summary>

&#x20;If a field included in a custom object configuration is deleted or renamed in Salesforce, that field will be silently skipped at query time. The rest of the object's fields will still be included. No error is shown to the care worker - the relevant data simply won't appear. Review custom object configurations after any schema changes.

</details>

&#x20;
