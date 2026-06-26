# Welcome

This Administration Guide explains how Maica's Residential Aged Care Services (RACS) solution is built, configured, and integrated. It is written for administrators, implementers, and support staff who set the solution up and keep it running, rather than the staff who use it day to day.

Use it to understand the data model and architecture, configure the global rates and settings that drive billing, set up the Services Australia integration, and configure the reporting and reconciliation services. For how to carry out resident-facing tasks, see the companion User Guide.

{% hint style="info" %}
Setting the solution up for the first time? Start with [Prerequisites and Dependencies](/broken/pages/c7db68913560da66d5bafded747abe0901ec58ae), then [The RACS Configuration Tab](/broken/pages/fd2ae121a12e8b0367c63eb0410635dba566858b).
{% endhint %}

## What's in this guide

* **Solution Architecture and Concepts** covers the solution overview, the design principles behind it, and the data model that underpins everything else. See [The RACS Data Model](/broken/pages/30b853dd63a9c8969b77b1e308dcd9ec9af6e1fa).
* **Installation and Initial Configuration** sets out the packages, platform, and access the solution needs before you configure it. See [Prerequisites and Dependencies](/broken/pages/c7db68913560da66d5bafded747abe0901ec58ae).
* **RACS Settings and Rate Configuration** covers the global rates, caps, indexation values, and automation toggles on the RACS Configuration tab. See [The RACS Configuration Tab](/broken/pages/fd2ae121a12e8b0367c63eb0410635dba566858b).
* **The Billing Engine** explains how the engine turns Agreement Items into invoices, the fee type rules, billing dates and catch-up chains, fee rate detection, indexation, and scheduling. See [Billing Engine Architecture](/broken/pages/170009e26cd689a891c1e2bc9c746f59018f9ee0).
* **Lump Sum and Accommodation Configuration** covers the Lump Sum Account model, retention and drawdown logic, and the combination payment method. See [The Lump Sum Account Model](/broken/pages/42a6bf4fba247773ca746ae7835af9943ad54bb7).
* **Services Australia API Integration** covers the integration architecture and event lifecycle, PRODA authentication, and the outbound and inbound APIs. See [Integration Architecture and Event Lifecycle](/broken/pages/24e0506610eda09b67d2fc0a27f986d67552179b).
* **Reporting and Compliance Configuration** is where you configure the reporting capability matrix, QFR reports, SIRS incident capture, the 24/7 RN coverage check, and the APCS export tool. See [Reporting Capability Matrix](/broken/pages/0a64d3b47a3ec5a9ee238a3107750fa4db04247a).
* **Adjustments and Reconciliation Services** explains how the fee adjustment and statement reconciliation services work. See [Fee Adjustment Service](/broken/pages/9c57900ffc6a1d595d777b53b200e351bad88d20).

{% hint style="info" %}
Looking for how to complete resident-facing tasks? That lives in the **User Guide**.
{% endhint %}
