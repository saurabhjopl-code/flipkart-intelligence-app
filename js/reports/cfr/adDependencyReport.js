export function buildAdDependencyReport(skuData){

    const rows=[];

    skuData.forEach(s=>{

        if(s.revenue<=0) return;

        const ratio=s.ad_revenue/s.revenue;

        if(ratio<0.7) return;

        rows.push({
            sku:s.sku,
            revenue:s.revenue,
            ad_revenue:s.ad_revenue,
            dependency:(ratio*100).toFixed(1)+"%"
        });

    });

    rows.sort((a,b)=>b.dependency-a.dependency);

    return{

        columns:[
            {key:"sku",label:"SKU"},
            {key:"revenue",label:"Revenue"},
            {key:"ad_revenue",label:"Ad Revenue"},
            {key:"dependency",label:"Ad Dependency"}
        ],

        rows

    };

}
