---
description: Learn about Maps Management Settings in Maica
---

# Maps Management

These settings determine how Maica manages Maps and its function throughout the application. Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Google API Key</code></td><td><p>This is your <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">Google Maps API Key</a> that can be set up in your Google administration platform. By using your own Google Maps API Key, it will be possible to report, within the Google platform, on all requests, locations, routes requested via Maica.<br><br>To ensure Maica functions correctly, the following APIs must be enabled in your Google project:<br></p><ol><li><strong>Routes API</strong></li><li><strong>Geocoding API</strong><br></li></ol><p>For guidance on enabling these APIs and retrieving your API key, please refer to the section <a href="maps-management.md#setting-up-your-google-api-key">below</a>.</p></td></tr><tr><td><code>Travel Warning Tolerance (Minutes)</code></td><td>Maica warns you if the required travel time exceeds to the available time prior to any given Appointment. In other words, if you are not going to make it on time, Maica alerts you to this via a warning icon. This setting defines the tolerance duration used to determine when this warning should display.<br><br><em>An example might be setting this tolerance to <code>5 minutes</code> which means that if Google estimates you to be late by more than <code>5 minutes</code>, the warning will show.</em></td></tr><tr><td><code>Default Origin/Destination Order</code></td><td>This determines the order in which Maica calculates the distance and travel time required to get to/from any given Appointment. In other words, what origin and destination Maica will use first, second, and so forth to calculate the initial travel times.</td></tr></tbody></table>

## **Setting Up Your Google API Key**&#x20;

The below section outlines the steps required to enable Google Maps functionality in Maica by setting up your own Google API Key, including enabling the necessary APIs and updating your Maica settings:

1. **Go to the Google Cloud Console**\
   [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Select your project**\
   In the top menu, select the project you’re working on (or create a new one if needed).
3. **Open the API Library**\
   a. In the left-hand menu, go to **APIs & Services > Library**\
   b. Search for **Routes API** (you may also see **Directions API** if that’s part of your routing setup), followed by the **Geocoding API**.
4. **Enable the required APIs**\
   a. Click on and enable both the **Routes API** and **Geocoding API**

{% hint style="info" %}
Please note, Google Maps APIs require billing to be enabled, even for free usage. If billing is not enabled, then:<br>

1. Go to **Billing > Manage Billing Accounts**
2. Make sure billing is enabled on your selected project
{% endhint %}

5. **Get Your API Key**\
   a. Go to **APIs & Services > Credentials**\
   b. Create or select an **API key**
6. **Update Maica Settings**\
   a. In Maica, go to **Settings > Maps Management**\
   b. Paste your Google API Key into the **Google API Key** field and click **Save**.

## **Rotating Your Google API Key**&#x20;

The below section outlines the steps required to rotate your own Google API Key:&#x20;

{% hint style="info" %}
This may be necessary if your Key becomes outdated or you receive `Bad Request` error messages within Maica when travel values are attempted to be calculated.
{% endhint %}

1. Open the Google Cloud Console Credentials page.
2. Click the name of the API key you want to roll.
3. Click Rotate key at the top of the screen.
4. Choose a new name if needed, then click Create.
5. Copy the new key and update your application code.
6. Delete the old key from your credentials list once your app finishes migrating.
7. Paste the updated key into the Maica Settings.&#x20;
