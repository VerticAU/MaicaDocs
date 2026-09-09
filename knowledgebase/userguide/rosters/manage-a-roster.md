# Manage a Roster

## Overview

Once a `Roster` exists, managing it covers four things: editing its details, approving it so its Shifts become visible to Care Workers, cloning it to start a new series, and regenerating the future Rosters in its series.

All four are reached from the **Manage Roster** modal in [Roster View](/broken/pages/3118d748193f318440a8a5512d37068a35c24361), or from the Planner toolbar.

{% hint style="info" %}
To create a Roster in the first place, see [Create a Roster](/broken/pages/a23cd73bc2d2b6f5641e7e755e994694be8d4a98).
{% endhint %}

## Editing a Roster

Select a Roster in the Planner and choose **Manage Roster**. The modal opens with the Roster's current details, and a read-only summary row at the top showing the same title and subtitle the Planner card displays.

### What you can edit

Not every field stays editable after creation. What is available depends on whether the Roster is the master of its series.

| Field                               | Editable after creation?   |
| ----------------------------------- | -------------------------- |
| `Location`                          | Yes                        |
| `Notes`                             | Yes                        |
| `Status`                            | Yes, subject to permission |
| `Schedule Start` and `Schedule End` | Only on the master Roster  |
| `Inherit Confirmed Resources`       | Only on the master Roster  |
| `Frequency`                         | No                         |
| `Repeat Every`                      | No                         |

{% hint style="info" %}
`Frequency` and `Repeat Every` are locked because changing the cadence of an existing Roster would put it out of step with the Shifts already generated against it.
{% endhint %}

{% hint style="warning" %}
`Inherit Confirmed Resources` and the Schedule window belong to the series as a whole, not to one Roster. They are editable only on the master Roster, so that a single future Roster cannot rewrite the settings for the whole series.
{% endhint %}

### Nominating a different master Roster

When you edit a Roster in a series that is not currently the master, a **master** option is available. Ticking it makes that Roster the one future Rosters regenerate from, on the next evaluation after it is approved.

Where the Roster is already the master, the option is shown ticked and locked, for information only.

## Approving a Roster

A Roster is created as `Draft`. Approving it does two things:

{% stepper %}
{% step %}
#### Makes Shifts visible to Care Workers

Its Shifts become visible to Care Workers, including in Shift Offers, the Care Worker agenda, and the related notifications.
{% endstep %}

{% step %}
#### Generates the rest of the series

Where the Roster is the master of its series, the rest of the series is generated forward to the Schedule Horizon.
{% endstep %}
{% endstepper %}

To approve, change `Status` to `Approved` and save, or use the **Approve** action in the Planner toolbar. A confirmation appears before the approval is applied.

{% hint style="warning" %}
A Roster with no Shifts cannot be approved. Add at least one Shift first. An approved Roster with no Shifts would generate nothing each time the series rolls forward.
{% endhint %}

{% hint style="warning" %}
A Roster whose Schedule has been cancelled or rejected cannot be approved. The Schedule must be reinstated first; approving the Roster will not reactivate it.
{% endhint %}

{% hint style="info" %}
Draft Roster Shifts are not hidden from everyone. Schedulers and coordinators can still see and resource them in the Planner. It is Care Worker visibility that approval controls.
{% endhint %}

### Reverting to Draft

Editing certain fields on an already `Approved` Roster reverts it to `Draft` for re-approval. Those fields are:

* `Location`
* `Inherit Confirmed Resources`

**Maica** warns you before this happens, so the revert is a choice rather than a surprise. If you continue, the Roster returns to `Draft` and its active Shifts are set back to `Planned` until it is re-approved.

{% hint style="info" %}
Editing the **Schedule window** does not revert an approved Roster. Date changes are handled by the reevaluate offer described below instead.
{% endhint %}

## Regenerating future Rosters

When you change the Schedule window on an approved master Roster, **Maica** offers to reevaluate the series after you save. Reevaluating deletes the future `Draft` Rosters and regenerates them from the Schedule's current configuration.

The confirmation tells you how many Rosters and Shifts will be affected before anything is removed.

{% hint style="danger" %}
Reevaluating is destructive. The future Draft Rosters in the series are deleted and rebuilt, so any changes made directly to those Rosters are lost.
{% endhint %}

{% hint style="info" %}
Reevaluating only affects **future Draft** Rosters. An Approved Roster is never deleted by a reevaluate.
{% endhint %}

If there is nothing to regenerate, no confirmation is shown and the save simply completes.

### Watching progress

Generating and regenerating Rosters runs in the background. A progress screen is shown while it runs, and reports any errors as they occur.

{% hint style="success" %}
You can close the progress screen at any time. The job keeps running, and the result appears on your next Planner refresh.
{% endhint %}

## Cloning a Roster

Cloning copies an existing Roster, including its Shifts, so you can stand up a new series without rebuilding it. Choose **Clone** from the Manage Roster modal.

The clone takes its `Location` and `Notes` from the source Roster, and its cadence and inherit settings are copied and locked, so a clone always runs on the same pattern as its source.

Because copying the Shifts can take time, cloning runs in the background with a progress screen.

### Clone outcomes

| Outcome     | What you see                                                       | What you can do                           |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------- |
| **Success** | A confirmation of how many Shifts were created                     | Select **Done** to finish                 |
| **Partial** | How many Shifts were created out of the total, and how many failed | **Go Back**, **Report**, or **Try Again** |
| **Failed**  | No Shifts could be created                                         | **Go Back**, **Report**, or **Try Again** |

{% hint style="info" %}
**Go Back** rolls back the failed clone and returns you to the form with your details intact. **Try Again** rolls it back and re-runs the clone from scratch. Either way, you are never left with a half-built duplicate Roster sitting next to the original.
{% endhint %}

{% hint style="success" %}
If you close the modal while a clone is still running, it keeps going in the background. Re-open Clone to watch its progress, or wait for it to appear in the Planner once it finishes.
{% endhint %}

## Common Scenarios

| Scenario                                                   | Outcome                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| You change the Location on an Approved Roster              | You are warned first. On confirming, the Roster reverts to `Draft` and its Shifts return to `Planned`. |
| You change the Schedule dates on an Approved master Roster | The Roster stays `Approved`. You are offered a reevaluate of the future Draft Rosters.                 |
| You try to approve a Roster with no Shifts                 | The approval is refused with a message asking you to add a Shift first.                                |
| You decline the approve confirmation                       | The Roster stays at its previous status. Any other edits you made in the same save are still applied.  |
