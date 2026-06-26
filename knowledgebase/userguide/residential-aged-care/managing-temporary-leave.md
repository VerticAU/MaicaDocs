# Managing Temporary Leave

Temporary leave is when a permanent resident temporarily stops receiving care while their place is held for them. Leave does not affect a resident's right to their place, but depending on the type and length of leave it can affect the subsidy the government pays and the fees the resident is charged.

This article covers the leave types, how to record a leave period, how each leave type affects fees, and how leave balances work.

{% hint style="info" %}
Temporary leave applies to permanent residents. Respite residents are not covered by the leave provisions. Absences during a respite stay are handled by agreement, as described in [Managing Residential Respite Care](managing-residential-respite-care.md).
{% endhint %}

## Leave types

Maica supports the leave types recognised by Services Australia.

| Leave type          | Key entitlement                                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Social**          | 52 days per financial year. The resident must stay overnight elsewhere.                                                         |
| **Hospital**        | Unlimited days.                                                                                                                 |
| **Transition Care** | For a resident moving into transition care after a hospital stay.                                                               |
| **Emergency**       | Declared by the Australian Government during a significant event such as a disaster or pandemic. Does not consume social leave. |

## Recording a leave period

You record leave from the resident's record using the leave action.

1. Open the leave action on the resident's record.
2. Choose the leave type and enter the start date, and the end date if it is known.
3. Submit. Maica records the leave period and submits a Leave Event to Services Australia.

{% hint style="info" %}
The leave start date is inclusive for payment. The end date is not inclusive. If the resident is still on leave, you can record the leave without an end date and add it when they return.
{% endhint %}

## Fee treatment during leave

How leave affects fees depends on the leave type. The billing engine reads the leave period and applies the right treatment automatically, with one exception noted below.

| Leave type          | Fee treatment                                                                                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Social**          | Fees and accommodation costs continue. The government pays the subsidy up to the 52-day annual limit. Beyond 52 days, the government stops paying the subsidy for the extra days. |
| **Hospital**        | Fees and accommodation costs continue. From day 29, the government stops paying the variable part of the subsidy, which can reduce the resident's means tested care fee.          |
| **Transition Care** | All fees and accommodation costs continue unchanged.                                                                                                                              |
| **Emergency**       | Fees and accommodation costs continue. Emergency leave does not consume social leave days.                                                                                        |

{% hint style="warning" %}
The day 29 hospital leave reduction is not applied automatically. The billing engine continues to bill the means tested care fee at the configured rate. Monitoring hospital stays that reach 28 days and adjusting the resident's fee where appropriate is a provider responsibility. Adjust the rate on the Fees tab if a reduction applies.
{% endhint %}

## Leave balances

Some leave types consume an annual balance and some do not.

| Leave type          | Consumes a balance?                          |
| ------------------- | -------------------------------------------- |
| **Social**          | Yes, consumes the social leave allocation    |
| **Transition Care** | Yes, consumes the transition care allocation |
| **Hospital**        | No                                           |
| **Emergency**       | No                                           |

Leave balances are synced from Services Australia, reset on 1 July each year, and transfer with the resident if they change providers.
