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
  return { orderResponse, tabTitle: "Edit Order" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-7f4abf70.js')).default;
const universal_id = "src/routes/(app)/admin/canteens/[canteenId]/orders/[orderId]/edit/+page.js";
const imports = ["_app/immutable/nodes/12.7aec9a16.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/AddProductToCart.2b6b4099.js","_app/immutable/chunks/Product.15ce7b79.js","_app/immutable/chunks/ModalPagination.ba1b79f6.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=12-be8b997f.js.map
