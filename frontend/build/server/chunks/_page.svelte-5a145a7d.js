import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { l as loadDefaultDate } from './initFlatpickr-2edd9049.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeleteYearModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $yearStore, $$unsubscribe_yearStore;
  let close;
  let { yearStore } = getContext("yearStore");
  $$unsubscribe_yearStore = subscribe(yearStore, (value) => $yearStore = value);
  $$unsubscribe_yearStore();
  return `<div id="deleteYearModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$yearStore.name} #${$yearStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
let currentBadge = "badge bg-success-subtle text-success ms-1";
let notCurrentBadge = "badge bg-danger-subtle text-danger ms-1";
const ViewYearModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $yearStore, $$unsubscribe_yearStore;
  let { yearStore } = getContext("yearStore");
  $$unsubscribe_yearStore = subscribe(yearStore, (value) => $yearStore = value);
  $$unsubscribe_yearStore();
  return `<div class="modal fade" id="viewYearModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1oqtrow"><h5 class="modal-title" id="exampleModalgridLabel">View Academic Year</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Name : <span class="fw-normal">${escape($yearStore.name)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">From : <span class="fw-normal">${escape($yearStore.from)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">To : <span class="fw-normal">${escape($yearStore.to)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Academic Days : <span class="fw-normal">${escape($yearStore.academicDays)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Current : <span${add_attribute("class", $yearStore.current ? currentBadge : notCurrentBadge, 0)}>${escape($yearStore.current ? "current" : "not current")}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">${escape(formatTimestamp($yearStore.created_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">${escape(formatTimestamp($yearStore.updated_at))}</span></h6></div></div></div>  <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditYearModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $yearStore, $$unsubscribe_yearStore;
  let { yearStore } = getContext("yearStore");
  $$unsubscribe_yearStore = subscribe(yearStore, (value) => $yearStore = value);
  let close;
  let form;
  let from;
  let to;
  yearStore.subscribe(() => {
    if (Object.keys($yearStore).length == 0)
      return;
    loadDefaultDate(from, $yearStore.from);
    loadDefaultDate(to, $yearStore.to);
  });
  $$unsubscribe_yearStore();
  return `<div class="modal fade" id="editYearModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-46mt1s"><h5 class="modal-title" id="exampleModalgridLabel">Edit Year</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="yearName" class="form-label" data-svelte-h="svelte-1vopz8w">Year Name</label> <input type="text" class="form-control" id="yearName" name="name" placeholder="Enter Year name"${add_attribute("value", $yearStore.name, 0)}> ${``}</div> <div class="col-xxl-6"><label for="from" class="form-label" data-svelte-h="svelte-131zvm2">From</label> <input type="text" name="from" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="from"${add_attribute("this", from, 0)}> ${``}</div> <div class="col-xxl-6"><label for="to" class="form-label" data-svelte-h="svelte-10t43u0">To</label> <input type="text" name="to" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="to"${add_attribute("this", to, 0)}> ${``}</div> <div><div class="form-switch form-switch-success"><input class="form-check-input" type="checkbox" role="switch" id="currentCheck"${add_attribute("checked", $yearStore.current, 1)}> <label class="form-check-label" for="currentCheck" data-svelte-h="svelte-u2kjjs">Current Year</label></div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const YearItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_yearStore;
  let { year } = $$props;
  let { yearStore } = getContext("yearStore");
  $$unsubscribe_yearStore = subscribe(yearStore, (value) => value);
  if ($$props.year === void 0 && $$bindings.year && year !== void 0)
    $$bindings.year(year);
  $$unsubscribe_yearStore();
  return `<tr scope="row"${add_attribute("class", year.current ? "table-active bg-success-subtle" : "", 0)}><td data-svelte-h="svelte-1z5pzi"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(year.id)}</td> <td>${escape(year.name)} ${year.current ? ` <span class="badge bg-success-subtle text-success ms-1" data-svelte-h="svelte-us3cjl">Current</span>` : ``}</td> <td>${escape(year.from)}</td> <td>${escape(year.to)}</td> <td>${escape(year.academicDays)}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.index") ? `<span><a href="${"/admin/schools/" + escape(year.school_id, true) + "/academicYears/" + escape(year.id, true) + "/academicBreaks"}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Academic Breaks"><i class="ri-calendar-2-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewYearModal" data-svelte-h="svelte-1iu1l27"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.update") ? `<span data-bs-toggle="modal" data-bs-target="#editYearModal" data-svelte-h="svelte-14w4s9i"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${!year.current ? `${JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteYearModal" data-svelte-h="svelte-nq7ebo"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}` : ``}</div></td></tr>`;
});
const YearsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { yearsList } = $$props;
  setContext("yearStore", { yearStore: writable({}) });
  if ($$props.yearsList === void 0 && $$bindings.yearsList && yearsList !== void 0)
    $$bindings.yearsList(yearsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-mhm9qb"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">From</th> <th scope="col">To</th> <th scope="col">Academic Days</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(yearsList, (year) => {
    return `${validate_component(YearItem, "YearItem").$$render($$result, { year }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeleteYearModal, "DeleteYearModal").$$render($$result, {}, {}, {})} ${validate_component(EditYearModal, "EditYearModal").$$render($$result, {}, {}, {})} ${validate_component(ViewYearModal, "ViewYearModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddYearModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let yearName;
  let close;
  let form;
  let from;
  let to;
  let { schoolId } = $$props;
  let current = false;
  if ($$props.schoolId === void 0 && $$bindings.schoolId && schoolId !== void 0)
    $$bindings.schoolId(schoolId);
  return `<div class="modal fade" id="addYearModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1wcxwyp"><h5 class="modal-title" id="exampleModalgridLabel">Add Year</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="yearName" class="form-label" data-svelte-h="svelte-1vopz8w">Year Name</label> <input type="text" class="form-control" id="yearName" name="name" placeholder="Enter Year name"${add_attribute("value", yearName, 0)}> ${``}</div> <div class="col-xxl-6"><label for="from" class="form-label" data-svelte-h="svelte-131zvm2">From</label> <input type="text" name="from" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="from"${add_attribute("this", from, 0)}> ${``}</div> <div class="col-xxl-6"><label for="to" class="form-label" data-svelte-h="svelte-10t43u0">To</label> <input type="text" name="to" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" id="to"${add_attribute("this", to, 0)}> ${``}</div> <div><div class="form-switch form-switch-success"><input class="form-check-input" name="current" type="checkbox" role="switch" id="currentCheck"${add_attribute("checked", current, 1)}> <label class="form-check-label" for="currentCheck" data-svelte-h="svelte-u2kjjs">Current Year</label></div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let yearsList;
  let school;
  let yearsPagination;
  let { data } = $$props;
  let yearsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  yearsList = data.academicYearsResponse.data.academicYears;
  school = data.academicYearsResponse.data.school;
  yearsPagination = data.academicYearsResponse.pagination;
  return `<div class="row"${add_attribute("this", yearsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(school.name)}&#39;s</span> Academic Years Management</h4></div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addYearModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-reix6q"><i class="ri-add-line align-bottom me-1"></i>Add Academic Year</button> ${validate_component(AddYearModal, "AddYearModal").$$render($$result, { schoolId: school.id }, {}, {})}` : ``}</div> </div> <div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Year" }, {}, {})} ${validate_component(YearsTable, "YearsTable").$$render($$result, { yearsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, yearsPagination), {}, {})} </div>   </div> </div></div> </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5a145a7d.js.map
