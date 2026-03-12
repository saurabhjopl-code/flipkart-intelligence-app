import { dataStore } from "../core/dataStore.js";
import { applyFilters } from "../filters/filterEngine.js";
import { setPage, renderCurrentPage } from "../binder.js";

export function renderSidebar(){

    const sidebar=document.getElementById("sidebar");
    sidebar.innerHTML="";

    sidebar.appendChild(title("Flipkart Intelligence"));

    sidebar.appendChild(item("Home","HOME"));

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

    const el=document.createElement("div");
    el.className="sidebar-title";
    el.innerText=text;
    return el;

}

function item(label,page){

    const el=document.createElement("div");
    el.className="sidebar-item";
    el.innerText=label;

    el.onclick=()=>navigate(page);

    return el;

}

function section(name,children){

    const wrap=document.createElement("div");

    const header=document.createElement("div");
    header.className="sidebar-item";
    header.innerText=name;

    wrap.appendChild(header);

    children.forEach(c=>{

        const el=document.createElement("div");
        el.className="sidebar-item";
        el.style.paddingLeft="40px";
        el.innerText=c[0];

        el.onclick=()=>navigate(c[1]);

        wrap.appendChild(el);

    });

    return wrap;

}

function navigate(page){

    setPage(page);

    const filtered=applyFilters(dataStore);

    renderCurrentPage(filtered);

}
