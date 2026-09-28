---
description: Configure the settings that control how Maica creates and manages Timesheets
---

# Timesheet Management

These settings determine how Maica manages Timesheets and their function throughout the application. Please refer to the below table for more information on each setting:

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Enable Timesheet Generation</code></td><td>This enables Maica to generate timesheets when either Appointments or Shifts are completed. This setting works in conjunction with the <code>Enable Timesheets</code> attribute on the Resource profile.</td></tr><tr><td><code>Timesheet Entry Reference</code></td><td>This determines which date and time from the Appointment or Shift will be used when Timesheet Entries are being generated.</td></tr><tr><td><code>Frequency Option</code></td><td><p>This determines the frequency of timesheet pay period based on the Anchor Date described below. The available options are:<br></p><ul><li><strong>Weekly</strong> (7 days)</li><li><strong>Fortnightly</strong> (14 days)</li><li><strong>Monthly</strong> (from Anchor Date to the day before the next Anchor Date)</li></ul></td></tr><tr><td><code>Timesheet Anchor Date</code></td><td><p>The start date of any one of your pay periods. Maica repeats the selected Frequency forwards and backwards from this date to work out every pay period.</p><p>For <strong>Weekly</strong> and <strong>Fortnightly</strong> frequencies, choose a pay period start date <strong>in the past</strong>, earlier than any date your organisation will record work against. See <a href="timesheet-management.md#choosing-a-timesheet-anchor-date">Choosing a Timesheet Anchor Date</a> below.</p></td></tr></tbody></table>

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

### Choosing a Timesheet Anchor Date

For **Weekly** and **Fortnightly** frequencies, the Anchor Date does not need to be the start of your _first_ or _next_ pay period. Because the periods repeat, any past pay period start date gives exactly the same pay periods as a recent one.

Maica only calculates pay periods correctly for dates **on or after** the Anchor Date. To avoid this limitation entirely, set the Anchor Date to a pay period start that is:

1. **In the past**, never a future date such as your next pay run.
2. **Earlier than any work you will record**, including backdated Timesheet Entries and historical Appointments or Shifts. A date before your organisation started using Maica is ideal.
3. **A real pay period start date**, so the periods line up with your payroll.

For example, if one of your pay fortnights starts on **Monday 5 October 2026**, you can count back a whole number of fortnights and use **Monday 6 October 2025** (26 fortnights earlier). Count back further if your organisation has work recorded in Maica before that date.

{% hint style="danger" %}
Do not set a Weekly or Fortnightly Anchor Date in the future. A Timesheet Entry dated before the Anchor Date can be placed in the wrong pay period, and a new Timesheet may start after the date of the work it contains.
{% endhint %}

{% hint style="warning" %}
If you use the **Fortnightly** frequency, always set an Anchor Date. Without one, Maica starts each period at the beginning of the week containing the date being checked, so fortnights do not follow a consistent pay cycle.
{% endhint %}

#### Example Scenarios

**Frequency = Weekly:**

* ✅ Timesheet duration is 7 days, repeating every 7 days from the Anchor Date.

**Frequency = Fortnightly:**

* ✅ Timesheet duration is 14 days, repeating every 14 days from the Anchor Date.
* ✅ With an Anchor Date of Monday 6 October 2025, a Timesheet Entry on Friday 11 September 2026 falls in the period Monday 7 September 2026 to Sunday 20 September 2026.

**Frequency = Monthly:**

* ✅ Timesheet duration runs from the Anchor Date to the day before the next Anchor Date, applying calendar month logic.

**Frequency or Anchor Date is updated while an open Timesheet exists:**

* ✅ A new Open Timesheet is created where required to align with the new configuration.
* ✅ Submitted Timesheets are not modified.

### Timesheet Entry Text Format

Please refer to the below table for more information on each setting:

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Text Format</code></td><td><p>The Maica Timesheet Management console allows you to specify what text appears in the cells of Timesheet Entries.</p><p>This settings defines this by using a formula-based approach in which you can configure exactly what you want the text to be. This includes the merging of record attributes as well as your own text.</p></td></tr></tbody></table>

### Appearance Settings

Please refer to the below table for more information on each setting:

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Non-billable Colour</code></td><td>This determines the cell colour of any non-billable Timesheet Entries, in other words, Timesheet Entries not associated with an Appointment or Shift.</td></tr><tr><td><code>Billable Colour</code></td><td>This determines the cell colour of any billable Timesheet Entries, in other words, Timesheet Entries associated with an Appointment or Shift.</td></tr><tr><td><code>Appointment Colour</code></td><td>In cases where the Timesheet Generation is disabled, the Maica Timesheet Management console shows all completed Appointments or Shifts which can then manually converted to a Timesheet Entry.<br><br>This setting determines which colour will be used when showing either Appointments or Shifts in the Maica Timesheet Management console.</td></tr><tr><td><code>Appointment Break Indicator Colour</code></td><td>The Maica Timesheet Management console shows Appointment/Shift breaks and this setting determines what colour will be used when displayed.</td></tr><tr><td><code>Travel Colour</code></td><td>The Maica Timesheet Management console shows Travel (associated with an Appointment or Shift) and this setting determines what colour will be used when displayed.</td></tr></tbody></table>
