import { PathGetSchools,DefaultGetQueries } from "$lib/api/paths"
export async function load({url,depends}) {
    depends('schools:refresh');
    let schoolsResponse = (await (await fetch(PathGetSchools(DefaultGetQueries(url)))).json()) 
    return {schoolsResponse}
};