const ssr = false;
async function load({ fetch, url, depends, params }) {
  depends("dash:refresh");
  return { tabTitle: "Dashboard" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-cd8d56c1.js')).default;
const universal_id = "src/routes/(app)/admin/+page.js";
const imports = ["_app/immutable/nodes/8.6987fcc4.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/Progress.9dbf192f.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/_commonjsHelpers.725317a4.js","_app/immutable/chunks/initFlatpickr.06386e0f.js","_app/immutable/chunks/swiper-core.611b7cec.js","_app/immutable/chunks/initApp.110985ec.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=8-9494af95.js.map
