import { c as create_ssr_component, i as createEventDispatcher, e as escape, h as add_attribute, f as each } from './ssr-69d45533.js';
import { t as translation } from './translation-88f21498.js';

const ModalSearchTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { type } = $$props;
  let searchQuery = "";
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  return `<div class="row mb-4"><div class="col-xxl-6 col-md-6 col-sm-6 col-9"><div class="form-icon"><input type="text" class="form-control form-control-icon" id="iconInput" placeholder="${escape(translation.searchFor[localStorage.getItem("language")], true) + " " + escape(type, true) + "..."}"${add_attribute("value", searchQuery, 0)}> <i class="ri-search-line"></i></div></div> <div class="col-xxl-6 col-md-6 col-sm-6 col-3 ps-0"><button class="btn btn-primary" type="button">${escape(translation.searchBtn[localStorage.getItem("language")])}</button></div></div>`;
});
const ModalPagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { total } = $$props;
  let { pages = [] } = $$props;
  let { current_page = 1 } = $$props;
  let { last_page } = $$props;
  let { from } = $$props;
  let { to } = $$props;
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.current_page === void 0 && $$bindings.current_page && current_page !== void 0)
    $$bindings.current_page(current_page);
  if ($$props.last_page === void 0 && $$bindings.last_page && last_page !== void 0)
    $$bindings.last_page(last_page);
  if ($$props.from === void 0 && $$bindings.from && from !== void 0)
    $$bindings.from(from);
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  return `<div class="row mt-4 align-items-center"><div class="col-sm-12 col-md-6"><p>${escape(translation.showing[localStorage.getItem("language")])} <span class="fw-bold">${escape(from)}</span> ${escape(translation.to[localStorage.getItem("language")])} <span class="fw-bold">${escape(to)}</span> ${escape(translation.of[localStorage.getItem("language")])} <span class="fw-bold">${escape(total)}</span> ${escape(translation.results[localStorage.getItem("language")])}</p></div> <div class="col-sm-12 col-md-6 "><nav><ul class="pagination justify-content-md-end justify-content-sm-start pagination-separated"><li class="${["page-item", current_page == 1 ? "disabled" : ""].join(" ").trim()}"><a class="page-link" href="#">${escape(translation.previous[localStorage.getItem("language")])}</a></li> ${each(pages, (page, i) => {
    return `<li class="${["page-item", current_page == i + 1 ? "active" : ""].join(" ").trim()}"><a class="page-link" href="#">${escape(page)}</a></li>`;
  })} <li class="${["page-item", current_page == last_page ? "disabled" : ""].join(" ").trim()}"><a class="page-link" href="#">${escape(translation.next[localStorage.getItem("language")])}</a></li></ul></nav></div></div>`;
});

export { ModalSearchTable as M, ModalPagination as a };
//# sourceMappingURL=ModalPagination-ba97b167.js.map
