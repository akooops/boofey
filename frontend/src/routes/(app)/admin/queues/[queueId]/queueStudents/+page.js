import { PathGetQueueStudents,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('queueStudents:refresh');

    let res = await fetch(PathGetQueueStudents(params.queueId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let queueStudentsResponse = await res.json() 
    return {queueStudentsResponse}
};
