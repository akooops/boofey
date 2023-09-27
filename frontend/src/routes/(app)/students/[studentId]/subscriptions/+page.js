import { PathGetSubscriptions,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('subs:refresh');
    let res = await fetch(PathGetSubscriptions(params.studentId,DefaultGetQueries(url),"parent"),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
    
    let subsResponse = await res.json()
    console.log("sub les goo",subsResponse)
    return {subsResponse}
};
