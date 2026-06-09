---
description: Learn about General Connections Management Settings in Maica
---

# General Settings

These settings determine how gender is interpreted within Maica when generating reciprocal Connections.

Please refer to the below table for more information on each setting:&#x20;

<table><thead><tr><th width="222">Setting</th><th>Description</th></tr></thead><tbody><tr><td><code>Gender Field</code></td><td><p>Specifies which field in your Salesforce org represents a Contact’s gender. Maica uses this field to determine the appropriate reciprocal Connection. </p><p></p><p>For example, if you create a Connection from a "Mother" Contact and the selected Contact is Female, Maica will generate a reciprocal Connection of "Daughter" (instead of "Son").</p></td></tr><tr><td><code>Male Values</code></td><td><p>Define which values from the selected Gender Field should be interpreted as Male. </p><p></p><p>To assign a value to Male, select it from the Available list and click the right arrow to move it to the Selected list.</p></td></tr><tr><td><code>Female Values</code></td><td>Define which values from the selected Gender Field should be interpreted as Female.<br><br>To assign a value to Female, select it from the Available list and click the right arrow to move it to the Selected list.</td></tr></tbody></table>

{% hint style="info" %}
Any values not added to the Male or Female columns will automatically be treated as Neutral. Neutral values will generate reciprocal Connections based on the "Neutral" column in the Reciprocal Settings.
{% endhint %}
