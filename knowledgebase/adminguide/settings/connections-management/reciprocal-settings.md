---
description: Learn about Reciprocal Connections Management Settings in Maica
---

# Reciprocal Settings

This section allows you to define how Reciprocal Connections should behave. When a user creates a Connection on a Contact, Maica will reference this table to determine what the reciprocal Connection should be—depending on whether the Contact's gender is identified as Male, Female, or Neutral.

Each row represents a type of Connection and how it is reciprocated based on gender.

Please refer to the below table for more information on each column in the Reciprocal Settings, and the information below to learn how to create a new Reciprocal Setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Active</code></td><td>Determines whether the Connection record is active and available to users. Only active Connections will appear when creating new relationships.</td></tr><tr><td><code>Name</code></td><td>The primary Connection name selected when creating a Connection from a Contact.</td></tr><tr><td><code>Male</code></td><td>The reciprocal Connection that will be generated if the Contact’s gender is classified as Male.</td></tr><tr><td><code>Female</code></td><td>The reciprocal Connection that will be generated if the Contact’s gender is classified as Female.</td></tr><tr><td><code>Neutral</code></td><td>The reciprocal Connection that will be generated if the Contact’s gender is classified as Neutral or is not set.</td></tr></tbody></table>

**How to Add a New Reciprocal Setting**

To add a new Connection type:

1. Scroll to the bottom of the Reciprocal Settings table.
2. Click the **+ Add Reciprocal Setting** button.
3. In the new row that appears:
   * Enter a name in the **Name** column (e.g. "Uncle").
   * Specify the **Male**, **Female**, and **Neutral** reciprocal terms (e.g. "Nephew", "Niece", "Sibling's Child").
4. Ensure the **Active** checkbox is ticked if you want this setting to be used by Maica.
5. Click outside the input fields to save the new row automatically.

{% hint style="info" %}
Note, you can also edit any existing reciprocal setting by clicking into the text fields directly. Use the trash can icon on the right to remove a row if needed.
{% endhint %}

#### Example: How Maica Creates Reciprocal Connections

The following example illustrates how Maica automatically creates a reciprocal connection based on the configured settings:

Let's say a [Connection](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/participants/participant-profile#connections) record is created for a Contact named **Bryce**. The Related Contact selected is **Emma**, and the Type selected is **Son**.

{% hint style="info" %}
Note, this record is created from the [Connections](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/participants/participant-profile#connections) Related List on the Contact profile
{% endhint %}

When the record is saved, Maica uses the _Reciprocal Settings_ and _Gender Field_ mappings to determine the appropriate reciprocal relationship.

* The reciprocal value for **Son**, as configured in the Reciprocal Settings, could be:
  * **Father** if the Related Contact is Male
  * **Mother** if the Related Contact is Female
  * **Parent** if the Related Contact is Neutral or has no specified gender

Since **Emma** has a Gender field value of **Woman**, and "Woman" is mapped to the Female category in the Gender Settings, Maica creates a reciprocal Connection where:

* The Contact is **Emma**&#x20;
* The Related Contact is **Bryce**&#x20;
* The Type is set to **Mother**

{% hint style="info" %}
If Emma's gender had not been defined or was not mapped to either Male or Female, the reciprocal Connection would have used the Neutral value, resulting in a Type of **Parent**.
{% endhint %}
