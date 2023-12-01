import { fail, json, redirect } from '@sveltejs/kit';
import {PathAddPaymentMethod,PathCheckPaymentRedirection} from "$lib/api/paths.js"

export async function POST({ request, cookies,url,params }) {
	let values = await request.formData();
	
    let res = await fetch(PathCheckPaymentRedirection(values.get("merchant_reference")),{
        method:"POST",
        body:values
    })


    console.log("\n----------\n")
    for (let pair of values.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
	// res = await res.json()
    let status = values.status == 14 ? "success" : "fail"
    let msg = values.get("response_message") == null ? "" : `&msg=${values.get("response_message")}`
	throw redirect(303, `/students/${params.studentId}/subscriptions?status=${status}${msg}`);
}