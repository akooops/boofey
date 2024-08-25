import { c as create_ssr_component, s as setContext, h as add_attribute, e as escape, v as validate_component, i as createEventDispatcher, g as getContext, b as subscribe, d as add_classes } from './ssr-69d45533.js';
import 'fullcalendar';
import './index-64aa7a5e.js';
import { w as writable } from './index2-7897530e.js';
import { l as loadDefaultDate } from './initFlatpickr-2edd9049.js';
import { f as formatTimestamp } from './utils-5d589345.js';

function addDay(from, to) {
  if (from == to) {
    return from;
  }
  const date = new Date(to);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const Calendar_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $breaksListStore, $$unsubscribe_breaksListStore;
  let $$unsubscribe_breakStore;
  createEventDispatcher();
  let { year } = $$props;
  let breaksListStore = getContext("breaksListStore");
  $$unsubscribe_breaksListStore = subscribe(breaksListStore, (value) => $breaksListStore = value);
  let breakStore = getContext("breakStore");
  $$unsubscribe_breakStore = subscribe(breakStore, (value) => value);
  let addBtn;
  let viewBtn;
  breaksListStore.subscribe(() => {
    $breaksListStore.map((breakObj) => ({
      ...breakObj,
      start: breakObj.from,
      end: addDay(breakObj.from, breakObj.to),
      title: breakObj.name,
      className: "bg-danger-subtle"
    }));
  });
  if ($$props.year === void 0 && $$bindings.year && year !== void 0)
    $$bindings.year(year);
  $$unsubscribe_breaksListStore();
  $$unsubscribe_breakStore();
  return ` <div class="calendar"></div> <button class="btn btn-primary w-100 d-none" id="btn-new-event" data-bs-toggle="modal" data-bs-target="#addBreakModal"${add_attribute("this", addBtn, 0)} data-svelte-h="svelte-xdbslg"><i class="mdi mdi-plus"></i> New Academic Break</button> <button class="btn btn-primary w-100 d-none" id="btn-new-event" data-bs-toggle="modal" data-bs-target="#viewBreakModal"${add_attribute("this", viewBtn, 0)} data-svelte-h="svelte-1oz47ts"><i class="mdi mdi-plus"></i> New Academic Break</button>`;
});
const AddBreakModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $breakStore, $$unsubscribe_breakStore;
  let breakName;
  let close;
  let from;
  let to;
  let form;
  let { year } = $$props;
  let breakStore = getContext("breakStore");
  $$unsubscribe_breakStore = subscribe(breakStore, (value) => $breakStore = value);
  breakStore.subscribe(() => {
    if (Object.keys($breakStore).length == 0)
      return;
    if ($breakStore?.fromBtn) {
      loadDefaultDate(from, $breakStore.from);
    }
  });
  if ($$props.year === void 0 && $$bindings.year && year !== void 0)
    $$bindings.year(year);
  $$unsubscribe_breakStore();
  return `<div class="modal fade" id="addBreakModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1kpgu0w"><h5 class="modal-title" id="exampleModalgridLabel">Add Academic Break</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-12vyar8">Acedemic Beak Name</label> <input type="text" class="form-control" id="name" name="name" placeholder="Enter break name"${add_attribute("value", breakName, 0)}> ${``}</div> <div class="col-xxl-6"><label for="from" class="form-label" data-svelte-h="svelte-131zvm2">From</label> <input type="text" name="from" class="form-control" placeholder="Insert start date" data-provider="flatpickr"${add_attribute("data-mindate", year.from, 0)}${add_attribute("data-maxdate", year.to, 0)} data-date-format="Y-m-d" id="from"${add_attribute("this", from, 0)}> ${``}</div> <div class="col-xxl-6"><label for="to" class="form-label" data-svelte-h="svelte-10t43u0">To</label> <input type="text" name="to" class="form-control" placeholder="Insert end date" data-provider="flatpickr"${add_attribute("data-mindate", year.from, 0)}${add_attribute("data-maxdate", year.to, 0)} data-date-format="Y-m-d" id="to"${add_attribute("this", to, 0)}> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1pgusl7">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div></div></form></div></div></div></div>`;
});
const ViewBreakModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $breakStore, $$unsubscribe_breakStore;
  let breakStore = getContext("breakStore");
  $$unsubscribe_breakStore = subscribe(breakStore, (value) => $breakStore = value);
  breakStore.subscribe(() => {
  });
  $$unsubscribe_breakStore();
  return `<div class="modal fade" id="viewBreakModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1w5dqgg"><h5 class="modal-title" id="exampleModalgridLabel">View Event</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4"><div class="text-end">${JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.update") ? `<a href="#" class="btn btn-sm btn-soft-primary" id="edit-event-btn" data-id="edit-event" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#editBreakModal" role="button" data-svelte-h="svelte-2iav3i">Edit</a>` : ``}</div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1jhy1n2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Break Name : <span class="fw-normal">${escape($breakStore?.name)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1jhy1n2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">From : <span class="fw-normal">${escape($breakStore?.from)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1jhy1n2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">To : <span class="fw-normal">${escape($breakStore?.to)}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Created at : <span class="fw-normal">${escape(formatTimestamp($breakStore?.created_at))}</span></h6></div></div></div> <div class="d-flex mb-2"><div class="flex-grow-1 d-flex align-items-center"><div class="flex-shrink-0 me-3" data-svelte-h="svelte-1x836j2"><i class="ri-arrow-right-s-line text-muted fs-16"></i></div> <div class="flex-grow-1"><h6 class="d-block fw-semibold mb-0" id="event-start-date-tag">Updated at : <span class="fw-normal">${escape(formatTimestamp($breakStore?.updated_at))}</span></h6></div></div></div>  <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal" data-svelte-h="svelte-1s58e78">Close</button> ${JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.destroy") ? `<button type="button" class="btn btn-soft-danger" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#deleteBreakModal" id="btn-delete-event" data-svelte-h="svelte-14yro28"><i class="ri-close-line align-bottom"></i> Delete</button>` : ``}</div></div></div></div></div>`;
});
const DeleteBreakModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $breakStore, $$unsubscribe_breakStore;
  let close;
  let breakStore = getContext("breakStore");
  $$unsubscribe_breakStore = subscribe(breakStore, (value) => $breakStore = value);
  $$unsubscribe_breakStore();
  return `<div id="deleteBreakModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$breakStore.name} #${$breakStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const EditBreakModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $breakStore, $$unsubscribe_breakStore;
  let breakStore = getContext("breakStore");
  $$unsubscribe_breakStore = subscribe(breakStore, (value) => $breakStore = value);
  let close;
  let form;
  let from;
  let to;
  let { year } = $$props;
  breakStore.subscribe(() => {
    if (Object.keys($breakStore).length == 0)
      return;
    loadDefaultDate(from, $breakStore.from);
    loadDefaultDate(to, $breakStore.to);
  });
  if ($$props.year === void 0 && $$bindings.year && year !== void 0)
    $$bindings.year(year);
  $$unsubscribe_breakStore();
  return `<div class="modal fade" id="editBreakModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1iyfbl6"><h5 class="modal-title" id="exampleModalgridLabel">Edit Permission</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div><label for="name" class="form-label" data-svelte-h="svelte-12vyar8">Acedemic Beak Name</label> <input type="text" class="form-control" id="name" name="name" placeholder="Enter break name"${add_attribute("value", $breakStore.name, 0)}> ${``}</div> <div class="col-xxl-6"><label for="from" class="form-label" data-svelte-h="svelte-131zvm2">From</label> <input type="text" name="from" class="form-control" placeholder="Insert start date" data-provider="flatpickr"${add_attribute("data-mindate", year.from, 0)}${add_attribute("data-maxdate", year.to, 0)} data-date-format="Y-m-d" id="from"${add_attribute("this", from, 0)}> ${``}</div> <div class="col-xxl-6"><label for="to" class="form-label" data-svelte-h="svelte-10t43u0">To</label> <input type="text" name="to" class="form-control" placeholder="Insert end date" data-provider="flatpickr"${add_attribute("data-mindate", year.from, 0)}${add_attribute("data-maxdate", year.to, 0)} data-date-format="Y-m-d" id="to"${add_attribute("this", to, 0)}> ${``}</div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
let currentBadge = "badge bg-success-subtle text-success";
let notCurrentBadge = "badge bg-danger-subtle text-danger ";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let breaksList;
  let year;
  let school;
  let { data } = $$props;
  const breaksListStore = writable(breaksList);
  setContext("breaksListStore", breaksListStore);
  const breakStore = writable({});
  setContext("breakStore", breakStore);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  breaksList = data.breaksResponse.data.academicBreaks;
  year = data.breaksResponse.data.academicYear;
  school = year.school;
  {
    breaksListStore.set(breaksList);
  }
  return `<div class="row"><div class="col-12"><div class="row"><div class="col-xl-3"><div class="card card-h-100"><div class="card-body"><div class="card-body text-center"><div class="avatar-md mb-3 mx-auto"><img${add_attribute("src", school.logo.full_path, 0)} alt="" i class="img-thumbnail rounded-circle shadow-none"></div> <h4 class="mb-3">${escape(school.name)}</h4> <p class="text-muted mb-1 fs-6">${escape(year.from)} &gt; ${escape(year.to)}</p> <div class="d-flex justify-content-center"><div class="me-2"><span${add_attribute("class", year.current ? currentBadge : notCurrentBadge, 0)}>${escape(year.current ? "current" : "not current")}</span></div> <p class="text-muted mb-0">${escape(year.name)}</p></div></div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.store") ? `<button class="btn btn-primary w-100" id="btn-new-event" data-bs-toggle="modal" data-bs-target="#addBreakModal" data-svelte-h="svelte-1klm9u"><i class="mdi mdi-plus"></i> New Academic Break</button> ${validate_component(AddBreakModal, "AddBreakModal").$$render($$result, { year }, {}, {})}` : ``} ${validate_component(ViewBreakModal, "ViewBreakModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteBreakModal, "DeleteBreakModal").$$render($$result, {}, {}, {})} ${validate_component(EditBreakModal, "EditBreakModal").$$render($$result, { year }, {}, {})}</div></div> <div class="card" data-svelte-h="svelte-1srnx0m"><div class="card-body bg-info-subtle"><div class="d-flex"><div class="flex-shrink-0"><i data-feather="calendar" class="text-info icon-dual-info"></i></div> <div class="flex-grow-1 ms-3"><h6 class="fs-15">Keep in mind!</h6> <p class="text-muted mb-0">Saturday and friday are considered as breaksby default</p></div></div></div></div> </div>  <div class="col-xl-9"><div class="card card-h-100">${JSON.parse(sessionStorage.getItem("permissions")).includes("academicBreaks.index") ? `<div class="card-body"> ${validate_component(Calendar_1, "Calendar").$$render($$result, { year }, {}, {})}</div>` : ``}</div> </div></div> </div></div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5320a9a2.js.map
