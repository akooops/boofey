import { r as refresher, P as ProfileData } from './auth-d76f3c60.js';
import './navigation-766853ab.js';
import './paths-53224d1e.js';
import './utils-5d589345.js';
import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, cookies, url, depends }) {
  await refresher();
  let userResponse = await ProfileData();
  return { userResponse };
}

var _layout = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-7b55fe2f.js')).default;
const universal_id = "src/routes/(app)/+layout.js";
const imports = ["_app/immutable/nodes/2.3701c9d4.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/initApp.110985ec.js","_app/immutable/chunks/env.ca395d4c.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _layout as universal, universal_id };
//# sourceMappingURL=2-8251468f.js.map
