# Next Billing Date and Catch up Chains

The **Next Billing Date** on an Agreement Item is the cursor that tells the billing engine when the item is next due. Every run selects items whose Next Billing Date is on or before today. This article explains how the date is first set, how it advances, and how the catch-up chain clears a backlog of overdue periods in a single dispatch.

## How the Next Billing Date is first set

When an Agreement Item is created, Maica calculates its initial Next Billing Date from the item's start date, billing method, and service frequency. The value is always set on the server and is not user-editable, so it cannot be set incorrectly from the form.

The calculation follows these rules:

| Billing method | Frequency       | Initial Next Billing Date                        |
| -------------- | --------------- | ------------------------------------------------ |
| Any            | `One` (one-off) | The start date                                   |
| `In Advance`   | Any             | The start date                                   |
| `In Arrears`   | `Day`           | The start date                                   |
| `In Arrears`   | `Week`          | The start date plus 7 days                       |
| `In Arrears`   | `Month`         | The first day of the month after the start month |

For example, an in-arrears monthly item starting 15 May has an initial Next Billing Date of 1 June, because the first monthly period must elapse before it can be billed. An in-advance item bills from its start date because the upcoming period is charged upfront.

{% hint style="warning" %}
If the calculated Next Billing Date falls on or before today (for example a backdated start date), no special action is needed. The next scheduled run detects the item and works through every outstanding period automatically using the catch-up chain described below.
{% endhint %}

## How a billing period is derived

On each run, the engine derives the period to bill from the item's frequency. It uses the Next Billing Date as the seed (falling back to the start date for a brand-new item):

| Frequency | Period billed                                                                    |
| --------- | -------------------------------------------------------------------------------- |
| `Day`     | A single day                                                                     |
| `Week`    | The seed date through to six days later (a 7-day period)                         |
| `Month`   | The whole calendar month containing the seed, regardless of the day of the month |
| `One`     | A single period; the item bills once and then stops                              |

Monthly periods are aligned to the calendar month so consecutive months stay contiguous with no gaps or overlaps. Periods are then clamped to the item's start and end dates so billing never extends outside the agreement, and the engine refuses to re-bill any day on or before the **Last Billed Period End**.

{% hint style="info" %}
Leave can reduce the chargeable days within a derived period. Respite and Social leave suspend billing; Hospital, Transition, and Emergency leave do not. See [Fee Treatment During Leave](/broken/pages/7e2833b5906ff68097278ffa5d8e9b3920fc6168).
{% endhint %}

### The in-advance guardrail

When the billing method is `In Advance`, the engine will not bill more than one calendar month ahead of the run date. If a derived period would end beyond that horizon, the engine flags the breach, logs it, and skips the item rather than billing too far into the future.

## How the date advances

After an item is billed for a period, the engine stamps the **Last Billed Period End** and advances the **Next Billing Date** to the start of the next period. The next run picks up from there. This is what keeps each item moving forward one period at a time.

## The catch-up chain

A single scheduled run advances each due item by one period. On its own, that would mean a backdated item overdue by many periods could only ever catch up one period per day, never closing the gap. The catch-up chain solves this.

When a run finishes, the engine checks whether any items are still due. If they are, it immediately launches a fresh batch run rather than waiting for the next scheduled run. Each chained run is a new transaction with a full set of governor limits, and each one advances every still-due item by one more period. Chaining continues until no items remain due.

### Depth limit

To protect against runaway chaining, the chain stops after a maximum depth of **62** runs. At a chunk size of 20 items, a 62-deep chain can clear a backlog of around 1,240 overdue items in a single dispatch, and 62 daily periods covers roughly two months of catch-up, which is the largest realistic backdating scenario.

If the chain reaches the depth limit before the backlog is cleared, the engine logs a warning and stops. The remaining items are picked up on the next scheduled run and continue catching up from there.

{% hint style="warning" %}
Items in a `Failed` state are excluded from the catch-up count. This prevents a persistently failing item from consuming chain capacity and starving legitimately overdue items. If you see the depth-limit warning repeatedly, review Agreement Items that are overdue or failed for a configuration problem.
{% endhint %}

## Related articles

* [Billing Engine Architecture](/broken/pages/eb4c82d7ef134026f106b3ea0549260dac90b573)
* [Fee Type Processing Rules](/broken/pages/5037a7f02b6ddebf4821a864cd892b5d5de65d9a)
* [Fee Treatment During Leave](/broken/pages/7e2833b5906ff68097278ffa5d8e9b3920fc6168)
