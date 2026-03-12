// js/reports/cdr/campaignSpendTrendReport.js

import { formatCurrency } from "../../core/formatter.js";

export function buildCampaignSpendTrendReport(rows) {

    const map = {};

    for (const r of rows) {

        const campaign = r["Campaign Name"];

        if (!map[campaign]) {

            map[campaign] = {
                spend: 0,
                revenue: 0
            };

        }

        map[campaign].spend += Number(r["Ad Spend"] || 0);
        map[campaign].revenue += Number(r["Total Revenue (Rs.)"] || 0);

    }

    const out = [];

    for (const campaign in map) {

        const spend = map[campaign].spend;
        const revenue = map[campaign].revenue;

        out.push({

            campaign,
            spend: formatCurrency(spend),
            revenue: formatCurrency(revenue)

        });

    }

    out.sort((a, b) => b.spend - a.spend);

    return {

        columns: [

            { key: "campaign", label: "Campaign" },
            { key: "spend", label: "Ad Spend" },
            { key: "revenue", label: "Revenue" }

        ],

        rows: out

    };

}
