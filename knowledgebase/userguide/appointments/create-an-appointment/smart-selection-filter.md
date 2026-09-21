---
description: Learn about how the Smart Selection Filter works in Maica
---

# Smart Selection Filter

## What is the Smart Selection Filter?

The Smart Selection Filter is a tool designed to identify and rank the most suitable [Participant(s)](../../getting-started/maica-key-concepts/participant.md), [Resource(s)](../../getting-started/maica-key-concepts/resource.md), or [Asset(s)](../../getting-started/maica-key-concepts/asset.md) for an [Appointment](../../getting-started/maica-key-concepts/appointment.md) based on a range of possible `Attributes`. It simplifies the roster selection process by comparing all available options to selected attributes and presenting them in an ordered list based on matches. This feature allows you to quickly and efficiently select the optimal fit for your [Appointment](../../getting-started/maica-key-concepts/appointment.md).

Unlike the Resource Optimiser (which evaluates multiple Appointments at once), Smart Selection is a **single-record, real-time matching tool** designed to help end users pick the best candidate during scheduling.

## What does the Smart Selection Filter do?

The Smart Selection Filter helps end users choose the most suitable:

* **Participant(s)**
* **Resource(s)**
* **Asset(s)**

for an Appointment or Shift by:

1. Filtering out anyone who fails key requirements
2. Scoring everyone who remains
3. Ranking them in order of suitability based on your selected Sort Criteria

It uses a simplified version of the [Resource Optimiser](../../the-planner/resource-optimiser/), providing real-time scoring for a _single_ selection.

## Where do I find the Smart Selection Filter?

In **Maica**, you select Participant(s), Resource(s), and Asset(s) in the [Basic Details](basic-details.md) stage of creating or managing an Appointment, it is here you will also find the Smart Selection Filter. On the right side of the selection search box, you will see a `Filter` symbol; simply click this `Filter` to open the Smart Selection Filter pop-up, as shown below.

{% hint style="success" %}
This tool can also be accessed across Maica where Participant, Resource or Asset selectors are available
{% endhint %}

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FVEFymjA7wcGmrubIWVWN%2Fsmart%20selection%20where%20to%20find%20.png?alt=media&#x26;token=37351ed7-cbbf-49f5-b2da-d49e11dc712e" alt="" width="563"><figcaption></figcaption></figure>

## Smart Selection Filter Elements

Once you have clicked on the Filter icon, and Smart Selection Filter pop-up has been presented, you will notice a number of elements within the tool. These are described below:

<figure><img src="https://2670482622-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FhehRshYIRk6XUlay9L3b%2Fuploads%2FWQp0ncUOvGql5xGZbyHq%2Ffind%20resource%202.png?alt=media&#x26;token=03082409-32d2-4efe-b534-25387a32f2b9" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="307">Element</th><th>Description</th></tr></thead><tbody><tr><td><ol><li><code>Sort Order Toggle</code></li></ol></td><td>This button allows you to switch the display order of the list between ascending and descending, letting you view the items from top to bottom or bottom to top based on the current sort criteria.</td></tr><tr><td><ol start="2"><li><code>Score</code></li></ol></td><td>Displays the calculated Matching Score (%) for each Resource. The score reflects how well the Resource meets the current Skills, Attributes, Availability, Workload, and Travel criteria (based on Matching Score weightings). The list is sorted by this score unless you change the Sort Criteria.</td></tr><tr><td><ol start="3"><li><code>Sort Criteria Dropdown</code></li></ol></td><td>Allows you to choose how the Resource list is ordered. <strong>Overall Matching Score</strong> is always available, and each of Availability, Workload, Skills, Attributes and Travel appears only where that criterion currently carries a weighting. These options are detailed <a href="smart-selection-filter.md#smart-selection-filter-dropdown-criteria-sections">below</a>.</td></tr><tr><td><ol start="4"><li><code>Ranking Criteria</code></li></ol></td><td>Allows you to add additional scoring rules that influence how Resources are ranked. Ranking Criteria work the same as in the <a href="../../the-planner/resource-optimiser/#ranking-criteria">Optimiser</a>: each rule consists of a <strong>Field</strong>, <strong>Operator</strong>, and <strong>Value</strong>, and Resources earn score if they match the defined rules.</td></tr><tr><td><ol start="5"><li><code>Settings</code></li></ol></td><td>Opens the Smart Selection Filter settings panel, allowing you to refine which Resources appear in the list. This includes options such as <strong>Only allocated Resources</strong> (show only Resources linked to the selected Participant) and <strong>Only matched Resources</strong> (hide Resources that do not match any selected Skills or Attributes). These settings affect the candidate list before scoring is applied.</td></tr></tbody></table>

## Smart Selection Filter Dropdown Criteria Sections

{% hint style="info" %}
The Dropdown Criteria Sections are only relevant when selecting a Resource(s). When selecting Participant(s) or Asset(s), your `Score` will be a number based purely on the number of matching `Attributes`.
{% endhint %}

When selecting a Resource(s), you can chose to order your list based on a number of additional criteria. These are further explained in the table below:

<table><thead><tr><th width="125.71875">Category</th><th>Description</th></tr></thead><tbody><tr><td><strong>Skills</strong></td><td>Measures how many of the required Skills a Resource has compared with the total Skills needed.</td></tr><tr><td><strong>Availability</strong></td><td>Checks whether the Resource has enough Available hours on the relevant day to cover the Appointment or Shift. Any existing usage or unavailability is subtracted from the daily limit, and the remaining time is compared against the requirement. The resulting score is weighted by the Availability percentage.</td></tr><tr><td><strong>Workload</strong></td><td>Evaluates weekly capacity by comparing the required minutes for the Appointment or Shift plus the Resource’s current scheduled hours against their weekly limit. The result is scaled by the Workload importance percentage.</td></tr><tr><td><strong>Attributes</strong></td><td>Counts how many requested Attributes a Resource satisfies (for example, gender, language, or experience).</td></tr><tr><td><strong>Travel</strong></td><td>Scores proximity by comparing the Resource’s distance to the Appointment location against the closest candidate. Resources co-located or nearest to the site receive the highest score, weighted by the Travel importance percentage.</td></tr></tbody></table>

### Which criteria appear in the Sort Criteria dropdown

A criterion weighted at 0% contributes nothing to a Resource’s score, so Maica does not offer it as a sort option. The dropdown therefore lists only what has actually been scored for the current search.

<table><thead><tr><th width="290">Sort option</th><th>Appears when</th></tr></thead><tbody><tr><td><strong>Overall Matching Score</strong></td><td>Always</td></tr><tr><td><strong>Availability</strong>, <strong>Workload</strong>, <strong>Skills</strong>, <strong>Attributes</strong></td><td>The criterion’s weighting is above 0%</td></tr><tr><td><strong>Travel</strong></td><td>The Travel weighting is above 0% <strong>and</strong> the Appointment has a Location Type</td></tr></tbody></table>

The weightings are resolved for each search in three layers, and the dropdown reflects the final result:

1. The org-wide **Matching Score Importance Level** in Settings
2. The **Shift** equivalents of those weightings, where the record is a Shift
3. Any per-run override set through the Optimiser’s **Ranking Criteria** sliders

{% hint style="warning" %}
**Travel** does not appear for a Shift unless your organisation has given the Shift Travel weighting a value. It ships at 0%, so its absence from the dropdown on a Shift is correct rather than a missing option.
{% endhint %}

{% hint style="info" %}
If you have already sorted by a criterion and its weighting is then reduced to 0%, the list falls back to **Overall Matching Score** the next time it refreshes, rather than leaving the selection unresolved.
{% endhint %}

### Required and Preferred Resources

Where a Participant has Resources marked as **Required**, those Resources are placed at the top of the list and are always included, regardless of their score, even where more Resources match than the list can show.

Every search filter still applies to them. A Required Resource that falls outside your search term, the Resource Pool, or the excluded Resources is not surfaced. Required Resources survive the row limit, not the filters.

<table><thead><tr><th width="200">Icon</th><th>Meaning</th></tr></thead><tbody><tr><td>Green tick</td><td>The Resource is <strong>Required</strong> for the selected Participant</td></tr><tr><td>Orange star</td><td>The Resource is <strong>Preferred</strong> for the selected Participant</td></tr></tbody></table>

{% hint style="info" %}
Where a Resource is both Required and Preferred, the green tick takes precedence, in both the desktop and mobile layouts. The same applies to Required Assets in the Asset picker.
{% endhint %}

### How many Resources are shown

The number of rows the list returns is capped by the **Find Resource Number of Rows** setting, which defaults to 100. The list is ordered by Resource Name when this cap applies, so the same Resources are returned from one search to the next.

Where records were left out, a footer reads “A limited number of records is shown”. Narrow your search term, or apply Ranking Criteria, to bring the list within the cap.

{% hint style="warning" %}
Resources outside the cap are not selected by score, because scoring happens after the candidate list is retrieved. Where your organisation regularly exceeds the cap, refine the search rather than relying on the top of the list being the best match.
{% endhint %}

## How do I use the Smart Selection Filter?

To use the Smart Selection Filter, you only need to open it and select your Resource, Participant or Asset, as they will already be ranked by scores generated from your Global Settings and Appointment conditions!

However, we advise adding Ranking Criteria refine suitability. To do so,

{% hint style="info" %}
To learn about the logic behind Ranking Criteria, [click here](../../the-planner/resource-optimiser/#ranking-criteria).
{% endhint %}

1. Click **Add Criteria**.
2. A new filter row will appear where you can specify the **Field**, **Operator**, and **Value**.
3. Multiple criteria can be added to refine the criteria further.

**Understanding Filter Components**

Each criterion is made up of three components:

<table><thead><tr><th width="140.259765625">Component</th><th>Description</th></tr></thead><tbody><tr><td><strong>Field</strong></td><td>Defines which field the Optimiser will evaluate. Fields are grouped under <strong>Resource</strong> or <strong>Skill</strong> objects.<br><br>Examples include <em>Resource → Work Type</em>, <em>Resource → Gender</em>, or <em>Skill → Certificate</em>.</td></tr><tr><td><strong>Operator</strong></td><td>Determines how the value is compared to the field. Common operators include <em>equals</em>, <em>not equal to</em>, <em>contains</em>, and <em>does not contain</em>. The Operator value is refined depending on the selected Field.</td></tr><tr><td><strong>Value</strong></td><td>The specific value being matched against the field. This may be a picklist option, text entry, or date, depending on the selected field. For example, if <em>Resource → Gender</em> is chosen, available values might be <em>Man</em> or <em>Woman</em>.</td></tr></tbody></table>

Once done, click the **✓** button to apply your selected Criteria.

The candidate list will update automatically, with each row recalculated based on your filters and Smart Selection logic and new percentages presented.

{% hint style="success" %}
You can click on a % score to see a more detailed breakdown of that score
{% endhint %}

{% hint style="info" %}
The Smart Selection Filter uses the **same scoring, ranking, and weighting logic** as Maica’s Optimisation Engine to calculate scores.

For a detailed explanation of how scores are calculated (Availability, Workload, Skills, Attributes, Travel, and weighted scoring), refer to the [**Optimisation Engine Logic**](https://app.gitbook.com/s/9selzjEx6KX7RYEawAVr/system-processes/maicas-optimisation-engine) article.
{% endhint %}

## **How Smart Selection Differs for Resources, Participants, and Assets**

The Smart Selection Filter adapts depending on the type of record you are selecting.

#### **Resource Selection (Most Comprehensive)**

When selecting a Resource, Smart Selection uses the **full Matching Score logic**, including:

* Skills
* Attributes
* Availability
* Workload
* Travel
* Ranking Criteria

Sort Criteria options include the **Overall Matching Score** plus each category that currently carries a weighting, using the same weighting model as the Optimiser.

#### **Participant Selection**

When selecting a Participant, Smart Selection uses a simplified evaluation model:

* **Only Attributes are used for scoring**
* Skills, availability, workload, and travel do **not** apply
* Ranking Criteria can still be added, but only Attribute-based fields impact scoring

The Score column for Participants represents the number of matched Attributes.

#### **Asset Selection**

Asset matching also uses Attributes only. Examples include:

* Vehicle type
* Equipment category
* Capacity
* Location

Skills and capacity-based logic used for Resources do not apply. The Score column reflects matched Attribute count.

These available options are summarised in the table below:

<table><thead><tr><th width="125.44140625">Target Type</th><th width="83.029296875">Skills</th><th width="115.197265625">Attributes</th><th>Availability</th><th width="112.6044921875">Workload</th><th width="90.9296875">Travel</th><th>Score Model</th></tr></thead><tbody><tr><td><strong>Resource</strong></td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>✔</td><td>Overall Matching Score (weighted)</td></tr><tr><td><strong>Participant</strong></td><td>✖</td><td>✔</td><td>✖</td><td>✖</td><td>✖</td><td>Attribute match count</td></tr><tr><td><strong>Asset</strong></td><td>✖</td><td>✔</td><td>✖</td><td>✖</td><td>Optional (location-based)</td><td>Attribute match count</td></tr></tbody></table>
