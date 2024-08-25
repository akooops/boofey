import { c as create_ssr_component, g as getContext, b as subscribe, d as add_classes, e as escape, h as add_attribute, v as validate_component, f as each } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { f as formatTimestamp } from './utils-5d589345.js';
import { V as ViewRow } from './ViewRow-562dee67.js';
import { l as loadDefaultDate } from './initFlatpickr-2edd9049.js';
import { n as navigating } from './stores-fc2c2f25.js';
import { E as ExitQueueStudent } from './ExitQueueStudent-d5a17802.js';

const DeleteQueueStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStudentStore, $$unsubscribe_queueStudentStore;
  let close;
  let { queueStudentStore } = getContext("queueStudentStore");
  $$unsubscribe_queueStudentStore = subscribe(queueStudentStore, (value) => $queueStudentStore = value);
  $$unsubscribe_queueStudentStore();
  return `<div id="deleteQueueStudentModal" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-body text-center p-5"><div class="text-end" data-svelte-h="svelte-3pipod"><button type="button" class="btn-close text-end" data-bs-dismiss="modal" aria-label="Close"></button></div> ${``} <div class="${["mt-2", ""].join(" ").trim()}"><form${add_classes("".trim())}><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> <h4 class="mb-3 mt-4" data-svelte-h="svelte-1s07vlj">Are you Sure ?</h4> <p class="text-muted fs-15 mb-4">Are you Sure You want to Delete <span class="text-primary">${escape(`${$queueStudentStore?.student?.fullname}`)}</span> from this queue ?</p> <div class="hstack gap-2 justify-content-center"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <button type="button" class="btn btn-danger waves-effect waves-light" data-svelte-h="svelte-iuig3c">Delete</button></div></form></div></div> </div> </div> </div>`;
});
const ViewQueueStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStudentStore, $$unsubscribe_queueStudentStore;
  let { queueStudentStore } = getContext("queueStudentStore");
  $$unsubscribe_queueStudentStore = subscribe(queueStudentStore, (value) => $queueStudentStore = value);
  $$unsubscribe_queueStudentStore();
  return `<div class="modal fade" id="viewQueueStudentModal" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1anumzw"><h5 class="modal-title" id="exampleModalgridLabel">View QueueStudent</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body p-4">${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Student : <img${add_attribute("src", $queueStudentStore?.student?.image?.full_path, 0)} alt="" class="avatar-xs rounded-circle me-1"> <span class="fw-normal">${escape($queueStudentStore?.student?.fullname)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Started At : <span class="fw-normal">${escape($queueStudentStore?.started_at)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Synced At : <span class="fw-normal">${escape($queueStudentStore?.synced_at)}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Exited At : 
                    ${$queueStudentStore?.exited_at ? `<span class="fw-normal">${escape($queueStudentStore?.exited_at)}</span>` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-n6s3o5">Not Out Yet</span>`}`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Created at : <span class="fw-normal">${escape(formatTimestamp($queueStudentStore?.created_at))}</span>`;
    }
  })} ${validate_component(ViewRow, "ViewRow").$$render($$result, {}, {}, {
    default: () => {
      return `Updated at : <span class="fw-normal">${escape(formatTimestamp($queueStudentStore?.updated_at))}</span>`;
    }
  })} <div class="hstack gap-2 justify-content-end" data-svelte-h="svelte-ssr3tv"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">Close</button></div></div></div></div></div>`;
});
const EditQueueStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $queueStudentStore, $$unsubscribe_queueStudentStore;
  let close;
  let form;
  let startedAt;
  let exitedAt;
  let exited = true;
  let { queueStudentStore } = getContext("queueStudentStore");
  $$unsubscribe_queueStudentStore = subscribe(queueStudentStore, (value) => $queueStudentStore = value);
  let { queue } = $$props;
  queueStudentStore.subscribe(() => {
    if (Object.keys($queueStudentStore).length == 0 || startedAt == void 0)
      return;
    loadDefaultDate(startedAt, $queueStudentStore.started_at);
    if ($queueStudentStore.exited_at) {
      loadDefaultDate(exitedAt, $queueStudentStore.exited_at);
    } else {
      exited = false;
    }
    $queueStudentStore?.student?.id;
  });
  if ($$props.queue === void 0 && $$bindings.queue && queue !== void 0)
    $$bindings.queue(queue);
  $$unsubscribe_queueStudentStore();
  return `<div class="modal fade" id="editQueueStudentModal" tabindex="-1" data-bs-focus="false" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-1c2cuh6"><h5 class="modal-title" id="exampleModalgridLabel">Edit Student</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <div class="${["row g-3", ""].join(" ").trim()}"> <form${add_attribute("this", form, 0)}><div class="row g-3"><div><div><label for="firstName" class="form-label" data-svelte-h="svelte-luor3v">Started At</label> <input type="text" name="started_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from"${add_attribute("this", startedAt, 0)}> ${``}</div></div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", exited, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1fyp4e1">exited</label> </div></div>  <div${add_classes((!exited ? "d-none" : "").trim())}><div><label for="firstName" class="form-label" data-svelte-h="svelte-q2n55n">Exited At</label> <input type="text" name="exited_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from"${add_attribute("this", exitedAt, 0)}> ${``}</div></div>  <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div></div></form> </div></div></div></div></div>`;
});
const QueueStudentItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_queueStudentStore;
  let { queueStudent } = $$props;
  let { queueStudentStore } = getContext("queueStudentStore");
  $$unsubscribe_queueStudentStore = subscribe(queueStudentStore, (value) => value);
  if ($$props.queueStudent === void 0 && $$bindings.queueStudent && queueStudent !== void 0)
    $$bindings.queueStudent(queueStudent);
  $$unsubscribe_queueStudentStore();
  return `<tr scope="row"><td data-svelte-h="svelte-1wqjv4e"><div class="form-check"><input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"></div></td> <td>${escape(queueStudent.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", queueStudent.student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(queueStudent.student.fullname)}</div></div></td> <td>${escape(queueStudent.started_at)}</td> <td>${escape(queueStudent.synced_at)}</td> <td>${queueStudent.exited_at ? `${escape(queueStudent.exited_at)}` : `<span class="badge bg-danger-subtle text-danger" data-svelte-h="svelte-n6s3o5">Not Out Yet</span>`}</td> <td><div class="hstack gap-3 flex-wrap">${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.exit") ? `<span data-bs-toggle="modal" data-bs-target="#exitQueueStudent" data-svelte-h="svelte-3scxp8"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Exit Queue"><i class="ri-logout-box-r-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.show") ? `<span data-bs-toggle="modal" data-bs-target="#viewQueueStudentModal" data-svelte-h="svelte-b8wsdv"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="View"><i class="ri-eye-fill"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.update") ? `<span data-bs-toggle="modal" data-bs-target="#editQueueStudentModal" data-svelte-h="svelte-1ds2vwq"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Edit"><i class="ri-edit-2-line"></i></a></span>` : ``} ${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.destroy") ? `<span data-bs-toggle="modal" data-bs-target="#deleteQueueStudentModal" data-svelte-h="svelte-1x1fz14"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Delete"><i class="ri-delete-bin-line"></i></a></span>` : ``}</div></td></tr>`;
});
const QueueStudentsTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  let { queueStudentsList = [] } = $$props;
  if ($$props.queueStudentsList === void 0 && $$bindings.queueStudentsList && queueStudentsList !== void 0)
    $$bindings.queueStudentsList(queueStudentsList);
  $$unsubscribe_navigating();
  return `<div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-8txs4p"><tr><th scope="col" style="width: 25px;"><div class="form-check"><input class="form-check-input" type="checkbox" id="checkAll" value="option1"></div></th> <th scope="col">ID</th> <th scope="col">Student</th> <th scope="col">Started At</th> <th scope="col">Synced At</th> <th scope="col">Exited At</th> <th scope="col">Action</th></tr></thead> ${$navigating == null || $navigating?.from?.route?.id != $navigating?.to?.route?.id ? `<tbody class="list">${each(queueStudentsList, (queueStudent) => {
    return `${validate_component(QueueStudentItem, "QueueStudentItem").$$render($$result, { queueStudent }, {}, {})}`;
  })}</tbody>` : ``}</table> ${validate_component(ViewQueueStudentModal, "ViewQueueStudentModal").$$render($$result, {}, {}, {})} ${validate_component(EditQueueStudentModal, "EditQueueStudentModal").$$render($$result, {}, {}, {})} ${validate_component(DeleteQueueStudentModal, "DeleteQueueStudentModal").$$render($$result, {}, {}, {})} ${validate_component(ExitQueueStudent, "ExitQueueStudent").$$render($$result, {}, {}, {})} </div></div> ${$navigating?.from?.route?.id == $navigating?.to?.route?.id && $navigating ? `<div class="text-center" data-svelte-h="svelte-2svhwp"><lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#E16F28,secondary:#73dce9" style="width:120px;height:120px"></lord-icon></div>` : ``}`;
});

export { DeleteQueueStudentModal as D, EditQueueStudentModal as E, QueueStudentsTable as Q, ViewQueueStudentModal as V };
//# sourceMappingURL=QueueStudentsTable-297872fa.js.map
