import { PathInitPaymentMethod, } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";
import { returnUrl } from "$lib/api/paths";

export const ssr = false;
export async function load({fetch,url,depends,params,parent}) {
    depends('payments:refresh');
    let formData = new FormData()

    let {userResponse} = await parent()
    


    formData.set("return_url",returnUrl(userResponse.data.father.id))


    let res = await fetch(PathInitPaymentMethod(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        },
        method:"POST",
        body:formData
    })
    redirector(res)
    
    let paymentMethodInitResponse = await res.json()
    return {paymentMethodInitResponse,fatherId:userResponse.data.father.id,tabTitle:"Add Payment Method"}
};
