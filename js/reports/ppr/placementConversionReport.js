export function buildPlacementConversionReport(rows){

    const out=[];

    rows.forEach(r=>{

        out.push({
            placement:r["Placement Type"],
            clicks:r["Clicks"],
            conversion:r["Conversion Rate"]
        });

    });

    return{

        columns:[
            {key:"placement",label:"Placement"},
            {key:"clicks",label:"Clicks"},
            {key:"conversion",label:"Conversion %"}
        ],

        rows:out

    };

}
