---
description: Learn about Forms within Maica
---

# Forms Overview

{% hint style="info" %}
**Please note.** Maica Forms is currently in **Beta**. The product is live and supported, but features are still being refined and may change.
{% endhint %}

Maica Forms is a web application for building and publishing data collection forms that connect directly to Salesforce. It lives at **forms.maica.com.au** and covers the complete lifecycle from form design through to submission handling and Salesforce record creation.

A **form** in Maica Forms is a publicly accessible web page where people can fill out and submit information. You design the form in the builder, publish it, and share the link — respondents do not need a login.

***

## What You Can Do

**Build forms** — Create multi-section forms with a wide range of field types, conditional logic, custom styling, and your own branding.

**Publish and share** — Publish a form to a public URL that anyone can fill out without needing a login. Embed the link anywhere.

**Connect to Salesforce** — Map form fields to Salesforce objects so that every submission automatically creates or updates records in your org.

**Manage submissions** — View and track all form responses from within the app.

## Form Lifecycle

```
Draft → Published → Collecting Submissions → (Archived or deleted)
```

<table><thead><tr><th width="133.5751953125">State</th><th>Meaning</th></tr></thead><tbody><tr><td><strong>Draft</strong></td><td>Only visible to you in the builder. The public URL returns a "not found" page.</td></tr><tr><td><strong>Published</strong></td><td>Accessible at its public URL. Submissions are accepted.</td></tr></tbody></table>

A form stays published until you manually set it back to draft or delete it.

***

## What a Form Contains

Each form has:

* **Title** and optional **description** — shown to respondents at the top of the form
* **Sections** — groups of related fields (like pages or categories)
* **Fields** — the questions and input controls within each section
* **Appearance settings** — colours, fonts, logo, and layout
* **Submission settings** — what happens after someone submits (confirmation message, email notifications, Salesforce sync)

***

## Key Concepts

| Term                 | Meaning                                                                                   |
| -------------------- | ----------------------------------------------------------------------------------------- |
| **Form**             | A user-facing questionnaire that collects data                                            |
| **Section**          | A group of fields within a form (like a page or category)                                 |
| **Slug**             | The unique URL path for a published form, e.g. `/f/new-client-intake`                     |
| **Submission**       | A completed form response from a respondent                                               |
| **Allowed Identity** | An email address or domain that is permitted to log in to the app                         |
| **SF Connection**    | Your personal link between Maica Forms and a Salesforce org                               |
| **Action Chain**     | An ordered set of steps that create or update Salesforce records when a form is submitted |

***

## Public Form URL

When you publish a form, it gets a **slug** — a short, human-readable identifier that becomes part of the URL:

```
https://forms.maica.com.au/f/your-form-slug
```

You set the slug yourself (or accept the auto-generated one). Once the form is published you cannot change the slug, as it would break any links you have already shared.

***

## Ownership and Collaboration

A form belongs to the user who created it. You can add **collaborators** (other Maica Forms users by email) who can view and edit the form alongside you.

{% hint style="info" %}
Contact your Maica administrator if you cannot log in or need access granted for your team
{% endhint %}

