---
description: Learn about the Resource Profile and its components in Maica
---

# Resource Profile

## Resource Profile Overview

In **Maica**, the `Resource` Profile is the parent object that supports two Record Types: `Resources` and `Assets`. A `Resource` and `Asset` are defined in **Maica** as shown below:&#x20;

* `Resource`:  The care workers or clinicians working directly with your Participants.&#x20;
* `Asset`: The non-human Resources such as rooms, cars, medical equipment, etc.&#x20;

You can define your Resource type through the `Record Type` when creating a `Resource`.&#x20;

## Resource Profile Attributes

Resource attributes are fields that are stored against the Resource profile. **Maica** includes a number of these attributes, however these are easily broadened using Salesforce's standard toolset.&#x20;

Depending on the Record Type, there will be different available attributes on the Resource Profile. These are explained in more detail below.&#x20;

{% hint style="info" %}
Whilst each Record Type may have different attributes, both Record Types share the same Related Lists. These are also explained in further detail [below](resource-profile.md#resource-related-information).&#x20;
{% endhint %}

### `Asset` Attributes

The table below outlines the attribute fields related to the `Asset` Record Type.

| Field Name            | Field Type  | Notes                                                                                          |
| --------------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| `ID Number`           | Text        | The Asset Number used to identify the Resource.                                                |
| `Type`                | Picklist    | Picklist of any default or custom Asset Types                                                  |
| `Appointment Service` | Lookup      | Lookup of [Appointment Service ](../getting-started/maica-key-concepts/appointment-service.md) |
| `Active`              | Checkbox    | Indicates if the Resource record is Active and available within Maica                          |
| `Default Quantity`    | Number      |                                                                                                |

{% hint style="info" %}
All standard **Maica** Picklist fields can be extended to suit your needs. To learn more, click [here](https://trailhead.salesforce.com/content/learn/modules/picklist_admin/picklist_admin_start).&#x20;
{% endhint %}

{% hint style="info" %}
To learn more about each Field Type, click [here](https://help.salesforce.com/s/articleView?id=sf.custom_field_attributes.htm\&type=5).
{% endhint %}

### `Resource` Attributes

{% hint style="info" %}
In **Maica**, a `Resource` is linked to a standard Salesforce object called `User`. A `User` is the profile with which a person logs into Salesforce, hence the relationship between `Resource` and `User` implies that each `Resource` (or care worker) will have a matching `User` profile in Salesforce.
{% endhint %}

The table below outlines the attribute fields related to the `Resource` Record Type.

| Field Name               | Field Type              | Notes                                                                                                                                                                                                                             |
| ------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Resource Name`          | Text                    |                                                                                                                                                                                                                                   |
| `User`                   |  Lookup                 | The internal Salesforce User record that the Resource relates to.                                                                                                                                                                 |
| `Active`                 |  Checkbox               | Indicates if the Resource record is Active and available within Maica                                                                                                                                                             |
| `Timesheet Management`   | Picklist                | Ability to enable or Disable [Timesheet Management](../getting-started/maica-key-concepts/timesheet.md) for your Resource                                                                                                         |
| `Birthdate`              |  Date                   |                                                                                                                                                                                                                                   |
| `Gender`                 | Picklist                |                                                                                                                                                                                                                                   |
| `Age`                    | Formula                 | Derived from Birthdate                                                                                                                                                                                                            |
| `Primary Language`       | Picklist                | Derived from the Global Value Set of Languages                                                                                                                                                                                    |
| `Age Group`              | Formula                 | Derived from Birthdate                                                                                                                                                                                                            |
| `Mobile`                 | Formula                 | The mobile from the associated User record                                                                                                                                                                                        |
| `Phone`                  | Formula                 | The phone from the associated User record                                                                                                                                                                                         |
| `Email`                  | Formula                 | The email from the associated User record                                                                                                                                                                                         |
| `Address`                | Formula                 | The address from the associated User record                                                                                                                                                                                       |
| `Timezone`               | Formula                 | The timezone from the associated User record                                                                                                                                                                                      |
| `ID Number`              | Text                    | The Staff Member or Employee Number used to identify the Resource.                                                                                                                                                                |
| `Start Date`             | Date                    |                                                                                                                                                                                                                                   |
| `End Date`               | Date                    |                                                                                                                                                                                                                                   |
| `Employment Category`    | Picklist                |                                                                                                                                                                                                                                   |
| `Employment Type`        | Picklist                |                                                                                                                                                                                                                                   |
| `Induction Complete`     | Checkbox                | Indicates if the Resource has completed your Induction process.                                                                                                                                                                   |
| `Position`               | Picklist (Multi-Select) | <p>The employment position held by the Resource. <br><br>Here you can replace existing <strong>Maica</strong> values with those that suit your organisation's Positions.</p>                                                      |
| `Roster Mode`            | Picklist                | <p>Used to define the behaviour and validation applied when scheduling Appointments for the Resource.<br><br>See <a href="resource-profile.md#roster-mode-overview">below</a> for further information.</p>                        |
| `Primary Location`       | Lookup                  | The Location where the Resource works most often.                                                                                                                                                                                 |
| `Daily Hours Limit`      | Number                  | <p>The maximum number of hours the Resource can work per day.<br><br>This field is utilised in the <a href="../appointments/create-an-appointment/smart-selection-filter.md">Smart Selection Filter</a>.</p>                      |
| `Weekly Hours Limit`     | Number                  | <p>The maximum number of hours the Resource can work per week.<br><br>This field is utilised in the <a href="../appointments/create-an-appointment/smart-selection-filter.md">Smart Selection Filter</a>.</p>                     |
| `Weekly Hours Minimum`   | Number                  | <p>The minimum number of hours the Resource should be scheduled to work each week.<br><br>This field is utilised in the <a href="../appointments/create-an-appointment/smart-selection-filter.md">Smart Selection Filter</a>.</p> |
| `Maximum Client Number`  | Number                  |                                                                                                                                                                                                                                   |
| `Number of Clients`      | Roll-Up Summary         | Derived from the number of associated Resource Participants.                                                                                                                                                                      |
| `Schedule Notification`  | Picklist                | Indicates if and how often the Resource is emailed their Appointment Schedule                                                                                                                                                     |

## Resource Related Lists

In addition to the standard attributes described above, **Maica** also provides a variety of related information to further manage the configuration of a `Resource`.

{% hint style="info" %}
In addition to the Related Lists, there is a Quick Action to offboard Resources. You can learn more about the process [here](offboarding-a-resource.md).&#x20;
{% endhint %}

### **Resource Participants**

The `Resource Participants` related list allows for the management of Participants being assigned to Resources. It is located under `Profile Management` tab and is the source for the `Number of Clients` attribute.&#x20;

The benefit of this list is to be able to see which `Resources` are managing which `Participants`, as shown below. This is particularly useful if a `Resource` is managing multiple `Participants`.&#x20;

To link a Resource with a Participant, simply click `New`, select the desired `Participant` from the dropdown, nominate a Date Range, and `Save`.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-09-11 at 1.16.05 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The `Resource Participants` list is directly related to the `Participant Resources` list on the [Participant Profile](../participants/participant-profile/). This means, if multiple `Resources` are caring for a given `Participant`, this will be reflect on the `Participant Resources` list and display on the [Participant Profile](../participants/participant-profile/) under the Client Care tab. This list will be dynamically updated if an update occurs on the `Resource` Profile.
{% endhint %}

### **Skills**

**Maica** offers the ability to globally record a set of `Skills` such as `Driving a Car` or `Administering Medicine`. Those Skills can then be assigned to Resources via the `Skills` related list as shown below.

{% hint style="info" %}
To learn how to import your set of`Resource Skills` into your **Maica** instance, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/reference-data).&#x20;
{% endhint %}

{% hint style="info" %}
Once `Skills` have been assigned to a `Resource`, they are used in the [Smart Selection Filter](../appointments/create-an-appointment/smart-selection-filter.md).&#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/Screenshot 2024-09-11 at 1.53.48 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
`Skill Level` indicates the `Resources` level of competence in the associated Skill.&#x20;
{% endhint %}

To add a `Skill` , simply click `New`, select the desired `Skill` from the dropdown, nominate a Date Range, provide an optional description and `Save`.&#x20;

### **Shift Resources**&#x20;

`Shift Resource` is a related list of any `Shift` the associated `Resource` has been assigned to - it's simply a record of that person being part of the shift and contains details of the `Shift`.&#x20;

`Shift Resources` are managed through creating Shifts in the Planner, and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.&#x20;

### **Expenses**

`Expenses` are records that indicate an expense has been incurred by a `Resource` that needs to be paid back to said `Resource` by the service provider.&#x20;

Expenses are managed through the management or creation of [Appointments](../appointments/manage-an-appointment.md), and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.&#x20;

### **Appointments**&#x20;

The `Appointments` related list is a summary of all `Appointments` the `Resource` has been assigned to.&#x20;

Appointments are managed through creating Appointments on the [Planner](../appointments/create-an-appointment/), and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.&#x20;

### **Timesheets**

The `Timesheets` related list is a summary of all `Timesheets` related to the `Resource`.&#x20;

Appointments are managed through [Timesheet Management](../participants/global-actions/new-timesheet-entry.md) or Maica's automation, and it is recommended that the list on the Resource Record is simply used as a reference. It will be updated dynamically and there is no need for manual intervention.&#x20;

### **Availability**

An `Availability` Record is used in **Maica** to record when a particular `Resource` is available for accepting either Shifts or Appointments.

Availability Records are constructed based on the following fields:&#x20;

| Field             | Description                                                                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Operating Hour`  | This is a lookup field that defines which operating hour this Resource is available to be scheduled and rostered.                                                                                                       |
| `Location`        | <p>This is a lookup field that defines the Location this Availability period applies to.<br><br>If you do not select a Location, Maica allows the Resource to work at any Location during the Availability period. </p> |
| `Effective From`  | The date the Availability period takes effect from or starts, i.e the date from which it applies to the Resource                                                                                                        |
| `Effective To`    | The date the Availability period ends, i.e the date from which it no longer applies to the Resource                                                                                                                     |
| `Interval`        | This a picklist field that defines the Interval in which the Availability applies                                                                                                                                       |
| `Roster Mode`     | <p>Used to define the behaviour and validation applied when scheduling Appointments for the Resource.<br><br>See <a href="resource-profile.md#roster-mode-overview">below</a> for further information.</p>              |

{% hint style="info" %}
Per **Maica's** validation, Availability Records will take precedence over Global Settings.&#x20;
{% endhint %}

{% hint style="info" %}
Please note that `Roster Mode` field cannot be null. To learn more about the validation enforcing this rule, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/availability).&#x20;
{% endhint %}

Simply click `New` and populate the above fields to create an `Availability` record for your `Resource`. &#x20;

**Maica's** construction of `Availability` by referencing `Operating Hour` records enables centralised management of operating times. If `Operating Hours` ever change, simply change the organisational `Operating Hour` record rather than needing to adjust working hours for each `Resource`.

{% hint style="info" %}
When no `Availability` records exist for a `Resource`, **Maica** will interpret this as the `Resource` being available to work at any time by default. This is configurable in the [Validation Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/validation-management) settings.
{% endhint %}

{% hint style="info" %}
If you wish to assign overnight Availability to a Resource, you will need to configure the required `Operating Hour` records to support it. To learn how to do so, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/configuring-maica-components/overnight-and-24-hour-availability).&#x20;
{% endhint %}

### **Unavailability**

An `Unavailability` Record is used in **Maica** to record when a particular `Resource` is not available for accepting either Shifts or Appointments.

{% hint style="info" %}
`Unavailability` can be self managed by `Resources` using the Salesforce1 mobile application.&#x20;
{% endhint %}

Resources can simply populate the `Date` and `Reason` for their `Unavailability`, and it will be created as a record on their profile.&#x20;

{% hint style="info" %}
When an Unavailability Record is created, Maica will automatically remove the associated Resource from any assigned Appointments or Shifts during the Unavailability period.&#x20;
{% endhint %}

{% hint style="info" %}
`Unavailability` can also be managed directly from the [`Planner`](../the-planner/planner-actions/manage-unavailability.md).&#x20;
{% endhint %}

## Roster Mode Overview

As mentioned above, `Roster Mode` in **Maica** is used to define the behaviour and validation applied when scheduling `Appointments` for a `Resource`. When selecting a `Roster Mode` for a `Resource` or `Availability`, there are two selectable options. These are:&#x20;

* `Appointment`: This means Appointments can be scheduled at any time for a Resource provided it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments can be created at any time.
* `Shift`: This means Appointments can only be scheduled within a Shift that a Resource is part of and it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments still must fall within a Shift that the Resource is assigned to.

For example, if your `Resource` was in `Shift Mode`, then you can only schedule an `Appointment` for them during their assigned `Shifts`. If they have a `Shift` from 9 AM to 1 PM, you can only schedule `Appointments` within that window. Even if they are available for the entire day, you cannot schedule outside their `Shift` times.

Additionally, if your `Resource` is in `Appointment Mode` during a period of `Availability`, you could not assign them to a `Shift` during that same period. A `Resource` must be in Shift Mode in order to be assigned a `Shift`.&#x20;

{% hint style="info" %}
It is important to note that if a `Resource` has a `Roster Mode` set on their Resource Record that is different to the `Roster Mode` set for a specific `Availability` Record, the `Availability` Record Mode will take precedent during the `Availability` period. \
\
If No `Availability` Records are found and the `Roster Mode` is not set on the `Resource` Record: the `Roster Mode` for the `Resource` will be defined by the `Global Roster Mode` setting. This is configurable in the **Maica** [Rostering Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/rostering-management) settings.&#x20;
{% endhint %}

