export function buildKeywordRoiReport(rows){

    const map={};

    rows.forEach(r=>{

        const k=r["attributed_keyword"];

        if(!map[k]){

            map[k]={spend:0,revenue:0};

        }

        map[k].spend+=Number(r["SUM(cost)"]||0);
        map[k].revenue+=Number(r["Direct Revenue"]||0);

    });

    const out=[];

    for(const k in map){

        const d=map[k];

        const roi=d.spend>0?d.revenue/d.spend:0;

        out.push({
            keyword:k,
            spend:d.spend,
            revenue:d.revenue,
            roi:roi.toFixed(2)
        });

    }

    return{

        columns:[
            {key:"keyword",label:"Keyword"},
            {key:"spend",label:"Spend"},
            {key:"revenue",label:"Revenue"},
            {key:"roi",label:"ROI"}
        ],

        rows:out

    };

}
