import { c as create_ssr_component, s as setContext, h as add_attribute, e as escape, v as validate_component, d as add_classes, f as each, g as getContext, b as subscribe } from './ssr-69d45533.js';
import { b as bill } from './utils-5d589345.js';
import './index-64aa7a5e.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { V as ViewSubModal } from './ViewSubModal-be66b097.js';
import { w as writable } from './index2-7897530e.js';
import { P as Progress } from './Progress-2ab42500.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './translation-88f21498.js';
import './ViewRow-562dee67.js';

const AddSubModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { student } = $$props;
  let { packages = [] } = $$props;
  let close;
  let form;
  let applyDiscount = false;
  let excludeFromCalc = false;
  let coupon;
  let selectPackage;
  let subtotal = 0;
  let tax = 0;
  let days = 0;
  let calculatedTax = 0;
  let total = 0;
  if ($$props.student === void 0 && $$bindings.student && student !== void 0)
    $$bindings.student(student);
  if ($$props.packages === void 0 && $$bindings.packages && packages !== void 0)
    $$bindings.packages(packages);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      {
        {
          [total, calculatedTax] = bill({ subtotal, tax, coupon });
        }
      }
    }
    $$rendered = `<div class="modal fade" id="addSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1r4gosc"><h5 class="modal-title" id="exampleModalgridLabel">Add Sub</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-fh4to6">Package</label> <select class="form-select" name="package_id" id="role" aria-label="Default select example"${add_attribute("this", selectPackage, 0)}><option disabled selected value data-svelte-h="svelte-myvy7z">-- select a package -- </option>${each(packages, (packageObj) => {
      return `<option${add_attribute("value", packageObj.id, 0)}>${escape(packageObj.name)}</option>`;
    })}</select> ${``}</div> <div><label for="tax" class="form-label" data-svelte-h="svelte-1vtk3em">Tax</label> <input type="text" name="tax" class="form-control" id="tax" placeholder="Enter Subscription tax"${add_attribute("value", tax, 0)}> ${``}</div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", applyDiscount, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1n3gnzz">Apply Discount</label> </div> ${``}</div> ${``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", excludeFromCalc, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-ty5rar">Exclude from calculation</label> </div></div> <div class="row mb-3"><div class="table-responsive "><table class="table table-borderless mb-0"><tbody><tr><td data-svelte-h="svelte-154ibvf">days :</td> <td class="text-end" id="cart-discount">${escape(days)}</td></tr> <tr><td data-svelte-h="svelte-1jo8pk4">Sub total :</td> <td class="text-end" id="cart-discount">${escape(subtotal + " SAR")}</td></tr> ${``} ${``} <tr><td>Estimated Tax(${escape(tax)}%) :</td> <td class="text-end" id="cart-discount">${`+ ${escape(parseFloat(calculatedTax).toFixed(3))} SAR`}</td></tr> <tr class="table-active"><th data-svelte-h="svelte-w5xebh">Total (SAR) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape(total)} SAR</span></td></tr></tbody></table></div></div> ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const EditSubModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $subStore, $$unsubscribe_subStore;
  let close;
  let form;
  let { student } = $$props;
  let { packages = [] } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => $subStore = value);
  subStore.subscribe(() => {
  });
  if ($$props.student === void 0 && $$bindings.student && student !== void 0)
    $$bindings.student(student);
  if ($$props.packages === void 0 && $$bindings.packages && packages !== void 0)
    $$bindings.packages(packages);
  $$unsubscribe_subStore();
  return `<div class="modal fade" id="editSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-xj4yp0"><h5 class="modal-title" id="exampleModalgridLabel">Edit  Subscription</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", $subStore.exclude_from_calculation, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-ty5rar">Exclude from calculation</label> </div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const ActiveSub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { activeSub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  let { type } = $$props;
  if ($$props.activeSub === void 0 && $$bindings.activeSub && activeSub !== void 0)
    $$bindings.activeSub(activeSub);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$unsubscribe_subStore();
  return `<div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-1wiro46">Active Subscription</h4> <div class="flex-shrink-0">${activeSub ? `<div class="hstack gap-3 flex-wrap"> ${JSON.parse(sessionStorage.getItem("permissions")).includes("invoices.show") ? `${activeSub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal" data-svelte-h="svelte-1je34im"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Generate Invoice"><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/admin/invoices/" + escape(activeSub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Print"><i class="ri-file-paper-2-line"></i></a>`} ` : ``} ${activeSub.status == "disabled" ? `${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.enable") ? `<span data-bs-toggle="modal" data-bs-target="#toggleSubModal" data-svelte-h="svelte-k5mo7o"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Enable"><i class="ri-checkbox-circle-line"></i></a></span>` : ``}` : `${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.disable") ? `<span data-bs-toggle="modal" data-bs-target="#toggleSubModal" data-svelte-h="svelte-i34t7n"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Disable"><i class="ri-indeterminate-circle-line"></i></a></span>` : ``}`} ${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewSubModal" data-svelte-h="svelte-5m5arn"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${type != "parent" && JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.update") ? `<span data-bs-toggle="modal" data-bs-target="#editSubModal" data-svelte-h="svelte-rbjwhm"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``}</div>` : ``} </div> </div> <div class="card-body">  ${activeSub ? `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-hpvd3g"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Package</th> <th scope="col">Days</th> <th scope="col">Balance</th> <th scope="col">Started At</th> <th scope="col" class="text-end">Sub Total</th></tr></thead> <tbody class="list"><tr scope="row"><td data-svelte-h="svelte-1o2rt8u"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(activeSub.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", activeSub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(activeSub.package.school.name)} - ${escape(activeSub.package.name)}</div></div></td> <td>${escape(activeSub.days)}</td> <td>${validate_component(Progress, "Progress").$$render(
    $$result,
    {
      now: activeSub.balance,
      max: activeSub.days
    },
    {},
    {}
  )}</td> <td>${escape(activeSub.started_at)}</td> <td class="text-end">${escape(activeSub.total)} SAR</td></tr></tbody></table>  </div></div> <div class="row justify-content-sm-end"><div class="table-responsive col-3 "><table class="table table-borderless mb-0"><tbody>${activeSub?.coupon ? `<tr><td>Discount <span class="text-muted">(${escape(activeSub?.discount)}%)</span> :</td> <td class="text-end" id="cart-subtotal">${escape(activeSub.discountCalculated.toFixed(3))} SAR</td></tr>` : `<tr data-svelte-h="svelte-ah1u28"><td>Discount <span class="text-muted">(0%)</span> :</td> <td class="text-end" id="cart-subtotal">- 0 SAR</td></tr>`} <tr><td>Estimated Tax(${escape(activeSub.tax)}%) :</td> <td class="text-end" id="cart-discount">+ ${escape(activeSub.taxCalculated)} SAR</td></tr> <tr class="table-active"><th data-svelte-h="svelte-w5xebh">Total (SAR) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape(activeSub.total)} SAR</span></td></tr></tbody></table></div> </div>` : ` <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-1ys2pj3"><i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Active Subscriptions</strong> at the moment 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}   </div> </div>`;
});
const SubItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { sub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0)
    $$bindings.sub(sub);
  $$unsubscribe_subStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(sub.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(sub.package.school.name)} - ${escape(sub.package.name)}</div></div></td> <td>${escape(sub.days)}</td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td>${escape(sub.started_at == null ? "unset" : sub.started_at)}</td> <td>${sub.status == "scheduled" ? `<span class="badge bg-info-subtle text-info ms-1" data-svelte-h="svelte-ulcrrz">Scheduled</span>` : `${sub.status == "expired" ? `<span class="badge bg-danger-subtle text-danger ms-1" data-svelte-h="svelte-mnas7v">Expired</span>` : `${sub.status == "disabled" ? `<span class="badge bg-dark-subtle text-dark ms-1" data-svelte-h="svelte-jhunmm">Disabled</span>` : ``}`}`}</td> <td><div class="hstack gap-3 flex-wrap"> ${JSON.parse(sessionStorage.getItem("permissions")).includes("invoices.show") ? `${sub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal" data-svelte-h="svelte-1je34im"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Generate Invoice"><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/admin/invoices/" + escape(sub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Print"><i class="ri-file-paper-2-line"></i></a>`} ` : ``} ${sub.status == "disabled" ? `${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.enable") ? `<span data-bs-toggle="modal" data-bs-target="#toggleSubModal" data-svelte-h="svelte-k5mo7o"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Enable"><i class="ri-checkbox-circle-line"></i></a></span>` : ``}` : `${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.disable") ? `<span data-bs-toggle="modal" data-bs-target="#toggleSubModal" data-svelte-h="svelte-i34t7n"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Disable"><i class="ri-indeterminate-circle-line"></i></a></span>` : ``}`} ${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewSubModal" data-svelte-h="svelte-1no76fz"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.update") ? `<span data-bs-toggle="modal" data-bs-target="#editSubModal" data-svelte-h="svelte-cku9w6"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``}</div></td></tr>`;
});
const SubsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { subsList } = $$props;
  if ($$props.subsList === void 0 && $$bindings.subsList && subsList !== void 0)
    $$bindings.subsList(subsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1427otk"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Package</th> <th scope="col">Days</th> <th scope="col">Balance</th> <th scope="col">Started At</th> <th scope="col">Status</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `${validate_component(SubItem, "SubItem").$$render($$result, { sub }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const InactiveSubItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { sub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0)
    $$bindings.sub(sub);
  $$unsubscribe_subStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(sub.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(sub.package.school.name)} - ${escape(sub.package.name)}</div></div></td> <td>${escape(sub.days)}</td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td>${sub.should_start_at == null ? ` <span class="badge bg-warning-subtle text-warning" data-svelte-h="svelte-1phe2t6">not scheduled</span>` : ` ${escape(sub.should_start_at)}`}</td> <td>${escape(sub.started_at == null ? "unset" : sub.started_at)}</td>  <td><div class="hstack gap-3 flex-wrap"> ${JSON.parse(sessionStorage.getItem("permissions")).includes("invoices.show") ? `${sub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal" data-svelte-h="svelte-1je34im"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Generate Invoice"><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/admin/invoices/" + escape(sub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Print"><i class="ri-file-paper-2-line"></i></a>`} ` : ``} ${sub.status == "disabled" ? `${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.enable") ? `<span data-bs-toggle="modal" data-bs-target="#toggleSubModal" data-svelte-h="svelte-k5mo7o"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Enable"><i class="ri-checkbox-circle-line"></i></a></span>` : ``}` : `${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.disable") ? `<span data-bs-toggle="modal" data-bs-target="#toggleSubModal" data-svelte-h="svelte-i34t7n"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Disable"><i class="ri-indeterminate-circle-line"></i></a></span>` : ``}`} ${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewSubModal" data-svelte-h="svelte-1no76fz"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.update") ? `<span data-bs-toggle="modal" data-bs-target="#editSubModal" data-svelte-h="svelte-cku9w6"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``}  </div></td></tr>`;
});
const InactiveSubsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { subsList } = $$props;
  if ($$props.subsList === void 0 && $$bindings.subsList && subsList !== void 0)
    $$bindings.subsList(subsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-toy50q"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Package</th> <th scope="col">Days</th> <th scope="col">Balance</th> <th scope="col">Should Start At</th> <th scope="col">Started At</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `${validate_component(InactiveSubItem, "InactiveSubItem").$$render($$result, { sub }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const ToggleSubModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $subStore, $$unsubscribe_subStore;
  let close;
  let form;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => $subStore = value);
  subStore.subscribe(() => {
  });
  $$unsubscribe_subStore();
  return `<div class="modal fade" id="toggleSubModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape($subStore.status == "disabled" ? "Enable" : "Disable")}  Subscription</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"> <div><div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert"><i class="ri-airplay-line me-3 align-middle"></i> you are gonna <strong>${escape($subStore.status == "disabled" ? "Enable" : "Disable")}</strong> are you sure you want to proceed ? 
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div> ${``} ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light"${add_attribute("value", $subStore.status == "disabled" ? "Enable" : "Disable", 0)}></div> </div></form></div></div></div></div>`;
});
const GenSubInvoiceModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $subStore, $$unsubscribe_subStore;
  let close;
  let form;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => $subStore = value);
  $$unsubscribe_subStore();
  return `<div class="modal fade" id="genSubInvoiceModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape($subStore.status == "disabled" ? "Enable" : "Disable")}  Subscription</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"> <div><div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-1vmoc3m"><i class="ri-airplay-line me-3 align-middle"></i> you are gonna <strong>Generate</strong> an invoice for this subscription are you sure you want to proceed ? 
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Generate"></div> </div></form></div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let subsList;
  let inactiveSubsList;
  let activeSub;
  let student;
  let packages;
  let subsPagination;
  let { data } = $$props;
  setContext("subStore", { subStore: writable({}) });
  let subsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  subsList = data.subsResponse.data.subscriptions;
  inactiveSubsList = data.subsResponse.data.inactiveSubscriptions;
  activeSub = data.subsResponse.data.activeSubscription;
  student = data.subsResponse.data.student;
  packages = data.subsResponse.data.packages;
  subsPagination = data.subsResponse.pagination;
  return `<div class="row d-print-none"${add_attribute("this", subsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(student.fullname)}</span> - Subscriptions Managment</h4></div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("subscriptions.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addSubModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-sn8zzo"><i class="ri-add-line align-bottom me-1"></i>Add Academic Sub</button> ${validate_component(AddSubModal, "AddSubModal").$$render($$result, { student, packages }, {}, {})}` : ``} ${validate_component(ViewSubModal, "ViewSubModal").$$render($$result, {}, {}, {})} ${validate_component(EditSubModal, "EditSubModal").$$render($$result, { student, packages }, {}, {})} ${validate_component(ToggleSubModal, "ToggleSubModal").$$render($$result, {}, {}, {})} ${validate_component(GenSubInvoiceModal, "GenSubInvoiceModal").$$render($$result, {}, {}, {})}</div> </div> </div> ${validate_component(ActiveSub, "ActiveSub").$$render($$result, { activeSub }, {}, {})} <div class="card"><div class="card-header align-items-center d-flex" data-svelte-h="svelte-3cgavq"><h4 class="card-title mb-0 flex-grow-1">Inactive subscriptions</h4> </div> <div class="card-body"> <div class="row"> ${validate_component(InactiveSubsTable, "InactiveSubsTable").$$render($$result, { subsList: inactiveSubsList }, {}, {})} </div>   </div> </div> <div class="card"><div class="card-header align-items-center d-flex" data-svelte-h="svelte-1bsi6x"><h4 class="card-title mb-0 flex-grow-1">Sheduled subscriptions</h4> </div> <div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Sub" }, {}, {})} ${validate_component(SubsTable, "SubsTable").$$render($$result, { subsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, subsPagination), {}, {})} </div>   </div> </div></div>  </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-f95e82b7.js.map
