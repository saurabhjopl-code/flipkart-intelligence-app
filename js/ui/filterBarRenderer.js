// js/ui/filterBarRenderer.js

import { dataStore } from "../core/dataStore.js";
import { setFilter } from "../filters/filterState.js";
import { applyFilters } from "../filters/filterEngine.js";
import { renderHome } from "../binder.js";

export function renderFilterBar() {

    const bar = document.getElementById("filter-bar");

    bar.innerHTML = "";

    const accSelect = buildACCFilter();
    const rangeSelect = buildRangeFilter();

    const start = document.createElement("input");
    start.type = "date";

    const end = document.createElement("input");
    end.type = "date";

    start.onchange = () => updateDate(start.value, end.value);
    end.onchange = () => updateDate(start.value, end.value);

    bar.appendChild(accSelect);
    bar.appendChild(rangeSelect);
    bar.appendChild(start);
    bar.appendChild(end);

}

function buildACCFilter() {

    const select = document.createElement("select");

    const values = new Set();

    for (const r of dataStore.CDR) {

        if (r.ACC) values.add(r.ACC);

    }

    const optAll = document.createElement("option");
    optAll.value = "ALL";
    optAll.text = "All Accounts";
    select.appendChild(optAll);

    values.forEach(v => {

        const o = document.createElement("option");
        o.value = v;
        o.text = v;

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

    const ranges = [
        "LAST_7",
        "LAST_30",
        "THIS_MONTH",
        "LAST_MONTH"
    ];

    const labels = {
        LAST_7: "Last 7 Days",
        LAST_30: "Last 30 Days",
        THIS_MONTH: "This Month",
        LAST_MONTH: "Last Month"
    };

    ranges.forEach(r => {

        const o = document.createElement("option");

        o.value = r;
        o.text = labels[r];

        if (r === "THIS_MONTH") o.selected = true;

        select.appendChild(o);

    });

    select.onchange = () => {

        applyRange(select.value);

        refresh();

    };

    return select;

}

function applyRange(range) {

    const today = new Date();

    let start = new Date();

    if (range === "LAST_7") {

        start.setDate(today.getDate() - 6);

    }

    if (range === "LAST_30") {

        start.setDate(today.getDate() - 29);

    }

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

function updateDate(start, end) {

    setFilter("startDate", start);
    setFilter("endDate", end);

    refresh();

}

function refresh() {

    const filtered = applyFilters(dataStore);

    renderHome(filtered);

}

function format(d) {

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const da = String(d.getDate()).padStart(2, "0");

    return `${y}-${m}-${da}`;

}
