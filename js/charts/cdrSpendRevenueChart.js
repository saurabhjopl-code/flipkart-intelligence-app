// js/charts/cdrSpendRevenueChart.js

import { parseDDMMYYYY } from "../core/dateEngine.js";

export function buildCdrSpendRevenueChart(rows) {

    const map = {};

    for (const r of rows) {

        const date = parseDDMMYYYY(r["Date"]);

        if (!date) continue;

        if (!map[date]) {

            map[date] = {
                spend: 0,
                revenue: 0
            };

        }

        map[date].spend += Number(r["Ad Spend"] || 0);
        map[date].revenue += Number(r["Total Revenue (Rs.)"] || 0);

    }

    const labels = Object.keys(map).sort();

    const spend = [];
    const revenue = [];

    for (const d of labels) {

        spend.push(map[d].spend);
        revenue.push(map[d].revenue);

    }

    return {

        labels: labels,

        datasets: [

            {
                label: "Ad Spend",
                data: spend
            },

            {
                label: "Ad Revenue",
                data: revenue
            }

        ]

    };

}
