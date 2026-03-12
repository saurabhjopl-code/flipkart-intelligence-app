export function runReturnRiskEngine(rows){

    const out=[];

    rows.forEach(r=>{

        const sold=Number(r["Gross Units"]||0);
        const ret=Number(r["Return Units"]||0);

        if(sold<=0) return;

        const rate=ret/sold;

        if(rate>0.25){

            out.push({
                sku:r["SKU ID"],
                return_rate:(rate*100).toFixed(2)+"%",
                action:"Check Product Quality"
            });

        }

    });

    return out;

}
