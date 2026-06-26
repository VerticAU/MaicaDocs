# Integration Architecture and Event Lifecycle

Maica integrates with Services Australia across the full residential aged care lifecycle: notifying entries, departures, and leave, reporting supplement needs, recording means testing elections, and pulling back claims, fee, and balance data. This article explains the shape of those integrations, the unified record that backs every outbound event, and the status lifecycle each event moves through.

{% hint style="info" %}
All of these integrations authenticate through PRODA. If the connection is not yet set up, see [PRODA Authentication and Setup](proda-authentication-and-setup.md) first.
{% endhint %}

## How the integration is structured

Integrations run in two directions. Outbound integrations send notifications from Maica to Services Australia. Inbound integrations read data from Services Australia into Maica.

### Outbound: events from Maica to Services Australia

Outbound events follow a consistent pattern. The user launches a quick action from the resident's Service Agreement, which opens a guided form. Maica saves the details to an **Aged Care Event** record, then sends the event to Services Australia through the residential care events API. Each event category (entry, opt-in, departure, leave, enteral feeding, oxygen) is a segment of the same API layer, and each supports create, read, update, and delete operations.

The save and the submission are deliberately separate steps. Maica saves the Aged Care Event first, then makes the callout, so a connectivity or validation problem never costs the user the data they entered.

### Inbound: data from Services Australia to Maica

Inbound integrations are read-only. Maica calls a Services Australia endpoint, receives the current data, and writes it to the relevant Maica records, stamping a sync status and, on failure, a sync error message so users can see when data last refreshed and whether it succeeded. Inbound data includes care recipient details, claims and payment data, fee determinations, balances, and service-level summaries.

### Data flow at a glance

| Direction                                  | What flows                                                                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Outbound (Maica to Services Australia)** | Entry, departure, and leave events; supplement events (enteral feeding, oxygen, extra service); means testing opt-in elections; monthly accommodation balance reports                 |
| **Inbound (Services Australia to Maica)**  | Care recipient details; claims and payment statements; care recipient fee summary; Medicare details; leave and respite balances; service, occupancy, and 24/7 RN supplement summaries |

## The Aged Care Event record

Every outbound event is stored on a single object, the Aged Care Event (`maica_cc__Aged_Care_Event__c`). The event category determines which fields apply, so one object serves entries, departures, leave, and supplement events alike. The table below lists the fields that drive the framework itself. The category-specific fields are covered in [Outbound event APIs](outbound-event-apis.md).

| Field                        | API name                      | Description                                                                                                                                                       |
| ---------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Event Category**           | `Event_Category__c`           | The kind of event: Entry, Opt In, Departure, Leave, Extra Service, Enteral Feeding, or Oxygen. It sets which fields apply and cannot be changed after submission. |
| **Event Type**               | `Event_Type__c`               | The specific type within the category, such as the leave type or the oxygen or enteral feeding classification.                                                    |
| **Event Status**             | `Event_Status__c`             | The current lifecycle status of the event, as described below.                                                                                                    |
| **Funding**                  | `Funding__c`                  | The resident's Funding record that the event belongs to.                                                                                                          |
| **Aged Care Event ID**       | `Aged_Care_Event_ID__c`       | The identifier Services Australia assigns when the event is created. Required for any later update or delete.                                                     |
| **Aged Care ETAG**           | `Aged_Care_ETAG__c`           | The ETag returned with the last response, sent back as the `if-match` header on updates and deletes for concurrency control.                                      |
| **Aged Care Version Number** | `Aged_Care_Version_Number__c` | The Services Australia version of the event. Each accepted update creates a new version.                                                                          |
| **Channel**                  | `Channel__c`                  | The channel the event was submitted through. Maica submits through `B2G` (business to government).                                                                |

## The event status lifecycle

The **Event Status** field tracks where an event sits in its lifecycle. Most events move through the same sequence.

| Status         | Meaning                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **New**        | Created and saved in Maica but not yet successfully submitted to Services Australia.                                          |
| **Held**       | Received by Services Australia and awaiting manual review or more information. This is normal and does not indicate an error. |
| **Accepted**   | Accepted by Services Australia and included for payment or processing.                                                        |
| **Rejected**   | The submitted version was rejected by Services Australia.                                                                     |
| **Superseded** | Replaced by a later version of the same event.                                                                                |
| **Deleted**    | The event has been deleted.                                                                                                   |

{% hint style="warning" %}
Only **Accepted** events are included for payment. An event sitting in **New** or **Held** has not yet been confirmed, so subsidy and supplement payments depend on it progressing to **Accepted**.
{% endhint %}

### Working with held events

A **Held** status is common and is not a failure. It means Services Australia has received the event but is reviewing it or waiting on further information. When Services Australia resolves a held event, Maica reflects the updated status the next time the event is read or refreshed. Users should monitor held events and follow up through the Services Australia portal where needed.

### Correcting and resubmitting events

Events can be updated after submission. An update sends a new version using the stored event ID and ETag, and Services Australia supersedes the prior version. The guided forms adapt to the event's status: a new event opens in a create view, an editable event opens in a manage view, an accepted event offers only the actions valid at that point, and a superseded or rejected event opens ready to submit a corrected version. This keeps users from attempting an action that the event's current status does not allow.

## When a submission fails

Maica applies one principle consistently: a failed Services Australia callout never blocks a care operation.

If a submission fails, whether from a network problem, a Services Australia outage, or a validation rejection, the Aged Care Event and any related record changes are kept, the failure is logged, and the user is notified without losing their work. The user can retry the submission from the Aged Care Events related list without re-entering any data. This reflects the operational reality that admitting or discharging a resident cannot wait on an external system being available.

{% hint style="success" %}
Because the record is saved before the callout, a failed submission is always recoverable. Resolve the underlying issue, then retry from the Aged Care Events related list.
{% endhint %}

## Concurrency and versioning

When Maica creates an event, Services Australia returns an event ID and an ETag, which Maica stores on the Aged Care Event. Any later update or delete sends that ETag back in the `if-match` header. If the record changed elsewhere since Maica last read it, the ETag no longer matches and the change is refused, which prevents one channel from silently overwriting another's update. Each accepted update increments the version number, so the full history of an event is preserved.
