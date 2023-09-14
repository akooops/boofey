import { PathGetCanteens,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('canteens:refresh');

    let res = await fetch(PathGetCanteens(params.schoolId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let canteensResponse = await res.json() 
    return {canteensResponse}
};
