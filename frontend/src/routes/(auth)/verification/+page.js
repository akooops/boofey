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
        let authResponse = await res.json()
        console.log("status ")
        if(authResponse?.data?.user?.verified == true){
            if(authResponse?.data?.user?.roles[0]?.name != "parent"){
                goto("/admin")
            }else{
                goto("/students")
            }
        }

        return {user:authResponse.data.user}
            
    }else {
        goto("/signin")
    }

};