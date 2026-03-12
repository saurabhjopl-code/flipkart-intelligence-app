// js/ui/menuRenderer.js

import { dataStore } from "../core/dataStore.js";
import { applyFilters } from "../filters/filterEngine.js";
import { setPage, renderCurrentPage } from "../binder.js";

let activeItem = null;

export function renderSidebar(){

    const sidebar = document.getElementById("sidebar");
    sidebar.innerHTML = "";

    sidebar.appendChild(title("Flipkart Intelligence"));

    sidebar.appendChild(menuItem("Home","HOME"));

    sidebar.appendChild(section("CDR",[
        ["Campaign ROI","CDR_ROI"],
        ["Campaign Spend Trend","CDR_SPEND"],
        ["Campaign Efficiency","CDR_EFF"],
        ["Budget Allocation","CDR_BUDGET"]
    ]));

    sidebar.appendChild(section("CFR",[
        ["SKU ROI","CFR_SKU_ROI"],
        ["Hero SKU","CFR_HERO"],
        ["Ad Waste","CFR_WASTE"],
        ["Ad Dependency","CFR_DEP"]
    ]));

    sidebar.appendChild(section("CKR",[
        ["Keyword ROI","CKR_ROI"],
        ["Keyword Efficiency","CKR_EFF"],
        ["Keyword Opportunity","CKR_OPP"],
        ["Negative Keywords","CKR_NEG"]
    ]));

    sidebar.appendChild(section("PPR",[
        ["Placement ROI","PPR_ROI"],
        ["Placement CTR","PPR_CTR"],
        ["Placement Conversion","PPR_CONV"]
    ]));

    sidebar.appendChild(section("GMV",[
        ["Hero Products","GMV_HERO"],
        ["Category Performance","GMV_CAT"],
        ["Return Risk","GMV_RETURN"],
        ["Growth Momentum","GMV_GROWTH"]
    ]));

}

function title(text){

    const el = document.createElement("div");
    el.className = "sidebar-title";
    el.innerText = text;

    return el;

}

function menuItem(label,page){

    const el = document.createElement("div");

    el.className = "sidebar-item";
    el.innerText = label;

    el.onclick = () => navigate(page,el);

    return el;

}

function section(title,items){

    const wrapper = document.createElement("div");

    const header = document.createElement("div");
    header.className = "sidebar-item";
    header.innerText = title;

    const submenu = document.createElement("div");
    submenu.style.display = "none";

    header.onclick = () => {

        const open = submenu.style.display === "block";

        submenu.style.display = open ? "none" : "block";

    };

    items.forEach(i => {

        const el = document.createElement("div");

        el.className = "sidebar-item";
        el.style.paddingLeft = "30px";
        el.innerText = i[0];

        el.onclick = () => navigate(i[1],el);

        submenu.appendChild(el);

    });

    wrapper.appendChild(header);
    wrapper.appendChild(submenu);

    return wrapper;

}

function navigate(page,el){

    if(activeItem) activeItem.style.background = "";

    el.style.background = "#e9f2ff";

    activeItem = el;

    setPage(page);

    const filtered = applyFilters(dataStore);

    renderCurrentPage(filtered);

}
