---
description: >-
  The below article details the available Field Types in Maica Forms, and the
  associated Settings
---

# Field Types & Settings

## Field Types

Maica Forms supports a wide range of field types. These are grouped into categories and detailed below.

<table><thead><tr><th width="192.9697265625">Category</th><th width="144.2021484375">Field Type</th><th>Description</th></tr></thead><tbody><tr><td><strong>Text and Input</strong></td><td><code>Text</code></td><td>A single-line text input for names, short answers, reference numbers, or any free-text response that fits on one line.</td></tr><tr><td><strong>Text and Input</strong></td><td><code>Long Text</code></td><td>A multi-line text area for comments, notes, descriptions, or anything that needs more space.</td></tr><tr><td><strong>Text and Input</strong></td><td><code>Email</code></td><td>A single-line input that validates email format. Use whenever you need an email address from the respondent.</td></tr><tr><td><strong>Text and Input</strong></td><td><code>Number</code></td><td>A numeric input with optional minimum and maximum values, integer-only mode, and maximum decimal places.</td></tr><tr><td><strong>Text and Input</strong></td><td><code>Phone</code></td><td>A single-line input for phone numbers, with optional pattern validation (e.g. Australian mobile format).</td></tr><tr><td><strong>Text and Input</strong></td><td><code>URL</code></td><td>A single-line input for web addresses, with an optional HTTPS-only setting.</td></tr><tr><td><strong>Text and Input</strong></td><td><code>Currency</code></td><td>A numeric input pre-formatted with a currency symbol. Use for fee amounts, quotes, or financial data.</td></tr><tr><td><strong>Date and Time</strong></td><td><code>Date</code></td><td>A date picker with optional range restrictions using fixed dates or relative values like today or tomorrow, and an optional weekdays-only setting.</td></tr><tr><td><strong>Date and Time</strong></td><td><code>Time</code></td><td>A time picker for hours and minutes.</td></tr><tr><td><strong>Date and Time</strong></td><td><code>Date &#x26; Time</code></td><td>A combined date and time picker in a single field.</td></tr><tr><td><strong>Choice</strong></td><td><code>Dropdown (Select)</code></td><td>A single-choice dropdown list. Good for long option lists.</td></tr><tr><td><strong>Choice</strong></td><td><code>Multi-Select</code></td><td>A dropdown that allows respondents to choose multiple options.</td></tr><tr><td><strong>Choice</strong></td><td><code>Radio Group</code></td><td>A set of radio buttons displayed vertically or horizontally. Best for 2-6 options where you want all choices visible at once.</td></tr><tr><td><strong>Choice</strong></td><td><code>Checkboxes</code></td><td>A list of checkboxes allowing multiple selections, with optional minimum and maximum selection limits.</td></tr><tr><td><strong>Choice</strong></td><td><code>Toggle</code></td><td>A single on/off switch returning true or false. Use for yes/no situations where a toggle is clearer than a checkbox.</td></tr><tr><td><strong>Choice</strong></td><td><code>Consent</code></td><td>A required checkbox with a customisable consent statement. The form cannot be submitted unless the checkbox is ticked.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>Address</code></td><td>A structured address block with separate sub-fields for street, city, state, postcode, and country.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>File Upload</code></td><td>Allows the respondent to attach a file. Useful for collecting documents, photos, or supporting evidence.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>Rating</code></td><td>A star-rating input. Default is 1-5 stars, with a configurable maximum.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>Slider</code></td><td>A range slider with a configurable minimum, maximum, and step value. Good for satisfaction scores or budget ranges.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>Signature</code></td><td>An embedded signature pad. The respondent signs with a mouse or finger, and the signature is stored as an image.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>Hidden</code></td><td>A field that is never shown to the respondent but is included in the submission data. Use to pass static values into the submission or Salesforce.</td></tr><tr><td><strong>Structured and Advanced</strong></td><td><code>Salesforce Related List</code></td><td>A table of related Salesforce records for the respondent to select from. Requires a Salesforce connection.</td></tr><tr><td><strong>Layout and Display</strong></td><td><code>Heading</code></td><td>A heading (H2, H3, or H4) inside a section. Use to break a long section into sub-groups.</td></tr><tr><td><strong>Layout and Display</strong></td><td><code>Paragraph</code></td><td>A block of static text. Use for instructions, explanations, or context.</td></tr><tr><td><strong>Layout and Display</strong></td><td><code>Content Block (Rich Text)</code></td><td>A formatted HTML block supporting bold, italic, lists, links, and more. Use for more complex explanatory content.</td></tr><tr><td><strong>Layout and Display</strong></td><td><code>Divider</code></td><td>A horizontal rule. Use to visually separate groups of fields within a section.</td></tr><tr><td><strong>Layout and Display</strong></td><td><code>Image</code></td><td>Embeds an image by URL. Use for logos, diagrams, or supporting visuals.</td></tr></tbody></table>

## Field Settings

Click any field in the form builder canvas to open its settings in the right-hand panel. Settings are grouped into two tabs.

### General Tab

These settings are available on every field type.

<table><thead><tr><th width="196.9150390625">Setting</th><th>Description</th></tr></thead><tbody><tr><td><strong>Label</strong></td><td>The question or field name shown to the respondent</td></tr><tr><td><strong>Placeholder</strong></td><td>Light grey hint text inside the input (input fields only)</td></tr><tr><td><strong>Help text</strong></td><td>A short sentence shown below the field to guide the respondent</td></tr><tr><td><strong>Required</strong></td><td>If enabled, the form cannot be submitted without a value in this field</td></tr></tbody></table>

### Validation Tab

Validation rules depend on the field type. Only applicable rules are shown and these are further described below.&#x20;

#### Text and Long Text

<table><thead><tr><th width="270.6796875">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Minimum length</td><td>Reject if fewer than N characters</td></tr><tr><td>Maximum length</td><td>Reject if more than N characters</td></tr><tr><td>Custom pattern (regex)</td><td>Must match this regular expression</td></tr><tr><td>Custom error message</td><td>What the respondent sees when validation fails</td></tr><tr><td>Disable validation</td><td>Turn off all validation for this field</td></tr></tbody></table>

#### Email

<table><thead><tr><th width="226.197265625">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Minimum length</td><td>Minimum character count</td></tr><tr><td>Maximum length</td><td>Maximum character count</td></tr><tr><td>Allowed domains</td><td>Only accept addresses from these domains (e.g. <code>maica.com.au, vertic.com.au</code>)</td></tr><tr><td>Blocked domains</td><td>Reject addresses from these domains</td></tr><tr><td>Custom error message</td><td>Override the default validation message</td></tr></tbody></table>

#### Phone

<table><thead><tr><th width="253.4677734375">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Custom pattern (regex)</td><td>Validate against a phone format (e.g. Australian mobile: <code>^04\d{8}$</code>)</td></tr><tr><td>Custom error message</td><td>Message shown on pattern mismatch</td></tr></tbody></table>

#### Number and Currency

<table><thead><tr><th width="282.2421875">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Minimum value</td><td>Reject if less than this number</td></tr><tr><td>Maximum value</td><td>Reject if greater than this number</td></tr><tr><td>Must be whole number</td><td>Reject decimals</td></tr><tr><td>Maximum decimal places</td><td>Allow decimals but no more than N places</td></tr><tr><td>Custom error message</td><td>Override the default message</td></tr></tbody></table>

#### Date

<table><thead><tr><th width="236.6953125">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Minimum date</td><td>Reject dates before this date. Accepts: <code>today</code>, <code>tomorrow</code>, or a fixed date (YYYY-MM-DD)</td></tr><tr><td>Maximum date</td><td>Reject dates after this date. Same format as minimum date.</td></tr><tr><td>Weekdays only</td><td>Reject Saturdays and Sundays</td></tr><tr><td>Custom error message</td><td>Override the default message</td></tr></tbody></table>

#### URL

<table><thead><tr><th width="262.4619140625">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Must be HTTPS</td><td>Reject <code>http://</code> URLs</td></tr><tr><td>Custom error message</td><td>Override the default message</td></tr></tbody></table>

#### Checkboxes and Multi-Select

<table><thead><tr><th width="248.2041015625">Rule</th><th>Description</th></tr></thead><tbody><tr><td>Minimum selections</td><td>Respondent must choose at least N options</td></tr><tr><td>Maximum selections</td><td>Respondent may not choose more than N options</td></tr><tr><td>Custom error message</td><td>Override the default message</td></tr></tbody></table>

#### Dropdown, Radio, and Checkbox Options

For choice fields, options are entered as a **comma-separated** or **one-per-line** list in the **Options** field.

**Layout** controls whether options are displayed **vertically** (stacked) or **horizontally** (inline). Horizontal layout works best for short option lists.

#### Logic Tab

See [Conditional Logic](conditional-logic.md) for full details on showing and hiding fields based on other answers.

#### Salesforce Tab

See [Salesforce Integration](/broken/spaces/9selzjEx6KX7RYEawAVr/pages/dd163f826e957acd9b69764f6f7e2d9b435f0e12) for details on mapping fields to Salesforce objects.

#### Hidden Field Values

For **Hidden** fields, you set the value that will be submitted:

<table><thead><tr><th width="288.9951171875">Value type</th><th>Example use</th></tr></thead><tbody><tr><td>Static text</td><td>Pass a form identifier, campaign code, or source label</td></tr><tr><td>(future) Form field reference</td><td>Combine or pass through another field's value</td></tr></tbody></table>

Hidden fields appear in submissions and can be mapped to Salesforce fields.

#### Salesforce Related List Settings

For **SF Related List** fields (requires Salesforce connection):

<table><thead><tr><th width="221.34375">Setting</th><th>Description</th></tr></thead><tbody><tr><td><strong>Source object</strong></td><td>The Salesforce object to query child records from (e.g. Contact)</td></tr><tr><td><strong>Display fields</strong></td><td>Which fields to show as columns in the selection table</td></tr><tr><td><strong>Column labels</strong></td><td>Override the column header names</td></tr><tr><td><strong>Show column headers</strong></td><td>Toggle the header row on/off</td></tr><tr><td><strong>Filter (WHERE clause)</strong></td><td>SOQL WHERE expression to filter records (e.g. <code>Status__c = 'Active'</code>)</td></tr><tr><td><strong>Selection mode</strong></td><td>Single (radio) or Multiple (checkboxes)</td></tr><tr><td><strong>Related object</strong></td><td>Junction object to create when a selection is made</td></tr><tr><td><strong>Primary field</strong></td><td>Lookup field on the junction object pointing to the main record</td></tr><tr><td><strong>Selected field</strong></td><td>Lookup field on the junction object pointing to the selected record</td></tr><tr><td><strong>Linked action ID</strong></td><td>Which action step creates the primary record (for chaining)</td></tr><tr><td><strong>Additional fields</strong></td><td>Extra fields to set on the junction object (static, form field, lookup, date)</td></tr><tr><td><strong>Prevent duplicates</strong></td><td>Check a field for existing records before creating a new junction</td></tr></tbody></table>

{% hint style="info" %}
To learn more about the Salesforce Integration in Maica Forms, [click here](/broken/spaces/9selzjEx6KX7RYEawAVr/pages/dd163f826e957acd9b69764f6f7e2d9b435f0e12).&#x20;
{% endhint %}
