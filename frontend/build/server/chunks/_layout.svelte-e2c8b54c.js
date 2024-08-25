import { c as create_ssr_component, b as subscribe, s as setContext, h as add_attribute } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import { p as page } from './stores-fc2c2f25.js';
import { f as formatTimestamp } from './utils-5d589345.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentFilter;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let startDateInput;
  let endDateInput;
  let currentFilter = writable({});
  $$unsubscribe_currentFilter = subscribe(currentFilter, (value) => value);
  setContext("currentFilterStore", { currentFilter });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_currentFilter();
  $$unsubscribe_page();
  return `<div class="row"><div class="col-lg-12"><div class="card" data-svelte-h="svelte-ktaizf"><div class="card-header align-items-center d-flex d-print-none"><h4 class="card-title mb-0 flex-grow-1">Revenues</h4> <div class="flex-shrink-0"></div> </div> </div> <div class="card"><div class="card-header align-items-center d-flex d-print-none flex-wrap"><div class="d-flex align-items-center">  <div class="d-flex align-items-center gap-2"><label for="firstName" class="form-label mb-0 text-nowrap" data-svelte-h="svelte-12vihua">From :</label> <input type="text" name="start_date" class="form-control" placeholder="Insert start date" data-provider="flatpickr"${add_attribute("data-maxdate", formatTimestamp(Date.now()), 0)} data-date-format="Y-m-d" id="from"${add_attribute("this", startDateInput, 0)}></div> <div class="ms-3 d-flex align-items-center gap-2"><label for="firstName" class="form-label mb-0 text-nowrap" data-svelte-h="svelte-r0ryrx">To :</label> <input type="text" name="end_date" class="form-control" placeholder="Insert end date" data-provider="flatpickr"${add_attribute("data-maxdate", formatTimestamp(Date.now()), 0)} data-date-format="Y-m-d" id="from"${add_attribute("this", endDateInput, 0)}></div> <button type="button" class="btn btn-primary waves-effect waves-light ms-3" data-svelte-h="svelte-1pk9nl7">Apply</button></div> </div> <div class="card-body">${slots.default ? slots.default({}) : ``}</div> </div></div></div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-e2c8b54c.js.map
