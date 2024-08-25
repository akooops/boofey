import { g as PathGetInvoices, D as DefaultGetQueries } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends }) {
  depends("invoices:refresh");
  let res = await fetch(PathGetInvoices(DefaultGetQueries(url), "parent"), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let invoicesResponse = await res.json();
  return { invoicesResponse, tabTitle: "Invoices", arTabTitle: "فواتير" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 52;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-f41f3b42.js')).default;
const universal_id = "src/routes/(app)/invoices/+page.js";
const imports = ["_app/immutable/nodes/52.d7712de9.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/Pagination.94643daa.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/SearchTable.d9fb7dc1.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/initToolTip.b2308c6a.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=52-7eeeb303.js.map
