# Scheduling RACs Background Jobs

Three residential aged care processes are designed to run automatically on a schedule: the billing engine, the resident fee rate check, and the held event status check. Each is registered as a job on the **Schedules** tab, where an administrator sets its run time and frequency. This article describes the three jobs, how each is enabled, and what the held event status check does when it runs.

It is written for administrators who configure and monitor the RACS background processes.

{% hint style="info" %}
The Schedules tab and its job controls (run time, frequency, start date, and the running-user and active or inactive indicators on each job) are the shared Maica scheduled-jobs framework. This article covers the RACS jobs specifically. For manual rate changes, see [Scheduling and Manual Rate Changes](scheduling-and-manual-rate-changes.md).
{% endhint %}

## The three RACS jobs

Each job appears as a row on the Schedules tab in the Billing Settings area, using the same controls as the other packaged Maica batch jobs.

| Job (Schedules-tab name)         | Apex class                    | What it does                                                          | Default run time |
| -------------------------------- | ----------------------------- | --------------------------------------------------------------------- | ---------------- |
| **RAC Billing Engine**           | `RAC_BillingEngine`           | Bills every due Agreement Item and rolls up invoices and statements   | 01:00            |
| **RAC Resident Fee Rate Check**  | `RAC_ResidentFeeCalloutBatch` | Polls Services Australia for per-resident fee rate changes            | 02:00            |
| **RACS Held Event Status Check** | `RACS_HeldEventStatusBatch`   | Refreshes the status of held Aged Care Events from Services Australia | 03:00            |

{% hint style="info" %}
The default run times are the times each job proposes when no schedule has been set yet. You can set any run time and frequency when you schedule the job.
{% endhint %}

## How each job is enabled

The three jobs differ in how they are gated. Two are controlled by an automation toggle; the third runs whenever it is scheduled.

### The toggle-gated jobs

The billing engine and the fee rate check are each gated by an automation toggle on the [RACS Configuration tab](../the-racs-configuration-tab/) (stored on the Billing Setting record):

| Job                         | Automation toggle                                              |
| --------------------------- | -------------------------------------------------------------- |
| RAC Billing Engine          | **Automate Billing Engine** (`Automate_Billing_Engine__c`)     |
| RAC Resident Fee Rate Check | **Automate Fee Rate Updates** (`Automate_Fee_Rate_Updates__c`) |

When a job's toggle is off, its row on the Schedules tab is shown but **disabled**, so you can see the job exists without it being able to run. This visible-but-disabled pattern mirrors the existing Calculate Total Committed job. Turn the toggle on to enable the row, then schedule the job.

{% hint style="info" %}
The toggle is the control point for these two jobs. You can leave a schedule in place and switch the process on or off with the toggle rather than deleting and recreating the schedule. The RACS Configuration tab surfaces **Automate Billing Engine**, **Automate Fee Rate Updates**, and **Automate Statement Reconciliation** in its Automation section.
{% endhint %}

### The held event status check

The RACS Held Event Status Check has no automation toggle. Once you schedule it, it runs on its schedule. It is enabled simply by being scheduled on the Schedules tab.

## What the held event status check does

The held event status check is a daily sweep that keeps the status of held Aged Care Events current, complementing the manual status refresh a user can run on an individual event.

When it runs, it looks at **every** held Aged Care Event that has a Services Australia event ID, across all event categories, and for each one calls Services Australia to refresh its status. It processes one event per batch chunk, because each refresh makes its own callout and commits its own result.

### Which categories are refreshed

The sweep refreshes events in six categories, routing each to the matching Services Australia read:

* Entry
* Departure
* Leave
* Opt In
* Enteral Feeding
* Oxygen

{% hint style="warning" %}
The **Extra Service** category is not refreshed by the sweep, because it has no status-read interface at Services Australia. An Extra Service event that is held is skipped and left in its held status, and the sweep logs a warning noting it was skipped.
{% endhint %}

### How failures are handled

Each event is refreshed inside its own error boundary, so one failure never stops the sweep:

* A successful refresh updates the event's status.
* The batch itself does not write status, ETag, or version back to the event; that writeback is handled by the GetProc's MapProc.
* A failed refresh is logged as an error, and the event stays held. The sweep moves on to the next event.
* When the sweep finishes, it writes a single rollup Info Log\_\_c with Source = `RACS Held Event Status Batch`.

{% hint style="info" %}
To review a run, filter the Log list view by the source **RACS Held Event Status Batch**. Any per-event failures appear as their own error log rows.
{% endhint %}
