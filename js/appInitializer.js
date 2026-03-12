// js/appInitializer.js

import { initFilterListeners, applyFilters } from "./filters/filterEngine.js";

import { loadSheets } from "./core/sheetLoader.js";
import { dataStore } from "./core/dataStore.js";

import { initializeFilters } from "./filters/filterState.js";

import { renderHome, renderCurrentPage } from "./binder.js";

import { renderSidebar } from "./ui/menuRenderer.js";
import { renderFilterBar } from "./ui/filterBarRenderer.js";


export async function startApp() {

    try {

        console.log("Starting Flipkart Intelligence...");

        // STEP 0 — Render sidebar immediately
        renderSidebar();

        // STEP 1 — Load sheet data
        await loadSheets();

        console.log("Sheets loaded:", dataStore);

        // STEP 2 — Initialize filter values
        initializeFilters();

        // STEP 3 — Render filter UI
        renderFilterBar();

        // STEP 4 — Attach filter listeners
        initFilterListeners();

        // STEP 5 — Apply default filters
        const filtered = applyFilters(dataStore);

        // STEP 6 — Render home page
        renderHome(filtered);

    } catch (err) {

        console.error("App initialization error:", err);

    }

}
