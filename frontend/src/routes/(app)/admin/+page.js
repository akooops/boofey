import { PathGetDashCount} from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('dash:refresh');
    let res = await fetch(PathGetDashCount(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let countResponse = await res.json() 
    return {count:countResponse.data,tabTitle:"Dashboard"}
};