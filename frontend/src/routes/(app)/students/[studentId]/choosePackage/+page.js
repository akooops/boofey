import { PathGetStudent,PathGetPackagesBySchoolId } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    // depends('packages:refresh');
    let res = await fetch(PathGetStudent(params.studentId),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
    let studentResponse = await res.json()

    res = await fetch(PathGetPackagesBySchoolId(studentResponse.data.student.school_id),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)

    let packagesResponse = await res.json()
    
    return {student:studentResponse.data.student,tabTitle:"Choose Package",arTabTitle:"اختيار الباقة",...packagesResponse.data}
};
