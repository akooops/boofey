import { PathGetUsers,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,url,depends}) {
    depends('users:refresh');
    let usersResponse = (await (await fetch(PathGetUsers(DefaultGetQueries(url)))).json()) 
    return {usersResponse}
};