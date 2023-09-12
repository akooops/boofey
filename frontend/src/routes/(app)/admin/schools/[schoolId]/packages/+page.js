import { PathGetPackages,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,url,depends,params}) {
    depends('packages:refresh');
    let packagesResponse = (await (await fetch(PathGetPackages(params.schoolId,DefaultGetQueries(url)))).json()) 
    return {packagesResponse}
};
