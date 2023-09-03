import { PathGetRoles } from "$lib/api/paths"
export async function load({depends}) {
    depends('roles:refresh');
    let rolesResponse = (await (await fetch(PathGetRoles())).json()) 
    return {rolesResponse}
};