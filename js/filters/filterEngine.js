import { dataStore } from "../core/dataStore.js";
import { renderCurrentPage } from "../binder.js";

export function applyFilters(data){

    const acc=document.getElementById("filterAcc")?.value;
    const start=document.getElementById("filterStart")?.value;
    const end=document.getElementById("filterEnd")?.value;

    const filtered={};

    for(const sheet in data){

        filtered[sheet]=data[sheet].filter(r=>{

            if(acc && acc!=="All Accounts" && r["ACC"] && r["ACC"]!==acc)
                return false;

            if(start && r["Date"] && r["Date"]<start)
                return false;

            if(end && r["Date"] && r["Date"]>end)
                return false;

            return true;

        });

    }

    return filtered;

}

export function initFilterListeners(){

    const filters=document.querySelectorAll(".filter-control");

    filters.forEach(f=>{

        f.addEventListener("change",()=>{

            const filtered=applyFilters(dataStore);

            renderCurrentPage(filtered);

        });

    });

}
