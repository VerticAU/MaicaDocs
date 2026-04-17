---
description: Learn how to Publish your Form in Maica
---

# Publishing

Once your form is ready, publish it to make it publicly accessible and start receiving submissions.

## Setting the Slug

The **slug** is the short identifier that appears in your form's public URL:

```
https://forms.maica.com.au/f/your-slug-here
```

### Rules

* Must be unique across all forms in the system
* Can only contain lowercase letters, numbers, and hyphens
* Auto-generated from the form title when the form is first created (e.g. "New Client Intake" → `new-client-intake`)
* **Can be changed while the form is in draft status**
* **Cannot be changed after the form is published** — changing the slug would break any links already shared

Set the slug in **Settings → General → Slug** before publishing.

## Publishing Your Form

1. Open the form in the builder
2. Review your form in the canvas (or open the preview in a new tab)
3. Click **Publish** in the top-right corner of the builder
4. The status changes from **Draft** to **Published**
5. Your form is now live at its public URL

When you publish, a **version snapshot** is automatically saved (recording the schema, the publisher's name, and the timestamp).

## Making Changes After Publishing

You can continue to edit a published form. Changes auto-save to the draft state. The live form continues to show the last published version until you publish again.

To push changes live:

1. Make your edits in the builder
2. Click **Publish** again

A new version snapshot is created each time you publish.

{% hint style="warning" %}
**Important:** If you add, remove, or rename fields after a form has already collected submissions, be aware that earlier submissions will not have data for new fields, and any removed fields' data will still be in older submissions.
{% endhint %}

## Unpublishing

To take a form offline without deleting it:

1. Open the form in the builder
2. Go to **Settings → General**
3. Change status from **Published** to **Draft**
4. Save

The public URL will immediately return a "form not found" page. Existing submissions are preserved.

## Sharing the Form

Once published, share the URL directly:

```
https://forms.maica.com.au/f/your-slug
```

You can embed this link in:

* Emails and email signatures
* Salesforce emails and templates
* Your website
* QR codes
* Salesforce Experience Cloud pages

No login is required for respondents.

## Closing a Form (Submission Cap)

If you want a form to automatically stop accepting submissions after a set number of responses, configure the **Maximum total submissions** in **Settings → Submissions**.

Once the cap is reached, the public form page shows a closed message. The form remains published — it just stops accepting new submissions. You can raise or remove the cap at any time.

## Embedding in Salesforce

Forms can be launched from Salesforce in two ways:

1. **Link** — Add a hyperlink to any email template, component, or button that opens the form URL
2. **Button with record context** — Pass a `?recordId=` parameter in the URL so the form can pre-fill fields with Salesforce record data

Example URL for a Salesforce button that passes the current record ID:

```
https://forms.maica.com.au/f/my-form?recordId={!Contact.Id}
```

Replace `{!Contact.Id}` with the relevant merge field for your Salesforce object.
