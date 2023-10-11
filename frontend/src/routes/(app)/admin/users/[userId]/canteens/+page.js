import { PathGetCanteenUsers,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,params,depends}) {
    depends('canteenUsers:refresh');

    let res = await fetch(PathGetCanteenUsers(params.userId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let canteenUsersResponse = await res.json() 
    return {canteenUsersResponse,tabTitle:"User's Canteens"}
};