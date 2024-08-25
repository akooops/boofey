import { H as PathGetBillings, I as PathInitSubscription, C as PathGetPaymentMethods, D as DefaultGetQueries } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("checkOut:refresh");
  let res = await fetch(PathGetBillings(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let billingsResponse = await res.json();
  let formData = new FormData();
  formData.set("package_id", url.searchParams.get("package"));
  formData.set("student_id", params.studentId);
  res = await fetch(PathInitSubscription(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    },
    body: formData,
    method: "POST"
  });
  redirector(res);
  let initPaymentResponse = await res.json();
  if (initPaymentResponse.status == "error") {
    return {
      status: initPaymentResponse.status,
      errors: initPaymentResponse.errors,
      student: null,
      subscription: null,
      package: null,
      customerIp: null,
      customerEmail: null,
      billings: null,
      paymentMethods: null,
      tabTitle: "Check Out",
      arTabTitle: "الدفع"
    };
  }
  res = await fetch(PathGetPaymentMethods(DefaultGetQueries(url)), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let paymentMethodsResponse = await res.json();
  return {
    student: initPaymentResponse.data.student,
    subscription: initPaymentResponse.data.subscription,
    package: initPaymentResponse.data.package,
    customerIp: initPaymentResponse.data.customer_ip,
    customerEmail: initPaymentResponse.data.customer_email,
    billings: billingsResponse.data.billings,
    paymentMethods: paymentMethodsResponse.data.paymentMethods,
    tabTitle: "Check Out",
    arTabTitle: "الدفع"
  };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 60;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-4881a1fa.js')).default;
const universal_id = "src/routes/(app)/students/[studentId]/checkout/+page.js";
const imports = ["_app/immutable/nodes/60.9afa38f6.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/env.ca395d4c.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/public.8f30a3fb.js","_app/immutable/chunks/inputMasks.e5f11846.js","_app/immutable/chunks/cleave-esm.c0d0931e.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=60-6fa53934.js.map
