import { PathGetAcademicYears,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('years:refresh');

    let res = await fetch(PathGetAcademicYears(params.schoolId,DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let academicYearsResponse = await res.json()
    return {academicYearsResponse,tabTitle:"Academic Year"}
};
