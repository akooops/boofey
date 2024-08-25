import { r as redirect } from './index-64aa7a5e.js';

async function POST({ request, cookies, url, params }) {
  let values = await request.formData();
  throw redirect(303, `/students/${params.studentId}/subscriptions?ref=${values.get("merchant_reference")}`);
}

export { POST };
//# sourceMappingURL=_server-824d01aa.js.map
