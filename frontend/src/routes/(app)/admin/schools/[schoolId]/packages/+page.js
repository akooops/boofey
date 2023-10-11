import { PathGetPackages,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('packages:refresh');

    let res = await fetch(PathGetPackages(params.schoolId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let packagesResponse = await res.json() 
    return {packagesResponse,tabTitle:"Packages"}
};
