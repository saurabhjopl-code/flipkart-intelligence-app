export function buildPlacementCtrReport(rows){

    const out=[];

    rows.forEach(r=>{

        out.push({
            placement:r["Placement Type"],
            views:r["Views"],
            clicks:r["Clicks"],
            ctr:r["Click Through Rate in %"]
        });

    });

    return{

        columns:[
            {key:"placement",label:"Placement"},
            {key:"views",label:"Views"},
            {key:"clicks",label:"Clicks"},
            {key:"ctr",label:"CTR %"}
        ],

        rows:out

    };

}
