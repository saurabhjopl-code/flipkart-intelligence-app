export function buildHeroProductReport(rows){

    const map={};

    rows.forEach(r=>{

        const sku=r["SKU ID"];

        if(!map[sku]){

            map[sku]={units:0,revenue:0};

        }

        map[sku].units+=Number(r["Final Sale Units"]||0);
        map[sku].revenue+=Number(r["Final Sale Amount"]||0);

    });

    const out=[];

    for(const s in map){

        out.push({
            sku:s,
            units:map[s].units,
            revenue:map[s].revenue
        });

    }

    out.sort((a,b)=>b.revenue-a.revenue);

    return{

        columns:[
            {key:"sku",label:"SKU"},
            {key:"units",label:"Units"},
            {key:"revenue",label:"Revenue"}
        ],

        rows:out

    };

}
