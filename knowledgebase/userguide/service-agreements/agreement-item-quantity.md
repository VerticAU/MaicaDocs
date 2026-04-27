---
description: >-
  Understand the difference between manually entered and schedule-calculated
  Agreement Item quantities, and how this affects the Budget Trend Analysis.
---

# Agreement Item Quantity

In **Maica**, when you add or edit an Agreement Item on a Service Agreement, there are two ways to set the `Quantity`:

1. **Via the Manage Agreement Item modal** - where **Maica** calculates the `Quantity` automatically based on the schedule options you configure (Period, Service Day, Service Frequency, Quantity/Duration, etc.).
2. **Directly in the Agreement Items table row** - where you manually type a `Quantity` value into the table.

While both methods will update the `Quantity` displayed in the Agreement Items table, they behave very differently when it comes to how **Maica** calculates projected figures in the **Budget Trend Analysis** component.

{% hint style="warning" %}
**Maica** strongly recommends configuring Agreement Items through the `Manage Agreement Item` modal to ensure that projected budget calculations are accurate. Manually editing the `Quantity` in the table row can result in a mismatch between the displayed quantity and the values used by the Budget Trend Analysis.&#x20;
{% endhint %}

### How Does Maica Calculate Quantity?

When you configure an Agreement Item through the `Manage Agreement Item` modal, **Maica** calculates the total `Quantity` based on the schedule options you provide. These include:

| Field                 | Description                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `Period`              | The date range for the Agreement Item. Options include `Custom`, `Active Plan Managed`, and `Service Agreement Managed`.    |
| `Service Day`         | The type of day the service is delivered on, such as `Weekday`, `Saturday`, `Sunday`, `Public Holiday`, or `Anytime`.       |
| `Service Frequency`   | How often the service recurs, such as `Daily`, `Weekly`, `Monthly`, or `One Time`.                                          |
| `Days of the Week`    | The specific days the service is scheduled (e.g., `Tuesday` and `Friday`). Available when the frequency is set to `Weekly`. |
| `Quantity` (Duration) | The duration of each individual service instance. A value of 1 is equivalent to 1 hour.                                     |

**Maica** uses these options together to determine how many service instances fall within the Agreement Item's date range, and then multiplies that count by the `Quantity` (Duration) to produce the `Total Quantity`.

For example, an Agreement Item configured as:

* Period: 1 Jan 2026 - 30 Jun 2026
* Service Day: Weekday
* Frequency: Weekly, every 1 week
* Days of the Week: Tuesday and Friday
* Quantity (Duration): 4 hours

**Maica** will count all Tuesdays and Fridays within the date range, multiply by 4 hours, and calculate the `Total Quantity` accordingly.

### What Happens When You Edit the Quantity Manually?

The Agreement Items table on the `Manage Services` interface allows you to edit the `Quantity` field directly in the table row. If you change this value manually, the table will display your updated quantity and recalculate the `Total` (Quantity x Rate) accordingly.

However, **this manual change does not update the underlying schedule configuration** in the `Manage Agreement Item` modal. The modal will still retain the original schedule options, meaning **Maica** will still calculate the `Quantity` based on those options whenever it needs to project expenditure.

{% hint style="danger" %}
The `Budget Trend Analysis` component uses the schedule-based calculation from the `Manage Agreement Item` modal to project Estimated Expenditure for each quarter. It does **not** use the manually entered `Quantity` from the table row. If these values differ, the Budget Trend Analysis will display projected expenditure figures that do not align with the quantities shown in the Agreement Items table.
{% endhint %}

### Example

Consider an Occupational Therapy Agreement Item where the intended service is a single 5.49-hour session:

**What the user entered in the table row:**

* Quantity: `5.49`
* Rate: `$230.00`
* Total: `$1,262.70`

**What the Manage Agreement Item modal shows:**

* Period: `Service Agreement Managed` (1 Nov 2025 - 30 Jun 2026)
* Service Day: `Anytime`
* Service Frequency: `One Time`
* Quantity (Duration): `1,099.96`

Because the schedule configuration was not updated to reflect the intended single session, **Maica** calculates a `Total Quantity` of `1,099.96` based on the modal settings. The Budget Trend Analysis will use this calculated value, producing an Estimated Expenditure of approximately `$252,990.80` for this Agreement Item - far higher than the `$1,262.70` the user intended.

### How to Fix a Misconfigured Agreement Item

If an Agreement Item has been manually edited in the table row and the schedule configuration no longer matches the intended service, you should reconfigure it through the `Manage Agreement Item` modal.

For the example above, to correctly configure a one-off 5.49-hour Occupational Therapy session:

1. Open the `Manage Services` Quick Action on the Service Agreement.
2. Click the edit icon on the relevant Agreement Item to open the `Manage Agreement Item` modal.
3. Set the `Period` to `Custom`.
4. Set the `Start Date` and `End Date` to the same single day (e.g., `23 Mar 2026 - 23 Mar 2026`).
5. Set the `Service Frequency` to `One Time`.
6. Set the `Quantity` (Duration) to `5.49`.
7. Click `Submit` to save your changes.

After reconfiguring, the `Total Quantity` in the modal will display `5.49`, and the Budget Trend Analysis will correctly project the expenditure for this item as a single occurrence within the relevant quarter.

{% hint style="info" %}
As a general rule, always use the `Manage Agreement Item` modal to configure or update Agreement Items. This ensures that the schedule options, quantity, and all projected budget calculations remain aligned and accurate.&#x20;
{% endhint %}

### Related

* [Manage Services](https://claude.ai/service-agreements/agreement-management/aged-care-agreements/manage-services.md)
* [Agreement Item Building Blocks](https://claude.ai/service-agreements/the-building-blocks.md#agreement-items)
* [Budget Trend Analysis](https://claude.ai/service-agreements/agreement-management/aged-care-agreements/manage-services.md#budget-trend-analysis)
