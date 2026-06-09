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
