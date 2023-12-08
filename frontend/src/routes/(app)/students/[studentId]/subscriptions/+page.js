import { PathGetSubscriptionsByStudent,DefaultGetQueries,PathCheckPaymentRedirection,PathCheckPaymentRef } from "$lib/api/paths"
import { env } from '$env/dynamic/public';

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('subs:refresh');
    let res = await fetch(PathGetSubscriptionsByStudent(params.studentId,DefaultGetQueries(url),"parent"),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
 
    let subsResponse = await res.json()

    let msg
    if(env.PUBLIC_PAYMENT_REDIRECTION == "true"){
        msg = await payFortRedirection(url)
    }else {
        msg = await redirection3ds(url)
    }
    url.searchParams

    return {subsResponse,msg,tabTitle:"Subscriptions",arTabTitle:"الاشتراكات"}
};

async function redirection3ds(url){

    let msg
    if(url.searchParams.get("ref")){
        let res = await fetch(PathCheckPaymentRef(url.searchParams.get("ref")),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            }
        })

        redirector(res)

        res = await res.json()
        let status = "success";

        if(res.status == "success") {
            if(res?.data?.payment?.status != 14){
                msg = res?.data?.payment?.response_message
            }
            
        }else if (res.status == "error"){
            msg = res.error.message
        }
        url.searchParams.set("status",status)

    }
    return msg

} 

async function payFortRedirection(url){
    let msg
    if(url.searchParams.get("ref")){
        let res = await fetch(PathCheckPaymentRedirection(url.searchParams.get("ref")),{
            headers:{
                Authorization: `${localStorage.getItem("SID")}`
            },
            method:"POST"
        })
            
        res = await res.json()

        let status = "success";
        if(res.status == "success") {
            if(res?.data?.payment?.status != 14){
                status = "fail"
                msg = res?.data?.payment?.response_message
            }
        }else if (res.status == "error"){
            status = "fail"
            msg = res.error.message
        }

        url.searchParams.set("status",status)

    }
    return msg
}
