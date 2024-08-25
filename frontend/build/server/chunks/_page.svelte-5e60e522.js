import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, g as getContext, i as createEventDispatcher } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import { A as Accordion } from './Accordion-5106493f.js';
import './translation-88f21498.js';

const DeleteCanteenUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $canteenUserStore, $$unsubscribe_canteenUserStore;
  let close;
  let { canteenUserStore } = getContext("canteenUserStore");
  $$unsubscribe_canteenUserStore = subscribe(canteenUserStore, (value) => $canteenUserStore = value);
  $$unsubscribe_canteenUserStore();
  return `<div id="deleteCanteenUserModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$canteenUserStore.name} #${$canteenUserStore.pivot?.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewCanteenUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $canteenUserStore, $$unsubscribe_canteenUserStore;
  let { canteenUserStore } = getContext("canteenUserStore");
  $$unsubscribe_canteenUserStore = subscribe(canteenUserStore, (value) => $canteenUserStore = value);
  let { general } = $$props;
  if ($$props.general === void 0 && $$bindings.general && general !== void 0)
    $$bindings.general(general);
  $$unsubscribe_canteenUserStore();
  return `<div class="modal fade" id="viewCanteenUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-fwqd2z"><h5 class="modal-title" id="exampleModalgridLabel">View Permission</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($canteenUserStore.name)}</span>`;
    }
  })} ${general ? `${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `School :      
                        <img${add_attribute("src", $canteenUserStore?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape($canteenUserStore?.school?.name)}`;
    }
  })}` : ``} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Address : <span class="fw-normal">${escape($canteenUserStore.address)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($canteenUserStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($canteenUserStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const CanteenUserItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_canteenUserStore;
  let { canteenUser } = $$props;
  let { canteenUserStore } = getContext("canteenUserStore");
  $$unsubscribe_canteenUserStore = subscribe(canteenUserStore, (value) => value);
  if ($$props.canteenUser === void 0 && $$bindings.canteenUser && canteenUser !== void 0)
    $$bindings.canteenUser(canteenUser);
  $$unsubscribe_canteenUserStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1z5pzi"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(canteenUser.pivot.id)}</td> <td>${escape(canteenUser.name)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", canteenUser.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(canteenUser.school.name)}</div></div></td> <td>${escape(canteenUser.address)}</td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewCanteenUserModal" data-svelte-h="svelte-1akv4c5"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteCanteenUserModal" data-svelte-h="svelte-bqiin6"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const CanteenUsersTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { canteensList = [] } = $$props;
  setContext("canteenUserStore", { canteenUserStore: writable({}) });
  if ($$props.canteensList === void 0 && $$bindings.canteensList && canteensList !== void 0)
    $$bindings.canteensList(canteensList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-13n0see"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">School</th> <th scope="col">Address</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(canteensList, (canteenUser) => {
    return `${validate_component(CanteenUserItem, "CanteenUserItem").$$render($$result, { canteenUser }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(ViewCanteenUserModal, "ViewCanteenUserModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteCanteenUserModal, "DeleteCanteenUserModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const CanteenTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let canteenUsersList = [];
  let canteenUsersPagination;
  let { selected = {} } = $$props;
  let { title } = $$props;
  let { collapse } = $$props;
  let openCollapse;
  function resetCanteenUser() {
    console.log("deselcted");
    selected = {};
  }
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.resetCanteenUser === void 0 && $$bindings.resetCanteenUser && resetCanteenUser !== void 0)
    $$bindings.resetCanteenUser(resetCanteenUser);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${selected?.id ? `<div class="row pe-0 mb-3"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th>${escape(selected.id)}</th> <th>${escape(selected.name)}</th> <th><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", selected.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(selected.school.name)}</div></div></th> <th>${escape(selected.address)}%</th> <th scope="col"><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-ljb6m2"><i class="ri-close-line"></i></a></div></th></tr></tbody></table></div></div>` : ``} <div${add_classes((selected?.id != null ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
      $$result,
      { id: "canteen", title, openCollapse },
      {
        openCollapse: ($$value) => {
          openCollapse = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "CanteenUser" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-k698p9"><tr><th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">School</th> <th scope="col">Address</th> <th scope="col">Action</th></tr></thead> <tbody class="list">${each(canteenUsersList, (canteenUser) => {
            return `<tr scope="row"${add_classes((canteenUser.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(canteenUser.id)}</td> <td>${escape(canteenUser.name)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", canteenUser.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(canteenUser.school.name)}</div> </div></td> <td>${escape(canteenUser.address)}</td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-rmke5p"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, canteenUsersPagination), {}, {})}`;
        }
      }
    )}` : `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "CanteenUser" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-rl9rnx"><tr><th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">School</th> <th scope="col">Address</th> <th scope="col">Action</th></tr></thead> <tbody class="list">${each(canteenUsersList, (canteenUser) => {
      return `<tr scope="row"${add_classes((canteenUser.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(canteenUser.id)}</td> <td>${escape(canteenUser.name)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", canteenUser.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(canteenUser.school.name)}</div> </div></td> <td>${escape(canteenUser.address)}</td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-rmke5p"><i class="ri-check-line"></i></a> </div></td> </tr>`;
    })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, canteenUsersPagination), {}, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const AddCanteenUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let form;
  let resetCanteenUser;
  let { userId } = $$props;
  if ($$props.userId === void 0 && $$bindings.userId && userId !== void 0)
    $$bindings.userId(userId);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="addCanteenUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-17pgis"><h5 class="modal-title" id="exampleModalgridLabel">Add Canteen to user</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"> <div>${validate_component(CanteenTableCollapse, "CanteenTableCollapse").$$render(
      $$result,
      { resetCanteenUser },
      {
        resetCanteenUser: ($$value) => {
          resetCanteenUser = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div> ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canteensList;
  let canteenUsersPagination;
  let user;
  let { data } = $$props;
  let canteenUsersPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  canteensList = data.canteenUsersResponse.data.canteens;
  canteenUsersPagination = data.canteenUsersResponse.pagination;
  user = data.canteenUsersResponse.data.user;
  return `<div class="row"${add_attribute("this", canteenUsersPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", user.profile.image.full_path, 0)} alt="user's image " class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(user.profile.fullname)}&#39;s</span> - Canteens Managment</h4></div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addCanteenUserModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-o0412w"><i class="ri-add-line align-bottom me-1"></i> Add Canteen</button> ${validate_component(AddCanteenUserModal, "AddCanteenUserModal").$$render($$result, { userId: user.id }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.index") ? `<div class="card-body"> ${validate_component(CanteenUsersTable, "CanteenUsersTable").$$render($$result, { canteensList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, canteenUsersPagination), {}, {})}    </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5e60e522.js.map
