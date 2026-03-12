// js/filters/filterState.js

export const filterState = {

    ACC: "ALL",

    timeRange: "THIS_MONTH",

    month: null,

    startDate: null,

    endDate: null

};



export function initializeFilters() {

    const today = new Date();

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

    filterState.startDate = formatDate(firstDay);
    filterState.endDate = formatDate(today);

}



export function setFilter(key, value) {

    filterState[key] = value;

}



export function getFilters() {

    return filterState;

}



function formatDate(date) {

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}
