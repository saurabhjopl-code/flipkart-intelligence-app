// js/filters/filterEngine.js

import { getFilters } from "./filterState.js";
import { parseDDMMYYYY } from "../core/dateEngine.js";

export function applyFilters(dataStore) {

    const filters = getFilters();

    const filtered = {};

    for (const sheet in dataStore) {

        filtered[sheet] = filterSheet(dataStore[sheet], sheet, filters);

    }

    return filtered;

}

function filterSheet(rows, sheetName, filters) {

    if (!rows) return [];

    return rows.filter(r => {

        if (!accountPass(r, filters)) return false;

        if (!datePass(r, sheetName, filters)) return false;

        return true;

    });

}

function accountPass(row, filters) {

    if (filters.ACC === "ALL") return true;

    if (!row.ACC) return true;

    return row.ACC === filters.ACC;

}

function datePass(row, sheet, filters) {

    let field = null;

    if (sheet === "GMV") field = "Order Date";
    if (sheet === "CDR") field = "Date";

    if (!field) return true;

    const raw = row[field];

    if (!raw) return false;

    const iso = parseDDMMYYYY(raw);

    if (!iso) return false;

    if (iso < filters.startDate) return false;

    if (iso > filters.endDate) return false;

    return true;

}
