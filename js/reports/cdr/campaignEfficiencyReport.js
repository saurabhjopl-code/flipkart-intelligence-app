export function buildCampaignEfficiencyReport(rows){

    const map={};

    rows.forEach(r=>{

        const campaign=r["Campaign Name"];

        if(!map[campaign]){

            map[campaign]={
                clicks:0,
                revenue:0
            };

        }

        map[campaign].clicks+=Number(r["Clicks"]||0);
        map[campaign].revenue+=Number(r["Total Revenue (Rs.)"]||0);

    });

    const out=[];

    for(const c in map){

        const d=map[c];

        const rpc=d.clicks>0?d.revenue/d.clicks:0;

        out.push({
            campaign:c,
            clicks:d.clicks,
            revenue:d.revenue,
            revenue_per_click:rpc.toFixed(2)
        });

    }

    return{

        columns:[
            {key:"campaign",label:"Campaign"},
            {key:"clicks",label:"Clicks"},
            {key:"revenue",label:"Revenue"},
            {key:"revenue_per_click",label:"Revenue / Click"}
        ],

        rows:out

    };

}
