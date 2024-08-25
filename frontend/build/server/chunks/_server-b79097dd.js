import { r as redirect } from './index-64aa7a5e.js';
import { O as PathAddPaymentMethod } from './paths-53224d1e.js';
import './utils-5d589345.js';

async function POST({ request, cookies, url, params }) {
  let values = await request.formData();
  console.log([...values]);
  let formData = new FormData();
  if (values.get("status") != 18 && url.searchParams.get("student") == null) {
    throw redirect(303, `/paymentMethods/add?status=fail&msg=${values.get("response_message")}`);
  }
  formData.set("card_number", values.get("card_number"));
  formData.set("card_holder_name", values.get("card_holder_name"));
  formData.set("card_bin", values.get("card_bin"));
  formData.set("token_name", values.get("token_name"));
  formData.set("expiry_date", values.get("expiry_date"));
  let res = await fetch(PathAddPaymentMethod(params.fatherId), {
    method: "POST",
    body: values
  });
  res = await res.json();
  console.log(res);
  if (url.searchParams.get("student")) {
    if (res.status == "success") {
      throw redirect(303, `/students/${url.searchParams.get("student")}/checkout?package=${url.searchParams.get("package")}&billing=${url.searchParams.get("billing")}&payment=${res.data.payment_method_id}`);
    } else {
      throw redirect(303, `/students/${url.searchParams.get("student")}/checkout?package=${url.searchParams.get("package")}&error=${values.get("response_message")}`);
    }
  } else {
    throw redirect(303, "/paymentMethods?status=success");
  }
}

export { POST };
//# sourceMappingURL=_server-b79097dd.js.map
