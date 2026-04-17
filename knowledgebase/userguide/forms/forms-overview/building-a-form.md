---
description: Learn how to Build a Form within Maica's Form Builder
---

# Building a Form

The form builder is split into three areas:

* **Canvas** (centre) — a live preview of the form as respondents will see it
* **Add Fields panel** (left) — a palette of field types to drag or click into the form
* **Settings panel** (right) — configuration for the selected field, section, or the form overall

***

## Sections

Every form is organised into one or more **sections**. A section is a named group of fields — think of it as a heading or a "page" of questions.

### Adding a Section

* Click **+ Add Section** at the bottom of the canvas, or
* Drag a section from the left panel

Every new form starts with one default section.

### Section Settings

Select a section header to see its settings on the right:

| Setting              | Description                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Title**            | The heading shown above the section's fields                                                                     |
| **Description**      | Optional explanatory text shown below the heading                                                                |
| **Collapsible**      | If enabled, respondents can expand/collapse the section                                                          |
| **Default expanded** | Whether a collapsible section starts open or closed                                                              |
| **Conditions**       | Show or hide the entire section based on answers to other fields (see [Conditional Logic](conditional-logic.md)) |

### Reordering Sections

Drag the **⠿ handle** on the left of the section header to move it up or down.

### Deleting a Section

Click the **trash icon** on the section header. All fields inside the section are also deleted.

***

## Managing Fields

### Adding&#x20;

To add a field to a section:

**Option A — Click to add:** Click a field type in the left panel. It is added to the bottom of the currently active section.

**Option B — Drag to position:** Drag a field type from the left panel and drop it at a specific position within a section.

***

### Reordering&#x20;

Drag the **⠿ handle** on the left side of any field card to move it within the section, or to a different section entirely.

***

### Deleting&#x20;

Click the **trash icon** on the field card in the canvas.

***

### Duplicating&#x20;

Click the **duplicate icon** on a field card to create an identical copy directly below it.

***

### Configuring a Field

Click any field in the canvas to open its settings in the right panel. Settings are grouped into tabs:

| Tab            | Contents                                               |
| -------------- | ------------------------------------------------------ |
| **General**    | Label, placeholder, help text, required toggle         |
| **Validation** | Type-specific rules (min/max length, patterns, ranges) |
| **Logic**      | Conditional show/hide rules for this field             |
| **Salesforce** | Map this field to a Salesforce object and field        |

{% hint style="info" %}
See [Field Settings and Validation](field-types-and-settings.md) for full details.
{% endhint %}

***

## Form Layout Modes

In **Settings → Appearance**, you choose how the sections are presented to respondents:

| Mode                    | Behaviour                                                |
| ----------------------- | -------------------------------------------------------- |
| **Single page**         | All sections appear on one scrollable page               |
| **Wizard (multi-step)** | Each section is a separate step with Next / Back buttons |

Wizard mode is recommended for longer forms where you want to guide respondents through the process.

***

## Saving Changes

The form builder **auto-saves** changes as you work. You do not need to click a save button. The last-saved time is shown at the top of the builder.

Changes are saved to the draft. They do not go live until you publish (or re-publish) the form.
