import { c as create_ssr_component, b as subscribe, h as add_attribute, v as validate_component } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { A as AddPackageModal, P as PackagesTable } from './PackagesTable-7c5c805c.js';
import { p as page } from './stores-fc2c2f25.js';
import './translation-88f21498.js';
import './index-64aa7a5e.js';
import './SchoolsTableCollapse-505cea76.js';
import './ModalPagination-ba97b167.js';
import './Accordion-5106493f.js';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';
import 'svelte-quill';
import './index2-7897530e.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let packagesList;
  let packagesPagination;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let packagesPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  packagesList = data.packagesResponse.data.packages;
  packagesPagination = data.packagesResponse.pagination;
  $$unsubscribe_page();
  return `<div class="row"${add_attribute("this", packagesPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-jnhgcb">Packages Management</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("packages.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addPackageModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-v29cmp"><i class="ri-add-line align-bottom me-1"></i>Add Package</button> ${validate_component(AddPackageModal, "AddPackageModal").$$render($$result, { general: true }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("packages.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Package" }, {}, {})} <div class="col-xl-3 mb-3"><select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", "yearly", 0)} data-svelte-h="svelte-8qey1q">Yearly</option><option${add_attribute("value", "monthly", 0)} data-svelte-h="svelte-1s8t8n4">Monthly</option></select></div> <div class="col-xl-3 mb-3"><select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", "popular", 0)} data-svelte-h="svelte-lax19c">Popular</option><option${add_attribute("value", "not popular", 0)} data-svelte-h="svelte-wqoqg4">Not Popular</option></select></div> <div class="col-xl-3 mb-3"><select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", "hidden", 0)} data-svelte-h="svelte-ucuds6">Hidden</option><option${add_attribute("value", "not hidden", 0)} data-svelte-h="svelte-11fwixo">Not Hidden</option></select></div> ${validate_component(PackagesTable, "PackagesTable").$$render($$result, { packagesList, general: true }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, packagesPagination), {}, {})} </div>   </div>` : ``} </div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-1db85908.js.map
