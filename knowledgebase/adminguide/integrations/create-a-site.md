---
description: Learn how to Create a Site in Maica
---

# Create a Site

## What is a Site in Salesforce?&#x20;

In Salesforce, a **Site**:&#x20;

> Enables you to create public websites and applications that are directly integrated with your Salesforce organisation—without requiring users to log in with a username and password. You can publicly expose any information stored in your organisation through a branded URL of your choice.

**Sites** are critical for securely sharing data and integrating with external systems while maintaining control and security over the exposed functionality.&#x20;

{% hint style="info" %}
To learn more about Sites in Salesforce, click [here](https://help.salesforce.com/s/articleView?id=sf.sites_overview.htm\&type=5).&#x20;
{% endhint %}

## Why are they important in Maica?&#x20;

In **Maica**, a **Site** is essential for enabling successful and automated integrations with external platforms like Xero, Stripe, and NDIS through **webhooks**.&#x20;

The Site essentially acts as a public-facing endpoint that the external systems can communicate with to send and receive real-time updates, such as payment confirmations or notification handling. In this context, the **Site** facilitates the secure exchange of data by exposing specific parts of the **Maica** environment to these external platforms, allowing them to trigger actions in **Maica** (e.g., updating participant records or processing payments) without requiring manual intervention.&#x20;

By using **webhooks**, the integration becomes more efficient and automated, as events are instantly relayed between systems, ensuring timely and accurate updates across all platforms.&#x20;

So, before we can configure any integration on **Maica**, we must ensure our **Site** is created and set up correctly.&#x20;

## How do I create a Site?&#x20;

In order to effectively create a **Site** in your Salesforce instance, please refer the following Salesforce articles:

1. [Enable Salesforce Sites](https://help.salesforce.com/s/articleView?id=sf.sites_creating_subdomain.htm\&type=5)&#x20;
2. [Setup Salesforce Sites](https://help.salesforce.com/s/articleView?id=sf.sites_setup_overview.htm\&type=5)&#x20;
3. [Create and Edit Salesforce Sites](https://help.salesforce.com/s/articleView?id=sf.sites_creating_and_editing_sites.htm\&type=5)
4. [Configure Salesforce Sites](https://help.salesforce.com/s/articleView?id=sf.sites_configuring_sites.htm\&type=5)

## Things to look out for: Sites in Maica&#x20;

### 1. Site Fields&#x20;

Once your **Site** has been created, there are a few components necessary for ensuring they are successful in **Maica** and your integrations.&#x20;

<figure><img src="../.gitbook/assets/site steps.png" alt="" width="563"><figcaption></figcaption></figure>

| Field                        | Description                                                                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Site Label` & `Site Name`   | This is the name of the site as it appears in the user interface. We recommend a generic term to suit all integrations: such as **Maica** **Notifications**.   |
| `Default Web Address`        | This is the unique Salesforce Site URL for this site. We recommend a generic term to suit all integrations: such as **Notifications**.                         |
| `Active`                     | Ensure this field is checked so the **Site** is `Active` upon Save.                                                                                            |

In addition, ensure the below boxes are checked and you use the recommended `Clickjack Protection Level`.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-09-06 at 11.25.16 am.png" alt="" width="563"><figcaption></figcaption></figure>

### 2. Site Timezone

Once you have configured your **Site** fields and assigned the appropriate naming conventions, it is important to assign the correct timezone to your Site Guest User.&#x20;

{% hint style="info" %}
When you create a **Salesforce Site**, Salesforce automatically generates a **Guest User** for that site. The guest user profile allows public access to the site for unauthenticated users, such as visitors or external systems interacting with your site.
{% endhint %}

You do so by heading to the your Site Profile.&#x20;

To get your Site Profile, follow the below listed steps:&#x20;

1. **Select Your Site**: In the list of your sites, find the site that you set up (in our case, the one called Maica Notifications) and click on the **Site Label**.
2. **View the Site Details**: On the site details page, click on the **Public Access Settings** button.
3. **Navigate to the Profile**: This link will take you to the **Site Guest User Profile** for that site. You can then click **Assigned Users** to see the Site Guest User associated with the site.

Once there, select the `Full Name` in order to assign the correct timezone to your Site Guest User, as shown below.

<figure><img src="../.gitbook/assets/full name.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
`Maica Notifications Profile` is the profile that defines what the guest user can access, including permissions for objects, fields, and other settings.
{% endhint %}

After selecting your Site Guest User, simply click `Edit` and change the timezone to Australian Eastern Standard Time (or your relevant Time Zone), as shown below.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-09-06 at 2.22.16 pm.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Setting the correct timezone for the **Site Guest User** ensures that data synchronised between **Maica** and external platforms is timestamped consistently, improving accuracy, compliance, and reliability across both systems.
{% endhint %}

### 3. Assign Permission Sets&#x20;

As well as setting the correct timezone for our Site Guest User, it is important to assign the relevant permission sets in order to make Integrations work seamlessly. You do this from the same `Profile` as shown above.&#x20;

Once on the Site Guest User Profile, simply scroll down `Permission Set Assignments` and click `Edit Assignments`.  Here, you can add the relevant Permissions for your Organisations Integrations, the relevant Permissions are as follows:&#x20;

<table><thead><tr><th width="392.45703125">Permission Set</th><th>Description </th></tr></thead><tbody><tr><td><code>Maica - Handle Webhook Notifications</code></td><td>Provides the ability to process the Webhook Notifications.</td></tr></tbody></table>

