# Caps and Duration Settings

The **Regulatory Caps and Durations** section of the [RACS Configuration tab](./) holds the government-set limits that stop a resident from being charged more than the law allows for certain fees, plus the maximum periods over which those charges and retention deductions may apply. Update these values when the Department of Health, Disability and Ageing publishes revised caps or durations.

{% hint style="info" %}
These caps protect residents from over-charging. The billing engine reads them when it calculates fees and stops charging once a cap or duration is reached. The values here are global and apply to every resident.
{% endhint %}

## NCCC caps and duration

The Non-Clinical Care Contribution (NCCC) applies to residents under **1 November 2025** fee arrangements. Two settings limit it: a lifetime dollar cap and a maximum number of years it can be charged. Whichever limit is reached first stops further NCCC charges.

| Field                         | Type     | What it controls                                                                                                                                                                                                         | On-screen help text                                                                         |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| **RAC NCCC Lifetime Cap**     | Currency | The maximum total NCCC a single resident can be charged across their entire time in residential aged care. Applies to 1 November 2025 fee arrangements.                                                                  | Government-set lifetime cap for NCCC charges. Update when the published cap amount changes. |
| **RAC NCCC Duration (Years)** | Number   | The maximum number of years a resident can be charged NCCC, measured from the date they first started paying it. Once this period elapses, no further NCCC may be charged even if the lifetime cap has not been reached. | Maximum years NCCC can be charged. Currently 4 years from first NCCC charge date.           |

{% hint style="warning" %}
The NCCC duration is measured from the resident's first NCCC charge date, not from their entry date or a calendar year. It is currently legislated at 4 years.
{% endhint %}

## MTCF caps

The Means Tested Care Fee (MTCF) applies to residents under **1 July 2014** fee arrangements. It is limited by both an annual cap and a lifetime cap.

| Field                     | Type     | What it controls                                                                                                                                    | On-screen help text                                                                               |
| ------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **RAC MTCF Lifetime Cap** | Currency | The maximum total MTCF a single resident can be charged across their entire time in residential aged care. Applies to 1 July 2014 fee arrangements. | Government-set lifetime cap for MTCF charges. Applies to 1 July 2014 fee arrangements.            |
| **RAC MTCF Annual Cap**   | Currency | The maximum MTCF a resident can be charged within one cap year. Applies to 1 July 2014 fee arrangements.                                            | Government-set annual cap for MTCF charges per cap year. Applies to 1 July 2014 fee arrangements. |

{% hint style="warning" %}
A **cap year** is the 12-month period that begins on the anniversary of the resident's first entry to aged care. It resets on each resident's own entry anniversary, not on 1 July. Because the window is per-resident, two residents can have annual caps that reset on different dates.
{% endhint %}

## Retention duration

Retention is the amount a provider may deduct from a resident's RAD or RAC lump sum over time. The retention duration sets how long those deductions may continue.

| Field                              | Type   | What it controls                                                                                                                                                                                                               | On-screen help text                                                                            |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **RAC Retention Duration (Years)** | Number | The maximum number of years over which retention may be deducted from a resident's lump sum, measured from the date of their first lump sum payment. The billing engine stops retention deductions once this duration elapses. | Maximum years retention can be deducted from a lump sum. Currently 5 years from first payment. |

{% hint style="info" %}
This value is used to calculate the Retention Expiry Date on each Lump Sum Account. It is currently legislated at 5 years from the first payment. For how retention is applied, see [Retention and Drawdown Logic](../the-lump-sum-account-model/retention-and-drawdown-logic.md).
{% endhint %}
