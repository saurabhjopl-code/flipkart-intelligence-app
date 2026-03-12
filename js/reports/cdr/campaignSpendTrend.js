export function buildCampaignSpendTrend(rows){

    const map={};

    rows.forEach(r=>{

        const campaign=r["Campaign Name"];
        const spend=Number(r["Ad Spend"]||0);

        if(!map[campaign]) map[campaign]=0;

        map[campaign]+=spend;

    });

    const out=[];

    for(const c in map){

        out.push({
            campaign:c,
            spend:map[c]
        });

    }

    out.sort((a,b)=>b.spend-a.spend);

    return{

        columns:[
            {key:"campaign",label:"Campaign"},
            {key:"spend",label:"Ad Spend"}
        ],

        rows:out

    };

}
