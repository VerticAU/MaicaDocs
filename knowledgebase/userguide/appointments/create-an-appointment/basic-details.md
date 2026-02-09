---
description: Learn about capturing basic details for a new Appointment
---

# Basic Details

## What does the Basic Details stage include?

The Basic Details tab captures the basic details of the [Appointment](../../getting-started/maica-key-concepts/appointment.md), as described in the below table:

<table><thead><tr><th width="222">Captured Information	</th><th>Description</th></tr></thead><tbody><tr><td><a href="../../getting-started/maica-key-concepts/participant.md">Participant(s)</a></td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/participant.md">Participant(s)</a> by simply typing a name of a Participant (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="smart-selection-filter.md">Smart Selection</a> of <a href="../../getting-started/maica-key-concepts/participant.md">Participant(s)</a>.</td></tr><tr><td><a href="../../getting-started/maica-key-concepts/resource.md">Resource(s) </a></td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/resource.md">Resource(s)</a> by simply typing a name of a Resource (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="smart-selection-filter.md">Smart Selection</a> of <a href="../../getting-started/maica-key-concepts/resource.md">Resource(s)</a>.</td></tr><tr><td><a href="../../getting-started/maica-key-concepts/asset.md">Asset(s) </a></td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/asset.md">Asset(s)</a> by simply typing a name of a Asset (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="smart-selection-filter.md">Smart Selection</a> of <a href="../../getting-started/maica-key-concepts/asset.md">Asset(s)</a>.</td></tr><tr><td>Date &#x26; Time Details </td><td>The date and time details are pre-populated from the <a href="../../the-planner/planner-overview.md">Planner</a> so there is nothing to do for the user. </td></tr><tr><td><a href="../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a> </td><td>This allows for the selection of <a href="../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service(s)</a>. You can add an <a href="../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a> by typing the name of the service, or by using any key words configured within the service. For example: If you were adding <strong>Support Coordination</strong>, you could type <strong>Support Coordination</strong>, or, <strong>advice</strong>. <br><img src="../../.gitbook/assets/Screenshot 2024-07-19 at 2.14.09 pm.png" alt=""><br><img src="../../.gitbook/assets/Screenshot 2024-07-19 at 2.14.59 pm.png" alt=""></td></tr><tr><td>Claim Type</td><td>This allows for the selection of a Claim Type by selecting one from the provided dropdown list. </td></tr><tr><td>Time Zone</td><td>When creating a new Appointment, the <strong>timezone is automatically set</strong> <strong>&#x26; displayed</strong> based on the <strong>Salesforce user’s current browser timezone.</strong> This occurs before a Location is selected.</td></tr></tbody></table>

## Things to look out for: Basic Details&#x20;

<figure><img src="../../.gitbook/assets/things to look out for appointment.png" alt="" width="425"><figcaption></figcaption></figure>

### 1. Incorrect Ratio

This alert will show in the instance where you have an incorrect ratio. An incorrect ratio is a situation in which the number of selected [Resource(s)](../../getting-started/maica-key-concepts/resource.md) or [Participant(s)](../../getting-started/maica-key-concepts/participant.md) does not match the specified ratio number.&#x20;

{% hint style="info" %}
A ratio is an NDIS concept where the number of Resource(s) to Participant(s) for the Appointment, expressed as (Required Resources) : (Required Participants) \
e.g. 1 Resource supporting 3 Participants would be 1:3.\
\
To learn more about Ratios, click [here](https://ourguidelines.ndis.gov.au/would-we-fund-it/home-and-living-supports/21-ratio-support)
{% endhint %}

For example, if you have an incorrect ratio of [Resource(s)](../../getting-started/maica-key-concepts/resource.md), **Maica** will alert you with the following warning:&#x20;

`The Appointment does not have the required number of Resources allocated.`

In this instance, **Maica** will still allow you to continue to the next stage of creating your [Appointment](../../getting-started/maica-key-concepts/appointment.md). However, it will result in an unfulfilled appointment. Upon completion, an unfulfilled appointment, like any appointment, will be billed against the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) based on the ratio, **not** the selected [Resource(s)](../../getting-started/maica-key-concepts/resource.md). &#x20;

In order to resolve the Incorrect Ratio alert, ensure that the number of selected [Resource(s)](../../getting-started/maica-key-concepts/resource.md) and [Participant(s)](../../getting-started/maica-key-concepts/participant.md) match the specified ratio. [For example](https://ourguidelines.ndis.gov.au/would-we-fund-it/home-and-living-supports/21-ratio-support): If you have 2 resources allocated to your appointment, ensure your ratio number is set to 2.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2024-07-19 at 2.37.19 pm.png" alt="" width="563"><figcaption></figcaption></figure>

### 2. Participant(s) have no Agreement for selected Appointment Service.

This alert will show in the instance where the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have no [Agreement](../../service-agreements/agreement-management/) for the selected [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md). When this is the case, the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) will be marked in red (as shown) and the `Next` button will become unavailable. This is a restriction that **Maica** enforces where the user cannot continue to create the [Appointment](../../getting-started/maica-key-concepts/appointment.md).

In order to resolve this alert, you **must** select an [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md) that the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../getting-started/maica-key-concepts/service-agreement.md) for and hence can be billed against after your [Appointment](../../getting-started/maica-key-concepts/appointment.md) is delivered.

When the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../getting-started/maica-key-concepts/service-agreement.md) for the selected [Appointment Service](../../getting-started/maica-key-concepts/appointment-service.md), the alert will be replaced by the following:&#x20;

&#x20;&#x20;

<figure><img src="../../.gitbook/assets/Select Appointment Service.png" alt="" width="563"><figcaption></figcaption></figure>

1. Provides an overview of the selected service and the available funding in the [Participant(s)](../../getting-started/maica-key-concepts/participant.md) plan for said service.&#x20;
2. Indicates that the service will be billed against a Category Agreement Item&#x20;
3. Indicates that the service will be billed against a Statement Agreement Item&#x20;
4. Allows for multiple services to be added to the [Appointment](../../getting-started/maica-key-concepts/appointment.md), as long as the selected [Participant(s)](../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../getting-started/maica-key-concepts/service-agreement.md) for all Services being added. &#x20;

### 3. Resource(s) have a Roster Mode conflict

This alert will show in the instance where the selected Resource(s) have a Roster Mode conflict and hence cannot be allocated to the proposed Appointment. This error is also a restriction that **Maica** enforces where the user cannot continue to create an Appointment.

{% hint style="info" %}
`Roster Mode` in **Maica** is used to define the behaviour and validation applied when scheduling `Appointments` for a `Resource`. When selecting a `Roster Mode` for a `Resource`, there are two selectable options. These are:

* `Appointment`: This means Appointments can be scheduled at any time for a Resource provided it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments can be created at any time.
* `Shift`: This means Appointments can only be scheduled within a Shift that a Resource is part of and it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments still must fall within a Shift that the Resource is assigned to.
{% endhint %}

In order to resolve this alert, you **must** select Resource(s) that are set to a Roster Mode of `Appointment` during the time of the proposed Appointment, or, if they are set to `Shift`, the proposed Appointment must be scheduled during an active Shift for the allocated Resource(s).

You can set a Resource(s) Roster Mode on their [Resource Profile](../../resources/resource-profile.md), [Availability Records](../../resources/resource-profile.md), or by using a [Global Setting](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/rostering-management) in your Maica organisation for all Resource(s). To learn more, click the links.&#x20;

{% hint style="info" %}
It is important to note that if a `Resource` has a `Roster Mode` set on their Resource Record that is different to the `Roster Mode` set for a specific `Availability` Record, the `Availability` Record Mode will take precedent during the `Availability` period. \
\
If No `Availability` Records are found and the `Roster Mode` is not set on the `Resource` Record: the `Roster Mode` for the `Resource` will be defined by the `Global Roster Mode` setting. This is configurable in the **Maica** [Rostering Management](https://knowledge.maica.com.au/maica-knowledge-base/v/maica-administration-guide/settings/rostering-management) settings.
{% endhint %}
