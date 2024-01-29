import { PathGetRevenues } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('revenues:refresh');
    let start_date =  url.searchParams.get("start_date")
    let end_date =  url.searchParams.get("end_date")

    let res = await fetch(PathGetRevenues({start_date,end_date}),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let revenues = await res.json() 
    return {...revenues.data}
};
