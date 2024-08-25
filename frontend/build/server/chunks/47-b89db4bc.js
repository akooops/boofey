import './index-64aa7a5e.js';

const ssr = false;
async function load({ fetch, url, depends }) {
  depends("sms:refresh");
  return { tabTitle: "SMS" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 47;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-893223ee.js')).default;
const universal_id = "src/routes/(app)/admin/sms/+page.js";
const imports = ["_app/immutable/nodes/47.bb80d467.js","_app/immutable/chunks/paths.7846b4ff.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/initToolTip.b2308c6a.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/utils.5f096ebf.js","_app/immutable/chunks/singletons.df66ea99.js","_app/immutable/chunks/paths.29c5142d.js","_app/immutable/chunks/auth.82ff8344.js","_app/immutable/chunks/inputMasks.e5f11846.js","_app/immutable/chunks/cleave-esm.c0d0931e.js","_app/immutable/chunks/Accordion.adfb252c.js"];
const stylesheets = ["_app/immutable/assets/47.563cea9f.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=47-b89db4bc.js.map
