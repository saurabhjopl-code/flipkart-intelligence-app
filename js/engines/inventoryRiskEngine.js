export function runInventoryRiskEngine(skuData){

    const rows=[];

    skuData.forEach(s=>{

        if(s.stock>100 && s.sales<5){

            rows.push({
                sku:s.sku,
                stock:s.stock,
                sales:s.sales,
                action:"Run Clearance Ads"
            });

        }

    });

    return rows;

}
