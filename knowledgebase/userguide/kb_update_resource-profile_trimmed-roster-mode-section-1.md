# KB\_update\_resource profile\_trimmed roster mode section

`Roster Mode` defines how a `Resource` is scheduled in **Maica**: through `Shifts`, through standalone `Appointments`, or both. You can set it on the `Resource` record using the **Roster Mode** field, and you can set a different mode for a specific period on an [Availability](/broken/pages/da119566e623f01fb0019da014cf48444ac1c9b6) record. There are three modes:

* `Appointment`: the Resource is scheduled through standalone Appointments and cannot be assigned to a Shift.
* `Shift`: the Resource is scheduled through Shifts, and any Appointment booked for them must fall within one of their Shifts.
* `Dynamic`: the Resource can be assigned to both Shifts and standalone Appointments.

{% hint style="info" %}
For the full detail, including how **Maica** resolves the mode when the Resource and an Availability record differ, and how Roster Mode interacts with overlap rules, see [Roster Mode](/broken/pages/5226edf6223ab2935baf1a1c536f77a2c3d3275e).
{% endhint %}
