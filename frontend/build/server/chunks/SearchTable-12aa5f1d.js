import { c as create_ssr_component, b as subscribe, e as escape, h as add_attribute } from './ssr-69d45533.js';
import { p as page } from './stores-fc2c2f25.js';
import { t as translation } from './translation-88f21498.js';

const SearchTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { type } = $$props;
  let searchQuery = "";
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$unsubscribe_page();
  return `<div class="row mb-4"><div class="col-xxl-3 col-md-6 col-sm-6 col-9"><div class="form-icon"><input type="text" class="form-control form-control-icon" id="iconInput" placeholder="${escape(translation.searchFor[localStorage.getItem("language")], true) + " " + escape(type, true) + "..."}"${add_attribute("value", searchQuery, 0)}> <i class="ri-search-line"></i></div></div> <div class="col-xxl-9 col-md-6 col-sm-6 col-3 ps-0"><button class="btn btn-primary" type="button">${escape(translation.searchBtn[localStorage.getItem("language")])}</button></div></div>`;
});

export { SearchTable as S };
//# sourceMappingURL=SearchTable-12aa5f1d.js.map
