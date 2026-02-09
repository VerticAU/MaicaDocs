---
description: Learn about Broadcasting within Maica
---

# Broadcasting Overview

## What is Broadcasting?&#x20;

**Broadcasting** in **Maica** allows you to send offers for unfilled Shifts to one or many Resources at once.

{% hint style="info" %}
Please note, that whilst the term Shift will be used throughout this article, everything mentioned here also applies to Appointments.&#x20;
{% endhint %}

Rather than confirming a Resource in straight away through Optimisation, Broadcasting gives workers the opportunity to Accept or Decline a Shift/Appointment directly from the Maica's Mobile App, whilst Maica manages the outcomes of this behind the scenes based on your chosen Broadcast Method.

Each offer is tracked individually, allowing you to:

* Send offers to multiple Resources at once
* See who has Accepted, Declined, or not responded
* Control how and when Resources are confirmed
* Avoid over-allocating a shift

Broadcasting can be initiated from:

* A single Appointment within the Optimiser&#x20;
* Multiple selected Appointments requiring the same Broadcast configuration within the Optimiser

The behaviour of a Broadcast is controlled by a set of configuration options, these are further detailed below.&#x20;

## Configuring a Broadcast&#x20;

Before running a Broadcast, there are a few key fields that determine how the run will behave. These are further described below.&#x20;

{% hint style="info" %}
Broadcasting is launched from within the Resource Optimiser. To learn more about how the Optimiser works, [please click here](./).&#x20;
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-15 at 2.10.12 pm.png" alt=""><figcaption></figcaption></figure>

| Field                   | Description                                                                                                                                                     |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Offer Method**        | This is the method in which a particular Broadcast run will respect. These are further described below.                                                         |
| **Offer Count**         | Number of Resources to send offers to. For Highest Scoring and Manual Approval methods, this determines the candidate pool size.                                |
| **Manual Selection**    | Select specific Resources to receive this broadcast offer. Click the filter icon to search and rank Resources using the Find Resource tool.                     |
| **Expiration Window**   | Time before the Scheduled Start when offers expire. For Highest Scoring method, this is also the decision point when top candidates are selected and confirmed. |
| **Send Notifications**  | When enabled, push notifications will be sent to Resources via the Salesforce mobile app.                                                                       |

{% hint style="info" %}
Offer Count and Manual Selection work in conjunction with each other. \
\
For example, if you set an Offer Count to 10, and manually select 2 Resources, Maica will Broadcast the Shift to an additional 8 Resources (the next 8 that are the most suitable/have the highest score).\
\
However, if you set the Offer Count to 5, and manually select 5 Resources, Maica will Broadcast only to those 5. This gives you more control over your Broadcast configuration.&#x20;
{% endhint %}

{% hint style="warning" %}
Please note, in order for Notifications to work, they must be enabled in your Org Setup.&#x20;
{% endhint %}

{% hint style="info" %}
Your Broadcast configuration will apply to all selected Shifts when the Broadcast modal is triggered. Eg: If you select 5 Shifts, then the above selections will apply to all 5.&#x20;
{% endhint %}

{% hint style="success" %}
All Broadcasting information is also displayed on the Appointment or Shift record itself.&#x20;
{% endhint %}

## What are the different Offer Methods?&#x20;

### First In, Best Dressed

Offers are sent to the selected Number of Resources, and confirmations happen automatically in the order Resources accept.

Once the required number of resources has been confirmed:

* The Shift is marked as filled
* Any remaining open offers are Withdrawn

{% hint style="warning" %}
With First In, Best Dressed, the fastest responders are confirmed — not necessarily the highest-scoring ones.
{% endhint %}

### Highest Scoring

Offers are sent to multiple Resources and remain open until all responses are received or the Broadcast period ends. Once responses are collected:

* All Accepted offers are reviewed
* Accepted Resources are ranked by Optimisation Score

{% hint style="success" %}
This score will be determined based on the Optimisation Engine, to learn more, [click here](./).&#x20;
{% endhint %}

* Only the highest-scoring Resources are Confirmed

Any remaining accepted offers are Withdrawn.

### Manual approval

Resources receive offers and can Accept them, but no automatic confirmation occurs. Accepted offers remain Accepted until a scheduler manually reviews and Confirms the selected Resources.

The Shift is only marked as filled once the required number of Resources has been Confirmed Manually.

{% hint style="info" %}
There are multiple ways a Scheduler may Confirm Resources, this is further explained [here](running-a-broadcast.md).&#x20;
{% endhint %}

{% hint style="info" %}
To learn more about the full process of Running a Broadcast for each method, [please click here](running-a-broadcast.md).&#x20;
{% endhint %}
