---
description: Learn about Permission Sets & Groups in Maica
---

# Permission Groups & Sets

{% hint style="success" %}
#### Useful Definitions&#x20;

#### What is a Permission?

In Salesforce, a _permission_ is an individual access control that determines what a user can do—like viewing records, editing fields, or running processes. Permissions can apply to objects, fields, system features, or custom-built components.

#### What is a Permission Set?

A _Permission Set_ is a collection of these permissions grouped together under a single label. It allows you to extend a user's access without changing their profile. Unlike the Profile, where you can only have one, a User can have many Permission Sets assigned.&#x20;

#### What is a Permission Set Group?

A _Permission Set Group_ bundles multiple Permission Sets into a single package. This makes it easier to assign all required permissions for a specific job function or system area.&#x20;
{% endhint %}

## How is Permission Managed in Maica?

In **Maica**, Permission is managed by leveraging [Permission Sets](https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/perm_sets_overview.htm) and [Permission Set Groups](https://help.salesforce.com/s/articleView?id=platform.perm_set_groups.htm\&type=5), using a layered approach to enable flexibility.&#x20;

Every custom object in Maica—such as Appointments, Invoices, and Notes—as well as any core Salesforce object that Maica interacts with, has corresponding Permission Sets. These will fall into one of two categories:&#x20;

1. **Object-based**, which control access to individual objects (Create, Read, Edit, Delete)
2. **Functional**, which control access to Maica functionality like claiming or integration tools.&#x20;

Then, to simplify assignment to Users, these Permission Sets are categorised into **Permission Set Groups**, allowing you to quickly apply the right combination of access for specific roles or responsibilities.&#x20;

{% hint style="info" %}
If you need guidance assigning Permission Sets or Permission Set Groups to users in Salesforce, [click here](https://help.salesforce.com/s/articleView?id=xcloud.assign_permission_set_to_user.htm\&type=5).&#x20;
{% endhint %}

## Permission Breakdown

So, let's break it down further.&#x20;

#### Permission Set Groups

As mentioned, Permission Set Groups are used to bundle multiple related Permission Sets together. These groups represent a functional area or role—for example, the **Manage Invoices & Object Permissions** set groups together Billing related Permission Sets.&#x20;

When you assign any Permission Set Group to a user, they inherit all the individual Permission Sets contained within that group. Using our example of the **Manage Invoices & Object Permissions** group, any User assigned this Group would gain permission sets for Invoices, Payments, Logs, Support Items, and more.

{% hint style="success" %}
To view the full breakdown of which Permission Sets are apart of which Permission Set Group, [click here](https://docs.google.com/spreadsheets/d/1a8OjLtT9ErQQ9YI2XIUpxS78Bl3Trtf3xJbsVq1Bnbo/edit?usp=sharing).&#x20;
{% endhint %}

#### Permission Sets

As also mentioned, each Permission Set in **Maica** falls into one of two categories:

**1. Object-Based Permission Sets**

These sets grant access to core Data Objects in Maica and are broken down further based on the **CRUD model**:

* **Create**
* **Read Only**
* **Edit**
* **Delete**

Each object in Maica—such as Invoices, Appointments, or Accommodation—has its own **four distinct Permission Sets**, one for each of the access types listed above. For example, the object “Accommodation” has four separate permission sets:

* `Maica – Accommodation – Create Access`
* `Maica – Accommodation – Edit Access`
* `Maica – Accommodation – Delete Access`
* `Maica – Accommodation – Read Only Access`

Object-based sets ensure granular control over what users can do with individual data types in Maica—whether that’s just viewing a record or creating and editing new ones.&#x20;

For a detailed breakdown of the Object and Field-level Permissions included in each access type, see the [section below](./#object-based-permission-structure-in-maica).

{% hint style="warning" %}
Please note, for non Maica objects, i.e. `Contact` and `Account`, the Maica Object Permission Sets provide access to Maica custom fields only.\
\
For example, the Maica - Contact - Create Access Permission Set would provide Read and Edit access to the `NDIS Number` field (`maica_cc__NDIS_Number__c`) but not the standard Email field.
{% endhint %}

**2. Functional Permission Sets**

Functional sets control access to a **specific feature or process** within Maica. These aren’t tied to single objects, but rather to functional workflows. For example: Submitting NDIS Claims.

These sets typically include logic or automation in the background and often require users to have appropriate object-level permissions in place as well.

{% hint style="success" %}
Please note, a single **Permission Set Group** can contain both types of Permission Sets
{% endhint %}

## Object-Based Permission Structure in Maica

As mentioned above, each object in Maica has its access broken down into four Permission Set types: **Create Access**, **Edit Access**, **Delete Access**, and **Read Only Access**.

It’s important to clarify the distinction between:

* The **object** itself (e.g. _Accommodation_, _Invoice_), and
* The **Object Permissions** applied _within_ a Permission Set for that object (e.g. _Read_, _Edit_, _View All Fields_).

Each Permission Set corresponds to one access type for one object (e.g. `Maica - Accommodation – Create Access`) and includes Salesforce-defined **Object Permissions** and **Field Permissions** to control what users can do.

For every Object Permission Set, you’ll find two key areas:

* **Object Permissions**: Define what a user can do with the object as a whole (e.g. create or delete records, view all fields).
* **Field Permissions**: Define which individual fields a user can read or modify on that object.

{% hint style="info" %}
In Salesforce, **Field Permissions** are often referred to as **FLS**
{% endhint %}

The table below outlines what is included in each type of Permission Set:

| Permission Type      | Object Permissions                             | Field Permissions                                              |
| -------------------- | ---------------------------------------------- | -------------------------------------------------------------- |
| **Create Access**    | <p>- Read<br>- Create<br>- View All Fields</p> | <p>- Read Access (on all required fields)<br>- Edit Access</p> |
| **Edit Access**      | <p>- Read<br>- Edit<br>- View All Fields</p>   | <p>- Read Access<br>- Edit Access (on editable fields)</p>     |
| **Delete Access**    | <p>- Read<br>- Edit<br>- Delete</p>            | <p>- Read Access<br>- Edit Access (on editable fields)</p>     |
| **Read Only Access** | <p>- Read<br>- View All Fields</p>             | - Read Access only                                             |

Let’s take a closer look at how this structure works using the **Maica - Accommodation – Create Access** Permission Set as an example, as shown below.&#x20;

<figure><img src="../../.gitbook/assets/image (1).png" alt="" width="535"><figcaption></figcaption></figure>

**Object Permissions**

As this is a Create Access Permission Set, the following object-level permissions are enabled:

* ✅ **Read**&#x20;
* ✅ **Create**&#x20;
* ✅ **View All Fields**&#x20;

**Field Permissions**

And, underneath the object-level access, field-level access is also defined. For a Create Access Permission Set like the one shown, the user has:

* ✅ **Read Access**&#x20;
* ✅ **Edit Access**&#x20;

To learn more about the breakdown of **Permission Set Groups** in Maica and see descriptions of what each group provides access to, [click here](permission-set-groups-overview.md).
