import { PathGetPaymentMethods,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('paymentMethods:refresh');
    let res = await fetch(PathGetPaymentMethods(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let paymentMethodsResponse = await res.json() 
    return {paymentMethodsResponse}
};
