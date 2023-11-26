import { PathGetPackages,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends}) {
    depends('packages:refresh');
    let popular =  url.searchParams.get("popular")
    if(popular){
        popular = popular == "true" ? "true" : "false"
    }else {
        popular = ""
    }
    
    let hidden =  url.searchParams.get("hidden")
    if(hidden){
        hidden = hidden == "true" ? "true" : "false"
    }else {
        hidden = ""
    }
    
    
    let yearly =  url.searchParams.get("yearly")
    if(yearly){
        yearly = yearly == "true" ? "true" : "false"
    }else {
        yearly = ""
    }
    

    let res = await fetch(PathGetPackages(null,DefaultGetQueries(url),{popular,hidden,yearly}),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let packagesResponse = await res.json() 
    return {packagesResponse,tabTitle:"Packages"}
};
