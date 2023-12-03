import { PathGetSubscriptionsByStudent,DefaultGetQueries,PathCheckPaymentRedirection } from "$lib/api/paths"

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
    if(url.searchParams.get("ref")){
        res = await fetch(PathCheckPaymentRedirection(url.searchParams.get("ref")),{
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

    return {subsResponse,msg,tabTitle:"Subscriptions",arTabTitle:"الاشتراكات"}
};
