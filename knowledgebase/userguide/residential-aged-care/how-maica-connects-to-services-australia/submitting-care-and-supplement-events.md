# Submitting Care and Supplement Events

## Overview

Several actions you take for a resident need to be reported to Services Australia, from admitting them, to recording supplements like oxygen, to electing into the new means testing arrangements. Maica sends each of these as an event. This article gives an overview of the events you can submit and points to the detailed steps for each.

{% hint style="info" %}
Every event you submit follows the same status lifecycle once it reaches Services Australia. For how held, rejected, and failed events are handled, see [How Maica Connects to Services Australia](file:///).
{% endhint %}

## Care period events

These events define a resident's care period and are the most operationally important.

| Event         | When you submit it                                                                                                                                                                     |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Entry**     | When a resident enters care. The entry distinguishes permanent from respite, and submitting it is a prerequisite for the resident to receive government subsidy from their entry date. |
| **Departure** | When a resident permanently leaves or passes away.                                                                                                                                     |
| **Leave**     | When a resident takes a period of temporary leave.                                                                                                                                     |

You submit each of these from the resident's record using the relevant action. For the full steps, see [Admitting a Resident](../admitting-a-resident.md), [Exiting a Resident or Recording a Death](/broken/pages/5165be3af2d6397f82ae455706d7b19c5db43e5c), and [Managing Temporary Leave](../managing-temporary-leave.md).

## Supplement events

Supplement events tell Services Australia about clinical or accommodation circumstances that affect the resident's subsidy.

| Event               | Purpose                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Oxygen**          | Notifies Services Australia of an oxygen therapy requirement. A supporting document can be attached.                                                                                                                                 |
| **Enteral feeding** | Notifies Services Australia of an enteral feeding requirement. A supporting document can be attached.                                                                                                                                |
| **Extra service**   | Notifies Services Australia that a resident is in an extra service room. This event is submitted automatically as part of relocating a resident into or out of an extra service room; the room's ward type drives the event content. |

{% hint style="info" %}
The extra service event is raised for you during a room move rather than submitted on its own. See Relocating a Resident. Its end date is not inclusive, meaning the resident's extra service status ends the day before the end date sent to Services Australia.
{% endhint %}

## Recording a means testing opt-in

A resident can formally elect to opt in to the means testing arrangements that apply from 1 November 2025. You record this election in Maica and submit it to Services Australia, attaching the resident's completed opt-in election form (the AC022 form).

When Services Australia accepts the opt-in, Maica updates the resident automatically:

1. The resident's funding record is marked as opted in, with the effective date recorded.
2. This automatically updates the resident's fee arrangement to the 1 November 2025 arrangement.
3. All of the resident's Service Agreements reflect the new arrangement straight away, with no manual changes needed.

{% hint style="warning" %}
This automatic update happens only when Services Australia accepts the opt-in. If the election is still held, or is later rejected or deleted, the resident's fee arrangement is not changed.
{% endhint %}

## What happens after you submit

Once submitted, each event is recorded against the resident and carries its Services Australia status. Most events return as Held first while Services Australia reviews them, then move to Accepted. You can monitor and refresh these statuses, and retry any submission that failed to send, as described in [How Maica Connects to Services Australia](file:///).

Statuses are refreshed in two ways:

* **Manually**, by refreshing the status on an individual event, when you want to check a specific event straight away.
* **Automatically**, by a daily scheduled check that sweeps every held event and refreshes its status from Services Australia, so held events move to their settled status without anyone having to check each one by hand. The scheduled check covers Entry, Departure, Leave, Opt In, Enteral Feeding, and Oxygen events.

{% hint style="info" %}
The one exception is the **Extra Service** event, which Services Australia does not provide a status read for. An Extra Service event that is held is not updated by the automatic check and is refreshed manually if needed. The scheduled check is configured by your administrator; see [Scheduling RACS Background Jobs](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/residential-aged-care/billing-engine-architecture/scheduling-racs-background-jobs) in the Administration Guide.
{% endhint %}
