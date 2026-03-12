export function runAdWasteEngine(skuData){

    const rows=[];

    skuData.forEach(s=>{

        if(s.ad_spend>500 && s.ad_revenue==0){

            rows.push({
                sku:s.sku,
                ad_spend:s.ad_spend,
                action:"Pause Ads"
            });

        }

    });

    rows.sort((a,b)=>b.ad_spend-a.ad_spend);

    return rows;

}
