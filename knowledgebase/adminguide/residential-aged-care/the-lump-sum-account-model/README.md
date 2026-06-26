# The Lump Sum Account model

The lump sum account model is the financial ledger that Maica uses to track a resident's refundable accommodation deposit. It is made up of two custom objects: the **Lump Sum Account** (`maica_cc__Lump_Sum_Account__c`), which holds the running balance and lifecycle status, and the **Lump Sum Transaction** (`maica_cc__Lump_Sum_Transaction__c`), which records every individual movement against that balance. Together they give each resident a complete, auditable history of their deposit from first payment through to refund.

This article describes both objects, their relationship, and the fields that drive them. It is written for administrators and power users who configure, report on, or support the residential aged care solution.

{% hint style="info" %}
For the day-to-day workflow that creates and maintains these records, see the user guide article [Managing RAD/RAC Accommodation Deposits](/broken/pages/3a9c405f6e4149d4aa9488eee039810763cc4d6d). For the wider object map, see [The RACS Data Model](../racs-solution-overview/the-racs-data-model.md).
{% endhint %}

## How the two objects fit together

A resident who pays for their accommodation as a lump sum (a Refundable Accommodation Deposit, a Refundable Accommodation Contribution, or a legacy Accommodation Bond) has exactly one Lump Sum Account, linked to their Service Agreement. Every payment, retention deduction, draw-down, and refund against that deposit is then written as a child Lump Sum Transaction.

Not every resident has a Lump Sum Account. Residents who pay by Daily Accommodation Payment only, and fully supported residents, have no lump sum obligation and therefore no account.

| Object                   | Role                                                                                                                             | Created by                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Lump Sum Account**     | The standing account. Holds the current balance, payment method, retention dates, and refund details. One per Service Agreement. | A user, through the RAD/RAC tab of the Manage RACS Agreement component.                                    |
| **Lump Sum Transaction** | A single balance movement. Holds the amount, date, type, and the balance after the movement. Many per account.                   | The billing engine (retention deductions, automatic draw-downs) or a user (payments, draw-downs, refunds). |

### Object relationships

The relationship types are deliberate and protect the financial audit trail.

| Relationship                             | Type                     | Behaviour                                                                                                                                                                                |
| ---------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lump Sum Account to Service Agreement    | Lookup (Restrict Delete) | A Lookup rather than Master-Detail. If the parent Service Agreement were ever deleted, a Master-Detail would cascade-delete the entire deposit ledger. The Lookup preserves the records. |
| Lump Sum Transaction to Lump Sum Account | Master-Detail            | Transactions have no meaning outside their account. The account can only be deleted before any financial activity exists, in which case its transactions cascade-delete with it.         |

{% hint style="warning" %}
Because the Lump Sum Account to Service Agreement relationship restricts delete, a Service Agreement that carries a lump sum account cannot be deleted while that account exists. This is intentional and protects the deposit history.
{% endhint %}

## The Lump Sum Account object

The Lump Sum Account represents the financial account for a resident's RAD, RAC, or legacy Accommodation Bond. Field history tracking is enabled on **Current Balance** and **Status** so changes to those two values are retained.

### Identity and linkage fields

| Field (API name)                                           | Type        | Description                                                                                                                                                                                                             | Help text                                                                                                           |
| ---------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Lump Sum Account ID** (`Name`)                           | Auto Number | The unique, system-generated identifier for the account, in the form `LSA-{number}`.                                                                                                                                    | System-generated identifier for this lump sum account.                                                              |
| **Service Agreement** (`maica_cc__Service_Agreement__c`)   | Lookup      | The Service Agreement this account belongs to. One account per agreement where a lump sum applies.                                                                                                                      | The service agreement this RAD, RAC, or Bond account belongs to.                                                    |
| **Deposit Type** (`maica_cc__Deposit_Type__c`)             | Picklist    | Whether the account holds a Refundable Accommodation Deposit, a Refundable Accommodation Contribution, or a legacy Accommodation Bond. Determines which regulatory framework and refund obligations apply on departure. | Whether this account holds a RAD, RAC, or legacy Accommodation Bond.                                                |
| **Payment Method** (`maica_cc__Payment_Method__c`)         | Picklist    | How the resident is paying for their accommodation: Full Lump Sum, Combination, DAP Only, or Undecided. Drives whether a daily DAP portion applies.                                                                     | How the resident is paying their accommodation costs.                                                               |
| **DAP Agreement Item** (`maica_cc__DAP_Agreement_Item__c`) | Lookup      | A direct link to the resident's Daily Accommodation Payment fee item, used to recalculate the DAP rate when the balance changes. Populated for Combination residents only.                                              | The DAP Agreement Item to update when this account's balance changes. Required for Combination payment method only. |

### Balance and payment fields

| Field (API name)                                                   | Type                | Description                                                                                                                                                                                           | Help text                                                                                                 |
| ------------------------------------------------------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Agreed Room Price** (`maica_cc__Agreed_Room_Price__c`)           | Currency            | The agreed accommodation price, copied from the Service Agreement for convenience. Used in the DAP portion calculation for Combination residents.                                                     | The accommodation price agreed with the resident. Mirrors the Agreed Room Price on the service agreement. |
| **Current Balance** (`maica_cc__Current_Balance__c`)               | Currency, read only | The lump sum currently held by the provider. Updated automatically each time a transaction is processed. On permanent departure, the remaining balance must be refunded within legislated timeframes. | Current lump sum balance held by the provider. Updated automatically by each transaction.                 |
| **Initial Payment Amount** (`maica_cc__Initial_Payment_Amount__c`) | Currency            | The first lump sum payment received. For Full Lump Sum this equals the lump sum equivalent of the room price; for Combination it is the partial component only.                                       | The initial lump sum received. For Combination arrangements, this is the partial lump sum component only. |
| **Initial Payment Date** (`maica_cc__Initial_Payment_Date__c`)     | Date                | The date the first lump sum payment was received. Starts the retention deduction period. A resident has up to six months from entry to pay their lump sum, paying a DAP in the meantime.              | Date the initial lump sum was received. Starts the retention deduction period.                            |

### Retention and DAP fields

| Field (API name)                                                      | Type                       | Description                                                                                                                                                              | Help text                                                                                                                                               |
| --------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Retention Start Date** (`maica_cc__Retention_Start_Date__c`)        | Date                       | The date from which retention deductions may begin, usually the same as the Initial Payment Date. Used with the retention duration on Setting to derive the expiry date. | Date retention deductions can begin. Usually the same as the initial payment date.                                                                      |
| **Retention Expiry Date** (`maica_cc__Retention_Expiry_Date__c`)      | Date, read only            | The date after which no further retention may be deducted. Calculated as the Retention Start Date plus the legislated retention duration (currently five years).         | Retention cannot be deducted after this date. Calculated from retention start date plus the legislated duration.                                        |
| **DAP Portion** (`maica_cc__DAP_Portion__c`)                          | Currency, read only        | For Combination residents only: the daily DAP amount payable on the part of the room price not covered by the lump sum. Recalculated whenever the balance changes.       | Daily DAP amount for the portion of the room price not covered by the lump sum. Combination payment method only. Recalculated when the balance changes. |
| **Cumulative Retention Amount** (`maica_cc__Cumulative_Retention__c`) | Roll-Up Summary, read only | The total retention deducted from the deposit, summed automatically from child Retention Deduction transactions as positive values. Used for audit and reconciliation.   | Total retention deducted from this lump sum. Auto-calculated from related lump sum transactions.                                                        |
| **Cumulative Draw-Down Amount** (`maica_cc__Cumulative_Draw_Down__c`) | Roll-Up Summary, read only | The total drawn down from the deposit, summed automatically from child Draw-Down transactions as positive values. Used for audit and DAP recalculation.                  | Total amount drawn down from this lump sum. Auto-calculated from related lump sum transactions.                                                         |

{% hint style="info" %}
The two cumulative fields are Roll-Up Summaries that the platform maintains automatically from the child transactions. They source the positive **Deduction Amount** formula on each transaction rather than the signed **Amount**, so the totals always display as positive numbers. Never set them directly.
{% endhint %}

{% hint style="warning" %}
The exact API names of the cumulative roll-up fields are mid-transition in the codebase (a legacy currency field is being replaced by a roll-up summary). Confirm the field names against your installed package version before building reports or integrations against them.
{% endhint %}

### Status and refund fields

The account moves through a defined lifecycle, recorded on **Status**.

| Status value       | Meaning                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| `Awaiting Payment` | The account has been set up but no lump sum has been received yet. This is the default on creation.     |
| `Active`           | An initial payment has been recorded and the account is live.                                           |
| `Refunded`         | The balance has been returned to the resident and the account is closed.                                |
| `Transferred`      | The deposit has been transferred (for example, on a move to another service) and the account is closed. |

These refund fields are populated by the system, not through the RAD/RAC tab, and they fill in across two stages. At departure the account stays **Active** while the Departure Processor records the departure snapshot: the **Refund Amount**, **Refund Due Date**, and **BIR at Departure**. The remaining fields, **Refund Date**, **MPIR at Refund Due**, and **Total Interest Paid**, are set when the refund payment is recorded, and that is the point at which the status moves to **Refunded**.

| Field (API name)                                                | Type                | Description                                                                                                                                                                                                                                                      | Help text                                                                                                                                      |
| --------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Refund Amount** (`maica_cc__Refund_Amount__c`)                | Currency, read only | The amount refunded on permanent departure, equal to the balance at departure less any permitted deductions.                                                                                                                                                     | Amount refunded on departure. Populated by the Departure Processor when the agreement is closed.                                               |
| **Refund Due Date** (`maica_cc__Refund_Due_Date__c`)            | Date                | The date by which the refund must legally be paid. Calculated at departure: the departure date itself where 14 or more days' notice was given, otherwise 14 days after departure; for a death departure, set to departure plus 14 days until probate is sighted. | Date by which the refund must be paid. Calculated by the system at departure. For death departures, update this field when probate is sighted. |
| **Refund Date** (`maica_cc__Refund_Date__c`)                    | Date                | The date the balance was actually refunded. Entered by the user when the refund is made.                                                                                                                                                                         | Date the refund was paid to the resident. Update this field when the refund is made.                                                           |
| **BIR at Departure** (`maica_cc__BIR_At_Departure__c`)          | Percent, read only  | The Base Interest Rate current at departure, snapshotted from Setting. Used to calculate refund interest.                                                                                                                                                        | The BIR rate at the time of departure. Set automatically by the system. Used to calculate interest on the refund.                              |
| **MPIR at Refund Due Date** (`maica_cc__MPIR_At_Refund_Due__c`) | Percent, read only  | The Maximum Permissible Interest Rate current when the refund was recorded, snapshotted from Setting. Used to calculate any overdue interest.                                                                                                                    | The MPIR rate at the time the refund was recorded. Set automatically by the system. Used to calculate overdue interest.                        |
| **Total Interest Paid** (`maica_cc__Total_Interest_Paid__c`)    | Currency, read only | The total refund interest paid on departure, combining base and overdue interest. Zero or blank where the refund was paid on time.                                                                                                                               | Total interest paid to the resident on refund of their lump sum. Calculated at the time the refund date is recorded.                           |

{% hint style="info" %}
Refund calculation and the snapshotting of interest rates are owned by the Departure Processor. They are covered in the user guide articles on [Exiting a Resident](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/exiting-a-resident-or-recording-a-death) and [Refunding Lump Sum Deposits](https://app.gitbook.com/s/hehRshYIRk6XUlay9L3b/residential-aged-care/refunding-lump-sum-deposits).
{% endhint %}

## The Lump Sum Transaction object

Each Lump Sum Transaction records a single financial movement against an account. The transaction records are themselves the audit trail, so field history tracking is not enabled. Their sharing is controlled by the parent account.

### How the ledger stays consistent

Three fields work together to keep the ledger readable and reconcilable:

* **Amount** is the signed ledger entry. Positive values are inflows (money received by the provider); negative values are outflows (retention deductions, draw-downs, and refunds). Balance mathematics always use this signed value.
* **Balance After Transaction** captures the account balance immediately after the movement was applied. This lets you reconstruct the balance at any point in time without replaying the whole history.
* **Deduction Amount** is a formula field, `ABS(Amount)`, that always returns a positive number. The cumulative roll-ups on the account use this field so the totals read as positive.

| Field (API name)                                               | Type                | Description                                                                                                                                                                            | Help text                                                                                                                                    |
| -------------------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lump Sum Transaction ID** (`Name`)                           | Auto Number         | The unique, system-generated identifier, in the form `LST-{number}`.                                                                                                                   | System-generated identifier for this transaction.                                                                                            |
| **Lump Sum Account** (`maica_cc__Lump_Sum_Account__c`)         | Master-Detail       | The parent account this transaction belongs to.                                                                                                                                        | The lump sum account this transaction applies to.                                                                                            |
| **Transaction Type** (`maica_cc__Transaction_Type__c`)         | Picklist            | The kind of financial movement (see the table below).                                                                                                                                  | The type of financial movement. Positive values are inflows; negative values are outflows or refunds.                                        |
| **Amount** (`maica_cc__Amount__c`)                             | Currency            | The signed value of the movement. Positive for inflows, negative for outflows.                                                                                                         | Transaction amount. Positive for inflows, negative for outflows.                                                                             |
| **Transaction Date** (`maica_cc__Transaction_Date__c`)         | Date                | The date the movement occurred or was processed.                                                                                                                                       | Date this transaction occurred.                                                                                                              |
| **Balance After Transaction** (`maica_cc__Balance_After__c`)   | Currency, read only | The account balance immediately after this movement. Supports audit and balance reconstruction.                                                                                        | Account balance immediately after this transaction. Used for audit and balance reconstruction.                                               |
| **Deduction Amount** (`maica_cc__Deduction_Amount__c`)         | Formula (Currency)  | The always-positive version of Amount, used by the cumulative totals on the parent account.                                                                                            | Always-positive version of the transaction amount, used by cumulative total fields on the parent lump sum account.                           |
| **Source** (`maica_cc__Source__c`)                             | Picklist            | Whether the billing engine or a user created this transaction.                                                                                                                         | Whether this transaction was created by the billing engine or entered manually.                                                              |
| **Description** (`maica_cc__Description__c`)                   | Text Area           | Notes for the transaction. System transactions carry the calculation or draw-down breakdown; users may add their own notes.                                                            | Notes or description for this transaction. System transactions include the calculation or drawdown breakdown.                                |
| **DAP Rate After Transaction** (`maica_cc__DAP_Rate_After__c`) | Currency, read only | For Combination residents: the recalculated DAP rate after this movement changed the balance. Recorded for audit.                                                                      | The recalculated DAP rate after this transaction. Combination payment method only. Populated by the billing engine.                          |
| **Invoice Line Item** (`maica_cc__Invoice_Line_Item__c`)       | Lookup              | The invoice line item that triggered this transaction. Populated for system retention deductions and automatic draw-downs only.                                                        | The invoice line item that triggered this transaction. Populated for system-generated retention deductions and automatic RAD drawdowns.      |
| **Payment** (`maica_cc__Payment__c`)                           | Lookup, read only   | For automatic draw-downs: the Payment record raised against the invoice to settle the drawn amount. Gives a direct audit link between the balance movement and the invoice settlement. | The payment record that settled the invoice for this drawdown. Populated by the billing engine for automatic RAD drawdown transactions only. |

### Transaction types

The Transaction Type picklist classifies each movement and, by convention, signals whether the Amount is an inflow or an outflow.

| Type                  | Direction          | Created by                  | Notes                                                                                                                         |
| --------------------- | ------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `Initial Payment`     | Inflow (positive)  | User                        | The first lump sum payment. Sets the account to Active and seeds the retention dates.                                         |
| `Additional Payment`  | Inflow (positive)  | User                        | A later top-up payment, up to the agreed room price.                                                                          |
| `Retention Deduction` | Outflow (negative) | Billing engine              | A legislated retention amount deducted from the deposit. See [Retention and Drawdown Logic](retention-and-drawdown-logic.md). |
| `Draw-Down`           | Outflow (negative) | Billing engine or user      | Funds drawn from the deposit to settle a fee (automatic) or returned for another reason (user).                               |
| `DAP Adjustment`      | Either             | System                      | An adjustment relating to the DAP portion.                                                                                    |
| `Refund`              | Outflow (negative) | User or Departure Processor | A partial refund while in care, or the final exit refund.                                                                     |
| `Transfer In`         | Inflow (positive)  | System                      | A deposit transferred into this account.                                                                                      |
| `Transfer Out`        | Outflow (negative) | System                      | A deposit transferred out of this account.                                                                                    |
| `Adjustment`          | Either             | User                        | A manual correction to the ledger.                                                                                            |
| `Interest`            | Inflow (positive)  | System                      | Refund interest applied to the account.                                                                                       |

### Source: system versus user

The **Source** field draws a clear line between automated and manual entries, which matters for both audit and the way the transaction history is displayed.

| Source value               | Meaning                                                                                                           |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `System (Billing Engine)`  | Created automatically by the billing engine: retention deductions and automatic RAD draw-downs.                   |
| `User (Managed Agreement)` | Created by a user through the RAD/RAC tab: initial and additional payments, user draw-downs, and partial refunds. |

{% hint style="info" %}
In the transaction history on the RAD/RAC tab, system-generated entries are visually distinguished from user-led entries so staff can tell at a glance which movements came from the billing engine.
{% endhint %}

## How transactions are created

Two paths write to the ledger, and they never overlap on the same movement type.

* **The billing engine** creates Retention Deduction and automatic Draw-Down transactions as part of the nightly run. These carry a Source of System (Billing Engine), link back to the Invoice Line Item that triggered them, and (for draw-downs) link to the settling Payment. The mechanics are covered in [Retention and Drawdown Logic](retention-and-drawdown-logic.md).
* **Users** create Initial Payment, Additional Payment, user Draw-Down, and Refund transactions through the RAD/RAC tab. Users cannot create Retention Deduction transactions, and automatic draw-downs are never initiated by hand.

In both cases the write is atomic: the new transaction and the updated account balance are committed together, so the ledger and the **Current Balance** can never drift apart.
