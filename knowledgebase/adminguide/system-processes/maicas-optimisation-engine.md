---
description: >-
  Learn about the logic behind the Engine powering Maica's Resource Optimiser
  and Smart Selection Filter
---

# Maica's Optimisation Engine

The below article provides a technical overview of the Optimisation Engine used within Maica. It explains how the engine evaluates Resources, applies constraints, calculates scores, and determines the most appropriate assignment during an optimisation run.&#x20;

## **What is the purpose of the Optimisation Engine?**

The Optimisation Engine is responsible for identifying and ranking suitable Resources for Appointments or Shifts. Its core objective is to produce the most appropriate allocation for each record, based on System Rules, Organisational Configurations, and Weighted Scoring Factors.

The engine:

* Honours all mandatory requirements (hard constraints)
* Evaluates preference-based rules (soft preferences)
* Applies your configured weightings and criteria
* Selects the highest-scoring valid Resource(s)

## **Inputs Used by the Engine**

The Optimisation Engine evaluates a wide set of data from across Maica. These inputs feed into _candidate filtering_, _scoring_, and _selection_. Please refer to the table below to see each Input, broken down by Category.&#x20;

| Category                    | Input                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Participant**             | <p></p><ul><li>Assigned and requested Services</li><li>Required Skills</li><li>Participant Preferences (gender, language, cultural requirements, etc.)</li><li>Travel and Mobility rules</li><li>Location and access constraints</li><li>Multi-Resource or Ratio requirements</li></ul>                                        |
| **Resource**                | <p></p><ul><li>Availability (daily and weekly)</li><li>Skills and Qualifications</li><li>Attributes (gender, language, certifications, custom attributes)</li><li>Current Workload</li><li>Contracted hours thresholds</li><li>Unavailability records</li><li>Travel requirements or limitations</li><li>Roster Mode</li></ul> |
| **Appointment** / **Shift** | <p></p><ul><li>Start/End time</li><li>Duration</li><li>Service Skills</li><li>Additional Service Properties</li><li>Location (address, centre, online)</li><li>Required number of Resources (ratio)</li></ul>                                                                                                                  |
| **Compliance**              | <p></p><ul><li>Mandatory Certifications</li><li>Participant/Worker Exclusion Lists</li></ul>                                                                                                                                                                                                                                   |
| **System**                  | <p></p><ul><li>Weighting values in <strong>Settings → Matching Score Importance Level</strong></li><li>Inclusion/exclusion rules in the <strong>Resource Pool</strong></li><li>Ranking rules set via <strong>Ranking Criteria</strong></li></ul>                                                                               |

## **Constraint Hierarchy**

In addition to the inputs above, the Optimisation Engine processes also manages constraints in the following order:

#### **1. Hard Constraints (Must Be Met)**

These eliminate a Resource before scoring begins.

Examples:

* Resource Unavailable for required time
* Missing mandatory Skill or Certification
* Exceeds Weekly Hour Limit or Daily Capacity
* Travel not feasible (unless Travel weighting = 0%)
* Participant → Resource Exclusions
* Roster Mode incompatibility (e.g., Shift Resource in Appointment Mode)

{% hint style="success" %}
If a Resource fails _any_ hard constraint, they are removed from consideration.
{% endhint %}

#### **2. Soft Preferences (Scored)**

Once hard constraints are satisfied, the engine evaluates soft preferences and weighted factors.

Examples:

* Preferred Gender or Language
* Travel Distance
* Balanced Workload Distribution
* Non-required Skills
* Custom Attribute Matches

{% hint style="success" %}
Soft preferences never override hard constraints. They influence _scoring_, not _eligibility_.
{% endhint %}

## Scoring Model

For each Resource who passes all hard constraints, the engine calculates an **Overall Matching Score.** The score is produced from the weighted components configured under: **Settings → Matching Score Importance Level.**&#x20;

{% hint style="info" %}
You can also configure the Matching Score Importance Level on a per run basis via the Resource Optimiser Settings.&#x20;
{% endhint %}

The five categories are:

| Category         | Description                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| **Skills**       | Compares required Skills vs. the Resource's Skills. Occurrence-based; weighted only if Skills > 0%.             |
| **Availability** | Validates whether the Resource has enough available hours on the specific day after subtracting existing usage. |
| **Workload**     | Evaluates whether assigning this Appointment keeps the Resource within their weekly limits.                     |
| **Attributes**   | Checks how many required attributes/Participant preferences (gender, language, etc.) the Resource satisfies.    |
| **Travel**       | Scores proximity relative to the closest candidate.                                                             |

{% hint style="success" %}
Each category contributes to the final score according to your weighting. All five values must total **100%**.
{% endhint %}

A Resource with the highest Overall Matching Score is considered the preferred match.

## How the Optimiser Runs&#x20;

The Optimisation Engine operates in five main phases, each is described in the section below.

#### &#x31;**. Pre-processing**

The engine prepares data before scoring begins:

* Normalises time zones and calendars
* Loads Appointment details (location, duration, Skills, required ratio)
* Identifies all Resources in scope based on the **Resource Pool**
* Filters out Resources who fail any hard constraint (availability, missing Skills, certification expiry, exclusion rules, etc.)
* Applies Roster Mode restrictions (Appointment Mode vs Shift Mode)

The output is a **Candidate Pool** for each Appointment.

#### **2. Candidate Scoring**

Each candidate is evaluated using:

* Your configured **Matching Score Importance Level**
* **Ranking Criteria** (rules the admin has added that impact scoring)
* Attribute and preference fulfilment
* Penalty adjustments (e.g., travel, workload imbalances)

Each candidate receives:

* A per-category component score
* A single **Overall Matching Score (%)**

#### **3. Search + Selection**

For multi-resource or multi-appointment situations, Maica evaluates all scored options, then assembles the most appropriate schedule by:

* Selecting the highest-scoring valid Resource(s)
* Applying tie-breakers (in order):
  1. Highest score
  2. Best workload balance
  3. Better continuity
  4. Lower travel distance (if Travel > 0%)

Assignments failing any hard constraint during assembly are discarded.

#### **4. Validation**

Before results are returned, Maica re-validates:

* Roster Mode
* Weekly limits
* Daily capacity
* Service Skills
* Certifications and expiry
* Conflict rules
* Ratio (number of Resources required)

The engine will not propose or confirm an invalid assignment.

#### **5. Output**

For each Appointment or Shift, the engine produces:

* **Highest-scoring Resource(s)**
* **Matching Scores for each Resource**
* **Matched and unmatched criteria**
* **Reasons for rejection** (in Appointment Insights)
* **Alternate Resources** (lower-ranked but still valid)

{% hint style="info" %}
If no Resources meet hard constraints, the Appointment remains unfilled.
{% endhint %}
