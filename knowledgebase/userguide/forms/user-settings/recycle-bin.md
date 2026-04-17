---
description: Learn how the Forms Recycle Bin Functions
---

# Recycle Bin

The Recycle Bin holds items you have deleted but not yet permanently removed. Deleted forms, templates, and documents are soft-deleted — they disappear from your main lists but are recoverable for up to 30 days.

Access the Recycle Bin via your **avatar menu → Recycle Bin**, or navigate to **forms.maica.com.au/bin**.

## What Is Soft Deletion?

When you delete a form, template, or document:

* It is removed from all main lists and search results
* It is **not** immediately destroyed — it moves to the Recycle Bin
* The public URL of a deleted published form stops working immediately
* Existing submissions and Salesforce records created from it are unaffected

## Viewing Deleted Items

The Recycle Bin shows three tabs:

| Tab           | Contents                      |
| ------------- | ----------------------------- |
| **Forms**     | Deleted data collection forms |
| **Templates** | Deleted document templates    |
| **Documents** | Deleted generated documents   |

Each item shows:

* The item name
* Date it was deleted
* Who deleted it

## Restoring an Item

1. Navigate to the Recycle Bin
2. Find the item you want to restore
3. Click **Restore**

The item is moved back to your main list with **Draft** status, regardless of what status it had when deleted. You will need to re-publish it if you want it to be live again.

Restored items retain all their original settings, fields, and configuration.

## Permanently Deleting an Item

1. Navigate to the Recycle Bin
2. Find the item
3. Click **Delete permanently**
4. Confirm the action

Permanent deletion cannot be undone. All data associated with the item is destroyed.

**For forms:** Permanently deleting a form also permanently deletes all its submissions.

## Automatic Expiry

Items in the Recycle Bin are automatically and permanently deleted after **30 days**. If you think you might need to recover something, restore it before the 30-day window closes.

## Items Not in the Recycle Bin

The following are permanently deleted immediately (no soft-delete):

* Individual field changes within a form
* Submissions (if deleted directly, not via form deletion)
* Allowed identity entries deleted from the Admin panel
* Salesforce connections
