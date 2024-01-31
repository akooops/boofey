import { PathGetDivisions,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('divisions:refresh');

    let res = await fetch(PathGetDivisions(params.schoolId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let divisionsResponse = await res.json() 
    return {divisionsResponse,tabTitle:"Divisions"}
};
