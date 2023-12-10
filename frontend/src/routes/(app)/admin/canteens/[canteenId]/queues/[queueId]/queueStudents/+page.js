import { PathGetQueueStudents,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('queueStudents:refresh');
    let simple = JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index.simplified")

    let res = await fetch(PathGetQueueStudents(params.queueId,DefaultGetQueries(url),simple),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let queueStudentsResponse = await res.json() 
    return {queueStudentsResponse,tabTitle:"Students' Queue"}
};
