import { PathGetSubStatus } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('todaySubs:refresh');
    let level =  url.searchParams.get("level")
    let grade =  url.searchParams.get("grade")
    let school =  url.searchParams.get("school")

    let res = await fetch(PathGetSubStatus({school,level,grade}),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let todaySubs = await res.json() 
    return {todaySubs}
};
