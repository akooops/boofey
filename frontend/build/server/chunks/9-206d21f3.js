import { P as PathGetCanteens, D as DefaultGetQueries } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends }) {
  depends("canteens:refresh");
  let res = await fetch(PathGetCanteens(null, DefaultGetQueries(url)), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let canteensResponse = await res.json();
  return { canteensResponse, tabTitle: "Canteens" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-92d021de.js')).default;
const universal_id = "src/routes/(app)/admin/canteens/+page.js";
const imports = ["_app/immutable/nodes/9.510f030a.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/Pagination.0a529dad.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/SearchTable.1c079677.js","_app/immutable/chunks/AddCanteenModal.31453fc1.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/print.92311ca4.js","_app/immutable/chunks/_commonjsHelpers.725317a4.js","_app/immutable/chunks/ViewRow.487fb326.js","_app/immutable/chunks/SchoolsTableCollapse.54a8e5ef.js","_app/immutable/chunks/ModalPagination.ba1b79f6.js","_app/immutable/chunks/Accordion.adfb252c.js","_app/immutable/chunks/initToolTip.b2308c6a.js","_app/immutable/chunks/index.955fed47.js"];
const stylesheets = ["_app/immutable/assets/AddCanteenModal.a3659dc3.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=9-206d21f3.js.map
