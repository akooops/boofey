import { q as PathGetSubStatus } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("todaySubs:refresh");
  let level = url.searchParams.get("level");
  let grade = url.searchParams.get("grade");
  let school = url.searchParams.get("school");
  let res = await fetch(PathGetSubStatus({ school, level, grade }), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let todaySubs = await res.json();
  return { todaySubs };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 36;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-edc6fb0c.js')).default;
const universal_id = "src/routes/(app)/admin/reports/subsriptionStatus/+page.js";
const imports = ["_app/immutable/nodes/36.76ee7f42.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/Progress.9dbf192f.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=36-06708faa.js.map