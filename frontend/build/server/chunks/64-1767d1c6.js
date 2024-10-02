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
    if (authResponse?.data?.user?.verified == false) {
      goto("/verification");
    }
    console.log("i am pos", authResponse?.data?.user?.roles[0]?.name);
    if (authResponse?.data?.user?.roles[0]?.name == "parent") {
      goto("/");
    } else if (authResponse?.data?.user?.roles[0]?.name == "pos") {
      goto("/admin/canteens");
    } else {
      goto("/admin");
    }
  }
  return { tabTitle: "Sign In", arTabTitle: "تسجيل الدخول" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 64;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-249f6410.js')).default;
const universal_id = "src/routes/(auth)/admin/signin/+page.js";
const imports = ["_app/immutable/nodes/64.c561d157.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/initApp.110985ec.js","_app/immutable/chunks/Password.86e83035.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=64-1767d1c6.js.map