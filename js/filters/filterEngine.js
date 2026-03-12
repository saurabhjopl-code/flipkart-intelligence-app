// js/filters/filterEngine.js

import { dataStore } from "../core/dataStore.js";
import { renderCurrentPage } from "../binder.js";

export function applyFilters(data){

    const acc = document.getElementById("filterAcc")?.value;
    const start = document.getElementById("filterStart")?.value;
    const end = document.getElementById("filterEnd")?.value;

    const filtered = {};

    for(const sheet in data){

        filtered[sheet] = data[sheet].filter(row => {

            // Account filter
            if(acc && acc !== "All Accounts" && row["ACC"] && row["ACC"] !== acc)
                return false;

            // Date filter
            const date = row["Date"] || row["Order Date"];

            if(start && date && date < start)
                return false;

            if(end && date && date > end)
                return false;

            return true;

        });

    }

    return filtered;

}


export function initFilterListeners(){

    const filters = document.querySelectorAll(".filter-control");

    filters.forEach(f => {

        f.addEventListener("change", handleFilterChange);

    });

}


function handleFilterChange(){

    const filtered = applyFilters(dataStore);

    renderCurrentPage(filtered);

}
