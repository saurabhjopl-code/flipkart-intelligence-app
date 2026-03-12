export function runAdScaleEngine(skuData){

    const rows=[];

    skuData.forEach(s=>{

        if(s.ad_spend<=0) return;

        const roi=s.ad_revenue/s.ad_spend;

        if(roi>=4 && s.stock>10){

            rows.push({
                sku:s.sku,
                roi:roi.toFixed(2),
                revenue:s.revenue,
                stock:s.stock,
                action:"Increase Ads"
            });

        }

    });

    rows.sort((a,b)=>b.roi-a.roi);

    return rows;

}
