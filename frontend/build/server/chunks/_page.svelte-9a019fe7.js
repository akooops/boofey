import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeleteSchoolModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $schoolStore, $$unsubscribe_schoolStore;
  let close;
  let { schoolStore } = getContext("schoolStore");
  $$unsubscribe_schoolStore = subscribe(schoolStore, (value) => $schoolStore = value);
  $$unsubscribe_schoolStore();
  return `<div id="deleteSchoolModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$schoolStore.name} #${$schoolStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewSchoolModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $schoolStore, $$unsubscribe_schoolStore;
  let { schoolStore } = getContext("schoolStore");
  $$unsubscribe_schoolStore = subscribe(schoolStore, (value) => $schoolStore = value);
  $$unsubscribe_schoolStore();
  return `<div class="modal fade" id="viewSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-vo4jbm"><h5 class="modal-title" id="exampleModalgridLabel">View School</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"> <img class="rounded avatar-xl mb-3 object-fit-cover" alt="School logo" width="200"${add_attribute("src", $schoolStore?.logo?.full_path, 0)}> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Name : <span class="fw-normal">${escape($schoolStore.name)}</span></h6></div></div></div> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Arabic Name : <span class="fw-normal">${escape($schoolStore.name_ar)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Code : ${$schoolStore.code == null ? `<span class="badge bg-dark-subtle text-body" data-svelte-h="svelte-1ho72z9">not set</span>` : `<span class="badge border border-primary text-primary">${escape($schoolStore.code)}</span>`}`;
    }
  })} <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">${escape(formatTimestamp($schoolStore.created_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">${escape(formatTimestamp($schoolStore.updated_at))}</span></h6></div></div></div>  <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditSchoolModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $schoolStore, $$unsubscribe_schoolStore;
  let { schoolStore } = getContext("schoolStore");
  $$unsubscribe_schoolStore = subscribe(schoolStore, (value) => $schoolStore = value);
  let editLogo = false;
  let close;
  let form;
  $$unsubscribe_schoolStore();
  return `<div class="modal fade" id="editSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1wlxa9b"><h5 class="modal-title" id="exampleModalgridLabel">Edit School</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-1xl4rti">School Name</label> <input type="text" name="name" class="form-control" id="name" placeholder="Enter Permission name"${add_attribute("value", $schoolStore.name, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المدرسة"${add_attribute("value", $schoolStore.name_ar, 0)}> ${``}</div> <div><label for="name" class="form-label" data-svelte-h="svelte-wn3myo">School Code</label> <input type="text" name="code" class="form-control" id="name" placeholder="Enter School code"${add_attribute("value", $schoolStore.code, 0)}> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", $schoolStore.qr_enabled, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-cpsw30">Enable Qr</label> </div> ${``}</div> <div class="mb-2 col-lg-12"><input class="form-check-input" type="checkbox" id="formCheck1"${add_attribute("checked", editLogo, 1)}> <label class="form-check-label" for="formCheck1" data-svelte-h="svelte-1o8itvp">Edit Logo</label></div> ${`<figure class="figure"><img alt="school logo " width="200"${add_attribute("src", $schoolStore?.logo?.full_path, 0)} class="figure-img rounded avatar-xl mb-3 object-fit-cover"> <figcaption class="figure-caption" data-svelte-h="svelte-jjqvvu">Current School logo</figcaption></figure>`} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const SchoolItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_schoolStore;
  let { school } = $$props;
  let { schoolStore } = getContext("schoolStore");
  $$unsubscribe_schoolStore = subscribe(schoolStore, (value) => value);
  let yearsToolTip;
  let packagesToolTip;
  let canteensToolTip;
  let studentsToolTip;
  let divisionToolTip;
  if ($$props.school === void 0 && $$bindings.school && school !== void 0)
    $$bindings.school(school);
  $$unsubscribe_schoolStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(school.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(school.name)}</div></div></td> <td>${escape(school.name_ar)}</td> <td>${school.code == null ? `<span class="badge bg-dark-subtle text-body" data-svelte-h="svelte-1ho72z9">not set</span>` : `<span class="badge border border-primary text-primary">${escape(school.code)}</span>`}</td> <td>${school.qr_enabled ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-l8rn2p">Enabled</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-1402q06">Disabled</span>`}</td> <td><div class="hstack gap-3"><span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Students"${add_attribute("this", studentsToolTip, 0)} data-svelte-h="svelte-vkkerb"><i class="ri-user-2-line"></i></a></span>  <span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Divisions"${add_attribute("this", divisionToolTip, 0)} data-svelte-h="svelte-18owbv5"><i class="ri-layout-2-line"></i></a></span>  ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteens.indexBySchool") ? `<span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Canteens"${add_attribute("this", canteensToolTip, 0)} data-svelte-h="svelte-156fc8e"><i class="ri-restaurant-2-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("packages.indexBySchool") ? `<span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Packages"${add_attribute("this", packagesToolTip, 0)} data-svelte-h="svelte-s8kr5b"><i class="ri-archive-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("academicYears.indexBySchool") ? `<span><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Academic Years"${add_attribute("this", yearsToolTip, 0)} data-svelte-h="svelte-1hseue2"><i class="ri-calendar-2-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("schools.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewSchoolModal" data-svelte-h="svelte-9su5tr"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("schools.update") ? `<span data-bs-toggle="modal" data-bs-target="#editSchoolModal" data-svelte-h="svelte-c12cae"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("schools.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteSchoolModal" data-svelte-h="svelte-5eg9lg"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const SchoolsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { schoolsList } = $$props;
  setContext("schoolStore", { schoolStore: writable({}) });
  if ($$props.schoolsList === void 0 && $$bindings.schoolsList && schoolsList !== void 0)
    $$bindings.schoolsList(schoolsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-11jncnv"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">Arabic Name</th> <th scope="col">code</th> <th scope="col">Qr</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(schoolsList, (school) => {
    return `${validate_component(SchoolItem, "SchoolItem").$$render($$result, { school }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeleteSchoolModal, "DeleteSchoolModal").$$render($$result, {}, {}, {})} ${validate_component(EditSchoolModal, "EditSchoolModal").$$render($$result, {}, {}, {})} ${validate_component(ViewSchoolModal, "ViewSchoolModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddSchoolModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let form;
  let schoolName = "";
  let enableQr = true;
  return `<div class="modal fade" id="addSchoolModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-3muebo"><h5 class="modal-title" id="exampleModalgridLabel">Add School</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-1xl4rti">School Name</label> <input type="text" name="name" class="form-control" id="name" placeholder="Enter School name"${add_attribute("value", schoolName, 0)}> ${``}</div> <div><label for="productarName" class="form-label" data-svelte-h="svelte-1nwxuze">Arabic Name</label> <input type="text" class="form-control" id="productName" name="name_ar" dir="rtl" placeholder="ادخل اسم المدرسة"> ${``}</div> <div><label for="name" class="form-label" data-svelte-h="svelte-wn3myo">School Code</label> <input type="text" name="code" class="form-control" id="name" placeholder="Enter School code"> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", enableQr, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-cpsw30">Enable Qr</label> </div> ${``}</div> <div><label for="formFile" class="form-label" data-svelte-h="svelte-dxkggt">School Logo</label> <input class="form-control" name="file" type="file" id="formFile"> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let schoolsList;
  let schoolsPagination;
  let { data } = $$props;
  let schoolsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  schoolsList = data.schoolsResponse.data;
  schoolsPagination = data.schoolsResponse.pagination;
  return `<div class="row"${add_attribute("this", schoolsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-me4yy8">Schools Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("schools.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addSchoolModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-2pewrt"><i class="ri-add-line align-bottom me-1"></i>Add School</button> ${validate_component(AddSchoolModal, "AddSchoolModal").$$render($$result, {}, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("schools.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "School" }, {}, {})} ${validate_component(SchoolsTable, "SchoolsTable").$$render($$result, { schoolsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, schoolsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-9a019fe7.js.map
