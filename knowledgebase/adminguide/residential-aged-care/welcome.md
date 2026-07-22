# Welcome

This Administration Guide explains how Maica's Residential Aged Care Services (RACS) solution is built, configured, and integrated. It is written for administrators, implementers, and support staff who set the solution up and keep it running, rather than the staff who use it day to day.

Use it to understand the data model and architecture, configure the global rates and settings that drive billing, set up the Services Australia integration, and configure the reporting and reconciliation services. For how to carry out resident-facing tasks, see the companion User Guide.

{% hint style="info" %}
Setting the solution up for the first time? Start with [Prerequisites and Dependencies](prerequisites-and-dependencies.md), then [The RACS Configuration Tab](/broken/pages/0ae4e45ff9f83e2a3a240a31c2b87a029130a33f).
{% endhint %}

## What's in this guide

* **Solution Architecture and Concepts** covers the solution overview, the design principles behind it, and the data model that underpins everything else. See [The RACS Data Model](racs-solution-overview/the-racs-data-model.md).
* **Installation and Initial Configuration** sets out the packages, platform, and access the solution needs before you configure it. See [Prerequisites and Dependencies](prerequisites-and-dependencies.md).
* **RACS Settings and Rate Configuration** covers the global rates, caps, indexation values, and automation toggles on the RACS Configuration tab. See [The RACS Configuration Tab](/broken/pages/0ae4e45ff9f83e2a3a240a31c2b87a029130a33f).
* **The Billing Engine** explains how the engine turns Agreement Items into invoices, the fee type rules, billing dates and catch-up chains, fee rate detection, indexation, and scheduling. See [Billing Engine Architecture](/broken/pages/b7195ce1cf837817529312a0e2744f8340bb42e3).
* **Lump Sum and Accommodation Configuration** covers the Lump Sum Account model, retention and drawdown logic, and the combination payment method. See [The Lump Sum Account Model](the-lump-sum-account-model/).
* **Services Australia API Integration** covers the integration architecture and event lifecycle, PRODA authentication, and the outbound and inbound APIs. See [Integration Architecture and Event Lifecycle](integration-architecture-and-event-lifecycle/).
* **Reporting and Compliance Configuration** is where you configure the reporting capability matrix, QFR reports, SIRS incident capture, the 24/7 RN coverage check, and the APCS export tool. See [Reporting Capability Matrix](reporting-capability-matrix/).
* **Adjustments and Reconciliation Services** explains how the fee adjustment and statement reconciliation services work. See [Fee Adjustment Service](fee-adjustment-service.md).

{% hint style="info" %}
Looking for how to complete resident-facing tasks? That lives in the **User Guide**.
{% endhint %}

