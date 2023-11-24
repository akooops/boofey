import { PathGetInvoices,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('invoices:refresh');
    let res = await fetch(PathGetInvoices(DefaultGetQueries(url),"parent"),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let invoicesResponse = await res.json() 
    return {invoicesResponse,tabTitle:"Invoices",arTabTitle:"فواتير"}
};