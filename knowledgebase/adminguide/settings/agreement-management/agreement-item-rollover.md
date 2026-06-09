---
description: Learn about Agreement Item Rollover Settings in Maica
---

# Agreement Item Rollover

_Configure automatic funding rollover from expiring Agreement Items to the next period, and the daily batch schedule._

**Enable Funding Rollover** When enabled, Maica will automatically process Agreement Item funding rollover via a nightly batch job. Unspent funds from a completed agreement period will be rolled into the next period's Total Allocated amount where a valid next period exists within the configured gap tolerance. When disabled, rollover must be triggered manually via the Rollover Quick Action on the Agreement Item record.

**Gap Tolerance** Defines the maximum number of days between the end of one agreement period and the start of the next for automatic rollover to be triggered. If the gap between periods exceeds this value, the rollover will not be processed automatically and will require manual intervention.

**Rollover Job Time** The time at which the nightly funding rollover batch job will run each day. It is recommended to schedule this outside of peak usage hours to minimise any impact on system performance.
