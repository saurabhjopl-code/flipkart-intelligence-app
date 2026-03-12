export function buildKeywordEfficiencyReport(rows){

    const out=[];

    rows.forEach(r=>{

        out.push({
            keyword:r["attributed_keyword"],
            clicks:r["Clicks"],
            units:r["Direct Units Sold"],
            conversion:r["Direct Conversion Rate in %"]
        });

    });

    return{

        columns:[
            {key:"keyword",label:"Keyword"},
            {key:"clicks",label:"Clicks"},
            {key:"units",label:"Units Sold"},
            {key:"conversion",label:"Conversion %"}
        ],

        rows:out

    };

}
