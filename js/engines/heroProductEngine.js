export function runHeroProductEngine(rows){

    const map={};

    rows.forEach(r=>{

        const sku=r["SKU ID"];

        if(!map[sku]) map[sku]=0;

        map[sku]+=Number(r["Final Sale Amount"]||0);

    });

    const out=[];

    for(const s in map){

        if(map[s]>20000){

            out.push({
                sku:s,
                revenue:map[s],
                action:"Promote Product"
            });

        }

    }

    out.sort((a,b)=>b.revenue-a.revenue);

    return out;

}
