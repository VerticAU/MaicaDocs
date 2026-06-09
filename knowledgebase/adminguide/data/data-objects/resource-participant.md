---
description: >-
  The Resource Participant object in Maica captures the Participants a
  particular Resource looks after.
---

# Resource Participant

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Resource Participant** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1xNCv7gM7Us_DhNrcavk6QTDJA8nlSgoxB4OpjH3Lt50/edit?usp=sharing" %}
Resource Participant Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1xNCv7gM7Us_DhNrcavk6QTDJA8nlSgoxB4OpjH3Lt50/edit?usp=sharing) to view and download the complete Resource Participant Schema.
{% endhint %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Resource Participant Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Resource Participant Trigger

This flow updates the `Resource Participant` record based on its `Start Date` and `End Date`.

| Flow Detail  |                                             |
| ------------ | ------------------------------------------- |
| Flow Label   | Maica - Resource Participant Trigger        |
| API Name     | `maica__Maica_Resource_Participant_Trigger` |
| Type         | `Autolaunched Flow`                         |

#### Flow Summary

This flow ensures that the `Resource Participant` record is updated based on its `Start Date` and `End Date`.

* Starts on `Resource Participant` record creation or update.
* Updates the record on the `Start Date`.
* Updates the record 1 day after the `End Date`.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow begins when a `Resource Participant` record is created or updated.
   * It is triggered after the record is saved.
2. **Update Record (Scheduled Path - Start)**:
   * Updates the record based on the `Start Date`.
   * This path is scheduled to run immediately (0 days) after the `Start Date`.
3. **Update Record (Scheduled Path - End)**:
   * Updates the record based on the `End Date`.
   * This path is scheduled to run 1 day after the `End Date`.

</details>

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Service Agreement Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Resource Participant Manual Share&#x20;

This trigger is designed to manage the manual sharing of resource participants in Maica.

| Detail      |                                      |
| ----------- | ------------------------------------ |
| Load Order  | 1                                    |
| Label       | ResourceParticipantManualShare\_MDTM |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `ResourceParticipantManualShare_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the manual sharing process for resource participants.

* **Trigger Conditions**:
  * When a new resource participant (`maica__Resource_Participant__c`) is created.
  * When an existing resource participant is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a resource participant record is created or updated, the trigger is initialised. The `ResourceParticipantManualShare_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ResourceParticipantManualShare_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The resource participant data is validated to ensure it is complete and accurate.
     * **Manual Sharing**: Based on predefined criteria, manual sharing is executed to ensure each resource participant is shared appropriately.
     * **Update**: The resource participant record is updated with the newly shared details.

**Trigger Outcome**:

Once executed, the trigger ensures that each resource participant is shared manually as required, according to the logic specified in the handler class. This helps maintain accurate sharing details for resource participants.

</details>
