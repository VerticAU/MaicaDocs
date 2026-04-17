---
description: Learn about Conditional Logic within Maica Forms
---

# Conditional Logic

Conditional logic lets you show or hide fields and sections based on how the respondent answers other questions. This keeps forms focused — respondents only see what is relevant to them.

## Where Logic Can Be Applied

* **On a field** — Show or hide this field based on answers elsewhere in the form
* **On a section** — Show or hide the entire section based on answers elsewhere in the form

## Setting Up a Condition

{% stepper %}
{% step %}
Select the field or section you want to conditionally show/hide
{% endstep %}

{% step %}
Open the **Logic** tab in the right-hand settings panel
{% endstep %}

{% step %}
Click **+ Add condition**
{% endstep %}

{% step %}
Choose:

* **Which field** to watch (the trigger field)
* **Which operator** to use
* **Which value** to compare against (if required)
{% endstep %}

{% step %}
Choose whether **all** conditions must be true (AND) or **any** can be true (OR)
{% endstep %}
{% endstepper %}

## Operators

<table><thead><tr><th>Operator</th><th width="388.90234375">Meaning</th><th>Requires a value?</th></tr></thead><tbody><tr><td><strong>Equals</strong></td><td>The field's value exactly matches</td><td>Yes</td></tr><tr><td><strong>Does not equal</strong></td><td>The field's value does not match</td><td>Yes</td></tr><tr><td><strong>Contains</strong></td><td>The field's value includes the given text</td><td>Yes</td></tr><tr><td><strong>Does not contain</strong></td><td>The field's value does not include the given text</td><td>Yes</td></tr><tr><td><strong>Is not empty</strong></td><td>The field has any value at all</td><td>No</td></tr><tr><td><strong>Is empty</strong></td><td>The field has no value</td><td>No</td></tr><tr><td><strong>Greater than</strong></td><td>Numeric value is greater than (for number fields)</td><td>Yes</td></tr><tr><td><strong>Less than</strong></td><td>Numeric value is less than (for number fields)</td><td>Yes</td></tr></tbody></table>

## AND vs OR Logic

When you have multiple conditions on a single field or section:

* **All conditions must be true (AND)** — The field/section appears only when every condition is satisfied simultaneously
* **Any condition can be true (OR)** — The field/section appears when at least one condition is satisfied

## Default Visibility

By default, a field or section is **visible** until a condition hides it. If you add conditions, the field starts hidden and only appears when the conditions are met.

If you want the opposite (show by default, hide on a specific answer), you can use a **Does not equal** or **Is empty** condition.

## Conditions and Wizard Mode

In wizard (multi-step) mode, conditional logic still works across sections — a field in step 3 can be shown or hidden based on an answer from step 1. However, sections themselves can also be conditionally hidden, which means they are skipped entirely in the wizard flow.

{% hint style="success" %}
**Helpful Tips**

* You can only reference fields that appear **before** the current field or section in the form order. Forward references are not supported.
* Conditions on sections apply to the whole section — you cannot partially show a section's fields based on conditions.
* Hidden fields are not submitted. If a field is hidden by logic when the form is submitted, its value is not included in the submission data and will not be sent to Salesforce.
{% endhint %}
