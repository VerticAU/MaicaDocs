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

Run it once after upgrading to V2.25, which corrected how a replacement Master Appointment is selected when a Master is cancelled. Schedules that were promoted out of order before the upgrade keep their existing Master, and this job is how you find them.

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
If you ran this migration on V2.21, run it again after upgrading to V2.29. The corrected migration saves records that the earlier run could not, and includes Contacts that were never processed, such as staff, GPs and guardians who have a Mailing Street.
{% endhint %}

#### Which Contacts are included

By default, the migration covers every Contact and Person Account that has a Mailing Street and has no primary Client Address Location. A Contact needs only a Mailing Street to be included. The City, State and Post Code can be blank.

#### How existing Locations are handled

* Duplicate checks consider only **Client Address** Locations, and ignore differences in punctuation and spacing.
* Where the Contact's mailing address matches an existing Client Address Location that is not yet primary, that Location is promoted to primary instead of being skipped, and its name has " (Primary)" added. Maica does not create a duplicate.
* Duplicate rules in your organisation no longer stop Locations being created.

#### What happens when a record cannot be saved

One record that cannot be saved no longer rolls back the rest of its batch. Each Location or Appointment link that fails is written to the **Logs** as an **Error**, naming the record, the status code and the message. The other Contacts still receive their Location.

The summary **Log** for the run is an **Error** when any Location, standalone Location or Appointment failed, or when a batch failed outright, and an **Info** otherwise. It also reports how many existing Locations were promoted to primary. The job card shows the summary in both cases.

{% hint style="info" %}
Records that cannot be saved are logged and counted, but they do not make the job itself fail. Read the summary on the job card to see the result of a run.
{% endhint %}

#### Running it

* The migration cannot be started without the **Modify All Data** permission, or while a run is already in progress.
* Progress is reported across both phases of the migration, so the progress indicator follows the job through to completion rather than appearing to stop after the first phase.
* The migration can no longer be scheduled. On upgrade, any schedule for it that was set up from the Scheduled Jobs panel is removed automatically. If one is still listed under **Setup > Scheduled Jobs**, its card reports the stale schedule. Delete it, since the job is now run on demand.

{% hint style="info" %}
Maica still links Appointments in the second phase without queuing mass travel recalculations.
{% endhint %}

## Logs written by Temporary Jobs

Jobs in this area write to the standard Maica **Logs**, keyed by the Job Id of the run.

| Log type    | Written for                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| **Warning** | Each batch of records the job flagged for review                                             |
| **Error**   | Each record the job could not save, and the summary of a run where records or a batch failed |
| **Info**    | One summary entry per run, linked from the job card                                          |

Where a batch fails part way through a run, its records are excluded from the counts in the summary rather than being reported as reviewed.
