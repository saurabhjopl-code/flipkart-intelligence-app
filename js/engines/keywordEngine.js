export function runKeywordEngine(rows){

    const out=[];

    rows.forEach(r=>{

        const clicks=Number(r["Clicks"]||0);
        const units=Number(r["Direct Units Sold"]||0);

        if(clicks>40 && units==0){

            out.push({
                keyword:r["attributed_keyword"],
                clicks:clicks,
                action:"Add as Negative Keyword"
            });

        }

    });

    return out;

}
