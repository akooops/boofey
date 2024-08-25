let ssr = false;
async function load({ fetch, url, depends, params }) {
  return { tabTitle: "Terms Of Use", arTabTitle: "شروط الاستخدام" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 70;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-86e20850.js')).default;
const universal_id = "src/routes/terms-of-use/+page.js";
const imports = ["_app/immutable/nodes/70.5cb0ec24.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=70-347bf1ab.js.map
