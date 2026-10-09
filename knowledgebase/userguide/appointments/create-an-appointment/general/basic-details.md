---
description: Learn about capturing basic details for a new Appointment
---

# Basic Details

## What does the Basic Details stage include?

The Basic Details tab captures the basic details of the [Appointment](../../../getting-started/maica-key-concepts/appointment.md), as described in the below table:

<table><thead><tr><th width="222">Captured Information</th><th>Description</th></tr></thead><tbody><tr><td><a href="../../../getting-started/maica-key-concepts/participant.md">Participant(s)</a></td><td>This allows for the selection of <a href="../../../getting-started/maica-key-concepts/participant.md">Participant(s)</a> by simply typing a name of a Participant (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="smart-selection-filter.md">Smart Selection</a> of <a href="../../../getting-started/maica-key-concepts/participant.md">Participant(s)</a>.</td></tr><tr><td><a href="../../../getting-started/maica-key-concepts/resource.md">Resource(s)</a></td><td>This allows for the selection of <a href="../../../getting-started/maica-key-concepts/resource.md">Resource(s)</a> by simply typing a name of a Resource (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="smart-selection-filter.md">Smart Selection</a> of <a href="../../../getting-started/maica-key-concepts/resource.md">Resource(s)</a>.</td></tr><tr><td><a href="../../../getting-started/maica-key-concepts/asset.md">Asset(s)</a></td><td>This allows for the selection of <a href="../../../getting-started/maica-key-concepts/asset.md">Asset(s)</a> by simply typing a name of a Asset (or multiple) or by clicking on the <code>Filter</code> icon which allows for <a href="smart-selection-filter.md">Smart Selection</a> of <a href="../../../getting-started/maica-key-concepts/asset.md">Asset(s)</a>.</td></tr><tr><td>Date &#x26; Time Details</td><td>The date and time details are pre-populated from the <a href="../../../the-planner/planner-overview.md">Planner</a> so there is nothing to do for the user.</td></tr><tr><td><a href="../../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a></td><td>This allows for the selection of <a href="../../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service(s)</a>. You can add an <a href="../../../getting-started/maica-key-concepts/appointment-service.md">Appointment Service</a> by typing the name of the service, or by using any key words configured within the service. For example: If you were adding <strong>Support Coordination</strong>, you could type <strong>Support Coordination</strong>, or, <strong>advice</strong>.<br><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2Fvho5djW1LmyBRv35PYkP%2FScreenshot%202024-07-19%20at%202.14.09%20pm.png?alt=media&#x26;token=1a4f8a0d-fb1e-4635-a0cd-18fd4c2be152" alt=""><br><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FpIXmrDNVV9YizbdCEyZ6%2FScreenshot%202024-07-19%20at%202.14.59%20pm.png?alt=media&#x26;token=5decea60-1917-4310-9acb-3b81f92e1139" alt=""></td></tr><tr><td>Claim Type</td><td>This allows for the selection of a Claim Type by selecting one from the provided dropdown list.</td></tr><tr><td>Time Zone</td><td>When creating a new Appointment, the <strong>timezone is automatically set</strong> <strong>&#x26; displayed</strong> based on the <strong>Salesforce user’s current browser timezone.</strong> This occurs before a Location is selected.</td></tr></tbody></table>

## Things to look out for: Basic Details

<table><thead><tr><th align="center" valign="top">Standard Experience</th><th align="center" valign="top">Legacy Experience</th></tr></thead><tbody><tr><td align="center" valign="top"><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FFxJDHqieBU7uufcgL96R%2Fimage.png?alt=media&#x26;token=0fb52798-0419-43c6-ba37-fc13523ecbff" alt="" data-size="original"></td><td align="center" valign="top"><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2Fdj1ik6Wx4us8pkTiMHCe%2Fthings%20to%20look%20out%20for%20appointment.png?alt=media&#x26;token=37474230-1e70-40c3-9a7a-76c5d6ed4320" alt="Legacy Experience" data-size="original"></td></tr></tbody></table>

### 1. Incorrect Ratio

This alert will show in the instance where you have an incorrect ratio. An incorrect ratio is a situation in which the number of selected [Resource(s)](../../../getting-started/maica-key-concepts/resource.md) or [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) does not match the specified ratio number.

{% hint style="info" %}
A ratio is an NDIS concept where the number of Resource(s) to Participant(s) for the Appointment, expressed as (Required Resources) : (Required Participants)\
e.g. 1 Resource supporting 3 Participants would be 1:3.\
\
To learn more about Ratios, click [here](https://ourguidelines.ndis.gov.au/would-we-fund-it/home-and-living-supports/21-ratio-support)
{% endhint %}

For example, if you have an incorrect ratio of [Resource(s)](../../../getting-started/maica-key-concepts/resource.md), **Maica** will alert you with the following warning:

`The Appointment does not have the required number of Resources allocated.`

In this instance, **Maica** will still allow you to continue to the next stage of creating your [Appointment](../../../getting-started/maica-key-concepts/appointment.md). However, it will result in an unfulfilled appointment. Upon completion, an unfulfilled appointment, like any appointment, will be billed against the [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) [Service Agreement](../../../getting-started/maica-key-concepts/service-agreement.md) based on the ratio, **not** the selected [Resource(s)](../../../getting-started/maica-key-concepts/resource.md).

In order to resolve the Incorrect Ratio alert, ensure that the number of selected [Resource(s)](../../../getting-started/maica-key-concepts/resource.md) and [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) match the specified ratio. [For example](https://ourguidelines.ndis.gov.au/would-we-fund-it/home-and-living-supports/21-ratio-support): If you have 2 resources allocated to your appointment, ensure your ratio number is set to 2.

<table><thead><tr><th align="center" valign="top">Standard Experience</th><th align="center" valign="top">Legacy Experience</th></tr></thead><tbody><tr><td align="center" valign="top"><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FefRP2cfLbb58jPcYEdZb%2Fimage.png?alt=media&#x26;token=dcf3fbcf-bdfa-47c3-a53a-5c09152fa48c" alt="" data-size="original"></td><td align="center" valign="top"><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FmjHrXxikDrwS4hiWvcA1%2FScreenshot%202024-07-19%20at%202.37.19%20pm.png?alt=media&#x26;token=82522906-bb5d-4f70-9438-22223fa581b3" alt="" data-size="original"></td></tr></tbody></table>

### 2. Participant(s) have no Agreement for selected Appointment Service.

This alert will show in the instance where the selected [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) have no [Agreement](../../../service-agreements/agreement-management/) for the selected [Appointment Service](../../../getting-started/maica-key-concepts/appointment-service.md). When this is the case, the [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) will be marked in red (as shown) and the `Next` button will become unavailable. This is a restriction that **Maica** enforces where the user cannot continue to create the [Appointment](../../../getting-started/maica-key-concepts/appointment.md).

In order to resolve this alert, you **must** select an [Appointment Service](../../../getting-started/maica-key-concepts/appointment-service.md) that the selected [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../../getting-started/maica-key-concepts/service-agreement.md) for and hence can be billed against after your [Appointment](../../../getting-started/maica-key-concepts/appointment.md) is delivered.

When the [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../../getting-started/maica-key-concepts/service-agreement.md) for the selected [Appointment Service](../../../getting-started/maica-key-concepts/appointment-service.md), the alert will be replaced by the following:

<table><thead><tr><th align="center" valign="top">Standard Experience</th><th align="center" valign="top">Legacy Experience</th></tr></thead><tbody><tr><td align="center" valign="top"><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2F3UaxRgYtaRXV1ex8XTlw%2Fimage.png?alt=media&#x26;token=19c49cfa-dd0f-4519-a054-9bd77cc16149" alt="" data-size="original"></td><td align="center" valign="top"><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FNXPyLBm12XOKMvCiGCei%2FSelect%20Appointment%20Service.png?alt=media&#x26;token=91baf17f-405b-4a17-866d-172622377ca2" alt="" data-size="original"></td></tr></tbody></table>

1. Provides an overview of the selected service and the available funding in the [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) plan for said service.
2. Indicates that the service will be billed against a Category Agreement Item
3. Indicates that the service will be billed against a Statement Agreement Item
4. Allows for multiple services to be added to the [Appointment](../../../getting-started/maica-key-concepts/appointment.md), as long as the selected [Participant(s)](../../../getting-started/maica-key-concepts/participant.md) have an [Agreement](../../../getting-started/maica-key-concepts/service-agreement.md) for all Services being added.

### 3. Resource(s) have a Roster Mode conflict

This alert will show in the instance where the selected Resource(s) have a Roster Mode conflict and hence cannot be allocated to the proposed Appointment. This error is also a restriction that **Maica** enforces where the user cannot continue to create an Appointment.

{% hint style="info" %}
`Roster Mode` in **Maica** is used to define the behaviour and validation applied when scheduling `Appointments` for a `Resource`. When selecting a `Roster Mode` for a `Resource`, there are two selectable options. These are:

* `Appointment`: This means Appointments can be scheduled at any time for a Resource provided it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments can be created at any time.
* `Shift`: This means Appointments can only be scheduled within a Shift that a Resource is part of and it is within any active Availability record(s) if these exist. If no Availability record(s) exist, Appointments still must fall within a Shift that the Resource is assigned to.
* `Dynamic`: The Resource can be assigned to both Shifts and standalone Appointments, subject to overlap and availability rules.
{% endhint %}

In order to resolve this alert, you **must** select Resource(s) that are set to a Roster Mode of `Appointment` or `Dynamic` during the time of the proposed Appointment, or, if they are set to `Shift`, the proposed Appointment must be scheduled during an active Shift for the allocated Resource(s).

You can set a Resource(s) Roster Mode on their [Resource Profile](../../../resources/resource-profile.md), [Availability Records](../../../resources/resource-profile.md), or by using a [Global Setting](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/rostering-management) in your Maica organisation for all Resource(s). To learn more, click the links.

{% hint style="info" %}
It is important to note that if a `Resource` has a `Roster Mode` set on their Resource Record that is different to the `Roster Mode` set for a specific `Availability` Record, the `Availability` Record Mode will take precedent during the `Availability` period.\
\
If No `Availability` Records are found and the `Roster Mode` is not set on the `Resource` Record: the `Roster Mode` for the `Resource` will be defined by the `Global Roster Mode` setting. This is configurable in the **Maica** [Rostering Management](https://knowledge.maica.com.au/maica-knowledge-base/v/maica-administration-guide/settings/rostering-management) settings.
{% endhint %}
