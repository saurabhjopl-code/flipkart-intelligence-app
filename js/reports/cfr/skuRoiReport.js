// js/reports/cfr/skuRoiReport.js

import { formatCurrency } from "../../core/formatter.js";

export function buildSkuRoiReport(skuData) {

    const rows = [];

    for (const sku of skuData) {

        const roi = sku.ad_spend > 0
            ? sku.ad_revenue / sku.ad_spend
            : 0;

        rows.push({

            sku: sku.sku,

            sales: sku.sales,

            revenue: formatCurrency(sku.revenue),

            ad_spend: formatCurrency(sku.ad_spend),

            ad_revenue: formatCurrency(sku.ad_revenue),

            roi: roi.toFixed(2),

            stock: sku.stock,

            rating: sku.rating

        });

    }

    rows.sort((a, b) => b.roi - a.roi);

    return {

        columns: [

            { key: "sku", label: "SKU" },
            { key: "sales", label: "Units Sold" },
            { key: "revenue", label: "Revenue" },
            { key: "ad_spend", label: "Ad Spend" },
            { key: "ad_revenue", label: "Ad Revenue" },
            { key: "roi", label: "ROI" },
            { key: "stock", label: "FC Stock" },
            { key: "rating", label: "Rating" }

        ],

        rows

    };

}
