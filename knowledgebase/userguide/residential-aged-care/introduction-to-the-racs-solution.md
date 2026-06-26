# Introduction to the RACs Solution

The Residential Aged Care Services (RACS) solution is the part of Maica that manages the financial and administrative side of running a residential aged care home. It looks after resident fees, accommodation deposits, the events and claims you exchange with Services Australia, and the data behind your compulsory reporting obligations.

This article introduces what the solution does, the records that make up a resident's file, and the kinds of users who work with it day to day. If you are new to the solution, start here and then move on to [Key Concepts and Terminology](key-concepts-and-terminology.md).

{% hint style="info" %}
The RACS solution covers **residential** aged care. Home Care Packages and Support at Home are handled by Maica's separate aged care agreement features and are not part of RACS.
{% endhint %}

## What the solution covers

The solution brings together the main areas of work involved in caring for a permanent or respite resident:

* **Fees and billing.** Configure the fees a resident pays and let the billing engine generate invoices automatically on a daily cycle.
* **Accommodation deposits.** Manage a resident's refundable deposit (RAD, RAC, or legacy bond) as a running ledger, separate from invoicing.
* **The resident lifecycle.** Record entry, respite, temporary leave, room moves, and departure, including death and refund handling.
* **Services Australia integration.** Submit care and supplement events, keep resident data in sync, and report accommodation balances.
* **Reconciliation.** Match the subsidy payments Services Australia makes against the invoices you have raised.
* **Reporting and compliance.** Produce the data that supports your obligations across the government reporting systems, including SIRS incident notifications and 24/7 registered nurse coverage.

{% hint style="success" %}
Permanent and respite residents are both supported. Respite residents follow most of the same workflows but are treated differently for accommodation costs, which they do not pay.
{% endhint %}

## The resident record structure

A resident's information is spread across a small set of connected records rather than held on a single record. Understanding how they relate makes the rest of the solution much easier to follow.

| Record                | What it represents                                                 | Role in the solution                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Funding**           | The resident's overall care and funding position with the provider | The source of truth for the resident's fee arrangement, accommodation arrangement, and the subsidy and supplement data synced from Services Australia |
| **Service Agreement** | The operational agreement covering the resident's stay             | Carries the fee items the billing engine reads, the link to the resident's room, and the link to their deposit account                                |
| **Accommodation**     | A room or bed within the home                                      | The physical place a resident is assigned to, with a configured capacity                                                                              |
| **Lump Sum Account**  | The resident's accommodation deposit                               | A financial ledger that tracks the deposit balance and every movement against it                                                                      |

The **Funding** record sits at the centre. Each Service Agreement is linked to a Funding record, and the resident's fee arrangement is held on Funding and read by the Service Agreement automatically. The Service Agreement in turn links to the resident's **Accommodation** (their room) and, where a deposit applies, to a **Lump Sum Account**.

{% hint style="info" %}
Because the fee arrangement lives on Funding and flows down to the Service Agreement, you never set it directly on the agreement. To learn how this works, see [Understanding Fee and Accommodation Arrangements](understanding-fee-and-accommodation-arrangements.md).
{% endhint %}

## Roles and who does what

The solution is used across several roles in a provider organisation. The table below describes the typical responsibilities of each. Actual access to features and fields is controlled by permission sets, which your administrator configures.

| Role                       | Typical responsibilities                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Intake and admin staff** | Admit residents, record respite stays, set up the resident's records, and process room moves and departures               |
| **Finance team**           | Configure fees, manage accommodation deposits, review invoices and adjustments, and reconcile Services Australia payments |
| **Care managers**          | Record temporary leave, manage incidents and SIRS notifications, and support compliance reporting                         |

{% hint style="info" %}
A single user may hold more than one of these roles. The grouping above is about the kinds of tasks involved, not a fixed division of duties.
{% endhint %}
