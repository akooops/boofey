import { PathGetProducts,DefaultGetQueries } from "$lib/api/paths"
import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('products:refresh');

    let category =  url.searchParams.get("category")
    category = category ? category : ""
    let res = await fetch(PathGetProducts(DefaultGetQueries(url),category),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)


    let productsResponse = await res.json() 
    return {productsResponse,tabTitle:"Products"}
};