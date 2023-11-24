import { PathGetSubscriptions,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('subs:refresh');

    let res = await fetch(PathGetSubscriptions(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let subsResponse = await res.json() 
    return {subsResponse,tabTitle:"Subscriptions",arTabTitle:"الاشتراكات"}
};
