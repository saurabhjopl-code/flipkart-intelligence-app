// js/core/dataStore.js

export const dataStore = {

    CDR: [],
    CFR: [],
    PPR: [],
    CKR: [],
    GMV: [],
    FCSTOCK: [],
    RATINGS: []

};

export function setData(sheetName, data) {
    dataStore[sheetName] = data;
}

export function getData(sheetName) {
    return dataStore[sheetName] || [];
}
