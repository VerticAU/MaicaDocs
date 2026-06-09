---
description: Learn about the Automation involved when Importing Data into Maica
---

# Data Import Flows

## What are the Data Import Flows?

As part of the [Data Import Utility](./), Automation is involved to ensure it's successful completion.&#x20;

When using the tool, you are prompted to select a `Flow Setting` that essentially tells **Maica** which type of Data you are wanting to Import and allows the Automation to read the files correctly.  It is important to understand the logic within the Automation and the altercations to the Data that will be involved when doing so. This article explains the logic behind each `Flow Setting` in more detail.&#x20;

### Maica - NDIS Import Support Items Catalogue

This flow is designed to automate the import of NDIS support items and their associated prices based on various state-specific rates and conditions.

| Flow Detail |                                                     |
| ----------- | --------------------------------------------------- |
| Flow Label  | Maica - NDIS Import Support Items Catalogue         |
| API Name    | maica\_\_Maica\_NDIS\_Import\_Support\_Item\_Prices |
| Type        | `Autolaunched Flow`                                 |

#### Flow Summary

This flow imports NDIS support items and their associated prices based on state-specific rates and conditions.

* Starts automatically and checks if the Support Item Number is present.
* Calls the import support item Apex action if the item number is valid.
* Passes variables like allowed states, claim types, prices for different regions, and item details.
* Handles errors by assigning appropriate fault messages when required.

<details>

<summary>Flow Description </summary>

1. **Start (Auto-Launched Flow)**:
   * The flow is auto-launched and starts by verifying whether the **Support Item Number** is present.
   * It checks if the **Support Item Number** is not null or empty.
2. **Decision (Support Item Number Is Not Null)**:
   * **Outcome: Null**: If the **Support Item Number** is empty or null, the flow proceeds to the **Handle Support Item Number Null** step, which sets an error message.
   * **Outcome: Not Null**: If the **Support Item Number** is present, the flow proceeds to the **Call Import Support Item** step.
3. **Call Import Support Item (Apex Action)**:
   * The flow uses the **NDISImportSupportItemsPricesInvocable** Apex class to import the support item and its associated prices.
   * The following input parameters are passed to the Apex class:
     * **allowedStates**: The states where this item is applicable.
     * **claimTypesFormula**: The applicable claim types, built from multiple variables like CANC, IRSS, etc.
     * **priceACT**, **priceNSW**, **priceNT**, **priceQLD**, **priceRemote**, **priceSA**, **priceTAS**, **priceVeryRemote**, **priceVIC**, **priceWA**: The price of the support item for each state or region.
     * **priceBookDescription**: Describes how the item appears in the price book.
     * **isQuoteRequired**: A Boolean indicating if a quote is required, calculated using the **quoteFormula**.
     * **registrationGroupCode**, **supportCategoryName**, **supportCategoryNumber**, **itemName**, **itemNumber**, **supportItemType**, **unit**: Key details such as the support item's name, number, type, and unit.
4. **Handle Error (Assignment)**:
   * If an error occurs during any stage of the flow, the **FlowFaultMessage** variable is assigned the error message for tracking and troubleshooting purposes.
5. **Handle Support Item Number Null (Assignment)**:
   * If the **Support Item Number** is not provided, the flow assigns the error message: "Support Item Number is required for import."

</details>

### Maica - NDIS Support Catalogue Import Configuration

This flow is designed to facilitate the configuration and import process for the NDIS Support Catalogue. It allows users to select specific areas (states) and provides the option to include additional descriptions for the generated Price Books.

| Flow Detail |                                                                 |
| ----------- | --------------------------------------------------------------- |
| Flow Label  | Maica - NDIS Support Catalogue Import Configuration             |
| API Name    | maica\_\_Maica\_NDIS\_Support\_Catalogue\_Import\_Configuration |
| Type        | `Screen Flow`                                                   |

#### Flow Summary

This flow streamlines the process of importing NDIS support catalogue data into Maica by allowing users to configure Price Book creation for specific states.

* Users select states for which Price Books will be generated.
* A description can be added for each Price Book.
* The created Price Book records are used to organise NDIS support items based on regions.

<details>

<summary>Flow Description</summary>

1. **Start (Screen Element)**:
   * The flow begins with a screen to configure the NDIS Support Catalogue import.
   * It contains two key options:
     * Selection of areas (states) for which Price Books will be created.
     * An optional description field to save relevant notes on the new Price Book(s).
2. **Dynamic Choice Set (StateOptions)**:
   * Retrieves available states from the `Pricebook2` object.
   * This dynamic choice set is used in the screen for state selection.
3. **Assignment (Assignment)**:
   * The selected areas (states) and the description for the Price Books are stored in the respective variables.
   * The `allowedStates` and `priceBookDescription` variables are updated based on user inputs.

</details>

### Maica - Client Care Reference Data Import Handler&#x20;

This flow is designed to handle the import of CSV data into the Maica system, populating various reference data objects such as Appointment Service, Availability, Checklist, Client Goal, and others. The flow allows for creating and updating records for these objects based on imported data, and provides error handling mechanisms for any issues during the import process.

| Flow Detail |                                                                |
| ----------- | -------------------------------------------------------------- |
| Flow Label  | Maica - Client Care Reference Data Import Handler              |
| API Name    | maica\_\_Maica\_Client\_Care\_Reference\_Data\_Import\_Handler |
| Type        | `Autolaunched Flow`                                            |

#### Flow Summary

This flow processes CSV imports and creates or updates reference data records for the Maica system, handling various objects related to client care.

* Determines the object type from `Object_API_Name` and processes it accordingly.
* Creates or updates records for objects such as `Appointment_Service`, `Availability`, `Checklist`, `Client_Goal`, `Resource`, and more.
* Provides error handling mechanisms to capture and log faults during the import process.

<details>

<summary>Flow Description </summary>

1. **Start (Auto-launched Flow)**:
   * The flow starts by evaluating the `Object_API_Name` to determine which type of record to process.
2. **Decision (DECISION\_Object\_API\_Name)**:
   * Determines the object type based on `Object_API_Name` and routes the flow accordingly to handle specific objects like `Resource`, `Availability`, `Unavailability`, etc.
   * If an unknown object type is encountered, it triggers the fault message.
3. **Assignment (ASSIGN\_Appointment\_Service\_Values)**:
   * Assigns values to various fields in the `Appointment_Service` object, such as `Available_Sections__c`, `Claim_Types__c`, `Client_Note_Template__c`, `End_Date__c`, and others.
4. **Assignment (ASSIGN\_Availability\_Values)**:
   * Assigns values to the `Availability` object, including fields like `Active__c`, `Effective_From__c`, `Effective_To__c`, `Location__c`, and others.
5. **Assignment (ASSIGN\_Checklist\_Values)**:
   * Assigns values to the `Checklist` object, such as `Create_During_Quick_Complete__c`, `Default_Checklist_Item_Status__c`, `End_Date__c`, and others.
6. **Record Lookup (GET\_Resource)**:
   * Retrieves a `Resource` record based on the provided `Resource_Name`.
   * If the record is found, the flow assigns the `Resource_Id` and proceeds to update the relevant object.
7. **Record Create (CREATE\_Appointment\_Service)**:
   * Creates a new `Appointment_Service` record using the assigned values.
   * If an error occurs, the flow assigns a fault message to handle the error.
8. **Record Create (CREATE\_Availability)**:
   * Creates a new `Availability` record with the provided values.
9. **Record Create (CREATE\_Client\_Goal)**:
   * Creates a `Client_Goal` record by assigning values like `Contact__c`, `Goal__c`, `Description__c`, `Stage__c`, and others.

</details>

### Maica - Client Management Reference Data Import Handler

This flow is designed to handle the import of reference data objects for Maica Client Management via a CSV. It looks up and creates records for several Salesforce objects such as `Product2`, `Pricebook2`, `Connection__c`, `Support_Category__c`, and `PricebookEntry`.&#x20;

| Flow Detail |                                                                      |
| ----------- | -------------------------------------------------------------------- |
| Flow Label  | Maica - Client Management Reference Data Import Handler              |
| API Name    | maica\_\_Maica\_Client\_Management\_Reference\_Data\_Import\_Handler |
| Type        | `Autolaunched Flow`                                                  |

#### Flow Summary

* This flow imports client management reference data from CSV into Maica.
* It handles objects such as `Product2`, `Pricebook2`, `Connection__c`, `Support_Category__c`, and `PricebookEntry`.
* The flow performs the following actions:
  * Looks up existing records (e.g., `Contact`, `Product`, `Support_Category`).
  * Assigns values to variables (e.g., `Connection__c`, `Product2`, `Support_Category__c`).
  * Creates new records (e.g., `Connection__c`, `Product2`, `Support_Category__c`, `PricebookEntry`).
  * Includes decision logic to route based on the object’s API name (e.g., `Product2`, `Pricebook2`, `maica__Support_Category__c`).
  * Handles error conditions with fault messages (e.g., missing `Standard Price Book`).

<details>

<summary>Flow Description </summary>

1. **Start (Triggered by CSV)**:
   * The flow starts when CSV records are imported.
2. **DECISION\_Object\_API\_Name (Decision)**:
   * Determines the object to process based on the `Object_API_Name` passed to the flow.
   * Routes the flow to handle various object types, such as `Product2`, `Pricebook2`, or `maica__Support_Category__c`.
3. **GET\_Contact (Record Lookup)**:
   * Looks up the `Contact` object using the `Contact_Name`.
   * Assigns the `Id` of the retrieved contact to `Contact_Id`.
4. **ASSIGN\_Connection\_Values (Assignment)**:
   * Assigns values to a new `Connection__c` record (such as `Contact__c`, `Invoice_Recipient__c`, and `Primary_Contact__c`).
   * The assigned values are later used in the `CREATE_Connection`.
5. **CREATE\_Connection (Record Create)**:
   * Creates a new `Connection__c` record using the values assigned from the `ASSIGN_Connection_Values`.
6. **GET\_Product (Record Lookup)**:
   * Looks up a product (`Product2`) based on `Product_Name`.
   * The found product's `Id` is stored in `Product_Id`.
7. **ASSIGN\_Product\_Values (Assignment)**:
   * Assigns values to the `Product2` record, including fields such as `Support_Item_Type__c`, `GST_Code__c`, and `Funding_Level__c`.
8. **CREATE\_Product (Record Create)**:
   * Creates a new `Product2` record based on the assigned values.
9. **GET\_Standard\_Price\_Book (Record Lookup)**:
   * Fetches the standard price book if it exists and is active, storing the `Id`.
10. **DECISION\_Standard\_Price\_Book\_Entry (Decision)**:
    * Checks whether a price book entry exists for the product in the standard price book.
    * If not, routes to create the `PricebookEntry`.
11. **CREATE\_Standard\_Price\_Book\_Entry (Record Create)**:
    * Creates a new standard price book entry for the product if it does not already exist.
12. **GET\_Support\_Category (Record Lookup)**:
    * Looks up a `Support_Category__c` record using the `Support_Category_Name`.
    * Stores the category `Id` for further processing.
13. **ASSIGN\_Support\_Category\_Values (Assignment)**:
    * Assigns values to the `Support_Category__c` record, such as `Budget_Type__c`, `Category_Number__c`, and `Support_Purpose__c`.
14. **CREATE\_Support\_Category (Record Create)**:
    * Creates a new `Support_Category__c` record using the assigned values.

</details>

{% hint style="info" %}
Flows related to the BPR Remittance File Import & NDIS BPR Results File are located on the [BPR File Import Flows](../../settings/claim-management/ndis/bpr-file-import-flows.md) page.&#x20;
{% endhint %}

