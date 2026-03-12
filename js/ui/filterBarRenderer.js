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

    const start = document.createElement("input");
    start.type = "date";

    const end = document.createElement("input");
    end.type = "date";

    start.onchange = () => updateDate(start.value, end.value);
    end.onchange = () => updateDate(start.value, end.value);

    bar.appendChild(acc);
    bar.appendChild(range);
    bar.appendChild(start);
    bar.appendChild(end);

}

function buildACCFilter() {

    const select = document.createElement("select");

    const opt = document.createElement("option");
    opt.value = "ALL";
    opt.text = "All Accounts";

    select.appendChild(opt);

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

    return select;

}

function buildRangeFilter() {

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

    return select;

}

function updateDate(start, end) {

    setFilter("startDate", start);
    setFilter("endDate", end);

    refresh();

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
