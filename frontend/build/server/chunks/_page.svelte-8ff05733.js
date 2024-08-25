import { c as create_ssr_component, s as setContext, v as validate_component, h as add_attribute, e as escape, b as subscribe, f as each, g as getContext, d as add_classes } from './ssr-69d45533.js';
import { A as AddQueueModal, V as ViewQueueModal, E as EditQueueModal, D as DeleteQueueModal, C as CloseQueueModal$1, a as ActiveQueue, Q as QueuesTable } from './CloseQueueModal-a39cca45.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { w as writable } from './index2-7897530e.js';
import { n as navigating } from './stores-fc2c2f25.js';
import './index-64aa7a5e.js';
import { E as ExitQueueStudent } from './ExitQueueStudent-d5a17802.js';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';
import './translation-88f21498.js';

const EditQueueModalSimple = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStore, $$unsubscribe_queueStore;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => $queueStore = value);
  let close;
  let selectType;
  let form;
  queueStore.subscribe(() => {
    $queueStore.type;
  });
  $$unsubscribe_queueStore();
  return `<div class="modal fade" id="editQueueModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-6wsm1a"><h5 class="modal-title" id="exampleModalgridLabel">Start Queue</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-vk0u42">Type</label> <select class="form-select" name="type" id="role" aria-label="Default select example"${add_attribute("this", selectType, 0)}><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-wki2rk">Main Meal</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-54q1vx">Snack</option></select> ${``}</div> ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const CloseQueueModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let { queue } = $$props;
  if ($$props.queue === void 0 && $$bindings.queue && queue !== void 0)
    $$bindings.queue(queue);
  return `<div id="closeQueueModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><lord-icon src="https://cdn.lordicon.com/crithpny.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4" data-svelte-h="svelte-tu6baa">Are you Sure You want to close this <span class="text-primary">active Queue</span> ?</p> ${``} <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-s1avm2">Cancel</button> <button type="button" class="btn btn-warning waves-effect waves-light" data-svelte-h="svelte-17dma38">Close Queue</button></div></div></div> </div> </div> </div>`;
});
const QueueCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_queueStore;
  let { queue } = $$props;
  let { active } = $$props;
  let { canteen } = $$props;
  let queueStudentsToolTip;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => value);
  if ($$props.queue === void 0 && $$bindings.queue && queue !== void 0)
    $$bindings.queue(queue);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.canteen === void 0 && $$bindings.canteen && canteen !== void 0)
    $$bindings.canteen(canteen);
  $$unsubscribe_queueStore();
  return `<div class="col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12"><div class="card card-animate p-3 " role="button"><div class="d-flex align-items-center"><div class="flex-grow-1"><p class="text-muted mb-0">Started At : ${escape(queue?.started_at == null ? "Not started yet" : queue.started_at)}</p></div>   <td><span class="badge bg-primary-subtle text-primary">${escape(queue.type == 1 ? "Snack" : "Main Meal")}</span></td></div> <div class="d-flex mt-2 justify-content-center"><div class="col-4"><p class="text-muted mb-0" data-svelte-h="svelte-1a9rlwd">All</p> <h2 class="mb-1">${escape(queue.studentsCount)}</h2></div> <div class="col-4"><p class="text-muted mb-0" data-svelte-h="svelte-8yas4f">In</p> <h2 class="mb-1">${escape(queue.studentsInCount)}</h2></div> <div class="col-4"><p class="text-muted mb-0" data-svelte-h="svelte-1nbudfu">Out</p> <h2 class="mb-1">${escape(queue.studentsExitedCount)}</h2></div></div> <div class="d-flex gap-2 mt-4 flex-wrap"> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index.simplified") ? `<span class="col-12" data-bs-dismiss="modal"${add_attribute("this", queueStudentsToolTip, 0)} data-svelte-h="svelte-1owwoi6"><button type="button" class="btn col-12 text-start btn-soft-primary btn-label waves-effect waves-light"><i class="ri-user-2-line label-icon align-middle fs-16 me-2"></i> Students</button></span>` : ``}</div></div> </div>`;
});
const ActiveQueueStudentCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_queueStudentStore;
  let { queueStudent } = $$props;
  let { queueStudentStore } = getContext("queueStudentStore");
  $$unsubscribe_queueStudentStore = subscribe(queueStudentStore, (value) => value);
  if ($$props.queueStudent === void 0 && $$bindings.queueStudent && queueStudent !== void 0)
    $$bindings.queueStudent(queueStudent);
  $$unsubscribe_queueStudentStore();
  return `<div class="col-xxl-3 col-xl-4 col-lg-5 col-sm-6 col-xs-12"><div class="card card-animate p-3 py-2" role="button"><div class="row g-0"><div class="card-body text-center"><div class="avatar-md mb-3 mx-auto"><img${add_attribute("src", queueStudent.student.image.full_path, 0)} alt="" id="candidate-img" class="avatar-md rounded-circle"></div> <p class="text-muted mb-0 fs-6">#${escape(queueStudent.number)}</p> <h5 id="candidate-name" class="mb-1 text-truncate">${escape(queueStudent.student.fullname)}</h5> <p class="text-muted mb-0 fs-6">Started at : ${escape(queueStudent.started_at)}</p> <div class="d-flex gap-2 mt-4 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.exit.simplified") ? `<span data-bs-toggle="modal" class="col-12" data-bs-target="#exitQueueStudent" data-svelte-h="svelte-mi0vlo"><button type="button" class="btn col-12 text-start btn-soft-success btn-label waves-effect waves-light"><i class="ri-logout-box-r-line label-icon align-middle fs-16 me-2"></i> Exit Queue</button></span>` : ``}</div></div></div></div> </div>`;
});
const ViewAllQueuesModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { queuesList } = $$props;
  let { activeQueue } = $$props;
  let { canteen } = $$props;
  let { queuesPagination } = $$props;
  let close;
  if ($$props.queuesList === void 0 && $$bindings.queuesList && queuesList !== void 0)
    $$bindings.queuesList(queuesList);
  if ($$props.activeQueue === void 0 && $$bindings.activeQueue && activeQueue !== void 0)
    $$bindings.activeQueue(activeQueue);
  if ($$props.canteen === void 0 && $$bindings.canteen && canteen !== void 0)
    $$bindings.canteen(canteen);
  if ($$props.queuesPagination === void 0 && $$bindings.queuesPagination && queuesPagination !== void 0)
    $$bindings.queuesPagination(queuesPagination);
  return `<div class="modal fade" id="ViewAllQueuesModal" tabindex="-1" data-bs-focus="false" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered modal-xl"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-xvci6d"><h5 class="modal-title" id="exampleModalgridLabel">Queues</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <div class="row g-3"><div class="col-lg-12"><h4 class="card-title mb-0 flex-grow-1 mb-3" data-svelte-h="svelte-17fypv1">Active Queue Students</h4> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified") ? `${activeQueue ? `${validate_component(QueueCard, "QueueCard").$$render(
    $$result,
    {
      canteen,
      queue: activeQueue,
      active: true
    },
    {},
    {}
  )}` : `<div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-119pvrl"><i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Active Queues</strong> at the moment 
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}` : ``} <h4 class="card-title mb-0 flex-grow-1 mb-3" data-svelte-h="svelte-a0tarp">All queues</h4> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified") ? `<div class="row">${each(queuesList, (queue, _) => {
    return `${validate_component(QueueCard, "QueueCard").$$render($$result, { canteen, queue }, {}, {})}`;
  })} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, queuesPagination), {}, {})}</div>` : ``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button></div></div></div></div></div></div></div>`;
});
const SimpleQueuePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { queuesList } = $$props;
  let { activeQueue } = $$props;
  let { canteen } = $$props;
  let { queuesPagination } = $$props;
  let { activeQueueStudents } = $$props;
  let { currentQueue } = $$props;
  let queuesPage;
  setContext("queueStudentStore", { queueStudentStore: writable({}) });
  let qrExit;
  let orderToolTip;
  if ($$props.queuesList === void 0 && $$bindings.queuesList && queuesList !== void 0)
    $$bindings.queuesList(queuesList);
  if ($$props.activeQueue === void 0 && $$bindings.activeQueue && activeQueue !== void 0)
    $$bindings.activeQueue(activeQueue);
  if ($$props.canteen === void 0 && $$bindings.canteen && canteen !== void 0)
    $$bindings.canteen(canteen);
  if ($$props.queuesPagination === void 0 && $$bindings.queuesPagination && queuesPagination !== void 0)
    $$bindings.queuesPagination(queuesPagination);
  if ($$props.activeQueueStudents === void 0 && $$bindings.activeQueueStudents && activeQueueStudents !== void 0)
    $$bindings.activeQueueStudents(activeQueueStudents);
  if ($$props.currentQueue === void 0 && $$bindings.currentQueue && currentQueue !== void 0)
    $$bindings.currentQueue(currentQueue);
  $$unsubscribe_navigating();
  return `<div class="row"${add_attribute("this", queuesPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", canteen.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(canteen.school.name)}</span> - <span class="text-primary">${escape(canteen.name)}</span> - Queue Managment</h4></div> <div class="flex-shrink-0"><div class="hstack gap-2 justify-content-end">${activeQueue && JSON.parse(sessionStorage.getItem("permissions")).includes("queues.close.simplified") ? `<span data-bs-toggle="modal" data-bs-target="#closeQueueModal" data-svelte-h="svelte-1y9t1y0"><button type="button" class="btn col-12 text-start btn-danger btn-label waves-effect waves-light"><i class="ri-stop-circle-line label-icon align-middle fs-16 me-2"></i> Close queue</button></span>` : `${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.store.simplified") ? `<span data-bs-toggle="modal" data-bs-target="#addQueueModal" data-svelte-h="svelte-1t5ib29"><button type="button" class="btn col-12 text-start btn-success btn-label waves-effect waves-light"><i class="ri-add-line label-icon align-middle fs-16 me-2"></i> Open Queue</button></span>` : ``}`} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified") ? `<span data-bs-toggle="modal" data-bs-target="#ViewAllQueuesModal" data-svelte-h="svelte-1rh5ls1"><button type="button" class="btn col-12 text-start btn-secondary btn-label waves-effect waves-light"><i class="ri-team-line label-icon align-middle fs-16 me-2"></i> Queues</button></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.exit.simplified") ? `<span${add_attribute("this", qrExit, 0)} data-svelte-h="svelte-qtnahq"><button type="button" class="btn col-12 text-start btn-info btn-label waves-effect waves-light"><i class="ri-qr-code-line label-icon align-middle fs-16 me-2"></i> Qr Exit</button></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("orders.index") ? `<span${add_attribute("this", orderToolTip, 0)} data-svelte-h="svelte-1mqzaoc"><button type="button" class="btn col-12 text-start btn-info btn-label waves-effect waves-light"><i class="ri-survey-line label-icon align-middle fs-16 me-2"></i> POS</button></span>` : ``}</div> ${validate_component(AddQueueModal, "AddQueueModal").$$render($$result, { canteen }, {}, {})} ${validate_component(ViewQueueModal, "ViewQueueModal").$$render($$result, {}, {}, {})} ${validate_component(EditQueueModalSimple, "EditQueueModalSimple").$$render($$result, {}, {}, {})} ${validate_component(DeleteQueueModal, "DeleteQueueModal").$$render($$result, {}, {}, {})} ${validate_component(CloseQueueModal, "CloseQueueModal").$$render($$result, { queue: activeQueue }, {}, {})}</div> </div> </div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-y60bxl"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : `<h4 class="card-title mb-0 flex-grow-1 mb-3">Queue #${escape(currentQueue.id)}</h4> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified") ? `  <div class="row g-3">${activeQueueStudents.length ? each(activeQueueStudents, (queueStudent) => {
    return `${validate_component(ActiveQueueStudentCard, "ActiveQueueStudentCard").$$render($$result, { queueStudent }, {}, {})}`;
  }) : `${activeQueue ? `<div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-1y2pdmf"><i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Students</strong> at the moment 
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </div>` : ``}`}</div>` : ``}`} </div>  </div>  ${validate_component(ExitQueueStudent, "ExitQueueStudent").$$render($$result, { route: "queues" }, {}, {})} ${validate_component(ViewAllQueuesModal, "ViewAllQueuesModal").$$render(
    $$result,
    {
      queuesList,
      activeQueue,
      canteen,
      queuesPagination
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let queuesList;
  let activeQueue;
  let canteen;
  let queuesPagination;
  let activeQueueStudents;
  let currentQueue;
  let { data } = $$props;
  setContext("queueStore", { queueStore: writable({}) });
  let queuesPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  queuesList = data.queuesResponse.data.queues;
  activeQueue = data.queuesResponse.data.activeQueue;
  canteen = data.queuesResponse.data.canteen;
  queuesPagination = data.queuesResponse.pagination;
  activeQueueStudents = data.activeQueueStudents;
  currentQueue = data.currentQueue;
  return `${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index.simplified") ? `${validate_component(SimpleQueuePage, "SimpleQueuePage").$$render(
    $$result,
    {
      queuesList,
      activeQueue,
      canteen,
      queuesPagination,
      activeQueueStudents,
      currentQueue
    },
    {},
    {}
  )}` : `<div class="row"${add_attribute("this", queuesPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", canteen.school.logo.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(canteen.school.name)}</span> - <span class="text-primary">${escape(canteen.name)}</span> - Queue Managment</h4></div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addQueueModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1vhclkq"><i class="ri-add-line align-bottom me-1"></i>Start Queue</button> ${validate_component(AddQueueModal, "AddQueueModal").$$render($$result, { canteen }, {}, {})}` : ``} ${validate_component(ViewQueueModal, "ViewQueueModal").$$render($$result, {}, {}, {})} ${validate_component(EditQueueModal, "EditQueueModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteQueueModal, "DeleteQueueModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteQueueModal, "DeleteQueueModal").$$render($$result, {}, {}, {})} ${validate_component(CloseQueueModal$1, "CloseQueueModal").$$render($$result, {}, {}, {})}</div> </div> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index") ? `${validate_component(ActiveQueue, "ActiveQueue").$$render($$result, { activeQueue }, {}, {})}` : ``} <div class="card"><div class="card-header align-items-center d-flex" data-svelte-h="svelte-12yogok"><h4 class="card-title mb-0 flex-grow-1">All queues</h4> </div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.index") ? `<div class="card-body"> <div class="row"> ${validate_component(QueuesTable, "QueuesTable").$$render($$result, { queuesList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, queuesPagination), {}, {})} </div>   </div>` : ``} </div></div>  </div>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-8ff05733.js.map
