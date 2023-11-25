import { PathGetStudents,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('students:refresh');
    let archived =  url.searchParams.get("archived")
    if(archived){
        archived = archived == "true" ? "true" : "false"
    }else {
        archived = ""
    }

    let subscribed =  url.searchParams.get("subscribed")
    if(subscribed){
        subscribed = subscribed == "true" ? "true" : "false"
    }else {
        subscribed = ""
    }

    let res = await fetch(PathGetStudents(DefaultGetQueries(url),null,{archived,subscribed}),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let studentsResponse = await res.json() 
    return {studentsResponse,tabTitle:"Students"}
};
