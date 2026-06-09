---
description: Learn about the Statement Management Settings in Maica
---

# Mobile Management

## Overview

The **Mobile Management** Settings in Maica allows administrators to control which Custom Fields are displayed in the Maica Mobile App.

These Settings enable you to surface selected Salesforce fields on specific mobile objects and define a custom header label under which those fields will appear.

## Available Mobile Sections

You can configure custom fields for the following mobile areas:

* **Mobile Incidents Custom Fields**
* **Mobile Expenses Custom Fields**
* **Mobile Notes Custom Fields**
* **Mobile Breaks Custom Fields**
* **Mobile Appointment Custom Fields**

Each section controls the fields that will appear within that specific mobile screen.

## How to Configure Mobile Custom Fields

#### Step 1: Navigate to Mobile Management

1. Go to **Maica Settings**
2. Select **Mobile Management**

#### Step 2: Select Fields

1. Locate the relevant mobile section (e.g. _Mobile Appointment Custom Fields_).
2. In the **Select Options** dropdown, choose the fields you would like displayed in the mobile app.

{% hint style="info" %}
You can select multiple fields as required.
{% endhint %}

{% hint style="info" %}
Only fields available on the underlying object will be selectable.
{% endhint %}

#### Step 3: Define the Label

In the **Label** field, enter the name you would like displayed in the mobile app as the section header for these fields.

For example:

* "Additional Details"
* "Custom Fields"
* "Incident Information"

This label will appear above the selected fields in the mobile interface.

#### Step 4: Save

Click **Save** to apply the configuration.

The selected fields will now appear in the corresponding mobile screen under the defined label.

{% hint style="success" %}
Once configured and saved:

* The selected fields will be grouped together
* They will appear under the custom label you defined
* Only users with access to those fields (via permission sets and field-level security) will be able to view them
{% endhint %}

### Important Considerations

{% hint style="warning" %}
* Field visibility on mobile respects Salesforce **Field-Level Security** and **Permissions**.
* If a field is selected but does not appear on mobile, confirm that:
  * The user has access to the field
  * The field is populated (if applicable)
* Changes apply across all mobile users once saved.
{% endhint %}
