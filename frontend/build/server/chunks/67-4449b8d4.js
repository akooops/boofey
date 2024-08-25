import { e as error } from './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, cookies, url, depends }) {
  throw error(404);
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 67;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-0464e71e.js')).default;
const universal_id = "src/routes/(auth)/signup/+page.js";
const imports = ["_app/immutable/nodes/67.b5513ed9.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/initApp.110985ec.js","_app/immutable/chunks/Password.86e83035.js","_app/immutable/chunks/inputMasks.e5f11846.js","_app/immutable/chunks/cleave-esm.c0d0931e.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=67-4449b8d4.js.map
