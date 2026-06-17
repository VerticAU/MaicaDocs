# Resource Roster Mode

## What is Roster Mode?

`Roster Mode` defines how a `Resource` can be scheduled in **Maica**, specifically whether they are scheduled through `Shifts`, through standalone `Appointments`, or both. It determines the validation **Maica** applies when you try to assign a Resource to a Shift or book them into an Appointment.

Roster Mode is used by coordinators and schedulers who build the roster, and by administrators who set a Resource's default way of working. Choosing the right mode helps **Maica** keep the roster consistent, for example by stopping a shift-based worker from being booked outside their Shifts.

{% hint style="info" %}
Roster Mode is set on the [Resource](/broken/pages/a3ad13711cf6d314cc4187c4d2a97d4ea1bfe9b2) record and can also be set on individual [Availability](/broken/pages/a3ad13711cf6d314cc4187c4d2a97d4ea1bfe9b2) records. See [How Maica determines a Resource's Roster Mode](resource-roster-mode.md#how-maica-determines-a-resources-roster-mode) for how the two interact.
{% endhint %}

## Where do I set Roster Mode?

You can set Roster Mode in two places:

1. On the **Resource** record, using the **Roster Mode** field. This is the Resource's default mode.
2. On an **Availability** record, using the **Roster Mode** field. This lets you apply a different mode for the period that Availability covers.

## The three Roster Modes

**Maica** offers three Roster Modes. The table below summarises how each one behaves.

| Roster Mode   | Can take standalone Appointments | Can be assigned to Shifts | Typical use                                                                              |
| ------------- | -------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| `Appointment` | Yes                              | No                        | Resources scheduled entirely through individual Appointments                             |
| `Shift`       | Only within one of their Shifts  | Yes                       | Resources who work rostered Shifts, such as in a group or residential setting            |
| `Dynamic`     | Yes                              | Yes                       | Resources who work a continuous Shift on some days and individual Appointments on others |

### Appointment

A `Resource` in `Appointment` mode is scheduled through standalone `Appointments`. They can be booked at any time, subject to their `Availability` if any Availability records exist. A Resource in `Appointment` mode cannot be assigned to a `Shift`. Attempting to add them to a Shift produces a Roster Mode Conflict.

### Shift

A `Resource` in `Shift` mode is scheduled through `Shifts`. They can be assigned to Shifts, and any `Appointment` booked for them must fall within one of their Shifts. If you try to book an Appointment for a Shift-mode Resource outside any of their Shifts, **Maica** reports a conflict.

### Dynamic

A `Resource` in `Dynamic` mode can be assigned to both `Shifts` and standalone `Appointments`. This removes the need to switch a Resource between `Appointment` and `Shift` mode when their pattern of work changes day to day. Standard overlap and availability rules still apply.

{% hint style="success" %}
Use `Dynamic` for Resources whose work mixes rostered Shifts and individual Appointments, so you do not have to change their Roster Mode each time the roster changes.
{% endhint %}

## How Maica determines a Resource's Roster Mode

A Resource can have a Roster Mode on their Resource record and a different Roster Mode on a specific Availability record. When validating a Shift or an Appointment, **Maica** resolves the Roster Mode to use in the following order:

1. The **Roster Mode** on the matched **Availability** record, if one applies and it is set
2. Otherwise, the **Roster Mode** on the Resource linked to that Availability record
3. Otherwise, the **Roster Mode** on the **Resource** record
4. Otherwise, **Maica** treats the Resource as `Appointment` mode

{% hint style="warning" %}
Where more than one `Availability` record applies at the same time, `Dynamic` rows take precedence when **Maica** resolves the applicable mode. This means a Resource with any overlapping `Dynamic` Availability is treated as `Dynamic` for that period.
{% endhint %}

## How each mode affects scheduling

The Roster Mode controls two kinds of validation when you build the roster.

### Roster Mode coverage

These rules always apply, regardless of your overlap settings:

* An `Appointment`-mode Resource cannot be assigned to a `Shift`.
* A `Shift`-mode Resource can only have `Appointments` that fall within one of their Shifts.
* A `Dynamic`-mode Resource can be assigned to Shifts and can also take Appointments that sit outside a Shift.

{% hint style="info" %}
Roster Mode coverage is independent of the overlap settings and of the per-Resource **Allow Overlap** option. It checks whether the Resource is allowed to work that way at all, not whether two bookings clash in time.
{% endhint %}

### Overlap and Roster Mode

Separately from coverage, **Maica** can prevent a Resource from being double-booked at the same date and time. Overlap of the same type, meaning Appointment against Appointment or Shift against Shift, is controlled by the **Allow Resource Overlap** settings and can be bypassed for an individual Resource using the **Allow Overlap** checkbox on the Resource record.

For `Dynamic` Resources, a rostering setting also controls whether **Maica** prevents an overlapping `Shift` and `Appointment` at the same time. When that setting is enabled, a `Dynamic` Resource cannot be booked into an Appointment that overlaps one of their Shifts, and vice versa.

{% hint style="info" %}
To learn more about the per-Resource overlap exception, see the **Allow Overlap** section of the [Resource Profile](/broken/pages/a3ad13711cf6d314cc4187c4d2a97d4ea1bfe9b2) article.
{% endhint %}
