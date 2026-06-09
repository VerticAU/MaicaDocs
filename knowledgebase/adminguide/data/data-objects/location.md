---
description: >-
  The Location object in Maica represents a Location where Services are
  delivered, i.e. office or home address
---

# Location

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Location** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1asABKRaw8i7tShsR4XTTe9U7axdM_d4WocXONNQtOQo/edit?usp=sharing" %}
Location Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1asABKRaw8i7tShsR4XTTe9U7axdM_d4WocXONNQtOQo/edit?usp=sharing) to view and download the complete Location Schema.
{% endhint %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Location Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Location Geocoding

This flow is designed to geocode a location's address upon creation or update of the location record.

| Flow Detail  |                                   |
| ------------ | --------------------------------- |
| Flow Label   | Maica - Location Geocoding        |
| API Name     | `maica__Maica_Location_Geocoding` |
| Type         | `Autolaunched Flow`               |

#### Flow Summary

This flow geocodes the address of a location and updates the location record with the latitude and longitude by:

* Triggering on the creation or update of a location record.
* Geocoding the address fields using an Apex action.
* Checking for errors in the geocoding process.
* Updating the location record with the geocoded latitude and longitude if no errors occur.

<details>

<summary>Flow Description </summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is triggered upon the creation or update of a location record.
   * The flow runs asynchronously after the record is saved.
   * Proceeds to geocode the address.
2. **Geocode the Address (Apex Action)**:
   * Calls the `GeocodeAddressInvocableProc` Apex action to geocode the address fields.
   * Passes the address fields and the record ID as input parameters.
   * Proceeds to the decision step to check for errors.
3. **Error? (Decision)**:
   * Checks if there was an error during the geocoding process by evaluating the `errorMessage` from the `Geocode_the_Address` action.
   * **No**: If no error, proceeds to update the location.
   * **Yes**: If an error occurred, the flow ends without updating the location.
4. **Update Location (Record Update)**:
   * Updates the location record with the latitude and longitude values obtained from the geocoding process.
   * Ends the flow.

</details>

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Location Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Location Geocoding

This trigger is designed to manage the geocoding of locations in Maica.

| Detail      |                        |
| ----------- | ---------------------- |
| Load Order  | 1                      |
| Label       | `LocationGeocode_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `LocationGeocode_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the geocoding process for locations.

* **Trigger Conditions**:
  * When a new location (`maica__Location__c`) is created.
  * When an existing location is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a location record is created or updated, the trigger is initialised. The `LocationGeocode_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `LocationGeocode_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The location address data is validated to ensure it is complete and accurate.
     * **Geocoding**: The validated address data is converted into geographical coordinates using geocoding services.
     * **Update**: The location record is updated with the newly obtained geographical coordinates.

**Trigger Outcome**:

Once executed, the trigger ensures that each location is geocoded correctly, based on the logic defined in the handler class. This helps maintain accurate geographical data for locations.

</details>
