# salesforce integration

Maica Forms can automatically create or update Salesforce records when a form is submitted. This requires a [Salesforce connection](file:///1414204/salesforce/connecting.md).

## Overview

Salesforce integration in Maica Forms works in three ways, from most recommended to legacy:

| Mode                  | Best for                                                                 |
| --------------------- | ------------------------------------------------------------------------ |
| **Action Chain**      | Most use cases — supports multiple objects, flows, and related records   |
| **Flow Invocation**   | When your logic already lives in a Salesforce Flow                       |
| **Per-field mapping** | Simple single-object forms (legacy, no longer the default for new forms) |

## Action Chain (Recommended)

An **action chain** is an ordered list of steps that are executed in sequence every time a form is submitted. Each step can depend on values from the steps before it.

### Enabling Action Chain Sync

1. In the form builder, go to **Settings → Salesforce**
2. Enable the **Sync to Salesforce** toggle
3. Select **Action Chain** as the sync mode
4. Click **+ Add action**

### Action Step Types

| Step type                   | What it does                                                                 |
| --------------------------- | ---------------------------------------------------------------------------- |
| **Create record**           | Creates a new Salesforce record in the specified object                      |
| **Update record**           | Updates an existing record (by record ID or match criteria)                  |
| **Invoke Flow**             | Calls a Salesforce Flow and passes form data as input variables              |
| **Create junction records** | For SF Related List fields — creates a record linking two Salesforce objects |

### Mapping Form Fields to Salesforce Fields

For each step, you map the Salesforce fields you want to set. Each mapping has:

* **Salesforce field** — which field on the object to populate
* **Value type** — where the value comes from:

| Value type           | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| **Form field**       | The value the respondent entered in a specific form field      |
| **Static value**     | A fixed value you type in (e.g. a record type, a status value) |
| **Lookup field**     | The ID of a record created in a previous action step           |
| **Current date**     | Today's date (formatted as YYYY-MM-DD)                         |
| **Current datetime** | The current date and time at the moment of submission          |

### Using Values from Previous Steps

If an earlier step creates a Contact and you need the new Contact's ID in a later step, use **Lookup field** and select the step that created the Contact.

This chaining allows you to, for example:

1. Create a Contact from the respondent's details
2. Create an Opportunity linked to that Contact
3. Invoke a Flow to send a welcome email using the new Opportunity ID

### Activity / Task Creation

Each action step can optionally create a Salesforce **Task** (Activity) after the main operation:

| Setting              | Description                                   |
| -------------------- | --------------------------------------------- |
| **Create activity**  | Toggle on/off                                 |
| **Subject**          | The task subject line                         |
| **Auto-description** | A generated description using submission data |

## Flow Invocation

If you have existing Salesforce Flows that process new intake data, you can invoke them directly.

1. In **Settings → Salesforce**, select **Invoke Flow** as the sync mode
2. Choose the Flow from the dropdown (all active Flows in your org are listed)
3. Map each form field to a Flow input variable

The Flow receives the form data as input variables and executes in Salesforce. The submission status is updated to **Synced** when the Flow completes successfully.

## Per-Field Mapping (Legacy)

For simple forms that create a single Salesforce record, per-field mapping is the easiest option.

1. Select each form field in the builder
2. Open the **Salesforce** tab in the field settings
3. Choose the **Salesforce object** (e.g. Contact, Account, Lead)
4. Choose the **Salesforce field** (e.g. Email, LastName, Phone)

On submission, all mapped fields are grouped by object. One record is created per unique object you have mapped fields to.

**Upsert mode:** If enabled, the system searches for an existing record matching a key field (e.g. Email on Contact) before creating. If found, the existing record is updated instead.

## Pre-filling Fields from Salesforce

Individual fields can be pre-filled with data from a Salesforce record. This is useful when the form is launched from a Salesforce context (e.g. a button on a Contact record).

In the field's **Salesforce** tab:

* Set the **Salesforce object** and **Salesforce field**
* Enable **Pre-fill from Salesforce record**

The record ID must be passed in the URL as a query parameter (e.g. `?recordId=003...`).

## Submission Sync Status

Each form submission has a **Salesforce sync status**:

| Status      | Meaning                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| **Pending** | Submission received, sync not yet attempted                               |
| **Synced**  | All action steps completed successfully                                   |
| **Failed**  | One or more steps failed — check the submission detail for error messages |

You can view sync status in the **Submissions** view for each form. Failed submissions can be inspected to understand what went wrong (e.g. a validation error in Salesforce, a missing required field).

## Related List Field and Junction Records

The **SF Related List** field type (see [Field Types](../../forms-overview/field-types-and-settings.md)) allows respondents to select from Salesforce records. When they make a selection and submit:

1. The form submission is saved
2. For each selected record, a **junction object record** is created in Salesforce linking the primary record (created by an earlier action step) to the selected record

This is useful for scenarios like:

* Selecting which support plans a client is enrolled in
* Choosing team members to assign to a project
* Picking related products or services

Configure which junction object to use, and which lookup fields point to each side of the relationship, in the field's settings.
