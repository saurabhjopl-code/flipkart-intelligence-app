export function buildReturnRiskReport(rows){

    const out=[];

    rows.forEach(r=>{

        const sold=Number(r["Gross Units"]||0);
        const ret=Number(r["Return Units"]||0);

        if(sold<=0) return;

        const rate=ret/sold;

        if(rate>0.2){

            out.push({
                sku:r["SKU ID"],
                sold:sold,
                returns:ret,
                return_rate:(rate*100).toFixed(2)+"%"
            });

        }

    });

    return{

        columns:[
            {key:"sku",label:"SKU"},
            {key:"sold",label:"Units Sold"},
            {key:"returns",label:"Returns"},
            {key:"return_rate",label:"Return Rate"}
        ],

        rows:out

    };

}
