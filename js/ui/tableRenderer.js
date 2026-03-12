// js/ui/tableRenderer.js

export function renderTable(columns, rows) {

    const table = document.createElement("table");

    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.background = "white";
    table.style.border = "1px solid #e4e7ec";

    const thead = document.createElement("thead");

    const headRow = document.createElement("tr");

    for (const col of columns) {

        const th = document.createElement("th");

        th.innerText = col.label;

        th.style.textAlign = "left";
        th.style.padding = "10px";
        th.style.borderBottom = "1px solid #e4e7ec";

        headRow.appendChild(th);

    }

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (const row of rows) {

        const tr = document.createElement("tr");

        for (const col of columns) {

            const td = document.createElement("td");

            td.innerText = row[col.key];

            td.style.padding = "10px";
            td.style.borderBottom = "1px solid #f2f4f7";

            tr.appendChild(td);

        }

        tbody.appendChild(tr);

    }

    table.appendChild(tbody);

    return table;

}
