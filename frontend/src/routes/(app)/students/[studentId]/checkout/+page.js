import { PathGetPackagesById,PathGetPaymentMethods,PathInitSubscription,PathGetBillings,DefaultGetQueries } from "$lib/api/paths"

import { redirector } from "$lib/api/auth";

export const ssr = false;
export async function load({fetch,url,depends,params}) {
    depends('billings:refresh');


    let res = await fetch(PathGetBillings(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)
    let billingsResponse = await res.json()

    let formData = new FormData()

    formData.set("package_id",url.searchParams.get("package"))
    formData.set("student_id",params.studentId)
    res = await fetch(PathInitSubscription(),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`,
        },
        body:formData,
        method:"POST"
    })
    redirector(res)
    

    let initPaymentResponse = await res.json()

    if(initPaymentResponse.status == "error"){
        return {
            status:initPaymentResponse.status,
            errors:initPaymentResponse.errors,
            student:null,
            subscription:null,
            package:null,
            customerIp:null,
            customerEmail:null,
            billings:null,
            paymentMethods:null,
            tabTitle:"Check Out",
            arTabTitle:"الدفع"
        }
    }

    res = await fetch(PathGetPaymentMethods(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)    
    let paymentMethodsResponse = await res.json()

    return {
        
        student:initPaymentResponse.data.student,
        subscription:initPaymentResponse.data.subscription,
        package:initPaymentResponse.data.package,
        customerIp:initPaymentResponse.data.customer_ip,
        customerEmail:initPaymentResponse.data.customer_email,
        billings:billingsResponse.data.billings,
        paymentMethods:paymentMethodsResponse.data.paymentMethods,
        tabTitle:"Check Out",
        arTabTitle:"الدفع"
    }
};
