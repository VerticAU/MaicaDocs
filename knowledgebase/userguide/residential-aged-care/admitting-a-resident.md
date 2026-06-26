# Admitting a Resident

Admitting a resident registers their entry into residential aged care, both in Maica and with Services Australia. The entry is the foundation of the resident's care lifecycle: every later event, such as a supplement, a leave period, or a departure, references the care period that the entry establishes.

This article covers the difference between a permanent and a respite entry, how to record the entry in Maica, and how it is submitted to Services Australia.

## Permanent versus respite entry

There are two types of entry, and you choose the type when you record the entry.

| Entry type    | What it is                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| **Permanent** | Ongoing residential care. The entry opens a care period that continues until the resident departs.        |
| **Respite**   | A planned short stay. The entry includes a planned departure date, though that date can be updated later. |

{% hint style="info" %}
The entry date is inclusive for payment, which means government subsidy begins on the entry date itself. Respite care has its own fee and balance rules, covered in [Managing Residential Respite Care](/broken/pages/677832a8fc3e620af17d9c1abcd2b8635153fff6).
{% endhint %}

## Recording the entry in Maica

You record an entry from the resident's Funding record using the **Submit Entry Event** action.

1. Open the resident's **Funding** record.
2. Select the **Submit Entry Event** action.
3. Complete the entry details in the modal, then submit.

Before the action runs, Maica checks a few conditions and blocks the submission with a clear message if any fail.

| Check                                           | Why                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| The Funding record is for Residential Aged Care | The entry event applies only to residential aged care                                        |
| The linked Contact has a Care Recipient ID      | Services Australia needs the resident's identifier                                           |
| No entry is already in progress                 | Prevents a duplicate submission while one is still being processed                           |
| No active care period already exists            | A new entry cannot be submitted while the resident is already in active care at this service |

## Submitting the entry to Services Australia

What happens next depends on whether this is a new admission or a re-admission.

For a **new admission** to your service, Maica first performs a care recipient search with Services Australia to confirm the resident's identity and obtain a temporary access key needed for the submission. You review the pre-filled search details, correct them if needed, and run the search. For a **re-admission**, the search step is skipped and you go straight to the entry details.

Maica then submits the entry, including the resident's care recipient ID, your service identifier, the entry date and type, the accommodation payment type, pensioner status, and whether the resident is opting in to the newer means testing arrangements.

{% hint style="info" %}
Services Australia responds with an event identifier and a status. Maica records these on an Aged Care Event linked to the resident. If the status comes back as **Held**, meaning Services Australia needs to do something before it is finalised, Maica keeps checking until it resolves to **Accepted** or **Rejected**.
{% endhint %}

For more on how event statuses work and what to do with a held or rejected event, see the Working with Services Australia section of the guide.

## Related articles

* [Managing Residential Respite Care](/broken/pages/677832a8fc3e620af17d9c1abcd2b8635153fff6)
* [Understanding Fee and Accommodation Arrangements](/broken/pages/2bcc18eafba856acca0c5471e1fbbc091d342119)
* [Configuring Resident Fees (Fees Tab)](/broken/pages/6ddadeca1e3317eaccb22e9a9defeb085555a028)
