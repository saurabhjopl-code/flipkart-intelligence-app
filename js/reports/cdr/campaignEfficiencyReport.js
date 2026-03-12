// js/reports/cdr/campaignEfficiencyReport.js

export function buildCampaignEfficiencyReport(rows) {

    const map = {};

    for (const r of rows) {

        const campaign = r["Campaign Name"];

        if (!map[campaign]) {

            map[campaign] = {
                clicks: 0,
                revenue: 0,
                units: 0
            };

        }

        map[campaign].clicks += Number(r["Clicks"] || 0);
        map[campaign].revenue += Number(r["Total Revenue (Rs.)"] || 0);
        map[campaign].units += Number(r["Total converted units"] || 0);

    }

    const out = [];

    for (const c in map) {

        const data = map[c];

        const rpc = data.clicks > 0 ? data.revenue / data.clicks : 0;
        const upc = data.clicks > 0 ? data.units / data.clicks : 0;

        out.push({

            campaign: c,
            clicks: data.clicks,
            revenue_per_click: rpc.toFixed(2),
            units_per_click: upc.toFixed(2)

        });

    }

    return {

        columns: [

            { key: "campaign", label: "Campaign" },
            { key: "clicks", label: "Clicks" },
            { key: "revenue_per_click", label: "Revenue / Click" },
            { key: "units_per_click", label: "Units / Click" }

        ],

        rows: out

    };

}
