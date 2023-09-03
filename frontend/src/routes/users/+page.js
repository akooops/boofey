import { PathGetUsers } from "$lib/api/paths"
export async function load(e) {
    let usersResponse = (await (await fetch(PathGetUsers())).json()) 
    return {usersResponse}
};