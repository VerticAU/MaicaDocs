# managing access

The **Admin panel** controls who can log in to Maica Forms. Access is managed through an **Allowed Identities** list. Only users on this list (or in an allowed domain) can sign in — everyone else is denied.

The Admin panel is accessible at **forms.maica.com.au/admin**. It is only visible to designated administrators.

***

## Types of Allowed Identities

| Type       | Example                  | Effect                                              |
| ---------- | ------------------------ | --------------------------------------------------- |
| **Email**  | `jane.smith@company.com` | Allows that specific email address to log in        |
| **Domain** | `company.com`            | Allows anyone with a `@company.com` email to log in |

Domain entries are useful for onboarding an entire team without adding each person individually.

***

## Adding a New Identity

{% stepper %}
{% step %}
### Navigate to Allowed Identities

Navigate to **Admin → Allowed Identities**
{% endstep %}

{% step %}
### Add the identity

In the **Add Identity** form at the top:

* Select type: **Email** or **Domain**
* Enter the email address or domain name
* Optionally add a **note** (e.g. the client or team name) for your reference
{% endstep %}

{% step %}
### Save

Click **+ Add**

The identity is immediately active — the person can log in straight away.
{% endstep %}
{% endstepper %}

***

## Viewing Existing Identities

The identities table shows all current allowed identities:

| Column                      | Description                       |
| --------------------------- | --------------------------------- |
| **Type**                    | Email or Domain badge             |
| **Value**                   | The email address or domain       |
| **Note**                    | Your internal note or client name |
| **Max Published Forms**     | Usage limit (∞ if blank)          |
| **Max Published Templates** | Usage limit (∞ if blank)          |
| **Max Monthly Envelopes**   | Usage limit (∞ if blank)          |
| **Delete**                  | Remove this identity              |

***

## Setting Usage Limits

You can set per-identity limits to control how much of the platform each user or team can use.

| Limit                       | What it controls                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Max Published Forms**     | Maximum number of forms this identity can have in "Published" status at the same time |
| **Max Published Templates** | Maximum number of document templates in "Published" status                            |
| **Max Monthly Envelopes**   | Maximum number of e-signature envelopes that can be sent in a calendar month          |

A blank limit (shown as ∞) means unlimited.

### Editing a Limit

{% stepper %}
{% step %}
### Click the limit cell

Click the cell in the limit column you want to change
{% endstep %}

{% step %}
### Edit the value

The cell becomes an editable input

Type the new limit (or clear it for unlimited)
{% endstep %}

{% step %}
### Save or cancel

Press **Enter** to save, or click outside to cancel
{% endstep %}
{% endstepper %}

***

## Removing an Identity

Click the **✕** button in the delete column next to the identity you want to remove. The removal takes effect immediately — the user will not be able to log in again until re-added.

If the user is currently logged in, their existing session continues until it expires or they sign out. Removing an identity does not forcibly sign anyone out.

***

## Admin Emails (Super-Admins)

In addition to the database-driven allowed identities list, a set of **admin email addresses** is configured via an environment variable (`ADMIN_EMAILS`). These addresses:

* Always have access, regardless of the allowed identities list
* Have full access to the Admin panel
* Are not affected by usage limits

Contact your infrastructure administrator (or the person managing the Terraform configuration) to add or remove super-admin email addresses. This change requires a Terraform apply and ECS redeployment.

***

## Access Request Workflow

If a user attempts to log in with an email that is not on the allowed list, they can submit an **access request**. Administrators will see pending requests in the Admin panel's **Access Requests** tab.

From there, administrators can:

* **Approve** — the email is automatically added to allowed identities
* **Reject** — the request is declined and logged for audit purposes

Approved requests create an email-type identity with no usage limits by default. Limits can be set afterwards.
