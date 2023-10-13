import { PathGetPaymentDetails } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    // depends('subs:refresh');

    let res = await fetch(PathGetPaymentDetails(params.paymentId),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let paymentDetailsResponse = await res.json()
    return {payment:paymentDetailsResponse.data.payment,tabTitle:"Payment Details"}
};
