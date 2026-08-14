---
description: Learn how to set up your Care Workers on the Maica Mobile App
---

# Getting Started with the Mobile App

This article explains the administrative setup required to get started on the Mobile App, prepare Care Workers, and ensure correct Permissions and Settings are in place for designed usage.

The setup is broken down into sections, please refer each section in more detail below.&#x20;

### Lightning App & Navigation

The **Maica: Care Mobile** Lightning app must be published to Care Worker profiles so that it appears in Salesforce Mobile navigation. &#x20;

Hence, first add the **Maica: Care Mobile Lightning** app to the Profiles your Care Workers use (the Admin profile already has visibility enabled).&#x20;

Note:&#x20;

* The Mobile App ships with a single **Home** tab that launches the Planner experience.
* The Home flexipage embeds the `Maica: Planner` Aura component, which hosts the **Planner LWC**.

{% hint style="success" %}
No further component setup is required once the App has been assigned to users.
{% endhint %}

This configuration ensures the mobile app provides a direct, consistent entry point into the Planner experience.

### Resource Preparation

Every Mobile User must be linked to an active **Resource** record to enable mobile planner behaviour.

<table><thead><tr><th width="212.9921875">Requirement</th><th>Details</th></tr></thead><tbody><tr><td><strong>Resource linkage</strong></td><td>Each User must be connected to an active <code>Resource__c</code> record via the <code>User__c</code> lookup field.</td></tr><tr><td><strong>Active flag</strong></td><td>The <code>Active__c</code> field must be set to <strong>TRUE</strong>.</td></tr><tr><td><strong>Primary Experience</strong></td><td>This can be left blank. Then, the User experience will become contextual, meaning, if a User is on a Mobile then Mobile Experience will be applied &#x26; if they are on Desktop the Desktop Primary Experience will be used.<br><br><em>Note: if you set a value the, UX will be applicable to any devices</em> </td></tr></tbody></table>

### Planner & Global Settings

The Planner service relies on configuration values stored in the **Maica Setting** records, it is important that:

* You ensure your Maica Maps Settings records stay up to date (Google API Key) to allow automated Google related processes (such as Travel Calculations) to run.
* Additionally, populate the Support Phone and Email fields in the Maica General Settings to allow the Support button to display for Care Workers.

Other than the above listed, no additional action is required as when a user qualifies as a Mobile Worker:

* The planner automatically loads in **Agenda view**. The planner component forces the Agenda View and calendar mode whenever the logged-in Resource’s Primary Experience equals `Mobile`, while keeping other views for desktop-first users.

{% hint style="info" %}
The Agenda option is delivered entirely by the component; no extra picklist values are required in Planner Settings. Just ensure Available Views isn’t stripped of the default set so desktop teams still see the expected schedule views.
{% endhint %}

### Minimum Permission Sets (Object-Focused)

Each Maica Care Mobile user requires specific Permission Sets or Permission Set Groups to use the minimum required functionality of the Mobile App. These are:&#x20;

| Permission Set / Group                                                       | Purpose                                                                                                     |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Maica – Base & Object Permissions**                                        | Baseline access to core Maica components.                                                                   |
| **Maica – Planner – Planner Access & Object Permissions**                    | Grants access to the Planner tab and read rights to Appointments, Resources, Schedules, and Unavailability. |
| **Maica – Global – View Appointment & Object Permissions**                   | Allows reading appointment modals and related schedule/service data.                                        |
| **Maica – Global – View Shift & Object Permissions**                         | Grants equivalent access for Shifts so workers can open shift records in the planner.                       |
| **Maica – Planner – Manage Appointment – Check In/Out & Object Permissions** | Enables the Check In/Out actions and provides Timesheet and Timesheet Entry access.                         |
| **Maica – Planner – Manage Shift – Check In/Out & Object Permissions**       | Required if staff check in/out of Shifts rather than Appointments.                                          |

These groups provide the baseline object-level permissions required for:

* Viewing planner content.
* Interacting with Appointments and Shifts.

{% hint style="success" %}
Additional functional permissions — such as creating appointments, managing unavailability, or appointment/shift actions — can be assigned as required.\
\
To learn more about additional permissions, [click here](../data/permission-groups-and-sets/).&#x20;
{% endhint %}

{% hint style="info" %}
Support Details are visible to users with the Support Permission Set. This Permission Set allows Care Workers to call your organisation directly from the Mobile App.&#x20;



Please note, Phone and Email fields must be populated in your Maica General Settings & the related Permission Set defined above must be assigned for this button to be visible. \
\
_&#x4E;ote: You can separate visibility of the Support Button for different users via the Permission Set._&#x20;
{% endhint %}

### Validate the Experience

If you wish to test the above experience before issuing it out to your Care Workers, please follow the steps below:&#x20;

1. Log in as a templated Care Worker whose an active Resource, and set to Primary Experience = Mobile.
2. Open the Maica: Care Mobile app in Salesforce mobile; the Planner Home tab should load automatically, reflecting the new mobile-first experience.
3. Switch the Resource to Primary Experience = Desktop and confirm they still see the multi-view Desktop Planner when using the standard Salesforce App on Mobile.

Following these steps ensures Care Workers receive the tailored workflow in the Care Mobile app while Administrators retain full control over who uses the Mobile or Desktop scheduling interfaces.

### Summary

To deploy the Maica Care Mobile App successfully:

1. **Publish** the _Maica: Care Mobile_ app to worker profiles.
2. **Verify** every user has an active `Resource__c` record with `Primary Experience = Mobile`.
3. **Maintain** Maica Setting records for Planner and General Settings.
4. **Assign** the listed permission set groups to ensure planner and attendance access.

Once configured, the mobile planner automatically adapts for care workers, delivering an optimised experience with Agenda view, swipe-ready quick actions, and compact layouts.
