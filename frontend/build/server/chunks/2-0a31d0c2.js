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
const imports = ["_app/immutable/nodes/2.03a1a2db.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/initApp.110985ec.js","_app/immutable/chunks/env.ca395d4c.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _layout as universal, universal_id };
//# sourceMappingURL=2-0a31d0c2.js.map
