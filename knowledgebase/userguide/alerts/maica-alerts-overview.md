# Maica Alerts Overview

{% hint style="info" %}
**Maica Alerts** is an optional extension to Maica, delivered as a separate managed package rather than part of the standard installation. To enable it in your org, please contact a member of the Maica team to discuss adding it to your environment.
{% endhint %}

**Maica Alerts** lets you display configurable Alert messages on Lightning record pages within Maica. An Alert can appear as an inline banner, a pop-up toast, or a modal dialog that the user must acknowledge, and it can be targeted at every record of an object or at a single specific record.

Alerts are useful whenever you need to surface important context directly on a record, for example a compliance reminder on every Participant, a hold notice on one specific Account, or a warning that only appears when a record meets certain criteria.

{% hint style="success" %}
Maica Alerts can be used with any standard or custom object, not only **Maica** objects.
{% endhint %}

## Where do I find Maica Alerts?

There are two parts to Maica Alerts: the **Alerts component** that displays messages, and the **Manage Alerts** screens where the messages are created.

### The Alerts component

The **Alerts** component is what renders your alerts on a record. An administrator adds it to a Lightning record page using the Lightning App Builder, usually near the top of the page so it is seen immediately.

The component has a single configuration property, **Group**, which is described in [Groups](maica-alerts-overview.md#groups) below.

### The Manage Alerts screens

Alerts are created and maintained in one of two places, depending on whether the alert applies org-wide or to a single record:

1. The **Manage Alerts** tab, found in the **Maica Alerts** app, is used to manage alerts that apply to every record of an object.
2. The **Manage Alerts** quick action, available on a record, is used to manage alerts that apply only to that one record.

Both are covered step by step in [Creating and Managing Alerts](creating-and-managing-alerts.md).

## How an Alert is displayed

When the Alerts component loads on a record, Maica looks for active alerts that match the record, then displays each one according to its **Style**. An alert is shown only when all of the following are true:

* The alert is **Active**.
* The alert's **Target Object** matches the object you are viewing.
* Today's date falls within the alert's **Start Date** and **End Date** (either can be left blank to remove that bound).
* The alert's **Profiles** field is blank, or includes the profile of the user viewing the record.
* The alert's **Target Record Id** is blank, or matches the record you are viewing.
* The alert's **Group** matches the Group set on the component (see [Groups](maica-alerts-overview.md#groups)).
* The alert's **Condition**, if one is set, is met by the record (see [Conditions](maica-alerts-overview.md#conditions)).

### Alert styles

The **Style** field controls how the message appears.

<table><thead><tr><th width="139.0439453125">Style</th><th>How it appears</th><th>Typical use</th></tr></thead><tbody><tr><td><strong>Alert</strong></td><td>An inline banner rendered directly inside the Alerts component on the page.</td><td>A persistent notice that should always be visible on the record.</td></tr><tr><td><strong>Toast</strong></td><td>A standard Salesforce toast notification.</td><td>A lighter, transient message.</td></tr><tr><td><strong>Modal</strong></td><td>A pop-up dialog with a title, message, and an acknowledge button.</td><td>A message the user must see and dismiss before continuing.</td></tr></tbody></table>

{% hint style="warning" %}
Only one active **Modal** alert is allowed per record (per Target Object and Target Record combination). If you try to create a second, Maica asks you to consolidate the message into the existing Modal alert instead.
{% endhint %}

### Variants

The **Variant** field sets the colour and tone of the alert. The available variants are **Info**, **Warning**, **Error**, and **Success**. If no variant is selected, the alert defaults to **Info**.

### Dismissible and sticky alerts

The **Mode** field controls whether the user can close the alert.

* **Dismissible** alerts show a close button so the user can hide them.
* **Sticky** alerts remain in place and cannot be closed.

{% hint style="info" %}
For inline **Alert** style messages, the close button only appears when the Mode is **Dismissible**. For **Toast** style messages, an unset Mode behaves as Dismissible.
{% endhint %}

## Targeting Alerts

### Object-level and record-level alerts

Every alert has a **Target Object**, and an optional **Target Record Id**.

* When **Target Record Id** is left blank, the alert applies to _every_ record of the Target Object. These are managed from the **Manage Alerts** tab.
* When **Target Record Id** is set, the alert applies to _that one record only_. These are managed from the **Manage Alerts** quick action on the record itself.

### Restricting by profile

The **Profiles** field lets you limit who sees an alert. If you select one or more profiles, only users with a matching profile see the alert. Leaving the field blank shows the alert to all profiles.

### Scheduling with start and end dates

Use **Start Date** and **End Date** to schedule when an alert is visible. The alert displays only on and between these dates. Either date can be left blank to leave that side of the window open. Once an alert's End Date has passed, it is treated as **expired** and moves into a separate Expired list on the Manage Alerts screen.

### Groups

The **Group** field works together with the **Group** property on the Alerts component, allowing more than one set of alerts on the same page.

* An Alerts component with a **Group** value shows only alerts whose **Group** field matches that value.
* An Alerts component with no Group value shows only alerts that have no Group set.

{% hint style="success" %}
Groups are useful when you place more than one Alerts component on a page and want each to show a different set of messages.
{% endhint %}

## Conditions

A **Condition** is an optional advanced filter that decides whether an alert is relevant to the specific record being viewed. When a condition is set, Maica checks the record against it and only displays the alert if the record matches.

Conditions are built with a point-and-click builder rather than written by hand. You can:

* Add one or more **field criteria** on the target record (for example, Status equals Active).
* Combine criteria using **criteria logic** with `AND` and `OR` when you have more than one.
* Add a **related-records filter** that checks whether the record has, or does not have, matching child records.

The operators available depend on the field type, and include equals, not equal to, less than, less or equal, greater than, greater or equal, contains, does not contain, starts with, and ends with.

{% hint style="info" %}
For a field-by-field breakdown of every setting on an alert, including the condition builder.
{% endhint %}

## Personalising the message with merge fields

Alert messages support merge fields so you can pull values from the record into the text. Write a field's API name inside `{!` and `}`, for example `{!Name}` or `{!Phone}`. When the alert is displayed, Maica replaces each merge field with the value from the record being viewed.

Merge fields work in the plain text **Message**, the rich text **Message Formatted** body, and the **Modal Title**.

{% hint style="warning" %}
Merge fields resolve against fields on the target record. Make sure the field API name you reference exists on the Target Object, or the merge field will not resolve to a value.
{% endhint %}

## Who can manage Alerts?

Access to Maica Alerts is granted through two permission sets.

<table><thead><tr><th width="169.859375">Permission set</th><th>Grants</th></tr></thead><tbody><tr><td><strong>Alerts Admin</strong></td><td>Access to the global <strong>Manage Alerts</strong> tab and the ability to create org-wide, object-level alerts.</td></tr><tr><td><strong>Alerts General</strong></td><td>Access to the Alert object, its fields, and the underlying functionality used by the Manage Alerts screens.</td></tr></tbody></table>

{% hint style="info" %}
System Administrators can always access the global **Manage Alerts** tab. Other users need the **Alerts Admin** permission set to manage org-wide alerts.
{% endhint %}
