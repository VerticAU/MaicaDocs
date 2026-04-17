# disconnecting

If you need to switch to a different Salesforce org, revoke access, or troubleshoot a broken connection, you can disconnect at any time.

## How to Disconnect

1. Open any form in the form builder
2. Locate the **Salesforce** panel in the settings sidebar
3. Click **Disconnect**
4. Confirm the action

Your Salesforce connection is immediately removed. All your forms remain intact — only the active connection is deleted.

## Impact of Disconnecting

| What changes                                               | What doesn't change                               |
| ---------------------------------------------------------- | ------------------------------------------------- |
| Salesforce features are disabled until you reconnect       | Your forms and their settings are preserved       |
| New submissions will not sync to Salesforce                | Existing submissions are unchanged                |
| Merge field previews will not work in the template builder | Form schemas with SF field mappings are preserved |

{% hint style="info" %}
If someone submits a form while you are disconnected and the form has Salesforce sync enabled, the submission will be saved with a **failed** sync status. The data is not lost — it will be in the submissions table and can be re-processed once you reconnect (or handled manually).
{% endhint %}

## Reconnecting

Follow the steps in [Connecting to Salesforce](/broken/pages/7ae4e9b30ff71693f4bdd1e736c7099c34e78938). You can reconnect to the same org or a different one. If you reconnect to a different org, make sure any field mappings in your forms still refer to valid object and field names in the new org.

## Revoking Access from Salesforce Directly

To remove Maica Forms' access at the Salesforce level:

1. In Salesforce, go to **Setup → My Personal Information → OAuth and Approved Apps** (or **Settings → Connected Apps OAuth Usage** in newer orgs)
2. Find **Maica Forms** and click **Revoke**

This invalidates the tokens stored in Maica Forms. You will need to reconnect from within the app to restore functionality.
