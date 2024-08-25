import { c as create_ssr_component, e as escape, h as add_attribute, v as validate_component, f as each, d as add_classes, i as createEventDispatcher } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { P as Progress } from './Progress-2ab42500.js';
import { t as translation } from './translation-88f21498.js';
import 'apexcharts';
import 'swiper';
import './initApp-e077d2ff.js';

const DashPagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { total } = $$props;
  let { pages = [] } = $$props;
  let { current_page = 1 } = $$props;
  let { last_page } = $$props;
  let { from } = $$props;
  let { to } = $$props;
  if ($$props.total === void 0 && $$bindings.total && total !== void 0)
    $$bindings.total(total);
  if ($$props.pages === void 0 && $$bindings.pages && pages !== void 0)
    $$bindings.pages(pages);
  if ($$props.current_page === void 0 && $$bindings.current_page && current_page !== void 0)
    $$bindings.current_page(current_page);
  if ($$props.last_page === void 0 && $$bindings.last_page && last_page !== void 0)
    $$bindings.last_page(last_page);
  if ($$props.from === void 0 && $$bindings.from && from !== void 0)
    $$bindings.from(from);
  if ($$props.to === void 0 && $$bindings.to && to !== void 0)
    $$bindings.to(to);
  return `<div class="align-items-center mt-4 justify-content-between d-flex flex-wrap"><div class="flex-shrink-0"><div class="text-muted">Showing <span class="fw-semibold">${escape(from)}</span> to <span class="fw-semibold">${escape(to)}</span> of <span class="fw-semibold">${escape(total)}</span> results</div></div> <ul class="pagination pagination-separated pagination-sm mb-0"><li class="${["page-item", current_page == 1 ? "disabled" : ""].join(" ").trim()}"><a class="page-link ms-0" href="#" data-svelte-h="svelte-14onxy8">←</a></li> ${each(pages, (page, i) => {
    return `<li class="${["page-item", current_page == page ? "active" : ""].join(" ").trim()}"><a class="page-link" href="#">${escape(page)}</a></li>`;
  })} <li class="${["page-item", current_page == last_page ? "disabled" : ""].join(" ").trim()}"><a class="page-link" href="#" data-svelte-h="svelte-5mrglj">→</a></li></ul></div>`;
});
const DashPerPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let perPage = 10;
  return `<div class="dropdown card-header-dropdown"><a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="text-muted">Per Page : ${escape(perPage)} <i class="mdi mdi-chevron-down ms-1"></i></span></a> <div class="dropdown-menu dropdown-menu-end"><a class="dropdown-item" href="#" data-svelte-h="svelte-1jdqqqw">10</a> <a class="dropdown-item" href="#" data-svelte-h="svelte-19gpvq">25</a> <a class="dropdown-item" href="#" data-svelte-h="svelte-70525s">50</a> <a class="dropdown-item" href="#" data-svelte-h="svelte-1nyvh2a">100</a> <a class="dropdown-item" href="#" data-svelte-h="svelte-1mxeeom">250</a></div></div>`;
});
const DashSearch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { type } = $$props;
  let { searchQuery = "" } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.searchQuery === void 0 && $$bindings.searchQuery && searchQuery !== void 0)
    $$bindings.searchQuery(searchQuery);
  return `<div class="row mb-4"><div class="col-auto"><div class="form-icon"><input type="text" class="form-control form-control-icon" id="iconInput" placeholder="${escape(translation.searchFor[localStorage.getItem("language")], true) + " " + escape(type, true) + "..."}"${add_attribute("value", searchQuery, 0)}> <i class="ri-search-line"></i></div></div> <div class="col-auto ps-0"><button class="btn btn-primary" type="button">${escape(translation.searchBtn[localStorage.getItem("language")])}</button></div></div>`;
});
const LastSubs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let lastSubs = [];
  let lastSubsPagination;
  return `<div class="col-xl-8"><div class="card "><div class="card-header d-flex align-items-center"><h4 class="card-title flex-grow-1 mb-0" data-svelte-h="svelte-jnjaex">Last Subscribed Students</h4> <div class="flex-shrink-0">${validate_component(DashPerPage, "DashPerPage").$$render($$result, {}, {}, {})}</div> </div> <div class="card-body">${validate_component(DashSearch, "DashSearch").$$render($$result, { type: "Last Subscribed Students" }, {}, {})} <div class="table-responsive table-card"><table class="table table-nowrap table-centered align-middle mb-0"><thead class="bg-light text-muted" data-svelte-h="svelte-nbljyw"><tr><th scope="col">ID</th> <th scope="col">Student</th> <th scope="col" style="width: 30%;">Progress</th> <th scope="col">Package</th> <th scope="col" style="width: 10%;">Started At</th> </tr> </thead> <tbody>${each(lastSubs, (sub) => {
    return `<tr><td>${escape(sub.id)}</td> <td><img${add_attribute("src", sub.student.image.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(sub.student.fullname)}</a></td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td><img${add_attribute("src", sub.package?.school?.logo?.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(sub.package?.school.name)} - ${escape(sub.package?.name)}</a></td> <td class="text-muted">${escape(sub.started_at)}</td> </tr>`;
  })} </tbody> </table></div> ${validate_component(DashPagination, "DashPagination").$$render($$result, Object.assign({}, lastSubsPagination), {}, {})} </div> </div> </div>`;
});
const ExpiringSubs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expiringSubs = [];
  let expiringSubsPagination;
  return `<div class="col-xl-7"><div class="card"><div class="card-header d-flex align-items-center"><h4 class="card-title flex-grow-1 mb-0" data-svelte-h="svelte-1sp0m9k">Expiring Soon Students</h4> <div class="flex-shrink-0">${validate_component(DashPerPage, "DashPerPage").$$render($$result, {}, {}, {})}</div> </div> <div class="card-body">${validate_component(DashSearch, "DashSearch").$$render($$result, { type: "Last Subscribed Students" }, {}, {})} <div class="table-responsive table-card"><table class="table table-nowrap table-centered align-middle mb-0"><thead class="bg-light text-muted" data-svelte-h="svelte-nbljyw"><tr><th scope="col">ID</th> <th scope="col">Student</th> <th scope="col" style="width: 30%;">Progress</th> <th scope="col">Package</th> <th scope="col" style="width: 10%;">Started At</th> </tr> </thead> <tbody>${each(expiringSubs, (sub) => {
    return `<tr><td>${escape(sub.id)}</td> <td><img${add_attribute("src", sub.student.image.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(sub.student.fullname)}</a></td> <td>${validate_component(Progress, "Progress").$$render($$result, { now: sub.balance, max: sub.days }, {}, {})}</td> <td><img${add_attribute("src", sub.package?.school?.logo?.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(sub.package?.school?.name)} - ${escape(sub.package?.name)}</a></td> <td class="text-muted">${escape(sub.started_at)}</td> </tr>`;
  })} </tbody> </table></div> ${validate_component(DashPagination, "DashPagination").$$render($$result, Object.assign({}, expiringSubsPagination), {}, {})} </div> </div> </div>`;
});
const CanteensDash = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chartSpace;
  let canteens = [];
  let selectedCanteen;
  let selector;
  let averageCheck = true;
  let doneCheck = true;
  let canteensPagination;
  return `${canteens.length > 0 ? `<div class="col-xl-12"><div class="card"><div class="card-header border-0 align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1">${escape("No Canteen Selected")} <span data-bs-toggle="modal" data-bs-target="#selectCanteen" data-svelte-h="svelte-1n9ck18"><a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-original-title="Select"><i class="ri-edit-2-line"></i></a></span></h4> <div class="${["me-1 ", "d-none"].join(" ").trim()}"><form action="javascript:void(0);"><div class="row g-3 mb-0 align-items-center"><div class="col-sm-auto"><div class="input-group input-group-sm"><input type="text" class="form-control border-1 dash-filter-picker " data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y"${add_attribute("this", selector, 0)}> <div class="input-group-text bg-primary border-primary text-white" data-svelte-h="svelte-1oma327"><i class="ri-calendar-2-line"></i></div></div></div>  </div> </form></div> <div><button type="button" class="${["btn btn-soft-secondary btn-sm", ""].join(" ").trim()}" data-svelte-h="svelte-1j715ks">Custom</button> <button type="button" class="${["btn btn-soft-secondary btn-sm", "active"].join(" ").trim()}" data-svelte-h="svelte-1njs2ea">7D</button> <button type="button" class="${["btn btn-soft-secondary btn-sm", ""].join(" ").trim()}" data-svelte-h="svelte-1esdhc7">28D</button></div> </div> <div class="card-body p-0 pb-2">${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.avgByCanteens") && JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.doneByCanteens") ? `<div class="row ps-4 g-3 align-items-center justify-content-start"> <div class="form-check form-switch form-check-secondary col-auto"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", averageCheck, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-113up1t">Average</label> </div> <div class="form-check form-switch col-auto"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", doneCheck, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-b6jg9q">Done</label> </div></div>` : `<h4 class="card-title mb-0 ps-3 flex-grow-1">${escape(JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.avgByCanteens") ? "Avergage" : "Done")}</h4>`} <div class="w-100 p-1"> <div${add_classes("".trim())}${add_attribute("this", chartSpace, 0)}></div> ${``}</div> <div class="modal fade" id="selectCanteen" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-13cbnzb"><h5 class="modal-title" id="exampleModalgridLabel">Select Canteen</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body"> ${validate_component(DashSearch, "DashSearch").$$render($$result, { type: "Last Subscribed Students" }, {}, {})} <div class="table-responsive table-card"><table class="table table-nowrap table-centered align-middle mb-0"><thead class="bg-light text-muted" data-svelte-h="svelte-eqnu7z"><tr><th scope="col">ID</th> <th scope="col">Name</th> <th scope="col">School</th> <th scope="col">Action</th> </tr> </thead> <tbody>${each(canteens, (canteen) => {
    return `<tr${add_classes((canteen.id == selectedCanteen?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(canteen.id)}</td> <td>${escape(canteen.name)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", canteen.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(canteen.school.name)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-bs-dismiss="modal" data-svelte-h="svelte-q7zzsy"><i class="ri-check-line"></i></a> </div></td> </tr>`;
  })} </tbody> </table></div> ${validate_component(DashPagination, "DashPagination").$$render($$result, Object.assign({}, canteensPagination), {}, {})}</div></div></div></div> </div> </div> </div>` : ``}`;
});
const DailyTotal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chartSpace;
  let selector;
  return `<div class="col-xl-12"><div class="card"><div class="card-header border-0 align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-v6c4k6">Daily Total</h4> <div class="${["me-1 ", "d-none"].join(" ").trim()}"><form action="javascript:void(0);"><div class="row g-3 mb-0 align-items-center"><div class="col-sm-auto"><div class="input-group input-group-sm"><input type="text" class="form-control border-1 dash-filter-picker " data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y"${add_attribute("this", selector, 0)}> <div class="input-group-text bg-primary border-primary text-white" data-svelte-h="svelte-1oma327"><i class="ri-calendar-2-line"></i></div></div></div>  </div> </form></div> <div><button type="button" class="${["btn btn-soft-secondary btn-sm", ""].join(" ").trim()}" data-svelte-h="svelte-1j715ks">Custom</button> <button type="button" class="${["btn btn-soft-secondary btn-sm", "active"].join(" ").trim()}" data-svelte-h="svelte-1njs2ea">7D</button> <button type="button" class="${["btn btn-soft-secondary btn-sm", ""].join(" ").trim()}" data-svelte-h="svelte-1esdhc7">28D</button></div> </div> <div class="card-body p-3 pb-2"><div class="w-100"> <div${add_classes("".trim())}${add_attribute("this", chartSpace, 0)}></div> ${``}</div> </div> </div> </div>`;
});
const CanteenStatus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canteens = [];
  let canteensPagination;
  return `<div class="col-xl-4"><div class="card"><div class="card-header d-flex align-items-center"><h4 class="card-title flex-grow-1 mb-0" data-svelte-h="svelte-aehgqg">Canteens Status</h4> <div class="flex-shrink-0">${validate_component(DashPerPage, "DashPerPage").$$render($$result, {}, {}, {})}</div> </div> <div class="card-body">${validate_component(DashSearch, "DashSearch").$$render($$result, { type: "Last Subscribed Students" }, {}, {})} <div class="table-responsive table-card"><table class="table table-nowrap table-centered align-middle mb-0"><thead class="bg-light text-muted" data-svelte-h="svelte-1fs5j38"><tr><th scope="col">ID</th> <th scope="col">Canteen</th> <th scope="col">School</th> <th scope="col">Status</th> </tr> </thead> <tbody>${each(canteens, (canteen) => {
    return `<tr><td>${escape(canteen.id)}</td> <td>${escape(canteen.name)}</td> <td><img${add_attribute("src", canteen.school.logo.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(canteen.school.name)}</a></td> <td>${canteen.status == "open" ? `<span class="badge bg-success-subtle text-success p-2" data-svelte-h="svelte-zs33gp">Open</span>` : `<span class="badge bg-danger-subtle text-danger p-2" data-svelte-h="svelte-xav2j3">Closed</span>`}</td> </tr>`;
  })} </tbody> </table></div> ${validate_component(DashPagination, "DashPagination").$$render($$result, Object.assign({}, canteensPagination), {}, {})} </div> </div> </div>`;
});
const AbsentStudents = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let absentStudents = [];
  let absentStudentsPagination;
  return `<div class="col-xl-5"><div class="card "><div class="card-header d-flex align-items-center"><h4 class="card-title flex-grow-1 mb-0" data-svelte-h="svelte-r9erf0">Absent Students</h4> <div class="flex-shrink-0">${validate_component(DashPerPage, "DashPerPage").$$render($$result, {}, {}, {})}</div> </div> <div class="card-body">${validate_component(DashSearch, "DashSearch").$$render($$result, { type: "Last Subscribed Students" }, {}, {})} <div class="table-responsive table-card"><table class="table table-nowrap table-centered align-middle mb-0"><thead class="bg-light text-muted" data-svelte-h="svelte-e7i4d7"><tr><th scope="col">ID</th> <th scope="col">Student</th> <th scope="col">Parent</th> <th scope="col">School</th> </tr> </thead> <tbody>${each(absentStudents, (student) => {
    return `<tr><td>${escape(student.id)}</td> <td><img${add_attribute("src", student.image.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(student.fullname)}</a></td> <td><img${add_attribute("src", student.father.user.profile.image.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(student.father.user.profile.fullname)}</a></td> <td><img${add_attribute("src", student.school.logo.full_path, 0)} class="avatar-xxs rounded-circle me-1" alt=""> <a href="" class="text-reset">${escape(student.school.name)}</a></td> </tr>`;
  })} </tbody> </table></div> ${validate_component(DashPagination, "DashPagination").$$render($$result, Object.assign({}, absentStudentsPagination), {}, {})} </div> </div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let slider;
  let selector;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="row mb-3 pb-1"><div class="col-12"><div class="d-flex align-items-lg-center flex-lg-row flex-column"><div class="flex-grow-1"><h4 class="fs-16 mb-1">Good Morning, <span class="text-primary">${escape(data.userResponse.data.user.username)}</span></h4> <p class="text-muted mb-0" data-svelte-h="svelte-1q9p4xr">Here&#39;s what&#39;s happening with your store today.</p></div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.count") ? `<div class="mt-3 mt-lg-0"><form action="javascript:void(0);"><div class="row g-3 mb-0 align-items-center"><div class="col-sm-auto"><div class="input-group"><input type="text" class="form-control border-0 dash-filter-picker shadow" data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y"${add_attribute("this", selector, 0)}> <div class="input-group-text bg-primary border-primary text-white" data-svelte-h="svelte-1oma327"><i class="ri-calendar-2-line"></i></div></div></div>  </div> </form></div>` : ``} </div></div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.count") ? `<div class="row swiper"${add_attribute("this", slider, 0)}><div class="swiper-wrapper">${``}</div></div> ` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.dailyTotal") ? `<div class="row">${validate_component(DailyTotal, "DailyTotal").$$render($$result, {}, {}, {})}</div>` : ``} <div class="row">${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.lastSubscribedStudents") ? `${validate_component(LastSubs, "LastSubs").$$render($$result, {}, {}, {})}` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.canteensStatus") ? `${validate_component(CanteenStatus, "CanteenStatus").$$render($$result, {}, {}, {})}` : ``}</div> <div class="row">${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.absentStudents") ? `${validate_component(AbsentStudents, "AbsentStudents").$$render($$result, {}, {}, {})}` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("dashboards.expiringSoonStudents") ? `${validate_component(ExpiringSubs, "ExpiringSubs").$$render($$result, {}, {}, {})}` : ``}</div> <div class="row">${validate_component(CanteensDash, "CanteensDash").$$render($$result, {}, {}, {})}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-cd8d56c1.js.map
