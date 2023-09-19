import { PathGetQueues,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('queues:refresh');
    let res = await fetch(PathGetQueues(params.canteenId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let queuesResponse = await res.json() 
    return {queuesResponse}
};