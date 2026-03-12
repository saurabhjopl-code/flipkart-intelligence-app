// js/core/skuIntelligenceEngine.js

export function buildSkuIntelligence(data) {

    const skuMap = {};

    buildGMVLayer(data.GMV, skuMap);
    buildAdsLayer(data.CFR, skuMap);
    buildStockLayer(data.FCSTOCK, skuMap);
    buildRatingLayer(data.RATINGS, skuMap);

    return Object.values(skuMap);

}


function getSku(map, sku) {

    if (!map[sku]) {

        map[sku] = {
            sku: sku,
            sales: 0,
            revenue: 0,
            returns: 0,
            ad_spend: 0,
            ad_revenue: 0,
            stock: 0,
            rating: 0,
            rating_count: 0,
            listing_grade: null
        };

    }

    return map[sku];

}


function buildGMVLayer(rows, map) {

    for (const r of rows) {

        const sku = r["SKU ID"];

        if (!sku) continue;

        const obj = getSku(map, sku);

        obj.sales += Number(r["Final Sale Units"] || 0);
        obj.revenue += Number(r["Final Sale Amount"] || 0);
        obj.returns += Number(r["Return Units"] || 0);

    }

}


function buildAdsLayer(rows, map) {

    for (const r of rows) {

        const sku = r["Sku Id"];

        if (!sku) continue;

        const obj = getSku(map, sku);

        obj.ad_spend += Number(r["Ad Spend"] || 0);
        obj.ad_revenue += Number(r["Total Revenue (Rs.)"] || 0);

    }

}


function buildStockLayer(rows, map) {

    for (const r of rows) {

        const sku = r["SKU ID"];

        if (!sku) continue;

        const obj = getSku(map, sku);

        obj.stock += Number(r["Stock"] || 0);

    }

}


function buildRatingLayer(rows, map) {

    for (const r of rows) {

        const sku = r["SKU Id"];

        if (!sku) continue;

        const obj = getSku(map, sku);

        obj.rating = Number(r["Rating"] || 0);
        obj.rating_count = Number(r["Number of Ratings"] || 0);
        obj.listing_grade = r["Listing Quality Grade"];

    }

}
