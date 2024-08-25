import { c as create_ssr_component, s as setContext, h as add_attribute, e as escape, v as validate_component } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { A as AddCanteenModal, C as CanteensTable } from './AddCanteenModal-09d619c6.js';
import { w as writable } from './index2-7897530e.js';
import './stores-fc2c2f25.js';
import './translation-88f21498.js';
import './index-64aa7a5e.js';
import 'qr-code-styling';
import 'print-js';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';
import './SchoolsTableCollapse-505cea76.js';
import './ModalPagination-ba97b167.js';
import './Accordion-5106493f.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canteensList;
  let school;
  let canteensPagination;
  let { data } = $$props;
  let canteensPage;
  setContext("apiStore", { apiStore: writable("") });
  setContext("canteenStore", { canteenStore: writable({}) });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  canteensList = data.canteensResponse.data.canteens;
  school = data.canteensResponse.data.school;
  canteensPagination = data.canteensResponse.pagination;
  return `<div class="row"${add_attribute("this", canteensPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(school.name)}&#39;s</span> Canteens Management</h4></div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.storeBySchool") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addCanteenModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1ezwblx"><i class="ri-add-line align-bottom me-1"></i>Add Canteen</button> ${validate_component(AddCanteenModal, "AddCanteenModal").$$render($$result, { schoolId: school.id }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.indexBySchool") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Canteen" }, {}, {})} ${validate_component(CanteensTable, "CanteensTable").$$render($$result, { canteensList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, canteensPagination), {}, {})} </div>   </div>` : ``} </div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-f1ad1296.js.map
