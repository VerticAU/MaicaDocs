---
description: Understand the admin-only Temporary Jobs area and the one-off jobs it runs
---

# Temporary Jobs

**Temporary Jobs** is an administrator-only area of Maica Settings for one-off jobs that are run on demand rather than on a schedule. These are typically jobs that accompany a specific release: a read-only diagnostic that reports records worth reviewing, or a one-time data migration that is run once and then retired.

Unlike [Scheduled Jobs](scheduled-jobs.md), nothing in Temporary Jobs runs on a recurring basis. Each job is started manually, reports its result, and is then finished with.

{% hint style="warning" %}
Temporary Jobs is not part of the everyday Settings experience. It is intended for system administrators working through a release's post-install steps, usually alongside Maica support.
{% endhint %}

## Where do I find Temporary Jobs?

{% stepper %}
{% step %}
#### Open Maica Settings

From the App Launcher, open **Maica Settings**.
{% endstep %}

{% step %}
#### Apply the administrator flag

Append `#admin=true` to the URL in your browser's address bar and reload the page.
{% endstep %}

{% step %}
#### Open Temporary Jobs

Select **Temporary Jobs** in the left sidebar.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Access requires the **Modify All Data** permission. This is enforced on the server as well as in the sidebar, so the section cannot be reached by URL alone without the permission.
{% endhint %}

If the Settings section you last used is not available to you, Maica opens Settings on the first section you can see rather than on an empty panel.

## What each job card shows

Every job in Temporary Jobs is presented as a card with the same set of information.

| Element          | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **Description**  | What the job does, and whether it changes any data                                                           |
| **Note**         | When the job should be run, and what to do with the result                                                   |
| **Run Now**      | Starts the job. Disabled while the job is already in flight                                                  |
| **Last run**     | The status, start and completion times, error count and the name of the user who started the most recent run |
| **Summary link** | Opens the summary Log entry written by the most recent run                                                   |

{% hint style="info" %}
A job that is **Holding**, **Queued**, **Preparing** or **Processing** cannot be started a second time. Maica checks this both when you click **Run Now** and again as the job begins.
{% endhint %}

## Available jobs

### Schedule Master Diagnostic

The **Schedule Master Diagnostic** lists every Schedule whose **Master Appointment** is not the earliest still-active Appointment on that Schedule.

The job is **read-only**. It writes to the Logs and changes no Appointment and no Schedule.

Run it to find Schedules whose Master Appointment was promoted out of order when an earlier Master was cancelled. Maica now promotes the earliest remaining Appointment, but a Schedule promoted out of order keeps its existing Master, and this job is how you find it.

#### Reading the results

Each flagged Schedule is written to the **Logs** as a Warning under the Source **Schedule Master Diagnostic**, naming:

* The Schedule
* Its current Master Appointment and that Appointment's scheduled start
* The earliest still-active Appointment on the Schedule and its scheduled start

A summary entry is written per run. To review one run's results, filter the Logs on the Job Id shown on the job card.

{% hint style="warning" %}
A flagged Schedule is a review candidate, not a confirmed problem. A sibling Appointment that was rescheduled to an earlier time than the Master produces exactly the same result legitimately. Review each one with the customer before repointing anything.
{% endhint %}

To repoint a Schedule, open the Schedule record and edit its **Master Appointment**. Nothing is repointed automatically.

### Participant Location Migration

The **Participant Location Migration** creates a primary **Client Address** Location for each Participant from the Contact mailing address, and links Participant Location Appointments to it.

This is a one-time migration. Run it once after upgrading, and it is removed from Temporary Jobs once Participant Location is fully retired. It is safe to run more than once.

{% hint style="warning" %}
If an earlier run of this migration left records unsaved or Contacts unprocessed, such as staff, GPs and guardians who have a Mailing Street, run it again. A run saves the records that an earlier run could not, and includes Contacts that were never processed.
{% endhint %}

#### Which Contacts are included

By default, the migration covers every Contact and Person Account that has a Mailing Street and has no primary Client Address Location. A Contact needs only a Mailing Street to be included. The City, State and Post Code can be blank.

#### How existing Locations are handled

* Duplicate checks consider only **Client Address** Locations, and ignore differences in punctuation and spacing.
* Where the Contact's mailing address matches an existing Client Address Location that is not yet primary, that Location is promoted to primary instead of being skipped, and its name has " (Primary)" added. Maica does not create a duplicate.
* Duplicate rules in your organisation do not stop Locations being created.

#### What happens when a record cannot be saved

One record that cannot be saved does not roll back the rest of its batch. Each Location or Appointment link that fails is written to the **Logs** as an **Error**, naming the record, the status code and the message. The other Contacts still receive their Location.

The summary **Log** for the run is an **Error** when any Location, standalone Location or Appointment failed, or when a batch failed outright, and an **Info** otherwise. It also reports how many existing Locations were promoted to primary. The job card shows the summary in both cases.

{% hint style="info" %}
Records that cannot be saved are logged and counted, but they do not make the job itself fail. Read the summary on the job card to see the result of a run.
{% endhint %}

#### Running it

* The migration cannot be started without the **Modify All Data** permission, or while a run is already in progress.
* Progress is reported across both phases of the migration, so the progress indicator follows the job through to completion rather than appearing to stop after the first phase.
* The migration cannot be scheduled. Any schedule for it that was set up from the Scheduled Jobs panel is removed automatically. If one is still listed under **Setup > Scheduled Jobs**, its card reports the stale schedule. Delete it, since the job is run on demand.

{% hint style="info" %}
Maica links Appointments in the second phase without queuing mass travel recalculations.
{% endhint %}

### Care Management Attribution

The **Care Management Attribution** job attributes provider Care Management usage to the Support at Home statement that covers its delivery date. It writes the Care Management line and the fees and hours on each statement it touches, and it changes no Budget Usage amounts.

Statement generation attributes Care Management usage for the Service Agreement it runs for. This job does the same for every statement, so it is used to attribute usage that built up before statements were generated, and any usage left over where a generation run reached its row limit.

Run it after the provider's Care Management budgets have been refreshed from the provider Account and after existing statements have been regenerated. See **Other** under Claim Management for how statements are generated.

#### How it runs

* The job works in steps of up to 2,000 rows, continuing from where the previous step stopped, and chains up to 50 steps in one run.
* Usage that a statement produced by an earlier statement flow has already reported is skipped.
* A delivery on the first day of a month is not attributed until that month's statements exist, because a statement produced by an earlier flow ends on the first day of the following month.
* The job requires the **Modify All Data** permission.

#### Reading the result

The job writes one cumulative **Info** summary to the **Logs** that reports what has been attributed and whether more usage remains. Where it says more usage remains, click **Run Now** again.

{% hint style="info" %}
If a step fails, only that step is rolled back and the failure is recorded in the Logs.
{% endhint %}

## Logs written by Temporary Jobs

Jobs in this area write to the standard Maica **Logs**, keyed by the Job Id of the run.

| Log type    | Written for                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| **Warning** | Each batch of records the job flagged for review                                             |
| **Error**   | Each record the job could not save, and the summary of a run where records or a batch failed |
| **Info**    | One summary entry per run, linked from the job card                                          |

Where a batch fails part way through a run, its records are excluded from the counts in the summary rather than being reported as reviewed.
