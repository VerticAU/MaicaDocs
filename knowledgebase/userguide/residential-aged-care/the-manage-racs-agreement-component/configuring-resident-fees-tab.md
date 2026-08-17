# Configuring Resident Fees tab

The **Fees** tab is where you set up and maintain a resident's fee items. Each fee a resident pays, such as the Basic Daily Fee or a Daily Accommodation Payment, is configured as an Agreement Item. The billing engine reads these items to generate invoices.

The tab supports two modes that share the same screen: initial setup, where you add the resident's fee items at or shortly after entry, and ongoing updates, where you amend rates, add items, or deactivate items as circumstances change.

{% hint style="info" %}
The Fees tab configures the fee items only. It does not run the billing engine. The engine processes the items you configure here on its next scheduled daily run.
{% endhint %}

## The agreement context panel

At the top of the tab is a read-only panel showing the resident's fee context, drawn from the Service Agreement. These values determine which fee types you can configure.

| Field                         | What it tells you                                                     |
| ----------------------------- | --------------------------------------------------------------------- |
| **Fee Arrangement**           | Which fee regime applies, and therefore which fee types are available |
| **Means Assessment Status**   | Whether the resident has been means assessed                          |
| **Low Means Status**          | Whether the resident is partly government-supported                   |
| **Accommodation Arrangement** | Which accommodation regime applies                                    |
| **Pensioner Status**          | The resident's pensioner status                                       |

## The fee items list

The list shows the resident's fee items with their rate, billing method, frequency, dates and status.

### Showing and hiding inactive items

By default the list shows only current items and hides those that have been end-dated, so a resident with a long history of rate changes does not present a wall of superseded rows. A **Show inactive items** toggle above the list brings the end-dated rows back into view.

Beside the toggle, a count tells you what you are looking at, in the form **Showing 3 of 7 items**: the number of rows visible against the total the agreement holds. Where the two numbers differ, rows are being hidden.

{% hint style="info" %}
The toggle affects the display only. It is not remembered between visits and resets to hiding inactive items each time you open the component. Nothing is ever removed from the record by hiding it.
{% endhint %}

{% hint style="info" %}
An item can show as **Inactive** and still be a current row rather than history, for instance one with a start date in the future. The toggle hides only items that have actually been end-dated, so a future-dated item stays visible whichever way the toggle is set.
{% endhint %}

{% hint style="warning" %}
Hiding a row never hides its actions or removes it from anything else. **Check Fee Rates** works from its own list of in-scope items and is unaffected by the toggle, so an item hidden from view can still appear in a rate comparison. That is expected rather than a fault.
{% endhint %}

### How the list is ordered

The order is fixed and cannot be changed by clicking a column heading. Items sort by:

1. **Active items first**, then inactive ones.
2. **Newest start date first** within each group. Items with no start date come last.
3. **Fee type alphabetically** where start dates match.

The result is that the items you are most likely to act on sit at the top, and a fee's rate history reads downwards from its most recent rate.

## Adding fee items

Select **Add Fee Item** to open the fee item panel, then work through two steps.

{% stepper %}
{% step %}
### Select the fee type

Choose a Support Item from the lookup. The lookup is filtered so you cannot add a fee type that does not apply to the resident. Two filters combine:

* **Fee arrangement.** Only fee types valid for the resident's fee arrangement are offered (see the table below).
* **Price List.** Only Support Items that appear as an active entry on the Service Agreement's Price List are shown, so the item you pick is always one your organisation has priced for this agreement.

A guidance message describes the fees you would typically configure for this resident.
{% endstep %}

{% step %}
### Configure the item

Enter the rate (in dollars per day) and the billing details, then save.

The rate is entered by you, based on the Services Australia fee advice letter or the provider-set price. Maica does not read the rate from the letter automatically.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
Only one active item per fee type is allowed at a time, with two exceptions: a resident may have more than one Higher Everyday Living Fee item, and a Daily Accommodation Payment and a Daily Accommodation Contribution may both apply. A Higher Everyday Living Fee can only be added after entry, never as a condition of entry.
{% endhint %}

### Available fee types by arrangement

The fee types you can add depend on the resident's fee arrangement.

| Fee arrangement          | Available fee types                                                                                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Post 1 November 2025** | Basic Daily Fee, Hotelling Contribution, Non-Clinical Care Contribution, Daily Accommodation Payment, Daily Accommodation Contribution, Higher Everyday Living Fee                              |
| **1 July 2014**          | Basic Daily Fee, Means Tested Care Fee, Daily Accommodation Payment, Daily Accommodation Contribution, Extra Service Fee, Additional Service Fee, Higher Everyday Living Fee, RAD/RAC Retention |
| **Pre-1 July 2014**      | Basic Daily Fee, Income Tested Fee, Daily Accommodation Payment, Daily Accommodation Contribution, Extra Service Fee, RAD/RAC Retention                                                         |

{% hint style="info" %}
A respite resident is offered a narrowed set regardless of arrangement: Basic Daily Fee, Higher Everyday Living Fee, and an optional one-off Booking Fee only. Accommodation, means tested, and income tested fees do not apply during respite, because the government pays the respite accommodation supplement directly to the provider for the stay.
{% endhint %}

{% hint style="info" %}
When you add a Daily Accommodation Payment, the rate is pre-filled from the agreed room price and the interest rate at the time the agreement was signed. You can override it. An Automatic RAD Drawdown option also appears for residents who pay by lump sum, which lets the billing engine draw fees from the deposit balance.
{% endhint %}

## Checking fee rates against Services Australia

For means tested fee types, you can confirm the resident's current rate against Services Australia without reading the fee advice letter by hand.

{% stepper %}
{% step %}
### Select **Check Fee Rates**

Maica calls Services Australia and compares the current rate for each in-scope fee item against what is configured.
{% endstep %}

{% step %}
### Review any differences

If any rates differ, a comparison table shows the current and the new rate for each item, and an **Apply Changes** button appears.
{% endstep %}

{% step %}
### Apply the changes

Review the comparison and select **Apply Changes** to update the rates you accept. You always confirm before anything changes.
{% endstep %}
{% endstepper %}

If everything matches, Maica shows a message confirming the rates are up to date as at the date last checked. The date of the most recent check is shown beneath the button.

{% hint style="success" %}
Applying a rate change here creates a clean rate history and corrects any periods already billed at the old rate, rather than overwriting the existing item in place.
{% endhint %}

## Editing, changing rates, and deactivating items

Each item in the list has row actions for ongoing maintenance.

* **Edit** opens the item with its current values. Use this for correcting a mistake such as a typo. Editing changes the item in place and does not create a rate history or a retrospective adjustment.
* **Change Rate** is the right action for a genuine rate change. You enter the new rate and an effective date. Maica end-dates the existing item, creates a new one carrying the new rate, and corrects any periods already billed at the old rate. This produces the same clean history as applying a change through Check Fee Rates.
* **Deactivate** stops billing for that fee from today. Maica sets the item's end date to today, which makes it inactive. The item stays on the record for audit purposes, and reappears in the list whenever **Show inactive items** is on. You are asked to confirm first.

{% hint style="info" %}
A deactivated item flips to Inactive in the list immediately, even though the resident is still billed for that final day. The row reflects your action straight away while the billing engine handles the last day correctly.
{% endhint %}

{% hint style="info" %}
**Change Rate is not available on every fee type.** It is disabled for the **Daily Accommodation Payment** and **RAD/RAC Retention** fee types, because those rates are not changed by a manual rate entry: a Daily Accommodation Payment moves through the indexation engine and the agreed room price, and RAD/RAC Retention is calculated by the retention service against the lump sum. On those rows the action shows as disabled with a tooltip explaining why, and directs you to edit the fee item instead. Change Rate is also unavailable on deactivated rows.
{% endhint %}

{% hint style="warning" %}
If you use Change Rate to reduce a Means Tested Care Fee rate, Maica shows an advisory before you submit, because the retrospective correction will generate a credit for periods already billed at the higher rate. Review the advisory before confirming. If the resident has already been charged at the higher rate, you may need to process a refund; Maica shows a reminder but does not calculate the refund. Process any refund as a credit note or a negative invoice line item on the relevant invoice.
{% endhint %}
