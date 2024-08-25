import { h as PathGetInvoiceDetails } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  let res = await fetch(PathGetInvoiceDetails(params.invoiceId, "parent"), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let invoiceDetailsResponse = await res.json();
  return { invoice: invoiceDetailsResponse.data.invoice, tabTitle: "Invoice Details", arTabTitle: "تفاصيل الفاتورة" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 53;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-b4170c6e.js')).default;
const universal_id = "src/routes/(app)/invoices/[invoiceId]/+page.js";
const imports = ["_app/immutable/nodes/53.f21f5423.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/ReceiptCard.adb0e844.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=53-76987cf0.js.map
