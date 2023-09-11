import { PathGetParents,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,url,depends}) {
    depends('parents:refresh');
    let parentsResponse = (await (await fetch(PathGetParents(DefaultGetQueries(url)))).json()) 
    return {parentsResponse}
};