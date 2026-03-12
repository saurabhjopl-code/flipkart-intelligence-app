// js/reports/cdr/budgetAllocationReport.js

import { formatCurrency } from "../../core/formatter.js";

export function buildBudgetAllocationReport(rows) {

    const map = {};

    let totalSpend = 0;

    for (const r of rows) {

        const campaign = r["Campaign Name"];
        const spend = Number(r["Ad Spend"] || 0);

        totalSpend += spend;

        if (!map[campaign]) map[campaign] = 0;

        map[campaign] += spend;

    }

    const out = [];

    for (const campaign in map) {

        const spend = map[campaign];

        const share = totalSpend > 0
            ? (spend / totalSpend) * 100
            : 0;

        out.push({

            campaign,
            spend: formatCurrency(spend),
            share: share.toFixed(2) + "%"

        });

    }

    out.sort((a, b) => b.share - a.share);

    return {

        columns: [

            { key: "campaign", label: "Campaign" },
            { key: "spend", label: "Ad Spend" },
            { key: "share", label: "Spend Share" }

        ],

        rows: out

    };

}
