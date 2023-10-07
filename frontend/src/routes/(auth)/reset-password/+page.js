import { PathAuth } from "$lib/api/paths"
import { goto } from '$app/navigation';

export const ssr = false;
export async function load({fetch,cookies,url,depends}) {
    let res = await fetch(PathAuth(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    if(res.ok){
        goto("/profile/settings")
    }

    return {}
};