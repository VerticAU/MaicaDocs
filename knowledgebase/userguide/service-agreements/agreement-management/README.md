---
description: Learn about Service Agreements and how to create them in Maica
---

# Agreement Management

## What is a Service Agreement?

A Service Agreement is the financial construct under which a Participant receives services. This includes the ability to set up funding structures compliant with the NDIS, Aged Care and other funding arrangements such as CHSP. Service Agreement's capture information such as Support Items, Price Lists as well as key dates during which the Service Agreement is valid. The purpose of Service Agreements is to ensure that services are not delivered without verified funding.

## How do I create a Service Agreement?

A quick and efficient way to create a Service Agreement is directly through a Participant Record. Within a Participant Record, simply navigate to the `Budget Management` tab, scroll down to the Service Agreements, and click `New`.

{% hint style="info" %}
Service Agreements are a one-to-many record within **Maica**, meaning, that each Participant can have many Service Agreements active at any given time.
{% endhint %}

Once you have clicked the `New` button, you will be presented with a pop-up to begin populating the Basic Details of your Service Agreement record. At this stage you should fill in all mandatory and recommended fields before clicking `Save` to create your Service Agreement record.

{% hint style="info" %}
Service Agreements are mainly populated through Quick Actions within the Agreement that become available once your record has been created and saved. These Quick Actions are dependent on the selected Funding Type. To learn more about NDIS supported Service Agreements, click [here](ndis-agreements/), and to learn more about Aged Care supported Service Agreements, click [here](aged-care-agreements/).
{% endhint %}

## Service Agreement Statuses

Whilst working with Service Agreement(s), you will notice a `Status` field at within the Information tab on the left of the page, as shown below.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FTsO7hsyeNRB1w4C36Tng%2Fservice%20agreement%20status.png?alt=media&#x26;token=af124f7c-c150-4e28-8d5d-92e61892d079" alt="" width="375"><figcaption></figcaption></figure>

The `Status` of a Service Agreement in **Maica** represents the current state or condition of that Agreement. In **Maica**, the `Status` is adjusted dynamically depending on a range of factors and automation.

Please refer to the table below for more detailed description of all the `Statuses`:

| Status       | Description                                                                                                                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Active`     | The Service Agreement is currently in effect, and Services are being delivered under the terms outlined in the agreement and within the specified dates. This is the **default** `Status`.                                                                                                                                                        |
| `Draft`      | In effect when the `Daft Service Agreement` checkbox is ticked. This is a manually configured status that could be used whilst the Agreement is being finalised or you are building out the [Budget](aged-care-agreements/manage-budget.md).                                                                                                      |
| `On Leave`   | In effect once a Leave event has been set up against the Service Agreement. **Maica** will automatically update the `Status` when the `Leave` date overlaps the `Current` date. Please refer to the [below](./#service-agreement-leave) section to see how to set up Leave within a Service Agreement.                                            |
| `Discharged` | <p>In effect after you have <a href="aged-care-agreements/discharge-services.md">Discharged</a> the Service Agreement. Once <code>Discharged</code>, Maica will automatically generate a <code>Discharge Statement</code> and update the <code>Status</code>.<br><br>This is <strong>only</strong> relevant for Aged Care Service Agreements.</p> |

## Service Agreement Leave

The Service Agreement Leave component provides the ability to be able to place a Service Agreement on leave according to the four types of leave that are configurable and acceptable according to the Government Legislation.

In order to set up Leave within a Service Agreement, scroll to the `Service Agreement Leave` section on the right hand side of your interface and click `New`, as shown below.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FkwWsfhwyYwlK9iavAhJh%2Fservice%20agreement%20leave.png?alt=media&#x26;token=862f783e-57ec-4b13-93ac-9072116e0832" alt="" width="563"><figcaption></figcaption></figure>

After the `New` button has been clicked, you will be presented with a pop-up to populate your Leave. At this stage you should fill in all mandatory and recommended fields before clicking `Save` to create your Service Agreement Leave record.

{% hint style="info" %}
You can queue Leave records and future date them, and the Automation in **Maica** will handle them and update the `Status` as needed.
{% endhint %}

### What happens to Appointments during Leave

When you save a Leave record, **Maica** cancels the Delivery Activities for that Participant across the Leave period. What then happens to the Appointment itself depends on who else is attending.

| Appointment type                                                                 | What happens                                                                                                                  |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **One-to-one**, where the Participant on Leave is the only Participant attending | The Appointment is set to `Cancelled`, its Cancellation Date is recorded, and every Resource on it is set to `Withdrawn`.     |
| **Group**, where other Participants are also attending                           | The Appointment remains scheduled for the other Participants. Only the Leave Participant's Delivery Activities are cancelled. |

{% hint style="success" %}
Because the Resources are `Withdrawn`, the Support Worker's allocated hours reduce and they become available for other work in that time slot straight away. There is no need to open each Appointment to release them.
{% endhint %}

An Appointment is treated as one-to-one based on the Participants **still attending** it. If a second Participant was removed from an Appointment earlier, that Appointment is correctly recognised as one-to-one.

{% hint style="info" %}
Shifts behave in the same way as Appointments.
{% endhint %}

#### Appointments that are left unchanged

Some Appointments are deliberately left exactly as they are, so that work already recorded against them is never lost. An Appointment is skipped where either of the following applies:

* An **Actual Start** time has already been recorded against it.
* Its `Status` is `Cancelled`, `In Progress`, `Completed` or `Under Review`.

{% hint style="warning" %}
Where a Participant goes on Leave across a period in which Appointments have already started or been completed, review those Appointments yourself. **Maica** will not alter them.
{% endhint %}
