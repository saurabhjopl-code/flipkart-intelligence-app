export function buildPlacementRoiReport(rows){

    const map={};

    rows.forEach(r=>{

        const p=r["Placement Type"];

        if(!map[p]) map[p]={spend:0,revenue:0};

        map[p].spend+=Number(r["Ad Spend"]||0);
        map[p].revenue+=Number(r["Direct Revenue"]||0);

    });

    const out=[];

    for(const p in map){

        const d=map[p];

        const roi=d.spend>0?d.revenue/d.spend:0;

        out.push({
            placement:p,
            spend:d.spend,
            revenue:d.revenue,
            roi:roi.toFixed(2)
        });

    }

    return{

        columns:[
            {key:"placement",label:"Placement"},
            {key:"spend",label:"Spend"},
            {key:"revenue",label:"Revenue"},
            {key:"roi",label:"ROI"}
        ],

        rows:out

    };

}
