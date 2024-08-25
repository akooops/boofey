import { c as create_ssr_component, h as add_attribute, e as escape, v as validate_component, i as createEventDispatcher, d as add_classes, f as each } from './ssr-69d45533.js';
import { P as Pagination } from './Pagination-91e4bf92.js';
import { S as SearchTable } from './SearchTable-12aa5f1d.js';
import { Q as QueueStudentsTable } from './QueueStudentsTable-8e878c9f.js';
import './index-64aa7a5e.js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import { A as Accordion } from './Accordion-5106493f.js';
import './stores-fc2c2f25.js';
import './translation-88f21498.js';
import './utils-5d589345.js';
import './ViewRow-562dee67.js';
import './initFlatpickr-2edd9049.js';
import './ExitQueueStudent-d5a17802.js';

const StudentsTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let studentsList = [];
  let studentsPagination;
  let { selected = {} } = $$props;
  let { collapse } = $$props;
  let { title } = $$props;
  let { subscribed } = $$props;
  let { archived } = $$props;
  let openCollapse;
  function resetStudent() {
    selected = {};
  }
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.subscribed === void 0 && $$bindings.subscribed && subscribed !== void 0)
    $$bindings.subscribed(subscribed);
  if ($$props.archived === void 0 && $$bindings.archived && archived !== void 0)
    $$bindings.archived(archived);
  if ($$props.resetStudent === void 0 && $$bindings.resetStudent && resetStudent !== void 0)
    $$bindings.resetStudent(resetStudent);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${selected?.id ? `<label for="productarName" class="form-label">${escape(title)}</label> <div class="table-responsive mt-0"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th>${escape(selected.id)}</th> <th><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", selected.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(selected.fullname)}</div></div></th> <th scope="col"><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1b3cw3w"><i class="ri-close-line"></i></a></div></th></tr></tbody></table></div>` : ``} <div${add_classes((selected?.id != null ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
      $$result,
      { id: "student", title, openCollapse },
      {
        openCollapse: ($$value) => {
          openCollapse = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "Student" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-q6ex5v"><tr scope="row"><td scope="col">ID</td> <td scope="col">Full Name</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(studentsList, (student) => {
            return `<tr scope="row"${add_classes((student.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(student.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.fullname)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-f140kx"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, studentsPagination), {}, {})}`;
        }
      }
    )}` : `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "Student" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-doigdf"><tr scope="row"><td scope="col">ID</td> <td scope="col">Full Name</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(studentsList, (student) => {
      return `<tr scope="row"${add_classes((student.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(student.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", student.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(student.fullname)}</div> </div></td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-f140kx"><i class="ri-check-line"></i></a> </div></td> </tr>`;
    })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, studentsPagination), {}, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const AddQueueStudentModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let close;
  let form;
  let startedAt;
  let exitedAt;
  let exited = true;
  let resetStudent;
  let { queue } = $$props;
  if ($$props.queue === void 0 && $$bindings.queue && queue !== void 0)
    $$bindings.queue(queue);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="modal fade" id="addQueueStudentModal" tabindex="-1" data-bs-focus="false" aria-labelledby="exampleModalgridLabel" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header" data-svelte-h="svelte-4b19vr"><h5 class="modal-title" id="exampleModalgridLabel">Add Student</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <div class="${["row g-3", ""].join(" ").trim()}"> ${validate_component(StudentsTableCollapse, "StudentsTableCollapse").$$render(
      $$result,
      {
        collapse: true,
        title: "Students",
        subscribed: true,
        archived: false,
        resetStudent
      },
      {
        resetStudent: ($$value) => {
          resetStudent = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${``} <form${add_attribute("this", form, 0)}><div class="row g-3"><div><div><label for="firstName" class="form-label" data-svelte-h="svelte-luor3v">Started At</label> <input type="text" name="started_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from"${add_attribute("this", startedAt, 0)}> ${``}</div></div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", exited, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-1fyp4e1">exited</label> </div></div> ${`<div><div><label for="firstName" class="form-label" data-svelte-h="svelte-q2n55n">Exited At</label> <input type="text" name="exited_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from"${add_attribute("this", exitedAt, 0)}> ${``}</div></div>`} <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal"${add_attribute("this", close, 0)} data-svelte-h="svelte-1h5uvws">Close</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div></div></form> </div></div></div></div></div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let queueStudentsList;
  let queue;
  let queueStudentsPagination;
  let { data } = $$props;
  let queueStudentsPage;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  queueStudentsList = data.queueStudentsResponse.data.queueStudents;
  queue = data.queueStudentsResponse.data.queue;
  queueStudentsPagination = data.queueStudentsResponse.pagination;
  return `<div class="row"${add_attribute("this", queueStudentsPage, 0)}><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><div class="d-flex gap-2 align-items-center flex-grow-1"><div class="flex-shrink-0"><img${add_attribute("src", queue?.canteen?.school?.logo?.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">${escape(queue?.canteen?.school?.name)}</span> - <span class="text-primary">${escape(queue?.canteen?.name)}</span> - <span class="text-primary">Queue #${escape(queue.id)}</span> - Queue students Managment</h4> </div> <div class="flex-shrink-0">${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.store") ? `<button type="button" data-bs-toggle="modal" data-bs-target="#addQueueStudentModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-bgmpdu"><i class="ri-add-line align-bottom me-1"></i>Add Student</button> ${validate_component(AddQueueStudentModal, "AddQueueStudentModal").$$render($$result, { queue }, {}, {})}` : ``}</div></div> ${JSON.parse(sessionStorage.getItem("permissions")).includes("queueStudents.index") ? `<div class="card-body"> ${validate_component(SearchTable, "SearchTable").$$render($$result, { type: "Student" }, {}, {})} ${validate_component(QueueStudentsTable, "QueueStudentsTable").$$render($$result, { queueStudentsList }, {}, {})} ${validate_component(Pagination, "Pagination").$$render($$result, Object.assign({}, queueStudentsPagination), {}, {})}    </div>` : ``} </div></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-597d2711.js.map
