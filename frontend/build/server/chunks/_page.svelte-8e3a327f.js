import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeletePermissionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $permissionStore, $$unsubscribe_permissionStore;
  let close;
  let { permissionStore } = getContext("permissionStore");
  $$unsubscribe_permissionStore = subscribe(permissionStore, (value) => $permissionStore = value);
  $$unsubscribe_permissionStore();
  return `<div id="deletePermissionModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$permissionStore.name} #${$permissionStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewPermissionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $permissionStore, $$unsubscribe_permissionStore;
  let { permissionStore } = getContext("permissionStore");
  $$unsubscribe_permissionStore = subscribe(permissionStore, (value) => $permissionStore = value);
  $$unsubscribe_permissionStore();
  return `<div class="modal fade" id="viewPermissionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-fwqd2z"><h5 class="modal-title" id="exampleModalgridLabel">View Permission</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Name : <span class="fw-normal">${escape($permissionStore.name)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">${escape(formatTimestamp($permissionStore.created_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">${escape(formatTimestamp($permissionStore.updated_at))}</span></h6></div></div></div>  <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditPermissionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $permissionStore, $$unsubscribe_permissionStore;
  let { permissionStore } = getContext("permissionStore");
  $$unsubscribe_permissionStore = subscribe(permissionStore, (value) => $permissionStore = value);
  let close;
  let form;
  $$unsubscribe_permissionStore();
  return `<div class="modal fade" id="editPermissionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1iyfbl6"><h5 class="modal-title" id="exampleModalgridLabel">Edit Permission</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="firstName" class="form-label" data-svelte-h="svelte-13mx5ln">Permission Name</label> <input type="text" class="form-control" name="name" id="firstName" placeholder="Enter Permission name"${add_attribute("value", $permissionStore.name, 0)}></div> ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const PermissionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_permissionStore;
  let { permission } = $$props;
  let { permissionStore } = getContext("permissionStore");
  $$unsubscribe_permissionStore = subscribe(permissionStore, (value) => value);
  if ($$props.permission === void 0 && $$bindings.permission && permission !== void 0)
    $$bindings.permission(permission);
  $$unsubscribe_permissionStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(permission.id)}</td> <td>${escape(permission.name)}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewPermissionModal" data-svelte-h="svelte-ipkwbf"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.update") ? `<span data-bs-toggle="modal" data-bs-target="#editPermissionModal" data-svelte-h="svelte-1b8llua"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deletePermissionModal" data-svelte-h="svelte-1g4c2tm"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const PermissionsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { permissionsList } = $$props;
  setContext("permissionStore", { permissionStore: writable({}) });
  if ($$props.permissionsList === void 0 && $$bindings.permissionsList && permissionsList !== void 0)
    $$bindings.permissionsList(permissionsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-rfmh2a"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(permissionsList, (permission) => {
    return `${validate_component(PermissionItem, "PermissionItem").$$render($$result, { permission }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeletePermissionModal, "DeletePermissionModal").$$render($$result, {}, {}, {})} ${validate_component(ViewPermissionModal, "ViewPermissionModal").$$render($$result, {}, {}, {})} ${validate_component(EditPermissionModal, "EditPermissionModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddPermissionModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let permissionName;
  let close;
  let form;
  return `<div class="modal fade" id="addPermissionModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-revt2f"><h5 class="modal-title" id="exampleModalgridLabel">Add Permission</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="firstName" class="form-label" data-svelte-h="svelte-13mx5ln">Permission Name</label> <input type="text" name="name" class="form-control" id="firstName" placeholder="Enter Permission name"${add_attribute("value", permissionName, 0)}></div> ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let permissionsList;
  let permissionsPagination;
  let { data } = $$props;
  let permissionsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  permissionsList = data.permissionsResponse.data;
  permissionsPagination = data.permissionsResponse.pagination;
  return `<div class="row"${add_attribute("this", permissionsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-1sqzu9n">Permissions Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addPermissionModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1ymtdar"><i class="ri-add-line align-bottom me-1"></i> Add Permission</button> ${validate_component(AddPermissionModal, "AddPermissionModal").$$render($$result, {}, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("permissions.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Permission" }, {}, {})} ${validate_component(PermissionsTable, "PermissionsTable").$$render($$result, { permissionsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, permissionsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-8e3a327f.js.map
