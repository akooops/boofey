import { PathGetPackagesById,PathGetPaymentMethods,PathInitPayment,PathGetBillings,DefaultGetQueries } from "$lib/api/paths"

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


    res = await fetch(PathInitPayment(params.studentId,url.searchParams.get("package")),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        },
        method:"POST"
    })
    redirector(res)
    let initPaymentResponse = await res.json()

    res = await fetch(PathGetPaymentMethods(DefaultGetQueries(url)),{
        headers:{
            Authorization: `${localStorage.getItem("SID")}`
        }
    })
    redirector(res)    
    let paymentMethodsResponse = await res.json()

    return {student:initPaymentResponse.data.student,
        payment:initPaymentResponse.data.payment,
        package:initPaymentResponse.data.package,
        customerIp:initPaymentResponse.data.customer_ip,
        customerEmail:initPaymentResponse.data.customer_email,
        billings:billingsResponse.data.billings,
        paymentMethods:paymentMethodsResponse.data.paymentMethods,
        tabTitle:"Check Out"
    }
};
