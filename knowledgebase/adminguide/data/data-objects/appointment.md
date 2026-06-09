---
description: >-
  The Appointment object in Maica is used to manage the details of Appointment
  records in Maica Client Care, such as Start Date/End Date/Resource(s) etc
---

# Appointment

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Appointment** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1jr_F2Z07styutZOg55roS4eYEvLyaYMRzESd9rKpea8/edit?usp=sharing" %}
Appointment Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1jr_F2Z07styutZOg55roS4eYEvLyaYMRzESd9rKpea8/edit?usp=sharing) to view and download the complete Appointment Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Appointment Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### End Time Cannot Be Before Start Time&#x20;

Ensures that the End Time cannot be set prior to the Start Time.

| Validation Rule Detail  |                                                            |
| ----------------------- | ---------------------------------------------------------- |
| Rule Name               | VAL\_APPOINTMENT\_0001                                     |
| Error Message           | VAL\_0001: The End Time cannot be prior to the Start Time. |
| Error Location          | `Top of Page`                                              |

{% code title="Error Condition Formula " %}
```apex
maica_cc__Scheduled_Start__c  >  maica_cc__Scheduled_End__c
```
{% endcode %}

### Check out Date/Time Must Be After Check in Date/Time

The checkout date/time must be greater than the checkin date/time.

| Validation Rule Detail  |                                                                               |
| ----------------------- | ----------------------------------------------------------------------------- |
| Rule Name               | VAL\_APPOINTMENT\_0002                                                        |
| Error Message           | VAL\_0002: The checkout date/time must be greater than the checkin date/time. |
| Error Location          | `Top of Page`                                                                 |

{% code title="Error Condition Formula " %}
```apex
maica_cc__Check_out__c <  maica_cc__Check_in__c
```
{% endcode %}

### Cancellation Date Required When Cancellation Reason is Set

If the cancellation reason is set, then a cancellation date must be supplied.

| Validation Rule Detail  |                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------ |
| Rule Name               | VAL\_APPOINTMENT\_0003                                                               |
| Error Message           | VAL\_0003: A Cancellation Date must be entered if a Cancellation Reason is selected. |
| Error Location          | `Top of Page`                                                                        |

{% code title="Error Condition Formula " %}
```apex
AND(
    ISBLANK(TEXT(maica_cc__Cancellation_Date__c)),
    NOT(ISBLANK(TEXT(maica_cc__Cancellation_Reason__c)))
)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Appointment Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Appointment Geocoding&#x20;

This flow is designed to geocode the address of an appointment upon creation or update of the appointment record.

| Flow Detail  |                                        |
| ------------ | -------------------------------------- |
| Flow Label   | Maica - Appointment Geocoding          |
| API Name     | maica\_\_Maica\_Appointment\_Geocoding |
| Type         | `Autolaunched Flow`                    |

#### Flow Summary

This flow geocodes the address of an appointment and updates the appointment record with the latitude and longitude by:

* Triggering on the creation or update of an appointment record.
* Geocoding the address fields using an Apex action.
* Checking for errors in the geocoding process.
* Updating the appointment record with the geocoded latitude and longitude if no errors occur.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is triggered upon the creation or update of an appointment record.
   * The flow runs asynchronously after the record is saved.
   * Proceeds to geocode the address.
2. **Geocode the Address (Apex Action)**:
   * Calls the `GeocodeAddressInvocableProc` Apex action to geocode the address fields.
   * Passes the address fields and the record ID as input parameters.
   * Proceeds to the decision step to check for errors.
3. **Error? (Decision)**:
   * Checks if there was an error during the geocoding process by evaluating the `errorMessage` from the `Geocode_the_Address` action.
   * **No**: If no error, proceeds to update the appointment.
   * **Yes**: If an error occurred, the flow ends without updating the appointment.
4. **Update Appointment (Record Update)**:
   * Updates the appointment record with the latitude and longitude values obtained from the geocoding process.
   * Ends the flow.

</details>

## Trigger Handlers

The table below outlines the **Trigger Handlers** applied to the **Appointment Object** in **Maica** and their `Load Order`.

| Trigger Handler                                                                       | Load Order |
| ------------------------------------------------------------------------------------- | ---------- |
| [AppointmentTimeSheet\_MDTM](appointment.md#appointment-time-sheet)                   | 1          |
| [AppointmentStatus\_MDTM](appointment.md#appointment-status)                          | 1          |
| [AppointmentRollupParticipants\_MDTM](appointment.md#appointment-rollup-participants) | 2          |
| [AppointmentGeocode\_MDTM](appointment.md#appointment-geocoding)                      | 4          |
| [AppointmentDeliveryActivities\_MDTM](appointment.md#appointment-delivery-activities) | 5          |

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Appointment Time Sheet&#x20;

This trigger is designed to manage the timesheets for appointments in Maica. The outcome is accurate and reliable timesheet data for all appointments, ensuring proper time management and reporting.

| Detail      |                             |
| ----------- | --------------------------- |
| Load Order  | 1                           |
| Label       | `AppointmentTimeSheet_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AppointmentTimeSheet_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the timesheet process for appointments.

* **Trigger Conditions**:
  * When a new appointment (`maica__Appointment__c`) is created.
  * When an existing appointment is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an appointment record is created or updated, the trigger is initialised. The `AppointmentTimeSheet_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AppointmentTimeSheet_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The appointment data is validated to ensure it is complete and accurate.
     * **Timesheet Creation/Update**: Based on the appointment details, timesheet entries are created or updated to reflect the time spent on the appointment.
     * **Update**: The appointment record is updated with the newly created or updated timesheet data.

**Trigger Outcome**:

Once executed, the trigger ensures that each appointment has its timesheet entries created or updated correctly, based on the logic defined in the handler class. This helps maintain accurate timesheet data for appointments.

</details>

### Appointment Status

This trigger is designed to manage the status updates for appointments in Maica. The outcome is accurate and reliable status tracking for all appointments, ensuring proper management and communication.

| Detail      |                          |
| ----------- | ------------------------ |
| Load Order  | 1                        |
| Label       | `AppointmentStatus_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AppointmentStatus_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the status updates for appointments.

* **Trigger Conditions**:
  * When a new appointment (`maica__Appointment__c`) is created.
  * When an existing appointment is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an appointment record is created or updated, the trigger is initialised. The `AppointmentStatus_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AppointmentStatus_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The appointment data is validated to ensure it is complete and accurate.
     * **Status Update**: The appointment status is updated based on predefined criteria such as appointment type, time, and other relevant factors.
     * **Notification**: Relevant stakeholders are notified if necessary, ensuring that all parties are aware of the status changes.

**Trigger Outcome**:

Once executed, the trigger ensures that each appointment has its status updated correctly, based on the logic defined in the handler class. This helps maintain accurate status tracking for appointments.

</details>

### Appointment Rollup Participants&#x20;

This trigger is designed to manage the rollup of participants for appointments in Maica.

| Detail      |                                      |
| ----------- | ------------------------------------ |
| Load Order  | 2                                    |
| Label       | `AppointmentRollupParticipants_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AppointmentRollupParticipants_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the rollup of participants for appointments.

* **Trigger Conditions**:
  * When a new appointment (`maica__Appointment__c`) is created.
  * When an existing appointment is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an appointment record is created or updated, the trigger is initialised. The `AppointmentRollupParticipants_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `3.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AppointmentRollupParticipants_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The participant data is validated to ensure it is complete and accurate.
     * **Calculation**: The total number of participants is calculated based on predefined criteria such as appointment type and participant status.
     * **Update**: The appointment record is updated with the newly calculated rolled-up participant data.

**Trigger Outcome**:

Once executed, the trigger ensures that each appointment has its participants rolled up correctly, according to the logic specified in the handler class. This helps maintain accurate participant data for appointments.

</details>

### Appointment Geocoding&#x20;

This trigger is designed to manage the geocoding of appointments in Maica, maintaining accurate geographical data.&#x20;

| Detail      |                           |
| ----------- | ------------------------- |
| Load Order  | 4                         |
| Label       | `AppointmentGeocode_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AppointmentGeocode_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the geocoding process for appointments.

* **Trigger Conditions**:
  * When a new appointment (`maica__Appointment__c`) is created.
  * When an existing appointment is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an appointment record is created or updated, the trigger is initialised. The `AppointmentGeocode_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `4.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AppointmentGeocode_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The appointment address data is validated to ensure it is complete and accurate.
     * **Geocoding**: The validated address data is converted into geographical coordinates using geocoding services.
     * **Update**: The appointment record is updated with the newly obtained geographical coordinates.

**Trigger Outcome**:

Once executed, the trigger ensures that each appointment is geocoded correctly, according to the logic specified in the handler class. This helps maintain accurate geographical data for appointments.

</details>

### Appointment Delivery Activities&#x20;

This trigger is designed to manage the delivery activities for appointments in Maica.&#x20;

| Detail      |                                      |
| ----------- | ------------------------------------ |
| Load Order  | 5                                    |
| Label       | `AppointmentDeliveryActivities_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `AppointmentDeliveryActivities_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the delivery activities for appointments.

* **Trigger Conditions**:
  * When a new appointment (`maica__Appointment__c`) is created.
  * When an existing appointment is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an appointment record is created or updated, the trigger is initialised. The `AppointmentDeliveryActivities_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `6.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `AppointmentDeliveryActivities_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The appointment data is validated to ensure it is complete and accurate.
     * **Activity Creation/Update**: Based on the appointment details, delivery activities are created or updated to reflect the services or tasks associated with the appointment.
     * **Update**: The appointment record is updated with the newly created or updated delivery activity data.

**Trigger Outcome**:

Once executed, the trigger ensures that each appointment has its delivery activities created or updated correctly, according to the logic specified in the handler class. This helps maintain accurate delivery activity data for appointments.

</details>
