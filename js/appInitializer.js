// js/appInitializer.js

import { loadSheets } from "./core/sheetLoader.js";
import { dataStore } from "./core/dataStore.js";
import { applyFilters } from "./filters/filterEngine.js";
import { renderHome } from "./binder.js";
import { initializeFilters } from "./filters/filterState.js";

export async function startApp() {

    try {

        console.log("App starting...");

        showLoader("Loading data from Google Sheets...");

        // STEP 1 — Load sheets
        await loadSheets();

        console.log("Sheets loaded", dataStore);

        // STEP 2 — Initialize filters
        initializeFilters();

        // STEP 3 — Apply filters
        const filteredData = applyFilters(dataStore);

        // STEP 4 — Render Home dashboard
        await renderHome(filteredData);

        hideLoader();

        // STEP 5 — Prepare background tasks
        setTimeout(() => {
            prepareBackgroundReports();
        }, 500);

    } catch (err) {

        console.error("App initialization failed", err);

        showLoader("Failed to load data.");

    }

}



function prepareBackgroundReports() {

    console.log("Preparing reports in background...");

    // future background report engines will run here

}



function showLoader(message) {

    let loader = document.getElementById("app-loader");

    if (!loader) {

        loader = document.createElement("div");
        loader.id = "app-loader";
        loader.style.position = "fixed";
        loader.style.top = "0";
        loader.style.left = "0";
        loader.style.width = "100%";
        loader.style.height = "100%";
        loader.style.background = "#ffffff";
        loader.style.display = "flex";
        loader.style.alignItems = "center";
        loader.style.justifyContent = "center";
        loader.style.fontSize = "18px";
        loader.style.zIndex = "9999";

        document.body.appendChild(loader);
    }

    loader.innerText = message;

}



function hideLoader() {

    const loader = document.getElementById("app-loader");

    if (loader) loader.remove();

}
