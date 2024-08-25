import { E as returnUrl, F as PathInitPaymentMethod } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params, parent }) {
  depends("payments:refresh");
  let formData = new FormData();
  let { userResponse } = await parent();
  formData.set("return_url", returnUrl(userResponse.data.father.id));
  let res = await fetch(PathInitPaymentMethod(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    },
    method: "POST",
    body: formData
  });
  redirector(res);
  let paymentMethodInitResponse = await res.json();
  return { paymentMethodInitResponse, fatherId: userResponse.data.father.id, tabTitle: "Add Payment Method", arTabTitle: "اضف وسيلة دفع" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 55;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-03eb9168.js')).default;
const universal_id = "src/routes/(app)/paymentMethods/add/+page.js";
const imports = ["_app/immutable/nodes/55.2cdc9a76.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=55-8fa35aa3.js.map
