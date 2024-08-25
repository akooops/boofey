import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, g as getContext, e as escape, d as add_classes } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { w as writable } from './index2-7897530e.js';
import './translation-88f21498.js';

const ParentItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_parentStore;
  let { parent } = $$props;
  let { parentStore } = getContext("parentStore");
  $$unsubscribe_parentStore = subscribe(parentStore, (value) => value);
  if ($$props.parent === void 0 && $$bindings.parent && parent !== void 0)
    $$bindings.parent(parent);
  $$unsubscribe_parentStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1ef9hae"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(parent.id)}</td> <td>${escape(parent.identity_number)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", parent.user.profile.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(parent.user.username)}</div></div></td> <td>${escape(parent.user.profile.firstname)}</td> <td>${escape(parent.user.profile.lastname)}</td> <td>${escape(parent.user.email)}</td> <td>${escape(parent.user.phone)}</td> <td><span class="badge bg-primary">${escape(parent.childrenCount)}</span></td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewParentModal" data-svelte-h="svelte-10iq733"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.update") ? `<span data-bs-toggle="modal" data-bs-target="#editParentModal" data-svelte-h="svelte-14b26qe"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteParentModal" data-svelte-h="svelte-abm28n"><a href="" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const DeleteParentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $parentStore, $$unsubscribe_parentStore;
  let close;
  let { parentStore } = getContext("parentStore");
  $$unsubscribe_parentStore = subscribe(parentStore, (value) => $parentStore = value);
  $$unsubscribe_parentStore();
  return `<div id="deleteParentModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$parentStore?.user?.username} #${$parentStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewParentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $parentStore, $$unsubscribe_parentStore;
  let { parentStore } = getContext("parentStore");
  $$unsubscribe_parentStore = subscribe(parentStore, (value) => $parentStore = value);
  $$unsubscribe_parentStore();
  return `<div class="modal fade" id="viewParentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-113k83a"><h5 class="modal-title" id="exampleModalgridLabel">View Parent</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><img class="rounded avatar-xl mb-3 object-fit-cover" alt="School logo" width="200"${add_attribute("src", $parentStore?.user?.profile?.image?.full_path, 0)}> ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Username : <span class="fw-normal">${escape($parentStore?.user?.username)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `First Name : <span class="fw-normal">${escape($parentStore?.user?.profile?.firstname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Last Name : <span class="fw-normal">${escape($parentStore?.user?.profile?.lastname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Email : <span class="fw-normal">${escape($parentStore?.user?.email)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Phone : <span class="fw-normal">${escape($parentStore?.user?.phone)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Child : <span class="badge bg-primary">${escape($parentStore?.childrenCount)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Children  <!-- HTML_TAG_START -->${$parentStore?.students?.length > 0 ? "" : ': <span class="badge bg-warning">no children</span>'}<!-- HTML_TAG_END -->`;
    }
  })} ${$parentStore?.students?.length > 0 ? `<div class="row mb-4"><div class="table-responsive"><table class="table table-hover align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-c87zq6"><tr><th scope="col">ID</th> <th scope="col">Photo</th> <th scope="col">First Name</th> <th scope="col">Last Name</th> <th scope="col">Subscribed</th></tr></thead> <tbody class="list">${each($parentStore?.students || [], (student) => {
    return `<tr><td>${escape(student.id)}</td> <td><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></td> <td>${escape(student.firstname)}</td> <td>${escape(student.lastname)}</td> <td>${student.subscribed ? `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-3hcgtk">Subscribed</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-1a2xrxf">Not Subscribed</span>`}</td> </tr>`;
  })}</tbody></table></div></div>` : ``} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-ssr3tv"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditParentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $parentStore, $$unsubscribe_parentStore;
  let { parentStore } = getContext("parentStore");
  $$unsubscribe_parentStore = subscribe(parentStore, (value) => $parentStore = value);
  let close;
  let form;
  let editPassword = false;
  let firstName = "";
  let lastName = "";
  let email = "";
  let phone = "";
  let username = "";
  let idNumber = "";
  parentStore.subscribe(() => {
    username = $parentStore?.user?.username;
    firstName = $parentStore?.user?.profile?.firstname;
    lastName = $parentStore?.user?.profile?.lastname;
    email = $parentStore?.user?.email;
    phone = $parentStore?.user?.phone;
    idNumber = $parentStore?.identity_number;
  });
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="editParentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-3o00wz"><h5 class="modal-title" id="exampleModalgridLabel">Edit Parent</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="username" class="form-label" data-svelte-h="svelte-170ol5y">Username</label> <input type="text" name="username" class="form-control" id="username" placeholder="Enter Username name"${add_attribute("value", username, 0)}> ${``}</div> <div class="col-xxl-6"><div><label for="firstName" class="form-label" data-svelte-h="svelte-1hs0n20">First Name</label> <input type="text" name="firstname" class="form-control" id="firstName" placeholder="Enter Firstname"${add_attribute("value", firstName, 0)}> ${``}</div></div>  <div class="col-xxl-6"><div><label for="lastName" class="form-label" data-svelte-h="svelte-1tzb4fa">Last Name</label> <input type="text" name="lastname" class="form-control" id="lastName" placeholder="Enter Lastname"${add_attribute("value", lastName, 0)}> ${``}</div></div> <div class="col-xxl-6"><label for="email" class="form-label" data-svelte-h="svelte-7zanfm">Email</label> <input type="email" name="email" class="form-control" id="email" placeholder="Enter your Email"${add_attribute("value", email, 0)}> ${``}</div> <div class="col-xxl-6"><label for="phone" class="form-label" data-svelte-h="svelte-6oyajm">Phone</label> <input type="tel" name="phone" class="form-control phone-input" id="phoneedit" placeholder="Enter your Phone no."${add_attribute("value", phone, 0)}> ${``}</div> <div class="col-lg-12"><label for="phone" class="form-label" data-svelte-h="svelte-1k3c40b">Identity Number</label> <input type="text" name="identity_number" class="form-control" id="phoneedit" placeholder="Enter Identity no."${add_attribute("value", idNumber, 0)}> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", editPassword, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1czz90b">Edit Password</label> </div></div> ${``} ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_parentStore();
  return $$rendered;
});
const ParentsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { parentsList } = $$props;
  setContext("parentStore", { parentStore: writable({}) });
  if ($$props.parentsList === void 0 && $$bindings.parentsList && parentsList !== void 0)
    $$bindings.parentsList(parentsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1l3kr28"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Identity Number</th> <th scope="col">Username</th> <th scope="col">First Name</th> <th scope="col">Last Name</th> <th scope="col">Email</th> <th scope="col">Phone</th> <th scope="col">Children Count</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody>${each(parentsList, (parent, i) => {
    return `${validate_component(ParentItem, "ParentItem").$$render($$result, { parent }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(DeleteParentModal, "DeleteParentModal").$$render($$result, {}, {}, {})} ${validate_component(ViewParentModal, "ViewParentModal").$$render($$result, {}, {}, {})} ${validate_component(EditParentModal, "EditParentModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let parentsList;
  let parentsPagination;
  let { data } = $$props;
  let parentsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  parentsList = data.parentsResponse.data.fathers;
  parentsPagination = data.parentsResponse.pagination;
  return `<div class="row"${add_attribute("this", parentsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex" data-svelte-h="svelte-1vsvx4u"><h4 class="card-title mb-0 flex-grow-1">Parents Managment</h4> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("fathers.index") ? `<div class="card-body"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Parent" }, {}, {})} ${validate_component(ParentsTable, "ParentsTable").$$render($$result, { parentsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, parentsPagination), {}, {})}    </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-fab9e76f.js.map
