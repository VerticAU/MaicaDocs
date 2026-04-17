# submission settings

Submission settings control what happens immediately after a respondent submits your form. They are found in the form builder under **Settings → Submissions**.

## Confirmation Experience

Choose what the respondent sees after a successful submission.

### Option A — Confirmation Message (default)

The form is replaced with a thank-you screen.

| Setting                     | Description                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| **Success title**           | The heading shown on the confirmation screen (e.g. "Thanks for your response!")                  |
| **Success message**         | A paragraph of text below the heading                                                            |
| **Show reference number**   | Display the unique submission reference number (e.g. `REF-A7BX3K2Q`) so respondents can quote it |
| **Show submission summary** | Repeat the respondent's answers back to them on the confirmation screen                          |

### Option B — Redirect URL

Instead of showing a confirmation screen, redirect the respondent to another URL immediately after submission (e.g. your website, a booking page, or a custom landing page).

Enter the full URL including `https://`.

## Email Notifications

### Notify the Form Owner

Send an email to a designated address each time a new submission arrives.

| Setting                        | Description                                          |
| ------------------------------ | ---------------------------------------------------- |
| **Enable owner notification**  | Toggle on/off                                        |
| **Notification email address** | Where to send the alert (defaults to your own email) |

The notification email includes the submission reference number and a summary of all field values.

### Notify the Respondent

Send a confirmation receipt email to the person who submitted the form.

| Setting                            | Description                                                                            |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| **Enable respondent notification** | Toggle on/off                                                                          |
| **Email field**                    | Which form field contains the respondent's email address (must be an Email field type) |
| **Email subject**                  | Subject line of the confirmation email                                                 |
| **Email message**                  | Body content of the confirmation email                                                 |

## Spam Protection

### Honeypot Field

A hidden field invisible to humans but typically filled in by bots. If this field contains any value, the submission is silently accepted (to avoid alerting the bot) but discarded — it is not saved.

Enable this if you are receiving bot submissions. It has no visible impact on the form for real respondents.

### Rate Limiting

| Setting                             | Description                                                                                                                     |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Max submissions per IP per hour** | After this many submissions from the same IP address within one hour, further attempts are rejected with an error. Default: 10. |

### Submission Cap

| Setting                       | Description                                                                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maximum total submissions** | Once the form has received this many submissions, it stops accepting new ones. The public page shows a "closed" message. Leave blank for unlimited. |

This is useful for event registrations or limited-availability forms.

## Contact Email for Errors

If the form encounters a technical error during submission (e.g. a Salesforce sync failure), respondents are shown a generic error page with an option to report it. Set the contact email here so they know where to reach you.

## Salesforce Sync Settings

See [Salesforce Integration](/broken/pages/2cab9d689f5a8e6f2054810b77acee177f48b551) for full details on mapping form submissions to Salesforce records.
