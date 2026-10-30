---
description: Learn about Support at Home Settings in Maica
---

# Support at Home

These settings determine how Maica manages Support at Home features and their function throughout the application. Each Services Australia connection has its own tab. Please refer to the below table for more information on each setting:

| Setting                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Service Provider ID** | The registered provider ID for the connection. It is used to retrieve Support at Home budget data, and the **Sync Service Providers** action populates it from the Care Recipient budgets Services Australia returns.                                                                                                                                                                                                                                                             |
| **Service Provider**    | The provider **Account** that the connection belongs to. It is optional and can be set, changed or cleared until the connection's budgets have been synced. Once they have been synced, the provider Account cannot be switched or cleared, because the synced budgets cannot be moved to another provider plan. The connection tab shows the Account name where one is set, and the Service Provider ID otherwise. To move a provider to another Account, contact Maica support. |

Care Management budgets are held on a provider plan and shown on the provider Account, where they are refreshed. To learn more, see [Care Management Budget Sync](../support-at-home/care-management-budget-sync.md).

{% hint style="info" %}
The **Care Management Budget** field on the AGC Connection Setting is deprecated. It is not read or written by Maica, and any value stored in it is left as it is.
{% endhint %}
