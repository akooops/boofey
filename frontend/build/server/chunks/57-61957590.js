import { G as PathGetProfile } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import './utils-5d589345.js';
import './navigation-766853ab.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("profile:refresh");
  let res = await fetch(PathGetProfile(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  redirector(res);
  let profileResponse = await res.json();
  return { profileResponse, tabTitle: "Profile", arTabTitle: "الملف الشخصي" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 57;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-58eb7ae3.js')).default;
const universal_id = "src/routes/(app)/profile/+page.js";
const imports = ["_app/immutable/nodes/57.b8757123.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = ["_app/immutable/assets/57.36b6f74a.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=57-61957590.js.map
