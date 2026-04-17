# Viewing Submissions

Every response submitted through a published form is saved as a **submission**. You can view, inspect, and track the sync status of submissions from within Maica Forms.

***

## Accessing Submissions

1. Open the form in the builder
2. Click the **Submissions** tab at the top of the builder (or navigate from the form list)

The submissions list shows all responses for that form.

***

## Submissions Table

Each row in the table represents one submission:

<table><thead><tr><th width="209.8740234375">Column</th><th>Description</th></tr></thead><tbody><tr><td><strong>Reference</strong></td><td>A unique 8-character reference number (e.g. <code>A7BX3K2Q</code>). Respondents may quote this.</td></tr><tr><td><strong>Submitted</strong></td><td>Date and time the response was received</td></tr><tr><td><strong>Status</strong></td><td>Salesforce sync status (see below)</td></tr><tr><td><strong>Summary</strong></td><td>A brief preview of key field values</td></tr></tbody></table>

Click any row to open the full submission detail.

***

## Submission Detail

The detail view shows:

* All field values as submitted (in the original section/field order)
* The reference number and submission timestamp
* IP address (for spam/fraud review if needed)
* Salesforce sync status and any error messages

***

## Sync Status

If the form has Salesforce integration enabled, each submission shows a sync status:

| Status      | Meaning                                                                           |
| ----------- | --------------------------------------------------------------------------------- |
| **Pending** | Received; sync has not yet been attempted or is in progress                       |
| **Synced**  | All action steps completed. Salesforce records were created/updated successfully. |
| **Failed**  | One or more action steps failed. The error message is shown in the detail view.   |

### If a Submission Failed to Sync

1. Open the submission detail
2. Read the error message (e.g. "Required field missing in Salesforce", "Invalid picklist value")
3. Fix the root cause (update the form mapping or the Salesforce configuration)
4. Re-submit manually, or contact your administrator for bulk reprocessing

Submission data is never lost on sync failure — the respondent's answers are always saved regardless of whether the Salesforce sync succeeds.

***

## Submission Reference Numbers

Each submission is assigned a random 8-character alphanumeric reference number at the moment of submission. This number is:

* Shown on the confirmation screen (if enabled)
* Included in notification emails
* Stored in the submission record
* Optionally written to a Salesforce field via action chain mapping

Respondents can use this reference number when contacting your team about their submission.

***

## Downloading Submissions

Bulk export of submissions (CSV) is not currently available in the UI. Contact your administrator if you need to export submission data.

***

## Submission Spam and Rate Limiting

Submissions rejected by spam protection (honeypot triggered or rate limit exceeded) are not saved and do not appear in the submissions list. This is by design — bot submissions are silently dropped.
