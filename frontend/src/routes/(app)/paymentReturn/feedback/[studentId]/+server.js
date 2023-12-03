import { fail, json, redirect } from '@sveltejs/kit';
import {PathAddPaymentMethod,PathCheckPaymentRedirection} from "$lib/api/paths.js"

export async function POST({ request, cookies,url,params }) {
	let values = await request.formData();
   

	throw redirect(303, `/students/${params.studentId}/subscriptions?ref=${values.get("merchant_reference")}`);
}