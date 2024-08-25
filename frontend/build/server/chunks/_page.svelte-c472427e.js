import { c as create_ssr_component, h as add_attribute, v as validate_component, b as subscribe, s as setContext, f as each, d as add_classes, g as getContext, e as escape } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';

const DeleteCouponModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $couponStore, $$unsubscribe_couponStore;
  let close;
  let { couponStore } = getContext("couponStore");
  $$unsubscribe_couponStore = subscribe(couponStore, (value) => $couponStore = value);
  $$unsubscribe_couponStore();
  return `<div id="deleteCouponModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$couponStore.name} #${$couponStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewCouponModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $couponStore, $$unsubscribe_couponStore;
  let { couponStore } = getContext("couponStore");
  $$unsubscribe_couponStore = subscribe(couponStore, (value) => $couponStore = value);
  $$unsubscribe_couponStore();
  return `<div class="modal fade" id="viewCouponModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-16jl4jo"><h5 class="modal-title" id="exampleModalgridLabel">View Coupon</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Name : <span class="fw-normal">${escape($couponStore.name)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Code : <span class="badge border border-primary text-primary">${escape($couponStore.code)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Discount : <span class="fw-normal">${escape($couponStore.discount)}%</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Status : ${$couponStore.expired ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-dbrt6f">Expired</span>` : `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1x21j4e">Valid</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `On Hold : ${$couponStore.onhold ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-lybxg9">Yes</span>` : `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1t9g59d">No</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($couponStore.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($couponStore.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-1vrqtk3"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditCouponModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $couponStore, $$unsubscribe_couponStore;
  let { couponStore } = getContext("couponStore");
  $$unsubscribe_couponStore = subscribe(couponStore, (value) => $couponStore = value);
  let close;
  let form;
  $$unsubscribe_couponStore();
  return `<div class="modal fade" id="editCouponModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1gmklfl"><h5 class="modal-title" id="exampleModalgridLabel">Edit Coupon</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="couponName" class="form-label" data-svelte-h="svelte-1r146cu">Name</label> <input type="text" class="form-control" id="couponName" name="name" placeholder="Enter Coupon name"${add_attribute("value", $couponStore.name, 0)}> ${``}</div> <div><label for="couponName" class="form-label" data-svelte-h="svelte-1p9mdis">Code</label> <input type="text" class="form-control" id="couponName" name="code" placeholder="Enter Coupon code"${add_attribute("value", $couponStore.code, 0)}> ${``}</div> <div><label for="couponName" class="form-label" data-svelte-h="svelte-1fyfygg">Discount (%)</label> <input type="text" class="form-control" id="couponName" name="discount" placeholder="Enter Coupon discount"${add_attribute("value", $couponStore.discount, 0)}> ${``}</div> <div><label for="couponName" class="form-label" data-svelte-h="svelte-1svz7p">Max</label> <input type="text" class="form-control" id="couponName" name="max" placeholder="Enter Coupon max"${add_attribute("value", $couponStore.max, 0)}> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", $couponStore.onhold, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-vorh5w">On Hold</label> </div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const CouponItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_couponStore;
  let { coupon } = $$props;
  let { couponStore } = getContext("couponStore");
  $$unsubscribe_couponStore = subscribe(couponStore, (value) => value);
  if ($$props.coupon === void 0 && $$bindings.coupon && coupon !== void 0)
    $$bindings.coupon(coupon);
  $$unsubscribe_couponStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(coupon.id)}</td> <td>${escape(coupon.name)}</td> <td><span class="badge border border-primary text-primary">${escape(coupon.code)}</span></td> <td>${escape(coupon.discount)}%</td> <td>${escape(coupon.used)}</td> <td>${escape(coupon.max)}</td> <td>${coupon.expired ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-dbrt6f">Expired</span>` : `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1x21j4e">Valid</span>`}</td> <td>${coupon.onhold ? `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-lybxg9">Yes</span>` : `<span class="badge bg-success-subtle text-success" data-svelte-h="svelte-1t9g59d">No</span>`}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewCouponModal" data-svelte-h="svelte-1qnnlqr"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.update") ? `<span data-bs-toggle="modal" data-bs-target="#editCouponModal" data-svelte-h="svelte-1w6u6y2"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteCouponModal" data-svelte-h="svelte-1e1nlfk"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const CouponsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { couponsList } = $$props;
  setContext("couponStore", { couponStore: writable({}) });
  if ($$props.couponsList === void 0 && $$bindings.couponsList && couponsList !== void 0)
    $$bindings.couponsList(couponsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-14mrba3"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">Code</th> <th scope="col">Discount</th> <th scope="col">Used</th> <th scope="col">Max</th> <th scope="col">Status</th> <th scope="col">On Hold</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(couponsList, (coupon) => {
    return `${validate_component(CouponItem, "CouponItem").$$render($$result, { coupon }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(ViewCouponModal, "ViewCouponModal").$$render($$result, {}, {}, {})} ${validate_component(EditCouponModal, "EditCouponModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteCouponModal, "DeleteCouponModal").$$render($$result, {}, {}, {})}</div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const AddCouponModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let couponName;
  let close;
  let form;
  let onHold = false;
  return `<div class="modal fade" id="addCouponModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-qeh21e"><h5 class="modal-title" id="exampleModalgridLabel">Add Coupon</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="couponName" class="form-label" data-svelte-h="svelte-1r146cu">Name</label> <input type="text" class="form-control" id="couponName" name="name" placeholder="Enter Coupon name"${add_attribute("value", couponName, 0)}> ${``}</div> <div><label for="couponName" class="form-label" data-svelte-h="svelte-1p9mdis">Code</label> <input type="text" class="form-control" id="couponName" name="code" placeholder="Enter Coupon code"> ${``}</div> <div><label for="couponName" class="form-label" data-svelte-h="svelte-1fyfygg">Discount (%)</label> <input type="text" class="form-control" id="couponName" name="discount" placeholder="Enter Coupon discount"> ${``}</div> <div><label for="couponName" class="form-label" data-svelte-h="svelte-1svz7p">Max</label> <input type="text" class="form-control" id="couponName" name="max" placeholder="Enter Coupon max"> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", onHold, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-vorh5w">On Hold</label> </div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let couponsList;
  let couponsPagination;
  let { data } = $$props;
  let couponsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  couponsList = data.couponsResponse.data;
  couponsPagination = data.couponsResponse.pagination;
  return `<div class="row"${add_attribute("this", couponsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-z1uwya">Coupons Managment</h4> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addCouponModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-u1pzst"><i class="ri-add-line align-bottom me-1"></i>Add Coupon</button> ${validate_component(AddCouponModal, "AddCouponModal").$$render($$result, {}, {}, {})}` : ``}</div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("coupons.index") ? `<div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Coupon" }, {}, {})} ${validate_component(CouponsTable, "CouponsTable").$$render($$result, { couponsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, couponsPagination), {}, {})} </div>   </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c472427e.js.map
