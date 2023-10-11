import { PathGetStudents,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('students:refresh');
    let archived =  url.searchParams.get("archived")
    archived = archived == "true" ? "true" : "false"
    let res = await fetch(PathGetStudents(DefaultGetQueries(url),null,archived),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let studentsResponse = await res.json() 
    return {studentsResponse,tabTitle:"Students"}
};
