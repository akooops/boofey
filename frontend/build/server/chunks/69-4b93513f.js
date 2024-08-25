let ssr = false;
async function load({ fetch, url, depends, params }) {
  return { tabTitle: "Privacy Policy", arTabTitle: "سياسات الخصوصية" };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  ssr: ssr
});

const index = 69;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-94ed24fe.js')).default;
const universal_id = "src/routes/privacy-policy/+page.js";
const imports = ["_app/immutable/nodes/69.3ffec566.js","_app/immutable/chunks/scheduler.726ac76d.js","_app/immutable/chunks/index.8a5ed380.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=69-4b93513f.js.map
