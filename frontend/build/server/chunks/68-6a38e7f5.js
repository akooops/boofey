import { m as PathAuth } from './paths-53224d1e.js';
import { g as goto } from './navigation-766853ab.js';
import './utils-5d589345.js';

const ssr = false;
async function load({ fetch, cookies, url, depends }) {
  let res = await fetch(PathAuth(), {
    headers: {
      Authorization: `${localStorage.getItem("SID")}`
    }
  });
  if (res.ok) {
    let authResponse = await res.json();
    if (authResponse?.data?.user?.verified == true) {
      if (authResponse?.data?.user?.roles[0]?.name != "parent") {
        goto("/admin");
      } else {
        goto("/students");
      }
    }
    return { user: authResponse.data.user, tabTitle: "Verification", arTabTitle: "تاكيد الحساب" };
  } else {
    goto("/signin");
  }
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 68;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-4d40ea70.js')).default;
const universal_id = "src/routes/(auth)/verification/+page.js";
const imports = ["_app/immutable/nodes/68.da33b2b5.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/initApp.110985ec.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=68-6a38e7f5.js.map
