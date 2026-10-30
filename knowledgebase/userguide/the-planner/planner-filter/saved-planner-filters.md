# Saved Planner Filters

## What are Saved Planner Filters?

A saved filter stores the settings on the **Basic** and **Advanced** tabs of the **Planner Filter** so you can return to them in one step. You can keep a filter private, share it with every user, or have your administrator make it the starting filter for the whole organisation.

Saved filters work in the **Planner** and in **Schedule Manager**. The **Resource Optimiser** and **Find Resource** have their own saved filters for the Resource Pool, described at the end of this article.

## Where do I find Your Filters?

**Your Filters** sits at the top of the filter panel. It is a search box with the placeholder **Select a Filter**. Type to search the saved filters you can see, and pick one to apply it. The **Find Filter** icon beside the box opens a window listing every filter you can see.

{% hint style="info" %}
You need the **Manage Filter** permission to save filters. Users without it can still pick a shared filter and always start from the Org Default filter.
{% endhint %}

## What does a saved filter store?

A saved filter stores the criteria on the Basic and Advanced tabs, including each filter's **Include** or **Exclude** choice. It does not store:

* How the Planner is grouped or sorted
* The Planner view, the period or the mode

Those stay as you have set them when you apply a filter.

{% hint style="info" %}
A saved filter stores criteria only. Where it names records you are not able to see, such as a Resource or Participant you do not have access to, those records are left out when the filter loads, so a filter never shows you more than you are allowed to see.
{% endhint %}

## Saving a filter

{% stepper %}
{% step %}
#### Set the filters

Set the filters you want on the Basic and Advanced tabs.
{% endstep %}

{% step %}
#### Save as a new filter

Select **Save As**.
{% endstep %}

{% step %}
#### Enter filter details

Enter a **Name** and, if you like, a **Description**.
{% endstep %}

{% step %}
#### Save

Save the filter.
{% endstep %}
{% endstepper %}

The new filter is private to you and appears under **Your Filters**.

To update a filter you already own, select it in **Your Filters**, change the settings and select **Save**. **Save** is offered only where you are able to edit the selected filter.

## Applying a filter

Pick a filter in **Your Filters**, or in **Find Filter**, to apply it. Applying a filter replaces the criteria on both tabs. Your current view, period, mode, grouping and sorting are kept.

If you have changed the filter you are on and not saved it, Maica asks whether you want to discard your changes before it applies another filter.

{% hint style="info" %}
If a filter you used before has since been deleted or made private, Maica keeps your current settings and tells you that the saved filter is no longer available.
{% endhint %}

## Finding, sharing and deleting filters

Select the **Find Filter** icon to open the list of filters you can see. From there you can:

* Search for a filter by name and read its description
* Apply a filter
* Create a new filter with **New Filter**, which opens **Save As**
* **Make Public** a filter you own, so every internal user can find and apply it. Making a filter public needs the permission to manage shared filters. A filter you make public can be made private again
* **Delete** a filter you own

You can edit or delete only the filters you own. If you delete the filter that is currently selected, the selection is cleared straight away.

## The Org Default filter

Your administrator can choose a **Default Planner Filter** in the Planner settings. It must be a public Planner filter. The filter is shared read-only with every internal user, so everyone can find it in **Your Filters** and **Find Filter**. Users who do not hold the Manage Filter permission always start the Planner from it.

When you open the Planner for the first time, **Your Filters** shows the name of the Org Default filter, and it shows it again after you select **Reset**.

If the owner deletes the filter, the setting is cleared and everyone starts from Maica's built-in defaults.

{% hint style="warning" %}
The **Appointment Resource Status** filter starts from the **Default Appointment Resource Status** setting. Where that setting is a single status such as Confirmed, allocations in other statuses, such as Pending, are hidden until the filter includes them. Where the setting is blank, the filter starts with all statuses.
{% endhint %}

## Resource Pool filters

The **Resource Pool** panel in the **Resource Optimiser** and in **Find Resource** has its own **Your Filters** box, with **Save**, **Save As**, **Find Filter**, discard and **Reset**. A Resource Pool filter stores only the pool criteria. Rows that use fields you cannot read are left out with a notice.

Resource Pool filters and Planner filters are kept apart. The Planner, Schedule Manager and the Default Planner Filter never list Resource Pool filters, and the Resource Pool panels never list Planner filters. A Resource Pool filter cannot be made the Default Planner Filter.

## Who can do what?

| You want to                          | You need                                |
| ------------------------------------ | --------------------------------------- |
| Pick a public filter                 | Access to the Planner                   |
| Save, edit or delete your own filter | The **Manage Filter** permission        |
| Make a filter public                 | The permission to manage shared filters |
| Choose the Default Planner Filter    | Access to edit Planner settings         |

## FAQs

<details>

<summary>Can other users see my private filters?</summary>

No. A filter is visible only to its owner until the owner makes it public.

</details>

<details>

<summary>Why does a saved filter show fewer records for me than for a colleague?</summary>

A filter applies to what you are allowed to see. Records you cannot access are left out when it loads.

</details>

<details>

<summary>Does applying a filter change my view or period?</summary>

No. The Planner view, the period, the mode, grouping and sorting stay as you set them.

</details>
