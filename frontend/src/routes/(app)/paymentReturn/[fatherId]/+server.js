import { json, redirect } from '@sveltejs/kit';
import {PathAddPaymentMethod} from "$lib/api/paths.js"

export async function POST({ request, cookies,url,params }) {
	let values = await request.formData();
	
	let formData = new FormData()

	if(values.get("status") != 18){
		throw redirect(303, `/paymentMethods/add?status=fail&msg=${values.get("response_message")}`);
	}

	formData.set("card_number",values.get("card_number"))
	formData.set("card_holder_name",values.get("card_holder_name"))
	formData.set("card_bin",values.get("card_bin"))
	formData.set("token_name",values.get("token_name"))
	formData.set("expiry_date",values.get("expiry_date"))



	let res = await fetch(PathAddPaymentMethod(params.fatherId),{
        method:"POST",
        body:values
    })

	res = await res.json()

	throw redirect(303, '/paymentMethods?status=success');
}