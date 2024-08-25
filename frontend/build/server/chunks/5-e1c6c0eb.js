async function load({ fetch, url, depends, params }) {
  return { tabTitle: "Daily Preparation", arTabTitle: "التحضير اليومي" };
}

var _layout = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-8c8aa149.js')).default;
const universal_id = "src/routes/(app)/admin/reports/todaySubscribers/+layout.js";
const imports = ["_app/immutable/nodes/5.5554d8a7.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/SchoolsTableCollapse.54a8e5ef.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/ModalPagination.ba1b79f6.js","_app/immutable/chunks/translation.098a1f9d.js","_app/immutable/chunks/Accordion.adfb252c.js","_app/immutable/chunks/DivisionsTableCollapse.167c8c7c.js","_app/immutable/chunks/stores.1008b3f8.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _layout as universal, universal_id };
//# sourceMappingURL=5-e1c6c0eb.js.map
