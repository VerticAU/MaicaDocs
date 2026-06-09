---
description: >-
  This article provides an overview of how Maica manages Timezones across
  Salesforce records and the Maica Planner
---

# Maica Timezone Management

This article provides an overview of how Maica manages timezones across Appointment & Shift records, Appointment & Shift Locations, Salesforce users, and the Planner. Maica is built to ensure Appointments & Shifts are created in the correct local time for service delivery, while still appearing accurately to all users based on their current timezone—supporting remote teams, interstate operations, and national scheduling coordination.

***

### How Timezones Are Initially Set

When creating a new Appointment, the **timezone is automatically set** based on the **Salesforce user’s current browser timezone** (e.g. _Melbourne_).

This occurs on the **Basic Details** step of the ‘New Appointment’ screen, before a Location is selected.

***

### Timezone Confirmation Prompt (When Selecting a Location)

If a user selects a **Location** that is in a different timezone from their current one, Maica will detect this and show a confirmation modal.

Example: You are in **Melbourne** (GMT+10), and select a Location in **Perth** (GMT+8).

Maica will display:

* The current Appointment timezone (based on your browser)
* The timezone of the selected Location
* A prompt asking whether you’d like to **update the Appointment timezone** to match the Location

<figure><img src=".gitbook/assets/Screenshot 2025-05-21 at 11.27.56 am.png" alt=""><figcaption></figcaption></figure>

**If you click ‘Update’:**

* The Appointment’s timezone will be updated to match the Location (e.g. changed to _Australia/Perth_)
* When you return to the Basic Details section, you’ll see the new timezone applied.

***

### What does this mean for Scheduling?

Once the timezone is set (either by default or after confirmation), Maica treats all time inputs as relative to that timezone.

#### Example:

You are in **Melbourne**, but the Appointment location is **Perth**.\
You schedule the Appointment for **8:00 AM** (Perth time).

* The Appointment is stored as 8:00 AM _Australia/Perth_
* On your Planner (in Melbourne), this Appointment will appear at **10:00 AM**
* A user in **Perth** will see the Appointment at the intended local time of **8:00 AM**

***

### How Timezones Are Displayed in Maica

#### In the Appointment Record

* The Appointment Time Zone is displayed alongside the scheduled times
* All internal logic (travel, alerts, shifts) respects this timezone

#### In the Planner

* Appointment times are automatically converted and displayed in the **viewer’s browser timezone**
* A **globe icon** appears in the Planner header showing the viewer’s current timezone
* Tooltip appears on hover: _“Your current Time Zone”_

***

### Additional Behaviours

* If you change the **Location** after setting a timezone, Maica may prompt you again if a mismatch is detected.
* In **border regions**, Admins can override and manually select a timezone.
* For Appointments that **span multiple timezones**, Maica allows users to choose which timezone to apply.

***

### Summary Table

| **Layer**                 | **What It Controls**                                  | **How Maica Handles It**                                      |
| ------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| **Browser/User Timezone** | Sets default timezone when creating a new Appointment | Detected automatically via browser (e.g. Melbourne)           |
| **Location Timezone**     | Reflects where the Appointment service occurs         | Detected via Google API or manually selected                  |
| **Appointment Timezone**  | Stored on the record and used for travel/time logic   | Becomes the source of truth for scheduling                    |
| **Displayed Time**        | What each user sees on the Planner or record view     | Converted automatically to match each user’s browser timezone |

***

### Example Table&#x20;

| **Scenario**                                                                                                 | **User Timezone**   | **Appointment Location** | **Scheduled Time (Local)** | **What User Sees**                    |
| ------------------------------------------------------------------------------------------------------------ | ------------------- | ------------------------ | -------------------------- | ------------------------------------- |
| User in Melbourne creates an Appointment at 8:00 AM for a Perth Location and clicks **Update** when prompted | Melbourne (GMT+10)  | Perth (GMT+8)            | 8:00 AM Perth time         | 10:00 AM (adjusted to Melbourne time) |
| User in Sydney views an Appointment created by someone in Perth for 2:00 PM Perth time                       | Sydney (GMT+10)     | Perth (GMT+8)            | 2:00 PM Perth time         | 4:00 PM (adjusted to Sydney time)     |
| Admin in Brisbane creates Appointment with **no Location selected**                                          | Brisbane (GMT+10)   | None                     | 9:00 AM Brisbane time      | 9:00 AM                               |
| Admin in Adelaide selects a Melbourne Location and clicks **Update**                                         | Adelaide (GMT+9:30) | Melbourne (GMT+10)       | 11:00 AM Melbourne time    | 10:30 AM (adjusted to Adelaide time)  |
| Planner user in Perth views an Appointment scheduled in Melbourne at 1:00 PM                                 | Perth (GMT+8)       | Melbourne (GMT+10)       | 1:00 PM Melbourne time     | 11:00 AM (adjusted to Perth time)     |
