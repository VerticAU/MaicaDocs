---
description: >-
  This object represents a period where the Service Agreement will be placed in
  an On Leave Status.
---

# Service Agreement Leave

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Service Agreement Leave** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/10AtTakVIoqcw00xyLVUVhBUlKUn3EuELA30au9Nyz4c/edit?usp=sharing" %}
Service Agreement Leave Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/10AtTakVIoqcw00xyLVUVhBUlKUn3EuELA30au9Nyz4c/edit?usp=sharing) to view and download the complete Service Agreement Leave Schema.
{% endhint %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Service Agreement Leave Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Scheduled Updates&#x20;

This scheduled flow handles updates to Service Agreements and Consecutive Leave Counter based on Service Agreement Leave Status updates.

| Flow Detail  |                                                          |
| ------------ | -------------------------------------------------------- |
| Flow Label   | Maica - Service Agreement Leave - Scheduled Updates      |
| API Name     | `maica__Maica_Service_Agreement_Leave_Scheduled_Updates` |
| Type         | `Autolaunched Flow`                                      |

#### Flow Summary

This flow ensures that service agreements and their consecutive leave counters are accurately updated based on the leave status.

* Scheduled to run daily.
* Evaluates the leave status and updates the service agreement accordingly.
* Handles alternate active leave records and updates leave completion status.

<details>

<summary>Flow Description</summary>

1. **Start (Scheduled Flow)**:
   * The flow runs daily at midnight.
   * Filters records where `Leave_Complete__c` is false and `Leave_Status__c` is not 'Pending'.
2. **Decision Leave Status (Decision)**:
   * Determines the leave status:
     * If Leave Status is 'Active', it assigns service agreement values and updates the service agreement.
     * If Leave Status is 'Complete', it checks for alternate active leave records.
3. **Assign Service Agreement Values (Assignment)**:
   * Sets `On_Leave__c` to true.
   * Increments the `Consecutive_Leave_Days__c` by 1.
   * Sets the Service Agreement Id.
4. **Update Service Agreement (Record Update)**:
   * Updates the service agreement with the new values assigned.
5. **Get Alternate Active Leave Records (Get Records)**:
   * Retrieves any alternate active leave records related to the same service agreement.
6. **Decision Alternate Active Leave (Decision)**:
   * Determines if there are alternate active leave records:
     * If there are, it assigns variable values for the leave status and updates the service agreement leave.
     * If there are not, it assigns variable values to mark the leave as complete and updates the service agreement.
7. **Assign Variable Values (Assignment)**:
   * Sets `On_Leave__c` to false.
   * Marks `Leave_Complete__c` as true.
   * Resets `Consecutive_Leave_Days__c` to 0.
   * Sets the Service Agreement Id.
8. **Update Service Agreement (Record Update)**:
   * Updates the service agreement with the new values assigned.
9. **Assign Variable Values for Alternate Leave (Assignment)**:
   * Marks `Leave_Complete__c` as true.
10. **Update Service Agreement Leave (Record Update)**:
    * Updates the service agreement leave record.

</details>

### Triggered Updates&#x20;

This record-triggered flow handles updates to Service Agreements and the Consecutive Leave Counter when the Service Agreement Leave status is updated.

| Flow Detail  |                                                          |
| ------------ | -------------------------------------------------------- |
| Flow Label   | Maica - Service Agreement Leave - Triggered Updates      |
| API Name     | `maica__Maica_Service_Agreement_Leave_Triggered_Updates` |
| Type         | `Autolaunched Flow`                                      |

#### Flow Summary

This flow ensures that service agreements and their consecutive leave counters are accurately updated based on the leave status.

* Starts on the creation or update of a Service Agreement Leave record.
* Evaluates the leave status and updates the service agreement accordingly.
* Handles alternate active leave records and updates leave completion status.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow begins when a Service Agreement Leave record is created or updated.
   * It is triggered after the record is saved.
   * The flow is triggered by changes to Start Date, End Date, or when the record is newly created.
2. **Decision Leave Status (Decision)**:
   * Determines the leave status:
     * If Leave Status is 'Active', it checks the Leave Start Date.
     * If Leave Status is 'Complete', it checks for alternate active leave records.
3. **Decision Leave Start Date (Decision)**:
   * Checks if the Leave Start Date is equal to the current date:
     * If yes, it assigns service agreement values and updates the service agreement.
     * If the Leave Start Date is before the current date, it assigns service agreement values using a calculation and updates the service agreement.
4. **Assign Service Agreement Values (Assignment)**:
   * Sets `On_Leave__c` to true.
   * Increments the `Consecutive_Leave_Days__c` by 1 or calculates it based on the current date.
   * Sets the Service Agreement Id.
5. **Update Service Agreement (Record Update)**:
   * Updates the service agreement with the new values assigned.
6. **Get Alternate Active Leave Records (Get Records)**:
   * Retrieves any alternate active leave records related to the same service agreement.
7. **Decision Alternate Active Leave (Decision)**:
   * Determines if there are alternate active leave records:
     * If there are, it assigns variable values for the leave status and updates the service agreement leave.
     * If there are not, it assigns variable values to mark the leave as complete and updates the service agreement.
8. **Assign Variable Values (Assignment)**:
   * Sets `On_Leave__c` to false.
   * Marks `Leave_Complete__c` as true.
   * Resets `Consecutive_Leave_Days__c` to 0.
   * Sets the Service Agreement Id.
9. **Update Service Agreement Leave (Record Update)**:
   * Updates the service agreement leave record.

</details>

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Service Agreement Leave Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Service Agreement Leave Overlap

This trigger is designed to manage the overlap of leave periods in service agreements within Maica.

| Detail      |                                     |
| ----------- | ----------------------------------- |
| Load Order  | 1                                   |
| Label       | `ServiceAgreementLeaveOverlap_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `ServiceAgreementLeaveOverlap_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the overlap check process for service agreement leave periods.

* **Trigger Conditions**:
  * When a new service agreement leave (`maica__Service_Agreement_Leave__c`) is created.
  * When an existing service agreement leave is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a service agreement leave record is created or updated, the trigger is initialised. The `ServiceAgreementLeaveOverlap_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ServiceAgreementLeaveOverlap_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The leave period data is validated to ensure it is complete and accurate.
     * **Overlap Check**: Existing leave periods in the service agreement are checked for overlaps with the new or updated leave period.
     * **Update**: If an overlap is detected, the service agreement leave record is updated with overlap information to indicate the conflict.

**Trigger Outcome**:

Once executed, the trigger ensures that each service agreement leave period is checked for overlaps correctly, according to the logic specified in the handler class. This helps maintain accurate leave period data and prevents conflicts in service agreements.

</details>

### Service Agreement Leave Appointments

This trigger is designed to manage the appointments related to leave periods in service agreements within Maica.

| Detail      |                                          |
| ----------- | ---------------------------------------- |
| Load Order  | 1                                        |
| Label       | `ServiceAgreementLeaveAppointments_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `ServiceAgreementLeaveAppointments_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the appointment management process for service agreement leave periods.

* **Trigger Conditions**:
  * When a new service agreement leave (`maica__Service_Agreement_Leave__c`) is created.
  * When an existing service agreement leave is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a service agreement leave record is created or updated, the trigger is initialised. The `ServiceAgreementLeaveAppointments_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ServiceAgreementLeaveAppointments_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The leave period data is validated to ensure it is complete and accurate.
     * **Appointment Management**: Based on the leave period, related appointments are either created or updated to ensure they reflect the leave period accurately.
     * **Update**: The service agreement leave record is updated with the newly managed appointment data if necessary.

**Trigger Outcome**:

Once executed, the trigger ensures that each service agreement leave period has its related appointments managed correctly, according to the logic specified in the handler class. This helps maintain accurate appointment data and ensures that all appointments are in sync with leave periods.

</details>
