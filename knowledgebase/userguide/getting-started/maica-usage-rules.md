---
description: >-
  Learn about how to use Maica and what rules should be followed to ensure Maica
  behaves as expected.
---

# Maica Usage Rules

Maica has been developed on the Salesforce platform which means, as a user, you are able to configure the underlying platform, make changes to page layouts, edit records directly, among many other things. At times, this will compromise the way Maica works and could result in either invalid data or processing errors. The below page outlines how Maica should be used/configured to avoid potential errors or unexpected bahaviours.

### Direct Data Object Access

The list of the below Salesforce Maica data objects can be edited directly. Any data objects not listed below must be interacted with via Maica's user interface components to avoid unexpected behaviour.

| Object               | API Name                            |
| -------------------- | ----------------------------------- |
| Accommodation        | `maica_cc__Accommodation__c`        |
| Availability         | `maica_cc__Availability__c`         |
| Checklist            | `maica_cc__Checklist__c`            |
| Checklist Item       | `maica_cc__Checklist_Item__c`       |
| Client Goal          | `maica_cc__Client_Goal__c`          |
| Client Note          | `maica_cc__Client_Note__c`          |
| Client Note Template | `maica_cc__Client_Note_Template__c` |
| Connection           | `maica_cc__Connection__c`           |
| Goal                 | `maica_cc__Goal__c`                 |
| Invoice              | `maica_cc__Invoice__c`              |
| LGA                  | `maica_cc__LGA__c`                  |
| Location             | `maica_cc__Location__c`             |
| Operating Hour       | `maica_cc__Operating_Hour__c`       |
| Payment              | `maica_cc__Payment__c`              |
| PHN                  | `maica_cc__PHN__c`                  |
| Postcode             | `maica_cc__Postcode__c`             |
| Price List           | `maica_cc__Price_List__c`           |
| Price List Entry     | `maica_cc__Price_List_Entry__c`     |
| Resource             | `maica_cc__Resource__c`             |
| Resource Skill       | `maica_cc__Resource_Skill__c`       |
| Service Agreement    | `maica_cc__Service_Agreement__c`    |
| Skill                | `maica_cc__Skill__c`                |
| Support Item         | `maica_cc__Support_Item__c`         |

{% hint style="info" %}
If you change any of Maica's default configurations, including User Permissions, Page Layouts, Lightning Pages, and User Access, this will be done at your discretion and responsibilty.&#x20;
{% endhint %}

