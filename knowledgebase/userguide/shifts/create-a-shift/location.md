---
description: Discover how to specify the Shift location
---

# Location

## What does the Location stage include?&#x20;

Within the Location tab, you can choose the location of your [Shift](../../getting-started/maica-key-concepts/shift.md) from your stored Locations . Once your Location is selected, any connected Accomodation records are displayed and accessible for selection in order to provide a more detailed location.

{% hint style="info" %}
Unlike an Appointment, a Shift permits you to only select a Location from your stored Locations.
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2024-09-26 at 10.16.30 am.png" alt="" width="375"><figcaption></figcaption></figure>

## Timezone Selection&#x20;

When creating a Shift, Maica automatically assigns a **Time Zone** using the current user’s browser location (e.g. Melbourne).

Once a **Location** is selected, Maica checks if that Location is in a different timezone. If it is, you'll be prompted to update the Shift's timezone to match the Location.

#### How It Works:

* **By default**, the Time Zone is set to match the current user's browser (e.g. Australia/Sydney).
* If a **Location** is selected:
  * Maica uses Google’s Time Zone API to detect the correct timezone based on its address.
  * If the Location’s timezone differs from the one already assigned, a **confirmation modal** appears, allowing you to confirm or override the update.
* If **no Location** is selected, the Time Zone can still be selected manually from the picklist.

{% hint style="warning" %}
In order for Maica to successfully detect and change Timezones, a Google API Key must be properly set up in the Maps Management Settings. To learn how to set up your API Key, [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/maps-management#setting-up-your-google-api-key). &#x20;
{% endhint %}

#### Key Behaviour

* The **Start** and **End Times** are saved using the Shift's selected timezone.
* Other users will see the Shift adjusted to **their own local timezone** when viewing it (e.g. in the Planner, Quick Info, or record view).
* A **world icon** appears in the Planner showing the viewer's browser timezone with helpful tooltip context. To learn more, [click here](../../the-planner/planner-overview.md#timezone-indicator).&#x20;
* For edge cases (e.g. border towns or cross-timezone Shifts), you can manually override the timezone selection.

| **Example**                                         | **Outcome**                                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| User creates an Shift for 9:00 AM in Perth          | ✅ Shift shows as 9:00 AM in Perth time, but 11:00 AM for users in Sydney.                  |
| A border Location causes conflicting timezone logic | ✅ User is shown a confirmation modal and can override the timezone if needed.              |
| A user views an Shift created in a different zone   | ✅ Maica shows the time adjusted to the viewer’s local timezone (e.g. Planner, Quick Info). |
| Location is updated post-save                       | ✅ System re-evaluates and prompts to apply new timezone via modal.                         |
