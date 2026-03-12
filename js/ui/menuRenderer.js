// js/ui/menuRenderer.js

import { renderHome, renderCampaignReport } from "../binder.js";
import { dataStore } from "../core/dataStore.js";
import { applyFilters } from "../filters/filterEngine.js";

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = "";

    const title = document.createElement("div");

    title.className = "sidebar-title";

    title.innerText = "Flipkart Intelligence";

    sidebar.appendChild(title);



    const menu = document.createElement("div");

    menu.className = "sidebar-menu";



    const home = createItem("Home", () => {

        const filtered = applyFilters(dataStore);

        renderHome(filtered);

    });



    const cdr = createItem("CDR", () => {

        const filtered = applyFilters(dataStore);

        renderCampaignReport(filtered);

    });



    menu.appendChild(home);
    menu.appendChild(cdr);

    sidebar.appendChild(menu);

}



function createItem(text, handler) {

    const el = document.createElement("div");

    el.className = "sidebar-item";

    el.innerText = text;

    el.onclick = handler;

    return el;

}
