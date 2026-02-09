---
description: Learn about Service Agreements and how to create them in Maica
---

# Agreement Management

## What is a Service Agreement?&#x20;

A Service Agreement is the financial construct under which a [Participant](../../getting-started/maica-key-concepts/participant.md) receives services. This includes the ability to set up funding structures compliant with the NDIS, Aged Care and other funding arrangements such as CHSP. Service Agreement's capture information such as [Support Items](../../getting-started/maica-key-concepts/support-item.md), [Price Lists](../../getting-started/maica-key-concepts/price-list.md) as well as key dates during which the Service Agreement is valid. The purpose of Service Agreements is to ensure that services are not delivered without verified funding.&#x20;

## How do I create a Service Agreement?&#x20;

A quick and efficient way to create a [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) is directly through a Participant Record. Within a Participant Record, simply navigate to the `Budget Management` tab, scroll down to the Service Agreements, and click `New`. &#x20;

{% hint style="info" %}
Service Agreements are a one-to-many record within **Maica**, meaning, that each Participant can have many Service Agreements active at any given time.&#x20;
{% endhint %}

Once you have clicked the `New` button, you will be presented with a pop-up to begin populating the Basic Details of your Service Agreement record. At this stage you should fill in all mandatory and recommended fields before clicking `Save` to create your Service Agreement record.&#x20;

{% hint style="info" %}
Service Agreements are mainly populated through Quick Actions within the Agreement that become available once your record has been created and saved. These Quick Actions are dependent on the selected Funding Type. To learn more about NDIS supported Service Agreements, click [here](ndis-agreements/), and to learn more about Aged Care supported Service Agreements, click [here](aged-care-agreements/).&#x20;
{% endhint %}

## Service Agreement Statuses

Whilst working with Service Agreement(s), you will notice a `Status` field at within the Information tab on the left of the page, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/service agreement status.png" alt="" width="375"><figcaption></figcaption></figure>

The `Status` of a [Service Agreement](../../getting-started/maica-key-concepts/service-agreement.md) in **Maica** represents the current state or condition of that Agreement. In **Maica**, the `Status` is adjusted dynamically depending on a range of factors and automation that is explained in further detail [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/service-agreement#flows).&#x20;

Please refer to the table below for more detailed description of all the `Statuses`:

| Status        | Description                                                                                                                                                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Active`      | The Service Agreement is currently in effect, and Services are being delivered under the terms outlined in the agreement and within the specified dates. This is the **default** `Status`.                                                                                                                                                          |
| `Draft`       | In effect when the `Daft Service Agreement` checkbox is ticked. This is a manually configured status that could be used whilst the Agreement is being finalised or you are building out the [Budget](aged-care-agreements/manage-budget.md).                                                                                                        |
| `On Leave`    | In effect once a Leave event has been set up against the Service Agreement. **Maica** will automatically update the `Status` when the `Leave` date overlaps the `Current` date. Please refer to the [below](./#service-agreement-leave) section to see how to set up Leave within a Service Agreement.                                              |
| `Discharged`  | <p>In effect after you have <a href="aged-care-agreements/discharge-services.md">Discharged</a> the Service Agreement. Once <code>Discharged</code>, Maica will automatically generate a <code>Discharge Statement</code> and update the <code>Status</code>. <br><br>This is <strong>only</strong> relevant for Aged Care Service Agreements. </p> |

## Service Agreement Leave

{% hint style="info" %}
As mentioned above, the `Status` in **Maica** is usually changed dynamically, this applies to the `Leave Status`. To learn more about the automation behind this function, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/service-agreement-leave#flows).&#x20;
{% endhint %}

The Service Agreement Leave component provides the ability to be able to place a Service Agreement on leave according to the four types of leave that are configurable and acceptable according to the Government Legislation.

In order to set up Leave within a Service Agreement, scroll to the `Service Agreement Leave` section on the right hand side of your interface and click `New`, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/service agreement leave.png" alt="" width="563"><figcaption></figcaption></figure>

After the `New` button has been clicked, you will be presented with a pop-up to populate your Leave. At this stage you should fill in all mandatory and recommended fields before clicking `Save` to create your Service Agreement Leave record. &#x20;

{% hint style="info" %}
You can queue Leave records and future date them, and the Automation in **Maica** will handle them and update the `Status` as needed.
{% endhint %}
