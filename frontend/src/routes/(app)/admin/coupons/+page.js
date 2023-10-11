import { PathGetCoupons,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('coupons:refresh');
    let res = await fetch(PathGetCoupons(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let couponsResponse = await res.json() 
    return {couponsResponse,tabTitle:"Coupons"}
};