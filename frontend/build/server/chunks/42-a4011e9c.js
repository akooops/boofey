import { v as PathGetAcademicBreaks, D as DefaultGetQueries } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("breaks:refresh");
  let res = await fetch(PathGetAcademicBreaks(params.yearId, DefaultGetQueries(url)), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let breaksResponse = await res.json();
  return { breaksResponse, tabTitle: "Academic Breaks" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 42;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5320a9a2.js')).default;
const universal_id = "src/routes/(app)/admin/schools/[schoolId]/academicYears/[yearId]/academicBreaks/+page.js";
const imports = ["_app/immutable/nodes/42.45182be8.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/initFlatpickr.06386e0f.js","_app/immutable/chunks/index.955fed47.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=42-a4011e9c.js.map
