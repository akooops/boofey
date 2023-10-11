import { PathGetRoles,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('roles:refresh');

    let res = await fetch(PathGetRoles(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let rolesResponse = await res.json() 
    return {rolesResponse,tabTitle:"Roles"}
};