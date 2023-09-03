import { PathGetPermissions } from "$lib/api/paths"
export async function load({depends}) {
    depends('permissions:refresh');
    let permissionsResponse = (await (await fetch(PathGetPermissions())).json()) 
    return {permissionsResponse}
};