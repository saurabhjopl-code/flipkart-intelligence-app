import { dataStore } from "../core/dataStore.js";
import { renderCurrentPage } from "../binder.js";

function parseDate(dateStr){

    if(!dateStr) return null;

    const [d,m,y] = dateStr.split("/");

    return new Date(y,m-1,d);

}

export function applyFilters(data){

    const acc = document.getElementById("filterAcc")?.value;

    const filtered = {};

    for(const sheet in data){

        filtered[sheet] = data[sheet].filter(row => {

            if(acc && acc !== "All Accounts" && row["ACC"] && row["ACC"] !== acc)
                return false;

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
