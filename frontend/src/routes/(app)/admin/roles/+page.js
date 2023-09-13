import { PathGetRoles,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,url,depends}) {
    depends('roles:refresh');
    let rolesResponse = (await (await fetch(PathGetRoles(DefaultGetQueries(url)))).json()) 
    return {rolesResponse}
};