---
description: Learn how to off board a Resource in Maica
---

# Offboarding a Resource

When a staff member leaves your organisation—whether they resign, retire, are terminated, or move into another role—you may need to remove them from all future Appointments or Shifts in **Maica**.

The **Resource Offboarding** feature provides a safe, guided process to do this. It ensures the Resource is removed from all future Appointments and marked inactive in your system.

{% hint style="warning" %}
This process cannot be undone, so please review all details carefully before confirming.
{% endhint %}

***

### **What happens when you offboard a Resource?**

When you offboard a Resource, Maica:

1. **Sets an End Date** for when the Resource stops working with Participants.
2. **Stores the Offboarding Reason** so your organisation has a clear record.
3. **Immediately deletes all future Appointment assignments** for that Resource where the Appointment occurs _after the End Date_.
4. **Automatically marks the Resource as inactive** on the End Date (Active = FALSE).
5. **Prevents accidental reassignment** of that Resource by automatically deleting any new future assignments added after offboarding.

***

### **How to Offboard a Resource**

#### **Step 1 — Open the Resource Record**

Navigate to the Resource record for the staff member you want to offboard.

#### **Step 2 — Click “Offboard Resource”**

On the Resource record page, click the **Offboard Resource** action to open the modal shown below.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2026-02-04 at 9.56.24 am.png" alt=""><figcaption></figcaption></figure>

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
> These Appointment assignments will be **deleted immediately** when you continue.\
> ⚠️ These actions cannot be undone.”

This allows you to review the impact before confirming.

***

### **Step 4 — Confirm the Offboarding**

The confirmation screen summarises your choices:

* End Date
* Offboarding Reason
* Number of Appointment assignments to be deleted

When you click **Confirm & Offboard**:

* All Appointment assignments **after the End Date are deleted immediately**
* The Resource remains active until the End Date
* On the End Date, Maica sets the Resource to **Inactive**

***

### **Step 5 — Review the Completion Message**

Once complete, you’ll see a success message that confirms:

* The Resource has been offboarded
* The End Date
* The Offboarding Reason
* The number of Appointment assignments deleted

***

### **FAQs**

<details>

<summary>What if I accidentally offboard the wrong Resource?</summary>

Offboarding actions **cannot be undone**, because Appointment assignments are permanently deleted. Contact your system administrator if you need support.

</details>

<details>

<summary>What happens if someone books this Resource into future Appointments after offboarding?</summary>

If those Appointments occur **after the End Date**, they will be automatically removed when the Resource becomes inactive.

</details>

<details>

<summary>Will the Appointment itself be deleted?</summary>

No. Only the _Resource’s assignment_ to the Appointment is removed. The Appointment remains scheduled for other Resources and Participants.

</details>

<details>

<summary>Does this affect past Appointments?</summary>

No. Only future Appointment assignments are removed.

</details>

