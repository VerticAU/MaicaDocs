# Understanding Fee and Accommodation Arrangements

Every resident is placed in a fee arrangement and an accommodation arrangement. These arrangements decide which fees a resident can be charged, which caps apply, and which indexation rules are used. Getting the arrangement right is the foundation for correct billing, so it is worth understanding before you configure any fees.

This article explains the three regimes, the difference between a fee arrangement and an accommodation arrangement, how Maica stores the arrangement, and how a resident moves to a newer arrangement by opting in.

## The three fee arrangement regimes

Residential aged care billing in Australia operates under three fee arrangement regimes. A resident is in exactly one of them, based on when they first entered permanent residential care and whether they have opted in to a newer arrangement.

| Regime                   | Who it applies to                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Pre-1 July 2014**      | Residents who entered care before 1 July 2014 and have not opted in to a newer arrangement                        |
| **1 July 2014**          | Residents who entered care between 1 July 2014 and 31 October 2025 inclusive, or who entered earlier and opted in |
| **Post 1 November 2025** | Residents entering care from 1 November 2025, or residents on an earlier arrangement who have formally opted in   |

The regime determines which fee types are available to configure. For example, a resident on the Post 1 November 2025 arrangement may pay a Hotelling Contribution and a Non-Clinical Care Contribution, while a resident on the 1 July 2014 arrangement pays a Means Tested Care Fee instead.

{% hint style="info" %}
A resident's fee arrangement is determined by their **first-ever** entry into permanent residential care, not their most recent entry date. Arrangements are grandfathered when a resident transfers between providers, so a Pre-1 July 2014 resident moving to a new provider keeps their Pre-1 July 2014 arrangement.
{% endhint %}

## Fee arrangement versus accommodation arrangement

A resident has both a fee arrangement and an accommodation arrangement, and the two do not have to match. The fee arrangement governs care and daily living fees. The accommodation arrangement governs how the resident pays for their room and whether retention and DAP indexation apply.

The two can differ. For example, a resident on the 1 July 2014 fee arrangement may be on the Post 1 November 2025 accommodation arrangement if they entered residential care for the first time after 31 October 2025, or re-entered after a break in care of more than 28 days from that date.

The table below shows how common scenarios resolve.

| Scenario                                          | Fee arrangement      | Accommodation arrangement                         |
| ------------------------------------------------- | -------------------- | ------------------------------------------------- |
| Entered before 1 July 2014, no opt-in             | Pre-1 July 2014      | Pre-1 July 2014                                   |
| Entered 1 July 2014 to 31 October 2025, no opt-in | 1 July 2014          | 1 July 2014                                       |
| New entrant from 1 November 2025                  | Post 1 November 2025 | 1 November 2025                                   |
| Existing resident opts in from 1 November 2025    | Post 1 November 2025 | May change to 1 November 2025 depending on timing |

{% hint style="warning" %}
Do not assume a resident's two arrangements are the same. Confirm each from the resident's care history and the Services Australia fee advice. Setting the wrong arrangement leads the billing engine to offer the wrong fee types.
{% endhint %}

{% hint style="info" %}
Respite residents do not pay accommodation costs, so the accommodation arrangement does not drive any accommodation charges for them. The government pays a respite accommodation supplement instead.
{% endhint %}

## How the arrangement is set and stored

The fee arrangement is held on the resident's **Funding** record. This is the single source of truth. Every Service Agreement linked to that Funding record reads the arrangement automatically through a read-only formula field, so you never set it on the Service Agreement directly.

This design means that if the arrangement ever changes, every linked Service Agreement reflects the new value immediately, with no manual record updates.

{% hint style="info" %}
For administrators: the fee arrangement is stored in `maica_cc__Fee_Arrangement__c` on Funding, with the picklist values **Pre-1 July 2014**, **1 July 2014**, and **Post 1 November 2025**. The Service Agreement field of the same name is a read-only formula that reads the value from the parent Funding record.
{% endhint %}

The arrangement is set at intake, based on the resident's entry history and the Services Australia fee advice. It is not derived automatically from the entry date, because the entry date alone does not capture grandfathering or prior care. The provider confirms the correct arrangement when setting up the resident.

## Opting in to newer arrangements

A resident on an earlier arrangement may choose to move to the Post 1 November 2025 arrangement by opting in. Opting in is a formal election the resident makes with Services Australia.

When the opt-in is confirmed, Maica updates the fee arrangement on the resident's Funding record to **Post 1 November 2025** automatically. Because every linked Service Agreement reads the arrangement from Funding, they all reflect the change straight away.

{% hint style="warning" %}
From 1 November 2025, a resident's fee arrangement changes **only** by an active opt-in. It never changes because of a break in care. This is different from accommodation arrangements, which can change based on entry timing.
{% endhint %}

The opt-in itself is submitted to Services Australia as an event. To learn how that submission works, see the Services Australia section of the guide, specifically the article on recording a means testing opt-in.

## Where to go next

* [Key Concepts and Terminology](/broken/pages/50a5a6afb7f4185c3c305e16f06ea60fbc860af7) - definitions for the fee types referenced above.
* [Introduction to the RACS Solution](/broken/pages/1f62d4df30d703fd4443fdd37bef8a70ebada71a) - how the Funding and Service Agreement records relate.
