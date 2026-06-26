# How Maica connects to Services Australia

## Overview

Maica connects directly to Services Australia so that the information you record about a resident, such as their entry, leave, departures, and supplements, is sent to the government, and so that the data Services Australia holds, such as fee determinations and payment details, flows back into Maica. This two-way connection means you manage residents in one place rather than rekeying information into a separate government portal.

This article explains what data moves in each direction, the status lifecycle that government events go through, and what to do when an event is held, rejected, or fails to send.

## What data moves in each direction

Some information is sent from Maica to Services Australia (outbound), and some is read from Services Australia into Maica (inbound).

| Direction                                  | What it covers                                                                                                                                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Maica to Services Australia (outbound)** | Entry, departure, and leave events; supplement events (oxygen, enteral feeding, extra service); means testing opt-in elections; and monthly accommodation balance reports.                  |
| **Services Australia to Maica (inbound)**  | Care recipient details, fee determinations, Medicare details, leave and respite balances, service and occupancy data, the 24/7 registered nurse supplement, claims, and payment statements. |

{% hint style="info" %}
Outbound submissions are described in [Submitting Care and Supplement Events](/broken/pages/6cc4589345e7aff9fc48849303f5238f88850d15). Inbound data is described in [Keeping Care Recipient Data in Sync](/broken/pages/5d3c888b7de70636a2c32bcc39e8359b6dd410d7).
{% endhint %}

## The event lifecycle

When you send an event to Services Australia, it is recorded against the resident and moves through a standard set of statuses as the government processes it.

| Status         | What it means                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Held**       | Services Australia has received the event but is awaiting manual review or more information. This is common and does not mean something is wrong. |
| **Accepted**   | The event is accepted and will be included for payment or processing.                                                                             |
| **Rejected**   | The event version was rejected by Services Australia.                                                                                             |
| **Superseded** | The event has been replaced by a later version you submitted.                                                                                     |
| **Deleted**    | The event version has been deleted.                                                                                                               |

{% hint style="info" %}
Accommodation balance reports are the exception: they only ever show as **Accepted** or **Deleted**, never Held or Superseded.
{% endhint %}

## Handling held and rejected events

A **Held** event is normal. It means Services Australia needs to review the event before accepting it. Maica tracks the held status and prompts you to check the Services Australia portal where needed. Once Services Australia resolves the event, Maica picks up the updated status on its next status check or when you refresh manually.

A **Rejected** event needs your attention. Review the rejection detail recorded against the event, correct the underlying information, and resubmit. A rejection does not stop you from submitting a corrected version.

## Retrying a failed submission

The connection to Services Australia is designed to be non-blocking. If a submission cannot reach Services Australia, for example during an outage, Maica records the failure against the event with the error detail and shows a brief on-screen notification, but it does not roll back what you recorded locally. The resident's admission, departure, or other action stands.

When the connection is available again, you can retry the submission from the resident's Aged Care Events related list, without re-entering any of the data.

{% hint style="success" %}
Because failures are non-blocking, you never have to halt resident operations because of an external system issue. Record the action, and retry the submission once the connection is restored.
{% endhint %}

## Keeping statuses up to date

Event statuses are kept current in two ways. A daily status check runs automatically and refreshes the status of held events (your administrator can set the time it runs). You can also refresh an event's status on demand from the event record when you need the latest position immediately.

## Related articles

* [Submitting Care and Supplement Events](/broken/pages/6cc4589345e7aff9fc48849303f5238f88850d15)
* [Keeping Care Recipient Data in Sync](/broken/pages/5d3c888b7de70636a2c32bcc39e8359b6dd410d7)
* [Reporting RAD/RAC Balances](/broken/pages/dada85396b8bee89784f4f7eeb77f68a51996a2e)
* [Admitting a Resident](/broken/pages/6246fc9317d4a4032ed206ad966d9c5374d63d05)
