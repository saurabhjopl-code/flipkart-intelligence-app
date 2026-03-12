// js/ui/menuRenderer.js

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = "";

    const title = document.createElement("div");
    title.className = "sidebar-title";
    title.innerText = "Flipkart Intelligence";

    sidebar.appendChild(title);

    const menu = document.createElement("div");
    menu.className = "sidebar-menu";

    const items = [
        "Home",
        "CDR",
        "CFR",
        "PPR",
        "CKR",
        "GMV"
    ];

    for (const item of items) {

        const el = document.createElement("div");

        el.className = "sidebar-item";

        el.innerText = item;

        menu.appendChild(el);

    }

    sidebar.appendChild(menu);

}
