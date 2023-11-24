import { PathGetSubscriptionsByStudent,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('subs:refresh');

    let res = await fetch(PathGetSubscriptionsByStudent(params.studentId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let subsResponse = await res.json()
    return {subsResponse,tabTitle:"Subscriptions"}
};
