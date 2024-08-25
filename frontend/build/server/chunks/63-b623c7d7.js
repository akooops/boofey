import { N as PathGetSubscriptions } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends }) {
  depends("subs:refresh");
  let res = await fetch(PathGetSubscriptions(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let subsResponse = await res.json();
  return { subsResponse, tabTitle: "Subscriptions", arTabTitle: "الاشتراكات" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 63;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-37aad90e.js')).default;
const universal_id = "src/routes/(app)/subscriptions/+page.js";
const imports = ["_app/immutable/nodes/63.be292ace.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/Pagination.0a529dad.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/SearchTable.1c079677.js","_app/immutable/chunks/ViewSubModal.2ad36122.js","_app/immutable/chunks/ViewRow.487fb326.js","_app/immutable/chunks/Progress.9dbf192f.js","_app/immutable/chunks/initToolTip.b2308c6a.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/swiper-core.611b7cec.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=63-b623c7d7.js.map
