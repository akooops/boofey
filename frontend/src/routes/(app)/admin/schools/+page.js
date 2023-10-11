import { PathGetSchools,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('schools:refresh');
    let res = await fetch(PathGetSchools(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let schoolsResponse = await res.json() 
    return {schoolsResponse,tabTitle:"Schools"}
};