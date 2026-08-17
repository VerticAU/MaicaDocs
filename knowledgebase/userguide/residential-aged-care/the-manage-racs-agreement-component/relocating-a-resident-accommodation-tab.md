# Relocating a Resident Accommodation tab

The **Accommodation** tab processes a permanent room move for a resident within the same home, through the **Relocate Resident** sub-workflow. A room move can have several financial consequences, such as a change to the agreed room price or a refund of part of the deposit, so Maica handles all of the updates together as a single step. They all succeed or they all roll back, leaving no half-finished state on the record.

## When to use a room move

Use the Relocate Resident workflow for **permanent moves within the same home**.

| Situation                                            | Use Relocate Resident?                                                  |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Permanent move to a different room in the same home  | Yes                                                                     |
| Permanent transfer to a different home               | No. Use the departure and re-entry process.                             |
| Temporary move, for example while a room is repaired | No. This is handled separately and is not a permanent agreement change. |

## The workflow at a glance

The Accommodation tab first shows the resident's current room, its listed price, the current agreed price, and the ward type if the room is an extra service room. Selecting Relocate Resident steps you through the move.

1. **Select the new room.** Choose the destination from a list of rooms in the same home. The current room is excluded, and rooms that are already full for the dates of this agreement are not offered. See [Which rooms are offered](relocating-a-resident-accommodation-tab.md#which-rooms-are-offered).
2. **Set the new agreed price.** The price defaults to the new room's listed price. You can set it lower by negotiation, but not higher. You also set the effective date and a move reason.
3. **Review the financial impact.** Maica shows what will change, including any refund due and any recalculated daily payment, based on the price difference.
4. **Confirm and process.** You confirm the move, and Maica applies all the updates together.

## Which rooms are offered

Both **Relocate Resident** and **Add Accommodation** offer only rooms with capacity left for the dates of the agreement you are working on. A room is withheld when the number of residents holding it over those dates has reached its capacity.

The agreement being edited never counts against itself, so relocating a resident does not see their own current room as occupied.

### What holds a room and what releases it

| State of an agreement holding the room | Room held?                                                            |
| -------------------------------------- | --------------------------------------------------------------------- |
| Active                                 | Held                                                                  |
| Draft                                  | **Held.** A draft is a provisional booking and still reserves the bed |
| Resident on leave                      | **Held.** A bed is retained for a resident on leave                   |
| Discharged                             | Released                                                              |
| Cancelled                              | Released                                                              |

{% hint style="info" %}
A room whose only occupant has been discharged is offered again straight away. There is no separate step to free the bed.
{% endhint %}

### How the dates are compared

A room is only counted as occupied where the existing stay and the dates of your agreement actually overlap. An agreement with no end date is treated as running indefinitely.

The comparison is inclusive at both ends, so a stay that ends on the very day your agreement starts still counts as an overlap and the room is not offered. A stay that ended the day before does not, and the room is available.

{% hint style="info" %}
Capacity is per room, not per bed occupied. A room with capacity for two residents and only one current occupant is still offered.
{% endhint %}

{% hint style="warning" %}
**A Service Agreement with no Start Date is offered no rooms at all.** Add Accommodation reports that the Start Date must be set before accommodation can be added, and hides the room lookup rather than showing an empty list. This is deliberate: the capacity check that runs on save skips any agreement without a start date, so offering rooms here would let a dateless agreement take a bed with nothing downstream to stop it. Set the Start Date on the Service Agreement first.
{% endhint %}

{% hint style="warning" %}
Add Accommodation also requires the agreement's Funding record to have a **Location** set, since the room list is drawn from the rooms at that location. Where it is missing, the same block applies and the message names the Funding record. Only one message shows at a time, and the Location one takes precedence.
{% endhint %}

## Charging for the new room

The new agreed price becomes the price for the resident's accommodation from the effective date. Maica updates the agreed room price on both the Service Agreement and, where one exists, the lump sum account. For a resident on the Combination method, the daily accommodation payment is recalculated against the new room price, and you are prompted to update the payment item on the Fees tab.

## Excess RAD/RAC refunds on a downgrade

When the new room is cheaper and the resident's deposit balance is more than the new agreed price, the difference must be refunded.

```
Refund Amount = Current Lump Sum Balance - New Agreed Room Price
```

For example, a resident with a balance of $495,000 who moves to a room with an agreed price of $400,000 is owed a refund of $95,000. The remaining $400,000 stays on the account as the balance against the new room.

{% hint style="info" %}
The refund due date for a room downgrade defaults to the effective date of the move plus 14 days. You can override this date in the workflow if needed.
{% endhint %}

## Upgrades and updating the accommodation agreement

When the new room is more expensive, no refund arises. Before the higher price can take effect, you must have the resident's or their representative's written consent to the updated accommodation agreement. Maica enforces a confirmation step so the move cannot be processed until you confirm consent has been obtained.

## Extra service rooms

Most room moves are entirely internal and are not reported to Services Australia. A move that involves an **extra service room** is different.

{% hint style="info" %}
When a move takes a resident into or out of an extra service room, Maica notifies Services Australia through the Extra Service Event as part of the move. This notification is non-blocking: if it fails, the room move in Maica still completes and you are prompted to retry the notification separately. Moves between standard rooms are not reported to Services Australia.
{% endhint %}
