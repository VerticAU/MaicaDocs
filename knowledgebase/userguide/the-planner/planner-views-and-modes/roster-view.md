# Roster View

## What information does the Roster View display?

The Roster View shows the `Shifts` belonging to a single [Roster](/broken/pages/8e8ae768e39de1cf6b3c8daf61355859b34ef6b2), together with a summary of that Roster and controls for moving through the Rosters in its series.

Roster View is **roster-first**. Unlike the other Planner views, it does not show everything in the selected period by default. Until you select a Roster from the toolbar, the grid stays empty.

{% hint style="info" %}
To view Shifts that do not belong to a Roster, use [Shift View](/broken/pages/3ab670f3546214eb17fe27c4e5a199a97dce245b) instead. Shift View shows standalone Shifts by default, with an option to include Roster Shifts as well.
{% endhint %}

## Selecting a Roster

The Roster View toolbar adds three controls that the other views do not have:

1. A **Roster** lookup, used to select the Roster you want to work on.
2. A **Location** `Group By` chip, which controls how the timeline lanes are grouped.
3. A calendar/timeline toggle.

{% hint style="info" %}
The selected Roster is kept when you switch to another Planner view and back again. It applies only within Roster View and is ignored everywhere else.
{% endhint %}

The date range selector is not shown in Roster View. The period covered is visible on the timeline column headers and on the Roster summary card instead.

## The Roster summary card

Once a Roster is selected, a summary card appears above the grid. It shows:

| Item                     | Description                                                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title and subtitle**   | The Roster's display name and summary line. Both fields are configurable, so what appears here depends on your organisation's Planner settings. |
| **Status**               | Whether the Roster is `Draft` or `Approved`.                                                                                                    |
| **Dates**                | The Roster's own start and end dates, and the wider Schedule window and frequency where the Roster belongs to a series.                         |
| **Location**             | The Location the Roster covers.                                                                                                                 |
| **Total hours**          | The total allocated hours across the Roster's Shifts.                                                                                           |
| **Series count**         | How many Rosters currently exist in the series, against how many the Schedule should generate in total.                                         |
| **Shift Summary report** | A link to the packaged Shift Summary report, scoped to the selected Roster.                                                                     |

{% hint style="warning" %}
The Shift count shown on the card counts every Shift linked to the Roster, including Shifts with no Resource allocated. Those Shifts are not drawn on the timeline, so the count can be higher than the number of Shifts you can see.
{% endhint %}

{% hint style="info" %}
The Shift Summary report link only appears if you have access to Reports. If you cannot see it, the link is hidden rather than broken.
{% endhint %}

### Standalone Rosters

A Roster that is not attached to a Schedule is a Roster of one. Its summary card shows no Schedule window and no **Go to Master** option, and the series navigation arrows are unavailable.

## Moving through a series

When the selected Roster belongs to a Schedule, the toolbar arrows step to the previous or next Roster in that series, ordered by start date. The arrows are disabled at the first and last Roster in the chain.

A **Go to Master** option jumps straight to the master Roster of the series, which is the Roster that future Rosters are regenerated from.

{% hint style="info" %}
To learn more about master Rosters and how a series is generated, see [Manage a Roster](/broken/pages/36026830b8e12d0f61868dbcfbd9184cbcb949e7).
{% endhint %}

## Timeline and Calendar modes

Roster View opens in **Timeline Mode**, with the Resource lanes grouped by `Location`. This is the default because the lanes are the point of the view: you can see which Resources are covering which Shifts across the Roster's period.

You can switch to **Calendar Mode** using the toggle in the toolbar. Your choice is remembered when you switch between Planner views.

{% hint style="info" %}
The colour theming of the cells and the information presented within them are configurable. To learn more, see [Planner Management](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/settings/planner-management) in the Administration Guide.
{% endhint %}

## Approving from the Planner

When a `Draft` Roster is selected, an **Approve** action appears in the toolbar with a highlighted treatment to indicate that action is needed.

{% hint style="warning" %}
Approving a Roster affects who can see its Shifts and, for a master Roster, generates the rest of the series. Before approving, read [Manage a Roster](/broken/pages/36026830b8e12d0f61868dbcfbd9184cbcb949e7).
{% endhint %}
