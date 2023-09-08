import { PathGetAcademicBreaks,DefaultGetQueries } from "$lib/api/paths"
export async function load({url,depends,params}) {
    depends('breaks:refresh');
    let breaksResponse = (await (await fetch(PathGetAcademicBreaks(params.yearId,DefaultGetQueries(url)))).json()) 
    return {breaksResponse}
};