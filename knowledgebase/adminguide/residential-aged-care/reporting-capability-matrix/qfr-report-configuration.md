# QFR Report Configuration

The Quarterly Financial Report (QFR) is submitted four times a year through GPMS. Of its five components, Maica holds the data for two: bed occupancy and leave utilisation. Maica provides this data through standard reports that providers use to read off the figures for manual entry into GPMS. The reports do not submit to GPMS; they remove the need to assemble the figures from separate systems.

This article explains how the two reports are configured and where their data comes from. It is written for administrators who set up reporting.

{% hint style="info" %}
For the full set of reporting obligations and which ones Maica supports, see [Reporting capability matrix](./).
{% endhint %}

## Occupancy report

The occupancy report shows operational beds against occupied bed days for a quarter, so the provider can report bed occupancy. It is a cross-object report built on the Claim Batch together with resident funding and entry data.

### Source data

* **Claim Batch** provides the Services Australia confirmed operational bed count for each service and claim month.
* **Funding and aged care entry data** establish which beds were occupied on each day of the quarter, using resident entry and departure dates.

### Report fields

| Report field               | Source or calculation                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Service name**           | The service provider account on the Claim Batch                                                         |
| **Quarter**                | The claim period, grouped into three-month quarters                                                     |
| **Total operational beds** | The Services Australia confirmed operational bed count, averaged across the quarter                     |
| **Occupied bed days**      | The count of days each resident occupied a bed, between entry and departure (or the end of the quarter) |
| **Unoccupied bed days**    | Operational beds multiplied by days in the quarter, less occupied bed days                              |
| **Occupancy rate**         | Occupied bed days as a percentage of operational beds multiplied by days in the quarter                 |

The report is built as a standard cross-object report. No custom development is required beyond configuring the report.

## Leave utilisation report

The leave utilisation report summarises approved leave by type for a quarter, matching the leave data the QFR requires.

### Source data

The report is built on the **Service Agreement Leave** records, which capture each approved leave episode by type with its start and end dates.

### Report fields

| Report field                        | Source                                                |
| ----------------------------------- | ----------------------------------------------------- |
| **Service**                         | The service provider account on the service agreement |
| **Quarter**                         | The leave start date, grouped into quarters           |
| **Social leave days used**          | Days where the leave type is social                   |
| **Hospital leave days used**        | Days where the leave type is hospital                 |
| **Transition care leave days used** | Days where the leave type is transition care          |
| **Emergency leave days used**       | Days where the leave type is emergency                |
| **Total leave days**                | The sum across all claimable leave types              |

The report is built as a standard report grouped by leave type and quarter. No custom development is required.

{% hint style="warning" %}
These reports support manual GPMS entry. They do not submit to GPMS, and the provider remains responsible for transcribing the figures into the portal within the QFR deadline.
{% endhint %}
