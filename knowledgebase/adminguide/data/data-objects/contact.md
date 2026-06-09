---
description: >-
  The Contact object in Maica is used to manage the details of individuals
  associated with service delivery, including clients, guardians, and carers.
---

# Contact

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Contact** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1yuyVlN-IoleCjqByAdsSKJsvvtba7Y_TO7L9nEkLVVk/edit?usp=sharing" %}
Contact Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1yuyVlN-IoleCjqByAdsSKJsvvtba7Y_TO7L9nEkLVVk/edit?usp=sharing) to view and download the complete Contact Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Contact Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule**.

### NDIS Number Must Be 9 Digits

Ensures that the NDIS Number is 9 digits.

| Validation Rule Detail  |                                                                         |
| ----------------------- | ----------------------------------------------------------------------- |
| Rule Name               | VAL\_CONTACT\_0001                                                      |
| Error Message           | VAL\_0001: If provided, the NDIS Number must be 9 characters in length. |
| Error Location          | `Top of Page`                                                           |

{% code title="Error Condition Formula " %}
```apex
IF (
NOT(ISBLANK(maica_cc__NDIS_Number__c)), OR(LEN(maica_cc__NDIS_Number__c) <>9, NOT(
ISNUMBER(maica_cc__NDIS_Number__c))), false
)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Contact Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Participant Geocoding&#x20;

This Salesforce Autolaunched Flow is designed to geocode addresses for participants, updating their latitude and longitude based on the provided address information.

| Flow Detail  |                                      |
| ------------ | ------------------------------------ |
| Flow Label   | Maica - Participant Geocoding        |
| API Name     | `maica__Maica_Participant_Geocoding` |
| Type         | `Autolaunched Flow`                  |

#### Flow Summary

This flow facilitates the geocoding of participant addresses by:

* Detecting changes to participant records and ensuring address fields are populated.
* Calling an Apex action to geocode the address.
* Updating the participant record with the geocoded latitude and longitude.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is initiated upon the creation or update of a participant record.
   * Checks if the latitude and longitude are set to 0.0 and ensures that the address fields (MailingCity, MailingPostalCode, MailingStreet, and MailingState) are not null.
   * Proceeds to geocode the address asynchronously after the record is saved.
2. **Geocode the Address (Apex Action)**:
   * Calls the `GeocodeAddressInvocableProc` Apex action to geocode the address.
   * Passes the address fields and the record ID as input parameters.
   * Captures the latitude and longitude from the geocoding result.
   * Proceeds to the `Error` decision.
3. **Error? (Decision)**:
   * Checks if there is an error message from the geocoding process.
   * If no error, proceeds to update the participant record with the geocoded latitude and longitude.
   * If an error is detected, the flow ends.
4. **Update Participant (Update Records)**:
   * Updates the participant record with the latitude and longitude from the geocoding result.
   * Ends the flow.

</details>

## Trigger Handlers&#x20;

The list below outlines the **Trigger Handlers** applied to the **Contact Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Participant Geocoding&#x20;

This trigger is designed to manage the geocoding of participants in Maica.

| Detail     |                           |
| ---------- | ------------------------- |
| Load Order | 1                         |
| Label      | `ParticipantGeocode_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `ParticipantGeocode_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the geocoding process for participants.

* **Trigger Conditions**:
  * When a new participant (`Contact`) is created.
  * When an existing participant is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a participant record is created or updated, the trigger is initialised. The `ParticipantGeocode_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ParticipantGeocode_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The participant's address data is validated to ensure it is complete and accurate.
     * **Geocoding**: The validated address data is converted into geographical coordinates using geocoding services.
     * **Update**: The participant record is updated with the newly obtained geographical coordinates.

**Trigger Outcome**:

Once executed, the trigger ensures that each participant is geocoded correctly, based on the logic defined in the handler class. This helps maintain accurate geographical data for participants.

</details>

### Contact Update Connections Type

This trigger is designed to manage the updating of connection types for contacts in Maica.

| Detail     |                                     |
| ---------- | ----------------------------------- |
| Load Order | 2                                   |
| Label      | `ContactUpdateConnectionsType_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `ContactUpdateConnectionsType_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the updating process for connection types.

* **Trigger Conditions**:
  * When a new contact (`Contact`) is created.
  * When an existing contact is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a contact record is created or updated, the trigger is initialised. The `ContactUpdateConnectionsType_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ContactUpdateConnectionsType_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The contact data is validated to ensure it is complete and accurate.
     * **Update**: The connection type is updated based on predefined criteria such as contact status or type.
     * **Notification**: Relevant stakeholders are notified if necessary, ensuring that all parties are aware of the updates.

**Trigger Outcome**:

Once executed, the trigger ensures that each contact's connection type is updated correctly, based on the logic defined in the handler class. This helps maintain accurate data and operational efficiency.

</details>

