---
description: Learn how to create an Appointment using the Standard experience in Maica
---

# Standard Experience

{% hint style="info" %}
Maica offers two experiences for creating and managing Appointments, **Standard** and **Legacy**. The experience you see depends on your organisation's settings. If your screen does not look like the one described below, contact your administrator.
{% endhint %}

In the Standard experience, an Appointment is created in a single screen with two steps. In the first step you enter the details, editing each one in place. In the second, the **Summary** shows what will be delivered, to whom and at what cost, before you save.

{% @arcade/embed url="https://app.arcade.software/share/eflavDWLGcemDDq0kxeO" flowId="eflavDWLGcemDDq0kxeO" %}

## Starting a new Appointment

To create an Appointment, drag across the [Planner](../../the-planner/planner-overview.md) to select a time, or use the [Planner Quick Action](../../the-planner/planner-actions/create-new-appointment.md). Maica pre-populates some details from the Planner view you are in:

| Planner view           | Pre-populated details                                           |
| ---------------------- | --------------------------------------------------------------- |
| **Schedule**           | Start and end date and time                                     |
| **Participant View**   | Start and end date and time, and the Participant                |
| **Asset View**         | Start and end date and time, and the Asset                      |
| **Accommodation View** | Start and end date and time, the Location and the Accommodation |

The footer shows where you are in the process, as **Step 1 of 2** or **Step 2 of 2**.

## Step 1: entering the details

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2F7SyivDRYTuSsfgTOiM7D%2Fimage.png?alt=media&#x26;token=97a48082-80da-47d2-b2ba-8eeb401ebbec" alt="The first step of creating an Appointment in the Standard experience"><figcaption><p>Entering the details of an Appointment</p></figcaption></figure>

Each detail of the Appointment is a row. Click a row to open it, make your change, and move on to the next. A row you have not filled in yet shows a prompt, such as **Add Date and Time**, **Add Participants**, **Add Resources**, **Add Services**, **Add Location** or **Add Schedule**.

When the details are complete, click **Next** to move to the Summary.

{% hint style="info" %}
The rows shown depend on the **Available Sections** configured on the selected Appointment Services and the default sections in Maica Settings, so you only see the details your organisation uses.
{% endhint %}

### Date and time

The **Date and Time** row is required. Enter a start and an end, or a start and a duration, and Maica works out the other. A new Appointment starts with your organisation's default duration.

If you move the end to before the start, Maica moves the start back to keep the Appointment's length.

The times are read in the time zone shown on the row, which you can change. Beneath the row, a subtitle shows the time zone and whether the Appointment repeats, for example **Repeats Weekly** or **Does not repeat**.

### Participants

Search for Participants by name, or click the filter icon to open **Find Participants** for a more detailed search. To learn more, see [Smart Selection Filter](general/smart-selection-filter.md).

Beneath the list, **Required Participants** shows how many Participants the Appointment needs. Click the number to change it, then tick to confirm. The icon beside the count tells you whether the Participants selected match the number required, and hovering it explains why.

Where a Participant has a problem, such as no funding for a selected Service, it is shown on that Participant.

### Resources

Search for active Resources by name, or click the filter icon to open **Find Resources**.

Beneath the list, **Required Resources** shows how many Resources the Appointment needs, and can be changed in the same way as Required Participants.

Where a Resource carries a warning, such as a possible conflict with their availability, the warning is shown in amber on that Resource. Click it to confirm that the Resource should still be allocated.

### Services

Search for an Appointment Service by its name or its tags. Each Service you add becomes its own row, with one row for each Claim Type it is delivered under. Each row shows:

* The Service name
* Its **Claim Type**, which you can click to change
* An icon showing whether the Service can be funded

To deliver the same Service under another Claim Type, search for the Service again. A new row is added with the Standard Claim Type, which you can then change.

| Icon          | Meaning                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| Green tick    | The Service can be delivered and billed                                                                        |
| Padlock       | The Service is billed against a stated Service Agreement Item, or against the funding source you selected      |
| Amber warning | A funding decision is needed. Make it in [Select Funding Source](standard-experience.md#select-funding-source) |
| Red error     | The Service cannot be delivered as it stands, for example because no funding covers it                         |

Hover over any icon to see why it is shown. While Maica is checking a Service's funding, a spinner is shown in place of the icon.

One Service on the Appointment is the **Primary Support**, marked with a star. To make a different Service the Primary Support, click its arrow icon. To remove a Service, click its remove icon.

### Location

The **Location** row offers three types of location:

| Location type      | What to enter                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Online**         | Nothing further. The Appointment takes place online                                                                                                                         |
| **Location**       | Choose an existing Location. Its address is shown beneath as the **Location Address**. Where Accommodation is in use, you can also choose an Accommodation at that Location |
| **Manual Address** | Enter an address, or search for one. A Street is required                                                                                                                   |

Beside the Location search, the people icon switches the search to the selected Participant's own addresses.

Where the Appointment has exactly one Participant and no Location has been chosen, Maica switches to that Participant's addresses and fills in their primary address. A Location you have already chosen is never replaced.

Once a Location is set, click **Click Here to Manage Travel** to open the Manage Travel dialog and work out travel to and from the Appointment for each Resource. When travel has been calculated, the link reads **Travel Calculated. Click here to Manage**.

### Schedule

To make the Appointment repeat, open the **Schedule** row and click **Add Schedule**. Opening the row on its own does not create a schedule.

Set the start and end dates, how often the Appointment repeats and at what interval. For a weekly schedule, choose the days of the week. You can set the length of the series either by an end date or by a number of occurrences, and Maica shows how many Appointments the schedule will create. Where public holidays are excluded, Maica also shows how many fall within the schedule.

A schedule can create up to 730 occurrences.

Once added, the row shows a one-line summary of the recurrence. To remove the schedule, click **Remove Schedule** (the X on the row).

### Other details

| Row                  | What it holds                                             |
| -------------------- | --------------------------------------------------------- |
| **Assets**           | The Assets used during the Appointment                    |
| **Appointment Type** | The Type of the Appointment                               |
| **Status**           | The status the Appointment is created with                |
| **Checklist**        | The Checklists that apply to the Appointment              |
| **Instructions**     | Instructions for the Resources delivering the Appointment |
| **Custom Fields**    | Any fields your organisation has added to Appointments    |

## Step 2: the Summary

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2F6XAGrFzDFI93YhVI4viZ%2Fimage.png?alt=media&#x26;token=c7463f5a-3ff2-4783-b6c3-7060a19ded61" alt="The Summary step of an Appointment in the Standard experience"><figcaption><p>The Summary</p></figcaption></figure>

The Summary shows what will be delivered before you save. At the top are the **Date and Time**, the **Location** and, where the Appointment repeats, the **Schedule**.

Beneath them, the Services are listed by Participant. Each Participant's Services are shown under their name, with the Claim Type beneath each Service. Every Service on the Appointment is listed under every selected Participant, and each line can be unticked if that Participant does not need that Service.

### Quantity

Each line shows its **Scheduled Quantity**, in the Service's unit, and the Ratio it is delivered at. Where no quantity has been set, the line reads **not set**. Where you are permitted to, click the quantity to change it, then tick to confirm.

### Cost

Where your organisation shows Appointment costs, each line shows its cost, coloured by its funding position:

| Colour | Meaning                                                                                                          |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| Green  | The cost is within the Participant's remaining budget                                                            |
| Amber  | The Participant is on leave during the Appointment. Hover to see the details                                     |
| Red    | The indicative cost of this Service exceeds the current remaining budget for the Participant's Service Agreement |

Where a cost could not be calculated, a retry icon is shown instead. Click it to calculate the cost again.

From the Summary you can also open the [Select Funding Source](standard-experience.md#select-funding-source) and [Adjust Ratio Matrix](standard-experience.md#adjust-ratio-matrix) dialogs, described below.

## Select Funding Source

{% embed url="https://app.arcade.software/share/JUUBDfV983P4snq1N1TN" %}
Selecting Appointment Funding
{% endembed %}

The **Select Funding Source** dialog is where you decide which funding pays for each Service. You open it from the Summary.

The dialog shows one tab per Participant. Inside a tab, the funding options are listed in a single table, grouped by Service, so the options for one Service read as one block. Each tab carries a status icon:

| Icon          | Meaning                                        |
| ------------- | ---------------------------------------------- |
| Green tick    | Every Service on this tab has a funding source |
| Amber warning | At least one Service still needs a selection   |

### What each column shows

| Column                 | What it holds                                                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Service**            | The Appointment Service, named on the first line of its group                                                                                                                |
| **Select**             | The tick that chooses this option                                                                                                                                            |
| **Support Item**       | The Support Item the Agreement Item funds, or the **Support Category** where the Agreement Item is category funded. On an unfunded line, this cell holds a Price List search |
| **Funding Type**       | The Agreement Item's Funding Type, or **Unfunded** on an unfunded line                                                                                                       |
| **Funding**            | **Category Funding** or **Stated** for an Agreement Item, or **Price List** on an unfunded line                                                                              |
| **Amount / Remaining** | The Agreement Item's Remaining Amount                                                                                                                                        |

{% hint style="info" %}
Hover over a **Support Item** to see the Agreement Item's record number alongside its name.
{% endhint %}

{% hint style="info" %}
The **Amount / Remaining** figure is only shown to users permitted to see Appointment costs. The funding options themselves are shown to everyone who can select them.
{% endhint %}

### Choosing a funding source

Where Maica has resolved the funding for a Service on its own, that line is ticked and locked. This happens when the Participant has only one Agreement Item that can fund the Service, or when the cost calculation has already resolved one.

Where the Service requires a funding source to be selected and the Participant has more than one Agreement Item that could fund it, no line is ticked and the tab stays amber until you choose. The dialog states: _We've found more than one Funding Source that can be used for this Service._

Where the Service can be delivered unfunded, an **Unfunded** line closes its group. Tick it and choose a Price List. Only active Price Lists with at least one active entry are offered. Until a Price List is chosen, the line shows an amber **Selection Required** badge.

Choosing an Agreement Item clears any Price List on that line, and choosing a Price List clears any Agreement Item.

Where no Agreement Item covers the Service and it cannot be delivered unfunded, the group shows: _No Agreement Item covers this Appointment Service for this Participant, and it cannot be delivered unfunded._

{% hint style="info" %}
Whether you are asked to choose a funding source, and whether a Service can be delivered unfunded, is set for each Appointment Service by your administrator.
{% endhint %}

{% hint style="warning" %}
A funding source saved on a Service is carried forward only while it is still valid. An Agreement Item that has since expired is no longer offered, and the Service asks for a selection again.
{% endhint %}

The funding you select is saved with the Appointment, and is used whenever the Appointment is costed or billed.

## Adjust Ratio Matrix

The **Adjust Ratio Matrix** shows every Participant against every Service in one grid, so you can set the figures for one Participant and Service without affecting the others. You open it from the Summary.

Participants run down the side and Services across the top. Each cell holds one Participant's figure for one Service. A dash means that Participant is not receiving that Service, and the cell cannot be edited.

The toggle at the top right switches the grid between two figures:

| Figure                 | What it holds                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scheduled Quantity** | The amount scheduled for that Participant, in the Service's unit. Enter a number of zero or more, to two decimal places                                              |
| **Ratio**              | The support ratio, written workers first as two whole numbers separated by a colon, for example `1:3`. A muted ratio means the cell uses the Appointment's own ratio |

Click a cell to edit it, then tick to confirm. Changing a Ratio does not change the Scheduled Quantity, and nothing is saved until you click **Confirm**.

## Saving the Appointment

While Maica is checking the Participants, Resources and Services, **Next** and the save button are greyed out. Anything that stops the Appointment being saved is listed above the details, including any Participant who has no Service and any Service still waiting on a funding decision.

## Shifts

The Standard experience is also used for Shifts. For a Shift:

* The Participants row is not shown
* The Location is required, and is chosen from existing Locations only
* Travel does not apply
* Labels read in Shift terms, for example **Shift Service**
