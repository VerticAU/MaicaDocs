---
description: >-
  The Resource object in Maica is used to manage the details of your Service
  Delivery Staff, i.e. Care Workers or Coordinators.
---

# Resource

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Resource** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1ysYtUhp8qKW_meZSBqP_NTFnYTsQoKzS1KNrHrICGpE/edit?usp=sharing" %}
Resource Schema
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1ysYtUhp8qKW_meZSBqP_NTFnYTsQoKzS1KNrHrICGpE/edit?usp=sharing) to view and download the complete Resource Schema.
{% endhint %}

## Validation Rules

The list below outlines the **Validation Rules** applied to the **Resource Object** in **Maica**.&#x20;

Please refer to the list below for more detailed information on each **Validation Rule**.

### End Date Must Not Be Before Start Date

Ensures that the End Date cannot be before the Start Date.

| Validation Rule Detail  |                                                          |
| ----------------------- | -------------------------------------------------------- |
| Rule Name               | VAL\_RESOURCE\_0001                                      |
| Error Message           | VAL\_0001: The End Date cannot be before the Start Date. |
| Error Location          | `Top of Page`                                            |

{% code title="Error Condition Formula " %}
```apex
AND(
    NOT(ISBLANK(maica_cc__Start_Date__c)),
    NOT(ISBLANK(maica_cc__End_Date__c)),
    maica_cc__Start_Date__c > maica_cc__End_Date__c
)
```
{% endcode %}

### Required Resource Attributes when Resource type is Resource&#x20;

This validation rule ensures key Resource attributes are populated when the Resource Type is Resource. These attributes are:&#x20;

* `Employment Type`&#x20;
* `Weekly Hours Limit`&#x20;
* `Daily Hours Limit`&#x20;
* `Weekly Hours Minimum`&#x20;

| Validation Rule Detail  |                                                                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rule Name               | VAL\_RESOURCE\_0002                                                                                                                                             |
| Error Message           | VAL\_0002: When the Resource Type is Resource, the following fields are required: Employment Type, Weekly Hours Limit, Daily Hours Limit, Weekly Hours Minimum. |
| Error Location          | `Top of Page`                                                                                                                                                   |

{% code title="Error Condition Formula" %}
```apex
AND(
ISPICKVAL(maica_cc__Resource_Type__c, "Resource"),
OR(
ISPICKVAL(maica_cc__Employment_Type__c, ""),
ISBLANK(maica_cc__Weekly_Hours_Limit__c),
ISBLANK(maica_cc__Weekly_Hours_Minimum__c),
ISBLANK(maica_cc__Daily_Hours_Limit__c)
)
)
```
{% endcode %}

### Weekly Hours Minimum Must Be Less Than Weekly Hours Limit&#x20;

Ensures that the Weekly Hours Minimum is less than the Weekly Hours Limit.

| Validation Rule Detail  |                                                                       |
| ----------------------- | --------------------------------------------------------------------- |
| Rule Name               | VAL\_RESOURCE\_0003                                                   |
| Error Message           | VAL\_0003: Weekly Hours Minimum must be less than Weekly Hours Limit. |
| Error Location          | `Weekly Hours Minimum`                                                |

{% code title="Error Condition Formula" %}
```apex
AND(
    NOT(ISNULL(maica_cc__Weekly_Hours_Minimum__c)),
    NOT(ISNULL(maica_cc__Weekly_Hours_Limit__c)),
    maica_cc__Weekly_Hours_Minimum__c >= maica_cc__Weekly_Hours_Limit__c
)
```
{% endcode %}

### Related User Required when Resource Type equals Resource

Ensures the User lookup is populated when Resource Type = Resource.

| Validation Rule Detail  |                                                                      |
| ----------------------- | -------------------------------------------------------------------- |
| Rule Name               | VAL\_RESOURCE\_0004                                                  |
| Error Message           | VAL\_0004: A related User is required when Resource Type = Resource. |
| Error Location          | `User`                                                               |

{% code title="Error Condition Formula" %}
```apex
AND(
    ISPICKVAL(maica_cc__Resource_Type__c, "Resource"),
    ISBLANK(maica_cc__User__c)
)
```
{% endcode %}

## Automation

## Flows&#x20;

The list below outlines the **Flows** applied to the **Resource Object** in **Maica**.

Please refer to the list below for more detailed information on each **Flow**.&#x20;

### Resource Geocoding

This Salesforce Autolaunched Flow is designed to geocode addresses for resources, updating their latitude and longitude based on the provided address information.

| Flow Detail |                                   |
| ----------- | --------------------------------- |
| Flow Label  | Maica - Resource Geocoding        |
| API Name    | `maica__Maica_Resource_Geocoding` |
| Type        | `Autolaunched Flow`               |

#### Flow Summary

This flow facilitates the geocoding of resource addresses by:

* Detecting changes to resource records and ensuring address fields are populated.
* Calling an Apex action to geocode the address.
* Updating the resource record with the geocoded latitude and longitude.

<details>

<summary>Flow Description</summary>

1. **Start (Record-Triggered Flow)**:
   * The flow is initiated upon the creation or update of a resource record.
   * Checks if the latitude and longitude are set to 0.0 and ensures that the address fields (City, Street, State, and Postal Code) are not null.
   * Proceeds to geocode the address asynchronously after the record is saved.
2. **Geocode the Address (Apex Action)**:
   * Calls the `GeocodeAddressInvocableProc` Apex action to geocode the address.
   * Passes the address fields and the record ID as input parameters.
   * Captures the latitude and longitude from the geocoding result.
   * Proceeds to the `Error` decision.
3. **Error? (Decision)**:
   * Checks if there is an error message from the geocoding process.
   * If no error, proceeds to update the resource record with the geocoded latitude and longitude.
   * If an error is detected, the flow ends.
4. **Update Resource (Update Records)**:
   * Updates the resource record with the latitude and longitude from the geocoding result.
   * Ends the flow.

</details>

## Trigger Handlers&#x20;

The list below outlines the **Trigger Handlers** applied to the **Resources Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Resource Deactivation

This trigger is designed to manage the deactivation of resources in Maica.

| Detail     |                             |
| ---------- | --------------------------- |
| Load Order | 1                           |
| Label      | `ResourceDeactivation_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Trigger Execution**

The trigger logic defined in the `ResourceDeactivation_MDTM` class is executed when the trigger conditions are met.&#x20;

* **Trigger Conditions**:
  * When a new resource (`maica__Resource__c`) is created.
  * When an existing resource is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a resource record is created or updated, the trigger is initialised. The `ResourceDeactivation_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ResourceDeactivation_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The resource status and related data are validated to ensure they meet the criteria required for deactivation.
     * **Deactivation**: The deactivation process is applied based on predefined criteria such as resource status and utilisation.
     * **Update**: Related records are updated, and relevant stakeholders are notified if necessary.

**Trigger Outcome**:

Once executed, the trigger ensures that each resource is deactivated correctly, based on the logic defined in the handler class. This helps maintain data integrity and operational efficiency.

</details>

### Resource Geocoding

This trigger is designed to manage the geocoding of resources in Maica.

| Detail     |                        |
| ---------- | ---------------------- |
| Load Order | 2                      |
| Label      | `ResourceGeocode_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome </summary>

**Trigger Execution**

The trigger logic defined in the `ResourceGeocode_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the geocoding process for resources.

* **Trigger Conditions**:
  * When a new resource (`maica__Resource__c`) is created.
  * When an existing resource is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a resource record is created or updated, the trigger is initialised. The `ResourceGeocode_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `ResourceGeocode_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The resource address data is validated to ensure it is complete and accurate.
     * **Geocoding**: The validated address data is converted into geographical coordinates using geocoding services.
     * **Update**: The resource record is updated with the newly obtained geographical coordinates.

**Trigger Outcome**:

Once executed, the trigger ensures that each resource is geocoded correctly, based on the logic defined in the handler class. This helps maintain accurate geographical data for resources.

</details>
