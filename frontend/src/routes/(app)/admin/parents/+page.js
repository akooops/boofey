import { PathGetParents,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('parents:refresh');
    let res = await fetch(PathGetParents(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let parentsResponse = await res.json() 
    return {parentsResponse,tabTitle:"Parents"}
};