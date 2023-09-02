import { PathGetPermissions } from "$lib/api/paths"
export async function load(e) {
    let permissionsResponse = (await (await fetch(PathGetPermissions())).json()) 
    return {permissionsResponse}
};