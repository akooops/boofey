import { c as create_ssr_component, i as createEventDispatcher, e as escape, h as add_attribute, d as add_classes, v as validate_component, f as each, g as getContext, b as subscribe } from './ssr-69d45533.js';
import './index-64aa7a5e.js';
import { M as ModalSearchTable, a as ModalPagination } from './ModalPagination-ba97b167.js';
import { A as Accordion } from './Accordion-5106493f.js';
import { u as PathGetAcademicYears } from './paths-53224d1e.js';
import { a as redirector } from './auth-d76f3c60.js';
import 'qr-code-styling';
import 'print-js';
import { t as translation } from './translation-88f21498.js';

const ParentsTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let parentsList = [];
  let parentsPagination;
  let { selected = {} } = $$props;
  let { title } = $$props;
  let { collapse } = $$props;
  let openCollapse;
  function resetParent() {
    selected = {};
  }
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.resetParent === void 0 && $$bindings.resetParent && resetParent !== void 0)
    $$bindings.resetParent(resetParent);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${selected?.id ? `<label for="productarName" class="form-label">${escape(title)}</label> <div class="table-responsive mt-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th scope="col">${escape(selected.id)}</th> <th scope="col"><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", selected.user.profile.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(selected.user.profile.fullname)}</div></div></th> <th scope="col">${escape(selected.user.email)}</th> <th scope="col">${escape(selected.user.phone)}</th> <th scope="col"><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-krz8ob"><i class="ri-close-line"></i></a></div></th></tr></tbody></table></div></div>` : ``} <div${add_classes((selected?.id != null ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
      $$result,
      { id: "parent", title, openCollapse },
      {
        openCollapse: ($$value) => {
          openCollapse = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "Parent" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1qj04aj"><tr scope="row"><td scope="col">ID</td> <td scope="col">Username</td> <td scope="col">Email</td> <td scope="col">Phone</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(parentsList, (parent) => {
            return `<tr scope="row"${add_classes((parent.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(parent.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", parent.user.profile.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(parent.user.username)}</div> </div></td> <td>${escape(parent.user.email)}</td> <td>${escape(parent.user.phone)}</td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-18p0s19"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, parentsPagination), {}, {})}`;
        }
      }
    )}` : `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "Parent" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-14m8erf"><tr scope="row"><td scope="col">ID</td> <td scope="col">Username</td> <td scope="col">Email</td> <td scope="col">Phone</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(parentsList, (parent) => {
      return `<tr scope="row"${add_classes((parent.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(parent.id)}</td> <td><div class="d-flex gap-2 align-items-center"><div class="flex-shrink-0"><img${add_attribute("src", parent.user.profile.image.full_path, 0)} alt="" class="avatar-xs rounded-circle"></div> <div class="flex-grow-1">${escape(parent.user.username)}</div> </div></td> <td>${escape(parent.user.email)}</td> <td>${escape(parent.user.phone)}</td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-18p0s19"><i class="ri-check-line"></i></a> </div></td> </tr>`;
    })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, parentsPagination), {}, {})}`}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const YearsTableCollapse = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { schoolId } = $$props;
  let yearsList = [];
  let yearsPagination;
  let page = 1;
  let searchQuery = "";
  let { selected = {} } = $$props;
  let { type } = $$props;
  let { collapse } = $$props;
  let { title } = $$props;
  let openCollapse;
  async function fetchYears() {
    let res = await fetch(PathGetAcademicYears(schoolId, { page, search: searchQuery }, type), {
      headers: {
        Authorization: `${localStorage.getItem("SID")}`
      }
    });
    redirector(res);
    let yearsResponse = await res.json();
    yearsList = yearsResponse.data.academicYears;
    yearsPagination = yearsResponse.pagination;
  }
  function resetYear() {
    selected = {};
  }
  if ($$props.schoolId === void 0 && $$bindings.schoolId && schoolId !== void 0)
    $$bindings.schoolId(schoolId);
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.collapse === void 0 && $$bindings.collapse && collapse !== void 0)
    $$bindings.collapse(collapse);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.resetYear === void 0 && $$bindings.resetYear && resetYear !== void 0)
    $$bindings.resetYear(resetYear);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (schoolId) {
        fetchYears();
      }
    }
    $$rendered = `${selected?.id && schoolId ? `<label for="productarName" class="form-label">${escape(title)}</label> <div class="table-responsive mt-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><tbody class="list align-middle"><tr class="bg-secondary-subtle"><th scope="col">${escape(selected.id)}</th> <th>${escape(selected.name)} ${selected.current ? `<span class="badge bg-success-subtle text-success ms-1" data-svelte-h="svelte-us3cjl">Current</span>` : ``}</th> <th>${escape(selected.from)}</th> <th>${escape(selected.to)}</th> <th scope="col"><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-zh4j8m"><i class="ri-close-line"></i></a></div></th></tr></tbody></table></div></div>` : ``} <div${add_classes((selected?.id != null && (schoolId != null && schoolId != "") ? "d-none" : "").trim())}>${collapse ? `${validate_component(Accordion, "Accordion").$$render(
      $$result,
      { id: "year", title, openCollapse },
      {
        openCollapse: ($$value) => {
          openCollapse = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${schoolId ? `${validate_component(ModalSearchTable, "ModalSearchTable").$$render($$result, { type: "Year" }, {}, {})} <div class="row pe-0"><div class="table-responsive"><table class="table align-middle table-nowrap mb-0 border-top"><thead class="table-light" data-svelte-h="svelte-1yl5x5h"><tr scope="row"><td scope="col">ID</td> <td scope="col">Name</td> <td scope="col">From</td> <td scope="col">To</td> <td scope="col">Action</td></tr></thead> <tbody class="list">${each(yearsList, (year) => {
            return `<tr scope="row"${add_classes((year.id == selected?.id ? "bg-secondary-subtle" : "").trim())}><td>${escape(year.id)}</td> <td>${escape(year.name)} ${year.current ? ` <span class="badge bg-success-subtle text-success ms-1" data-svelte-h="svelte-us3cjl">Current</span>` : ``}</td> <td>${escape(year.from)}</td> <td>${escape(year.to)}</td> <td><div class="hstack gap-3 flex-wrap"><a href="javascript:void(0);" class="fs-15" data-bs-toggle="tooltip" data-bs-original-title="Select" data-svelte-h="svelte-1c5x0z"><i class="ri-check-line"></i></a> </div></td> </tr>`;
          })}</tbody></table></div></div> ${validate_component(ModalPagination, "ModalPagination").$$render($$result, Object.assign({}, yearsPagination), {}, {})}` : ` <div class="alert alert-warning alert-border-left alert-dismissible fade show" role="alert" data-svelte-h="svelte-1opf86q"><i class="ri-alert-line me-3 align-middle"></i> <strong>Warning</strong> - Please select a school first 
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`}`;
        }
      }
    )}` : ``}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Qr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $studentStore, $$unsubscribe_studentStore;
  let { type } = $$props;
  let { studentStore } = getContext("studentStore");
  $$unsubscribe_studentStore = subscribe(studentStore, (value) => $studentStore = value);
  let view;
  let otpExpiresLater = false;
  let expiresAt;
  let form;
  studentStore.subscribe(async () => {
    if ($studentStore?.id == null)
      return;
  });
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  $$unsubscribe_studentStore();
  return `<div class="modal fade" id="ViewQrStudentModal" tabindex="-1" aria-labelledby="ViewQrStudentModal" aria-modal="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalgridLabel">${escape(translation.studentQrCode[localStorage.getItem("language")])}</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div> <div class="modal-body">${``} <form${add_classes("".trim())}${add_attribute("this", form, 0)}><div class="row g-3 d-print-block"><div class="${["text-center", "d-none"].join(" ").trim()}" id="qrImage"${add_attribute("this", view, 0)} data-svelte-h="svelte-10qku0c"></div> <div class="${[
    "text-center hstack gap-2 justify-content-center",
    "d-none"
  ].join(" ").trim()}"><button type="button" class="btn btn-primary waves-effect waves-light">${escape(translation.download[localStorage.getItem("language")])}</button> <button type="button" class="btn btn-primary waves-effect waves-light">${escape(translation.print[localStorage.getItem("language")])}</button></div> <div class="row ps-3 g-3"> <div class="form-check form-switch col"><input class="form-check-input" type="checkbox" role="switch" id="SwitchCheck1"${add_attribute("checked", otpExpiresLater, 1)}> <label class="form-check-label" for="SwitchCheck1" data-svelte-h="svelte-12006ah">Otp Expires Later</label> </div> ${``}</div> <div${add_classes("d-none".trim())}><div><label for="firstName" class="form-label" data-svelte-h="svelte-1o7rver">Otp Expires At</label> <input type="text" name="otp_expires_at" class="form-control" data-provider="flatpickr" data-date-format="Y-m-d" data-enable-time id="from"${add_attribute("this", expiresAt, 0)}> ${``}</div></div> <div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-light fw-light" data-bs-dismiss="modal">${escape(translation.close[localStorage.getItem("language")])}</button> <input type="submit" class="btn btn-primary waves-effect waves-light" value="Save"></div> </div></form></div></div></div></div>`;
});

export { ParentsTableCollapse as P, Qr as Q, YearsTableCollapse as Y };
//# sourceMappingURL=Qr-fe66647c.js.map
