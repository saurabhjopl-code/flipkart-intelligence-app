// js/core/dateEngine.js

export function parseDDMMYYYY(dateStr) {

    if (!dateStr) return null;

    const parts = dateStr.split("/");

    if (parts.length !== 3) return null;

    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];

    return `${year}-${month}-${day}`;

}

export function todayISO() {

    const d = new Date();

    return formatDate(d);

}

export function formatDate(date) {

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;

}
