import { c as create_ssr_component, s as setContext, h as add_attribute, e as escape, v as validate_component, g as getContext, b as subscribe, f as each, d as add_classes } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import './index-64aa7a5e.js';
import { t as translation } from './translation-88f21498.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { V as ViewSubModal } from './ViewSubModal-be66b097.js';
import { P as Progress } from './Progress-2ab42500.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';

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
  return `<div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.ativeSubs[localStorage.getItem("language")])}</h4> <div class="flex-shrink-0">${activeSub ? `<div class="hstack gap-3 flex-wrap">${activeSub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.genInvoice[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/invoices/" + escape(activeSub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.print[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a>`}  <span data-bs-toggle="modal" data-bs-target="#viewSubModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-title", translation.view[localStorage.getItem("language")], 0)}><i class="ri-eye-fill"></i></a></span></div>` : ``} </div> </div> <div class="card-body">  ${activeSub ? `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-15qzzmo"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.package[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.days[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.balance[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.startedAt[localStorage.getItem("language")])}</th> <th scope="col" class="text-end">${escape(translation.subTotal[localStorage.getItem("language")])}</th></tr></thead> <tbody class="list"><tr scope="row"><td data-svelte-h="svelte-1o2rt8u"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(activeSub.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", activeSub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> ${localStorage.getItem("language") == "ar" ? `<div class="flex-grow-1">${escape(activeSub.package.school.name_ar)} - ${escape(activeSub.package.name_ar)}</div>` : `<div class="flex-grow-1">${escape(activeSub.package.school.name)} - ${escape(activeSub.package.name)}</div>`}</div></td> <td>${escape(activeSub.days)}</td> <td>${validate_component(Progress, "Progress").$$render(
    $$result,
    {
      now: activeSub.balance,
      max: activeSub.days
    },
    {},
    {}
  )}</td> <td>${escape(activeSub.started_at)}</td> <td class="text-end">${escape(activeSub.total)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr></tbody></table>  </div></div> <div class="row justify-content-sm-end"><div class="table-responsive col-3 "><table class="table table-borderless mb-0"><tbody>${activeSub?.coupon ? `<tr><td>${escape(translation.discount[localStorage.getItem("language")])} <span class="text-muted">(${escape(activeSub?.discount)}%)</span> :</td> <td class="text-end" id="cart-subtotal">- ${escape(activeSub.discountCalculated.toFixed(3))} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr>` : `<tr><td>${escape(translation.discount[localStorage.getItem("language")])} <span class="text-muted" data-svelte-h="svelte-gjqwcg">(0%)</span> :</td> <td class="text-end" id="cart-subtotal">- 0 ${escape(translation.sar[localStorage.getItem("language")])}</td></tr>`} <tr><td>${escape(translation.estimatedTax[localStorage.getItem("language")])} (${escape(activeSub.tax)}%) :</td> <td class="text-end" id="cart-discount">+ ${escape(activeSub.taxCalculated)} ${escape(translation.sar[localStorage.getItem("language")])}</td></tr> <tr class="table-active"><th>${escape(translation.total[localStorage.getItem("language")])} (${escape(translation.sar[localStorage.getItem("language")])}) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape(activeSub.total)} ${escape(translation.sar[localStorage.getItem("language")])}</span></td></tr></tbody></table></div> </div>` : ` <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert"><i class="ri-airplay-line me-3 align-middle"></i> <!-- HTML_TAG_START -->${translation.noActiveSubsNote[localStorage.getItem("language")]}<!-- HTML_TAG_END --> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}   </div> </div>`;
});
const SubItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { sub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0)
    $$bindings.sub(sub);
  $$unsubscribe_subStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(sub.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> ${localStorage.getItem("language") == "ar" ? `<div class="flex-grow-1">${escape(sub.package.school.name_ar)} - ${escape(sub.package.name_ar)}</div>` : `<div class="flex-grow-1">${escape(sub.package.school.name)} - ${escape(sub.package.name)}</div>`}</div></td> <td>${escape(sub.days)}</td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td>${escape(sub.started_at == null ? "unset" : sub.started_at)}</td> <td>${sub.status == "scheduled" ? `<span class="badge bg-info-subtle text-info ms-1" data-svelte-h="svelte-ulcrrz">Scheduled</span>` : `${sub.status == "expired" ? `<span class="badge bg-danger-subtle text-danger ms-1" data-svelte-h="svelte-mnas7v">Expired</span>` : `${sub.status == "disabled" ? `<span class="badge bg-dark-subtle text-dark ms-1" data-svelte-h="svelte-jhunmm">Disabled</span>` : ``}`}`}</td> <td><div class="hstack gap-3">${sub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.genInvoice[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/invoices/" + escape(sub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.print[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a>`}  <span data-bs-toggle="modal" data-bs-target="#viewSubModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.view[localStorage.getItem("language")], 0)}><i class="ri-eye-fill"></i></a></span></div></td></tr>`;
});
const SubsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { subsList } = $$props;
  if ($$props.subsList === void 0 && $$bindings.subsList && subsList !== void 0)
    $$bindings.subsList(subsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.package[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.days[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.balance[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.startedAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.status[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `${validate_component(SubItem, "SubItem").$$render($$result, { sub }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const GenSubInvoiceModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let close;
  let form;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  $$unsubscribe_subStore();
  return `<div class="modal fade" id="genSubInvoiceModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.genInvoice[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"> <div><div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert"><i class="ri-airplay-line me-3 align-middle"></i> ${escape(translation.youAreGonnaGen[localStorage.getItem("language")])}<strong>${escape(translation.generate[localStorage.getItem("language")])}</strong> ${escape(translation.anInvoice[localStorage.getItem("language")])} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)}>${escape(translation.close[localStorage.getItem("language")])}</button> <input type="submit" class="btn btn-primary waves-effect waves-light"${add_attribute("value", translation.generate[localStorage.getItem("language")], 0)}></div> </div></form></div></div></div></div>`;
});
const InactiveSubItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { sub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0)
    $$bindings.sub(sub);
  $$unsubscribe_subStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(sub.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> ${localStorage.getItem("language") == "ar" ? `<div class="flex-grow-1">${escape(sub.package.school.name_ar)} - ${escape(sub.package.name_ar)}</div>` : `<div class="flex-grow-1">${escape(sub.package.school.name)} - ${escape(sub.package.name)}</div>`}</div></td> <td>${escape(sub.days)}</td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td>${sub.should_started_at == null ? `<span class="badge bg-warning-subtle text-warning">${escape(translation.notScheduled[localStorage.getItem("language")])}</span>` : `sub.started_at`}</td> <td>${escape(sub.should_started_at == null ? "unset" : sub.started_at)}</td>  <td><div class="hstack gap-3 flex-wrap"> ${sub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.genInvoice[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/invoices/" + escape(sub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.print[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a>`}  <span data-bs-toggle="modal" data-bs-target="#viewSubModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.view[localStorage.getItem("language")], 0)}><i class="ri-eye-fill"></i></a></span>  </div></td></tr>`;
});
const InactiveSubsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { subsList } = $$props;
  if ($$props.subsList === void 0 && $$bindings.subsList && subsList !== void 0)
    $$bindings.subsList(subsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.package[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.days[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.balance[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.shouldStartAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.startedAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `${validate_component(InactiveSubItem, "InactiveSubItem").$$render($$result, { sub }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-1dg75t9"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let subsList;
  let activeSub;
  let student;
  let subsPagination;
  let inactiveSubsList;
  let { data } = $$props;
  setContext("subStore", { subStore: writable({}) });
  let subsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  subsList = data.subsResponse.data.subscriptions;
  activeSub = data.subsResponse.data.activeSubscription;
  student = data.subsResponse.data.student;
  data.subsResponse.data.packages;
  subsPagination = data.subsResponse.pagination;
  inactiveSubsList = data.subsResponse.data.inactiveSubscriptions;
  return `<div class="row"${add_attribute("this", subsPage, 0)}><div class="col-lg-12">${`${``}`}</div> <div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(student.fullname)}</span> - ${escape(translation.subsciptionManagement[localStorage.getItem("language")])}</h4></div> <div class="flex-shrink-0"><button type="button" class="btn btn-primary waves-effect waves-light"><i class="ri-money-dollar-circle-line align-bottom me-1"></i>${escape(translation.subscribe[localStorage.getItem("language")])}</button> ${validate_component(ViewSubModal, "ViewSubModal").$$render($$result, {}, {}, {})} ${validate_component(GenSubInvoiceModal, "GenSubInvoiceModal").$$render($$result, {}, {}, {})}</div> </div> </div> ${validate_component(ActiveSub, "ActiveSub").$$render($$result, { activeSub, type: "parent" }, {}, {})} <div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.incativeSubs[localStorage.getItem("language")])}</h4> </div> <div class="card-body"> <div class="row"> ${validate_component(InactiveSubsTable, "InactiveSubsTable").$$render($$result, { subsList: inactiveSubsList }, {}, {})} </div>   </div> </div> <div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.allSubs[localStorage.getItem("language")])}</h4> </div> <div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render(
    $$result,
    {
      type: translation.subscription[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${validate_component(SubsTable, "SubsTable").$$render($$result, { subsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, subsPagination), {}, {})} </div>   </div> </div></div>  </div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-34a48097.js.map
