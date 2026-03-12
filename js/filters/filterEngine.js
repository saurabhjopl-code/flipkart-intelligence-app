// js/filters/filterEngine.js

import { getFilters } from "./filterState.js";
import { parseDDMMYYYY } from "../core/dateEngine.js";

export function applyFilters(dataStore) {

    const filters = getFilters();

    const filtered = {};

    for (const sheet in dataStore) {

        filtered[sheet] = applySheetFilters(dataStore[sheet], filters, sheet);

    }

    return filtered;

}



function applySheetFilters(rows, filters, sheetName) {

    if (!rows || rows.length === 0) return [];

    const result = [];

    for (const row of rows) {

        if (!passAccountFilter(row, filters)) continue;

        if (!passDateFilter(row, filters, sheetName)) continue;

        result.push(row);

    }

    return result;

}



function passAccountFilter(row, filters) {

    if (filters.ACC === "ALL") return true;

    if (!row["ACC"]) return true;

    return row["ACC"] === filters.ACC;

}



function passDateFilter(row, filters, sheetName) {

    let dateField = null;

    if (sheetName === "GMV") dateField = "Order Date";
    if (sheetName === "CDR") dateField = "Date";

    if (!dateField) return true;

    const raw = row[dateField];

    if (!raw) return false;

    const iso = parseDDMMYYYY(raw);

    if (!iso) return false;

    if (iso < filters.startDate) return false;

    if (iso > filters.endDate) return false;

    return true;

}
