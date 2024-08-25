import { c as create_ssr_component, b as subscribe, s as setContext, e as escape, h as add_attribute, v as validate_component } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import { S as SchoolsTableCollapse } from './SchoolsTableCollapse-505cea76.js';
import { p as page } from './stores-fc2c2f25.js';
import './index-64aa7a5e.js';
import './ModalPagination-ba97b167.js';
import './translation-88f21498.js';
import './Accordion-5106493f.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentFilter;
  let $$unsubscribe_page;
  let $selectedSchool, $$unsubscribe_selectedSchool;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let close;
  let selectedSchool = writable({});
  $$unsubscribe_selectedSchool = subscribe(selectedSchool, (value) => $selectedSchool = value);
  let currentFilter = writable("All");
  $$unsubscribe_currentFilter = subscribe(currentFilter, (value) => value);
  setContext("selectedSchoolStore", { selectedSchool });
  setContext("currentFilterStore", { currentFilter });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_currentFilter();
  $$unsubscribe_page();
  $$unsubscribe_selectedSchool();
  return `<div class="row"><div class="col-lg-12"><div class="card" data-svelte-h="svelte-vqfnjo"><div class="card-header align-items-center d-flex d-print-none"><h4 class="card-title mb-0 flex-grow-1">Subsription Status</h4> <div class="flex-shrink-0"></div> </div> </div> <div class="card"><div class="card-header align-items-center d-flex d-print-none flex-wrap">${$selectedSchool?.logo != null ? `<img${add_attribute("src", $selectedSchool?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle me-2">` : ``} <h4 class="card-title mb-0">${escape($selectedSchool?.name ? $selectedSchool.name : "No School Selected")} <span data-bs-toggle="modal" data-bs-target="#selectSchool" data-svelte-h="svelte-1q04hzs"><a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-original-title="Select"><i class="ri-edit-2-line"></i></a></span></h4> <div class="d-flex align-items-center ms-auto">  <div class="d-flex align-items-center gap-2"><label for="firstName" class="form-label mb-0 text-nowrap" data-svelte-h="svelte-7g7cbt">Filter By :</label> <select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "level", 0)} data-svelte-h="svelte-89wzkk">Level</option><option${add_attribute("value", "grade", 0)} data-svelte-h="svelte-1jkzslo">Grade</option></select></div> <span class="ms-3">${`<div class="d-flex align-items-center gap-2"><label for="firstName" class="form-label mb-0" data-svelte-h="svelte-59jyzl">Level</label> <select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-1x0123k">Primary School</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-10san4g">Meduim School</option><option${add_attribute("value", 2, 0)} data-svelte-h="svelte-k0kzc2">Secondary School</option></select></div>`}</span> <button type="button" class="btn btn-primary waves-effect waves-light ms-3" data-svelte-h="svelte-1pk9nl7">Apply</button></div> </div> <div class="card-body">${slots.default ? slots.default({}) : ``}</div> </div></div></div> <div class="modal fade" id="selectSchool" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel" data-svelte-h="svelte-18v9dd8">Select School</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"${add_attribute("this", close, 0)}></button></div> <div class="modal-body"> ${validate_component(SchoolsTableCollapse, "SchoolsTableCollapse").$$render(
    $$result,
    {
      collapse: false,
      selected: $selectedSchool,
      title: "Schools"
    },
    {},
    {}
  )}</div></div></div></div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-866188cb.js.map
