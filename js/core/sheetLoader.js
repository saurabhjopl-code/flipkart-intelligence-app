// js/core/sheetLoader.js

import { setData } from "./dataStore.js";

const SHEETS = {

    CDR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=2107027254&single=true&output=csv",

    CFR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1866392444&single=true&output=csv",

    PPR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1507610887&single=true&output=csv",

    CKR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=599919115&single=true&output=csv",

    GMV: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=344719721&single=true&output=csv",

    FCSTOCK: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1030617949&single=true&output=csv",

    RATINGS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_uFyNN_LsA0hZ4EuRYflMnzY-NwSAn9sRhvPbbeRrRkAe5d07tIEJ_gilGwvR5-H1l3jjTOdjq6j/pub?gid=1192349281&single=true&output=csv"

};

export async function loadSheets() {

    for (const sheet in SHEETS) {

        const response = await fetch(SHEETS[sheet]);
        const text = await response.text();

        const rows = parseCSV(text);

        setData(sheet, rows);
    }

}

function parseCSV(text) {

    const lines = text.split("\n");

    const headers = lines[0].split(",");

    const data = [];

    for (let i = 1; i < lines.length; i++) {

        const values = lines[i].split(",");

        const row = {};

        headers.forEach((h, index) => {
            row[h.trim()] = values[index];
        });

        data.push(row);
    }

    return data;
}
