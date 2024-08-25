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
const imports = ["_app/immutable/nodes/47.a257d354.js","_app/immutable/chunks/paths.b98f38ef.js","_app/immutable/chunks/index.93323930.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js","_app/immutable/chunks/each.381f634d.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/initToolTip.b2308c6a.js","_app/immutable/chunks/index.955fed47.js","_app/immutable/chunks/toast.aca1940a.js","_app/immutable/chunks/utils.7c7f4a39.js","_app/immutable/chunks/singletons.08415598.js","_app/immutable/chunks/paths.0e30d36d.js","_app/immutable/chunks/auth.660986fb.js","_app/immutable/chunks/inputMasks.e5f11846.js","_app/immutable/chunks/cleave-esm.c0d0931e.js","_app/immutable/chunks/Accordion.adfb252c.js"];
const stylesheets = ["_app/immutable/assets/47.563cea9f.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=47-293133c5.js.map
