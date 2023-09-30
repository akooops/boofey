import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    console.log("inside post ")
	const res = await request.json();



	return json(res, { status: 201 });
}