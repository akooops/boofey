import { c as create_ssr_component, s as setContext, h as add_attribute, e as escape, v as validate_component, b as subscribe, f as each, d as add_classes, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeleteDivisionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $divisionStore, $$unsubscribe_divisionStore;
  let close;
  let { divisionStore } = getContext("divisionStore");
  $$unsubscribe_divisionStore = subscribe(divisionStore, (value) => $divisionStore = value);
  $$unsubscribe_divisionStore();
  return `<div id="deleteDivisionModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$divisionStore.name} #${$divisionStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewDivisionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $divisionStore, $$unsubscribe_divisionStore;
  let { divisionStore } = getContext("divisionStore");
  $$unsubscribe_divisionStore = subscribe(divisionStore, (value) => $divisionStore = value);
  $$unsubscribe_divisionStore();
  return `<div class="modal fade" id="viewDivisionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-16jl4jo"><h5 class="modal-title" id="exampleModalgridLabel">View Coupon</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($divisionStore.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Name : <span class="fw-normal">${escape($divisionStore.name_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($divisionStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($divisionStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditDivisionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $divisionStore, $$unsubscribe_divisionStore;
  let { divisionStore } = getContext("divisionStore");
  $$unsubscribe_divisionStore = subscribe(divisionStore, (value) => $divisionStore = value);
  let close;
  let form;
  $$unsubscribe_divisionStore();
  return `<div class="modal fade" id="editDivisionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-ewxzyn"><h5 class="modal-title" id="exampleModalgridLabel">Add Division</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="divisionName" class="form-label" data-svelte-h="svelte-yxozon">Name</label> <input type="text" class="form-control" id="divisionName" name="name" placeholder="Enter Division name"${add_attribute("value", $divisionStore.name, 0)}> ${``}</div> <div><label for="divisionarName" class="form-label" data-svelte-h="svelte-1kktvq2">Arabic Name</label> <input type="text" class="form-control" id="divisionName" name="name_ar" dir="rtl" placeholder="ادخل اسم القسم"${add_attribute("value", $divisionStore.name_ar, 0)}> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const DivisionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_divisionStore;
  let { division } = $$props;
  let { divisionStore } = getContext("divisionStore");
  $$unsubscribe_divisionStore = subscribe(divisionStore, (value) => value);
  if ($$props.division === void 0 && $$bindings.division && division !== void 0)
    $$bindings.division(division);
  $$unsubscribe_divisionStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(division.id)}</td> <td>${escape(division.name)}</td> <td>${escape(division.name_ar)}</td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewDivisionModal" data-svelte-h="svelte-2k10vf"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.update") ? `<span data-bs-toggle="modal" data-bs-target="#editDivisionModal" data-svelte-h="svelte-4xehdu"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteDivisionModal" data-svelte-h="svelte-12qhecw"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const DivisionsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { divisionsList } = $$props;
  setContext("divisionStore", { divisionStore: writable({}) });
  if ($$props.divisionsList === void 0 && $$bindings.divisionsList && divisionsList !== void 0)
    $$bindings.divisionsList(divisionsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive">²
        <table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-bep7pd"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">Arabic name</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(divisionsList, (division) => {
    return `${validate_component(DivisionItem, "DivisionItem").$$render($$result, { division }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(EditDivisionModal, "EditDivisionModal").$$render($$result, {}, {}, {})} ${validate_component(ViewDivisionModal, "ViewDivisionModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteDivisionModal, "DeleteDivisionModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddDivisionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { schoolId } = $$props;
  let divisionName;
  let close;
  let form;
  if ($$props.schoolId === void 0 && $$bindings.schoolId && schoolId !== void 0)
    $$bindings.schoolId(schoolId);
  return `<div class="modal fade" id="addDivisionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-ewxzyn"><h5 class="modal-title" id="exampleModalgridLabel">Add Division</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="divisionName" class="form-label" data-svelte-h="svelte-yxozon">Name</label> <input type="text" class="form-control" id="divisionName" name="name" placeholder="Enter Division name"${add_attribute("value", divisionName, 0)}> ${``}</div> <div><label for="divisionarName" class="form-label" data-svelte-h="svelte-1kktvq2">Arabic Name</label> <input type="text" class="form-control" id="divisionName" name="name_ar" dir="rtl" placeholder="ادخل اسم القسم"> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let divisionsList;
  let school;
  let divisionsPagination;
  let { data } = $$props;
  let divisionsPage;
  setContext("divisionStore", { divisionStore: writable({}) });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  divisionsList = data.divisionsResponse.data.divisions;
  school = data.divisionsResponse.data.school;
  divisionsPagination = data.divisionsResponse.pagination;
  return `<div class="row"${add_attribute("this", divisionsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(school.name)}&#39;s</span> Divisions Management</h4></div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addDivisionModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-spi3o3"><i class="ri-add-line align-bottom me-1"></i>Add Division</button> ${validate_component(AddDivisionModal, "AddDivisionModal").$$render($$result, { schoolId: school.id }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("divisions.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Division" }, {}, {})} ${validate_component(DivisionsTable, "DivisionsTable").$$render($$result, { divisionsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, divisionsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-bf551958.js.map
