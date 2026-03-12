// js/filters/filterEngine.js

import { dataStore } from "../core/dataStore.js";
import { renderCurrentPage } from "../binder.js";

function parseDDMMYYYY(dateStr){

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

    const startDate = parseDDMMYYYY(start);
    const endDate = parseDDMMYYYY(end);

    const filtered = {};

    for(const sheet in data){

        filtered[sheet] = data[sheet].filter(row => {

            // Account filter
            if(acc && acc !== "All Accounts" && row["ACC"] && row["ACC"] !== acc)
                return false;

            const dateStr = row["Date"] || row["Order Date"];

            if(!dateStr) return true;

            const rowDate = parseDDMMYYYY(dateStr);

            if(startDate && rowDate < startDate) return false;
            if(endDate && rowDate > endDate) return false;

            return true;

        });

    }

    return filtered;

}

export function initFilterListeners(){

    const filters = document.querySelectorAll(".filter-control");

    filters.forEach(el => {

        el.addEventListener("change", () => {

            const filtered = applyFilters(dataStore);

            renderCurrentPage(filtered);

        });

    });

}
