import { PathGetUsers,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('users:refresh');
    let verified =  url.searchParams.get("verified")
    if(verified){
        verified = verified == "true" ? "true" : "false"
    }
    let res = await fetch(PathGetUsers(DefaultGetQueries(url),verified),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let usersResponse = await res.json() 
    return {usersResponse,tabTitle:"Users"}
};