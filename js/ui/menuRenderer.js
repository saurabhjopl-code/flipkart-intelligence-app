// js/ui/menuRenderer.js

import { renderHome, renderCampaignReport, renderSkuRoiReport } from "../binder.js";
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

    menu.appendChild(buildItem("Home", () => {

        const filtered = applyFilters(dataStore);
        renderHome(filtered);

    }));

    menu.appendChild(buildSection("CDR", [

        {
            label: "Campaign ROI",
            action: () => {

                const filtered = applyFilters(dataStore);
                renderCampaignReport(filtered);

            }
        }

    ]));

    menu.appendChild(buildSection("CFR", [

        {
            label: "SKU ROI",
            action: () => {

                const filtered = applyFilters(dataStore);
                renderSkuRoiReport(filtered);

            }
        }

    ]));

    menu.appendChild(buildSection("CKR", []));
    menu.appendChild(buildSection("PPR", []));
    menu.appendChild(buildSection("GMV", []));

    sidebar.appendChild(menu);

}

function buildItem(label, action) {

    const el = document.createElement("div");

    el.className = "sidebar-item";
    el.innerText = label;

    el.onclick = action;

    return el;

}

function buildSection(title, children) {

    const wrap = document.createElement("div");

    const header = document.createElement("div");
    header.className = "sidebar-item";
    header.innerText = title;

    wrap.appendChild(header);

    children.forEach(child => {

        const sub = document.createElement("div");

        sub.className = "sidebar-item";
        sub.style.paddingLeft = "40px";

        sub.innerText = child.label;

        sub.onclick = child.action;

        wrap.appendChild(sub);

    });

    return wrap;

}
