# connecting

Maica Forms can push form submissions directly into Salesforce and pull data from your org to pre-fill fields. To enable this, you connect your Salesforce account once — and that connection is then available across all your forms and document templates.

## How the Connection Works

Each user has one Salesforce connection. When you connect, you authorise Maica Forms to access your Salesforce org on your behalf using OAuth. Your credentials are never stored — only the access and refresh tokens that Salesforce issues.

Your connection is private to your account. Other users who log in to Maica Forms connect their own Salesforce account separately.

## Connecting Your Salesforce Account

1. From the dashboard or any form builder page, click **Connect Salesforce**
2. You will be redirected to the Salesforce login page
3. Log in with your Salesforce credentials (or if already logged in, you will see a permissions screen)
4. Click **Allow** to grant Maica Forms access
5. You will be redirected back to Maica Forms with a confirmation message

Once connected, your org name is displayed wherever the connection status appears.

## What Connecting Unlocks

| Feature                                                | Requires connection? |
| ------------------------------------------------------ | -------------------- |
| Map form fields to Salesforce objects                  | Yes                  |
| Show Salesforce related records in a form field        | Yes                  |
| Pre-fill form fields from a Salesforce record          | Yes                  |
| Automatically create/update records on form submission | Yes                  |
| Invoke a Salesforce Flow on submission                 | Yes                  |
| Use merge fields in document templates                 | Yes                  |
| Generate documents from Salesforce button clicks       | Yes                  |

Forms that do not need any Salesforce integration work without a connection.

## Connection Status

You can check whether you are currently connected by looking at the **Salesforce** section in the form builder sidebar. It will show:

* **Connected** — your org name and instance URL
* **Not connected** — a button to connect

## Token Refresh

Salesforce access tokens expire periodically. Maica Forms automatically uses your refresh token to get a new access token in the background. You should not need to reconnect unless you revoke access in Salesforce directly.

If the connection stops working (you see Salesforce errors on submission or in the form builder), disconnect and reconnect to get fresh tokens.

## Authorisation Scope

Maica Forms requests the following Salesforce permission scopes:

* **api** — Read and write Salesforce records
* **refresh\_token** — Keep the connection alive without re-logging in
* **offline\_access** — Allow access when you are not actively using the app

No broader permissions (such as admin or manage users) are requested.
