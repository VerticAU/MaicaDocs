---
description: >-
  Learn about how Maica automates the generation of travel claiming and
  expenses.
---

# Travel Claiming and Expenses

Maica offers the capability to automate the generation of travel billing records as well as expenses for Resources. This includes dealing with time-based and non time-based travel components as well as a number settings that determine how travel is managed within Maica.

<figure><img src="../.gitbook/assets/Maica Solution Architecture - Maica Travel Management Logic.png" alt=""><figcaption><p>Maica's Travel Mangement Process</p></figcaption></figure>

This diagram represents a workflow related to managing travel information and expenses, particularly in relation to invoicing.

1. **Start**: The process begins with either the **User** or **Google** providing input into the system (possibly related to travel data).
2. **Travel Information**: This step gathers the necessary travel information, which then splits into different possible paths:
   * **Time-Based Travel Settings**: These settings include rules or restrictions related to time, such as specific dates or durations of travel.
   * **Travel Caps**: There might be limits or caps in place, such as restrictions based on **Apprentice Program**, **Client Types**, **Virtual Staffing**, or **Service Agreements**. These caps ensure that travel expenses do not exceed certain thresholds.
3. **Invoice Line Item**: Once all the travel information and related settings are gathered, the next step is generating an **Invoice Line Item**. This represents the cost associated with the travel being recorded as a specific item for invoicing.
4. **Resource Expense**: Following the invoice creation, the expenses related to travel are assigned as **Resource Expenses** and captured against the Resource who delivered the service.
5. **Invoice**: The final step involves generating an **Invoice** that includes all the necessary travel line items, accounting for time-based travel settings and any caps applied. This invoice is the official document for charging the relevant party for the travel expenses.
6. **End**: The process completes with the expenses and invoices being finalized.

{% hint style="info" %}
The "Invoice Line Item" is generated based on all the travel-related settings, ensuring compliance with time-based travel rules, caps, and service agreements.
{% endhint %}

In summary, this diagram outlines a process of collecting travel-related data, applying any relevant restrictions or caps, and finally generating invoice line items that reflect travel expenses to be billed.

## How travel quantities are rounded

Travel is stored and billed in a fixed precision, so that the quantity on a travel Delivery Activity, the quantity on the Invoice Line Item and the amount charged all reconcile.

### Stored travel time and distance

| Value               | How it is stored                                |
| ------------------- | ----------------------------------------------- |
| **Travel time**     | Rounded to whole minutes, half up, for each leg |
| **Travel distance** | Rounded to two decimal places                   |

Each leg is rounded before the legs are added together, so a two-leg total can differ by one minute from rounding the true total. For example, a 27.88 minute trip is stored and charged as 28 minutes. Existing Appointment Resources are not changed.

Every screen that splits travel into a part before the Appointment and a part after it uses the same rule. The stored total is rounded first, the proportion is limited to between 0 and 100, and the "after" value is the total less the "before" value, so it is never below zero.

### Billed travel quantities

When the travel Delivery Activity is created for each Participant, its share is rounded to two decimal places. A value that falls exactly halfway rounds to the nearest even digit, so `0.125` becomes `0.12`.

| Example                                                                        | Quantity stored                          |
| ------------------------------------------------------------------------------ | ---------------------------------------- |
| A single 20 minute chargeable leg at 100 per cent                              | `0.33`                                   |
| A 30 minute leg                                                                | `0.50`                                   |
| 10 kilometres shared 33.34, 33.33 and 33.33 per cent across three Participants | `3.33` for each travel Delivery Activity |

{% hint style="warning" %}
A travel share that rounds to `0.00` creates no travel Delivery Activity, because a zero quantity cannot be invoiced.
{% endhint %}

An open Delivery Activity that carries a quantity with more than two decimal places is costed at two decimal places the next time it is costed. A Delivery Activity that has already been billed is read back as invoiced and is not changed.

Travel Delivery Activities keep the full unit price when the Ratio Calculation Base is **Unit Price**, and are left out of the quantity synchronisation checks on the Manage Appointment screens. When a Participant is added to an existing Appointment, the new Participant receives service rows only, not a copy of another Participant's travel row.

To learn how travel caps limit the billed quantity, see [Billing Invoice Generation](billing-invoice-generation.md).
