---
description: Learn about Validation Management Settings in Maica
---

# Validation Management

These settings determine how Maica manages Validation and its function throughout the application. Please refer to the below table for more information on each setting:&#x20;

{% hint style="warning" %}
Please note that the behaviour of the Settings below is interdependent. \
\
Please review each setting’s description carefully, then refer to the **Behaviour Matrix** and **Examples** sections at the bottom of this page to understand how these settings interact in different scenarios.
{% endhint %}

<table><thead><tr><th width="114.21875" data-type="number">Reference</th><th width="206.265625">Setting</th><th>Description</th></tr></thead><tbody><tr><td>1</td><td><code>Enforce Availability for Appointments /</code> <code>Shifts</code>  </td><td>This setting switches on (or off) the capability to enforce Resource Availability or Unavailability when creating or managing Appointments or Shifts. </td></tr><tr><td>2</td><td><code>Enforce Availability for Timesheets</code></td><td>This setting switches on (or off) the capability to enforce resource availability when creating or managing Timesheets. <br><br>This means, if the selected resources don't have an availability record for the time of the Timesheet, <strong>Maica</strong> will prevent the Timesheet from being created.</td></tr><tr><td>3</td><td><code>Availability Consideration</code></td><td><p>This toggle controls how Maica determines if a Resource is available when assigning them to appointments.</p><p><br><strong>ON</strong>: Maica will only consider Resources as available if they have an Availability record set up for that day.</p><p><br><strong>OFF</strong>: Maica assumes Resources are available by default unless an Unavailability record explicitly states otherwise.</p></td></tr><tr><td>4</td><td><code>Confirm Soft Unavailability</code> </td><td><p>When this setting is enabled, users must manually confirm any Resource marked as Unavailable with a Soft Unavailability record before proceeding with an Appointment or Shift. Within the <strong>Manage Appointment</strong> modal, clicking the Resource pill displaying an Unavailability warning confirms the user’s intent to assign that Resource despite the conflict.</p><p><br>If this setting is disabled, the Unavailability warning will still appear, but Users can proceed without confirmation.</p></td></tr></tbody></table>

### Validation Behaviour Matrix

<table><thead><tr><th width="72.3046875" align="center">1</th><th width="71.63671875" align="center">2</th><th width="68.1015625" align="center">3</th><th width="77.52734375" align="center">4</th><th>General Outcome</th></tr></thead><tbody><tr><td align="center">✅</td><td align="center">✅</td><td align="center">✅</td><td align="center">✅</td><td><strong>Strictest validation</strong> — Maica enforces Resource Availability and Unavailability across all areas. Only Resources with Availability records can be assigned. Hard Unavailability blocks entirely. Soft Unavailability must be manually confirmed before proceeding.</td></tr><tr><td align="center">✅</td><td align="center">✅</td><td align="center">✅</td><td align="center">❌</td><td><strong>Strict enforcement</strong> for both Appointments/Shifts and Timesheets. Only resources with Availability records can be assigned. Hard Unavailability blocks. Soft Unavailability shows a warning but does not require confirmation to proceed with Appointments/Shifts.</td></tr><tr><td align="center">✅</td><td align="center">✅</td><td align="center">❌</td><td align="center">✅</td><td><strong>Unavailability enforced.</strong> Hard Unavailability blocks. Soft Unavailability must be confirmed before proceeding. Resources without Availability records are assumed available unless marked Unavailable.</td></tr><tr><td align="center">✅</td><td align="center">✅</td><td align="center">❌</td><td align="center">❌</td><td><strong>Unavailability enforced.</strong> Hard Unavailability blocks. Soft Unavailability shows a warning only. Resources without Availability records are assumed available.</td></tr><tr><td align="center">✅</td><td align="center">❌</td><td align="center">✅</td><td align="center">✅</td><td><strong>Appointments/Shifts validated</strong> against Availability records. Hard Unavailability blocks. Soft Unavailability must be confirmed before proceeding. Timesheets are not enforced.</td></tr><tr><td align="center">✅</td><td align="center">❌</td><td align="center">✅</td><td align="center">❌</td><td><strong>Appointments/Shifts validated</strong> against Availability records. Hard Unavailability blocks. Soft Unavailability warning only. Timesheets are not enforced.</td></tr><tr><td align="center">✅</td><td align="center">❌</td><td align="center">❌</td><td align="center">✅</td><td><strong>Appointments/Shifts enforced.</strong> Hard Unavailability blocks. Soft Unavailability must be confirmed before proceeding. Availability records not required.</td></tr><tr><td align="center">✅</td><td align="center">❌</td><td align="center">❌</td><td align="center">❌</td><td><strong>Basic enforcement</strong> — Hard Unavailability blocks, but Soft Unavailability only shows a warning. Availability records not required.</td></tr><tr><td align="center">❌</td><td align="center">✅</td><td align="center">✅</td><td align="center">✅</td><td><strong>Availability enforced for timesheets only.</strong> Hard Unavailability blocks Timesheet creation. Appointments follow normal flow but Soft Unavailability must be confirmed before proceeding. Resources without Availability records can be assigned, but a warning will show as it is not enforced. </td></tr><tr><td align="center">❌</td><td align="center">✅</td><td align="center">✅</td><td align="center">❌</td><td><strong>Timesheets validated.</strong> Hard Unavailability blocks timesheet creation. Appointments follow normal flow with Soft Unavailability warnings only. Resources without Availability records can be assigned, but a warning will show as it is not enforced. </td></tr><tr><td align="center">❌</td><td align="center">✅</td><td align="center">❌</td><td align="center">✅</td><td><strong>Timesheets validated.</strong> Hard Unavailability blocks timesheet creation. Appointments assume resources available unless marked Unavailable, but Soft Unavailability must be confirmed.</td></tr><tr><td align="center">❌</td><td align="center">✅</td><td align="center">❌</td><td align="center">❌</td><td><strong>Timesheets validated.</strong> Hard Unavailability blocks timesheet creation. Appointments assume all resources available; Soft Unavailability shows warnings only.</td></tr><tr><td align="center">❌</td><td align="center">❌</td><td align="center">✅</td><td align="center">✅</td><td><strong>No enforcement, but Availability is considered</strong> for Appointments or Shifts (warning shown when no Availability exists). Hard Unavailability shows a warning only. Soft Unavailability must be confirmed before proceeding.</td></tr><tr><td align="center">❌</td><td align="center">❌</td><td align="center">✅</td><td align="center">❌</td><td><strong>No enforcement, but Availability is considered.</strong> Hard and Soft Unavailability both show warnings; no confirmation required.</td></tr><tr><td align="center">❌</td><td align="center">❌</td><td align="center">❌</td><td align="center">✅</td><td><strong>No enforcement.</strong> Hard Unavailability shows a warning only. Soft Unavailability must be confirmed before proceeding.</td></tr><tr><td align="center">❌</td><td align="center">❌</td><td align="center">❌</td><td align="center">❌</td><td><strong>No validation enforced.</strong> Hard and Soft Unavailability warnings appear, but users can proceed freely.</td></tr></tbody></table>

### Working Examples

**Example 1 – Strictest Validation (Row 1 above)**

**Settings:**\
1️⃣ Enforce Availability for Appointments/Shifts ✅ \
2️⃣ Enforce Availability for Timesheets ✅ \
3️⃣ Availability Consideration ✅ \
4️⃣ Confirm Soft Unavailability ✅

**Scenario:**

* **Appointment Time:** 10:00 am – 2:00 pm
* **Resource Records:**
  * Availability record exists (9:00 am – 5:00 pm)
  * Soft Unavailability record exists (12:00 pm – 1:00 pm)

**Outcome:**\
Maica enforces full validation. Because Setting 1 is on, only resources with Availability records can be assigned. The soft unavailability triggers a **warning**, and the user must **confirm** before proceeding.\
If the unavailability were **hard**, Maica would **block the appointment entirely.**

| Checkpoint                       | Result                  |
| -------------------------------- | ----------------------- |
| Availability record exists       | ✅                       |
| Unavailability type              | Soft                    |
| Can proceed without confirmation | ❌                       |
| User action required             | Must confirm to proceed |

***

**Example 2 – Appointments Enforced Only (Row 6 above)**

**Settings:**\
1️⃣ Enforce Availability for Appointments/Shifts ✅ \
2️⃣ Enforce Availability for Timesheets ❌ \
3️⃣ Availability Consideration ✅ \
4️⃣ Confirm Soft Unavailability ❌

**Scenario:**

* **Appointment Time:** 1:00 pm – 5:00 pm
* **Resource Records:**
  * Availability record exists (9:00 am – 12:00 pm)
  * Soft Unavailability record exists (4:00 pm – 5:00 pm)

**Outcome:**\
Because Setting 1 is on, Maica **enforces availability** for appointments. The resource does not have Availability covering the full appointment time, so Maica **blocks the assignment**. The soft unavailability would show a **warning**, but due to the enforcement of Availability, the user **cannot override** and proceed.&#x20;

| Checkpoint                                  | Result                                        |
| ------------------------------------------- | --------------------------------------------- |
| Availability record exists (for full range) | ❌                                             |
| Unavailability type                         | Soft                                          |
| Can proceed without confirmation            | ❌                                             |
| User action required                        | Cannot proceed until availability is adjusted |

***

**Example 3 – No Enforcement but Availability Considered (Row 13 above)**

**Settings:**\
1️⃣ Enforce Availability for Appointments/Shifts ❌ \
2️⃣ Enforce Availability for Timesheets ❌ \
3️⃣ Availability Consideration ✅ \
4️⃣ Confirm Soft Unavailability ✅

**Scenario:**

* **Appointment Time:** 8:00 am – 12:00 pm
* **Resource Records:**
  * **No Availability record** for the day
  * **Soft Unavailability record** exists (9:00 am – 10:00 am)

**Outcome:**\
Because Setting 1 is off, Maica does not enforce availability strictly. Setting 3 is on, so the system **considers availability** but does not require it — users can still proceed with confirmation. The soft unavailability triggers a **warning and confirmation prompt**, and the user must **confirm to continue**.\
If Setting 1 had been on, this same scenario would **block the appointment entirely.**

| Checkpoint                       | Result                                                   |
| -------------------------------- | -------------------------------------------------------- |
| Availability record exists       | ❌                                                        |
| Unavailability type              | Soft                                                     |
| Can proceed without confirmation | ❌ (confirmation required)                                |
| User action required             | Must confirm to proceed (despite no availability record) |
