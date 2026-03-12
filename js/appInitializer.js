// js/appInitializer.js

import { loadSheets } from "./core/sheetLoader.js";
import { dataStore } from "./core/dataStore.js";

import { applyFilters } from "./filters/filterEngine.js";
import { initializeFilters } from "./filters/filterState.js";

import { renderHome } from "./binder.js";

import { renderSidebar } from "./ui/menuRenderer.js";
import { renderFilterBar } from "./ui/filterBarRenderer.js";

export async function startApp() {

    try {

        console.log("Starting Flipkart Intelligence...");

        // Render sidebar immediately
        renderSidebar();

        // STEP 1 — Load sheet data
        await loadSheets();

        console.log("Sheets loaded:", dataStore);

        // STEP 2 — Initialize filters
        initializeFilters();

        // STEP 3 — Now render filter bar (after data available)
        renderFilterBar();

        // STEP 4 — Apply filters
        const filtered = applyFilters(dataStore);

        // STEP 5 — Render Home
        renderHome(filtered);

    } catch (err) {

        console.error("App initialization error:", err);

    }

}
