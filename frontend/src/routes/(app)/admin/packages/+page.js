import { PathGetPackages,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('packages:refresh');

    let res = await fetch(PathGetPackages(null,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let packagesResponse = await res.json() 
    return {packagesResponse}
};
