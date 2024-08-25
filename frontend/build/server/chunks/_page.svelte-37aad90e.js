import { c as create_ssr_component, s as setContext, v as validate_component, h as add_attribute, e as escape, f as each, b as subscribe, g as getContext } from './ssr-69d45533.js';
import { w as writable } from './index2-7897530e.js';
import './index-64aa7a5e.js';
import { t as translation } from './translation-88f21498.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { V as ViewSubModal } from './ViewSubModal-be66b097.js';
import { P as Progress } from './Progress-2ab42500.js';
import { n as navigating } from './stores-fc2c2f25.js';
import 'swiper';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';

const SubItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { sub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0)
    $$bindings.sub(sub);
  $$unsubscribe_subStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(sub.id)}</td> <td><img${add_attribute("src", sub.student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape(sub.student.fullname)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> ${localStorage.getItem("language") == "ar" ? `<div class="flex-grow-1">${escape(sub.package.school.name_ar)} - ${escape(sub.package.name_ar)}</div>` : `<div class="flex-grow-1">${escape(sub.package.school.name)} - ${escape(sub.package.name)}</div>`}</div></td> <td>${escape(sub.days)}</td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td>${escape(sub.started_at == null ? "unset" : sub.started_at)}</td> <td>${sub.status == "scheduled" ? `<span class="badge bg-info-subtle text-info ms-1" data-svelte-h="svelte-ulcrrz">Scheduled</span>` : `${sub.status == "expired" ? `<span class="badge bg-danger-subtle text-danger ms-1" data-svelte-h="svelte-mnas7v">Expired</span>` : `${sub.status == "disabled" ? `<span class="badge bg-dark-subtle text-dark ms-1" data-svelte-h="svelte-jhunmm">Disabled</span>` : ``}`}`}</td> <td><div class="hstack gap-3 flex-wrap">${sub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.genInvoice[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/invoices/" + escape(sub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.print[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a>`}  <span data-bs-toggle="modal" data-bs-target="#viewSubModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.view[localStorage.getItem("language")], 0)}><i class="ri-eye-fill"></i></a></span></div></td></tr>`;
});
const SubsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { subsList } = $$props;
  if ($$props.subsList === void 0 && $$bindings.subsList && subsList !== void 0)
    $$bindings.subsList(subsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.student[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.package[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.days[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.balance[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.startedAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.status[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `${validate_component(SubItem, "SubItem").$$render($$result, { sub }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-1dg75t9"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const InactiveSubItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_subStore;
  let { sub } = $$props;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  if ($$props.sub === void 0 && $$bindings.sub && sub !== void 0)
    $$bindings.sub(sub);
  $$unsubscribe_subStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(sub.id)}</td> <td><img${add_attribute("src", sub.student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"> ${escape(sub.student.fullname)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", sub.package.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> ${localStorage.getItem("language") == "ar" ? `<div class="flex-grow-1">${escape(sub.package.school.name_ar)} - ${escape(sub.package.name_ar)}</div>` : `<div class="flex-grow-1">${escape(sub.package.school.name)} - ${escape(sub.package.name)}</div>`}</div></td> <td>${escape(sub.days)}</td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td>${sub.should_started_at == null ? `<span class="badge bg-warning-subtle text-warning">${escape(translation.notScheduled[localStorage.getItem("language")])}</span>` : `sub.should_started_at`}</td> <td>${escape(sub.started_at == null ? "unset" : sub.started_at)}</td>  <td><div class="hstack gap-3 flex-wrap"> ${sub?.invoice == null ? `<span data-bs-toggle="modal" data-bs-target="#genSubInvoiceModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.genInvoice[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a></span>` : `<a href="${"/invoices/" + escape(sub.invoice.id, true)}" target="_blank" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.print[localStorage.getItem("language")], 0)}><i class="ri-file-paper-2-line"></i></a>`}  <span data-bs-toggle="modal" data-bs-target="#viewSubModal"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip"${add_attribute("data-bs-original-title", translation.view[localStorage.getItem("language")], 0)}><i class="ri-eye-fill"></i></a></span>  </div></td></tr>`;
});
const InactiveSubsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { subsList } = $$props;
  if ($$props.subsList === void 0 && $$bindings.subsList && subsList !== void 0)
    $$bindings.subsList(subsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light"><tr><th scope="col" style="width: 25px;" data-svelte-h="svelte-gbrsm8"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">${escape(translation.id[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.student[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.package[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.days[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.balance[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.shouldStartAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.startedAt[localStorage.getItem("language")])}</th> <th scope="col">${escape(translation.actions[localStorage.getItem("language")])}</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(subsList, (sub) => {
    return `${validate_component(InactiveSubItem, "InactiveSubItem").$$render($$result, { sub }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-1dg75t9"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#695eef,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const ActiveSubCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let percentage;
  let $$unsubscribe_subStore;
  let { subStore } = getContext("subStore");
  $$unsubscribe_subStore = subscribe(subStore, (value) => value);
  let { activeSub } = $$props;
  let state = "success";
  if ($$props.activeSub === void 0 && $$bindings.activeSub && activeSub !== void 0)
    $$bindings.activeSub(activeSub);
  percentage = activeSub.balance * 100 / activeSub.days;
  {
    {
      if (percentage > 66.66) {
        state = "success";
      } else if (percentage < 33.33) {
        state = "danger";
      } else {
        state = "warning";
      }
    }
  }
  $$unsubscribe_subStore();
  return `  <div class="col-xl-3 col-md-6 swiper-slide"><div class="card card-animate" style="${"filter: drop-shadow( " + escape(
    localStorage.getItem("language") == "en" ? "-4px" : "4px",
    true
  ) + " 0px 0px var(--vz-" + escape(state, true) + "));"}" role="button" data-bs-toggle="modal" data-bs-target="#viewSubModal"><div class="card-body"><div class="d-flex flex-column h-100"><div class="d-flex align-items-center mb-3"><div class="flex-shrink-0"><img${add_attribute("src", activeSub.student.image.full_path, 0)} alt="" class="avatar-sm rounded-circle"></div> <div class="flex-grow-1 ms-2"><h5 class="card-title mb-1">${escape(activeSub.student.fullname)}</h5> <p class="text-muted mb-0">${escape(translation.package[localStorage.getItem("language")])}: ${localStorage.getItem("language") == "ar" ? `${escape(activeSub.package.school.name_ar)} - ${escape(activeSub.package.name_ar)} ` : `${escape(activeSub.package.school.name)} - ${escape(activeSub.package.name)} `}</p></div></div> <div class="mt-auto"><div class="d-flex mb-2"><div class="flex-grow-1"><div>${escape(translation.days[localStorage.getItem("language")])}</div></div> <div class="flex-shrink-0"><div><span class="${"text-" + escape(state, true) + " counter-value fs-5"}"${add_attribute("data-target", activeSub.balance, 0)}>${escape(activeSub.balance)}</span>/${escape(activeSub.days)}</div></div></div> <div class="progress progress-sm animated-progress"><div class="${"progress-bar bg-" + escape(state, true) + " bg-gradient"}" role="progressbar" style="${"width: " + escape(percentage, true) + "%"}"></div> </div></div></div></div> <div class="card-footer bg-transparent border-top-dashed py-2"><div class="d-flex align-items-center"><div class="flex-grow-1"><span class="${"badge bg-" + escape(state, true) + "-subtle text-" + escape(state, true)}">${escape(activeSub.days - activeSub.balance)} days subscribed</span></div> <div class="flex-shrink-0"><div class="text-muted"><i class="ri-calendar-event-fill me-1 align-bottom"></i> ${escape(activeSub.started_at)}</div></div></div></div> </div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let subsList;
  let activeSubs;
  let subsPagination;
  let inactiveSubsList;
  let { data } = $$props;
  let slider;
  setContext("subStore", { subStore: writable({}) });
  let subsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  subsList = data.subsResponse.data.subscriptions;
  activeSubs = data.subsResponse.data.activeSubscriptions;
  data.subsResponse.data.student;
  data.subsResponse.data.packages;
  subsPagination = data.subsResponse.pagination;
  inactiveSubsList = data.subsResponse.data.inactiveSubscriptions;
  return `${validate_component(ViewSubModal, "ViewSubModal").$$render($$result, {}, {}, {})} <div class="row"${add_attribute("this", subsPage, 0)}><h4 class="card-title mb-3 flex-grow-1 col-lg-12">${escape(translation.ativeSubs[localStorage.getItem("language")])}</h4> ${activeSubs.length < 1 ? `<div class="col-lg-l2"><div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert"><i class="ri-airplay-line me-3 align-middle"></i> <!-- HTML_TAG_START -->${translation.noActiveSubsNote[localStorage.getItem("language")]}<!-- HTML_TAG_END --> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div>` : `<div class="row swiper"${add_attribute("this", slider, 0)}><div class="swiper-wrapper p-2">${each(activeSubs, (activeSub) => {
    return `${validate_component(ActiveSubCard, "ActiveSubCard").$$render($$result, { activeSub }, {}, {})}`;
  })}</div></div>`} <div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.incativeSubs[localStorage.getItem("language")])}</h4> </div> <div class="card-body"> <div class="row"> ${validate_component(InactiveSubsTable, "InactiveSubsTable").$$render($$result, { subsList: inactiveSubsList }, {}, {})} </div>   </div> </div> <div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape(translation.allSubs[localStorage.getItem("language")])}</h4> </div> <div class="card-body"> <div class="row"> ${validate_component(SearchTable, "SearchTable").$$render(
    $$result,
    {
      type: translation.subscription[localStorage.getItem("language")]
    },
    {},
    {}
  )} ${validate_component(SubsTable, "SubsTable").$$render($$result, { subsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, subsPagination), {}, {})} </div>   </div> </div></div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-37aad90e.js.map
