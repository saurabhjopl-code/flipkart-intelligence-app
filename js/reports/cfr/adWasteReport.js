export function buildAdWasteReport(skuData){

    const rows=[];

    skuData.forEach(s=>{

        if(s.ad_spend<=0) return;

        if(s.ad_revenue>0) return;

        rows.push({
            sku:s.sku,
            ad_spend:s.ad_spend,
            stock:s.stock,
            rating:s.rating
        });

    });

    rows.sort((a,b)=>b.ad_spend-a.ad_spend);

    return{

        columns:[
            {key:"sku",label:"SKU"},
            {key:"ad_spend",label:"Ad Spend"},
            {key:"stock",label:"Stock"},
            {key:"rating",label:"Rating"}
        ],

        rows

    };

}
