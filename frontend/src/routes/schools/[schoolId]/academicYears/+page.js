import { PathGetAcademicYears,DefaultGetQueries } from "$lib/api/paths"
export async function load({fetch,url,depends,params}) {
    depends('years:refresh');
    let academicYearsResponse = (await (await fetch(PathGetAcademicYears(params.schoolId,DefaultGetQueries(url)))).json()) 
    return {academicYearsResponse}
};