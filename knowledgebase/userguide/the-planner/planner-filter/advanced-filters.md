---
description: Learn about the Advanced Planner Filters in Maica
---

# Advanced Filters

## What are the Advanced Filters in Maica?&#x20;

The **Advanced Filters** in Maica allow you allows you to create highly targeted filters and views of the Planner through filtering specific attribute fields from `Appointments`, `Shifts`, `Participants` or `Resources`. &#x20;

{% hint style="info" %}
Advanced Filters use the same **Add Criteria** process found in the Optimiser’s Resource Pool and Ranking Criteria, but here the purpose is filtering the **Planner view**, not selecting or ranking Resources.
{% endhint %}

## What does the Advanced Filter allow you to do?&#x20;

The Advanced Filter allows you to:

* Limit the Planner to specific types of records
* Filter by any field from supported objects (e.g., `Appointment`, `Participant`, `Resource`)
* Combine multiple conditions using AND logic
* Show only records that meet your defined rules
* Build complex or multi-field views for targeted scheduling work

{% hint style="info" %}
This filter is optional but extremely useful when working with large schedules or teams.
{% endhint %}

## How do you apply an Advanced Filter in Maica?&#x20;

In order to show you how you apply an advanced filter in Maica, let's use an `Appointment Attribute` as an example:&#x20;

### 1. Navigate to the Advanced Filter Tab

First, begin by selecting the Advanced menu option in the Planner filter.

Then, select `Add Criteria` to start building the Filter.&#x20;

{% hint style="success" %}
* **Appointment/Shift Attributes Criteria** – Filter Appointments or Shifts based on specific properties (e.g. location). Applying filters here will limit which Appointments or Shifts are visible in the Planner.
* **Resource Attributes Criteria** – Filter which Resources are shown in the Planner. You can use this to narrow results by Age, Skills, or other relevant fields.
* **Participant Attributes Criteria** – Filter which Participants are shown in the Planner. Again, you can use this to narrow results.

\
These available fields are determined by what View & Mode your Planner is in at the time of applying the filter.&#x20;
{% endhint %}

As mentioned above, let's add an `Appointment Attribute Criteria`.&#x20;

{% hint style="info" %}
The Advanced Filter uses **criteria blocks**. Each block contains:

* **Field** – the field being evaluated
* **Operator** – how the value is compared
* **Value** – the value the field must match

Resources, Appointments/Shifts, and Participants remain visible only if they meet **all** criteria you add.
{% endhint %}

### 2. Add Criteria&#x20;

Begin by simply clicking the `Add Criteria` link to create a `New Criteria` box.&#x20;

A new filter block appears with three components:

* **Field** dropdown
* **Operator** dropdown
* **Value** field

{% hint style="success" %}
Note, the **Value** field will appear after you have selected your **Field** and **Operator**. The **Value** updates dynamically and only presents options related to the selected **Field** and **Operator**.&#x20;
{% endhint %}

### 3. Select Fields&#x20;

Start by selected your **Field**.&#x20;

To do so, you must first choose an **Object**. The available **Objects** will be presented to you based on your Planner View and Mode. An example of the available **Objects** in Schedule View is shown below.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2025-11-26 at 10.54.43 am.png" alt=""><figcaption></figcaption></figure>

Once you have selected the **Object**, all available **Fields** will be presented and available for selection.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2025-11-26 at 10.54.56 am.png" alt=""><figcaption></figcaption></figure>

Once you have selected your desired Field, move onto Operator and Value.&#x20;

{% hint style="success" %}
Fields are grouped by object. Examples:

* **Appointment fields**: Location, Start Time, Status
* **Resource fields**: Region, Gender, Employment Type
* **Participant fields**: Age Group, Language, LGA
{% endhint %}

### 4. Operator and Value

Finally, after selecting your Field, you must select an `Operator` and a `Value`. These concepts are defined below:

* `Operator`: An `Operator` is a function that defines the relationship between two values (Field and Value). It determines how the two are compared, filtered, or evaluated, such as checking for equality, differences, or whether one value contains another.
* `Value`: A `Value` is a specific piece of data that corresponds to the selected field. It represents the actual option or information that will be used for comparison or filtering. For example, the values may be the possible states (e.g., ACT, NSW) for the field `Location` > `State`.

{% hint style="info" %}
As mentioned, the values will automatically change based on the field selected.
{% endhint %}

So, using the location field on the Appointment as an example, you could set your `Operator` and `Value` to the following:

* **Field**: Location > State
* **Operator**: equals
* **Value**: NSW

This will filter the Planner to only show Appointments where the **State** in the **Location** field **equals** NSW.

<figure><img src="../../.gitbook/assets/Screenshot 2025-11-26 at 11.00.24 am.png" alt=""><figcaption></figcaption></figure>

### 5. Apply your changes&#x20;

Once done, click the **Green** **Tick** at the top of the Filter to apply your changes.&#x20;

{% hint style="info" %}
If you want to remove your Advanced Filters, you can either use the Undo arrow, or the Remove All button to the right of Add Criteria. You will then need to reselect the **Green Tick**.&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2025-11-26 at 11.01.01 am.png" alt=""><figcaption></figcaption></figure>

Once your filters have been applied, the outline of the criteria will change from **Yellow** to **Grey** to indicate it has been saved.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2025-11-26 at 11.02.34 am.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
If you were to click **Add Criteria** again to create more conditions. Then Maica's AND logic would be respected. Meaning, a record must meet _every_ specified condition to appear in the Planner.
{% endhint %}
