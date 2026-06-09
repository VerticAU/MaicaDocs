---
description: >-
  Learn about how Maica automates the generation of timesheet activities for
  Resources.
---

# Timesheet Generation

Maica offers the capability to automate the generation of Timesheet Entries records for Resources. This includes dealing with Appointment and Shift Timesheet components as well as a number of Settings that determine how Timesheets are managed within Maica.

{% hint style="info" %}
The generation of timesheets is controlled via a Global Settings as well as a further setting, called `Timesheet Management` on an actual Resource record. To learn about the Settings that govern Timesheet Generation, [click here](../settings/timesheet-management.md). &#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/Maica Solution Architecture - Timesheet Generation.png" alt=""><figcaption><p>Maica's Timesheet Management Process</p></figcaption></figure>

This diagram represents a workflow related to managing Timesheet Management, particularly in relation to Resources.

1. Maica generates Timesheet Entries for Resources when either Appointments or Shifts are completed, either manually or via an automated process. This process is governed by the Settings detailed [here](../settings/timesheet-management.md).&#x20;
2. The first check performed by Maica is to determine what `Roster Mode` the Resource at the time of the Appointment or Shift.
   1. If the `Roster Mode` is set to `Appointment`, Maica will generate Timesheet Entries based on all Appointments completed by any given Resource.
   2. If the `Roster Mode` is set to `Shift`, Maica will generate Timesheet Entries based on all Shifts completed by any given Resource and ignore any Appointments that might have taken place during a Shift.
3. The second check is to determine if any Appointment Breaks have been recorded either during an Appointment or a Shift.&#x20;
   1. If an Appointment Break is marked as `Create Corresponding Timesheet`, Maica will **include** the Appointment Break in the Timesheet Entry for any given Resource.
   2. If an Appointment Break is **not** marked as `Create Corresponding Timesheet`, Maica will **exclude** the Appointment Break in the Timesheet Entry for any given Resource.
4. The third check is to determine if any Travel has been recorded during an Appointment.
   1. If Appointment Travel has been maked as `Create a Timesheet Entry`, Maica will include the Travel in the Timesheet Entry for any given Resource.

{% hint style="info" %}
In most cases, Maica will submit all generated timesheet entries to an awards intepretation solution for the purposes of payroll.
{% endhint %}
