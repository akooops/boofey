import { PathGetProfile } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('profile:refresh');
    let res = await fetch(PathGetProfile(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
    
    let profileResponse = await res.json()
    return {profileResponse,tabTitle:"Profile"}
};
