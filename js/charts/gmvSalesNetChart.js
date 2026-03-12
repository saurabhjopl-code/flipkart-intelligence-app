// js/charts/gmvSalesNetChart.js

import { parseDDMMYYYY } from "../core/dateEngine.js";

export function buildGmvSalesNetChart(rows) {

    const map = {};

    for (const r of rows) {

        const date = parseDDMMYYYY(r["Order Date"]);

        if (!date) continue;

        if (!map[date]) {

            map[date] = {
                gmv: 0,
                net: 0
            };

        }

        map[date].gmv += Number(r["GMV"] || 0);
        map[date].net += Number(r["Final Sale Amount"] || 0);

    }

    const labels = Object.keys(map).sort();

    const gmv = [];
    const net = [];

    for (const d of labels) {

        gmv.push(map[d].gmv);
        net.push(map[d].net);

    }

    return {

        labels: labels,

        datasets: [

            {
                label: "GMV",
                data: gmv
            },

            {
                label: "Net Sales",
                data: net
            }

        ]

    };

}
