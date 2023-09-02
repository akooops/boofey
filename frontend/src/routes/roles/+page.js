import { PathGetRoles } from "$lib/api/paths"
export async function load(e) {
    let rolesResponse = (await (await fetch(PathGetRoles())).json()) 
    return {rolesResponse}
};