import { PathGetAcademicBreaks,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('breaks:refresh');
    let res = await fetch(PathGetAcademicBreaks(params.yearId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let breaksResponse = await res.json() 
    return {breaksResponse}
};