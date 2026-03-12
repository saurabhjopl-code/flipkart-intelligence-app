// js/ui/filterBarRenderer.js

import { dataStore } from "../core/dataStore.js";
import { setFilter } from "../filters/filterState.js";
import { applyFilters } from "../filters/filterEngine.js";
import { renderCurrentPage } from "../binder.js";

export function renderFilterBar() {

    const bar = document.getElementById("filter-bar");

    bar.innerHTML = "";

    const acc = buildACCFilter();
    const range = buildRangeFilter();
    const start = buildDate("Start Date");
    const end = buildDate("End Date");

    bar.appendChild(acc);
    bar.appendChild(range);
    bar.appendChild(start);
    bar.appendChild(end);

}

function buildACCFilter() {

    const group = createGroup("Account");

    const select = document.createElement("select");

    const all = document.createElement("option");
    all.value = "ALL";
    all.text = "All Accounts";

    select.appendChild(all);

    const accs = new Set();

    for (const r of dataStore.CDR) {

        if (r.ACC) accs.add(r.ACC);

    }

    accs.forEach(a => {

        const o = document.createElement("option");

        o.value = a;
        o.text = a;

        select.appendChild(o);

    });

    select.onchange = () => {

        setFilter("ACC", select.value);
        refresh();

    };

    group.appendChild(select);

    return group;

}

function buildRangeFilter() {

    const group = createGroup("Time Range");

    const select = document.createElement("select");

    const ranges = {

        LAST7: "Last 7 Days",
        LAST30: "Last 30 Days",
        THIS_MONTH: "This Month",
        LAST_MONTH: "Last Month"

    };

    for (const r in ranges) {

        const o = document.createElement("option");

        o.value = r;
        o.text = ranges[r];

        select.appendChild(o);

    }

    select.value = "THIS_MONTH";

    select.onchange = () => {

        applyRange(select.value);
        refresh();

    };

    group.appendChild(select);

    return group;

}

function buildDate(labelText) {

    const group = createGroup(labelText);

    const input = document.createElement("input");

    input.type = "date";

    input.onchange = () => {

        setFilter(labelText === "Start Date" ? "startDate" : "endDate", input.value);
        refresh();

    };

    group.appendChild(input);

    return group;

}

function createGroup(labelText) {

    const group = document.createElement("div");

    group.className = "filter-group";

    const label = document.createElement("label");

    label.innerText = labelText;

    group.appendChild(label);

    return group;

}

function refresh() {

    const filtered = applyFilters(dataStore);

    renderCurrentPage(filtered);

}

function applyRange(range) {

    const today = new Date();

    let start = new Date();

    if (range === "LAST7") start.setDate(today.getDate() - 6);

    if (range === "LAST30") start.setDate(today.getDate() - 29);

    if (range === "THIS_MONTH") {

        start = new Date(today.getFullYear(), today.getMonth(), 1);

    }

    if (range === "LAST_MONTH") {

        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        today.setDate(0);

    }

    setFilter("startDate", format(start));
    setFilter("endDate", format(today));

}

function format(d) {

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");

    return `${y}-${m}-${da}`;

}
