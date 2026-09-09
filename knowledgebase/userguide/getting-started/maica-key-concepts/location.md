---
description: Learn about how Maica uses Locations within the overall solution.
---

# Location

### Definition

Locations in Maica specify a particular geographic address that may be used across your organisation. A typical example of this might be a wellness centre, therapy studio, or headquarters.

Locations capture information such as MMM classifications, addresses, and geolocation coordinates derived from Google, via Maica's Google Maps API integration.

### Purpose

The purpose of Locations is to abstract the actual address information from the end user (or Resources) when managing either [Appointments](appointment.md) or [Shifts](shift.md). The end user does not need to be concerned with entering the right address everytime an [Appointment](appointment.md) or [Shift](shift.md) is managed but rather can simply select the Location.

### Usage

Locations are primarily used when managing [Appointments](appointment.md) and [Shifts](shift.md). This allows the end user to simply select a Location rather than entering an address manually. Maica's Google Maps API integration also uses Locations to geo-code each one which is then used to calculate travel times between [Appointments](appointment.md). Locations are also set for each [Resource](resource.md) as their primary Location so Maica can track the travel time from this address.

### Creating a Location for a Participant

As well as the shared Locations used across your organisation, a Location can be recorded against an individual [Participant](participant.md), such as their home address or another address where services are delivered to them.

To create one, use the **New Location** action on the Participant record. **Maica** links the new Location to the Contact automatically, and it then appears in the `Contact Locations` related list on their profile.

{% hint style="info" %}
One of a Participant's Locations can be marked as their **Primary Service Delivery Location**, which is the address **Maica** treats as their default when scheduling. A Participant can only have one at a time. To learn more, see the [Participant Profile](../../participants/participant-profile/#contact-locations).
{% endhint %}

### Final Thoughts

Locations are a good way to abstract the management of addresses manually, so we encourage you to capture Locations for each address that is used more than once and should be globally accessible.
