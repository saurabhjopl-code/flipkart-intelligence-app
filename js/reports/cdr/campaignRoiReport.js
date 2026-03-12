// js/reports/cdr/campaignRoiReport.js

import { formatCurrency } from "../../core/formatter.js";

export function buildCampaignRoiReport(rows) {

    const map = {};

    for (const r of rows) {

        const campaign = r["Campaign Name"];

        if (!map[campaign]) {

            map[campaign] = {
                spend: 0,
                revenue: 0,
                units: 0
            };

        }

        map[campaign].spend += Number(r["Ad Spend"] || 0);
        map[campaign].revenue += Number(r["Total Revenue (Rs.)"] || 0);
        map[campaign].units += Number(r["Total converted units"] || 0);

    }

    const rowsOut = [];

    for (const campaign in map) {

        const data = map[campaign];

        const roi = data.spend > 0 ? data.revenue / data.spend : 0;

        rowsOut.push({

            campaign: campaign,

            spend: formatCurrency(data.spend),

            revenue: formatCurrency(data.revenue),

            units: data.units,

            roi: roi.toFixed(2)

        });

    }

    return {

        columns: [

            { key: "campaign", label: "Campaign" },
            { key: "spend", label: "Ad Spend" },
            { key: "revenue", label: "Revenue" },
            { key: "units", label: "Units" },
            { key: "roi", label: "ROI" }

        ],

        rows: rowsOut

    };

}
