---
description: Learn how to Manage Preferences of Participant(s) in Maica
---

# Manage Preferences

## What are Participant Preferences?&#x20;

In **Maica**, Preferences capture the Participant(s) Preferences when receiving a Service. Preferences can be allocated one of three possible states, these include the following:&#x20;

| Preference State | Description                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Required`       | Required Preferences indicate essential items for a Participant when a Service is being delivered. This could include but is not exclusive to a language or strict Time of Day they are available.                                                                                               |
| `Excluded`       | Excluded Preferences indicate essential items to keep out for a Participant when a Service is being delivered. This could include but is not exclusive to an individual Resource they do not want to work with or a Time of Day they are not available.                                          |
| `Preferred`      | Preferred Preferences indicate items that a Participant would like when a Service is being delivered, but are not required for the Service to go ahead. This could include but is not exclusive to an individual Resource they enjoy being with or a Gender of Resource they would rather have.  |

## How do I Manage Participant Preferences?

The best way to get started with Managing Preferences is to go to a Participant Profile and simply clicking the `Manage Preferences` button located in the top right corner of the interface, as shown below.

<figure><img src="../.gitbook/assets/manage preferences.png" alt=""><figcaption></figcaption></figure>

Once you click this button, **Maica** will present a pop-up which allows you to add new preferences or edit existing ones, as shown below.&#x20;

<figure><img src="../.gitbook/assets/Screenshot 2024-08-13 at 3.08.21 pm.png" alt=""><figcaption></figcaption></figure>

To add a new Preference, simply click on the `Add` button located in the top right corner of this pop-up and select which type of Preference you would like to set up. The Preference options are further explained [below](manage-preferences.md#what-types-of-preferences-can-i-manage). To edit an existing Preference, simply click the `Pen` icon located to the right hand side of any existing Participant Preference.&#x20;

## What types of Preferences can I manage?

There are three types of Participant Preference Categories you can manage, these include:&#x20;

| Preference Category               | Description                                                                                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Resource/Asset Preference`       | This refers to the ability to specify preferences for specific Resource(s) or Asset(s), such as whether you want to work with a specific individual or not, or, in a specific room or not. |
| `Resource Attribute Preference`   | This refers to the ability to specify preferences for specific Resource(s) attributes, such as Gender or Age.                                                                              |
| `Resource Skill Preference`       | This refers to the ability to specify preferences for specific Resource(s) skills, such as the ability to Administrator Medication.                                                        |

When selected, all of these Categories will have the same Input Fields can be completed. There is one exception to this, and this is the lookup. The lookup will be specific to the selection. Meaning, if you choose to add a `Resource Skill Preference`, the lookup will show a list of available Skills, and if you choose a `Resource/Asset Preference`, it will show a list of available Resource(s) & Asset(s).&#x20;

{% hint style="info" %}
If you are adding a Resource Attribute Preference, and a Resource Attribute is selected, then a second input is shown to capture the value of this attribute. For example, if you choose a Resource attribute of `Gender` , an additional input will show to allow you to assign a specific `Gender` to it.
{% endhint %}

The table and image below shows a list of the Participant Preference Input Fields required to finalise a Preference. The `Resource Attribute Preference` pop-up has been used as an example.&#x20;

<figure><img src="../.gitbook/assets/preference input fields.png" alt="" width="503"><figcaption></figcaption></figure>

| Input Field                                      | Description                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ol><li>Lookup </li></ol>                        | This lists all fields that are available for selection specific to the [Preference Category](manage-preferences.md#what-types-of-preferences-can-i-manage) selected, and allows for one to selected as a Preference.                                                                                                                                              |
| <ol start="2"><li>Value Lookup </li></ol>        | This **only** applies to a `Resource Attribute Preference`. When a Resource Attribute is selected, this allows for an additional value to be captured.                                                                                                                                                                                                            |
| <ol start="3"><li>Preference State </li></ol>    | <p>This allows for the Preference to be assigned one of three possible states, including: <br><br>1. <a href="manage-preferences.md#what-are-participant-preferences">Required</a> <br>2. <a href="manage-preferences.md#what-are-participant-preferences">Excluded</a> <br>3. <a href="manage-preferences.md#what-are-participant-preferences">Preferred</a></p> |
| <ol start="4"><li>Start Date </li></ol>          | This allows for a Start Date to be selected in which the Preference becomes effective.                                                                                                                                                                                                                                                                            |
| <ol start="5"><li>End Date </li></ol>            | This allows for a End Date to be selected in which the Preference stops being effective. If left blank, the Preference will always be effective.                                                                                                                                                                                                                  |
| <ol start="6"><li>Appointment Service </li></ol> | This allows for a Preference to be specific to an Appointment Service. For example, if a Participant required an English speaker only whilst receiving a particular Service.                                                                                                                                                                                      |

