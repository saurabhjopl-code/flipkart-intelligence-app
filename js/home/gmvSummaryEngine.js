// js/home/gmvSummaryEngine.js

import { formatCurrency, formatNumber } from "../core/formatter.js";

export function buildGmvSummary(rows) {

    let grossRevenue = 0;
    let grossUnits = 0;

    let cancelRevenue = 0;
    let cancelUnits = 0;

    let returnRevenue = 0;
    let returnUnits = 0;

    let netRevenue = 0;
    let netUnits = 0;



    for (const r of rows) {

        grossRevenue += Number(r["GMV"] || 0);
        grossUnits += Number(r["Gross Units"] || 0);

        cancelRevenue += Number(r["Cancellation Amount"] || 0);
        cancelUnits += Number(r["Cancellation Units"] || 0);

        returnRevenue += Number(r["Return Amount"] || 0);
        returnUnits += Number(r["Return Units"] || 0);

        netRevenue += Number(r["Final Sale Amount"] || 0);
        netUnits += Number(r["Final Sale Units"] || 0);

    }



    const afterCancelRevenue = grossRevenue - cancelRevenue;
    const afterCancelUnits = grossUnits - cancelUnits;



    return [

        {
            title: "Gross Sales",
            value: formatCurrency(grossRevenue),
            units: formatNumber(grossUnits)
        },

        {
            title: "Cancellations",
            value: formatCurrency(cancelRevenue),
            units: formatNumber(cancelUnits)
        },

        {
            title: "Sales After Cancellations",
            value: formatCurrency(afterCancelRevenue),
            units: formatNumber(afterCancelUnits)
        },

        {
            title: "Returns",
            value: formatCurrency(returnRevenue),
            units: formatNumber(returnUnits)
        },

        {
            title: "Net Sales",
            value: formatCurrency(netRevenue),
            units: formatNumber(netUnits)
        }

    ];

}
