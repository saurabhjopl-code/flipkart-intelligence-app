// js/home/adsSummaryEngine.js

import { formatCurrency, formatNumber, formatPercent } from "../core/formatter.js";

export function buildAdsSummary(rows) {

    let spend = 0;
    let revenue = 0;

    let views = 0;
    let clicks = 0;
    let units = 0;



    for (const r of rows) {

        spend += Number(r["Ad Spend"] || 0);
        revenue += Number(r["Total Revenue (Rs.)"] || 0);

        views += Number(r["Views"] || 0);
        clicks += Number(r["Clicks"] || 0);
        units += Number(r["Total converted units"] || 0);

    }



    const roi = spend > 0 ? revenue / spend : 0;

    const ctr = views > 0 ? clicks / views : 0;

    const cvr = clicks > 0 ? units / clicks : 0;



    return [

        {
            title: "Ad Spend",
            value: formatCurrency(spend)
        },

        {
            title: "ROI",
            value: roi.toFixed(2)
        },

        {
            title: "Views",
            value: formatNumber(views)
        },

        {
            title: "Clicks",
            value: formatNumber(clicks)
        },

        {
            title: "CTR",
            value: formatPercent(ctr)
        },

        {
            title: "Units Sold",
            value: formatNumber(units)
        },

        {
            title: "CVR",
            value: formatPercent(cvr)
        },

        {
            title: "Ad Revenue",
            value: formatCurrency(revenue)
        }

    ];

}
