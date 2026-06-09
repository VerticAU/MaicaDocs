---
description: Learn how to configure Public Holidays within Maica
---

# Public Holiday Configuration

## How do I configure Holidays in Maica?

In order to configure Holidays within **Maica**, please follow the steps outlined below:&#x20;

### 1. Head to `Setup` and search for `Holidays`

To begin creating Holiday records, head to the Salesforce `Setup` and search for `Holidays`, as shown below.&#x20;

<figure><img src="../.gitbook/assets/public holiday search.png" alt=""><figcaption></figcaption></figure>

### 2. Create a New `Holiday`&#x20;

Once you have opened the `Holiday` tab, click the `New` button to create a new `Holiday`.&#x20;

{% hint style="info" %}
Maica supports both State and National Holidays.&#x20;
{% endhint %}

Please refer to the following naming conventions for both State and National Holidays:&#x20;

**State Based Holidays**

* In order to create a **State** specific Holiday, simply ensure that you include **both** the Short and Long `State Suffix` from the table below
* For example: to create a **Victorian only** Holiday for the **Melbourne Cup** on 01/11/2022, you need to use the following `Holiday Name`: `Melbourne Cup (VIC) (Victoria)`

**National Holidays**

* In order to create a **National** Holiday, simply ensure that you type **only** the `Holiday Name` and do not include any reference to a `State Suffix` from the table below
* For example: to create a National Holiday for **Christmas Day** on 25/12/2022, you need to use the following `Holiday Name`: `Christmas Day`

| State Name                   | State Name Suffix (Short) | State Name Suffix (Long)         |
| ---------------------------- | ------------------------- | -------------------------------- |
| Victoria                     | `(VIC)`                   | `(Victoria)`                     |
| New South Wales              | `(NSW)`                   | `(New South Wales)`              |
| Queensland                   | `(QLD)`                   | `(Queensland)`                   |
| Western Australia            | `(WA)`                    | `(Western Australia)`            |
| South Australia              | `(SA)`                    | `(South Australia)`              |
| Tasmania                     | `(TAS)`                   | `(Tasmania)`                     |
| Australian Capital Territory | `(ACT)`                   | `(Australian Capital Territory)` |
| Northern Territory           | `(NT)`                    | `(Northern Territory)`           |
| National                     | Blank                     | Blank                            |

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

### 3. Link your `Holiday` to a `Business Hour` Record

Once you have created your `Holiday` Records, it is crucial to link them to a `Business Hour` Record. To do so, first select the `Holiday` and then click the `Add/Remove` button under `Business Hours`, as shown below. &#x20;

<figure><img src="../.gitbook/assets/add business hours.png" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
If you have not already defined Business Hours in **Maica**, you must do so first. To learn more, click [here](public-holiday-configuration.md#how-do-i-configure-business-hours-in-maica).&#x20;
{% endhint %}

After clicking the `Add/Remove` button, you will be directed to a page which allows you choose to which `Business Hours` the selected `Holiday` applies.&#x20;

{% hint style="info" %}
In order for **Maica's** validation to run effectively, ensure you select **`Maica Holidays`** as your Selected Business Hours, as shown below.&#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/save business hours.png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="110">Action</th><th>Description </th></tr></thead><tbody><tr><td>1.</td><td>Select <code>Maica Holidays</code> as your Business Hours record to assign to the Holiday.</td></tr><tr><td>2.</td><td>Hit <code>Add</code> to move it from <code>Available Business Hours</code> to <code>Selected Business Hours</code>.</td></tr><tr><td>3.</td><td>Click Save to finalise your changes.</td></tr></tbody></table>

Once done, you will see your Business Hour record has been successfully added to your Holiday, as shown below.&#x20;

<figure><img src="../.gitbook/assets/business hours added.png" alt=""><figcaption></figcaption></figure>

## How do I configure Business Hours in Maica?

In order to configure Business Hours within **Maica**, please follow the steps outlined below:&#x20;

### 1. Head to `Setup` and search for `Business Hours`

To begin creating Holiday records, head to the Salesforce `Setup` and search for `Holidays`, as shown below.&#x20;

<figure><img src="../.gitbook/assets/business hours search.png" alt=""><figcaption></figcaption></figure>

### 2. Create New `Business Hours`&#x20;

Once you have opened the `Business Hours` tab, click the `New Business Hours` button to create a new record.&#x20;

Next, follow the below outlined steps:&#x20;

| Step                                        | Note                                                                                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ol><li>Business Hours Name</li></ol>       | When creating a Business Hours record to associate with Holidays, ensure you name it **Maica Holidays**.                                          |
| <ol start="2"><li>Time Zone</li></ol>       | Select your relevant Time Zone.                                                                                                                   |
| <ol start="3"><li>Business Hours </li></ol> | Again, when creating a Business Hours record to associate with Holidays, leave this stage at its default value. (24 hours selected for each day). |

{% hint style="info" %}
Ensure when completing Step 1, you mark your Business Hours as `Active` by clicking the Checkbox located below the name input.&#x20;
{% endhint %}

Finally, hit `Save` to finalise your Record.&#x20;
