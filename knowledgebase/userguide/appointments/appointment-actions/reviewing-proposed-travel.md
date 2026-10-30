# Reviewing Proposed Travel

## What is proposed travel?

When your organisation uses **Sequential** travel, Maica calculates the travel to each Appointment from the one before it. Those values are predictions. Real travel can differ because of traffic, detours or client delays, so care workers can **propose** corrected travel at checkout. A Coordinator then decides whether Maica uses the predicted or the proposed values for billing, pay and timesheets.

This article is for care workers who propose travel and for Coordinators who review it. To learn how Sequential travel links Appointments, see **Location** in the User Guide.

{% hint style="info" %}
Proposals apply only where the Travel Mechanism is **Sequential**. Where care workers are not given the Manage Travel permission, they make no proposals and no Appointment goes Under Review for travel.
{% endhint %}

## Proposing travel at checkout

On the **Check-Out Summary** in the Maica Mobile App, select **Manage Travel**. Under Sequential travel:

* **To Appointment** can be edited. This is the travel from the Appointment before it.
* **From Appointment** is locked, because only travel to an Appointment is recorded.
* The first Appointment in a sequence, including an Appointment with none before or after it, has both legs locked. Travel to the first Appointment in a sequence is not paid or charged, so no proposal can be made.

Select **Edit**, enter the minutes and kilometres you travelled, add a comment explaining the difference, and save.

### Why does my Appointment go Under Review?

Every proposal on a later Appointment in a sequence puts the Appointment **Under Review**, however close it is to the predicted travel. The tolerances are not applied. A proposal of zero against predicted travel also goes to review, because approving it would remove the predicted travel.

The Appointment shows a review reason that reads **Travel review required for** your name, followed by **proposed travel on a sequential Appointment**.

## Reviewing proposals as a Coordinator

You review proposals when you complete the Appointment. Both **Confirm Completion** and **Quick Complete** show the **Travel review** for an Appointment that is Under Review for travel.

For each Resource, the Travel review shows:

* The **predicted** minutes and kilometres Maica calculated.
* The **proposed** minutes and kilometres the care worker entered, or the predicted values where nothing was proposed.
* The care worker's comment.
* A choice of **Keep predicted** or **Approve proposed**.

Each Resource starts on **Keep predicted**. Your choice decides which values billing, pay and timesheets use: the travel Expense, the travel Timesheet Entry and the travel Delivery Activity are all built from the values you approve.

{% hint style="info" %}
Only users with the **Manage Travel** permission can choose. Other users see the saved choice read-only.
{% endhint %}

### Which action should I use?

| The Appointment is Under Review because of                                      | Use                                          |
| ------------------------------------------------------------------------------- | -------------------------------------------- |
| Travel only                                                                     | **Quick Complete** or **Confirm Completion** |
| Travel and another reason, or another reason only, such as duration or overtime | **Confirm Completion**                       |

**Quick Complete** is offered on an Under Review Appointment only when travel is the only review reason and you hold the Check-In/Out permission for Appointments, or for Shifts where the record is a Shift. On an Under Review Appointment it keeps the recorded times, as **Confirm Completion** does, and skips the location step.

See **Quick Completion** for how Maica records the times.

### Overtime

When you approve proposed travel, the overtime check uses the approved values. Approving longer travel can therefore raise an overtime warning before the Appointment is completed. On an Under Review Appointment that you Quick Complete, each Resource is measured by the times completion keeps for them.

{% hint style="warning" %}
A user who holds both the Quick Complete and Manage Travel permissions can approve their own proposed travel.
{% endhint %}

## What does a completed Appointment record?

Once the Appointment is completed, the approved values are recorded against each Resource's Appointment Resource record, and the travel records are built from them in the same step. A later recalculation of predicted travel does not overwrite an approval.

Appointments completed earlier are not changed. Travel records are built when an Appointment is completed.

## FAQs

<details>

<summary>Can I propose travel from an Appointment?</summary>

No. Under Sequential travel only travel to an Appointment is recorded. Travel from an Appointment is never charged, paid or counted toward overtime.

</details>

<details>

<summary>Why can't I edit travel on the first Appointment of my day?</summary>

The first Appointment in a sequence has no travel paid or charged, so its travel is locked and shown read-only.

</details>

<details>

<summary>Why can't I see Quick Complete on an Under Review Appointment?</summary>

Quick Complete is offered only where travel is the sole review reason. It also needs the Check-In/Out permission and access to the Review Reason on the Appointment. Use **Confirm Completion** otherwise.

</details>

<details>

<summary>Can I complete an Appointment twice?</summary>

No. **Confirm Completion** and **Quick Complete** refuse an Appointment or Shift that is already Completed or Cancelled.

</details>
