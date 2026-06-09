---
description: Learn about the Statement Management Settings in Maica
hidden: true
noIndex: true
---

# Statement Management

This article explains how **Statement Management** is used to generate **Support at Home Service Agreement Statements** in Maica. It covers what the process does, how to run it, and how statement data is structured once generation is complete.

{% hint style="info" %}
This feature is designed to support **Monthly Care Recipient Statements**, including budget balances and itemised service delivery, in line with Support at Home requirements.
{% endhint %}

## **What does Statement Management do?**

Statement Management generates **Service Agreement Statements** for a defined period by:

* Identifying eligible **Support at Home Service Agreements**
* Creating a **Statement Header** for each Agreement
* Creating **Child Statements** for each Active Funding Stream
* Linking all relevant **Invoice Line Items**
* Calculating **opening balances, expenditure, and closing balances**

{% hint style="success" %}
Each run produces a complete statement structure that can be used for reporting, compliance, and document generation.
{% endhint %}

## Generating a Statement

The below steps detail the process of generating a Statement from start to finish.&#x20;

### 1. Kicking off the process&#x20;

1. By by navigating to the **Settings** tab in Maica.
2. From the packaged options, select the flow: **“Generate Support at Home Statements”**, as shown below.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2026-01-15 at 9.53.12 am.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
This is the the auto-launched flow that will generate the statements.
{% endhint %}

3. Then enter:

* Optional **Service Provider filter** – to restrict which Service Agreements are included.&#x20;

{% hint style="info" %}
You can leave the **Service Provider filter** blank to include all eligible Providers.&#x20;
{% endhint %}

* **Statement period (date range)** – must be a **single calendar month** (e.g. 01/10/2025–31/10/2025).

{% hint style="info" %}
You can use the Period Selection toggle to switch between a Date Range and Month Picker.
{% endhint %}

* **Type** - Define the Statement Type to be generated in the selected statement flow.
* **Funding Type** - Define the Funding Type of Service Agreements to be retrieved by the selected statement flow.

The flow then runs based on these inputs.

### 2. Retrieve relevant Service Agreements&#x20;

1. As it runs, the flow queries **Service Agreements** that:

* Are **Support at Home** Agreements, and
* Match the **Date Range**, and
* Match the **Service Provider filter** (if provided).

2. The flow then **loops through each Service Agreement** returned.

### 3. Create the Statement Header for each Service Agreement&#x20;

For **each** Service Agreement:

1. The flow creates a **Statement Header** record that will act as the parent container. The Statement Header stores:

* **Statement Period** (start date & end date)
* **Status** (e.g. Draft / In Progress / Completed – depending on your lifecycle)
* **Relationship to the Service Agreement** (lookup back to the SA)
* High-level summary fields (to be populated once children are processed – e.g. total expenditure, total closing balance, etc. if required).

{% hint style="info" %}
Note, there can be **multiple child statements** under this one header.
{% endhint %}

### 4. Identify all active budgets / funding items for the period

1. The flow retrieves all **Planned Budgets / Funding Item** records linked to that Service Agreement.
2. It filters these to **only those that were active during the statement period**:
   * e.g. using start / end dates or active flags on the funding record.

{% hint style="info" %}
These are the **budget streams** (e.g. ongoing quarterly, short-term pathway, ATHM) that will each get their own child statement.
{% endhint %}

3. The flow then **loops through each active funding item**.

### 5. For each funding item, invoke the subflow

For **each** planned budget / funding item in the loop the main flow calls an **invocable method** that starts a dedicated **subflow** for that budget.

This subflow is responsible for all **budget-level statement logic**.

### 6. Subflow – build the child statement and attach invoice line items&#x20;

Inside the budget-level subflow:

1. **Retrieve Invoice Line Items**:

* Query all **Invoice Line Items** that:
  * Are linked to the **current Service Agreement**,
  * Are funded under the **current funding item / planned budget**,
  * Have a service date or invoice date **within the statement period**.

2. **Create a Child Statement record** for this funding item:

* Linked to:
  * The **Statement Header** (parent)
  * The **Funding Item / Planned Budget**
  * The **Service Agreement** (directly or via header, depending on your model)

3. **Link Invoice Line Items**:

* For each retrieved Invoice Line Item, populate the **Statement lookup** so that all ILIs point to this **Child Statement**.

4. **Calculate Expenditure for the period**:

* Sum the value of all linked Invoice Line Items.
* Write that total into the **Expenditure / Total Services Delivered** field on the Child Statement.

{% hint style="success" %}
This gives you the **itemised breakdown** (via ILIs) plus a **summary expenditure total** (on the Child Statement) for that specific budget.
{% endhint %}

### 7. Determine opening and closing balances for each child statement&#x20;

1. For the **same funding item**, the flow determines the **Opening Balance** for the statement period using the associated Funding record:

{% hint style="info" %}
**If this is the first statement period** for this funding item:

* **Opening Balance = Approved Funding Amount** on the funding record.

\
**If previous statements exist** for this funding item:

* **Opening Balance = Closing Balance from the previous statement**, which is stored on the funding record.
{% endhint %}

2. The flow then calculates the **Closing Balance**:

* **Closing Balance = Opening Balance − Total Expenditure (for this period)**

3. The subflow:

* Writes **Opening Balance** and **Closing Balance** to the **Child Statement** record.
* Updates the **Funding record** with the new **Closing Balance**, so it becomes the **next period’s Opening Balance**.

### 8. Final structure after the run

Once all Service Agreements and their budgets have been processed, you end up with:

#### 8.1 Statement Header (per Service Agreement)&#x20;

* One **Statement Header** per **Service Agreement** for the month.
* Stores:
  * Statement Period
  * Status
  * Link to Service Agreement
  * Optional roll-ups / summary totals (e.g. total expenditure across all budgets).

#### 8.2 Child Statements (per funding item)

* **One Child Statement per active funding item** during the period.
* Each Child Statement includes:
  * Link to **Statement Header**
  * Link to **Funding Item / Planned Budget**
  * Opening Balance
  * Expenditure for the period (sum of ILIs)
  * Closing Balance
  * Any other budget-specific summary or metadata

#### 8.3 Linked Invoice Line Items (service delivery detail)&#x20;

* Each **Invoice Line Item** for the period:
  * Is stamped with a **lookup to its Child Statement**.
* These provide the **full itemised breakdown** required under Support at Home.

### 9. How this maps to the regulatory requirement

* The **care recipient’s monthly statement document**:
  * Pulls from **one Statement Header** (per Service Agreement / month), and
  * Includes **sections for each Child Statement** (i.e. each funding stream), with:
    * Budget summary (opening, expenditure, closing)
    * Itemised list of services (Invoice Line Items) for that budget.
* Behind the scenes in Maica, that is:
  * 1 × **Header**
  * N × **Child Statements** (one per active funding item)
  * M × **Invoice Line Items** linked to those child statements.
