export function buildGrowthMomentumReport(rows){

    const map={};

    rows.forEach(r=>{

        const sku=r["SKU ID"];

        if(!map[sku]){

            map[sku]={units:0};

        }

        map[sku].units+=Number(r["Final Sale Units"]||0);

    });

    const out=[];

    for(const s in map){

        out.push({
            sku:s,
            units:map[s].units
        });

    }

    out.sort((a,b)=>b.units-a.units);

    return{

        columns:[
            {key:"sku",label:"SKU"},
            {key:"units",label:"Units Sold"}
        ],

        rows:out

    };

}
