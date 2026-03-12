// js/ui/filterBarRenderer.js

export function renderFilterBar() {

    const bar = document.getElementById("filter-bar");

    bar.innerHTML = "";

    const acc = createSelect(["ALL"], "Account");

    const timeRange = createSelect(
        ["Last 7 Days", "Last 30 Days", "This Month", "Last Month"],
        "Time Range"
    );

    const month = createSelect(["NOV-25"], "Month");

    const start = document.createElement("input");
    start.type = "date";

    const end = document.createElement("input");
    end.type = "date";

    bar.appendChild(acc);
    bar.appendChild(timeRange);
    bar.appendChild(month);
    bar.appendChild(start);
    bar.appendChild(end);

}



function createSelect(options, label) {

    const wrap = document.createElement("div");

    wrap.style.marginRight = "12px";

    const select = document.createElement("select");

    for (const opt of options) {

        const o = document.createElement("option");

        o.value = opt;
        o.text = opt;

        select.appendChild(o);

    }

    wrap.appendChild(select);

    return wrap;

}
