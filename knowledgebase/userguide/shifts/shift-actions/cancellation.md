---
description: Learn about Cancelling a Shift
---

# Cancellation

## What does cancelling a Shift involve?

When [Shifts](../../getting-started/maica-key-concepts/shift.md) are cancelled, **Maica** will mark the [Shift](../../getting-started/maica-key-concepts/shift.md) as `Cancelled` rather than simply deleting the [Shift](../../getting-started/maica-key-concepts/shift.md) and associated information.

**Maica** supports two scenarios in which Shifts can be cancelled, including:

1. **Single Shifts:** They are cancelled by simply setting the Shift `Status` to cancelled. _**Shifts are not deleted.**_
2. **Recurring** **Shifts:** They are cancelled for either only the specific Shift being managed or for any future Shift part of the [Recurring Schedule](../create-a-shift/schedule.md). **Maica** will display the following option when a Recurring Shift is attempted to be cancelled. _**Shifts are not deleted**._

<figure><img src="../../.gitbook/assets/Screenshot 2024-08-06 at 1.39.48 pm.png" alt="" width="466"><figcaption></figcaption></figure>

{% hint style="info" %}
If you select to cancel the selected **Shift** only, then Maica will remove this **Shift** from the Recurring Schedule and effectively turn this **Shift** into a single **Shift** with all changes reflected.
{% endhint %}

## Cancellation Reason&#x20;

When cancelling an Shift, Maica asks for a `Cancellation Reason`. If a `Cancellation Reason` is selected, **Maica** requires a `Cancellation Date`.&#x20;

{% hint style="info" %}
To learn more about how Maica validates the parameters of an Shift cancellation, click [here](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/data/data-objects/appointment#cancellation-date-required-when-cancellation-reason-is-set).&#x20;
{% endhint %}
