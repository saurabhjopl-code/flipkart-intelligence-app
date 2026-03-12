// js/appInitializer.js

import { loadSheets } from "./core/sheetLoader.js";
import { dataStore } from "./core/dataStore.js";
import { applyFilters } from "./filters/filterEngine.js";
import { renderHome } from "./binder.js";
import { initializeFilters } from "./filters/filterState.js";

import { renderSidebar } from "./ui/menuRenderer.js";
import { renderFilterBar } from "./ui/filterBarRenderer.js";

export async function startApp() {

    try {

        renderSidebar();

        renderFilterBar();

        await loadSheets();

        initializeFilters();

        const filtered = applyFilters(dataStore);

        await renderHome(filtered);

    } catch (err) {

        console.error("App failed", err);

    }

}
