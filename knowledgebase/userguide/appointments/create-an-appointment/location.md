---
description: Discover how to specify the Appointment location
---

# Location

## What are the Location Selection Options?

The second tab captures the location details of the [Appointment](../../getting-started/maica-key-concepts/appointment.md). There are four different methods by which the location can be established, as shown below:&#x20;

<figure><img src="../../.gitbook/assets/appointment location.png" alt="" width="563"><figcaption></figcaption></figure>

### 1. Location

By using the Location tab, you can choose the location of your [Appointment](../../getting-started/maica-key-concepts/appointment.md) from your stored Locations . Once your Location is selected, any connected Accomodation records are displayed and accessible for selection in order to provide a more detailed location.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-23 at 10.04.01 am.png" alt="" width="563"><figcaption></figcaption></figure>

### 2. Participant Location

The Participant Location tab enables the Appointment Location to be selected from a list of all recorded Mailing Address values for each [Participant](../../getting-started/maica-key-concepts/participant.md) associated with the [Appointment](../../getting-started/maica-key-concepts/appointment.md). So, when adding [Participants](../../getting-started/maica-key-concepts/participant.md) to an [Appointment](../../getting-started/maica-key-concepts/appointment.md), you can automatically select the Appointment Location from all addresses connected to their record.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-23 at 10.05.08 am.png" alt="" width="563"><figcaption></figcaption></figure>

### 3. Manual Entry

The Manual Entry tab allows for flexibility where the [Appointment](../../getting-started/maica-key-concepts/appointment.md) is to be held at a location not previously recorded. You can enter an address manually to be captured against the [Appointment](../../getting-started/maica-key-concepts/appointment.md). Here, you have the option to manually enter the information or have the fields automatically fill in by using the [Google Maps Integration](location.md#google-maps-integration) to find the address.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-23 at 10.09.38 am.png" alt="" width="563"><figcaption></figcaption></figure>

### 4. Digital Location

If your [Appointment](../../getting-started/maica-key-concepts/appointment.md) is not at a physical address, simply click the toggle to turn off all Location selection options and proceed with the [Appointment](../../getting-started/maica-key-concepts/appointment.md) setup.

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-23 at 10.22.00 am.png" alt="" width="563"><figcaption></figcaption></figure>

## Timezone Selection&#x20;

When creating an Appointment, Maica automatically assigns a **Time Zone** using the current user’s browser location (e.g. Melbourne).

Once a **Location** is selected, Maica checks if that Location is in a different timezone. If it is, you'll be prompted to update the Appointment’s timezone to match the Location.

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

* The **Start** and **End Times** are saved using the Appointment’s selected timezone.
* Other users will see the Appointment adjusted to **their own local timezone** when viewing it (e.g. in the Planner, Quick Info, or record view).
* A **world icon** appears in the Planner showing the viewer's browser timezone with helpful tooltip context. To learn more, [click here](../../the-planner/planner-overview.md#timezone-indicator).&#x20;
* For edge cases (e.g. border towns or cross-timezone Appointments), you can manually override the timezone selection.

| **Example**                                             | **Outcome**                                                                                |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| User creates an Appointment for 9:00 AM in Perth        | ✅ Appointment shows as 9:00 AM in Perth time, but 11:00 AM for users in Sydney.            |
| A border Location causes conflicting timezone logic     | ✅ User is shown a confirmation modal and can override the timezone if needed.              |
| A new Appointment is created with no Location           | ✅ User can select the timezone manually via picklist.                                      |
| A user views an Appointment created in a different zone | ✅ Maica shows the time adjusted to the viewer’s local timezone (e.g. Planner, Quick Info). |
| Location is updated post-save                           | ✅ System re-evaluates and prompts to apply new timezone via modal.                         |

## Google Maps Integration

**Maica** integrates with Google Maps to determine travel times.&#x20;

When selecting a location for any given [Appointment](../../getting-started/maica-key-concepts/appointment.md), **Maica** will use Google to determine the required travel time and distance to and from the [Appointment](../../getting-started/maica-key-concepts/appointment.md). It will then give you an **Appointment Travel Time Breakdown** which includes a summary of your travel, as well as the total travel time and distance for the [Appointment](../../getting-started/maica-key-concepts/appointment.md).&#x20;

{% hint style="info" %}
The Google Maps integration will display on all Location Selection Options that include a physical address.
{% endhint %}

<figure><img src="../../.gitbook/assets/google maps integration location.png" alt="" width="563"><figcaption></figcaption></figure>

When determining your **Appointment Travel Time Breakdown**, you have three options for both the origin (**1. from which travel will be started**) and the destination (**2. to which travel will complete**) of your [Appointment](../../getting-started/maica-key-concepts/appointment.md). These options are shown in the table below:

| Travel Option	              | Description                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Previous/Next Appointment` | This is either the previous Appointment (in cases where travel is to an Appointment) or the next Appointment (in cases where travel is from an Appointment). |
| `Home Address`              | This is the address on the Salesforce User profile linked to the Resource record.                                                                            |
| `Primary Location`          | This is a lookup on the Resource record which is associated with a location containing an address.                                                           |
| `Current Location`          | The current location of the Resource (User) using **Maica**                                                                                                  |

### Travel Alert

**Maica** uses Google Traffic Awareness to check that you will arrive to your [Appointment](../../getting-started/maica-key-concepts/appointment.md) on time. It does this by assessing your selected [Appointment](../../getting-started/maica-key-concepts/appointment.md) time with your estimated travel time in order to verify that you will make it based on Google Traffic data. If you aren't expected to make it, **Maica** will display the alert below:

<figure><img src="../../.gitbook/assets/traffic awareness.png" alt="" width="541"><figcaption></figcaption></figure>
