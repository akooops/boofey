import { p as PathGetRevenues } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("revenues:refresh");
  let start_date = url.searchParams.get("start_date");
  let end_date = url.searchParams.get("end_date");
  let res = await fetch(PathGetRevenues({ start_date, end_date }), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let revenues = await res.json();
  return { ...revenues.data };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 35;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-f1cb92a7.js')).default;
const universal_id = "src/routes/(app)/admin/reports/revenues/+page.js";
const imports = ["_app/immutable/nodes/35.23e01d8d.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=35-9228508b.js.map
