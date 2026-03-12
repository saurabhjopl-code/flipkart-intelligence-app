export function buildCategoryPerformanceReport(rows){

    const map={};

    rows.forEach(r=>{

        const cat=r["Category"];

        if(!map[cat]){

            map[cat]={units:0,revenue:0};

        }

        map[cat].units+=Number(r["Final Sale Units"]||0);
        map[cat].revenue+=Number(r["Final Sale Amount"]||0);

    });

    const out=[];

    for(const c in map){

        out.push({
            category:c,
            units:map[c].units,
            revenue:map[c].revenue
        });

    }

    return{

        columns:[
            {key:"category",label:"Category"},
            {key:"units",label:"Units"},
            {key:"revenue",label:"Revenue"}
        ],

        rows:out

    };

}
