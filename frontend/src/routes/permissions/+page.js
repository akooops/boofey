import { PathGetPermissions,DefaultGetQueries } from "$lib/api/paths"
export async function load({url,depends}) {
    depends('permissions:refresh');
    let permissionsResponse = (await (await fetch(PathGetPermissions(DefaultGetQueries(url)))).json()) 
    return {permissionsResponse}
};