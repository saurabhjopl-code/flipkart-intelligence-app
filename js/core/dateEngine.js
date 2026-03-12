// js/core/dateEngine.js

export function parseDDMMYYYY(dateStr) {

    if (!dateStr) return null;

    const parts = dateStr.split("/");

    if (parts.length !== 3) return null;

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return `${year}-${month}-${day}`;
}

export function toDateObject(dateStr) {

    const iso = parseDDMMYYYY(dateStr);

    if (!iso) return null;

    return new Date(iso);
}
