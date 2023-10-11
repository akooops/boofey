import { PathGetPermissions,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,cookies,url,depends}) {
    depends('permissions:refresh');
    let res = await fetch(PathGetPermissions(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let permissionsResponse = await res.json()

    return {permissionsResponse,tabTitle:"Permissions"}
};