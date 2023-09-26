import { PathGetOrderById } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    // depends('subs:refresh');

    let res = await fetch(PathGetOrderById(params.orderId),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let orderResponse = await res.json()
    return {orderResponse}
};
