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
const imports = ["_app/immutable/nodes/15.0a1383ba.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/stores.1008b3f8.js","_app/immutable/chunks/_commonjsHelpers.725317a4.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=15-b85718e4.js.map
