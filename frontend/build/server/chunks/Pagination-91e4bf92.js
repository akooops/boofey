import { c as create_ssr_component, b as subscribe, e as escape, f as each } from './ssr-69d45533.js';
import { p as page } from './stores-fc2c2f25.js';
import { t as translation } from './translation-88f21498.js';

const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { total } = $$props;
  let { pages } = $$props;
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
  $$unsubscribe_page();
  return `<div class="row mt-4 align-items-center flex-wrap"><div class="col-sm-12 col-md-6"><p>${escape(translation.showing[localStorage.getItem("language")])} <span class="fw-bold">${escape(from)}</span> ${escape(translation.to[localStorage.getItem("language")])} <span class="fw-bold">${escape(to)}</span> ${escape(translation.of[localStorage.getItem("language")])} <span class="fw-bold">${escape(total)}</span> ${escape(translation.results[localStorage.getItem("language")])}</p></div> <div class="col-sm-12 col-md-6 pe-0"><nav><ul class="pagination justify-content-md-end justify-content-sm-start pagination-separated pagination-sm"> <li class="${["page-item", current_page == 1 ? "disabled" : ""].join(" ").trim()}"><a class="page-link ms-0" href="#" data-svelte-h="svelte-14onxy8">←</a></li> ${each(pages, (page2, i) => {
    return `<li class="${["page-item", current_page == page2 ? "active" : ""].join(" ").trim()}"><a class="page-link" href="#">${escape(page2)}</a></li>`;
  })}  <li class="${["page-item", current_page == last_page ? "disabled" : ""].join(" ").trim()}"><a class="page-link" href="#" data-svelte-h="svelte-5mrglj">→</a></li></ul></nav></div></div>`;
});

export { Pagination as P };
//# sourceMappingURL=Pagination-91e4bf92.js.map
