import { b as PathGetOrderById } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  let res = await fetch(PathGetOrderById(params.orderId), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let orderResponse = await res.json();
  return { orderResponse, tabTitle: `Print Order #${params.orderId}` };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page@.svelte-aeea67e9.js')).default;
const universal_id = "src/routes/(app)/admin/orders/[orderId]/print/+page.js";
const imports = ["_app/immutable/nodes/26.0f4ca598.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = ["_app/immutable/assets/13.2488d700.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=26-072f31a7.js.map
