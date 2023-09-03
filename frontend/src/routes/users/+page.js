import { PathGetUsers } from "$lib/api/paths"
export async function load({depends}) {
    depends('users:refresh');
    let usersResponse = (await (await fetch(PathGetUsers())).json()) 
    return {usersResponse}
};