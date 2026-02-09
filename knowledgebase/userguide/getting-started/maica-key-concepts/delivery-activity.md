# Delivery Activity

### Definition

A Delivery Activity is the technical output of a delivered service; it essentially represents each delivered service to each [Participant](participant.md). It is very unlikely that the average end user (or [Resource](resource.md)) will need to be concerned with these records, as it is a fairly technical record. The information captured on a Delivery Activity will include the following key information:

* Key Dates
* A reference to the [Appointment](appointment.md) which delivered the service to the [Participant](participant.md)
* A reference to the [Service Agreement](service-agreement.md) Item funding the delivered service for the [Participant](participant.md)
* Billing information to ensure Maica's billing engine can process the delivered service

Let us further explain this via an example:

* If an [Appointment](appointment.md) is scheduled to deliver occupational therapy to 2 [Participants](participant.md), the [Appointment](appointment.md) will have two Delivery Activities, one for each Participant for the service.&#x20;
* Each Delivery Activity will be billed according the [Service Agreement](service-agreement.md) underpinnig the service for each [Participant](participant.md).&#x20;

### Purpose

The purpose of Delivery Activities is to track delivered services and create a billing record that can be processed by Maica's billing engine. This essentially abstracts the [Appointment](appointment.md) from the billing and allows administrators to manage specific billing scenarios as required by any relevant business process.

### Usage

Delivery Activities are a backend process and get generated when scheduling Appointments to deliver services to Participants. The Maica billing engine then reads the Delivery Activities to inititate the appropriate billing logic.

### Final Thoughts

The generation of Delivery Activities is totally controlled by Maica, there is no reason to manually interact interact with these records. You are able to change them in case the billing logic execution produced incorrect results but, outside of this use case, these will just run in the background.
