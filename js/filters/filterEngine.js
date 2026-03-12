// js/filters/filterEngine.js

import { dataStore } from "../core/dataStore.js";
import { renderCurrentPage } from "../binder.js";

function parseDateDDMMYYYY(dateStr){

    if(!dateStr) return null;

    const parts = dateStr.split("/");

    if(parts.length !== 3) return null;

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);

    return new Date(year, month, day);

}

export function applyFilters(data){

    const acc = document.getElementById("filterAcc")?.value;
    const start = document.getElementById("filterStart")?.value;
    const end = document.getElementById("filterEnd")?.value;

    const startDate = parseDateDDMMYYYY(start);
    const endDate = parseDateDDMMYYYY(end);

    const filtered = {};

    for(const sheet in data){

        filtered[sheet] = data[sheet].filter(row => {

            // account filter
            if(acc && acc !== "All Accounts" && row["ACC"] && row["ACC"] !== acc)
                return false;

            const rowDateStr = row["Date"] || row["Order Date"];

            if(!rowDateStr) return true;

            const rowDate = parseDateDDMMYYYY(rowDateStr);

            if(startDate && rowDate < startDate) return false;
            if(endDate && rowDate > endDate) return false;

            return true;

        });

    }

    return filtered;

}

export function initFilterListeners(){

    const filters = document.querySelectorAll(".filter-control");

    filters.forEach(f => {

        f.addEventListener("change", () => {

            const filtered = applyFilters(dataStore);

            renderCurrentPage(filtered);

        });

    });

}
