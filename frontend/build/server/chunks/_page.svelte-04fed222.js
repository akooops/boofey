import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, e as escape, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { n as navigating, p as page } from './stores-fc2c2f25.js';
import { w as writable } from './index2-7897530e.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './translation-88f21498.js';

const RoleItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_roleStore;
  let { role } = $$props;
  let { roleStore } = getContext("roleStore");
  $$unsubscribe_roleStore = subscribe(roleStore, (value) => value);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  $$unsubscribe_roleStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(role.id)}</td> <td>${escape(role.name)}</td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("roles.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewRoleModal" data-svelte-h="svelte-a4841r"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("roles.update") ? `<span data-bs-toggle="modal" data-bs-target="#editRoleModal" data-svelte-h="svelte-1tnbk1i"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("roles.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteRoleModal" data-svelte-h="svelte-oerpwj"><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const DeleteRoleModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $roleStore, $$unsubscribe_roleStore;
  let close;
  let { roleStore } = getContext("roleStore");
  $$unsubscribe_roleStore = subscribe(roleStore, (value) => $roleStore = value);
  $$unsubscribe_roleStore();
  return `<div id="deleteRoleModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$roleStore.name} #${$roleStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewRoleModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $roleStore, $$unsubscribe_roleStore;
  let { roleStore } = getContext("roleStore");
  $$unsubscribe_roleStore = subscribe(roleStore, (value) => $roleStore = value);
  $$unsubscribe_roleStore();
  return `<div class="modal fade" id="viewRoleModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1txb502"><h5 class="modal-title" id="exampleModalgridLabel">View Role</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Name : <span class="fw-normal">${escape($roleStore.name)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">${escape(formatTimestamp($roleStore.created_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">${escape(formatTimestamp($roleStore.updated_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Permissions <!-- HTML_TAG_START -->${$roleStore?.permissions?.length > 0 ? "" : ': <span class="badge bg-warning">no permissions</span>'}<!-- HTML_TAG_END --></h6></div></div></div> ${$roleStore?.permissions?.length > 0 ? `<div class="row mb-4"><div class="table-responsive"><table class="table table-hover align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1roauup"><tr><th scope="col">ID</th> <th scope="col">Name</th></tr></thead> <tbody class="list">${each($roleStore.permissions || [], (permission) => {
    return `<tr><td>${escape(permission.id)}</td> <td>${escape(permission.name)}</td> </tr>`;
  })}</tbody></table></div></div>` : ``}  <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditRoleModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $roleStore, $$unsubscribe_roleStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { roleStore } = getContext("roleStore");
  $$unsubscribe_roleStore = subscribe(roleStore, (value) => $roleStore = value);
  let close;
  let permissions = [];
  let roleName = "";
  let allChecked = false;
  function checkAll() {
    allChecked = permissions.every((permission) => permission.checked === true);
  }
  roleStore.subscribe(() => {
    allChecked = false;
    roleName = $roleStore.name;
    if ($page?.data?.rolesResponse?.data?.permissions == void 0 || $roleStore.permissions == void 0)
      return;
    permissions = $page.data.rolesResponse.data.permissions.map((permission) => {
      return {
        checked: $roleStore.permissions.some((rolePermission) => {
          return rolePermission.id == permission.id;
        }),
        ...permission
      };
    });
    checkAll();
  });
  $$unsubscribe_roleStore();
  $$unsubscribe_page();
  return `<div class="modal fade" id="editRoleModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-zpzjgk"><h5 class="modal-title" id="exampleModalgridLabel">Add Role</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}><div class="row g-3"><div><label for="firstName" class="form-label" data-svelte-h="svelte-19kc4zo">Role Name</label> <input type="text" class="form-control" id="firstName" placeholder="Enter Role name"${add_attribute("value", roleName, 0)}></div> ${``} <label for="firstName" class="form-label" data-svelte-h="svelte-176zbzk">Assign Permissions</label> <div class="row"><div class="table-responsive"><table class="table table-hover align-end table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1" ${allChecked ? "checked" : ""}></div></th> <th scope="col" data-svelte-h="svelte-njzezq">ID</th> <th scope="col" data-svelte-h="svelte-z0rb3w">Name</th> <th scope="col" data-svelte-h="svelte-1chw67s">Guard</th></tr></thead> <tbody class="list">${each(permissions, (permission) => {
    return `<tr scope="row"><td><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"${add_attribute("checked", permission.checked, 1)}> </div></td> <td>${escape(permission.id)}</td> <td>${escape(permission.name)}</td> <td>${escape(permission.guard_name)}</td> </tr>`;
  })}</tbody></table></div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const RolesTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { rolesList } = $$props;
  setContext("roleStore", { roleStore: writable({}) });
  if ($$props.rolesList === void 0 && $$bindings.rolesList && rolesList !== void 0)
    $$bindings.rolesList(rolesList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-end table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1y0sjzu"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody>${each(rolesList, (role, i) => {
    return `${validate_component(RoleItem, "RoleItem").$$render($$result, { role }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeleteRoleModal, "DeleteRoleModal").$$render($$result, {}, {}, {})} ${validate_component(ViewRoleModal, "ViewRoleModal").$$render($$result, {}, {}, {})} ${validate_component(EditRoleModal, "EditRoleModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddRoleModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let roleName;
  let close;
  let { permissions = [] } = $$props;
  if ($$props.permissions === void 0 && $$bindings.permissions && permissions !== void 0)
    $$bindings.permissions(permissions);
  return `<div class="modal fade" id="addRoleModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-zpzjgk"><h5 class="modal-title" id="exampleModalgridLabel">Add Role</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}><div class="row g-3"><div><label for="firstName" class="form-label" data-svelte-h="svelte-19kc4zo">Role Name</label> <input type="text" class="form-control" id="firstName" placeholder="Enter Role name"${add_attribute("value", roleName, 0)}></div> ${``} <label for="firstName" class="form-label" data-svelte-h="svelte-176zbzk">Assign Permissions</label> <div class="row"><div class="table-responsive"><table class="table table-hover align-end table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1" ${""}></div></th> <th scope="col" data-svelte-h="svelte-njzezq">ID</th> <th scope="col" data-svelte-h="svelte-z0rb3w">Name</th> <th scope="col" data-svelte-h="svelte-1chw67s">Guard</th></tr></thead> <tbody class="list">${each(permissions, (permission) => {
    return `<tr scope="row"><td><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"${add_attribute("checked", permission.checked, 1)}> </div></td> <td>${escape(permission.id)}</td> <td>${escape(permission.name)}</td> <td>${escape(permission.guard_name)}</td> </tr>`;
  })}</tbody></table></div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rolesList;
  let rolesPagination;
  let permissions;
  let { data } = $$props;
  let rolesPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  rolesList = data.rolesResponse.data.roles;
  rolesPagination = data.rolesResponse.pagination;
  permissions = data.rolesResponse.data.permissions;
  return `<div class="row"${add_attribute("this", rolesPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-1ewlflc">Roles Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("roles.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-13nuo63"><i class="ri-add-line align-bottom me-1"></i> Add Role</button> ${validate_component(AddRoleModal, "AddRoleModal").$$render($$result, { permissions }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("roles.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Role" }, {}, {})} ${validate_component(RolesTable, "RolesTable").$$render($$result, { rolesList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, rolesPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-04fed222.js.map
