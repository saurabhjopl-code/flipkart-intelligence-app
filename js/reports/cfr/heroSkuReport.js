export function buildHeroSkuReport(skuData){

    const rows=[];

    skuData.forEach(s=>{

        if(s.revenue<5000) return;

        const roi=s.ad_spend>0?s.ad_revenue/s.ad_spend:0;

        if(roi<2) return;

        rows.push({
            sku:s.sku,
            revenue:s.revenue,
            sales:s.sales,
            ad_spend:s.ad_spend,
            roi:roi.toFixed(2),
            stock:s.stock
        });

    });

    rows.sort((a,b)=>b.revenue-a.revenue);

    return{

        columns:[
            {key:"sku",label:"SKU"},
            {key:"revenue",label:"Revenue"},
            {key:"sales",label:"Units Sold"},
            {key:"ad_spend",label:"Ad Spend"},
            {key:"roi",label:"ROI"},
            {key:"stock",label:"Stock"}
        ],

        rows

    };

}
