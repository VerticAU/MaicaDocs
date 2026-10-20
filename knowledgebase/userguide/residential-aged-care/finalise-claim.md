# Finalise Claim

## What is Finalise Claim?

**Finalise Claim** is the action that closes a residential aged care claim month at Services Australia. Once the month has been closed, Services Australia triggers the final payment calculation for it, and the claim moves on through approval and payment.

It is run from the monthly **Claim Batch**, after you have submitted the month's accommodation balances and synced the claim. The action is available for **Permanent** and **Respite** claims.

{% hint style="danger" %}
Finalising cannot be undone from Maica. Once Services Australia accepts the finalise, the claim month is closed. Check the claim position on the Claim Batch before you finalise.
{% endhint %}

{% hint style="info" %}
This article sits within the monthly claim cycle described in [Monthly Claim Batch and Claims Sync](monthly-claim-batch-and-claims-sync.md). For how balances are submitted before you finalise, see [Reporting RAD/RAC Balances](how-maica-connects-to-services-australia/reporting-rad-rac-balances.md).
{% endhint %}

## Where do I find Finalise Claim?

**Finalise Claim** is a quick action on the **Claim Batch** record. On the packaged Claim Batch page it is shown when all of the following are true:

* The Claim Batch is for a **Permanent** or **Respite** claim
* The **Claim Status** is no longer **New**
* You hold the **Can Manage RACS Claims** custom permission

{% hint style="info" %}
The **Can Manage RACS Claims** permission is granted by the **Maica - RACS - Claims Management** permission set, and it also controls who can run **Sync Claim Batch**. On the packaged Claim Batch page, **Generate Claim Batch** and **Check Status** are hidden for Permanent and Respite claims, since those claims are not built from Maica.
{% endhint %}

{% hint style="warning" %}
If you cannot see **Finalise Claim**, ask your administrator to check that the action has been added to the Claim Batch page layout and to your active Claim Batch Lightning record page, and that you are assigned the **Maica - RACS - Claims Management** permission set. Page layouts and Lightning record pages in an existing organisation are not updated automatically when Maica is upgraded.
{% endhint %}

## When is a claim month ready to finalise?

Maica only offers the Finalise button when the claim month is ready. The claim is ready when all of the following are true:

* The claim is a **Permanent** or **Respite** claim
* The **Location** has a **Service ID**, and the Claim Batch has a **Claim Period Start Date**
* The **Claim Status** is **Submitted**, which is how Maica shows a claim month that Services Australia still has open
* The **Balance Submission Status** is **Complete**, meaning the accommodation balances for the month have been submitted
* The claim has been synced, so the **Claim Last Sync** time is populated

Where something is missing, the action explains what to do first and no Finalise button is shown.

| What the action tells you                                                   | What to do                                                                         |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Finalise Claim is only available for Permanent and Respite claim batches    | Use a Permanent or Respite Claim Batch                                             |
| Service ID is not set on the Location for this Claim Batch                  | Add the Service ID to the Location                                                 |
| Claim Period Start Date is not set for this Claim Batch                     | Set the **Claim Period Start Date** on the Claim Batch                             |
| Submit the claim to Services Australia first                                | Wait until the **Claim Status** is **Submitted**                                   |
| Finalise is only available while the Claim Status is Submitted              | The claim has moved past **Submitted**, so it can no longer be finalised from here |
| This claim has been cancelled by Services Australia and cannot be finalised | No further action in Maica. The claim month cannot be finalised                    |
| Submit Accommodation Balances first                                         | Submit the month's balances, then return to the action                             |
| Sync the claim batch first                                                  | Run **Sync Claim Batch**, then return to the action                                |

{% hint style="info" %}
Where the accommodation balances were submitted but the **Balance Submission Status** could not be recorded on the Claim Batch, Maica shows an error that says so, because **Finalise Claim** depends on that status. Run the balance submission again to record it.
{% endhint %}

## How to finalise a claim month

{% stepper %}
{% step %}
#### Open the Claim Batch

Open the Claim Batch for the claim month you want to close.
{% endstep %}

{% step %}
#### Sync the claim

Run **Sync Claim Batch** so Maica holds the latest position from Services Australia. To learn how the sync works, see [Monthly Claim Batch and Claims Sync](monthly-claim-batch-and-claims-sync.md).
{% endstep %}

{% step %}
#### Submit the accommodation balances

If you have not already done so for this month, submit the balances from the Claim Batch. See [Reporting RAD/RAC Balances](how-maica-connects-to-services-australia/reporting-rad-rac-balances.md).
{% endstep %}

{% step %}
#### Click Finalise Claim

Click **Finalise Claim**. The action shows the Location and the claim period. When the month is ready, a Finalise button is shown.
{% endstep %}

{% step %}
#### Confirm the finalise

Click the Finalise button. Maica checks the claim month again and sends the finalise to Services Australia. When it is accepted, the action shows that the month has been finalised, and the Claim Batch is updated with the result.
{% endstep %}
{% endstepper %}

## What Maica checks when you finalise

Maica does not rely on what the screen showed when you opened the action. When you confirm, it:

{% stepper %}
{% step %}
#### Read the current claim

Reads the current claim from Services Australia.
{% endstep %}

{% step %}
#### Check that the claim month is ready

Checks again that the claim month is ready, using the same rules described above.
{% endstep %}

{% step %}
#### Send the finalise

Sends the finalise to Services Australia.
{% endstep %}
{% endstepper %}

If the claim has changed at Services Australia since you opened the action, Services Australia refuses the finalise and Maica asks you to refresh the page and try again.

{% hint style="info" %}
A finalise needs a current claim from Services Australia. If Maica does not hold one, the action asks you to sync the Claim Batch and try again.
{% endhint %}

## When the month is already finalised

If Services Australia has already closed the month, for example because it was finalised from another place, the action shows an **already finalised** panel instead of the Finalise button, and updates the Claim Batch from Services Australia. Maica treats any **Claim Status** past **Submitted**, other than **Cancelled**, as finalised.

## If the refresh after finalising does not complete

Sometimes Services Australia accepts the finalise but Maica cannot refresh the Claim Batch straight afterwards. In this case Maica still reports the finalise as successful, because the claim month is closed at Services Australia, and shows a warning asking you to run **Sync Claim Batch** to update the Claim Status. A refresh problem is never reported as a failed finalise.

## Example scenarios

| Scenario                                                                                 | What happens                                                                         |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| A Permanent claim is **Submitted**, its balances are **Complete** and it has been synced | The Finalise button is shown                                                         |
| The accommodation balances have not been submitted                                       | The action asks you to submit balances first, and no Finalise button is shown        |
| The claim has not been synced                                                            | The action asks you to sync the Claim Batch first                                    |
| The **Claim Status** is already past **Submitted**                                       | The action shows the already finalised panel and updates the Claim Batch             |
| The **Claim Status** is **Cancelled**                                                    | The action explains that the claim cannot be finalised                               |
| The claim changed at Services Australia while the action was open                        | Services Australia refuses the finalise, and Maica asks you to refresh and try again |
| Services Australia accepts the finalise but the refresh fails                            | The finalise is reported as successful, with a warning to run **Sync Claim Batch**   |
