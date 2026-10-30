---
description: >-
  Learn about the regulatory caps, durations and retention rate on the RACS
  Configuration tab
---

# Caps and Duration Settings

The **Regulatory Caps and Durations** section of the [RACS Configuration tab](/broken/pages/0ae4e45ff9f83e2a3a240a31c2b87a029130a33f) holds the government-set limits that stop a resident from being charged more than the law allows for certain fees, plus the maximum periods over which those charges and retention deductions may apply, and the retention rate. Update these values when the Department of Health, Disability and Ageing publishes revised caps, durations or rates.

{% hint style="info" %}
These caps protect residents from over-charging. The billing engine reads them when it calculates fees and stops charging once a cap or duration is reached. The values here are global and apply to every resident.
{% endhint %}

{% hint style="warning" %}
NCCC and MTCF items are billed only while all three caps (the NCCC lifetime cap and the MTCF annual and lifetime caps) are set. While any of them is blank or zero, those items are held back and not billed, and each logs one error per billing run. Indexation, the financial year reset and lump sum retention also stop with a message naming what is missing.
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

## Retention duration and rate

Retention is the amount a provider may deduct from a resident's RAD or RAC lump sum over time. The retention duration sets how long those deductions may continue, and the retention rate sets the annual percentage deducted under the Post 1 November 2025 arrangement.

| Field                              | Type    | What it controls                                                                                                                                                                                                                                                                                                                                                             | On-screen help text                                                                                                                                                   |
| ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RAC Retention Duration (Years)** | Number  | The maximum number of years over which retention may be deducted from a resident's lump sum, measured from the date of their first lump sum payment. The billing engine stops retention deductions once this duration elapses.                                                                                                                                               | Maximum years retention can be deducted from a lump sum. Currently 5 years from first payment.                                                                        |
| **RAC Retention Rate**             | Percent | The legislated annual retention rate deducted from a resident's RAD or RAC lump sum under the Post 1 November 2025 arrangement, entered as a whole percent, for example 2 for 2% per annum. Set Up Lump Sum Account and Add Fee Item use it to set the rate of the Retention item, stored on the item as the annual decimal (2% is stored as 0.02). It has no default value. | Legislated annual RAD/RAC retention rate as a whole percent, for example 2%. Required before Set Up Lump Sum Account can create Post 1 November 2025 retention items. |

{% hint style="info" %}
The retention duration is used to calculate the Retention Expiry Date on each Lump Sum Account. It is currently legislated at 5 years from the first payment. For how retention is applied, see [Retention and Drawdown Logic](/broken/pages/bcafc15aa4f4efe6509bbf894d03d5767ec80f79).
{% endhint %}

{% hint style="warning" %}
Post 1 November 2025 retention items cannot be created while the **RAC Retention Rate** is blank. Editing an existing Post 1 November 2025 retention item keeps its rate, so a later change to the setting does not alter items already created.
{% endhint %}
