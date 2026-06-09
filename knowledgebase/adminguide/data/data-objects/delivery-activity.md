---
description: >-
  A Delivery Activity in Maica captures services delivered to a
  participant/client including the support item to bill, duration, and date
  information.
---

# Delivery Activity

## Fields & Relationships &#x20;

The table below provides a comprehensive overview of all fields and relationships for the **Delivery Activity** object in **Maica**. Please refer to the table below for detailed information.

{% embed url="https://docs.google.com/spreadsheets/d/1ZuLfotv_3Xq7_P84ePs2Zd5IRuqOjBGeEKRB-PkF5Jk/edit?usp=sharing" %}
Delivery Activity Schema&#x20;
{% endembed %}

{% hint style="success" %}
Click [here](https://docs.google.com/spreadsheets/d/1ZuLfotv_3Xq7_P84ePs2Zd5IRuqOjBGeEKRB-PkF5Jk/edit?usp=sharing) to view and download the complete Delivery Activity Schema.
{% endhint %}

## Automation&#x20;

## Trigger Handlers

The list below outlines the **Trigger Handlers** applied to the **Delivery Activity Object** in **Maica**.

Please refer to the list below for more detailed information on each **Trigger Handler**.&#x20;

### Delivery Activity Appointments&#x20;

This trigger is designed to manage the association of delivery activities with appointments in Maica. The outcome is accurate and reliable data for all delivery activities and their associated appointments, ensuring proper management and reporting.

| Detail     |                                     |
| ---------- | ----------------------------------- |
| Load Order | 1                                   |
| Label      | `DeliveryActivityAppointments_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `DeliveryActivityAppointments_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the association process for delivery activities and appointments.

* **Trigger Conditions**:
  * When a new delivery activity (`maica__Delivery_Activity__c`) is created.
  * When an existing delivery activity is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a delivery activity record is created or updated, the trigger is initialised. The `DeliveryActivityAppointments_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `1.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `DeliveryActivityAppointments_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The delivery activity data is validated to ensure it is complete and accurate.
     * **Association**: Delivery activities are associated with the correct appointments based on predefined criteria such as activity type and appointment details.
     * **Update**: The delivery activity record is updated with the associated appointment data.

**Trigger Outcome**:

Once executed, the trigger ensures that each delivery activity is associated with the correct appointment, according to the logic specified in the handler class. This helps maintain accurate delivery activity and appointment data.

</details>

### Delivery Activity Invoices

This trigger is designed to manage the invoicing for delivery activities in Maica. Ensures correct generation of invoices for delivery activities, maintaining accurate invoicing data.

| Detail     |                                 |
| ---------- | ------------------------------- |
| Load Order | 2                               |
| Label      | `DeliveryActivityInvoices_MDTM` |

<details>

<summary>Execution, Logic &#x26; Outcome</summary>

**Execution of Trigger Logic**:

The trigger logic defined in the `DeliveryActivityInvoices_MDTM` class is executed when the trigger conditions are met. The class contains the code that manages the invoicing process for delivery activities.

* **Trigger Conditions**:
  * When a new delivery activity (`maica__Delivery_Activity__c`) is created.
  * When an existing delivery activity is updated.
  * Any specific field changes that are monitored by the trigger (defined in the handler class).

#### Logic Explanation

1. **Initialisation**:
   * When a delivery activity record is created or updated, the trigger is initialised. The `DeliveryActivityInvoices_MDTM` metadata type configuration is loaded, ensuring that the trigger is active (`Active__c` is `true`) and has the correct load order (`Load_Order__c` is `2.0`).
2. **Trigger Execution**:
   * Upon initialisation, the trigger executes the logic defined in the `DeliveryActivityInvoices_MDTM` class.
   * The class methods perform the following steps:
     * **Validation**: The delivery activity data is validated to ensure it is complete and accurate.
     * **Invoice Generation**: Based on the delivery activity details, invoices are generated to reflect the services provided.
     * **Update**: The delivery activity record is updated with the newly generated invoice data.

**Trigger Outcome**:

Once executed, the trigger ensures that each delivery activity has its invoices generated correctly, according to the logic specified in the handler class. This helps maintain accurate invoicing data for delivery activities.

</details>
