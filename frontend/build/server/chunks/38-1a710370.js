import { r as PathGetTodaySubs } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("todaySubs:refresh");
  let level = url.searchParams.get("level");
  let grade = url.searchParams.get("grade");
  let division = url.searchParams.get("division");
  let res = await fetch(PathGetTodaySubs(params.schoolId, { level, grade, division }), {
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

const index = 38;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-16eaeace.js')).default;
const universal_id = "src/routes/(app)/admin/reports/todaySubscribers/[schoolId]/+page.js";
const imports = ["_app/immutable/nodes/38.be8c749c.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=38-1a710370.js.map
