---
description: Learn about Timesheet Management Settings in Maica
---

# Timesheet Management

These settings determine how Maica manages Timesheets and their function throughout the application. Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Enable Timesheet Generation</code></td><td>This enables Maica to generate timesheets when either Appointments or Shifts are completed. This setting works in conjunction with the <code>Enable Timesheets</code> attribute on the Resource profile.</td></tr><tr><td><code>Timesheet Entry Reference</code></td><td>This determines which date and time from the Appointment or Shift will be used when Timesheet Entries are being generated.</td></tr><tr><td><code>Frequency Option</code></td><td><p>This determines the frequency of timesheet pay period based on the Anchor Date described below. The available options are:<br></p><ul><li><strong>Weekly</strong> (7 days)</li><li><strong>Fortnightly</strong> (14 days)</li><li><strong>Monthly</strong> (from Anchor Date to the day before the next Anchor Date)</li></ul></td></tr><tr><td><code>Timesheet Anchor Date</code></td><td>This is a configurable start date that determines when the first pay period begins.</td></tr></tbody></table>

{% hint style="info" %}
Timesheet Start and End Dates are dynamically calculated based on:

* The selected Frequency.
* The configured Anchor Date.

All automation that creates Timesheets (including Timesheet Entry creation on completed Appointments/Shifts and batch processes) reference this new configuration.
{% endhint %}

{% hint style="warning" %}
If settings are updated and an open Timesheet exists:

* A new Timesheet may be created where required to align with the new period configuration.
* Existing Timesheets are not retroactively modified.
* Submitted Timesheets are not modified.
{% endhint %}

{% hint style="success" %}
For Monthly frequency:

* The Anchor Date defines the start of each monthly cycle.
* Dates greater than the 28th are not supported to avoid irregular monthly edge cases
{% endhint %}

#### Example Scenarios&#x20;

**Frequency = Weekly:**

* ✅ Timesheet duration is 7 days starting from the Anchor Date.

**Frequency = Fortnightly:**

* ✅ Timesheet duration is 14 days starting from the Anchor Date.

**Frequency = Monthly:**

* ✅ Timesheet duration runs from the Anchor Date to the day before the next Anchor Date, applying calendar month logic.

**Frequency or Anchor Date is updated while an open Timesheet exists:**

* ✅ A new Open Timesheet is created where required to align with the new configuration.
* ✅ Submitted Timesheets are not modified.

### Timesheet Entry Text Format

Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Text Format</code></td><td><p>The Maica Timesheet Management console allows you to specify what text appears in the cells of Timesheet Entries.</p><p></p><p>This settings defines this by using a formula-based approach in which you can configure exactly what you want the text to be. This includes the merging of record attributes as well as your own text.</p></td></tr></tbody></table>

### Appearance Settings

Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Non-billable Colour</code></td><td>This determines the cell colour of any non-billable Timesheet Entries, in other words, Timesheet Entries not associated with an Appointment or Shift.</td></tr><tr><td><code>Billable Colour</code></td><td>This determines the cell colour of any billable Timesheet Entries, in other words, Timesheet Entries associated with an Appointment or Shift.</td></tr><tr><td><code>Appointment Colour</code></td><td>In cases where the Timesheet Generation is disabled, the Maica Timesheet Management console shows all completed Appointments or Shifts which can then manually converted to a Timesheet Entry.<br><br>This setting determines which colour will be used when showing either Appointments or Shifts in the Maica Timesheet Management console.</td></tr><tr><td><code>Appointment Break Indicator Colour</code></td><td>The Maica Timesheet Management console shows Appointment/Shift breaks and this setting determines what colour will be used when displayed.</td></tr><tr><td><code>Travel Colour</code></td><td>The Maica Timesheet Management console shows Travel (associated with an Appointment or Shift) and this setting determines what colour will be used when displayed.</td></tr></tbody></table>
