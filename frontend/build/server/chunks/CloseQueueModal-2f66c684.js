import { c as create_ssr_component, d as add_classes, h as add_attribute, g as getContext, b as subscribe, v as validate_component, e as escape, f as each } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { n as navigating } from './stores-fc2c2f25.js';

const AddQueueModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let { canteen } = $$props;
  let selectType;
  let form;
  if ($$props.canteen === void 0 && $$bindings.canteen && canteen !== void 0)
    $$bindings.canteen(canteen);
  return `<div class="modal fade" id="addQueueModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-6wsm1a"><h5 class="modal-title" id="exampleModalgridLabel">Start Queue</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-vk0u42">Type</label> <select class="form-select" name="type" id="role" aria-label="Default select example"${add_attribute("this", selectType, 0)}><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-wki2rk">Main Meal</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-54q1vx">Snack</option></select> ${``}</div> ${``} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const ViewQueueModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStore, $$unsubscribe_queueStore;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => $queueStore = value);
  $$unsubscribe_queueStore();
  return `<div class="modal fade" id="viewQueueModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1l5r6n3"><h5 class="modal-title" id="exampleModalgridLabel">View Queue</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Type :  <span class="badge bg-primary-subtle text-primary">${escape($queueStore.type == 1 ? "Snack" : ":Main Meal")}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Started At : <span class="fw-normal">${escape($queueStore.started_at)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Student Count : <span class="fw-normal">${escape($queueStore.studentsCount)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Students In : <span class="fw-normal">${escape($queueStore.studentsInCount)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Students Exited : <span class="fw-normal">${escape($queueStore.studentsExitedCount)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Last Synced  At : <span class="fw-normal">${escape($queueStore.lastSyncedAt)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($queueStore?.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($queueStore?.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-ssr3tv"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditQueueModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStore, $$unsubscribe_queueStore;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => $queueStore = value);
  let close;
  let selectType;
  let form;
  let closed = false;
  queueStore.subscribe(() => {
    $queueStore.type;
    closed = !($queueStore.closed_at == null);
  });
  $$unsubscribe_queueStore();
  return `<div class="modal fade" id="editQueueModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-6wsm1a"><h5 class="modal-title" id="exampleModalgridLabel">Start Queue</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3"><div class="col-lg-12"><label for="role" class="form-label" data-svelte-h="svelte-vk0u42">Type</label> <select class="form-select" name="type" id="role" aria-label="Default select example"${add_attribute("this", selectType, 0)}><option${add_attribute("value", 0, 0)} data-svelte-h="svelte-wki2rk">Main Meal</option><option${add_attribute("value", 1, 0)} data-svelte-h="svelte-54q1vx">Snack</option></select> ${``}</div> ${``} <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", closed, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-17jtgxq">Close</label> </div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});
const DeleteQueueModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStore, $$unsubscribe_queueStore;
  let close;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => $queueStore = value);
  $$unsubscribe_queueStore();
  return `<div id="deleteQueueModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`#${$queueStore.id}`)}</span> ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ActiveQueue = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_queueStore;
  let { activeQueue } = $$props;
  let queueStudentsToolTip;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => value);
  if ($$props.activeQueue === void 0 && $$bindings.activeQueue && activeQueue !== void 0)
    $$bindings.activeQueue(activeQueue);
  $$unsubscribe_queueStore();
  return `<div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1" data-svelte-h="svelte-129c79i">Active Queue</h4> <div class="flex-shrink-0">${activeQueue ? `<div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index") ? `<span${add_attribute("this", queueStudentsToolTip, 0)} data-svelte-h="svelte-fhv47d"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues"><i class="bx bxs-graduation"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.close") ? `<span data-bs-toggle="modal" data-bs-target="#closeQueueModal" data-svelte-h="svelte-bw4kex"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Close queue"><i class="ri-stop-circle-line"></i></a></span>` : ``} <span data-bs-toggle="modal" data-bs-target="#viewQueueModal" data-svelte-h="svelte-1lovbnx"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="View"><i class="ri-eye-fill"></i></a></span> <span data-bs-toggle="modal" data-bs-target="#editQueueModal" data-svelte-h="svelte-1n741yk"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Edit"><i class="ri-edit-2-line"></i></a></span> <span data-bs-toggle="modal" data-bs-target="#deleteQueueModal" data-svelte-h="svelte-jue1yw"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-title="Delete"><i class="ri-delete-bin-line"></i></a></span></div>` : ``} </div> </div> <div class="card-body">  ${activeQueue ? `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1s5dqmm"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Type</th> <th scope="col">Started At</th> <th scope="col">Students Count</th> <th scope="col">Students In</th> <th scope="col">Students Out</th> <th scope="col">Last Synced At</th></tr></thead> <tbody class="list"><tr scope="row"><td data-svelte-h="svelte-1o2rt8u"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(activeQueue.id)}</td> <td><span class="badge bg-primary-subtle text-primary">${escape(activeQueue.type == 1 ? "Snack" : "Main Meal")}</span></td> <td>${escape(activeQueue.started_at)}</td> <td>${escape(activeQueue.studentsCount)}</td> <td>${escape(activeQueue.studentsInCount)}</td> <td>${escape(activeQueue.studentsExitedCount)}</td> <td>${escape(activeQueue.lastSyncedAt)}</td></tr></tbody></table>  </div></div>` : ` <div class="alert alert-info alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-f66sup"><i class="ri-airplay-line me-3 align-middle"></i> There are no <strong>Active Queues</strong> at the moment 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}   </div> </div>`;
});
const QueueItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_queueStore;
  let { queue } = $$props;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => value);
  let queueStudentsToolTip;
  if ($$props.queue === void 0 && $$bindings.queue && queue !== void 0)
    $$bindings.queue(queue);
  $$unsubscribe_queueStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(queue.id)}</td> <td><span class="badge bg-primary-subtle text-primary">${escape(queue.type == 1 ? "Snack" : "Main Meal")}</span></td> <td>${escape(queue.started_at)}</td> <td>${escape(queue.studentsCount)}</td> <td>${escape(queue.studentsInCount)}</td> <td>${escape(queue.studentsExitedCount)}</td> <td>${escape(queue.lastSyncedAt)}</td> <td><div class="hstack gap-3">${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index") ? `<span${add_attribute("this", queueStudentsToolTip, 0)} data-svelte-h="svelte-fhv47d"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Queues"><i class="bx bxs-graduation"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewQueueModal" data-svelte-h="svelte-1x8tq61"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.update") ? `<span data-bs-toggle="modal" data-bs-target="#editQueueModal" data-svelte-h="svelte-1xslw08"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queues.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteQueueModal" data-svelte-h="svelte-8aec02"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const QueuesTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { queuesList } = $$props;
  if ($$props.queuesList === void 0 && $$bindings.queuesList && queuesList !== void 0)
    $$bindings.queuesList(queuesList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-odq5g3"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Type</th> <th scope="col">Started At</th> <th scope="col">Students Count</th> <th scope="col">Students In</th> <th scope="col">Students Out</th> <th scope="col">Last Synced At</th> <th scope="col">Actions</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(queuesList, (queue) => {
    return `${validate_component(QueueItem, "QueueItem").$$render($$result, { queue }, {}, {})}`;
  })}</tbody>` : ``}</table></div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});
const CloseQueueModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_queueStore;
  let close;
  let { queueStore } = getContext("queueStore");
  $$unsubscribe_queueStore = subscribe(queueStore, (value) => value);
  $$unsubscribe_queueStore();
  return `<div id="closeQueueModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><lord-icon src="https://cdn.lordicon.com/crithpny.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4" data-svelte-h="svelte-tu6baa">Are you Sure You want to close this <span class="text-primary">active Queue</span> ?</p> ${``} <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-s1avm2">Cancel</button> <button type="button" class="btn btn-warning waves-effect waves-light" data-svelte-h="svelte-17dma38">Close Queue</button></div></div></div> </div> </div> </div>`;
});

export { AddQueueModal as A, CloseQueueModal as C, DeleteQueueModal as D, EditQueueModal as E, QueuesTable as Q, ViewQueueModal as V, ActiveQueue as a };
//# sourceMappingURL=CloseQueueModal-2f66c684.js.map
