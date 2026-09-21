---
description: >-
  Learn how to off board a Resource in Maica and what happens to their
  assignments
---

# Offboarding a Resource

When a staff member leaves your organisation, whether they resign, retire, are terminated, or move into another role, you may need to remove them from all future Appointments or Shifts in **Maica**.

The **Resource Offboarding** feature provides a safe, guided process to do this. It ensures the Resource is removed from all future Appointments and marked inactive in your system.

{% hint style="danger" %}
This process cannot be undone, so please review all details carefully before confirming.
{% endhint %}

{% hint style="info" %}
The **Offboard Resource** quick action is gated by the **Maica - Resource Offboarding** permission set, which is not assigned automatically. An administrator without it sees the button but is taken to a **No Permission Set** screen when they select it.
{% endhint %}

***

### **What happens when you offboard a Resource?**

When you offboard a Resource, Maica:

1. **Sets an End Date** for when the Resource stops working with Participants.
2. **Stores the Offboarding Reason** so your organisation has a clear record.
3. **Marks the Resource as inactive**, either straight away or on the End Date, depending on the date you choose.
4. **Deletes the Resource's Appointment assignments** at the moment they become inactive.
5. **Prevents accidental reassignment** of that Resource by automatically deleting any new future assignments added after offboarding.

#### **When the Resource becomes inactive**

The End Date you choose decides when the Resource is deactivated, and this is the single most important thing to get right.

<table><thead><tr><th width="280">End Date you enter</th><th>When the Resource becomes inactive</th></tr></thead><tbody><tr><td><strong>In the past</strong></td><td>Immediately, as part of confirming the offboarding</td></tr><tr><td><strong>Today or in the future</strong></td><td>The day after the End Date, through a scheduled job</td></tr></tbody></table>

{% hint style="warning" %}
Choose an End Date **in the past** when you need the Resource deactivated straight away, for example to free up the linked User. With an End Date of today or later, the Resource stays active until the day after the End Date, and anything that depends on it being inactive stays blocked in the meantime.
{% endhint %}

#### **Which assignments are deleted**

The Appointment assignments are deleted at the point the Resource becomes inactive, not at the point you confirm.

Maica deletes every Appointment assignment for that Resource whose Appointment is scheduled **from midnight on the day of deactivation onwards**. An Appointment earlier the same day is deleted too.

{% hint style="info" %}
Only the Resource's _assignment_ is deleted. The Appointment itself remains scheduled for its other Resources and Participants. Past Appointment assignments are never touched.
{% endhint %}

***

### **How to Offboard a Resource**

#### **Step 1 — Open the Resource Record**

Navigate to the Resource record for the staff member you want to offboard.

#### **Step 2 — Click “Offboard Resource”**

On the Resource record page, click the **Offboard Resource** action to open the modal shown below.

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2Fh0hIcWB19EpMZPY4vV02%2FScreenshot%202026-02-04%20at%209.56.24%E2%80%AFam.png?alt=media&#x26;token=c847868b-caa8-4702-bfa0-2a2d40fa011c" alt=""><figcaption></figcaption></figure>

#### **Step 3 — Enter the Offboarding Details**

You will be prompted to enter:

* **End Date** (required)
* **Offboarding Reason** (required)
* **Comments** (optional)

{% hint style="info" %}
The End Date is **inclusive**, meaning the Resource remains active until the end of that day.
{% endhint %}

***

### **What happens next?**

#### **If the Resource has future Appointments after the End Date**

Maica will display a message telling you how many Appointment assignments will be affected.

The message will say something like:

> “This Resource is assigned to 12 future Appointments after the selected End Date.\
> These Appointment assignments will be **deleted**.\
> ⚠️ These actions cannot be undone.”

This allows you to review the impact before confirming.

***

### **Step 4 — Confirm the Offboarding**

The confirmation screen summarises your choices:

* End Date
* Offboarding Reason
* Number of Appointment assignments to be deleted

When you click **Confirm & Offboard**, the End Date and Offboarding Reason are saved, and the Resource is deactivated either immediately or on the End Date as described above. The Appointment assignments are deleted at the moment of deactivation.

***

### **Step 5 — Review the Completion Message**

Once complete, you’ll see a success message that confirms:

* The Resource has been offboarded
* The End Date
* The Offboarding Reason
* The number of Appointment assignments deleted

***

### **Offboarding to free up a linked User**

A Salesforce User can be linked to only **one active Resource** at a time. Maica enforces this at save, so creating a second active Resource for a User who already has one, or reactivating an old Resource for that User, is rejected with an error naming the Resource that already holds the link.

This matters when a staff member returns in a new role, or when a Resource record was created twice for the same person. Until the redundant Resource is retired, Maica resolves that User to whichever Resource holds the link, which can leave the worker's Planner showing no Appointments.

You have two options:

* **Repoint the User.** Change the **User** on one of the Resources to a different User, or clear it. This is the non-destructive option and deletes nothing.
* **Off-board the redundant Resource**, using an End Date in the past so the User is freed straight away.

{% hint style="danger" %}
Before off-boarding either Resource, confirm which one holds the worker's upcoming Appointments. Off-boarding deletes that Resource's assignments from the day of deactivation onwards, so retiring the wrong one of the pair takes the worker's upcoming work with it.
{% endhint %}

{% hint style="info" %}
Where a User is already linked to two active Resources from before your organisation upgraded, both records continue to save normally for any edit that does not change **User** or **Active**. The error appears only when one of those two fields is changed.
{% endhint %}

***

### **FAQs**

<details>

<summary>What if I accidentally offboard the wrong Resource?</summary>

Offboarding actions **cannot be undone**, because Appointment assignments are permanently deleted. Contact your system administrator if you need support.

</details>

<details>

<summary>What happens if someone books this Resource into future Appointments after offboarding?</summary>

If those Appointments occur after the Resource has been deactivated, the assignments are automatically removed.

</details>

<details>

<summary>Will the Appointment itself be deleted?</summary>

No. Only the _Resource’s assignment_ to the Appointment is removed. The Appointment remains scheduled for other Resources and Participants.

</details>

<details>

<summary>Does this affect past Appointments?</summary>

No. Only assignments from the day of deactivation onwards are removed.

</details>

<details>

<summary>I entered an End Date of today and the Resource is still active. Is that correct?</summary>

Yes. The End Date is inclusive, so the Resource remains active until the end of that day and is deactivated the following day. Enter an End Date in the past if you need the Resource deactivated immediately.

</details>
