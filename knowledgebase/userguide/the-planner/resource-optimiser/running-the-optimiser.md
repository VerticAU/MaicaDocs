---
description: Learn about the process of running the Optimiser
---

# Running the Optimiser

This article walks through a complete Optimisation run from start to finish. It starts from configuring your Optimisation run and continues all the way through to confirming your updated Records.&#x20;

{% hint style="info" %}
If you have not yet reviewed the Resource Optimiser article, we recommend you do so. This will provide helpful context to the tools and functionality mentioned in this article.&#x20;
{% endhint %}

### **1. Define the Resource Pool**

The first step in any Optimisation run is defining **which Resources** the Optimiser will consider.

In this example, let's assume our Planner shows a week with **51 unfilled Appointments**, and we begin with **184 active Resources**.

We open the **Resource Pool** and start applying filters to refine the group.

1. Select **Resource Pool**.
2. Click **Add Criteria**.
3. Choose a **Field** (e.g., _Resource → Work Type_).
4. Select an **Operator** (e.g., _equals_).
5. Select a **Value** (e.g., _Full-Time_).

After applying this first filter, our pool narrows from **184 → 126** Resources.

We then add a second filter:

* **Resource → Region equals East Metro**

This reduces the pool further to **68** Resources.

Now, the Optimiser will **only** consider these 68 Resources when filling all 51 unfilled Appointments.

### **2. Define the Ranking Criteria**

With the 68-person Resource Pool set, we now decide **how** those Resources should be _scored_.

Ranking Criteria uses the _same_ Field → Operator → Value structure, but instead of filtering people _out_, it influences _how well they score_ during optimisation.

For this example, let's say we add one criterion:

* **Resource → Gender equals Woman**

This does **not** reduce the pool size (still 68), but Resources who match the rule will receive a higher scoring contribution.

{% hint style="info" %}
Remember, **Resource Pool** = _Who_ is considered & **Ranking Criteria** = _How well_ they score
{% endhint %}

{% hint style="warning" %}
If a Ranking rule is too strict (e.g., a value that no Resources have), optimisation may return no matches.
{% endhint %}

### **3. Configure Settings**

Next, we tell Maica how much weight each category should have in the scoring formula.

We open the **Settings** panel, which displays the five weighted categories:

<table><thead><tr><th width="141.8642578125">Category</th><th width="144.44921875">Weight</th><th>Description</th></tr></thead><tbody><tr><td><em>Skills</em></td><td>25%</td><td>Measures how many required skills the Resource has.</td></tr><tr><td><em>Availability</em></td><td>25%</td><td>Checks if the Resource has enough hours available for the Appointment.</td></tr><tr><td><em>Workload</em></td><td>25%</td><td>Compares the Resource’s total weekly hours against their limit.</td></tr><tr><td><em>Attributes</em></td><td>25%</td><td>Matches Resource attributes (e.g. gender, language) to Participant requirements.</td></tr><tr><td><em>Travel</em></td><td>0%</td><td>Ignored for this run, as all services are online.</td></tr></tbody></table>

We leave everything at **25%**, except **Travel = 0%**.

This means each of the four categories contributes equally to the final Matching Score.

{% hint style="info" %}
We also confirm that **Only use allocated Resources** is **disabled**, allowing all 68 Resources in the pool to be considered.
{% endhint %}

***

### **4. Run the Optimiser**

We now select all **51 unfilled Appointments** and click **Optimise**.

At the top of the Optimiser, the **Progress Indicator** shows:

> **0 of 51 filled**

As the run progresses, the count updates in real time.

{% hint style="success" %}
At any point in the time you can pause the optimisation process by clicking the progress spinner within the progress indicator. If you do so, Maica will save the records that had already been optimised before the run was paused. If you then continue without deselecting records, Maica will pick up from where your run left off
{% endhint %}

The Optimiser evaluates each Appointment one at a time based on our configuration:

1. It checks if the Appointment can be filled using the 68 Resources in the Pool.
2. It scores each eligible Resource against the Ranking Criteria and weightings.
3. It assigns the highest-scoring Resource(s).
4. If an Appointment cannot be filled, it’s skipped, given an error status, and the run continues. You can then review these after the optimisation run.&#x20;

After a short period, we see:

> **37 of 51 filled**

Some Appointments are now marked as fully optimised, and others remain unfilled or partially filled.

{% hint style="success" %}
Please note, you can work in the Optimiser whilst a run is underway. If you wish to view Appointment Insights or perform other Actions whilst the run is ongoing, you can. \
\
The only thing that will interfere with the run is cancelling and closing the modal.&#x20;
{% endhint %}

Once the run is complete, all Appointments will be sorted into Statuses: _Filled_, _Partially Filled_, _Unfilled_ or _Error._

### 6. Re-run the Optimiser for Remaining Appointments&#x20;

Let's say, after the first run, **45 of the 51 Appointments** have been successfully filled using our 68-person Resource Pool.

This leaves **6 Appointments** still unfilled. Rather than adjusting Ranking Criteria or weightings, we decide to broaden our **Resource Pool** slightly to give the Optimiser more people to draw from.

We return to the Pool and remove the criterion:

* **Resource → Region equals East Metro**

Our pool expands from **68 → 122 Resources**.

With this wider set, we select only the **remaining 6 unfilled Appointments** and run the Optimiser again.

The Progress Indicator updates until all 6 are filled. We now have **51 of 51 Appointments filled** across the week.

{% hint style="info" %}
We recommend this process. Tight Pool first → run Optimiser → broaden → run again. This ensures the strongest possible matches before widening your options.
{% endhint %}

### **7. Respond to Changes — Manually Adjust an Appointment**

Now, let's say one of our confirmed care workers calls in to say they are unwell and unable to attend a particular Appointment. We need to make an adjustment.&#x20;

So, begin in the **Resource Column** for the required Appointment, and:&#x20;

1. Open the dropdown menu on the Resource’s pill.
2. Select **Withdraw**.

The pill becomes **greyed out**, indicating the worker is no longer active for this Appointment but still visible for audit purposes. Our Confirmed Badge will also now turn back to Red, indicating the Confirmed Resources do not match the configured Requited on the Appointment.

Now, we need to allocate a replacement Resource. To do so:&#x20;

1. In the same Appointment, select **Find Resource Manually**.
2. The modal shows all eligible Resources based on our updated 122-person Pool.
3. We scroll to find **Nicolette O’Mahony** (who scored **52%**) and select her.
4. Click **Confirm** in the modal.

Nicolette is now added as the new confirmed Resource, while the withdrawn worker remains greyed out.

The Appointment is once again fully covered.

### **8. Confirm All Records**

With all adjustments complete, we prepare to finalise the Optimiser session. To do so, we click **Confirm** at the bottom-right of the Optimiser.

A **Summary Screen** appears, outlining the number of Appointments or Shifts updated to each Status. Once we confirm this, all Optimiser results are written to the underlying Appointment and Shift records in Maica, and updates are made.&#x20;

{% hint style="success" %}
During this update of records, Maica will detect any further Validation or additional Errors that may arise. It will display them and give you the option of continuing or returning back to the Optimiser. \
\
An example of this step may be a _Soft Unavailability detected_. Here, Maica lets you know about it, but doesn't stop the Resource being assigned. &#x20;
{% endhint %}

This marks the end of our run.&#x20;
