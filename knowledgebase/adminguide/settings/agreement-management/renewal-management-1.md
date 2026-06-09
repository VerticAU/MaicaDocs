# Renewal Management

**Renewal Management** lets Maica automatically generate a new Service Agreement ahead of an existing one expiring, so that participants experience no gap in funded service delivery. These settings control when the renewal runs, how the dates of the new Agreement are calculated, and who it is assigned to.

The renewal process only ever applies to Service Agreements that have an **End Date** and that have been individually opted in for renewal. It runs as a daily background job, and can also be triggered manually.

{% hint style="info" %}
To access these settings, navigate to **Maica Settings > Agreement Management > Renewal Management**.
{% endhint %}

## How renewal works

When the renewal logic runs, Maica looks for Service Agreements that meet the [entry criteria](renewal-management-1.md#entry-criteria) below. For each one, it creates a brand new Service Agreement by copying the expiring Agreement, including its **Agreement Items**, and then applies the date and owner settings you have configured.

The new Agreement is always created in **Draft** status. This gives you the opportunity to review and adjust the renewal before it becomes active, rather than having a live Agreement appear without oversight.

{% hint style="warning" %}
A renewal is **not** created if the calculated **End Date** of the new Agreement would already be in the past. Maica skips these records, as there is no value in generating an Agreement that has already expired.
{% endhint %}

## Entry criteria

For a Service Agreement to be picked up by the renewal process, **both** of the following must be true:

* **Auto Renewal** is enabled on the Service Agreement record (the `Auto Renewal` checkbox is ticked).
* The Agreement's **End Date** falls within the configured renewal window — that is, its End Date is no earlier than the number of days set in **Renew Service Agreements** before today.

{% hint style="warning" %}
**Auto Renewal must be enabled on each Service Agreement individually.** It is unticked by default. A Service Agreement with **Auto Renewal** left unchecked will never be renewed automatically, regardless of these settings. This is the most common reason a renewal does not generate as expected.
{% endhint %}

The **Auto Renewal** checkbox is found on the Service Agreement record. It records whether the participant has agreed to automatically renew their Service Agreement for the next period.

## Settings fields

The table below describes each field on the Renewal Management settings screen.

| Field                                               | Description                                                                                                                                                                                              | Options                                       |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Renew Service Agreements**                        | The number of days before an Agreement's End Date that it becomes eligible for renewal. This defines the renewal window: an Agreement is considered once today is within this many days of its End Date. | Numeric (minimum 1)                           |
| **Set the Renewed Service Agreement Start Date to** | How many days after the expiring Agreement's End Date the new Agreement should start. For example, entering `1` means the new Agreement begins the day after the existing one ends.                      | Numeric (minimum 1)                           |
| **Set the Renewed Service Agreement End Date to**   | How many days the new Agreement should run for, counted from its new Start Date. For example, entering `365` creates a one-year Agreement.                                                               | Numeric (minimum 1)                           |
| **Assign the Renewal Service Agreement to**         | Who the new Agreement is assigned to. Choose **Current Service Agreement Owner** to keep the same owner as the expiring Agreement, or **Select User** to assign all renewals to a specific user.         | Current Service Agreement Owner / Select User |
| **Daily Service Agreement Renewal Time**            | The time of day the automated renewal job runs. Only Agreements meeting the entry criteria at that time are actioned.                                                                                    | Time picker                                   |

{% hint style="info" %}
When **Select User** is chosen for **Assign the Renewal Service Agreement to**, an additional lookup appears so you can choose the specific user who will own all renewed Agreements.
{% endhint %}

### Default behaviour when a field is blank

If a value is not configured, Maica falls back to the following defaults when generating a renewal:

* **Start Date** — 1 day after the expiring Agreement's End Date.
* **End Date** — 30 days after the new Start Date.
* **Owner** — the current owner of the expiring Agreement.

## Running the renewal

There are two ways the renewal logic runs.

### Scheduling the daily job

Set the **Daily Service Agreement Renewal Time**, then use the **Enable** button to schedule the daily job. Once scheduled, Maica runs the renewal automatically at that time every day, and the button changes to **Disable** so you can stop the schedule at any time.

While the daily job is scheduled, the time field is locked. To change the run time, disable the schedule, adjust the time, and enable it again.

{% hint style="success" %}
Whether the daily job is currently scheduled is also visible under **Maica Settings > Scheduled Jobs**, where it appears as **Create Renewals - Daily**.
{% endhint %}

### Running on demand

The **Run Now** button immediately runs the renewal logic using the settings currently configured on the screen, without waiting for the scheduled time. This is useful for testing your configuration or processing renewals straight away. Maica displays live progress while the renewal batch runs and reports when it has completed, including whether any records completed with errors.

## What the renewal copies

When a renewal is generated, Maica clones the expiring Service Agreement and its **Agreement Items** onto the new record. The new Agreement and each of its Agreement Items take the recalculated **Start Date** and **End Date** described above. All other details are carried across from the source Agreement, giving you a like-for-like Draft that you can adjust before activating.

## Worked example

An organisation wants Agreements to roll over a month before they end, into a fresh 12-month Agreement starting the day after the old one finishes, keeping the same owner.

* **Renew Service Agreements** is set to `30`.
* **Set the Renewed Service Agreement Start Date to** is set to `1`.
* **Set the Renewed Service Agreement End Date to** is set to `365`.
* **Assign the Renewal Service Agreement to** is set to **Current Service Agreement Owner**.

A participant has a Service Agreement ending **30 June 2026** with **Auto Renewal** ticked. From **31 May 2026** (30 days before the End Date), the Agreement falls within the renewal window. When the daily job next runs, Maica creates a new **Draft** Service Agreement starting **1 July 2026** and ending **1 July 2027**, owned by the same user, with all Agreement Items copied across. The coordinator then reviews the Draft and activates it.
