---
description: Learn about recurring schedules within Maica and how to manage these.
---

# Recurring Schedules

### Overview

Maica support the management of recurring schedules supporting the ongoing generation of either Appointments, Shifts, or Unavailabilities. The following configuration options are available when managing Recurring Schedules.

{% hint style="info" %}
It’s important to note that Recurring Schedules cannot be set to begin in the past. They must start either today or on a future date.
{% endhint %}

<figure><img src="../.gitbook/assets/image (10).png" alt=""><figcaption><p>Recurring Schedule Configuration available for Appointments, Shifts, and Unavailabilities.</p></figcaption></figure>



| Configuration           | Description                                                                                 | Options                                                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Schedule Start          | The date on which the recurring schedule starts. This is a mandatory value.                 | `Date`                                                                                                                      |
| Schedule End            | The date on which the recurring schedule ends. This is a mandatory value.                   | `Date` (greater than Schedule Start)                                                                                        |
| Number of               | Sets a specific number of either Appointments, Shifts, or Unavailabilities to be recurring. | `Number`                                                                                                                    |
| Frequency               | Sets the frequency at which the recurring schedule is executed.                             | <p><code>Daily</code><br><code>Weekly</code><br><code>Monthly</code><br><code>Quarterly</code><br><code>Annually</code></p> |
| Repeat Every            | Sets the repetition of days at which the recurring schedule is executed.                    | `Number of Days`                                                                                                            |
| Exclude Public Holidays | If selected, Maica excludes any days marked as a public holiday(s) in Salesforce.           | `Yes`/`No`                                                                                                                  |

{% hint style="info" %}
**Maica** does not support a `Fortnightly Frequency`. If you wish to have a Recurring Schedule on a Fortnightly basis, please set your `Frequency` to `Weekly`, select your `Schedule Day` and `Repeat Every` 2 weeks.   &#x20;
{% endhint %}

### Scheduled Appointment Creation Logic

Within a Recurring Schedule, Maica generates Appointments based on a `Schedule Horizon` and forward rolling basis. `Appointment` records will be created for the `Schedule Horizon Date Range`.

{% hint style="info" %}
A `Schedule Horizon` defines the rolling time period into the future during which **Maica** evaluates schedules and creates corresponding Appointments. It is measured in weeks and determines how far ahead Appointments are planned and generated.\
\
You can set your desired Schedule Horizon in the Maica General Settings. For more information on setting your Schedule Horizon, click [here](../settings/general-settings.md).&#x20;
{% endhint %}

{% hint style="info" %}
The `Schedule Horizon Date Range` is determined based on today() + `Schedule Horizon` (weeks)
{% endhint %}

To further understand the Appointment Creation Logic, see the below example:

Let's say you are creating a Recurring Schedule with the following inputs,&#x20;

* `Schedule Horizon` = 12 weeks
* `Schedule Start Date` = Jan 3, 2025
* `Schedule End Date` = Jun 3, 2025
* `Frequency` = Daily
* `Today` = Dec 3, 2024
* `Schedule Status` = Approved
* `Master Appointment` != null
* `Master Appointment` != Cancelled

Then, when the daily batch is run, the following occurs:&#x20;

* The `Schedule Horizon End Date` will be calculated per below:&#x20;
  * Today + 12 weeks = Feb 25, 2025
* Maica will create `Appointment` records for the period between the `Schedule Start Date` and the `Schedule Horizon End Date`
  * Meaning that `Appointment` records will be created for the period Jan 3, 2025 to Feb 25, 2025
* Furthermore, when the batch runs tomorrow (in this case, Dec 4, 2024), the next Appointment, or the Appointment on the Feb 26, 2025 will be created
* And so on

This Maica logic ensures Appointment Records are created for schedules within a rolling time horizon, maintaining consistent coverage and adapting dynamically as time progresses.

{% hint style="info" %}
When an Appointment Schedule is created the `Schedule Horizon` only respects 4 weeks. This is due to **Salesforce** limits and timeout risks during business hours. However, the overnight Batch will always respect the 12 week `Schedule Horizon` as per the setting.&#x20;
{% endhint %}

### Schedule Evaluation Date&#x20;

**Maica** retrieves Appointment Schedule records that will be included for Appointment processing based on a `Schedule Evaluation Date` field. The below information defines the field and details how the logic works in practice:&#x20;

`Schedule Evaluation Date`: Specifies the earliest date on which **Maica** will include the Appointment Schedule record for evaluation to determine whether Appointment records need to be created. It is calculated as the `Schedule Start Date` minus the `Schedule Horizon` (in weeks). This ensures that the system identifies and processes Appointment Schedule records within the appropriate window for generating Appointment’s on a rolling basis. The formula is shown below.&#x20;

```apex
maica__Schedule_Start_Date__c - Schedule Horizon (weeks)
```

#### Example:

* Given Inputs:&#x20;
  * `Schedule Horizon`: 12 weeks
  * `Schedule Start Date`: 1st April 2025
  * `Schedule End Date`: 30th October 2025
  * `Frequency`: Weekly
  * `Today`: 4th December 2024

**Formula**:&#x20;

<pre class="language-apex"><code class="lang-apex"><strong>Schedule Evaluation Date = Schedule Start Date - Schedule Horizon (weeks)
</strong></code></pre>

**Calculation:**

* Schedule Horizon = 12 weeks
  * 12 × 7 days = 84 days
* Schedule Start Date = 1st April 2025
* Subtract 84 days:
* 1st April 2025 - 84 days = 7th January 2025
* Result: Schedule Evaluation Date will be 7th January 2025.

#### How This Works in Practice:

* Using the example above, on 7th January 2025, Appointment records for the 1st April to 24th June 2025 (12 weeks ahead) will be created.
* As time progresses, the Appointment Schedule will be assessed daily and additional Appointment records will be created, maintaining the rolling 12-week horizon.

{% hint style="info" %}
Please note, there is also an `Under Evaluation` field which indicates whether the Appointment Schedule is eligible for automated processing.\
\
The value is determined by a formula that evaluates whether the current date falls within the `Schedule Evaluation Date` and the `Schedule End Date`. This ensures that only relevant Appointment Schedules are included for processing. Used in both the Appointment Schedule (Recurring Appointment) and Unavailability automation logic, as show below.&#x20;
{% endhint %}

**`Under Evaluation` Formula**:

```apex
AND(
    maica__Schedule_Evaluation_Date__c <= TODAY(),
    TODAY() <= maica__End_Date__c,
    ISPICKVAL(maica__Status__c, "Approved")
)
```

> All conditions inside the AND() must evaluate to TRUE for the overall formula to return TRUE.

**`Under Evaluation` Conditions**:

* `maica__Schedule_Evaluation_Date__c` <= TODAY()
  * Ensures the `Schedule Evaluation Date` is on or before today's date.
* TODAY() <= `maica__End_Date__c`
  * Ensures today's date is on or before the `End Date`.
* ISPICKVAL(`maica__Status__c`, "Approved")
  * Checks if the picklist field `maica__Status__c` is set to "Approved”

### Schedule Protection

**Maica** has logic to prevent past Scheduled Appointment being created. If the Scheduled Batch is interrupted (eg, stopped or paused) and then resumed at a later date, **Maica** ensures the `Anchor Date` is only used if the Appointment `Schedule Start Date` is **greater than or equal to today's date**. This logic prevents the creation of Appointments with dates in the past during the interrupted period.

Consider the following example:&#x20;

* Today's Date = 20th November 2024
* An Appointment Schedule was configured to generate weekly Appointment records starting from 1st November 2024.
* The batch process was interrupted on 10th November 2024, after creating Appointment records for 1st November and 8th November 2024.

When the batch is resumed, **Maica** evaluates and sets the Anchor Date to:

* The most recent `Appointment Schedule Start Date`, if it is greater than or equal to today's date; or
* Today's date, if the most recent `Appointment Schedule Start Date` is in the past.&#x20;

By covering both scenarios, the logic ensures that the `Anchor Date` will always be today or a future date, never a past date.&#x20;

So, if today's date is 20th November 2024, the system evaluates the most recent `Appointment Schedule Start Date` (8th November 2024) and determines that it is in the past. As per the logic:

* The system ignores the 8th November 2024 date because it is before today's date.&#x20;
* Instead, it defaults the Anchor Date to 20th November 2024 (today's date), ensuring no Appointment records are created in the past.

**Maica** will then begin generating Appointment records starting from the next valid future date, based on the schedule's frequency.&#x20;

### Cancelling a Schedule&#x20;

There are several ways to cancel a **Recurring Schedule** or an **Appointment** within one, depending on what you need to cancel and where you are in the schedule.

#### Cancel the Entire Schedule

To end a recurring arrangement completely, cancel from the **Master Appointment**. This cancels the Master Appointment and all remaining future Appointments within the schedule in one action. Use this option when the recurring arrangement is no longer needed at all.

{% hint style="info" %}
When cancelling from the Master Appointment, Maica will present you with the option to cancel the entire Schedule or the Master Appointment only, which is further detailed below,
{% endhint %}

#### Cancel the Master Appointment Only

If you cancel only the **Master Appointment** without cancelling the full schedule, the next scheduled Appointment in the sequence automatically becomes the new Master Appointment and the schedule continues from there.

{% hint style="info" %}
After cancelling the Master Appointment, make sure to update the `Schedule Start Date` to match the new Master Appointment's start date. If you don't, you will be unable to make further changes to the rest of the schedule.
{% endhint %}

#### Cancel Partway Through a Schedule

If you need to end a schedule from a specific point forward, open the Appointment you want to cancel from and select **Apply changes to all future Appointments**. This cancels that Appointment and all remaining Appointments after it, while leaving any earlier Appointments in the schedule untouched.

#### Cancel an Individual Appointment Within a Schedule

If you only need to cancel a single Appointment within a schedule — without affecting any others — open the Appointment you want to cancel and select **Apply changes to only this Appointment**. The rest of the schedule continues as normal.

{% hint style="success" %}
Your organisation's Billing Cancellation rules apply to all of the scenarios above. Check with your administrator if you are unsure how these are configured.
{% endhint %}

### Things to look out for&#x20;

#### Schedules Running Old Logic After a Package Update

{% hint style="warning" %}
When a **managed Apex class** used in a **scheduled job** is updated, Salesforce **does not automatically refresh the job to use the latest version of the class**. Instead, it continues to execute a **cached version of the old logic**, which can lead to discrepancies in behaviour.

This is a **Salesforce platform behaviour** and applies to any scheduled job relying on an updated Apex class. To ensure the job runs with the latest logic, it needs to be **manually rescheduled** after an update.
{% endhint %}

{% hint style="success" %}
Whilst this is a **Salesforce platform behaviour**, Maica’s development team proactively **monitors and reschedules** all necessary scheduled jobs after every package update. This ensures that updates are applied smoothly, and you should experience **no disruption** in behaviour.

If you notice any unexpected behaviour following an update, please **contact the Maica team**, and we’ll ensure everything is running as expected.
{% endhint %}

#### Owner Assignment for Recurring Appointment Batches

When generating **Recurring Appointment** batches, Maica automatically ensures that all cloned **Appointment** records are owned by an **Active User**. This prevents batch failures that could occur when the **Owner of the Master Appointment** is inactive. It works as described below:&#x20;

1. **Ownership Validation**
   * Before generating Recurring Appointments, Maica checks whether the _Master Appointment Owner_ is active.
   * If the owner **is active**, ownership of the cloned Appointment records is retained.
   * If the owner **is inactive**, ownership is reassigned to the **current running user** (the user executing the batch). This is determined in the [Scheduled Jobs](../settings/scheduled-jobs.md).&#x20;
2. **Batch Execution Conditions**
   * If the running user is inactive, the batch or scheduled job will not execute.
   * This ensures only active users can trigger recurring batch generation.

{% hint style="success" %}
This ensures all generated **Appointment** records are owned by an active user, ensuring recurring processes are run successfully.
{% endhint %}

{% hint style="info" %}
The same ownership logic applies to **Recurring Unavailability Batches**, maintaining consistency across recurring record generation.
{% endhint %}

The below tables outlines some Example Scenarios:&#x20;

| Scenario                                 | Result                                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| The Master Appointment Owner is active   | Recurring Appointments retain the same owner.                                                             |
| The Master Appointment Owner is inactive | Recurring Appointments are reassigned to the current running (active) user.                               |
| The running user is inactive             | The batch will not execute until rescheduled by an active user under **Maica Settings → Scheduled Jobs**. |

This logic ensures all recurring records are owned and processed by **Active Users**, maintaining reliability in Recurring Appointment and Unavailability batch generation.

#### Recurring Appointments not created to the Schedule Horizon

In some environments, you may notice that when a **Recurring Schedule** is first created, only the **Master Appointment** is generated. The remaining appointments up to the Schedule Horizon are only created after the schedule is edited and saved again.

This behaviour is most commonly caused by **organisation-level configuration**, rather than an issue with the Maica package itself.

**So, what causes this?**

Recurring appointment generation relies on internal evaluation logic that runs at the time the schedule is created. If the **Schedule Status** does not meet the required criteria during this initial evaluation, the recurring logic is skipped.

This can occur when:

* A **default value** is set on the Schedule **Status** picklist
* The default value prevents the schedule from being evaluated as eligible on first save
* The status is only updated to the expected value _after_ the record is created

As a result:

* Only the Master Appointment is created initially
* Editing and resaving the schedule later triggers the remaining Appointments to be generated

{% hint style="success" %}
**Recommended configuration**

Maica recommends **not setting a default value** on the Schedule Status field.

Maica automatically manages schedule statuses as part of its workflow, and default values on this field can interfere with recurring evaluation logic.

Removing the default value ensures:

* Recurring appointments are created immediately up to the Schedule Horizon
* No additional edits are required after creation
{% endhint %}

{% hint style="info" %}
**Important to note**

* This behaviour is due to **Salesforce configuration and evaluation timing**, not a Maica defect
* The Maica package does **not** set a default value on this field

If recurring appointments are still not being generated as expected after reviewing this setting, please [contact](https://www.maica.com.au/contact-us) the Maica team so we can assist with further investigation.
{% endhint %}
