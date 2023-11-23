import { PathGetPayments,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('payments:refresh');
    let res = await fetch(PathGetPayments(DefaultGetQueries(url),"parent"),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let paymentsResponse = await res.json() 
    return {paymentsResponse,tabTitle:"Payments",arTabTitle:"سجل الدفع"}
};