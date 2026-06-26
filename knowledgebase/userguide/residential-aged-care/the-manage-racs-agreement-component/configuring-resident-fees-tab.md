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

## Adding fee items

Select **Add Fee Item** to open the fee item panel, then work through two steps.

{% stepper %}
{% step %}
## Select the fee type

Choose a Support Item from the lookup. The lookup is filtered to fee types that are valid for the resident's fee arrangement, so you cannot accidentally add a fee type that does not apply. A guidance message describes the fees you would typically configure for this resident.
{% endstep %}

{% step %}
## Configure the item

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
When you add a Daily Accommodation Payment, the rate is pre-filled from the agreed room price and the interest rate at the time the agreement was signed. You can override it. An Automatic RAD Drawdown option also appears for residents who pay by lump sum, which lets the billing engine draw fees from the deposit balance.
{% endhint %}

## Checking fee rates against Services Australia

For means tested fee types, you can confirm the resident's current rate against Services Australia without reading the fee advice letter by hand.

{% stepper %}
{% step %}
## Select **Check Fee Rates**

Maica calls Services Australia and compares the current rate for each in-scope fee item against what is configured.
{% endstep %}

{% step %}
## Review any differences

If any rates differ, a comparison table shows the current and the new rate for each item, and an **Apply Changes** button appears.
{% endstep %}

{% step %}
## Apply the changes

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
* **Deactivate** stops billing for that fee from today. Maica sets the item's end date to today, which makes it inactive. The item stays visible in the list, greyed out, for audit purposes. You are asked to confirm first.

{% hint style="warning" %}
If you reduce the rate on a Means Tested Care Fee item and the resident has already been charged at the higher rate, you may need to refund the difference. Maica shows a reminder but does not calculate the refund. Process any refund as a credit note or a negative invoice line item on the relevant invoice.
{% endhint %}
