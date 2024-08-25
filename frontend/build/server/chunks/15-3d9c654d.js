const ssr = false;
async function load({ fetch, url, depends, params }) {
  return { tabTitle: `Qr Exit` };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-bbe7d725.js')).default;
const universal_id = "src/routes/(app)/admin/canteens/[canteenId]/qr-exit/+page.js";
const imports = ["_app/immutable/nodes/15.e2a9bc1f.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/stores.b420ea9f.js","_app/immutable/chunks/_commonjsHelpers.725317a4.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=15-3d9c654d.js.map
