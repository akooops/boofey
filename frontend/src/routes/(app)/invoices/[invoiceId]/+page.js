import { PathGetInvoiceDetails } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    // depends('subs:refresh');

    let res = await fetch(PathGetInvoiceDetails(params.invoiceId,"parent"),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let invoiceDetailsResponse = await res.json()
    return {invoice:invoiceDetailsResponse.data.invoice,tabTitle:"Invoice Details"}
};
