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
const imports = ["_app/immutable/nodes/57.f07cf68f.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/translation.098a1f9d.js"];
const stylesheets = ["_app/immutable/assets/57.36b6f74a.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=57-098906f4.js.map
