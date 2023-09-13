import { PathGetCanteens,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,url,depends,params}) {
    depends('canteens:refresh');
    let canteensResponse = (await (await fetch(PathGetCanteens(params.schoolId,DefaultGetQueries(url)))).json()) 
    return {canteensResponse}
};
