# Creating and Managing Alerts

This guide walks through creating and maintaining alerts in Maica Alerts. There are two ways to manage alerts depending on how widely they should appear: the **Manage Alerts** tab for org-wide alerts, and the **Manage Alerts** quick action for alerts on a single record.

{% hint style="warning" %}
**Prerequisites:** To manage org-wide alerts from the **Manage Alerts** tab, you need the **Alerts Admin** permission set, or a System Administrator profile. To display the alerts you create, the **Alerts** component must be added to the relevant Lightning record page.
{% endhint %}

For background on the concepts referenced here (styles, variants, targeting, and conditions), see the [Maica Alerts Overview](maica-alerts-overview.md).

## Adding the Alerts component to a page

Before any alert can be seen, the **Alerts** component needs to be on the record page for the target object.

### Place the component

1. Open the record page you want in the **Lightning App Builder** (from a record, go to **Setup** then **Edit Page**).
2. Drag the **Alerts** component onto the page, usually near the top so alerts are seen first.
3. If you are using groups, set the **Group** property on the component to match the alerts it should show. Leave it blank to show alerts that have no group.
4. **Save** and, if needed, **Activate** the page.

{% hint style="info" %}
Inline **Alert** and **Modal** style alerts appear through this component on the page. **Toast** style alerts also rely on the component being present on the page that the user is viewing.
{% endhint %}

## Managing org-wide alerts

Use the **Manage Alerts** tab for alerts that should appear on every record of an object.

### Open the Manage Alerts tab

1. Open the **App Launcher** and select the **Maica Alerts** app.
2. Select the **Manage Alerts** tab.

The screen lists existing alerts, separated into current alerts and a list of expired alerts whose End Date has passed.

### Create an org-wide alert

1. From the **Manage Alerts** tab, choose to create a new alert.
2. Select the **Target Object**. This is the object whose records will display the alert.
3. Choose the **Style** (Alert, Toast, or Modal) and the **Variant** (Info, Warning, Error, or Success).
4. Enter the message. Use the rich text body for inline and modal alerts, and the plain text message for toasts. You can include merge fields such as `{!Name}`.
5. Set any optional targeting: **Profiles**, **Start Date** and **End Date**, **Group**, and a **Condition**.
6. Make sure **Active** is ticked, then save.

Because no specific record is selected, the alert applies to every record of the Target Object.

{% hint style="success" %}
To check an alert before rolling it out widely, set a **Start Date** in the future or leave **Active** unticked until you are ready, then activate it when you want it to appear.
{% endhint %}

## Managing alerts on a single record

Use the **Manage Alerts** quick action for an alert that should appear on one record only.

### Open the quick action

1. Navigate to the record (for example an Account, Contact, or Opportunity).
2. Select the **Manage Alerts** action from the record's actions.

The screen shows alerts that are specific to this record. The **Target Object** and **Target Record Id** are set automatically to the current record.

### Create a record-specific alert

1. With the **Manage Alerts** action open on the record, create a new alert.
2. Choose the **Style** and **Variant**.
3. Enter the message, including any merge fields.
4. Set any optional **Profiles**, **Start Date**, **End Date**, **Group**, or **Condition**.
5. Ensure **Active** is ticked, then save.

The alert now appears only on this record.

{% hint style="warning" %}
You can only have one active **Modal** alert per record. If a record already has an active Modal alert, Maica prevents you from creating a second and asks you to consolidate the message into the existing one.
{% endhint %}

## Editing, activating, and deactivating

You can edit any alert from the same screen where it was created.

* To **change** an alert, open it from the list, update the fields, and save.
* To **temporarily hide** an alert without deleting it, untick **Active** and save. It stops displaying immediately but is kept for later.
* To **bring an alert back**, tick **Active** again, making sure its date window still includes today.

## Deleting an alert

To remove an alert permanently, delete it from the Manage Alerts list.

{% hint style="danger" %}
Deleting an alert cannot be undone. If you only want to stop the alert from showing for now, untick **Active** instead of deleting it.
{% endhint %}

## Working with expired alerts

When an alert's **End Date** passes, it is treated as expired and moves into the expired list on the **Manage Alerts** tab. Expired alerts no longer display on records. To bring an expired alert back, edit it and extend or clear its **End Date**, then confirm it is still **Active**.

## Common scenarios

| You want to                                      | Set this up                                                                       |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Show a notice on every record of an object       | Create the alert from the **Manage Alerts** tab and leave the record target unset |
| Show a notice on one specific record             | Create the alert from the **Manage Alerts** quick action on that record           |
| Show a message only to certain teams             | Set the **Profiles** field to the relevant profiles                               |
| Run a notice only for a set period               | Set **Start Date** and **End Date**                                               |
| Show a message only when a record meets criteria | Add a **Condition**                                                               |
| Force users to acknowledge a message             | Use the **Modal** style                                                           |

## Troubleshooting

* **The alert is not appearing.** Confirm the **Alerts** component is on the record page, the alert is **Active**, today is within the Start and End dates, the viewing user's profile is allowed, and the **Group** on the component matches the alert's Group.
* **The alert appears on the wrong records.** Check the **Target Object** and, for record-specific alerts, the **Target Record Id**.
* **A merge field shows as text instead of a value.** Check that the field API name inside `{!` and `}` exists on the Target Object.
* **You cannot create a Modal alert.** A record can have only one active Modal alert. Edit the existing Modal alert instead.
