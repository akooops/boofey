import { goto } from '$app/navigation';
import { PathRefresh,PathAuth } from "$lib/api/paths"


export function redirector(res){
    if(!res.ok){
        if(res.status == 403){
            goto("/signin")
        }        
    }
}

export async function refresher(){

    let formData = new FormData()
    formData.append("token",localStorage.getItem("SID"))

    let res = await (await fetch(PathRefresh(),{
        method:"POST",
        body:formData
    })).json()

    if(res.status == "success") {
        localStorage.setItem("SID", `${res.token}`);
    }
}

export async function ProfileData(){

    let authRes = await fetch(PathAuth(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    if(authRes.ok){
        let authResponse = await authRes.json()
        return authResponse
    }else {
        goto("/signin")
    }

    return {}
}