---
description: Learn about how Maica manages Incidents
---

# Incident Management

**Incidents** in **Maica** allow you to record, track, and manage any event that affects the safety, wellbeing, or care of a Participant, Resource, or Environment. Incidents can be entered directly by Care Workers through the [Maica Mobile App](/broken/pages/rdjmp4Zyv79t4qwgsg6I) or created later by office-based staff.

This article outlines how to create an Incident, what information is captured, and how the Incident progresses through the management process.

## **Purpose of Incidents**

Incidents ensure that Support Teams can:

* Record factual information about events as they happen
* Capture all required details for compliance and organisational reporting
* Track the status of an incident from initial reporting through to closure
* Document actions taken and any follow-up required
* Maintain a consistent and auditable record across the organisation

## **Creating an Incident**

As mentioned, Incidents can be created either in the **Maica Mobile App** (care workers) or via **Salesforce Desktop** (office users).

{% hint style="success" %}
Consistent with other functionality, this is managed via Permission Sets. To learn more about what Permissions grant access to the functionality around Incidents, [click here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/permission-sets).&#x20;
{% endhint %}

{% hint style="info" %}
Regardless of where the Incident is created, the same structured form and fields are captured to ensure consistent data collection.
{% endhint %}

First, you must open the form:

* **Mobile App:** Navigate to **Appointment → Incidents → New Incident**.
* **Desktop:** Go to the **Incidents** tab and click **New**.

{% hint style="info" %}
The Incident form is divided into logical sections to make data entry easier. These sections are detailed below.&#x20;
{% endhint %}

#### 1. I**ncident Information**

This section captures the essential details of the event.

| Field                      | Description                                                              |
| -------------------------- | ------------------------------------------------------------------------ |
| **Incident Type**          | Classifies the event as an _Incident_, _Near Miss_, or _Hazard_.         |
| **Incident Status**        | Tracks progress (New → Under Investigation → Escalated → Closed).        |
| **Reported By**            | The reporting User.                                                      |
| **Appointment**            | The associated Appointment.                                              |
| **Participant**            | The Participant affected by the incident.                                |
| **Incident Date and Time** | Exact date and time the incident occurred. Not the time it was reported. |

#### 2. **Incident Details**

| Field                 | Description                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| **Subject**           | A short summary describing the incident.                                                             |
| **Description**       | A factual account of what happened, including contributors, sequence of events, and why it occurred. |
| **Immediate Actions** | Any urgent actions, first aid, or interventions taken at the time.                                   |
| **Incident Location** | Address or description of where the incident occurred.                                               |
| **Attachments**       | Photos, documents, or evidence supporting the incident record.                                       |

#### 3. **Impact and Harm**

| Field                  | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Participant Harmed** | Indicates whether the Participant was harmed.                                          |
| **Harm Detail**        | Further detail about the nature and extent of the harm (displayed only if harm = Yes). |

#### 4. **Actions Taken**

| Field                           | Description                                                 |
| ------------------------------- | ----------------------------------------------------------- |
| **Family Notified**             | Whether a family member or guardian was informed.           |
| **External Agency Notified**    | Whether any external services were contacted.               |
| **External Agencies Contacted** | Police, Ambulance, Fire, Hospital, Coroner or Other.        |
| **Other External Agencies**     | Additional agencies not listed above.                       |
| **External Agency Reference**   | Any case numbers or reference details provided by agencies. |

#### 5. **Additional Details**

| Field         | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| **Witnesses** | Names, roles, and contact details of witnesses, if applicable. |

#### 6. **Investigation Conducted**

This section is used once internal investigation or review has been completed.

| Field                            | Description                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| **Review Concluded Date**        | When the internal investigation was completed.                                            |
| **Review Conducted By**          | The staff member who completed the review.                                                |
| **Review Disclosure**            | Indicates whether the incident was disclosed to an external regulatory or oversight body. |
| **Review Conclusions / Actions** | Summary of findings and any recommended or completed actions.                             |

## **Status Path**

Incidents progress through the following stages:

1. **New** — The incident has been logged and requires review.
2. **Under Investigation** — An internal investigation is underway.
3. **Escalated** — Incident requires additional oversight or external reporting.
4. **Closed** — All actions complete and the incident is finalised.

{% hint style="info" %}
A Lightning Path at the top of the record guides users through these stages.
{% endhint %}

## **Viewing Incidents Related to Records**

Incidents automatically appear as related lists on:

* **Participant**
* **Resource**
* **Appointment** (where applicable)

This allows staff to easily see all incidents associated with a specific person or service event.
