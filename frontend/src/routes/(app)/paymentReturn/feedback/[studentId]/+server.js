import { fail, json, redirect } from '@sveltejs/kit';
import {PathAddPaymentMethod,PathCheckPaymentRedirection} from "$lib/api/paths.js"

export async function POST({ request, cookies,url,params }) {
	let values = await request.formData();
   
    let formData = new FormData()
    for (let pair of values.entries()) {
        formData.set(pair[0],pair[1]); 
    }

    console.log("feedback")

    let res = await fetch(PathCheckPaymentRedirection(values.get("merchant_reference")),{
        method:"POST",
        // body:formData
    })
    res = await res.json()
    console.log(res)
    let msg = res?.error?.message == null ? "" : `&msg=${res?.error?.message}`
    console.log(`/students/${params.studentId}/subscriptions?status=${res.status}${msg}`)
	throw redirect(303, `/students/${params.studentId}/subscriptions?status=${res.status}${msg}`);
}