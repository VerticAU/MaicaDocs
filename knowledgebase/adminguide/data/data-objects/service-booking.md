---
description: >-
  The Service Booking object in Maica represents a PRODA Service Booking (Plan)
  for a given Participant.
---

# Service Booking

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Service Booking** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/10bn-c07a0l4bXMh_Aye-a9_sy9oNMoti4BZGS3K6WCU/edit?usp=sharing" %}
Service Booking Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/10bn-c07a0l4bXMh_Aye-a9_sy9oNMoti4BZGS3K6WCU/edit?usp=sharing) to view and download the complete Service Booking Schema.
{% endhint %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Service Booking Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Booking 90 Days Before Expiration Notification&#x20;

This flow is designed to send an email notification 90 days before the expiration of a service booking.

| Flow Detail  |                                                         |
| ------------ | ------------------------------------------------------- |
| Flow Label   | Maica - Booking 90 Days Before Expiration Notification  |
| API Name     | `maica__Booking_90_Days_Before_Expiration_Notification` |
| Type         | `Autolaunched Flow`                                     |

#### Flow Summary

This flow sends an email notification 90 days before the expiration of a service booking by:

* Detecting changes to service booking records and scheduling the flow to run 90 days before the end date.
* Checking if the email template is set and if the end date is in the future.
* Determining the email recipient based on the email setting.
* Sending the email notification to the determined recipient.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is initiated upon the creation or update of a service booking record.
   * Scheduled to run 90 days before the service booking's end date.
   * Proceeds to a placeholder assignment to fix packaging issues.
2. **Is Template in Email Setting Null And End Date in Future? (Decision)**:
   * Checks if the email template is set and if the end date of the service booking is in the future.
   * If the conditions are met, proceeds to determine the email recipient.
3. **To Whom Should This Message Be Delivered? (Decision)**:
   * Determines the recipient of the email based on the email setting:
     * If the recipient is the current participant owner, sets the user ID to the participant owner ID and proceeds to send the email.
     * If the recipient is a specific user and the user ID is set in the email setting, sets the user ID to the specified user ID and proceeds to send the email.
4. **Set Service Booking Participant Owner Id (Assignment)**:
   * Sets the user ID to send the email to the participant's owner ID.
   * Proceeds to send the email.
5. **Set User Id (Assignment)**:
   * Sets the user ID to send the email to the user ID specified in the email setting.
   * Proceeds to send the email.
6. **Send Email (Apex Action)**:
   * Calls the `SendEmailInvocable` Apex action to send the email.
   * Passes the email template, sender's email address, and recipient's user ID as input parameters.
   * Ends the flow.

</details>

### Booking Utilisation Change Notification&#x20;

This flow is designed to send an email notification when the utilisation of a service booking crosses a specified threshold.

| Flow Detail  |                                                  |
| ------------ | ------------------------------------------------ |
| Flow Label   | Maica - Booking Utilisation Change Notification  |
| API Name     | `maica__Booking_Utilisation_Change_Notification` |
| Type         | `Autolaunched Flow`                              |

#### Flow Summary

This flow sends an email notification when the utilisation of a service booking crosses a specified threshold by:

* Detecting changes to service booking records.
* Checking if the email template is set.
* Determining whether the email notification should be sent based on the utilisation thresholds.
* Identifying the email recipient based on the email settings.
* Sending the email notification to the determined recipient.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is triggered upon the creation or update of a service booking record.
   * The flow runs asynchronously after the record is saved.
   * It proceeds to check if the email template is set.
2. **Is Template in Email Setting Null? (Decision)**:
   * Checks if the email template specified in the email settings is not null.
   * If the template is set, proceeds to check if the email notification should be sent.
3. **Should The Email Notification Be Sent? (Decision)**:
   * Determines whether the email notification should be sent based on the following conditions:
     * The current utilisation is not null.
     * The previous utilisation is not null.
     * The previous utilisation is less than the threshold specified in the email setting.
     * The current utilisation is greater than the threshold specified in the email setting.
   * If all conditions are met, proceeds to determine the email recipient.
4. **To Whom Should This Message Be Delivered? (Decision)**:
   * Determines the recipient of the email based on the email setting:
     * If the recipient is the current participant owner, sets the user ID to the participant owner ID.
     * If the recipient is a specific user and the user ID is set in the email setting, sets the user ID to the specified user ID.
   * Proceeds to send the email.
5. **Set Service Booking Participant Owner Id (Assignment)**:
   * Sets the user ID to send the email to the participant's owner ID.
   * Proceeds to send the email.
6. **Set User Id (Assignment)**:
   * Sets the user ID to send the email to the user ID specified in the email setting.
   * Proceeds to send the email.
7. **Send Email (Apex Action)**:
   * Calls the `SendEmailInvocable` Apex action to send the email.
   * Passes the email template, sender's email address, and recipient's user ID as input parameters.
   * Ends the flow.
8. **Handle Error (Assignment)**:
   * If an error occurs during the process, assigns the error message to the `FlowFaultMessage` variable.

</details>

