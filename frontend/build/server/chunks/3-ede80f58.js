async function load({ fetch, url, depends, params }) {
  return { tabTitle: "Revenues", arTabTitle: "الدخل" };
}

var _layout = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-e2c8b54c.js')).default;
const universal_id = "src/routes/(app)/admin/reports/revenues/+layout.js";
const imports = ["_app/immutable/nodes/3.f45675e5.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/initFlatpickr.06386e0f.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _layout as universal, universal_id };
//# sourceMappingURL=3-ede80f58.js.map
