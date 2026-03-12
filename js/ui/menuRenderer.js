// js/ui/menuRenderer.js

import { dataStore } from "../core/dataStore.js";
import { applyFilters } from "../filters/filterEngine.js";
import { setPage, renderCurrentPage } from "../binder.js";

let activeMenuItem = null;

export function renderSidebar(){

    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = "";

    const title = document.createElement("div");
    title.className = "sidebar-title";
    title.innerText = "Flipkart Intelligence";

    sidebar.appendChild(title);

    sidebar.appendChild(menuItem("Home","HOME"));

    sidebar.appendChild(menuItem("CDR","CDR"));
    sidebar.appendChild(menuItem("CFR","CFR"));
    sidebar.appendChild(menuItem("CKR","CKR"));
    sidebar.appendChild(menuItem("PPR","PPR"));
    sidebar.appendChild(menuItem("GMV","GMV"));

}

function menuItem(label,page){

    const el = document.createElement("div");

    el.className = "sidebar-item";
    el.innerText = label;

    el.onclick = () => {

        if(activeMenuItem)
            activeMenuItem.style.background="";

        el.style.background="#e9f2ff";

        activeMenuItem = el;

        setPage(page);

        const filtered = applyFilters(dataStore);

        renderCurrentPage(filtered);

    };

    return el;

}
