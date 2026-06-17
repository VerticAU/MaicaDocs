# KB\_update\_resource profile\_trimmed roster mode section

`Roster Mode` defines how a `Resource` is scheduled in **Maica**: through `Shifts`, through standalone `Appointments`, or both. You can set it on the `Resource` record using the **Roster Mode** field, and you can set a different mode for a specific period on an [Availability](/broken/pages/a90ba28f696b7699b20e6360b3034fc6493c4c9d) record. There are three modes:

* `Appointment`: the Resource is scheduled through standalone Appointments and cannot be assigned to a Shift.
* `Shift`: the Resource is scheduled through Shifts, and any Appointment booked for them must fall within one of their Shifts.
* `Dynamic`: the Resource can be assigned to both Shifts and standalone Appointments.

{% hint style="info" %}
For the full detail, including how **Maica** resolves the mode when the Resource and an Availability record differ, and how Roster Mode interacts with overlap rules, see [Roster Mode](/broken/pages/ce44706cb91cc6d01f1de7c7d4a93d09100c2b7c).
{% endhint %}
