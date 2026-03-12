export function buildBudgetAllocationReport(rows){

    const map={};
    let total=0;

    rows.forEach(r=>{

        const campaign=r["Campaign Name"];
        const spend=Number(r["Ad Spend"]||0);

        total+=spend;

        if(!map[campaign]) map[campaign]=0;

        map[campaign]+=spend;

    });

    const out=[];

    for(const c in map){

        const spend=map[c];

        const share=total>0?(spend/total*100):0;

        out.push({
            campaign:c,
            spend:spend,
            share:share.toFixed(2)+"%"
        });

    }

    out.sort((a,b)=>b.spend-a.spend);

    return{

        columns:[
            {key:"campaign",label:"Campaign"},
            {key:"spend",label:"Ad Spend"},
            {key:"share",label:"Spend Share"}
        ],

        rows:out

    };

}
