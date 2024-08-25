import { c as create_ssr_component, b as subscribe, s as setContext, h as add_attribute, v as validate_component, f as each, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { A as AddCanteenModal, C as CanteensTable, V as ViewCanteenModal } from './AddCanteenModal-09d619c6.js';
import { w as writable } from './index2-7897530e.js';
import './index-64aa7a5e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';
import 'qr-code-styling';
import 'print-js';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';
import './SchoolsTableCollapse-505cea76.js';
import './ModalPagination-ba97b167.js';
import './Accordion-5106493f.js';

const CanteenCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_canteenStore;
  let { canteenStore } = getContext("canteenStore");
  $$unsubscribe_canteenStore = subscribe(canteenStore, (value) => value);
  let { canteen } = $$props;
  if ($$props.canteen === void 0 && $$bindings.canteen && canteen !== void 0)
    $$bindings.canteen(canteen);
  $$unsubscribe_canteenStore();
  return `<div class="col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12"><div class="card card-animate p-3 " role="button"><div class="d-flex align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", canteen.school.logo.full_path, 0)} alt="" class="avatar-sm rounded-circle"></div> <div class="flex-grow-1 ms-2"><h5 class="card-title mb-1">${escape(canteen.name)}</h5> <p class="text-muted mb-0">${escape(canteen.school.name)}</p></div>   ${canteen.status == "open" ? `<span class="badge bg-success-subtle text-success">${escape(canteen.status)}</span>` : `<span class="badge bg-danger-subtle text-danger">${escape(canteen.status)}</span>`}</div> </div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canteensList;
  let canteensPagination;
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { data } = $$props;
  let canteensPage;
  setContext("apiStore", { apiStore: writable("") });
  setContext("canteenStore", { canteenStore: writable({}) });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  canteensList = data.canteensResponse.data.canteens;
  canteensPagination = data.canteensResponse.pagination;
  $$unsubscribe_navigating();
  return `<div class="row"${add_attribute("this", canteensPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-1cmpfjx">Canteens Management</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addCanteenModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1ezwblx"><i class="ri-add-line align-bottom me-1"></i>Add Canteen</button> ${validate_component(AddCanteenModal, "AddCanteenModal").$$render($$result, { general: true }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.index") ? `<div class="card-body"><div class="row">${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Canteen" }, {}, {})} ${validate_component(CanteensTable, "CanteensTable").$$render($$result, { canteensList, general: true }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, canteensPagination), {}, {})}</div></div>` : ``} </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.index.simplified") ? `<div class="row">${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Canteen" }, {}, {})} ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-dxv6g9"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : `${each(canteensList, (canteen, _) => {
    return `${validate_component(CanteenCard, "CanteenCard").$$render($$result, { canteen }, {}, {})}`;
  })}`} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, canteensPagination), {}, {})}</div>` : ``}</div> </div> ${validate_component(ViewCanteenModal, "ViewCanteenModal").$$render(
    $$result,
    {
      general: true,
      simple: JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.show.simplified")
    },
    {},
    {}
  )} `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-65146290.js.map
