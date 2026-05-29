# Alert Fields Reference

This page documents every field on an alert and the operators available in the condition builder. For an explanation of how alerts behave, start with the [Maica Alerts Overview](maica-alerts-overview.md). For step-by-step instructions, see [Creating and Managing Alerts](creating-and-managing-alerts.md).

## Message and content fields

These fields hold the alert text and its display options.

<table><thead><tr><th width="207.134765625">Field</th><th width="373.61328125">Description</th><th>Default</th></tr></thead><tbody><tr><td><strong>Message</strong></td><td>Plain text version of the alert. Used for <strong>Toast</strong> style alerts. Supports merge fields.</td><td>None</td></tr><tr><td><strong>Message Formatted</strong></td><td>Rich text version of the alert. Used as the body of inline <strong>Alert</strong> and <strong>Modal</strong> style alerts. Supports merge fields.</td><td>None</td></tr><tr><td><strong>Modal Title</strong></td><td>The heading shown at the top of a <strong>Modal</strong> style alert. Supports merge fields.</td><td>"Alert" if left blank</td></tr><tr><td><strong>Modal Button Label</strong></td><td>The label on the acknowledge button of a <strong>Modal</strong> style alert.</td><td><code>Acknowledge</code></td></tr><tr><td><strong>Display Created Date</strong></td><td>When ticked, the alert's creation date is shown in front of the message.</td><td>Off</td></tr></tbody></table>

{% hint style="info" %}
Merge fields use the syntax `{!FieldApiName}`, for example `{!Name}`. They resolve against the record the alert is displayed on.&#x20;
{% endhint %}

{% hint style="warning" %}
**Display Created Date** does not apply to **Modal** style alerts. For inline and toast alerts, the formatted date is added to the start of the message.
{% endhint %}

## Display fields

These fields control how the alert looks and behaves on screen.

| Field       | Description                           | Options                                   | Default              |
| ----------- | ------------------------------------- | ----------------------------------------- | -------------------- |
| **Style**   | How the alert is presented.           | `Alert` (inline banner), `Toast`, `Modal` | None                 |
| **Variant** | The colour and tone of the alert.     | `Info`, `Warning`, `Error`, `Success`     | `Info` if left blank |
| **Mode**    | Whether the user can close the alert. | `Dismissible`, `Sticky`                   | None                 |

{% hint style="info" %}
For inline **Alert** style messages, a close button appears only when **Mode** is `Dismissible`. For **Toast** style messages, a blank Mode behaves as `Dismissible`.
{% endhint %}

## Targeting fields

These fields control which records show the alert and who sees it.

| Field                | Description                                                                                                               | Default                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Target Object**    | The object whose records can display the alert.                                                                           | None                          |
| **Target Record Id** | Limits the alert to a single record. Blank means the alert applies to every record of the Target Object.                  | None (applies to all records) |
| **Profiles**         | Restricts the alert to users with one or more selected profiles. Blank means all profiles see the alert.                  | None (all profiles)           |
| **Group**            | Pairs the alert with an Alerts component that has a matching Group value. Blank pairs with a component that has no Group. | None                          |

{% hint style="info" %}
**Target Object** and **Target Record Id** are normally set for you. The **Manage Alerts** tab creates alerts with no record target (object-level), while the **Manage Alerts** quick action sets the target to the current record.
{% endhint %}

## Scheduling and status fields

These fields control when an alert is active.

| Field          | Description                                                                                                  | Default |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------- |
| **Active**     | Whether the alert is eligible to display. Only active alerts appear.                                         | On      |
| **Start Date** | The first date the alert displays. Blank means no start bound.                                               | None    |
| **End Date**   | The last date the alert displays. Once it passes, the alert is treated as expired. Blank means no end bound. | None    |

{% hint style="success" %}
To pause an alert without losing it, untick **Active**. To schedule one in advance, set a future **Start Date**.
{% endhint %}

## Condition field

| Field         | Description                                                                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Condition** | An optional advanced filter that decides whether the alert is relevant to the specific record being viewed. Built with the condition builder rather than entered by hand. |

When a **Condition** is set, the alert displays only if the record being viewed matches it. A blank Condition means the alert always displays (subject to the other targeting rules).

### Condition builder

The condition builder lets you assemble a filter without writing a query:

* **Add Criteria** adds a field criterion: choose a field, an operator, and a value.
* **Add Criteria Logic** appears once you have more than one criterion, letting you combine them with `AND` and `OR` (for example, `1 AND (2 OR 3)`).
* **Remove All** clears all criteria at once.
* A **related-records filter** can require that the record has, or does not have, matching child records.

### Operators

The operators offered depend on the field type.

<table><thead><tr><th width="216.55859375">Operator</th><th>Applies to</th></tr></thead><tbody><tr><td><strong>equals</strong></td><td>All field types</td></tr><tr><td><strong>not equal to</strong></td><td>All field types</td></tr><tr><td><strong>less than</strong></td><td>Number and date fields</td></tr><tr><td><strong>less or equal</strong></td><td>Number and date fields</td></tr><tr><td><strong>greater than</strong></td><td>Number and date fields</td></tr><tr><td><strong>greater or equal</strong></td><td>Number and date fields</td></tr><tr><td><strong>contains</strong></td><td>Text fields</td></tr><tr><td><strong>does not contain</strong></td><td>Text fields</td></tr><tr><td><strong>starts with</strong></td><td>Text fields</td></tr><tr><td><strong>ends with</strong></td><td>Text fields</td></tr></tbody></table>

{% hint style="info" %}
Text-style fields offer the full set of operators, numeric and date fields add the comparison operators, and simple fields such as checkboxes use **equals** and **not equal to**.
{% endhint %}

## Record name

Each alert is automatically given a name in the format `ALERT - 0000000`. You do not need to enter this; Salesforce assigns it when the alert is created.
