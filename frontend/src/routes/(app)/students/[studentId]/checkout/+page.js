import { PathGetStudent,PathGetPackagesById,PathGetBillings } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('billings:refresh');
    let res = await fetch(PathGetStudent(params.studentId),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
    let studentResponse = await res.json()

    res = await fetch(PathGetBillings(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
    let billingsResponse = await res.json()

    // res = await fetch(PathGetPackagesById(url.searchParams.get("package")),{
    //     headers:{
    //         Authorization: `${localStorage.getItem("SID")}`
    //     }
    // })
    // redirector(res)

    // let packageResponse = await res.json()
    

    return {student:studentResponse.data.student,billings:billingsResponse.data.billings}
};
