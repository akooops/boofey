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
    goto("/profile/settings");
  }
  return { tabTitle: "Reset Password", arTabTitle: "تغيير كلمة المرور" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 65;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-35fc7195.js')).default;
const universal_id = "src/routes/(auth)/reset-password/+page.js";
const imports = ["_app/immutable/nodes/65.6d711ab8.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/initApp.110985ec.js","_app/immutable/chunks/Password.86e83035.js","_app/immutable/chunks/inputMasks.e5f11846.js","_app/immutable/chunks/cleave-esm.c0d0931e.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=65-b783caab.js.map
