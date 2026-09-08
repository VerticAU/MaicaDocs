---
description: Learn about the Resource Profile and its components in Maica
---

# Resource Profile

## Resource Profile Overview

In **Maica**, the `Resource` Profile is the parent object that supports two Record Types: `Resources` and `Assets`. A `Resource` and `Asset` are defined in **Maica** as shown below:

* `Resource`: The care workers or clinicians working directly with your Participants.
* `Asset`: The non-human Resources such as rooms, cars, medical equipment, etc.

You can define your Resource type through the `Record Type` when creating a `Resource`.

## Resource Profile Attributes

Resource attributes are fields that are stored against the Resource profile. **Maica** includes a number of these attributes, however these are easily broadened using Salesforce's standard toolset.

Depending on the Record Type, there will be different available attributes on the Resource Profile. These are explained in more detail below.

{% hint style="info" %}
Whilst each Record Type may have different attributes, both Record Types share the same Related Lists. These are also explained in further detail [below](resource-profile.md#resource-related-information).
{% endhint %}

### `Asset` Attributes

The table below outlines the attribute fields related to the `Asset` Record Type.

| Field Name            | Field Type | Notes                                                                 |
| --------------------- | ---------- | --------------------------------------------------------------------- |
| `ID Number`           | Text       | The Asset Number used to identify the Resource.                       |
| `Type`                | Picklist   | Picklist of any default or custom Asset Types                         |
| `Appointment Service` | Lookup     | Lookup of Appointment Service                                         |
| `Active`              | Checkbox   | Indicates if the Resource record is Active and available within Maica |
| `Default Quantity`    | Number     |                                                                       |

{% hint style="info" %}
All standard **Maica** Picklist fields can be extended to suit your needs. To learn more, click [here](https://trailhead.salesforce.com/content/learn/modules/picklist_admin/picklist_admin_start).
{% endhint %}

{% hint style="info" %}
To learn more about each Field Type, click [here](https://help.salesforce.com/s/articleView?id=sf.custom_field_attributes.htm\&type=5).
{% endhint %}

### `Resource` Attributes

{% hint style="info" %}
In **Maica**, a `Resource` is linked to a standard Salesforce object called `User`. A `User` is the profile with which a person logs into Salesforce, hence the relationship between `Resource` and `User` implies that each `Resource` (or care worker) will have a matching `User` profile in Salesforce.
{% endhint %}

The table below outlines the attribute fields related to the `Resource` Record Type.

| Field Name              | Field Type              | Notes                                                                                                                                                                                                      |
| ----------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Resource Name`         | Text                    |                                                                                                                                                                                                            |
| `User`                  | Lookup                  | The internal Salesforce User record that the Resource relates to.                                                                                                                                          |
| `Active`                | Checkbox                | Indicates if the Resource record is Active and available within Maica                                                                                                                                      |
| `Timesheet Management`  | Picklist                | Ability to enable or Disable Timesheet Management for your Resource                                                                                                                                        |
| `Birthdate`             | Date                    |                                                                                                                                                                                                            |
| `Gender`                | Picklist                |                                                                                                                                                                                                            |
| `Age`                   | Formula                 | Derived from Birthdate                                                                                                                                                                                     |
| `Primary Language`      | Picklist                | Derived from the Global Value Set of Languages                                                                                                                                                             |
| `Age Group`             | Formula                 | Derived from Birthdate                                                                                                                                                                                     |
| `Mobile`                | Formula                 | The mobile from the associated User record                                                                                                                                                                 |
| `Phone`                 | Formula                 | The phone from the associated User record                                                                                                                                                                  |
| `Email`                 | Formula                 | The email from the associated User record                                                                                                                                                                  |
| `Address`               | Formula                 | The address from the associated User record                                                                                                                                                                |
| `Timezone`              | Formula                 | The timezone from the associated User record                                                                                                                                                               |
| `ID Number`             | Text                    | The Staff Member or Employee Number used to identify the Resource.                                                                                                                                         |
| `Start Date`            | Date                    |                                                                                                                                                                                                            |
| `End Date`              | Date                    |                                                                                                                                                                                                            |
| `Employment Category`   | Picklist                |                                                                                                                                                                                                            |
| `Employment Type`       | Picklist                |                                                                                                                                                                                                            |
| `Induction Complete`    | Checkbox                | Indicates if the Resource has completed your Induction process.                                                                                                                                            |
| `Position`              | Picklist (Multi-Select) | <p>The employment position held by the Resource.<br><br>Here you can replace existing <strong>Maica</strong> values with those that suit your organisation's Positions.</p>                                |
| `Roster Mode`           | Picklist                | <p>Used to define the behaviour and validation applied when scheduling Appointments for the Resource.<br><br>See <a href="resource-profile.md#roster-mode-overview">below</a> for further information.</p> |
| `Primary Location`      | Lookup                  | The Location where the Resource works most often.                                                                                                                                                          |
| `Daily Hours Limit`     | Number                  | <p>The maximum number of hours the Resource can work per day.<br><br>This field is utilised in the Smart Selection Filter.</p>                                                                             |
| `Weekly Hours Limit`    | Number                  | <p>The maximum number of hours the Resource can work per week.<br><br>This field is utilised in the Smart Selection Filter.</p>                                                                            |
| `Weekly Hours Minimum`  | Number                  | <p>The minimum number of hours the Resource should be scheduled to work each week.<br><br>This field is utilised in the Smart Selection Filter.</p>                                                        |
| `Maximum Client Number` | Number                  |                                                                                                                                                                                                            |
| `Number of Clients`     | Roll-Up Summary         | Derived from the number of associated Resource Participants.                                                                                                                                               |
| `Schedule Notification` | Picklist                | Indicates if and how often the Resource is emailed their Appointment Schedule                                                                                                                              |

### Scheduling Information & Overtime Validation

The `Scheduling Information` section of the `Resource` profile holds the fields that govern how **Maica** manages and enforces working hour limits for a worker. These fields are used across scheduling, broadcasting, and the Optimisation Engine to ensure workers are rostered within their agreed or award-based limits.

The fields available in this section are described below:

| Field                                    | Description                                                                                                                                                                  |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Daily Hours Limit`                      | The maximum number of hours a worker can be scheduled in any single day. Used by the Smart Selection Filter and Optimiser to assess availability.                            |
| `Weekly Hours Limit`                     | The maximum number of hours a worker can be scheduled in any single week. Used by the Optimiser's Workload scoring and the Smart Selection Filter.                           |
| `Fortnightly Hours Limit`                | The maximum number of hours a worker can be scheduled within a fixed 14-day fortnight, aligned to a Monday-start period. Used in Overtime Validation.                        |
| `Weekly Hours Minimum`                   | The minimum number of hours a worker should be scheduled each week. Used by the Smart Selection Filter to surface workers who have capacity.                                 |
| `Fortnightly Hours Minimum`              | The minimum number of hours a worker should be scheduled across a fortnight.                                                                                                 |
| `Minimum Hours Gap Between Working Days` | The minimum required rest period (in hours) between the end of a worker's last shift on one day and the start of their first shift on the next. Used in Overtime Validation. |
| `Maximum Consecutive Days On`            | The maximum number of consecutive calendar days a worker can be rostered for any counted work. A single day with zero hours resets the count. Used in Overtime Validation.   |

#### How These Fields Are Used Across Maica?

**Optimisation Engine & Broadcasting**

When the [Resource Optimiser](https://knowledge.maica.com.au/maica-knowledge-base/the-planner/resource-optimiser) runs — whether as an automated optimisation or a broadcast — it scores each candidate Resource based on their current workload and availability. The `Weekly Hours Limit` directly informs the Workload scoring category, which evaluates how much capacity a worker has remaining in their week relative to the hours required by the Appointment or Shift. Workers closer to their limit will score lower for workload, meaning better-suited candidates are prioritised automatically.

The same logic applies when Broadcasting — only Resources with sufficient capacity relative to their limits are surfaced as viable candidates.

**Overtime Validation**

When scheduling a worker — through the Planner, auto-fill, Shift Offers, or any other method — **Maica** automatically checks whether the proposed shift would cause the assigned `Resource` to exceed any of their overtime thresholds. If a breach is detected, Maica will either prevent the assignment from proceeding or prompt an authorised user to acknowledge and override the breach before continuing.

Overtime validation runs when an `Appointment Resource` record is created, or when an existing one is updated in a way that changes start or end times or transitions from a non-counted to a counted status.

The four overtime thresholds enforced are:

| Threshold                            | Field                                    | Description                                                                                                                                          |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maximum Hours Per Day**            | `Daily Hours Limit`                      | Maximum hours within any rolling 24-hour window. Includes paid travel time.                                                                          |
| **Maximum Hours Per Fortnight**      | `Fortnightly Hours Limit`                | Maximum hours within a fixed Monday-start 14-day period. Includes paid travel time.                                                                  |
| **Minimum Gap Between Working Days** | `Minimum Hours Gap Between Working Days` | Minimum rest required between the last shift on one day and the first shift on the next. Does not apply to multiple shifts on the same calendar day. |
| **Maximum Consecutive Days On**      | `Maximum Consecutive Days On`            | Maximum consecutive calendar days with any counted work. A single day with no work resets the count.                                                 |

{% hint style="info" %}
**How worked time is resolved for the Fortnight, Rest Gap, and Consecutive Days checks.** These three thresholds look at a bounded window of a Resource's recent and surrounding Appointment Resource records, not only the record currently being saved. Within that window, Maica resolves each record's worked time from the source configured in **Timesheet Entry Reference** (Maica Settings → Timesheet): `Actual` reads `Actual Start`/`Actual End`, `Check In/Out` reads the Resource's check-in and check-out times, and `Scheduled` always uses the Appointment's scheduled start and end regardless of any recorded times. If this setting has never been configured, Maica defaults to `Actual`, which matches the pre-existing behaviour. A **Completed** or **Under Review** Appointment Resource is treated as having worked time for this resolution; a record is only replaced by its recorded times when both a start and an end have been recorded; a record missing one of the two falls back to its scheduled span.
{% endhint %}

**Counted statuses** — the following `Appointment Resource` statuses are included in overtime tallies:

* Scheduled
* Confirmed
* Accepted

{% hint style="info" %}
Withdrawn, Declined, and Cancelled are excluded.
{% endhint %}

**Validation Outcomes:**

**No breach** — the assignment proceeds as normal.

**Breach detected — override required** — one or more thresholds would be exceeded, but the breaches are overridable. A modal appears titled _Overtime conditions breached_, listing each breached metric with current totals, proposed totals, and the applicable threshold. From here, you can either:

* **Cancel** — dismiss the modal without saving
* **Acknowledge & Override** — confirm awareness of the breach and proceed. This option is only visible to users with the overtime override permission.

**Breach detected — blocked** — one or more thresholds would be exceeded and are not overridable. The assignment cannot proceed.

{% hint style="info" %}
If you do not see the **Acknowledge & Override** option when a breach is detected, you do not have the required permission. Contact your system administrator
{% endhint %}

When a user attempts to set an `Appointment Resource` status to **Confirmed** where breaches exist and no override has been recorded, the same rules apply — users with the override permission will see the acknowledgement modal, and users without it will be blocked with the message: _You do not have permission to confirm when overtime conditions are breached._

## Resource Related Lists

In addition to the standard attributes described above, **Maica** also provides a variety of related information to further manage the configuration of a `Resource`.

{% hint style="info" %}
In addition to the Related Lists, there is a Quick Action to offboard Resources. You can learn more about the process here.
{% endhint %}

### **Resource Participants**

The `Resource Participants` related list allows for the management of Participants being assigned to Resources. It is located under `Profile Management` tab and is the source for the `Number of Clients` attribute.

The benefit of this list is to be able to see which `Resources` are managing which `Participants`, as shown below. This is particularly useful if a `Resource` is managing multiple `Participants`.

To link a Resource with a Participant, simply click `New`, select the desired `Participant` from the dropdown, nominate a Date Range, and `Save`.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2Fdg4FPDLQk23sryq2Vy4w%2FScreenshot%202024-09-11%20at%201.16.05%20pm.png?alt=media&#x26;token=e9fd2f7d-0f19-459e-a83e-ce5095234e5d" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The `Resource Participants` list is directly related to the `Participant Resources` list on the [Participant Profile](../participants/participant-profile/). This means, if multiple `Resources` are caring for a given `Participant`, this will be reflect on the `Participant Resources` list and display on the [Participant Profile](../participants/participant-profile/) under the Client Care tab. This list will be dynamically updated if an update occurs on the `Resource` Profile.
{% endhint %}

### **Skills**

**Maica** offers the ability to globally record a set of `Skills` such as `Driving a Car` or `Administering Medicine`. Those Skills can then be assigned to Resources via the `Skills` related list as shown below.

{% hint style="info" %}
To learn how to import your set of`Resource Skills` into your **Maica** instance, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/reference-data).
{% endhint %}

{% hint style="info" %}
Once `Skills` have been assigned to a `Resource`, they are used in the Smart Selection Filter.
{% endhint %}

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FtqJADpqkcZvWC8JAVWOi%2FScreenshot%202024-09-11%20at%201.53.48%20pm.png?alt=media&#x26;token=ff0af2da-f148-4df8-b484-2b6e834eb81c" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
`Skill Level` indicates the `Resources` level of competence in the associated Skill.
{% endhint %}

To add a `Skill` , simply click `New`, select the desired `Skill` from the dropdown, nominate a Date Range, provide an optional description and `Save`.

### **Shift Resources**

`Shift Resource` is a related list of any `Shift` the associated `Resource` has been assigned to - it's simply a record of that person being part of the shift and contains details of the `Shift`.

`Shift Resources` are managed through creating Shifts in the Planner, and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.

### **Expenses**

`Expenses` are records that indicate an expense has been incurred by a `Resource` that needs to be paid back to said `Resource` by the service provider.

Expenses are managed through the management or creation of Appointments, and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.

### **Appointments**

The `Appointments` related list is a summary of all `Appointments` the `Resource` has been assigned to.

Appointments are managed through creating Appointments on the [Planner](../appointments/create-an-appointment/), and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.

### **Timesheets**

The `Timesheets` related list is a summary of all `Timesheets` related to the `Resource`.

Appointments are managed through Timesheet Management or Maica's automation, and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.

### **Availability**

An `Availability` Record is used in **Maica** to record when a particular `Resource` is available for accepting either Shifts or Appointments.

Availability Records are constructed based on the following fields:

| Field            | Description                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Operating Hour` | This is a lookup field that defines which operating hour this Resource is available to be scheduled and rostered.                                                                                                      |
| `Location`       | <p>This is a lookup field that defines the Location this Availability period applies to.<br><br>If you do not select a Location, Maica allows the Resource to work at any Location during the Availability period.</p> |
| `Effective From` | The date the Availability period takes effect from or starts, i.e the date from which it applies to the Resource                                                                                                       |
| `Effective To`   | The date the Availability period ends, i.e the date from which it no longer applies to the Resource                                                                                                                    |
| `Interval`       | This a picklist field that defines the Interval in which the Availability applies                                                                                                                                      |
| `Roster Mode`    | <p>Used to define the behaviour and validation applied when scheduling Appointments for the Resource.<br><br>See <a href="resource-profile.md#roster-mode-overview">below</a> for further information.</p>             |

{% hint style="info" %}
Per **Maica's** validation, Availability Records will take precedence over Global Settings.
{% endhint %}

{% hint style="info" %}
Please note that `Roster Mode` field cannot be null. To learn more about the validation enforcing this rule, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/availability).
{% endhint %}

Simply click `New` and populate the above fields to create an `Availability` record for your `Resource`.

**Maica's** construction of `Availability` by referencing `Operating Hour` records enables centralised management of operating times. If `Operating Hours` ever change, simply change the organisational `Operating Hour` record rather than needing to adjust working hours for each `Resource`.

{% hint style="info" %}
When no `Availability` records exist for a `Resource`, **Maica** will interpret this as the `Resource` being available to work at any time by default. This is configurable in the [Validation Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/validation-management) settings.
{% endhint %}

{% hint style="info" %}
If you wish to assign overnight Availability to a Resource, you will need to configure the required `Operating Hour` records to support it. To learn how to do so, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/configuring-maica-components/overnight-and-24-hour-availability).
{% endhint %}

### **Unavailability**

An `Unavailability` Record is used in **Maica** to record when a particular `Resource` is not available for accepting either Shifts or Appointments.

{% hint style="info" %}
`Unavailability` can be self managed by `Resources` using the Salesforce1 mobile application.
{% endhint %}

Resources can simply populate the `Date` and `Reason` for their `Unavailability`, and it will be created as a record on their profile.

{% hint style="info" %}
When an Unavailability Record is created, Maica will automatically remove the associated Resource from any assigned Appointments or Shifts during the Unavailability period.
{% endhint %}

{% hint style="info" %}
`Unavailability` can also be managed directly from the `Planner`.
{% endhint %}

## Roster Mode Overview

`Roster Mode` defines how a `Resource` is scheduled in **Maica**: through `Shifts`, through standalone `Appointments`, or both. You can set it on the `Resource` record using the **Roster Mode** field, and you can set a different mode for a specific period on an Availability record.

There are three modes:

* `Appointment`: the Resource is scheduled through standalone Appointments and cannot be assigned to a Shift.
* `Shift`: the Resource is scheduled through Shifts, and any Appointment booked for them must fall within one of their Shifts.
* `Dynamic`: the Resource can be assigned to both Shifts and standalone Appointments.

{% hint style="info" %}
For the full detail, including how **Maica** resolves the mode when the Resource and an Availability record differ, and how Roster Mode interacts with overlap rules, see Roster Mode.
{% endhint %}

### Allow Overlap

By default, **Maica** can prevent a Resource from being added to an Appointment or Shift that overlaps another Appointment or Shift they are already assigned to. This is controlled organisation-wide by the **Allow Resource Overlap** setting (see [Service Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/service-management) in the Administration Guide).

The **Allow Overlap** checkbox on the `Resource` record provides a per-Resource exception. When **Allow Overlap** is enabled on a Resource, that Resource is excluded from overlap conflict checks even when overlap enforcement is active for your organisation. This suits Resources who legitimately work across concurrent Appointments, such as supervisors, on-call coordinators, or pool Resources, without relaxing enforcement for everyone else.

When enabled, the override applies wherever Maica checks for Resource overlap:

* When scheduling or submitting Appointments and Shifts
* When searching for available Resources, including in the **Resource Optimiser**
* When a Resource accepts a Broadcast offer

{% hint style="info" %}
**Allow Overlap** is unchecked by default, so your existing overlap enforcement is unchanged until you enable it on a Resource.
{% endhint %}

{% hint style="warning" %}
**Allow Overlap** applies to time overlaps only. Roster Mode validation and availability rules continue to apply. The override covers overlaps of the same type, meaning Appointment against Appointment, or Shift against Shift.
{% endhint %}
