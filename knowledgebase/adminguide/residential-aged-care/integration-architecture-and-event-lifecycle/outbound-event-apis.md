# Outbound Event APIs

Outbound events are how Maica notifies Services Australia of what is happening to a resident: when they enter and leave care, when they take leave, when they need clinical supplements, and when they elect to opt in to the newer means testing arrangements. Every outbound event is stored on the Aged Care Event record and submitted through the residential care events integration. This article describes each event, the fields it carries, and the rules that govern it.

{% hint style="info" %}
All outbound events share the same record model, status lifecycle, versioning, and resilience behaviour. For that shared framework, see [Integration architecture and event lifecycle](./). This article focuses on what is specific to each event.
{% endhint %}

## Before you submit

An active PRODA connection for Aged Care must be in place before any event can be submitted. See [PRODA Authentication and Setup](proda-authentication-and-setup.md).

For an **entry** event, the user first runs a care recipient search against Services Australia to locate and confirm the resident's record. That search returns a temporary access key that Maica includes with the entry submission to link the event to the correct Services Australia record. Departure and leave events do not need this step, because the resident's identity is already established through the accepted entry.

## Care period events

These events open, close, and interrupt a resident's care period. They are the most operationally critical outbound events.

### Entry events

An entry event notifies Services Australia that a resident has entered care. Submission is a prerequisite for the resident to attract government subsidy, which begins on the entry date.

| Field                    | API name                  | Description                                                                                                                                                               |
| ------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Entry Type**           | `Entry_Type__c`           | Whether the entry is permanent or respite. A permanent entry opens an ongoing care period; a respite entry covers a planned short stay. Cannot be changed after creation. |
| **Entry Date**           | `Entry_Date__c`           | The date the resident entered care. Payment is inclusive of this date, so subsidy begins on the entry date.                                                               |
| **Pensioner Status**     | `Pensioner_Status__c`     | The resident's pensioner status (full, part, or non-pensioner). Required for permanent entries and used in accommodation and means tested fee calculations.               |
| **Receiving Prior Care** | `Receiving_Prior_Care__c` | Whether the resident was receiving care immediately before this entry. Helps determine which means test and fee rules apply.                                              |
| **Means Testing Opt In** | `Means_Testing_Opt_In__c` | Whether the resident is electing the newer means testing arrangements. Relevant to entries on or after 1 November 2025.                                                   |

{% hint style="warning" %}
For entries from 1 November 2025, several legacy accommodation fields no longer apply and must not be submitted. Maica applies the correct field set automatically based on the entry date, so older accommodation arrangement and amount fields are only sent for entries before that date.
{% endhint %}

The entry distinguishes a **permanent** entry, which opens an ongoing care period, from a **respite** entry, which covers a planned stay with an expected departure. After submission, Services Australia returns an event ID and an initial status (commonly Held or Accepted), which Maica records on the event.

### Departure events

A departure event notifies Services Australia that a resident has permanently left the service, closing the care period.

{% hint style="warning" %}
The departure date is **not** inclusive for payment. Subsidy ceases on the day before the departure date, and the Maica billing engine applies the same rule, so the final billed day is the day before departure.
{% endhint %}

| Field                | API name              | Description                                                                                            |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------ |
| **Departure Date**   | `Departure_Date__c`   | The date the resident departed. Must be on or after the entry date. Payment is not made for this date. |
| **Departure Reason** | `Departure_Reason__c` | The reason for departure (see codes below). Required when a departure date is provided.                |
| **Entry Event ID**   | `Entry_Event_ID__c`   | Links the departure to its originating entry event, forming a complete care period record.             |

The departure reason values are:

| Code    | Reason                                                                                                |
| ------- | ----------------------------------------------------------------------------------------------------- |
| `AUTO`  | Auto Departure (system-generated when a new entry at another service triggers an automatic departure) |
| `DECEA` | Deceased                                                                                              |
| `OTHER` | Other                                                                                                 |
| `RTFAM` | Return to Family or Home                                                                              |
| `RESPR` | To Another Service (Provider)                                                                         |
| `RESRS` | To Another Service (Resident)                                                                         |
| `THOSP` | To Hospital                                                                                           |

Departure is a deliberate, user-led action launched from the resident's Service Agreement. This is intentional: a departure has to coordinate the Services Australia submission with Maica's own processing, including final billing, setting up any RAD or RAC refund, and closing the Service Agreement. The guided action steps the user through both sides together.

{% hint style="info" %}
Setting a discharge date on the Service Agreement does not trigger the departure. The date may be recorded separately as data entry, but the departure must be started deliberately through the quick action.
{% endhint %}

### Leave events

A leave event records an approved period of absence. Leave matters because it affects the subsidy paid, consumes leave entitlements, and influences occupied bed day counting for the 24/7 RN supplement.

| Field          | API name        | Description                                                                                                    |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| **Event Type** | `Event_Type__c` | The leave type (see codes below).                                                                              |
| **Start Date** | `Start_Date__c` | The first day of leave. This date is inclusive: the resident is on leave from this day.                        |
| **End Date**   | `End_Date__c`   | The day the resident returns. This date is not inclusive: it is the first day back, not the last day of leave. |

The leave types are:

| Code     | Leave type                            | Claimable | Effect on balance                          |
| -------- | ------------------------------------- | --------- | ------------------------------------------ |
| `SOC`    | Social leave (with notice)            | Yes       | Consumes the social leave balance          |
| `SOC_NC` | Social leave (non-claimable)          | No        | Does not consume balance                   |
| `TC`     | Transition care leave                 | Yes       | Consumes the transition care leave balance |
| `TC_NC`  | Transition care leave (non-claimable) | No        | Does not consume balance                   |
| `HOSP`   | Hospital leave                        | Yes       | No balance cap                             |
| `EMG`    | Emergency leave                       | Yes       | No balance cap                             |

{% hint style="info" %}
If no end date is submitted, Services Australia treats the leave as open-ended. Maica sends an explicit end date when the resident returns. An accepted leave event can be updated, both to correct details and to apply the routine return-from-leave end date.
{% endhint %}

Before a leave event is created, Maica can check the resident's remaining entitlement through the leave and respite balance reads, so available days are confirmed before submission. Those inbound reads are covered in [Inbound data APIs](/broken/pages/9fa8a492d0fc7d5f06ef6189a7de35f369419453).

## Supplement events

These events notify Services Australia of clinical equipment needs and extra service status. They attract dedicated supplements and follow the same submission pattern as the care period events.

### Enteral feeding and oxygen events

These events record periods where a resident requires enteral (tube) feeding or supplemental oxygen. Services Australia pays a dedicated supplement for each.

| Field          | API name        | Description                                                                                                                            |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Event Type** | `Event_Type__c` | The clinical classification. Enteral feeding uses normal and high, bolus and non-bolus variants; oxygen uses normal and high variants. |
| **Start Date** | `Start_Date__c` | The first day the supplement applies.                                                                                                  |
| **End Date**   | `End_Date__c`   | The last day the supplement applies. For these two events the end date is inclusive.                                                   |

{% hint style="warning" %}
Both events require the resident's completed AC011 form (the authority for enteral feeding or oxygen) to be attached. An event's start date cannot cross the boundary between the pre-AN-ACC and post-AN-ACC periods: if the supplement was in place before the AN-ACC start date, a separate event is needed for the post-AN-ACC period. After the AN-ACC date, only the normal classifications are valid (for oxygen, `OXY_NORM`).
{% endhint %}

### Extra service events

An extra service event records whether a resident occupies an approved extra service ward place, which affects subsidy and the resident's fee eligibility. The ward type code is taken from the room (Accommodation) the resident occupies, and the event is intended to be raised as part of the Relocate Resident workflow when a resident moves into or out of an extra service room.

| Field              | API name            | Description                                                                                                                                                                                       |
| ------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ward Type Code** | `Ward_Type_Code__c` | The extra service ward type for the resident's room. The first three digits indicate the bed count and the letter suffix identifies the tier. Applies only at services with extra service places. |
| **Start Date**     | `Start_Date__c`     | The first day of extra service status.                                                                                                                                                            |
| **End Date**       | `End_Date__c`       | The end of extra service status. This date is not inclusive: status ends the day before the date submitted.                                                                                       |

{% hint style="danger" %}
The Extra Service event category exists on the Aged Care Event record and is designed to be submitted from the Relocate Resident workflow. A dedicated extra service submission segment could not be confirmed in the current `release-production` code, where the confirmed submission segments are entry, opt-in, departure, leave, enteral feeding, and oxygen. Confirm the extra service submission path with the engineering team before relying on this in production.
{% endhint %}

## Means testing opt-in

An opt-in event records a resident's formal election to opt in to the means testing arrangements that apply from 1 November 2025. It is launched as a deliberate quick action, because the election is a legal step that depends on the resident's signed form.

| Field                    | API name                  | Description                                                                                                     |
| ------------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Opt In Date**          | `Opt_In_Date__c`          | The date the resident elected to opt in. Mandatory for an opt-in event and must be on or after 1 November 2025. |
| **Means Testing Opt In** | `Means_Testing_Opt_In__c` | Records that the resident has elected to be subject to the means testing arrangements.                          |

{% hint style="warning" %}
The resident's completed AC022 form (the means testing opt-in election) must be attached to the event. Maica supports submit, retrieve, update, and withdraw for opt-in events; search, versions, and attachment retrieval endpoints are out of scope, and the signed form is retained by the provider rather than read back through the API.
{% endhint %}

When Services Australia accepts the opt-in event, Maica updates the resident's billing configuration automatically. It sets **Opt In Confirmed** (`Opt_In_Confirmed__c`) and the **Opt In Effective Date** (`Opt_In_Effective_Date__c`) on the Funding record, and a record-triggered process moves the Fee Arrangement to the post-1 November 2025 arrangement. Linked Service Agreements then reflect the new arrangement automatically, with no manual record changes required.

{% hint style="success" %}
The opt-in downstream update is immediate. Once Services Australia accepts the event, the resident's fee arrangement in Maica updates without any further user action.
{% endhint %}

## How outbound events behave

Every event in this article supports the same set of operations: create the event, read it back, update it (which sends a new version), and delete it. Updates and deletes use the stored event ID and ETag for concurrency control, and each accepted update creates a new version. Whether an action is available at a given moment depends on the event's status, and the guided forms only offer the actions that the current status allows.
