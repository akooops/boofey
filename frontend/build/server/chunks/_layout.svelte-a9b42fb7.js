import { c as create_ssr_component, b as subscribe, e as escape } from './ssr-69d45533.js';
import { p as page } from './stores-fc2c2f25.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1lv2p29_START -->${$$result.title = `<title>${escape(localStorage.getItem("language") == "ar" ? `${$page.data.arTabTitle} - بووفي` : `${$page.data.tabTitle} - boofey`)}</title>`, ""}<!-- HEAD_svelte-1lv2p29_END -->`, ""} ${slots.default ? slots.default({}) : ``}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-a9b42fb7.js.map
