export function buildKeywordOpportunityReport(rows){

    const out=[];

    rows.forEach(r=>{

        const clicks=Number(r["Clicks"]||0);
        const units=Number(r["Direct Units Sold"]||0);

        if(clicks>50 && units==0){

            out.push({
                keyword:r["attributed_keyword"],
                clicks:clicks
            });

        }

    });

    return{

        columns:[
            {key:"keyword",label:"Keyword"},
            {key:"clicks",label:"Clicks"}
        ],

        rows:out

    };

}
