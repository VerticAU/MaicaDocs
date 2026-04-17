---
description: Learn how to adjust the Appearance and Styling of your Form
---

# Appearance

Every form can be fully styled to match your brand. Appearance settings are found in the form builder under **Settings → Appearance**.

## Logo

<table><thead><tr><th width="209.869140625">Setting</th><th>Description</th></tr></thead><tbody><tr><td><strong>Logo URL</strong></td><td>A publicly accessible URL for your logo image (PNG or SVG recommended)</td></tr><tr><td><strong>Logo scale</strong></td><td>Size as a percentage of the default (0–200%). 100% is the default size.</td></tr><tr><td><strong>Logo alignment</strong></td><td>Left, centre, or right</td></tr></tbody></table>

{% hint style="success" %}
The logo appears at the top of the public form page, above the form title.
{% endhint %}

## Layout Mode

| Mode                    | Description                                       |
| ----------------------- | ------------------------------------------------- |
| **Single page**         | All sections on one scrollable page               |
| **Wizard (multi-step)** | One section per step, with Next / Back navigation |

{% hint style="info" %}
Use wizard mode for longer forms or when you want to reduce the sense of length and guide respondents step by step.
{% endhint %}

## Colours

Each colour has a colour picker and accepts a hex code.

<table><thead><tr><th width="256.8564453125">Setting</th><th>What it controls</th></tr></thead><tbody><tr><td><strong>Primary colour</strong></td><td>Buttons, focus rings, links, checkbox/radio accent</td></tr><tr><td><strong>Form card background</strong></td><td>The white card area behind the fields</td></tr><tr><td><strong>Page background</strong></td><td>The area behind the form card</td></tr><tr><td><strong>Title colour</strong></td><td>The form title and section headings</td></tr><tr><td><strong>Label colour</strong></td><td>Field label text</td></tr><tr><td><strong>Body text colour</strong></td><td>Help text, paragraph text, descriptions</td></tr><tr><td><strong>Input border colour</strong></td><td>The border around text inputs, dropdowns, etc.</td></tr></tbody></table>

{% hint style="info" %}
Input background and placeholder colours are derived automatically from the form card background colour to ensure readable contrast. You do not need to set these separately.
{% endhint %}

## Typography

| Setting         | Description                                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Font family** | The typeface used throughout the form. Options include common system fonts and Google Fonts such as Poppins, Inter, and Roboto. |

{% hint style="success" %}
The selected font applies to all text in the form including labels, help text, options, and the submit button.
{% endhint %}

## Submit Button

| Setting                | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| **Submit button text** | The label on the final submit button (default: "Submit") |

{% hint style="info" %}
In wizard mode, this text appears on the final step. Intermediate steps use "Next" and "Back" automatically.
{% endhint %}

## Border Radius

A slider that controls how rounded the corners of inputs, buttons, and cards appear.

* **0** — Square corners
* **4–8** — Slightly rounded (professional look)
* **16+** — Pill-shaped, more casual/friendly feel

## Custom CSS

You can inject your own CSS to override any style in the form. This is for advanced users comfortable with CSS.

The CSS is injected inside a `<style>` tag on the public form page. It applies only to this form, not to the builder UI.

**Example — remove the card shadow:**

```css
.form-card { box-shadow: none; }
```

## Custom HTML

You can add raw HTML content before or after the form. Use this for:

* A custom header or footer
* Legal disclaimers
* Tracking pixels or analytics tags
* Embedded media

HTML is injected directly into the page, so standard HTML/CSS/JS is supported.

## Previewing Appearance

The canvas in the form builder updates in real time as you change appearance settings. You can also open the public form URL in another tab to see exactly what respondents will see.
