import { c as create_ssr_component, b as subscribe, h as add_attribute, v as validate_component, s as setContext, f as each, d as add_classes, e as escape, g as getContext } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { p as page, n as navigating } from './stores-fc2c2f25.js';
import { w as writable } from './index2-7897530e.js';
import { P as Password } from './Password-fcf754f4.js';
import 'cleave.js';
import './translation-88f21498.js';

const UserItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userStore;
  let { user } = $$props;
  let { userStore } = getContext("userStore");
  $$unsubscribe_userStore = subscribe(userStore, (value) => value);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  $$unsubscribe_userStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1ef9hae"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(user.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", user.profile.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(user.username)}</div></div></td> <td>${escape(user.profile.firstname)}</td> <td>${escape(user.profile.lastname)}</td> <td>${escape(user.email)}</td> <td>${escape(user.phone)}</td> <td>${escape(user.role)}</td> <td class="text-end"><div class="hstack gap-3 flex-wrap justify-content-end">${JSON.parse(sessionStorage.getItem("permissions")).includes("canteenUsers.index") && user.roles[0].name != "parent" ? `<a href="${"users/" + escape(user.id, true) + "/canteens"}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Canteens"><i class="ri-restaurant-2-fill"></i></a>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("users.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewUserModal" data-svelte-h="svelte-126pn3b"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("users.update") ? `<span data-bs-toggle="modal" data-bs-target="#editUserModal" data-svelte-h="svelte-1ohnp8e"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("users.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteUserModal" data-svelte-h="svelte-23o6lj"><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const DeleteUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userStore, $$unsubscribe_userStore;
  let close;
  let { userStore } = getContext("userStore");
  $$unsubscribe_userStore = subscribe(userStore, (value) => $userStore = value);
  $$unsubscribe_userStore();
  return `<div id="deleteUserModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$userStore.username} #${$userStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userStore, $$unsubscribe_userStore;
  let { userStore } = getContext("userStore");
  $$unsubscribe_userStore = subscribe(userStore, (value) => $userStore = value);
  $$unsubscribe_userStore();
  return `<div class="modal fade" id="viewUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-ubd70j"><h5 class="modal-title" id="exampleModalgridLabel">View User</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Username : <span class="fw-normal">${escape($userStore.username)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Email : <span class="fw-normal">${escape($userStore.email)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Email : <span class="fw-normal">${escape($userStore.phone)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">${escape(formatTimestamp($userStore.created_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">${escape(formatTimestamp($userStore.updated_at))}</span></h6></div></div></div> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Role : <span class="fw-normal">${escape($userStore.role)}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userStore, $$unsubscribe_userStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { userStore } = getContext("userStore");
  $$unsubscribe_userStore = subscribe(userStore, (value) => $userStore = value);
  let close;
  let form;
  let firstName = "";
  let lastName = "";
  let roles = [];
  let role;
  let editPassword = false;
  let verified;
  userStore.subscribe(() => {
    firstName = $userStore?.profile?.firstname;
    lastName = $userStore?.profile?.lastname;
    roles = $page.data.usersResponse.data.roles;
    verified = $userStore?.verified;
    if (!$userStore?.roles?.length)
      return;
    role = $userStore?.roles[0];
  });
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-uxfkhe"><h5 class="modal-title" id="exampleModalgridLabel">Edit User</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="username" class="form-label" data-svelte-h="svelte-170ol5y">Username</label> <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username name"${add_attribute("value", $userStore.username, 0)}> ${``}</div> <div class="col-xxl-6"><div><label for="firstName" class="form-label" data-svelte-h="svelte-1hs0n20">First Name</label> <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname"${add_attribute("value", firstName, 0)}> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label" data-svelte-h="svelte-1tzb4fa">Last Name</label> <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname"${add_attribute("value", lastName, 0)}> ${``}</div></div> <div class="col-xxl-6"><label for="email" class="form-label" data-svelte-h="svelte-7zanfm">Email</label> <input type="email" name="email" class="form-control" id="email" placeholder="Enter your Email"${add_attribute("value", $userStore.email, 0)}> ${``}</div> <div class="col-xxl-6"><label for="phone" class="form-label" data-svelte-h="svelte-6oyajm">Phone</label> <input type="tel" name="phone" class="form-control phone-input" id="phoneedit" placeholder="Enter your Phone no."${add_attribute("value", $userStore.phone, 0)}> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", editPassword, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1czz90b">Edit Password</label> </div></div> ${``} ${``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", verified, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1e98nyu">Verified</label> </div></div> <div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-14zs2bm">Role</label> ${role ? `<select class="form-select" name="role_id" id="role" aria-label="Default select example">${each(roles, (role2) => {
      return `<option${add_attribute("value", role2.id, 0)}>${escape(role2.name)}</option>`;
    })}</select> ${``}` : ``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_userStore();
  $$unsubscribe_page();
  return $$rendered;
});
const UsersTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { usersList } = $$props;
  setContext("userStore", { userStore: writable({}) });
  if ($$props.usersList === void 0 && $$bindings.usersList && usersList !== void 0)
    $$bindings.usersList(usersList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1u8x71p"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Username</th> <th scope="col">First Name</th> <th scope="col">Last Name</th> <th scope="col">Email</th> <th scope="col">Phone</th> <th scope="col">Role</th> <th scope="col" class="text-end">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody>${each(usersList, (user, i) => {
    return `${validate_component(UserItem, "UserItem").$$render($$result, { user }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeleteUserModal, "DeleteUserModal").$$render($$result, {}, {}, {})} ${validate_component(ViewUserModal, "ViewUserModal").$$render($$result, {}, {}, {})} ${validate_component(EditUserModal, "EditUserModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddUserModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let username;
  let form;
  let selectRole;
  let { roles = [] } = $$props;
  let verified = true;
  if ($$props.roles === void 0 && $$bindings.roles && roles !== void 0)
    $$bindings.roles(roles);
  return `<div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-11g4qb3"><h5 class="modal-title" id="exampleModalgridLabel">Add User</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="username" class="form-label" data-svelte-h="svelte-170ol5y">Username</label> <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username name"${add_attribute("value", username, 0)}> ${``}</div> <div class="col-xxl-6"><div><label for="firstName" class="form-label" data-svelte-h="svelte-1hs0n20">First Name</label> <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname"> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label" data-svelte-h="svelte-1tzb4fa">Last Name</label> <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname"> ${``}</div></div> <div class="col-xxl-6"><label for="email" class="form-label" data-svelte-h="svelte-7zanfm">Email</label> <input type="email" name="email" class="form-control" id="email" placeholder="Enter your Email"> ${``}</div> <div class="col-xxl-6"><label for="phone" class="form-label" data-svelte-h="svelte-6oyajm">Phone</label> <input type="tel" name="phone" class="form-control phone-input" id="phone" placeholder="Enter your Phone no."> ${``}</div> <div class="col-xxl-6"><label for="password" class="form-label" data-svelte-h="svelte-tyrfrg">Password</label> ${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password",
      placeholder: "Enter Password"
    },
    {},
    {}
  )} ${``}</div> <div class="col-xxl-6"><label for="passwordconfirm" class="form-label" data-svelte-h="svelte-a297se">Confirm Password</label> ${validate_component(Password, "Password").$$render(
    $$result,
    {
      name: "password_confirmation",
      placeholder: "Confirm Password"
    },
    {},
    {}
  )} ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", verified, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1e98nyu">Verified</label> </div></div> <div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-14zs2bm">Role</label> <select class="form-select" name="role_id" id="role" aria-label="Default select example"${add_attribute("this", selectRole, 0)}><option disabled selected value data-svelte-h="svelte-eswhhd">-- select an role -- </option>${each(roles, (role) => {
    return `<option${add_attribute("value", role.id, 0)}>${escape(role.name)}</option>`;
  })}</select> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let usersList;
  let usersPagination;
  let roles;
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let usersPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  usersList = data.usersResponse.data.users;
  usersPagination = data.usersResponse.pagination;
  roles = data.usersResponse.data.roles;
  $$unsubscribe_page();
  return `<div class="row"${add_attribute("this", usersPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-1gicm6b">Users Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("users.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addUserModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1ocaax7"><i class="ri-add-line align-bottom me-1"></i> Add User</button> ${validate_component(AddUserModal, "AddUserModal").$$render($$result, { roles }, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("users.index") ? `<div class="card-body"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "User" }, {}, {})} <div class="col-xl-3 mb-3"><select class="form-select" name="class" id="class" aria-label="Default select example"><option${add_attribute("value", "all", 0)} data-svelte-h="svelte-13f2t2c">All</option><option${add_attribute("value", "verified", 0)} data-svelte-h="svelte-1b8ry6y">Verified</option><option${add_attribute("value", "not verified", 0)} data-svelte-h="svelte-s03ut8">Not Verified</option></select></div> ${validate_component(UsersTable, "UsersTable").$$render($$result, { usersList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, usersPagination), {}, {})}    </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-08a55835.js.map
