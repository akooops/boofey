import { PathGetOrders,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('orders:refresh');
    let res = await fetch(PathGetOrders(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let ordersResponse = await res.json() 
    return {ordersResponse,tabTitle:"Orders"}
};