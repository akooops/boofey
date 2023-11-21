import { PathGetProfile,PathAuth } from "$lib/api/paths"

import { redirector, refresher,ProfileData } from "$lib/api/auth";

export const ssr = false;
export const prerender = true;
export async function load({fetch,url,depends,params}) {
    // depends('profile:refresh');
    // let res = await fetch(PathGetProfile(),{
    //     headers:{
    //         Authorization: `${localStorage.getItem("SID")}`
    //     }
    // })
    // redirector(res)
    
    // let profileResponse = await res.json()

    
    await refresher()

    let userResponse
    let authRes = await fetch(PathAuth(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    if(authRes.ok){
        userResponse = await authRes.json()
    }
    
    
    return {userResponse,tabTitle:"",arTabTitle:""}
};


