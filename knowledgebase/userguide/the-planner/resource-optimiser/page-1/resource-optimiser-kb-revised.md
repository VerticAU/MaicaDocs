# resource optimiser kb revised

## What is the Resource Optimiser?

The **Resource Optimiser** is a tool within the Maica Planner used to identify and fill unfilled Appointments or Shifts using Maica's Optimisation Engine using either an [Optimisation Run](https://knowledge.maica.com.au/maica-knowledge-base/the-planner/resource-optimiser/running-the-optimiser) or [Broadcast](https://knowledge.maica.com.au/maica-knowledge-base/the-planner/resource-optimiser/broadcasting-overview).

{% hint style="info" %}
Please note, you can also access the Resource Optimiser from the [Schedule Manager](https://knowledge.maica.com.au/maica-knowledge-base/schedule-manager).
{% endhint %}

It consolidates all Appointment and Shift records requiring Optimisation/Filling into a single screen, allowing users to review, run, and confirm Resource allocations efficiently.

{% hint style="info" %}
To learn more about how Maica classifies a record as requiring optimisation, please [click here](resource-optimiser-kb-revised.md#what-gets-pulled-into-the-optimiser).
{% endhint %}

The Optimisation logic evaluates each Appointment or Shift based on a range of customisable inputs such as Resource Availability, Attributes, Workload, Skills, and Participant Preferences and then fills or Broadcasts each one with the most suitable Resource.

{% hint style="info" %}
To learn more about the logic behind Maica's Optimisation Engine, please [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/maicas-optimisation-engine).
{% endhint %}

***

## Where do I find the Resource Optimiser?

The Resource Optimiser can be accessed directly from the **Planner Toolbar**, as shown below.

To find it, simply:

{% stepper %}
{% step %}
### Open the **Planner**

Open the **Planner**.
{% endstep %}

{% step %}
### Select the **Optimiser** icon

Select the **Optimiser** icon from the toolbar at the top of the screen.
{% endstep %}

{% step %}
### View the Optimiser panel

The Optimiser panel will open, displaying a list of all unfilled Appointments or Shifts within the date range currently shown in the Planner.
{% endstep %}
{% endstepper %}

***

## What gets pulled into the Optimiser?

When the Optimiser is opened, it retrieves all records where the required number of Resources does not meet the defined ratio and the Status is Scheduled or Planned. These records are considered _unfilled_ and are therefore eligible for optimisation or broadcasting.

Additionally, the Optimiser will also only consolidate records from the defined Period currently displayed in the Planner at the time it is opened.

**Included Records:**

* Appointments or Shifts where **Status** is _Scheduled_ or _Planned_.
* Records where the number of **Resources** does not meet the **Ratio**.
* Appointments or Shifts visible within the **current Planner date range**.

{% hint style="info" %}
For example, a Shift requiring two staff members but currently assigned only one will appear in the Optimiser until the second Resource is confirmed.
{% endhint %}

**Excluded Records:**

* Appointments or Shifts marked as _Completed_ or _Cancelled_.
* Records that already meet the required Resource or Participant Ratio.
* Records outside of the visible Planner date range.

{% hint style="info" %}
For example, if you have an unfilled Appointment in the following week to the one set in your Planner, that Appointment will not display in the Optimiser.
{% endhint %}

***

## Optimiser Parts

The Optimiser is made up of a range of different parts, each are described in the table below:

{% hint style="info" %}
Please note, key parts of the Optimiser are described in further detail below. Please click the Part name to learn more.
{% endhint %}

|   No.  | Part                                                                                | Description                                                                                                                                                                                                                                                                                                                                                         |
| :----: | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  **1** | [**Resource Pool**](resource-optimiser-kb-revised.md#resource-pool)                 | Used to create filters to define a smaller, more relevant group of Resources for Optimisation. Only Resources matching the selected pool criteria will be considered when running the Optimiser.                                                                                                                                                                    |
|  **2** | [**Ranking Criteria**](resource-optimiser-kb-revised.md#ranking-criteria)           | Criteria you add adjust Resource scoring.                                                                                                                                                                                                                                                                                                                           |
|  **3** | [**Settings**](resource-optimiser-kb-revised.md#optimiser-settings)                 | Provides configuration options for Optimisation behaviour on a per run basis.                                                                                                                                                                                                                                                                                       |
|  **4** | **Status Filters**                                                                  | Allows filtering of Appointments or Shifts within the Optimiser by status, for example showing only _Filled_ or _Partially Filled_ records.                                                                                                                                                                                                                         |
|  **5** | **Progress Indicator**                                                              | Shows the number of filled versus total unfilled records (e.g. _0 of 51 filled_). Updates automatically during optimisation and provides the ability to pause your run at any stage.                                                                                                                                                                                |
|  **6** | [**Broadcast Trigger**](/broken/pages/9c165972b00c3569fc80fc4793d029d4f5f85f12)     | Triggers the modal for the Broadcasting process for selected records based on the current Ranking Criteria, Resource Pool and Settings. To learn more about Broadcasting, [click here](/broken/pages/9c165972b00c3569fc80fc4793d029d4f5f85f12).                                                                                                                     |
|  **7** | **Optimisation Trigger**                                                            | Executes the Optimisation process for selected records based on the current Ranking Criteria, Resource Pool and Settings.                                                                                                                                                                                                                                           |
|  **8** | **Select All**                                                                      | Selects or deselects all records within the list for batch Optimisation or Confirmation.                                                                                                                                                                                                                                                                            |
|  **9** | **Status Column**                                                                   | Displays the current Status of each Appointment or Shift (e.g. Unfilled, Filled, Partially Filled, or Error).                                                                                                                                                                                                                                                       |
| **10** | **Appointment Column**                                                              | Shows the Appointment or Shift identifier, including the date and time. Please note, this information is configurable and based on your Appointment Text Format in the [Planner Management Settings](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/planner-management#text-format).                                                                       |
| **11** | **Configurable Column**                                                             | Allows custom configuration to display additional fields such as Location or Participants.                                                                                                                                                                                                                                                                          |
| **12** | [**Resource Column**](resource-optimiser-kb-revised.md#resource-column)             | Displays current Resources.                                                                                                                                                                                                                                                                                                                                         |
| **13** | **Required Badge**                                                                  | Displays the number of Resources required for the Appointment or Shift based on the defined Ratio.                                                                                                                                                                                                                                                                  |
| **14** | **Pending Badge**                                                                   | Displays the number of Resources who have been Broadcast to but have not yet responded.                                                                                                                                                                                                                                                                             |
| **15** | **Accepted Badge**                                                                  | Displays the number of Resources who have Accepted the Appointment or Shift but are not yet confirmed.                                                                                                                                                                                                                                                              |
| **16** | **Confirmed Badge**                                                                 | Displays the number of confirmed Resources currently allocated to the Appointment or Shift.                                                                                                                                                                                                                                                                         |
| **17** | [**Appointment Insights**](resource-optimiser-kb-revised.md#appointment-insights)   | Provides further and more detailed matching information for each Resource, including matched and unmatched criteria. It also displays all Pending Resources related to the Appointment or Shift.                                                                                                                                                                    |
| **18** | [**Manual Assignment**](resource-optimiser-kb-revised.md#manually-assign-resources) | Allows manual selection or replacement of Resources from the Appointment or Shift using Maica's Find Resource modal.                                                                                                                                                                                                                                                |
| **19** | **Undo**                                                                            | Reverts to the last Optimisation for the selected Appointment or Shift.                                                                                                                                                                                                                                                                                             |
| **20** | **Cancel**                                                                          | Exits the Optimiser without saving any changes made during the current session. A confirmation modal will appear before closing.                                                                                                                                                                                                                                    |
| **21** | **Confirm**                                                                         | Saves all Optimisation results and applies them to the selected Appointments or Shifts. Once confirmed, a summary screen will display all changes made during the session. _Please note, while using the Optimiser, no records are updated in Maica until **Confirm** is selected. Any changes made prior to confirmation exist only within the Optimiser session._ |

Please refer to the sections below for further detail on the above described Optimiser parts:

{% hint style="info" %}
Please note: The Resource Pool, Ranking Criteria and Optimiser Settings are respected by both Optimisation Runs and Broadcasting Runs.
{% endhint %}

***

### Resource Pool

The **Resource Pool** is used to define a smaller, more relevant group of Resources for optimisation or broadcasting. Only Resources matching the criteria added to the pool will be considered when running either of the above mentioned methods.

To configure the Resource Pool:

{% stepper %}
{% step %}
### Click **Add Criteria**

Click **Add Criteria**.
{% endstep %}

{% step %}
### Specify the filter row

A new filter row will appear where you can specify the **Field**, **Operator**, and **Value**.
{% endstep %}

{% step %}
### Add more criteria

Multiple criteria can be added to refine the pool further.
{% endstep %}

{% step %}
### Apply the criteria together

Each added criterion is combined with an **AND** condition, meaning all must be met for a Resource to be included.
{% endstep %}
{% endstepper %}

**Understanding Filter Components**

Each criterion is made up of three components:

| Component    | Description                                                                                                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Field**    | Defines which field the Optimiser will evaluate. Fields are grouped under **Resource** or **Skill** objects. Examples include _Resource > Work Type_, _Resource > Gender_, or _Skill > Certificate_.                                |
| **Operator** | Determines how the value is compared to the field. Common operators include _equals_, _not equal to_, _contains_, and _does not contain_. The Operator value is refined depending on the selected Field.                            |
| **Value**    | The specific value being matched against the field. This may be a picklist option, text entry, or date, depending on the selected field. For example, if _Resource > Gender_ is chosen, available values might be _Man_ or _Woman_. |

**Example:** Adding the criterion _Resource > Work Type equals Full-Time_ limits the pool to only full-time staff. Adding an additional rule such as _Skill > Certificate IV in Disability_ will further narrow the pool so that only full-time staff who hold that qualification are considered.

{% hint style="info" %}
The **Current Pool** count shows how many Resources meet all applied criteria.
{% endhint %}

{% hint style="info" %}
The Resource Pool does not impact the order of Resource ranking -- only which Resources are included for evaluation.
{% endhint %}

***

### Ranking Criteria

Unlike the Resource Pool, the **Ranking Criteria** controls how Resources are scored and prioritised when compared against Appointments or Shifts. It uses the same **Add Criteria** process as described in the **Resource Pool** section above, but serves a different function.

{% hint style="info" %}
While the **Resource Pool** determines _who_ is eligible to be considered, the **Ranking Criteria** determines _how well_ those Resources match the Appointment or Shift once they are included.
{% endhint %}

When Ranking Criteria is applied:

* A Resource must meet **at least one** of the criteria to be included in the Optimiser run.
* If a Resource meets **none** of the criteria, they are **excluded** entirely.
* Resources who meet **one or more** criteria are included and then **ranked** based on the number of criteria they satisfy.
* A Resource who meets more criteria will rank higher than a Resource who meets fewer.

Ranking Criteria therefore acts as both:

1. An _inclusion rule_ (must meet at least one), and
2. A _prioritisation rule_ (more matches = stronger candidate).

#### Example 1

**Criterion:** `Resource > Gender equals Woman`

* Any Resource who identifies as a Woman will be included and receive scoring contribution for this rule.
* Any Resource who does _not_ match this rule receives **zero** for this criterion and is **excluded** from automated selection.

#### Example 2: Two Different Criteria

**Criteria added:**

1. `Resource > Region equals East Metro`
2. `Resource > Language contains Mandarin`

Here is how Resources are treated:

| Resource | Matches Region? | Matches Language? | Included? | Relative Ranking       |
| -------- | :-------------: | :---------------: | :-------: | ---------------------- |
| Worker A |       Yes       |        Yes        |    Yes    | Highest (matches both) |
| Worker B |       Yes       |         No        |    Yes    | Medium (matches one)   |
| Worker C |        No       |        Yes        |    Yes    | Medium (matches one)   |
| Worker D |        No       |         No        |   **No**  | **Excluded**           |

**Key behaviour:**

* Worker A ranks highest because they meet **two** criteria.
* Workers B and C rank below Worker A because they meet **only one**.
* Worker D is **excluded** because they meet none.

{% hint style="info" %}
Removing or changing Ranking Criteria only affects optimisation runs with that criteria applied, it has no impact on previously optimised records.
{% endhint %}

***

### Optimiser Settings

#### Matching Score Importance Level

The **Matching Score Importance Level** determines how much influence each category has on the Resource's overall matching score. The total of all categories must equal **100%**, and each category's weight can be adjusted manually to prioritise what matters most to your organisation.

The categories are defined below:

| Category         | Description                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Skills**       | Measures how many of the required Skills a Resource has compared with the total Skills needed.                                                                                                                                                                                                                                                   |
| **Availability** | Checks whether the Resource has enough Available hours on the relevant day to cover the Appointment or Shift. Any existing usage or unavailability is subtracted from the daily limit, and the remaining time is compared against the requirement. The resulting score is weighted by the Availability percentage.                               |
| **Workload**     | Evaluates fortnightly capacity by comparing the required hours for the Appointment or Shift plus the Resource's current scheduled hours against their fortnightly limit (or weekly limit multiplied by two). The result is scaled by the Workload importance percentage.                                                                         |
| **Attributes**   | Counts how many requested Attributes a Resource satisfies (for example, gender, language, or experience).                                                                                                                                                                                                                                        |
| **Travel**       | Scores proximity by comparing the Resource's distance to the Appointment location against the closest candidate. Resources co-located or nearest to the site receive the highest score, weighted by the Travel importance percentage. See [How Travel Scoring Works](resource-optimiser-kb-revised.md#how-travel-scoring-works) for full detail. |

{% hint style="info" %}
For example, if _Attributes_ and _Skills_ are set to 40% each, and _Travel_ is set to 0%, the Optimiser will focus almost entirely on matching qualities and skill requirements, ignoring distance as a factor.
{% endhint %}

{% hint style="warning" %}
Please note, weighting does not filter Resources -- it influences _how strongly_ each matching criterion affects the total score.
{% endhint %}

#### Only use allocated Resources

This Setting restricts Optimisation to Resources who already have a defined relationship with the Participant. Meaning, only Resources who are a [Participant Resource](https://knowledge.maica.com.au/maica-knowledge-base/participants/participant-profile#participant-resources) to the allocated Participants on the Appointment or Shift will be considered.

***

### How Travel Scoring Works

The **Travel** category within the Matching Score evaluates how close each Resource is to the Appointment location. It is one of the most valued scoring categories for organisations with mobile workforces, as it directly impacts travel time, cost, and scheduling efficiency.

This section explains the full mechanics of the Travel score, including prerequisites, how each Resource's origin location is determined, and how the final score is calculated.

#### Prerequisites

For Travel scoring to be active, the following must be true:

{% stepper %}
{% step %}
### The Appointment must have a Location set

This can be a Location record, a Participant Location, or a Manual Entry address. Without a destination address, the system has no reference point to measure distance and **all Resources will receive a Travel score of 0%**.
{% endstep %}

{% step %}
### A valid Google API Key must be configured

This must be configured in Settings > Maps Management. The system geocodes the Appointment address using Google to obtain latitude and longitude coordinates.
{% endstep %}

{% step %}
### The Travel importance percentage must be greater than 0%

This must be set in the Matching Score Importance Level settings. If set to 0%, Travel is excluded from the overall score entirely.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
If you open the Resource Finder or Optimiser before setting a Location on the Appointment, the Travel score will not be calculated. Always set the Location first, then proceed to Resource selection.
{% endhint %}

#### How the Appointment Location is Resolved

The system resolves the Appointment's destination address based on its **Location Type**:

| Location Type            | Address Source                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Location**             | The address from the linked Location record. If the Location record has no address stored, Maica queries the record directly for its `Location Address`. |
| **Participant Location** | The `Participant Location` field on the Appointment.                                                                                                     |
| **Manual Entry**         | A concatenation of the `Street`, `City`, `State`, and `Postal Code` fields on the Appointment.                                                           |

Once resolved, the address is sent to Google's geocoding service to obtain precise latitude and longitude coordinates. If this geocoding call fails or the address cannot be resolved, Travel scoring is skipped for the entire run.

#### How Each Resource's Origin Location is Determined

Each Resource's starting location is determined by the **Default Origin/Destination Order** setting, found in **Settings > Maps Management**. This setting defines a prioritised list of location sources. The system tries each option in order and uses the **first one that resolves to a valid geolocation** for that Resource.

The configurable options are:

| Priority | Option                   | Label                         | Description                                                                                                                                                                                                                                                                                                                   |
| :------: | ------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     1    | `appointmentAddress`     | **Previous/Next Appointment** | The location of the Resource's most recent Appointment _earlier on the same day_ as the new Appointment. This reflects where the Resource will actually be coming from in a back-to-back scheduling scenario. The system queries the Resource's Appointment Resources for the closest prior appointment on that calendar day. |
|     2    | `primaryLocationAddress` | **Primary Location**          | The geolocation of the Resource's linked Primary Location record (e.g. their usual office, hub, or base).                                                                                                                                                                                                                     |
|     3    | `homeAddress`            | **Home Address**              | The geolocation stored directly on the Resource record (sourced from their address fields).                                                                                                                                                                                                                                   |
|     4    | `currentLocation`        | **Current Location**          | The Resource's live browser-based GPS location. **Note:** This option is only available in the client-side Travel Management modal and is **not used** in server-side scoring within the Resource Finder or Optimiser.                                                                                                        |

The **default priority order** is: `appointmentAddress > primaryLocationAddress > homeAddress > currentLocation`.

{% hint style="info" %}
The priority order is fully configurable. For example, if your organisation always wants to measure distance from the Resource's Primary Location regardless of their daily schedule, you can reorder the list in Maps Management to place `primaryLocationAddress` first.
{% endhint %}

{% hint style="warning" %}
If none of the configured options resolve to a valid geolocation for a given Resource (e.g. no same-day prior appointment, no Primary Location, and no Home Address on record), that Resource will display **"Location not found"** and will not receive a Travel score.
{% endhint %}

**Example:** A Resource has a confirmed Appointment at "SIL - Armadale" earlier in the day, and their Primary Location is "Senses Hub - Burswood". Using the default origin order, the system will use the Armadale appointment location as their origin (since `appointmentAddress` is first in priority), rather than the Burswood hub. If there were no same-day prior appointment, it would fall back to the Burswood hub location instead.

#### How the Travel Score is Calculated

The Travel score uses a **relative scoring model**. Rather than scoring Resources against a fixed distance threshold, it compares all Resources against each other:

{% stepper %}
{% step %}
### Calculate distance

The system calculates the **straight-line distance in kilometres** between each Resource's resolved origin and the Appointment's geocoded location.
{% endstep %}

{% step %}
### Identify the closest Resource

It identifies the **minimum distance** (the closest Resource).
{% endstep %}

{% step %}
### Calculate the score

Each Resource is scored as a ratio: `Score = Minimum Distance / Resource Distance`.
{% endstep %}
{% endstepper %}

This means:

* The **closest Resource** always receives **100%** for Travel.
* A Resource **twice as far** as the closest receives **50%**.
* A Resource **co-located** with the Appointment (distance = 0) receives **100%**.
* A Resource with no resolvable location receives **no score** and displays "Location not found".

The resulting percentage is then multiplied by the **Travel importance weighting** to determine its contribution to the overall matching score.

**Example:**

| Resource | Distance to Appointment | Travel Score |
| -------- | :---------------------: | :----------: |
| Worker A |      5 km (closest)     |     100%     |
| Worker B |          10 km          |      50%     |
| Worker C |          25 km          |      20%     |
| Worker D |    Location not found   |   No score   |

If the Travel importance is set to **20%**, Worker A contributes 20% to their overall score from Travel, Worker B contributes 10%, and Worker C contributes 4%.

{% hint style="info" %}
The Travel score is especially useful when combined with other criteria. For example, setting Skills to 40%, Availability to 30%, Workload to 10%, and Travel to 20% gives a balanced view where proximity is considered but does not override qualifications and availability.
{% endhint %}

***

### Resource Column

The **Resources** column displays all Resources linked to each Appointment or Shift within the Optimiser. Each Resource is represented by a status indicator (colour and outline) showing their current state in the optimisation or confirmation process. From this column, users can view, update, or manage Resource statuses using the available actions.

#### Resource Statuses

Each Resource is displayed as a pill with a distinct border colour and style to indicate its current status.

| Status        | Visual Indicator | Description                                                                                                                                                             |
| ------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Confirmed** | Black outline    | Indicates that the Resource has been confirmed for the Appointment or Shift. Confirmed Resources will be applied to the record once the Optimiser session is confirmed. |
| **Accepted**  | Yellow outline   | Indicates that the Resource has accepted an allocation but is not yet confirmed. These Resources are awaiting user confirmation.                                        |
| **Pending**   | Blue outline     | Shows that a Resource has been requested but has not yet responded. Pending Resources may later accept or decline.                                                      |
| **Declined**  | Red outline      | Indicates that the Resource declined the allocation. The Resource remains visible until manually removed or withdrawn.                                                  |
| **Withdrawn** | Greyed out       | Represents a Resource that has been withdrawn from the Appointment or Shift.                                                                                            |

#### Available Actions

Each Resource pill includes a dropdown menu providing context-sensitive actions. The available actions depend on the Resource's current status.

| Action       | Description                                                                                                              | Available When                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Confirm**  | Marks the Resource as confirmed for the Appointment or Shift. Once confirmed, the outline changes to black.              | Available for Resources with _Pending, Withdrawn, Declined_ or _Accepted_ status.      |
| **Decline**  | Marks the Resource as having declined the allocation. The outline changes to red.                                        | Available for Resources with _Pending, Withdrawn, Confirmed_ or _Accepted_ status.     |
| **Withdraw** | Withdraws a previously confirmed or accepted Resource. The pill becomes greyed out.                                      | Available for Resources with _Confirmed_, _Accepted_, _Pending_, or _Declined_ status. |
| **Remove**   | Removes the Resource from the Appointment or Shift entirely. This deletes the pill from the record within the Optimiser. | Available for all statuses.                                                            |

#### Example Scenarios

| Scenario                                             | Starting Status   | Action Taken               | Result                                                         |
| ---------------------------------------------------- | ----------------- | -------------------------- | -------------------------------------------------------------- |
| A previously confirmed Resource becomes unavailable. | Confirmed (black) | User selects **Withdraw**. | Resource becomes _Withdrawn_ (greyed out).                     |
| A declined Resource is no longer relevant.           | Declined (red)    | User selects **Remove**.   | Resource pill is removed from the Appointment.                 |
| A previously unavailable Resource becomes available. | Declined (red)    | User selects **Confirm**.  | Resource becomes _Confirmed_ and allocated to the Appointment. |

***

### Appointment Insights

The Appointment Insights modal is available for each Appointment or Shift, and is better used after the Optimiser has been run. It can be accessed by expanding the record and selecting the **Insights** icon.

The table below details the fields on each Insight:

| Field                       | Description                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Appointment ID and Time** | Displays the unique Appointment or Shift identifier and its scheduled start and end time.                                                                                                                                                                                                                                                                     |
| **Location**                | Shows the Appointment or Shift location or Note (e.g. _The Appointment is happening online_).                                                                                                                                                                                                                                                                 |
| **Pending Resources**       | _This is a Broadcasting function, coming to Maica shortly._                                                                                                                                                                                                                                                                                                   |
| **Overall Matching Score**  | Displays a percentage score showing how closely the Resource matches the Appointment or Shift. The score combines all weighted categories (Availability, Workload, Skills, Attributes, and Travel). Note, you can click the score to see a further breakdown of each category, as well as switch between any Resources allocated to the Appointment or Shift. |
| **Matched Criteria**        | Lists all conditions where the Resource met the Optimiser's requirements. Each entry includes a short description explaining the match, for example: _Available for scheduled time_ or _Within weekly limit_.                                                                                                                                                 |
| **Unmatched Criteria**      | Lists any conditions not met by the Resource, preventing a full match. For example: _Skill missing -- Certificate IV in Disability_ or _Travel distance exceeds defined range_.                                                                                                                                                                               |

***

### Manually Assign Resources

The **Manual Assignment** function allows users to select or replace Resources for an Appointment or Shift directly within the Optimiser. It provides full control over Resource allocation without rerunning the optimisation process.

{% hint style="info" %}
You can also launch Broadcasting from within the Find Resource modal. Doing so will pre-populate the selected Resource in the Manual Selection field of the Broadcast run and ensure they are one of, or the only, Resource to receive an offer.
{% endhint %}

Manual Assignment uses the [**Find Resource**](https://knowledge.maica.com.au/maica-knowledge-base/appointments/create-an-appointment/smart-selection-filter) modal to display all eligible Resources that meet the Optimiser's current configuration. Each Resource is shown with a corresponding **Overall Matching Score**, allowing users to make informed selections based on the same scoring logic used by automated optimisation.

{% hint style="info" %}
To learn more about the Find Resource modal, please [click here](https://knowledge.maica.com.au/maica-knowledge-base/appointments/create-an-appointment/smart-selection-filter).
{% endhint %}

{% hint style="info" %}
Please note, opening the Find Resource respects the defined Resource Pool in the Optimiser. Meaning, if you set _Resource > Work Type equals Full-Time_, then opening the Find Resource modal will only show Full-Time staff.
{% endhint %}

#### How Manual Assignment Works

{% stepper %}
{% step %}
### Open the Find Resource modal

Click the **Resource Column** in the Optimiser to open the **Find Resource** modal.
{% endstep %}

{% step %}
### Review available Resources

Review the list of available Resources and their matching scores. These will be ordered by the assigned Resources, followed by the most suitable remaining Resources.
{% endstep %}

{% step %}
### Search or sort

Use the **Search Bar** or **Sort By** options to locate preferred Resources.
{% endstep %}

{% step %}
### Select the Resources

Tick the checkbox beside each Resource you wish to assign.
{% endstep %}

{% step %}
### Confirm your selection

Click **Confirm** to save your selection within the Optimiser session.
{% endstep %}

{% step %}
### Review the updated record

The Appointment or Shift will display the newly assigned Resource(s) once the modal closes.
{% endstep %}
{% endstepper %}

#### Manual Assignment Scenarios

| Scenario                                                | Configuration                                                                                          | Action                                                                         | Outcome                                                                                                                                            |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Add extra Resource to a fully filled Appointment** | Appointment requires **2 Resources** and already has **2 confirmed**.                                  | You manually select and add an additional Resource.                            | The new Resource is added as an **extra allocation** and displayed in the Optimiser. Maica allows you to do so if desired.                         |
| **2. Replace a confirmed Resource**                     | Appointment has **1 confirmed Resource** who is no longer available.                                   | You open Manual Assignment, deselect the current Resource, and select another. | The new Resource replaces the previous one in the Optimiser view. Changes are not applied to the Appointment record until **Confirm** is selected. |
| **3. Add Resource to a partially filled Appointment**   | Appointment requires **2 Resources** but currently has **1 confirmed**.                                | You select an additional Resource manually.                                    | The Appointment now shows **2 confirmed** Resources and the record will be considered **fully filled** once confirmed.                             |
| **4. Assign multiple Resources at once**                | Appointment has **no Resources assigned** and requires **3**.                                          | You manually select three Resources from the list and confirm.                 | All three Resources are added simultaneously. The record will show as **filled** once confirmed on the main Optimiser screen.                      |
| **5. Add Resource who does not meet all criteria**      | Appointment requires **1 Resource**; you select a Resource with a **lower Matching Score** (e.g. 40%). | The selected Resource is manually confirmed.                                   | The Resource is still accepted. The Optimiser does not prevent manual overrides, allowing assignment even if some criteria are unmet.              |
| **6. Cancel without confirming**                        | You open Manual Assignment and select Resources but then choose **Cancel**.                            | You cancel the selection.                                                      | No changes are saved. The Appointment or Shift remains in its previous state.                                                                      |
