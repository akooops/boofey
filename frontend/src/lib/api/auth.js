import { goto} from '$app/navigation';
import { PathRefresh,PathAuth } from "$lib/api/paths"
import { error } from '@sveltejs/kit';

export async function redirector(res){
    if(!res.ok){
        if(res.status == 403){    
                goto("/verification")
        }else if (res.status == 401){
                goto("/signin")
        }
        else if (res.status == 404 || res.status == 500){
            throw error(res.status)
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
        if(authResponse?.data?.user?.verified == false){
            goto("/verification")   
            return;
        }
        if(authResponse?.data?.user?.roles[0]?.name == "parent" && window.location.href.includes("admin")){
            goto("/",{ replaceState: true })
            return;
        }
        return authResponse
    }else {
        goto("/signin")
    }

    return {}
}
