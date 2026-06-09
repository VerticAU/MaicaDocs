---
description: >-
  This object in Maica is used to define specific dates or periods where the
  Resource is unavailable, i.e. when they are not able to work.
---

# Unavailability

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Unavailability** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/16-twT-I1IsaovxXqqlKYIjFrvCne0Y5z4-oGgYgDB2s/edit?usp=sharing" %}
Unavailability Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/16-twT-I1IsaovxXqqlKYIjFrvCne0Y5z4-oGgYgDB2s/edit?usp=sharing) to view and download the complete Support Category Schema.
{% endhint %}

### Validation Rules

The list below outlines the **Validation Rules** applied to the **Unavailability Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule.**

### `Unavailable To` Date Cannot Be Before `Unavailable From` Date

Ensures that the Unavailable To date cannot be before the Unavailable From date.

| Validation Rule Detail  |                                                                               |
| ----------------------- | ----------------------------------------------------------------------------- |
| Rule Name               | VAL\_UNAVAILABILITY\_0001                                                     |
| Error Message           | VAL\_0001: The Unavailable To date cannot be before the Unavailable From date |
| Error Location          | `Unavailable To`                                                              |

{% code title="Error Condition Formula" %}
```apex
AND(
NOT(ISBLANK(maica_cc__Unavailable_From__c)),
NOT(ISBLANK(maica_cc__Unavailable_To__c)),
maica_cc__Unavailable_From__c > maica_cc__Unavailable_To__c
)
```
{% endcode %}

### `Unavailable To` / `Unavailable From` Cannot Be Changed if Status is Approved

Prevents editing the date fields once the Unavailability record has been marked as Approved.

| Validation Rule Detail  |                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| Rule Name               | VAL\_UNAVAILABILITY\_0003                                                                     |
| Error Message           | VAL\_0003: Unavailable From and Unavailable To cannot be changed when the Status is Approved. |

{% code title="Error Condition Formula" %}
```apex
AND(
  ISPICKVAL(maica_cc__Status__c, 'Approved'),
  OR(
    ISCHANGED(maica_cc__Unavailable_From__c),
    ISCHANGED(maica_cc__Unavailable_To__c)
  )
)
```
{% endcode %}

### `Status` Cannot Be Changed Once Approved

Prevents users from changing the Status value once it has been set to Approved.

| Validation Rule Detail  |                                                                       |
| ----------------------- | --------------------------------------------------------------------- |
| Rule Name               | VAL\_UNAVAILABILITY\_0004                                             |
| Error Message           | VAL\_0004: Status cannot be changed once it has been set to Approved. |

{% code title="Error Condition Formula" %}
```apex
AND(
  ISPICKVAL(PRIORVALUE(maica_cc__Status__c), 'Approved'),
  NOT(ISPICKVAL(maica_cc__Status__c, 'Approved'))
)
```
{% endcode %}

## Automation&#x20;

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Support Item Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Unavailability Status

This trigger is designed to manage the status of unavailability records in Maica.

| Detail      |                             |
| ----------- | --------------------------- |
| Load Order  | 1                           |
| Label       | `UnavailabilityStatus_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `UnavailabilityStatus_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the status setting process for unavailability records.

* **Trigger Conditions**:
  * When a new unavailability record (`maica__Unavailability__c`) is created.
  * When an existing unavailability record is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When an unavailability record is created or updated, the trigger is initialized. The `UnavailabilityStatus_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `UnavailabilityStatus_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The unavailability data is validated to ensure it is complete and accurate.
     * **Status Setting**: Based on predefined criteria, the status of unavailability is set or updated for each record, ensuring that it meets all necessary standards and requirements.
     * **Update**: The unavailability record is updated with the status details, indicating whether it has passed or failed the validation checks.

**Trigger Outcome**:

Once executed, the trigger ensures that each unavailability record has its status set or updated correctly, according to the logic specified in the handler class. This helps maintain accurate and consistent status data for unavailability records.

</details>

### Unavailability Appointments

This trigger is designed to manage the appointments related to unavailability records in Maica.

| Detail      |                                   |
| ----------- | --------------------------------- |
| Load Order  | 2                                 |
| Label       | `UnavailabilityAppointments_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `UnavailabilityAppointments_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the appointment management process for unavailability records.

* **Trigger Conditions**:
  * When a new unavailability record (`maica__Unavailability__c`) is created.
  * When an existing unavailability record is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialization**:
   * When an unavailability record is created or updated, the trigger is initialized. The `UnavailabilityAppointments_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialization, the trigger executes the logic defined in the `UnavailabilityAppointments_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The unavailability data is validated to ensure it is complete and accurate.
     * **Appointment Management**: Based on the unavailability, related appointments are either created or updated to ensure they reflect the unavailability accurately.
     * **Update**: The unavailability record is updated with the newly managed appointment data if necessary.

**Trigger Outcome**:

Once executed, the trigger ensures that each unavailability record has its related appointments managed correctly, according to the logic specified in the handler class. This helps maintain accurate appointment data and ensures that all appointments are in sync with unavailability records.

</details>
